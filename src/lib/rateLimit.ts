// In-memory token/sliding-window rate limiter for high-risk public endpoints
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipBuckets = new Map<string, RateLimitRecord>();

// Automatically sweep expired records every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of ipBuckets.entries()) {
      if (now > record.resetTime) {
        ipBuckets.delete(key);
      }
    }
  }, 5 * 60 * 1000);
  if (timer.unref) {
    timer.unref();
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfterSeconds: number;
}

/**
 * Checks if a given client identifier has exceeded rate limit quota.
 *
 * @param identifier - Client IP or unique actor key
 * @param limit - Maximum requests allowed per window
 * @param windowMs - Time window in milliseconds (default 60 seconds)
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const record = ipBuckets.get(identifier);

  if (!record || now > record.resetTime) {
    ipBuckets.set(identifier, { count: 1, resetTime: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfterSeconds,
    };
  }

  record.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
    retryAfterSeconds,
  };
}

/**
 * Extracts client IP from trusted proxy headers or fallback.
 * Prioritizes cf-connecting-ip (Cloudflare edge-authoritative) to prevent header spoofing.
 */
export function getClientIp(request: Request): string {
  // 1. Cloudflare edge-verified client IP (tamper-proof behind Cloudflare proxy)
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // 2. Upstream trusted proxy single-IP header
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // 3. Forwarded chain fallback (leftmost client IP)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return '127.0.0.1';
}
