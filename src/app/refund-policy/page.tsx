"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <RefreshCw className="w-3.5 h-3.5" /> PAYMENT DISPOSITION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-2">
          Milestone Escrows • Membership Fees • Dispute Redressal
        </p>
      </div>

      <div className="bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Client Milestone Escrow Refunds</h2>
          <p>
            Client funds held in platform escrow remain refundable prior to milestone approval. If a commissioned professional fails to deliver the agreed technical scope or breaches deadlines, the client may initiate a dispute to return funds to their original payment method.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Released Milestone Funds</h2>
          <p>
            Once a client explicitly inspects delivered code and clicks "Approve & Release Milestone", the funds (less the 10% platform fee) are disbursed to the professional. Released milestone funds are non-refundable through the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Professional Membership Fees</h2>
          <p>
            The annual professional verification fee covers manual review by senior engineers and KYC verification costs incurred immediately upon submission. Consequently, membership fees are non-refundable once administrative review commences, regardless of whether the application is verified or rejected.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Chargeback Prevention</h2>
          <p>
            Initiating a bank chargeback without first exhausting platform mediation triggers an immediate suspension of account privileges and referral to collections.
          </p>
        </section>
      </div>
    </div>
  );
}
