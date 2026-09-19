'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function AiOutreachPage() {
  const features = [
    {
      title: 'AI-Powered Messaging',
      description: 'Draft context-aware, value-first messages tailored to each prospect’s operational profile and specific business niche.',
      icon: MessageSquare,
    },
    {
      title: 'Personalization',
      description: 'Dynamically customize business references, service requirements, and pain-point discussions with zero generic boilerplate.',
      icon: Sparkles,
    },
    {
      title: 'Follow-Up Automation',
      description: 'Execute courteous, multi-touch follow-up cadences that respect recipient timing and keep conversations active.',
      icon: Clock,
    },
    {
      title: 'Lead Qualification',
      description: 'Route engaged responses to immediate review, classifying warm inquiries and scheduling discovery calls seamlessly.',
      icon: CheckCircle2,
    },
    {
      title: 'Outreach Campaigns',
      description: 'Run targeted, compliant communication cycles across official WhatsApp Business channels and professional email touchpoints.',
      icon: Send,
    },
  ];

  return (
    <div className="w-full bg-[#07090E] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400">AI Outreach</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SERVICE 02 &bull; ENGAGE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            AI Outreach &{' '}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Follow-Up Workflows
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Connect with potential customers through personalized, structured and scalable outreach workflows. We design controlled, compliant messaging sequences that start meaningful business relationships.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20am%20interested%20in%20AI%20Outreach%20workflows"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Discuss on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-[#0D111A] hover:bg-amber-500/10 border border-amber-500/40 text-amber-300 font-bold text-sm transition-all"
            >
              <span>View Pricing</span>
            </Link>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="space-y-6 pt-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Core Capabilities</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0D111A] rounded-2xl border border-slate-800 hover:border-amber-500/40 p-6 space-y-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality & Compliance Note */}
        <div className="bg-[#0D111A] border border-slate-800 rounded-2xl p-6 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Controlled & Compliant Outreach Standard</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              ROCK AUTOMATIONS systems never engage in blind bulk blasting or disruptive spam. Every sequence is strictly cadence-controlled, personalized, and architected to uphold long-term brand integrity and messaging compliance.
            </p>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-[#0D111A] via-[#131826] to-[#0D111A] border border-amber-500/30 rounded-2xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need structured, automated outreach for your pipeline?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Let's design a custom messaging cadence that qualifies opportunities and saves hours of manual work.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20let's%20build%20an%20AI%20outreach%20workflow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Talk to ROCK on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
