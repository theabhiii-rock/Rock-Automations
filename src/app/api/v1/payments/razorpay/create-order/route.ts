import { NextResponse } from 'next/server';
import { createRazorpayOrder, razorpayConfig } from '@/lib/razorpay';
import { getCurrentUser } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`rzp_order_${clientIp}`, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Too many payment initialization requests. Please wait ${rateCheck.retryAfterSeconds} seconds.`,
          },
        },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) } }
      );
    }

    const user = await getCurrentUser(request);
    const body = await request.json();

    const {
      amount,
      planName = 'Automation Plan',
      customerName = 'Customer',
      customerEmail = 'rockautomations@gmail.com',
      customerPhone = '',
      type = 'SERVICE_PLAN',
    } = body;

    const numAmount = Number(amount);
    if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_AMOUNT', message: 'Valid payment amount is required' } },
        { status: 400 }
      );
    }

    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const order = await createRazorpayOrder({
      amount: Number(amount),
      currency: 'INR',
      receipt,
      notes: {
        planName,
        customerName,
        customerEmail,
        customerPhone,
        userId: user ? user.id : 'guest',
        type,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: razorpayConfig.keyId,
        businessName: razorpayConfig.businessName,
        themeColor: razorpayConfig.themeColor,
      },
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error?.message || 'Payment error');
    return NextResponse.json(
      { success: false, error: { code: 'PAYMENT_ERROR', message: 'Failed to initialize payment. Please try again or contact support.' } },
      { status: 500 }
    );
  }
}
