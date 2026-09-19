'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Zap, 
  Code2, 
  Lock, 
  Headphones, 
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

const standards = [
  {
    icon: ShieldCheck,
    title: '100% Official API Compliance',
    description: 'All messaging workflows strictly utilize official WhatsApp Business APIs and verified communication channels, protecting your brand reputation.',
    badge: 'COMPLIANCE',
  },
  {
    icon: Code2,
    title: 'Direct Engineering Oversight',
    description: 'Every scraper, web architecture, and outreach cadence is architected directly by Founder Abhishek Kumar with strict code quality.',
    badge: 'ARCHITECTED',
  },
  {
    icon: Zap,
    title: 'Rapid System Turnaround',
    description: 'From initial consultation to operational deployment in 3 to 7 business days, allowing your business to move quickly without administrative delays.',
    badge: 'SPEED',
  },
  {
    icon: Lock,
    title: 'Zero Lock-in Contracts',
    description: 'We earn long-term partnerships through consistent delivery. Standard retainers operate on flexible month-to-month terms with complete transparency.',
    badge: 'FLEXIBILITY',
  },
  {
    icon: Headphones,
    title: 'Direct WhatsApp Support',
    description: 'No convoluted ticketing queues. Receive prompt technical adjustments, status updates, and operational guidance directly on WhatsApp.',
    badge: 'SUPPORT',
  },
  {
    icon: Sparkles,
    title: 'Custom-Engineered Solutions',
    description: 'No generic cookie-cutter templates. Systems are calibrated around your specific city, target client profile, and operational workflows.',
    badge: 'CUSTOMIZED',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-[#07090E] py-20 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPERATIONAL STANDARDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Why Growing Businesses Partner with{' '}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              ROCK AUTOMATIONS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Reliable engineering, transparent communication, and deterministic automation pipelines built for sustainable business scaling.
          </p>
        </div>

        {/* 6 Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((std, idx) => {
            const Icon = std.icon;
            return (
              <div
                key={idx}
                className="bg-[#0D111A] rounded-2xl border border-slate-800 hover:border-amber-500/40 p-7 flex flex-col justify-between transition-all group shadow-xl hover:shadow-amber-500/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-[#131826] border border-slate-800 text-amber-400">
                      {std.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {std.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-normal mt-2 leading-relaxed">
                      {std.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed System Reliability</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="text-center pt-2">
          <a
            href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20would%20like%20to%20consult%20on%20automation%20systems%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Consult Directly on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
