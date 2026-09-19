'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="w-full bg-[#07090E] py-14 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-black via-[#0D121F] to-black border-2 border-amber-500/40 p-8 sm:p-14 shadow-2xl shadow-amber-500/10">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>MORE LEADS &bull; MORE CUSTOMERS &bull; MORE GROWTH</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Ready to Automate Your Client Acquisition?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-normal max-w-xl">
                Let's deploy your city scraper, multi-channel messaging engine, and modern web funnel. Stop chasing clients manually.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20grow%20my%20business%20with%20Rock%20Automations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm flex items-center gap-2.5 shadow-lg shadow-green-500/20 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 fill-black" />
                  <span>Let's Grow Together &bull; Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/start-project"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-md shadow-amber-500/20"
                >
                  <span>Start a Project</span>
                </Link>
              </div>
            </div>

            {/* Right Slogan Box */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 text-right space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
                  ROCK AUTOMATIONS
                </span>
                <p className="text-xl sm:text-2xl font-black text-white italic tracking-tight">
                  "Your Growth, Our Automation"
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  Founded by Abhishek Kumar
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
