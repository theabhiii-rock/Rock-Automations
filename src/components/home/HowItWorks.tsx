'use client';

import React from 'react';
import { 
  MapPin, 
  MessageSquare, 
  Globe, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      word: 'FIND',
      title: 'Find Businesses',
      desc: 'Automatically discover local businesses across targeted cities, locations, and high-margin niches.',
      icon: MapPin,
    },
    {
      num: '2',
      word: 'MESSAGE',
      title: 'Send Messages',
      desc: 'Deploy high-converting personalized outreach via WhatsApp & Email to generate direct warm inquiries.',
      icon: MessageSquare,
    },
    {
      num: '3',
      word: 'BUILD',
      title: 'Build Websites',
      desc: 'Deliver modern, ultra-fast, mobile-optimized websites & booking funnels that convert visitors into buyers.',
      icon: Globe,
    },
    {
      num: '4',
      word: 'GROW',
      title: 'Get More Customers',
      desc: 'Automate ongoing customer acquisition so business owners enjoy predictable weekly revenue growth.',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="w-full bg-[#07090E] py-16 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>HOW ROCK AUTOMATIONS WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find • Message • Build • Grow
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Our 4-step autonomous acquisition pipeline designed for modern enterprise scaling.
          </p>
        </div>

        {/* 4-Step Connected Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#0D121F] to-[#0A0E18] rounded-2xl border border-slate-800 hover:border-amber-500/40 p-6 shadow-lg hover:shadow-amber-500/10 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-extrabold text-amber-400/70">
                      STEP 0{step.num}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-amber-400 tracking-widest uppercase block mb-1">
                    {step.word}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>100% Automated Workflow</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
