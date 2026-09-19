"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export default function ClientAgreementPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5" /> CLIENT CONTRACT TERMS
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Client Services & Escrow Agreement
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-2">
          Milestone Protection • Full IP Assignment • Delivery Verification
        </p>
      </div>

      <div className="bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Milestone Escrow System</h2>
          <p>
            When commissioning engineering projects, client funds are held securely in platform escrow. Professionals work toward concrete deliverables and cannot draw down milestone funds until the client explicitly reviews and approves the work.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Full Intellectual Property Assignment</h2>
          <p>
            Upon release of milestone funds, all source code, software architecture, technical documentation, design assets, and database schemas created for that milestone become the exclusive intellectual property of the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Review Period & Inspection</h2>
          <p>
            Clients receive a standard 14-day inspection window upon submission of a milestone deliverable to test code, review documentation, or request reasonable revisions within the agreed scope.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Confidentiality & Non-Disclosure</h2>
          <p>
            All business data, proprietary source code, and trade secrets disclosed by the client to verified marketplace professionals are protected under platform standard non-disclosure covenants.
          </p>
        </section>
      </div>
    </div>
  );
}
