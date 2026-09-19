'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Scale,
  Percent,
  CheckCircle2,
  Lock,
  AlertTriangle,
  ArrowUpRight,
  Calculator,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import DigitalSignatureBox, { SignatureResult } from '@/components/ui/DigitalSignatureBox';

interface ProfessionalAgreementSectionProps {
  signerName?: string;
  onAgreementStateChange: (state: {
    agreedToTerms: boolean;
    agreedToEscrow: boolean;
    agreedToAntiCircumvention: boolean;
    isFullySigned: boolean;
    signature: SignatureResult | null;
  }) => void;
  compact?: boolean;
}

export default function ProfessionalAgreementSection({
  signerName = '',
  onAgreementStateChange,
  compact = false,
}: ProfessionalAgreementSectionProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToEscrow, setAgreedToEscrow] = useState(false);
  const [agreedToAntiCircumvention, setAgreedToAntiCircumvention] = useState(false);
  const [signature, setSignature] = useState<SignatureResult | null>(null);

  // Fee calculator interactive test amount
  const [calcAmount, setCalcAmount] = useState<number>(20000);
  const [showFullAgreement, setShowFullAgreement] = useState(false);

  const feePct = 20; // Explicit 20% platform fee
  const platformFee = Math.round((calcAmount * feePct) / 100);
  const netPayout = calcAmount - platformFee;

  // Sync state upward whenever any value changes
  const notifyChange = (
    terms: boolean,
    escrow: boolean,
    antiBypass: boolean,
    sig: SignatureResult | null
  ) => {
    const fullySigned = terms && escrow && antiBypass && (sig?.isSigned ?? false);
    onAgreementStateChange({
      agreedToTerms: terms,
      agreedToEscrow: escrow,
      agreedToAntiCircumvention: antiBypass,
      isFullySigned: fullySigned,
      signature: sig,
    });
  };

  const handleTermsToggle = (checked: boolean) => {
    setAgreedToTerms(checked);
    notifyChange(checked, agreedToEscrow, agreedToAntiCircumvention, signature);
  };

  const handleEscrowToggle = (checked: boolean) => {
    setAgreedToEscrow(checked);
    notifyChange(agreedToTerms, checked, agreedToAntiCircumvention, signature);
  };

  const handleAntiBypassToggle = (checked: boolean) => {
    setAgreedToAntiCircumvention(checked);
    notifyChange(agreedToTerms, agreedToEscrow, checked, signature);
  };

  const handleSignatureChange = (sig: SignatureResult) => {
    setSignature(sig);
    notifyChange(agreedToTerms, agreedToEscrow, agreedToAntiCircumvention, sig);
  };

  return (
    <div className="space-y-6">
      {/* 20% Platform Fee & Escrow Highlight Card */}
      <div className="bg-gradient-to-br from-[#0D111A] via-[#07090E] to-[#0D111A] border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-2">
              <Scale className="w-3.5 h-3.5" /> PLATFORM COVENANT &bull; VERSION 2026.2
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              20% Platform Success Commission &amp; Escrow Guarantee
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Transparent milestone economics. Client pays 100% upfront into Escrow &bull; 80% direct net payout to you upon completion.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-300 self-start sm:self-auto">
            <Percent className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs uppercase font-mono text-slate-400">Fixed Platform Fee</div>
              <div className="text-base font-black text-amber-400">20% On Release</div>
            </div>
          </div>
        </div>

        {/* 3 Step Financial Flow Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-[#07090E] border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Step 1: Upfront Escrow</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">100% SECURED</span>
            </div>
            <div className="text-sm font-bold text-white">Client Deposits 100%</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Client locks complete milestone funds into Rock Automations Escrow before any coding begins. Zero non-payment risk.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#07090E] border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Step 2: Platform Cut</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">20% COMMISSION</span>
            </div>
            <div className="text-sm font-bold text-amber-300">Rock Automations Retains 20%</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Deducted automatically on milestone release to cover lead generation, dispute escrow protection, and infrastructure.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#07090E] border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Step 3: Direct Payout</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">80% NET TO YOU</span>
            </div>
            <div className="text-sm font-bold text-emerald-400">You Receive 80% Payout</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Disbursed directly to your verified Indian Bank account / UPI within 24 hours of client signoff.
            </p>
          </div>
        </div>

        {/* Interactive Earnings Calculator */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#05070B] border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Interactive Net Payout Calculator
              </span>
            </div>
            <span className="text-xs text-slate-400">Formula: Net = Gross × 0.80</span>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[10000, 25000, 50000, 100000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setCalcAmount(preset)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                  calcAmount === preset
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                ₹{preset.toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          {/* Dynamic breakdown bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#07090E] border border-slate-800/80">
              <div className="text-slate-400 text-[10px] uppercase">Client Milestone Deposit</div>
              <div className="text-base font-bold text-white mt-0.5">₹{calcAmount.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-blue-400 mt-0.5">100% locked in escrow</div>
            </div>

            <div className="p-3 rounded-xl bg-[#07090E] border border-amber-500/20">
              <div className="text-slate-400 text-[10px] uppercase">Platform Commission (20%)</div>
              <div className="text-base font-bold text-amber-400 mt-0.5">-₹{platformFee.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-amber-400 mt-0.5">Rock Automations fee</div>
            </div>

            <div className="p-3 rounded-xl bg-[#07090E] border border-emerald-500/30 bg-emerald-950/10">
              <div className="text-slate-400 text-[10px] uppercase">Your Net Direct Payout (80%)</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">₹{netPayout.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Credited via UPI / NEFT</div>
            </div>
          </div>
        </div>

        {/* Expandable Full Legal Covenant Details */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowFullAgreement(!showFullAgreement)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-amber-300 transition py-1 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{showFullAgreement ? 'Hide Detailed Legal Covenants' : 'Read Full Legal Covenants & Terms (v2026.2)'}</span>
            </span>
            {showFullAgreement ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFullAgreement && (
            <div className="mt-3 p-4 rounded-2xl bg-[#05070B] border border-slate-800 text-xs text-slate-300 space-y-3.5 leading-relaxed max-h-64 overflow-y-auto">
              <div>
                <strong className="text-white block mb-1">1. Irrevocable 20% Platform Fee Authorization</strong>
                <p>
                  You irrevocably authorize Rock Automations to deduct exactly twenty percent (20%) from all gross client milestone disbursements. Net funds (80%) are disbursed to your designated bank account or UPI address within 24–48 hours following client milestone approval.
                </p>
              </div>

              <div>
                <strong className="text-white block mb-1">2. Upfront Escrow Security &amp; Dispute Protection</strong>
                <p>
                  Rock Automations mandates 100% upfront client milestone deposits before project initiation. Neither party may begin work without verified escrow confirmation. In case of milestone disputes, Rock Automations acts as neutral arbiter based on project scope specifications.
                </p>
              </div>

              <div>
                <strong className="text-white block mb-1">3. Strict 24-Month Non-Circumvention (Anti-Bypass) Covenant</strong>
                <p>
                  You expressly agree that for a period of twenty-four (24) months following any client introduction on Rock Automations, you will not solicit, invoice, or accept off-platform payments from said client. Bypassing the platform incurs immediate permanent expulsion, forfeiture of outstanding escrow balances, and a liquidated damages penalty of ₹1,00,000 or 30% of off-platform transaction value, whichever is higher.
                </p>
              </div>

              <div>
                <strong className="text-white block mb-1">4. Work Quality, Delivery Warranty &amp; Client IP Assignment</strong>
                <p>
                  You warrant that all deliverables are original, devoid of malicious backdoors, and compliant with production safety standards. Upon milestone settlement, all copyright, source code, and intellectual property rights transfer to the paying client.
                </p>
              </div>

              <div>
                <strong className="text-white block mb-1">5. Non-Guarantee of Inquiries or Income</strong>
                <p>
                  Directory verification establishes professional identity and marketplace eligibility. Rock Automations does not guarantee a minimum volume of leads, contracts, or income.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Checkboxes */}
      <div className="space-y-3">
        {/* Checkbox 1: 20% Fee & Escrow */}
        <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#0A0E17] border border-slate-800 hover:border-amber-500/40 cursor-pointer transition">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => handleTermsToggle(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
          />
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white block mb-0.5">20% Platform Commission &amp; Escrow Acceptance</strong>
            I have read and irrevocably accept the <Link href="/professional-agreement" target="_blank" className="text-amber-400 underline font-semibold">Professional Agreement</Link> and authorize Rock Automations to deduct a <strong>20% platform commission</strong> from gross milestone amounts upon client signoff.
          </div>
        </label>

        {/* Checkbox 2: Anti-Circumvention */}
        <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#0A0E17] border border-slate-800 hover:border-amber-500/40 cursor-pointer transition">
          <input
            type="checkbox"
            checked={agreedToAntiCircumvention}
            onChange={(e) => handleAntiBypassToggle(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
          />
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white block mb-0.5">Strict 24-Month Non-Circumvention Covenant</strong>
            I agree never to bypass Rock Automations by soliciting or accepting direct off-platform payments from clients met here. I understand that doing so results in immediate termination and financial penalty.
          </div>
        </label>

        {/* Checkbox 3: No Income Guarantee */}
        <label className="flex items-start gap-3 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-500/50 cursor-pointer transition">
          <input
            type="checkbox"
            checked={agreedToEscrow}
            onChange={(e) => handleEscrowToggle(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-amber-500/50 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
          />
          <div className="text-xs text-amber-200 leading-relaxed">
            <strong className="text-amber-300 block mb-0.5">Earning &amp; Membership Disclosure</strong>
            I acknowledge that verified directory listing confirms technical accreditation and marketplace access, and <u>DOES NOT</u> guarantee guaranteed leads, clients, or specific earnings.
          </div>
        </label>
      </div>

      {/* Embedded Digital Signature Box */}
      <div className="pt-2">
        <DigitalSignatureBox
          signerName={signerName}
          onSignatureChange={handleSignatureChange}
          title="Talent Digital Signature &amp; Legal Execution"
        />
      </div>
    </div>
  );
}
