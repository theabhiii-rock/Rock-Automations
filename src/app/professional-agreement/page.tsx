"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  FileText,
  AlertCircle,
  Percent,
  Printer,
  ShieldCheck,
  Scale,
  Lock,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  DollarSign
} from "lucide-react";
import DigitalSignatureBox, { SignatureResult } from "@/components/ui/DigitalSignatureBox";

export default function ProfessionalAgreementPage() {
  const [signature, setSignature] = useState<SignatureResult | null>(null);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <Scale className="w-3.5 h-3.5" /> LEGAL COVENANT &bull; VERSION 2026.2
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Professional Agreement
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-2">
            Independent Contractor Terms &bull; 20% Platform Success Fee &bull; 100% Upfront Escrow &bull; Non-Circumvention
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Agreement</span>
          </button>
          <Link
            href="/join-professional"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-yellow-400 transition"
          >
            <span>Apply to Join</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Legal Agreement Body */}
      <div className="bg-[#0D111A] border border-amber-500/20 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-8 text-sm text-slate-300 leading-relaxed font-normal print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Preamble */}
        <div className="p-4 rounded-2xl bg-[#07090E] border border-slate-800 print:bg-slate-50 print:border-slate-300">
          <p className="text-xs text-slate-400 print:text-slate-600 leading-relaxed">
            This Verified Professional Membership Agreement (the &quot;Agreement&quot;) is executed between{" "}
            <strong className="text-white print:text-black">ROCK AUTOMATIONS</strong> (&quot;Platform&quot;, &quot;Company&quot;)
            and the individual or entity applying for or maintaining verified talent status (&quot;Professional&quot;, &quot;Contractor&quot;, &quot;You&quot;).
            By digitally signing, creating an account, or accepting client milestones on Rock Automations, you irrevocably agree to all terms herein.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <span className="text-amber-400 font-mono">1.</span> Scope of Engagement &amp; Contractor Autonomy
          </h2>
          <p>
            1.1. You engage with Rock Automations solely as an <strong>independent contractor</strong>. Nothing in this Agreement creates any partnership, joint venture, employer-employee relationship, or agency between you and the Platform.
          </p>
          <p>
            1.2. You retain absolute autonomy over your work hours, location, selection of software development tools, hardware, and methodologies, subject only to fulfilling agreed client milestones on schedule.
          </p>
        </section>

        {/* Section 2: 20% Platform Fee & Escrow */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <span className="text-amber-400 font-mono">2.</span> 20% Platform Success Fee &amp; 100% Upfront Escrow
          </h2>
          <p>
            2.1. <strong>Platform Success Fee:</strong> In consideration for client acquisition, lead qualification, project escrow management, and dispute arbitration infrastructure, you irrevocably authorize Rock Automations to deduct a <strong>twenty percent (20%) platform commission fee</strong> from all gross client payments upon milestone completion and approval.
          </p>

          <div className="p-4 rounded-2xl bg-[#07090E] border border-amber-500/30 print:bg-slate-100 print:border-slate-400 font-mono text-xs space-y-2">
            <div className="text-amber-400 print:text-black font-bold uppercase tracking-wider">
              Settlement Payout Formula:
            </div>
            <div className="text-white print:text-black font-semibold text-sm sm:text-base">
              Net Professional Payout = Gross Milestone Funds - (Gross Milestone Funds &times; 0.20)
            </div>
            <div className="text-slate-400 text-[11px] pt-1">
              Example: On a ₹50,000 project milestone, Rock Automations retains ₹10,000 (20%), and ₹40,000 (80%) is disbursed directly to your verified bank account or UPI.
            </div>
          </div>

          <p>
            2.2. <strong>100% Upfront Escrow Security:</strong> Rock Automations enforces mandatory 100% advance escrow funding. No work shall commence until the client has fully deposited the milestone budget into Platform Escrow.
          </p>
          <p>
            2.3. <strong>Disbursement Timeline:</strong> Following client milestone acceptance and signoff, your net payout (80%) is released within 24 to 48 business hours via instant NEFT, IMPS, or UPI.
          </p>
        </section>

        {/* Section 3: Anti-Circumvention (Non-Bypass) */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <span className="text-amber-400 font-mono">3.</span> Strict 24-Month Non-Circumvention (Anti-Bypass) Covenant
          </h2>
          <p>
            3.1. <strong>Direct Payment Prohibition:</strong> For a period of twenty-four (24) months from the date of initial client introduction or inquiry on Rock Automations, you shall not, directly or indirectly, solicit, accept payments from, invoice, or perform freelance or contracting services for said client outside the Rock Automations platform.
          </p>
          <p>
            3.2. <strong>Circumvention Remedies &amp; Penalties:</strong> Any violation of this non-circumvention covenant constitutes material breach, resulting in:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs">
            <li>Immediate and permanent forfeiture of verified directory status and badge;</li>
            <li>Forfeiture of all pending escrow balances;</li>
            <li>Liquidated damages payable to Rock Automations equal to ₹1,00,000 (Rupees One Lakh) or thirty percent (30%) of the total gross value of the off-platform engagement, whichever is greater.</li>
          </ul>
        </section>

        {/* Section 4: Quality & Delivery */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <span className="text-amber-400 font-mono">4.</span> Quality Benchmarks &amp; Code Security Warranty
          </h2>
          <p>
            4.1. You warrant that all source code, workflows, automation bots, and assets delivered to clients are 100% original or properly licensed open-source, completely free of malware, spyware, backdoors, or unauthorized licensing encumbrances.
          </p>
          <p>
            4.2. You agree to adhere strictly to agreed milestones, provide prompt responses within 24 hours on active projects, and offer reasonable post-launch bug fixes within the project scope.
          </p>
        </section>

        {/* Section 5: IP Assignment */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <span className="text-amber-400 font-mono">5.</span> Intellectual Property Assignment &amp; NDA
          </h2>
          <p>
            5.1. Upon full release and settlement of the milestone payout, all proprietary rights, title, source code, and copyright in the completed deliverable automatically transfer to the paying client.
          </p>
          <p>
            5.2. You shall maintain strict confidentiality regarding all client data, business logic, customer lists, and proprietary code encountered during the project engagement.
          </p>
        </section>

        {/* Section 6: Earning Disclosure */}
        <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-2">
          <p className="font-bold text-amber-300 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            6. Non-Guarantee of Leads or Income Disclosure
          </p>
          <p className="leading-relaxed">
            You explicitly acknowledge that platform verification evaluates technical expertise, identity, and past portfolio credibility. Verification does not constitute an employment contract, and Rock Automations does not guarantee a minimum number of client inquiries, project commissions, or income.
          </p>
        </div>

        {/* Section 7: Legal Electronic Signature Stamp */}
        <section className="space-y-3 pt-2">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <span className="text-amber-400 font-mono">7.</span> Electronic Execution &amp; Statutory Legal Validity
          </h2>
          <p>
            Pursuant to <strong>Section 10A of the Information Technology Act, 2000 (India)</strong> and international electronic commerce frameworks, electronic signatures, check-box consents, and digital hashes executed on this platform possess full legal validity, enforceability, and admissibility in a court of law.
          </p>
        </section>

        {/* Live Digital Signature Demonstration / Verification Block */}
        <div className="pt-6 border-t border-slate-800 space-y-4 print:hidden">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Digital Consent &amp; Execution Pad</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">
              Active Form Version 2026.2
            </span>
          </div>

          <DigitalSignatureBox
            signerName=""
            onSignatureChange={(sig) => setSignature(sig)}
            title="Professional Signature &amp; Acknowledgement"
          />

          <div className="p-3.5 rounded-xl bg-[#07090E] border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Signatures submitted during onboarding are archived permanently in the platform audit registry.</span>
            </div>
            <Link
              href="/join-professional"
              className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Go to Onboarding</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
