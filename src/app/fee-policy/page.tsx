"use client";

import React from "react";
import Link from "next/link";
import { DollarSign, ShieldCheck, Sparkles, Percent, ArrowRight } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

export default function FeePolicyPage() {
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <Percent className="w-3.5 h-3.5" /> REVENUE & TAKE-RATE TRANSPARENCY
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Platform Fee & Commission Policy
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-2">
          Mathematical Formulation • Dynamic Settings Governed by Administration
        </p>
      </div>

      <div className="bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">1. The 10% Success Fee Formula</h2>
          <p>
            Unlike opaque marketplace commissions with hidden tier multipliers, our fee schedule is simple, deterministic, and auditable on every milestone:
          </p>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs sm:text-sm text-center text-white space-y-2">
            <div className="text-indigo-600 font-bold">
              NET PROFESSIONAL PAYOUT = GROSS ESCROW MILESTONE - (GROSS × 10%)
            </div>
            <div className="text-xs text-slate-400">
              Example: On a $5,000 Milestone → $500 Platform Fee → $4,500 Disbursed to Professional
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. What the 10% Success Fee Funds</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Escrow fund custody, fraud prevention, and anti-chargeback guarantees.</li>
            <li>Multi-tier identity and technical verification pipelines.</li>
            <li>Enterprise code dispute resolution and technical architecture mediation.</li>
            <li>High-availability infrastructure, telemetry, and automated invoice reconciliation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Annual Professional Membership Fee</h2>
          <p>
            An annual fee of <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">₹7,000 / $70</code> is billed upon verification submission. This directly subsidizes the senior engineering time required to inspect applicant source repositories and verify personal credentials.
          </p>
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>Disclosure:</strong> The membership fee does not guarantee client placement, job volume, or revenue. It grants access to the verified network and indexed directory presence.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Client Payment Processing</h2>
          <p>
            Clients fund milestones using standard international credit/debit cards, UPI, or NetBanking through our integrated payment gateways (Stripe, Razorpay, or platform sandbox). Third-party interchange fees are displayed transparently at checkout.
          </p>
        </section>
      </div>
    </div>
  );
}
