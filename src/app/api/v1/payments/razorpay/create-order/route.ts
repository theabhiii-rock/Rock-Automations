import { NextResponse } from 'next/server';
import { createRazorpayOrder, razorpayConfig } from '@/lib/razorpay';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
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

    if (!amount || amount <= 0) {
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
    console.error('Razorpay create-order error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'PAYMENT_ERROR', message: error.message || 'Failed to initialize payment' } },
      { status: 500 }
    );
  }
}
