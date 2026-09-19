'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  RefreshCw, 
  Bell, 
  Database, 
  Settings, 
  ArrowRight, 
  MessageCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function BusinessAutomationPage() {
  const features = [
    {
      title: 'Workflow Automation',
      description: 'Replace repetitive manual tasks with event-triggered background scripts, reducing errors and saving dozens of operational hours weekly.',
      icon: Zap,
    },
    {
      title: 'Lead Management',
      description: 'Instantly ingest leads from websites, WhatsApp, social channels and forms directly into categorized Google Sheets or CRM databases.',
      icon: Database,
    },
    {
      title: 'Real-Time Notifications',
      description: 'Receive immediate alerts on WhatsApp or Telegram the second a high-value customer submits an inquiry or booking request.',
      icon: Bell,
    },
    {
      title: 'Data Synchronization',
      description: 'Keep contact lists, order details, and customer activity synchronized across multiple operational tools with zero manual copying.',
      icon: RefreshCw,
    },
    {
      title: 'Custom Business Automations',
      description: 'Tailored scripts, webhook handlers, and backend services built specifically around your team’s proprietary business workflows.',
      icon: Settings,
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
          <span className="text-amber-400">Business Process Automation</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SERVICE 04 &bull; AUTOMATE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Business Process{' '}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Automation
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Automate repetitive business workflows so teams can spend more time serving customers and closing opportunities. Deterministic, reliable and low-maintenance.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20am%20interested%20in%20Business%20Automation%20workflows"
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

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-[#0D111A] via-[#131826] to-[#0D111A] border border-amber-500/30 rounded-2xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Have repetitive tasks eating up your time?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Tell us about your manual spreadsheets and follow-up bottlenecks. We will map out an autonomous workflow pipeline.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20let's%20automate%20our%20business%20workflows"
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
