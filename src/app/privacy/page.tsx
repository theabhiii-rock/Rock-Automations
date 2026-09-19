"use client";

import React from "react";
import Link from "next/link";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <Lock className="w-3.5 h-3.5" /> DATA PROTECTION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy & Security Architecture
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-2">
          GDPR & DPDP Act Compliant • Zero Third-Party Ad Trackers
        </p>
      </div>

      <div className="bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p>
            We collect personal information necessary to deliver marketplace services: account credentials (email, bcrypt password hashes), professional profiles (bio, skills, public repository URLs), verification documents (government ID proofs stored in encrypted object storage), and transactional metadata.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Immutable Audit Logging</h2>
          <p>
            To prevent fraud and maintain security integrity, administrative actions, login attempts, verification status changes, and settings revisions are recorded in an immutable audit ledger with timestamps and actor identifiers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Zero Data Monetization</h2>
          <p>
            We do not sell user data, personal dossiers, or contact information to third-party data brokers or advertising networks. Your data is used strictly to power matching, client messaging, and secure payouts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Data Retention & Deletion</h2>
          <p>
            Users may request full account deletion and purging of public profile dossiers at any time by contacting administration. Financial and regulatory audit records are retained as required by relevant tax and financial compliance regulations.
          </p>
        </section>
      </div>
    </div>
  );
}
