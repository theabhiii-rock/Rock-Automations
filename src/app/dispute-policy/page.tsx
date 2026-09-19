"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Scale, ShieldCheck } from "lucide-react";

export default function DisputePolicyPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <Scale className="w-3.5 h-3.5" /> ARBITRATION & MEDIATION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Dispute Resolution & Escrow Arbitration
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-2">
          Technical Code Mediation • Objective Deliverable Verification
        </p>
      </div>

      <div className="bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. The Dispute Lifecycle</h2>
          <p>
            When a disagreement arises regarding milestone deliverables, either party may file a formal dispute through the platform. The escrowed funds remain frozen until a mutual agreement or formal administrative decision is reached.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Engineering Code Audits</h2>
          <p>
            Unlike general freelance platforms, our arbitration board comprises senior software architects. In a dispute, code repositories, commits, test suite coverage, and documented requirements are audited objectively against the agreed scope of work.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Resolution Options</h2>
          <p>
            The arbitration board may determine: (a) Full release to the professional if deliverables meet agreed criteria, (b) Partial release and partial refund for incomplete deliverables, or (c) Full refund to the client in cases of non-delivery or catastrophic defects.
          </p>
        </section>
      </div>
    </div>
  );
}
