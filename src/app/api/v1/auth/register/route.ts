import { NextResponse } from 'next/server';
import { execute, queryOne } from '@/lib/db';
import { hashPassword, generateTokens } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`reg_${clientIp}`, 10, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Too many registration attempts. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`,
          },
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) },
        }
      );
    }

    const {
      email,
      password,
      role = 'CLIENT',
      fullName = '',
      companyName = '',
      agreedToTerms = false,
      agreedToEscrow = false,
      agreedToAntiCircumvention = false,
      signatureType = 'DRAWN',
      signatureData = '',
    } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' } },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: { code: 'WEAK_PASSWORD', message: 'Password must be at least 8 characters long' } },
        { status: 400 }
      );
    }

    const assignedRole = role === 'PROFESSIONAL' ? 'PROFESSIONAL' : 'CLIENT';

    // Professional verification requirement
    if (assignedRole === 'PROFESSIONAL') {
      if (!agreedToTerms || !signatureData) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'AGREEMENT_REQUIRED',
              message: 'You must review and accept the 20% Platform Fee Agreement and provide an authorized digital signature to register as a talent.',
            },
          },
          { status: 400 }
        );
      }
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = queryOne('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists' } },
        { status: 409 }
      );
    }

    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();

    execute(
      `INSERT INTO users (id, email, password_hash, role, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'ACTIVE', ?, ?)`,
      [userId, normalizedEmail, passwordHash, assignedRole, now, now]
    );

    let proProfileId: string | null = null;

    if (assignedRole === 'CLIENT') {
      const clientProfileId = 'cp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      execute(
        `INSERT INTO client_profiles (id, user_id, full_name, company_name, country, created_at)
         VALUES (?, ?, ?, ?, 'India', ?)`,
        [clientProfileId, userId, fullName || normalizedEmail.split('@')[0], companyName || null, now]
      );
    } else if (assignedRole === 'PROFESSIONAL') {
      proProfileId = 'pro_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      const cleanUsername = (fullName || normalizedEmail.split('@')[0])
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '_')
        .substring(0, 30) + '_' + Math.random().toString(36).substring(2, 5);

      execute(
        `INSERT INTO professional_profiles (
          id, user_id, username, full_name, title, country, hourly_rate, currency,
          experience_years, bio, avatar_url, is_featured, verification_status,
          membership_status, rating_avg, review_count, completed_projects_count, created_at
        ) VALUES (?, ?, ?, ?, 'Automation & Growth Engineer', 'India', 999, 'INR', 2, 'Verified talent on Rock Automations.', '/images/abhishek-kumar.png', 0, 'PENDING', 'ACTIVE', 5.0, 0, 0, ?)`,
        [proProfileId, userId, cleanUsername, fullName || 'Talent Professional', now]
      );

      // Record digitally signed agreement in database
      const agreementId = 'agr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      execute(
        `INSERT INTO professional_agreements (
          id, user_id, professional_id, full_name, email, platform_fee_percent, terms_version,
          signature_type, signature_data, agreed_to_terms, agreed_to_escrow, agreed_to_anti_circumvention, signed_at
        ) VALUES (?, ?, ?, ?, ?, 20.0, '2026.2', ?, ?, ?, ?, ?, ?)`,
        [
          agreementId,
          userId,
          proProfileId,
          fullName || 'Talent Signatory',
          normalizedEmail,
          signatureType,
          signatureData,
          agreedToTerms ? 1 : 0,
          agreedToEscrow ? 1 : 0,
          agreedToAntiCircumvention ? 1 : 0,
          now,
        ]
      );
    }

    const { accessToken, refreshToken } = await generateTokens({
      id: userId,
      email: normalizedEmail,
      role: assignedRole,
    });

    logAuditEvent({
      actorId: userId,
      action: 'USER_REGISTER',
      entityType: 'users',
      entityId: userId,
      details: { email: normalizedEmail, role: assignedRole },
    });

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: userId,
          email: normalizedEmail,
          role: assignedRole,
          status: 'ACTIVE',
        },
        accessToken,
        refreshToken,
      },
    });

    response.cookies.set('auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day (aligned with accessToken expiration)
    });

    return response;
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}
