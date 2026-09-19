import crypto from 'node:crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_live_TaNGcTfOSL05Ds';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '[REDACTED]';

export interface CreateOrderParams {
  amount: number; // in INR rupees (will be converted to paise)
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export async function createRazorpayOrder({
  amount,
  currency = 'INR',
  receipt,
  notes = {},
}: CreateOrderParams): Promise<RazorpayOrder> {
  const amountInPaise = Math.round(amount * 100);
  const receiptId = receipt || `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const authHeader = 'Basic ' + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency,
      receipt: receiptId,
      notes: {
        company: 'Rock Automations',
        founder: 'Abhishek Kumar',
        ...notes,
      },
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.description || `Razorpay order creation failed: ${res.statusText}`);
  }

  return await res.json();
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!orderId || !paymentId || !signature) return false;

  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'utf-8'),
    Buffer.from(signature, 'utf-8')
  );
}

export const razorpayConfig = {
  keyId: RAZORPAY_KEY_ID,
  businessName: 'ROCK AUTOMATIONS',
  businessLogo: 'https://rockautomations.com/images/rock-automations-logo.png',
  themeColor: '#F59E0B',
};
