"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, Sparkles, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <FileText className="w-3.5 h-3.5" /> LEGAL DOCUMENTATION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service & Platform Governance
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-2">
          Effective Version: v1.0 • Last Revised: September 2026
        </p>
      </div>

      <div className="bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Dual Platform Structure</h2>
          <p>
            This web platform serves a dual purpose: (a) It functions as the flagship engineering portfolio and architectural showcase of Founder Abhishek Kumar, and (b) it operates as a curated professional services marketplace where verified independent professionals may list vetted portfolios and receive project commissions from registered clients.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Vetting & Verification Protocols</h2>
          <p>
            Professionals applying to the marketplace submit to rigorous manual inspection of identity, public code repositories, and work credentials. Verification is an administrative assessment of submitted technical history and does not constitute an employer-employee or agency relationship.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Platform Economic Architecture</h2>
          <p>
            All client contracts facilitated through the platform are governed by our dynamic fee schedule:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li><strong>Platform Success Fee:</strong> A standard 10% platform service fee is deducted upon client release of milestone escrow funds (<code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">Gross Amount - 10% = Net Professional Payout</code>).</li>
            <li><strong>Annual Membership Fee:</strong> Professionals pay an annual membership fee (<code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">₹7,000 / $70</code>) to cover manual identity vetting, compliance verification, and portfolio infrastructure.</li>
          </ul>
        </section>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-2">
          <p className="font-semibold text-amber-900 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600" /> 4. Mandatory Income & Work Disclaimer
          </p>
          <p>
            Payment of the professional membership fee covers vetting and platform infrastructure. <strong>It does not guarantee work, client commissions, project awards, or income.</strong> Client inquiries depend entirely upon market demand and verified portfolio quality.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Anti-Circumvention Policy</h2>
          <p>
            Users agree to conduct all negotiations, contracting, and payments for introduced engagements through the platform. Bypassing platform escrow systems to evade service fees will result in immediate termination of account privileges, forfeiture of verified credentials, and potential damages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Intellectual Property</h2>
          <p>
            Upon full release of milestone escrow payments, complete ownership and intellectual property rights for delivered custom code, architectures, and assets transfer unconditionally to the commissioning client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka, India.
          </p>
        </section>
      </div>
    </div>
  );
}
