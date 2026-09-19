import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { verifyPassword, generateTokens } from '@/lib/auth';
import { User } from '@/lib/types';
import { logAuditEvent } from '@/lib/audit';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email and password are required' } },
        { status: 400 }
      );
    }

    const user = queryOne<User>('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_FAILED', message: 'Invalid email or password' } },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_FAILED', message: 'Invalid email or password' } },
        { status: 401 }
      );
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        { success: false, error: { code: 'ACCOUNT_SUSPENDED', message: 'This account has been suspended by administration.' } },
        { status: 403 }
      );
    }

    const { accessToken, refreshToken } = await generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    logAuditEvent({
      actorId: user.id,
      action: 'USER_LOGIN',
      entityType: 'users',
      entityId: user.id,
      details: { email: user.email, role: user.role },
    });

    // Check if user has a professional or client profile
    const proProfile = queryOne('SELECT id, username, full_name, is_featured, verification_status FROM professional_profiles WHERE user_id = ?', [user.id]);
    const clientProfile = queryOne('SELECT id, full_name, company_name FROM client_profiles WHERE user_id = ?', [user.id]);

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          professionalProfile: proProfile,
          clientProfile: clientProfile,
        },
        accessToken,
        refreshToken,
      },
    });

    // Set cookie for web sessions
    response.cookies.set('auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}
