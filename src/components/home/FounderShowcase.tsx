'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  ChevronRight,
  MessageCircle,
  MapPin,
  MessageSquare,
  Globe,
  TrendingUp,
  Cpu,
  Sparkles
} from 'lucide-react';

export default function FounderShowcase() {
  const skills = [
    'Autonomous AI Pipelines',
    'Lead Scraping & Enrichment',
    'Personalized Outreach (WhatsApp/Email)',
    'High-Converting Web Development',
    'Next.js & Modern Backends',
    'WhatsApp Business APIs',
    'Escrow Architectures',
  ];

  const systems = [
    {
      title: 'City Business Discovery Engine',
      category: 'Automated Lead Extraction',
      icon: MapPin,
      href: '/work',
    },
    {
      title: 'Personalized Outreach System',
      category: 'Multi-Channel Messaging',
      icon: MessageSquare,
      href: '/work',
    },
    {
      title: 'Modern High-Converting Websites',
      category: 'Web Development & Booking',
      icon: Globe,
      href: '/work',
    },
    {
      title: 'Local Business Growth Automation',
      category: 'Customer Acquisition Engine',
      icon: TrendingUp,
      href: '/work',
    },
    {
      title: 'Autonomous Video & Telegram Suite',
      category: 'AI Software & Bots',
      icon: Cpu,
      href: '/work',
    },
  ];

  return (
    <section className="w-full bg-[#080B12] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Pre-header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              FOUNDER SPOTLIGHT // CHIEF SYSTEMS ARCHITECT
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
            Rock Automations Leadership
          </span>
        </div>

        {/* Main 3-Column Container */}
        <div className="bg-gradient-to-br from-[#0D121F] via-[#0A0E18] to-slate-950 rounded-2xl sm:rounded-3xl border border-amber-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Radiant Amber Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Abhishek Kumar's Real Photo */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[300px] aspect-4/5 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl shadow-amber-500/20 bg-black group">
                <Image
                  src="/images/abhishek-kumar.png"
                  alt="Abhishek Kumar - Founder of Rock Automations"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                
                {/* Gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Founder Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/30 text-white text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-amber-300">Abhishek Kumar</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                    Founder
                  </span>
                </div>
              </div>

              {/* Motto quote */}
              <p className="text-[11px] text-amber-300/80 font-mono text-center mt-3">
                "Ideas + AI = Real Products"
              </p>
            </div>

            {/* Center Column: Bio, Vision & Actions */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>FOUNDER & CHIEF SYSTEMS ARCHITECT</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Abhishek Kumar
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-amber-300/90 mt-1">
                  Founder &amp; Chief Systems Architect &bull; ROCK AUTOMATIONS
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                ROCK AUTOMATIONS is built around one goal: using software, automation and AI to remove repetitive work and create scalable digital systems for modern businesses.
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-[#0D111A] border border-amber-500/20 text-[11px] font-semibold text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Connect Links & WhatsApp */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20discuss%20an%20automation%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="https://linkedin.com/in/abhishek-kumar-527921384"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#0D111A] hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 hover:border-amber-400 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>Connect on LinkedIn &rarr;</span>
                </a>
              </div>

            </div>

            {/* Right Column: Selected Systems Built by Abhishek */}
            <div className="lg:col-span-3 bg-black/50 rounded-2xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Production Systems</span>
                </h3>
                <Link
                  href="/work"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-2">
                {systems.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={idx}
                      href={s.href}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-[#0D111A] hover:bg-[#131826] border border-slate-800 hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-200 truncate group-hover:text-amber-300 transition-colors">
                            {s.title}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {s.category}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0 ml-1" />
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
