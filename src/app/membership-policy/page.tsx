"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function MembershipPolicyPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> PROFESSIONAL STANDARDS
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Verified Membership Policy
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-2">
          Vetting Criteria • Terms of Acceptance • Non-Guarantee Disclosure
        </p>
      </div>

      <div className="bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Eligibility Criteria</h2>
          <p>
            Membership is open exclusively to software engineers, AI architects, automation developers, and digital practitioners with verifiable track records. Applicants must supply legitimate LinkedIn credentials, repository links, and government ID documentation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Annual Fee & Maintenance</h2>
          <p>
            The annual membership fee of ₹7,000 / $70 provides 12 months of active verified listing, portfolio hosting, lead inquiry routing, and access to platform escrow services. Renewal requires ongoing compliance with code quality standards and low dispute rates.
          </p>
        </section>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-2">
          <p className="font-semibold text-amber-900 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600" /> 3. Strict Non-Guarantee of Work
          </p>
          <p>
            Under no circumstances does verified membership constitute a promise of client commissions, contract awards, or financial remuneration. Client engagements are initiated solely at client discretion based on individual technical merit.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Code of Conduct & Revocation</h2>
          <p>
            Verified status may be revoked without refund if a member submits malicious code, breaches client confidentiality, engages in platform disintermediation, or engages in fraudulent identity misrepresentation.
          </p>
        </section>
      </div>
    </div>
  );
}
