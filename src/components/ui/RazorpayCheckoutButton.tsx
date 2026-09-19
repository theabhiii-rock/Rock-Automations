'use client';

import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

interface RazorpayCheckoutButtonProps {
  planName: string;
  amount: number; // in INR
  className?: string;
  buttonText?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayCheckoutButton({
  planName,
  amount,
  className = '',
  buttonText,
  customerName = '',
  customerEmail = '',
  customerPhone = '',
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // Load script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // Create order
      const res = await fetch('/api/v1/payments/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          planName,
          customerName,
          customerEmail,
          customerPhone,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        throw new Error(orderData.error?.message || 'Failed to initiate payment.');
      }

      const { orderId, keyId, businessName, themeColor } = orderData.data;

      // Razorpay options
      const options = {
        key: keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: amount * 100,
        currency: 'INR',
        name: businessName || 'ROCK AUTOMATIONS',
        description: `Plan: ${planName}`,
        image: '/images/rock-automations-logo.png',
        order_id: orderId,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            setLoading(true);
            const verifyRes = await fetch('/api/v1/payments/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount,
                planName,
                customerName,
                customerEmail,
                customerPhone,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentSuccess(response.razorpay_payment_id);
            } else {
              setErrorMsg(verifyData.error?.message || 'Payment verification failed');
            }
          } catch (err: any) {
            setErrorMsg(err.message || 'Payment verification error');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: customerName || 'Valued Client',
          email: customerEmail || 'rockautomations@gmail.com',
          contact: customerPhone || '+916209817520',
        },
        theme: {
          color: themeColor || '#F59E0B',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err: any) {
      console.error('Payment error:', err);
      setErrorMsg(err.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Payment Successful!</span>
        </div>
        <p className="text-xs text-emerald-400/80 font-mono">
          Ref ID: {paymentSuccess}
        </p>
        <a
          href={`https://wa.me/916209817520?text=${encodeURIComponent(`Hi Abhishek! I just paid ₹${amount.toLocaleString('en-IN')} for ${planName}. Payment Ref: ${paymentSuccess}. Let's get started!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-1.5 rounded-lg bg-[#25D366] text-black font-extrabold text-xs hover:bg-[#20bd5a] transition"
        >
          Confirm Onboarding on WhatsApp &rarr;
        </a>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <button
        onClick={handlePayment}
        disabled={loading}
        className={
          className ||
          'w-full py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-50'
        }
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-black" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>{buttonText || `Pay ₹${amount.toLocaleString('en-IN')} Securely`}</span>
          </>
        )}
      </button>
      {errorMsg && (
        <p className="text-xs text-rose-400 text-center">{errorMsg}</p>
      )}
    </div>
  );
}
