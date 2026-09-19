import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { queryOne } from './db';
import { User } from './types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'ai-marketplace-production-secret-key-2026-secure-32chars!'
);

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateTokens(user: Pick<User, 'id' | 'email' | 'role'>) {
  const accessToken = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(JWT_SECRET);

  const refreshToken = await new SignJWT({
    userId: user.id,
    tokenType: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET);

  return { accessToken, refreshToken };
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; email: string; role: User['role'] };
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser(request: Request): Promise<User | null> {
  let token: string | null = null;

  // 1. Check Authorization Bearer Header (Android App & Mobile API compatible)
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // 2. Check Cookie (Web App fallback)
  if (!token) {
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      const match = cookieHeader.match(/auth_token=([^;]+)/);
      if (match) {
        token = match[1];
      }
    }
  }

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload || !payload.userId) return null;

  const user = queryOne<User>('SELECT id, email, role, status, created_at, updated_at FROM users WHERE id = ?', [payload.userId]);
  if (!user || user.status === 'SUSPENDED') return null;
  return user;
}

/**
 * Defense-in-depth CSRF verification for cookie-authenticated state mutations
 */
export function validateCsrfOrigin(request: Request): boolean {
  const method = request.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return true;

  // Bearer tokens are not vulnerable to browser CSRF
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) return true;

  // Only enforce if request relies on cookie auth
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader || !cookieHeader.includes('auth_token=')) return true;

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return true;

  try {
    const originHost = new URL(origin).host;
    return originHost.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}
