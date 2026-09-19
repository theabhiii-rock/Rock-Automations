'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  MapPin, 
  MessageSquare, 
  Globe, 
  TrendingUp, 
  CheckCircle2, 
  MessageCircle,
  Zap,
  Sparkles
} from 'lucide-react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      step: '01',
      action: 'FIND',
      title: 'Lead Discovery',
      shortDesc: 'Discover targeted businesses, prospects and opportunities.',
      description: 'Discover the right businesses, prospects and opportunities across cities, industries and target markets with verified contact intelligence and structured filtering.',
      icon: MapPin,
      badge: 'Targeted Discovery Pipeline',
      benchmarkLabel: 'Targeting Scope',
      benchmarkValue: 'Cities & Niche Filters',
    },
    {
      id: 1,
      step: '02',
      action: 'ENGAGE',
      title: 'AI Outreach',
      shortDesc: 'Personalized messaging, follow-ups and lead engagement.',
      description: 'Connect with potential customers through personalized, structured and scalable outreach workflows across WhatsApp and multi-channel follow-up cadences.',
      icon: MessageSquare,
      badge: 'Compliant Outreach Workflow',
      benchmarkLabel: 'Engagement Method',
      benchmarkValue: 'Controlled & Personalized',
    },
    {
      id: 2,
      step: '03',
      action: 'BUILD',
      title: 'Websites & Digital Systems',
      shortDesc: 'Modern, fast and conversion-focused digital experiences.',
      description: 'Build fast, modern and conversion-focused websites and digital systems designed to turn visitors into enquiries, appointments and paying customers.',
      icon: Globe,
      badge: 'High-Converting Web Systems',
      benchmarkLabel: 'System Standard',
      benchmarkValue: 'Sub-Second Page Speeds',
    },
    {
      id: 3,
      step: '04',
      action: 'GROW',
      title: 'Analytics & Retention',
      shortDesc: 'Track performance, automate follow-ups and improve customer growth.',
      description: 'Turn incoming opportunities into measurable business growth with clear performance analytics, customer follow-up cadences and retention workflows.',
      icon: TrendingUp,
      badge: 'Retention Architecture',
      benchmarkLabel: 'Growth Focus',
      benchmarkValue: 'Repeat Customer Cadence',
    },
  ];

  const currentPillar = pillars[activeTab];

  return (
    <section className="relative w-full bg-[#07090E] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Ambient Cyber Gold Lighting */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[450px] bg-yellow-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header Eyebrow & Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-amber-500/10">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>AI-POWERED CLIENT ACQUISITION & WEB ENGINES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            We Find, Message, Build & Grow Your Business{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-4">
              Automatically.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Architected by Founder <strong className="text-white font-semibold">Abhishek Kumar</strong>, <strong className="text-white font-semibold">ROCK AUTOMATIONS</strong> builds AI-powered lead discovery systems, personalized outreach workflows and high-converting digital experiences for businesses ready to grow.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20grow%20my%20business%20with%20Rock%20Automations"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm flex items-center gap-2.5 shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-black text-black" />
              <span>Let's Grow Together &bull; Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/services"
              className="px-6 py-3.5 rounded-xl bg-[#0D111A] hover:bg-amber-500/10 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-md shadow-amber-500/10"
            >
              <span>Explore Services</span>
            </Link>

            <Link
              href="/work"
              className="px-6 py-3.5 rounded-xl bg-[#0D111A] hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-sm flex items-center gap-2 transition-all"
            >
              <span>View Real Results</span>
            </Link>
          </div>

        </div>

        {/* 4 Core Pillars Interactive Engine */}
        <div className="space-y-4 pt-2">
          
          {/* Subtle Framework Sequence Label */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-mono font-bold text-amber-400/90 tracking-widest uppercase">
            <span>FIND</span>
            <span className="text-slate-600">&rarr;</span>
            <span>ENGAGE</span>
            <span className="text-slate-600">&rarr;</span>
            <span>BUILD</span>
            <span className="text-slate-600">&rarr;</span>
            <span>GROW</span>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-500/15 via-[#0D111A] to-[#0A0D15] border-amber-400 shadow-xl shadow-amber-500/15 ring-1 ring-amber-400/40 text-white'
                      : 'bg-[#0D111A] border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black font-black shadow-md shadow-amber-500/30' 
                        : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-mono font-bold ${
                      isSelected ? 'text-amber-300' : 'text-slate-500'
                    }`}>
                      {pillar.step}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider uppercase block mb-0.5">
                      {pillar.action}
                    </span>
                    <h3 className={`text-sm font-bold tracking-tight ${
                      isSelected ? 'text-white' : 'text-white'
                    }`}>
                      {pillar.title}
                    </h3>
                    <p className={`text-xs mt-1 leading-snug ${
                      isSelected ? 'text-slate-200' : 'text-slate-400'
                    }`}>
                      {pillar.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Detailed Dashboard Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0D111A] via-[#0A0E18] to-[#07090E] border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentPillar.badge}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentPillar.action} &mdash; <span className="text-amber-400">{currentPillar.title}</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {currentPillar.description}
              </p>
              <div className="pt-1">
                <a
                  href={`https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20am%20interested%20in%20your%20${encodeURIComponent(currentPillar.title)}%20system%20for%20my%20business`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Deploy this system for your business</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-8">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                {currentPillar.benchmarkLabel}
              </span>
              <span className="text-lg sm:text-xl font-bold text-amber-400 font-mono tracking-tight mt-1">
                {currentPillar.benchmarkValue}
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
