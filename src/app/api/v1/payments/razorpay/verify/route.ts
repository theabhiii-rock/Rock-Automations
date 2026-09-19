import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { execute, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser(request);
    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      planName = 'Automation Plan',
      customerName = 'Customer',
      customerEmail = 'rockautomations@gmail.com',
      customerPhone = '',
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PAYMENT_DETAILS', message: 'Incomplete payment verification payload' } },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_SIGNATURE', message: 'Payment verification failed: invalid signature' } },
        { status: 400 }
      );
    }

    // Determine or create User
    let userId = user ? user.id : null;
    const now = new Date().toISOString();

    if (!userId) {
      const email = customerEmail || `guest_${Date.now()}@rockautomations.com`;
      const existing = queryOne<{ id: string }>('SELECT id FROM users WHERE email = ?', [email]);
      if (existing) {
        userId = existing.id;
      } else {
        userId = 'usr_guest_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
        execute(
          `INSERT INTO users (id, email, password_hash, role, status, created_at, updated_at)
           VALUES (?, ?, 'NOPASSWORD', 'GUEST', 'ACTIVE', ?, ?)`,
          [userId, email, now, now]
        );
      }
    }

    const paymentId = 'pay_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const paidAmount = Number(amount) || 0;

    execute(
      `INSERT INTO payments (
        id, user_id, project_id, type, amount, currency, status, provider, provider_transaction_id, created_at, completed_at
      ) VALUES (?, ?, NULL, 'MEMBERSHIP', ?, 'INR', 'SUCCESS', 'RAZORPAY_LIVE', ?, ?, ?)`,
      [paymentId, userId, paidAmount, razorpay_payment_id, now, now]
    );

    logAuditEvent({
      actorId: userId,
      action: 'PAYMENT_RECEIVED',
      entityType: 'payments',
      entityId: paymentId,
      details: {
        provider: 'RAZORPAY',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: paidAmount,
        planName,
        customerName,
        customerEmail,
        customerPhone,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        message: 'Payment verified and confirmed successfully!',
        paymentId,
        orderId: razorpay_order_id,
        transactionId: razorpay_payment_id,
        planName,
        receiptEmail: customerEmail,
      },
    });
  } catch (error: any) {
    console.error('Razorpay verify error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'VERIFICATION_ERROR', message: error.message || 'Payment verification failed' } },
      { status: 500 }
    );
  }
}
