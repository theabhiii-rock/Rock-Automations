import { NextResponse } from 'next/server';
import { execute, queryOne } from '@/lib/db';
import { hashPassword, generateTokens, getCurrentUser } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import { paymentProvider } from '@/lib/payments';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      fullName,
      username,
      title,
      country = 'India',
      hourlyRate = 50,
      currency = 'USD',
      experienceYears = 2,
      bio,
      skills = [],
      portfolio = [],
      verificationDocs = {},
      payment = {},
      acceptedTerms,
    } = body;

    const hasAcceptedTerms = acceptedTerms ?? body.agreedToTerms ?? (body.termsVersion ? true : false);
    if (!hasAcceptedTerms) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TERMS_NOT_ACCEPTED',
            message: 'You must actively accept the 20% Platform Fee Agreement and Terms & Conditions before joining.',
          },
        },
        { status: 400 }
      );
    }

    let user = await getCurrentUser(request);
    let userId = user?.id;
    let accessToken: string | null = null;
    let refreshToken: string | null = null;

    const now = new Date().toISOString();

    // 1. If not logged in, create the user
    if (!userId) {
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: { code: 'VALIDATION_ERROR', message: 'Email and password are required for registration' } },
          { status: 400 }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();
      const existing = queryOne('SELECT id FROM users WHERE email = ?', [normalizedEmail]);
      if (existing) {
        return NextResponse.json(
          { success: false, error: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists. Please log in first.' } },
          { status: 409 }
        );
      }

      userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const passwordHash = await hashPassword(password);

      execute(
        `INSERT INTO users (id, email, password_hash, role, status, created_at, updated_at)
         VALUES (?, ?, ?, 'PROFESSIONAL', 'ACTIVE', ?, ?)`,
        [userId, normalizedEmail, passwordHash, now, now]
      );

      const tokens = await generateTokens({
        id: userId,
        email: normalizedEmail,
        role: 'PROFESSIONAL',
      });
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
    } else {
      // Elevate existing user role if needed
      execute(`UPDATE users SET role = 'PROFESSIONAL' WHERE id = ?`, [userId]);
    }

    // 2. Validate unique username
    const cleanUsername = (username || fullName.replace(/\s+/g, '_')).toLowerCase().replace(/[^a-z0-9_]/g, '');
    const existingPro = queryOne('SELECT id FROM professional_profiles WHERE username = ? AND user_id != ?', [cleanUsername, userId]);
    if (existingPro) {
      return NextResponse.json(
        { success: false, error: { code: 'USERNAME_EXISTS', message: 'Username is already taken. Please choose another.' } },
        { status: 409 }
      );
    }

    // 3. Fetch Dynamic Settings for Terms and Pricing
    const termsSetting = queryOne<{ value: string }>('SELECT value FROM system_settings WHERE key = ?', ['terms_version']);
    const termsVersion = termsSetting?.value || '2026.1';

    const priceSettingKey = currency === 'INR' ? 'membership_price_inr' : 'membership_price_usd';
    const priceSetting = queryOne<{ value: string }>('SELECT value FROM system_settings WHERE key = ?', [priceSettingKey]);
    const membershipPrice = parseFloat(priceSetting?.value || (currency === 'INR' ? '7000' : '70'));

    const autoApproveSetting = queryOne<{ value: string }>('SELECT value FROM system_settings WHERE key = ?', ['auto_approve_professionals']);
    const autoApprove = autoApproveSetting?.value === 'true';
    const initialVerificationStatus = autoApprove ? 'VERIFIED' : 'UNDER_REVIEW';

    // 4. Create or Update Professional Profile
    const proId = 'pro_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

    execute(
      `INSERT OR REPLACE INTO professional_profiles (
        id, user_id, username, full_name, title, country, hourly_rate, currency,
        experience_years, bio, avatar_url, is_featured, verification_status,
        membership_status, membership_expires_at, github_url, linkedin_url,
        rating_avg, review_count, completed_projects_count, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 'ACTIVE', ?, ?, ?, 5.0, 0, 0, ?)`,
      [
        proId,
        userId,
        cleanUsername,
        fullName || 'Professional',
        title || 'Digital Professional',
        country,
        hourlyRate,
        currency,
        experienceYears,
        bio || '',
        '/images/abhishek-kumar.png',
        initialVerificationStatus,
        expiresAt,
        body.githubUrl || null,
        body.linkedinUrl || null,
        now,
      ]
    );

    // 5. Link Selected Skills
    if (Array.isArray(skills)) {
      for (const skillId of skills) {
        execute(
          'INSERT OR IGNORE INTO professional_skills (professional_id, skill_id, is_primary) VALUES (?, ?, 1)',
          [proId, skillId]
        );
      }
    }

    // 6. Save Portfolio Projects if submitted
    if (Array.isArray(portfolio)) {
      for (const item of portfolio) {
        if (item.title) {
          const pId = 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
          const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          execute(
            `INSERT INTO portfolio_projects (
              id, professional_id, title, slug, category_id, description,
              workflow_steps, technologies, images, featured, sort_order, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?)`,
            [
              pId,
              proId,
              item.title,
              slug,
              item.categoryId || 'cat_ai',
              item.description || 'Professional portfolio showcase project.',
              item.workflowSteps ? JSON.stringify(item.workflowSteps) : null,
              JSON.stringify(item.technologies || ['Python', 'TypeScript']),
              JSON.stringify(item.images || ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800']),
              now,
            ]
          );
        }
      }
    }

    // 7. Record Verification Request
    const verReqId = 'ver_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const verificationNotes = body.signatureData
      ? `Signed digitally under IT Act 2000 (Type: ${body.signatureType || 'DRAWN'}). Terms accepted at ${now}.`
      : (verificationDocs.notes || 'Submitted via 8-step onboarding wizard.');

    execute(
      `INSERT INTO verification_requests (
        id, professional_id, id_document_type, id_document_url, portfolio_links, notes, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        verReqId,
        proId,
        verificationDocs.idType || 'Government ID / Passport',
        verificationDocs.documentUrl || 'https://example.com/mock-id.pdf',
        JSON.stringify(verificationDocs.portfolioLinks || []),
        verificationNotes,
        initialVerificationStatus,
        now,
      ]
    );

    // 7b. Record Digital Agreement
    if (body.signatureData) {
      const agrId = 'agr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      execute(
        `INSERT INTO professional_agreements (
          id, user_id, professional_id, full_name, email, platform_fee_percent, terms_version,
          signature_type, signature_data, agreed_to_terms, agreed_to_escrow, agreed_to_anti_circumvention, signed_at
        ) VALUES (?, ?, ?, ?, ?, 20.0, ?, ?, ?, 1, 1, 1, ?)`,
        [
          agrId,
          userId,
          proId,
          body.signerName || fullName || 'Talent Signatory',
          email || user?.email || '',
          termsVersion || '2026.2',
          body.signatureType || 'DRAWN',
          body.signatureData,
          now,
        ]
      );
    }

    // 8. Record Membership & Simulated Payment
    const memId = 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    execute(
      `INSERT INTO memberships (
        id, user_id, plan_name, amount, currency, duration_days, started_at, expires_at, status, terms_version, terms_accepted_at
      ) VALUES (?, ?, 'Annual Professional Membership', ?, ?, 365, ?, ?, 'ACTIVE', ?, ?)`,
      [memId, userId, membershipPrice, currency, now, expiresAt, termsVersion, now]
    );

    const paymentIntent = await paymentProvider.createPaymentIntent({
      userId,
      type: 'MEMBERSHIP',
      amount: membershipPrice,
      currency,
      description: 'Annual Professional Membership',
    });

    await paymentProvider.confirmPayment(paymentIntent.paymentId, 'SUCCESS');

    // 9. Audit Logging
    logAuditEvent({
      actorId: userId,
      action: 'PROFESSIONAL_ONBOARDING_COMPLETED',
      entityType: 'professional_profiles',
      entityId: proId,
      details: {
        username: cleanUsername,
        amount: membershipPrice,
        currency,
        terms_version: termsVersion,
        verification_status: initialVerificationStatus,
      },
    });

    const response = NextResponse.json({
      success: true,
      data: {
        message: 'Registration and membership successfully processed!',
        professional: {
          id: proId,
          username: cleanUsername,
          verification_status: initialVerificationStatus,
          membership_status: 'ACTIVE',
        },
      },
    });

    if (accessToken) {
      response.cookies.set('auth_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error: any) {
    console.error('Professional onboarding error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message || 'Failed to complete registration' } },
      { status: 500 }
    );
  }
}
