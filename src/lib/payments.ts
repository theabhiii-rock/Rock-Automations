import { Currency, PaymentStatus, PaymentType } from './types';
import { execute, queryOne } from './db';

export interface PaymentIntentRequest {
  userId: string;
  projectId?: string;
  type: PaymentType;
  amount: number;
  currency: Currency;
  description?: string;
}

export interface PaymentResult {
  paymentId: string;
  transactionId: string;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
  provider: string;
  timestamp: string;
}

export interface FeeCalculation {
  grossAmount: number;
  feePercentage: number;
  feeAmount: number;
  netProfessionalAmount: number;
  currency: Currency;
}

export function calculatePlatformFee(grossAmount: number, feePercentage: number, currency: Currency): FeeCalculation {
  const feeAmount = Math.round((grossAmount * (feePercentage / 100)) * 100) / 100;
  const netProfessionalAmount = Math.round((grossAmount - feeAmount) * 100) / 100;

  return {
    grossAmount,
    feePercentage,
    feeAmount,
    netProfessionalAmount,
    currency,
  };
}

export interface IPaymentProvider {
  createPaymentIntent(req: PaymentIntentRequest): Promise<{ paymentId: string; redirectUrl?: string; clientSecret?: string }>;
  confirmPayment(paymentId: string, simulateOutcome?: 'SUCCESS' | 'FAILED'): Promise<PaymentResult>;
  refundPayment(paymentId: string, amount?: number): Promise<{ success: boolean; refundId: string }>;
}

/**
 * Sandbox Provider for India (UPI/NetBanking) and International (Stripe/Card) flows.
 * Real production hooks for Razorpay and Stripe plug into this same interface.
 */
export class SandboxPaymentProvider implements IPaymentProvider {
  name = 'SANDBOX_HYBRID_ENGINE';

  async createPaymentIntent(req: PaymentIntentRequest): Promise<{ paymentId: string; redirectUrl?: string }> {
    const paymentId = 'pay_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const txId = 'tx_sandbox_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const now = new Date().toISOString();

    execute(
      `INSERT INTO payments (id, user_id, project_id, type, amount, currency, status, provider, provider_transaction_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'PENDING', ?, ?, ?)`,
      [paymentId, req.userId, req.projectId || null, req.type, req.amount, req.currency, this.name, txId, now]
    );

    return {
      paymentId,
      redirectUrl: `/checkout/sandbox?paymentId=${paymentId}&amount=${req.amount}&currency=${req.currency}`,
    };
  }

  async confirmPayment(paymentId: string, simulateOutcome: 'SUCCESS' | 'FAILED' = 'SUCCESS'): Promise<PaymentResult> {
    const payment = queryOne<{
      id: string;
      user_id: string;
      project_id: string | null;
      type: PaymentType;
      amount: number;
      currency: Currency;
      provider_transaction_id: string;
    }>('SELECT * FROM payments WHERE id = ?', [paymentId]);

    if (!payment) {
      throw new Error('Payment record not found');
    }

    const now = new Date().toISOString();
    const newStatus: PaymentStatus = simulateOutcome === 'SUCCESS' ? 'SUCCESS' : 'FAILED';

    execute(
      `UPDATE payments SET status = ?, completed_at = ? WHERE id = ?`,
      [newStatus, now, paymentId]
    );

    return {
      paymentId,
      transactionId: payment.provider_transaction_id,
      status: newStatus,
      amount: payment.amount,
      currency: payment.currency,
      provider: this.name,
      timestamp: now,
    };
  }

  async refundPayment(paymentId: string): Promise<{ success: boolean; refundId: string }> {
    const refundId = 'ref_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    execute(
      `UPDATE payments SET status = 'REFUNDED' WHERE id = ?`,
      [paymentId]
    );
    return { success: true, refundId };
  }
}

export const paymentProvider = new SandboxPaymentProvider();
