import { NextResponse } from 'next/server';
import { execute, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { paymentProvider } from '@/lib/payments';
import { logAuditEvent } from '@/lib/audit';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const { currency = 'INR', termsAccepted } = await request.json();

    if (!termsAccepted) {
      return NextResponse.json(
        { success: false, error: { code: 'TERMS_REQUIRED', message: 'Active terms acceptance required before payment.' } },
        { status: 400 }
      );
    }

    const priceKey = currency === 'INR' ? 'membership_price_inr' : 'membership_price_usd';
    const priceSetting = queryOne<{ value: string }>('SELECT value FROM system_settings WHERE key = ?', [priceKey]);
    const amount = parseFloat(priceSetting?.value || (currency === 'INR' ? '7000' : '70'));

    const intent = await paymentProvider.createPaymentIntent({
      userId: user.id,
      type: 'MEMBERSHIP',
      amount,
      currency,
      description: 'Annual Professional Membership',
    });

    // Simulate completion
    const confirmation = await paymentProvider.confirmPayment(intent.paymentId, 'SUCCESS');

    // Update or insert membership
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    const memId = 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

    execute(
      `INSERT OR REPLACE INTO memberships (
        id, user_id, plan_name, amount, currency, duration_days, started_at, expires_at, status, terms_version, terms_accepted_at
      ) VALUES (?, ?, 'Annual Professional Membership', ?, ?, 365, ?, ?, 'ACTIVE', '2026.1', ?)`,
      [memId, user.id, amount, currency, now, expiresAt, now]
    );

    execute(
      `UPDATE professional_profiles SET membership_status = 'ACTIVE', membership_expires_at = ? WHERE user_id = ?`,
      [expiresAt, user.id]
    );

    logAuditEvent({
      actorId: user.id,
      action: 'MEMBERSHIP_PAYMENT_SUCCESS',
      entityType: 'memberships',
      entityId: memId,
      details: { amount, currency, transactionId: confirmation.transactionId },
    });

    return NextResponse.json({
      success: true,
      data: {
        message: 'Membership activated successfully!',
        transactionId: confirmation.transactionId,
        expiresAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
