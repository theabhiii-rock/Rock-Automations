'use client';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MessageCircle, ExternalLink, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#05070B] text-slate-400 text-xs border-t border-amber-500/20">

      {/* Top Trust Strip */}
      <div className="border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Online &amp; Active</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>100% Results Guaranteed</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 font-bold font-mono">
            FIND &bull; MESSAGE &bull; BUILD &bull; GROW
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md shadow-amber-500/20 bg-black shrink-0">
                <img
                  src="/images/rock-automations-logo.png"
                  alt="Rock Automations"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
                  <span className="text-amber-400">ROCK</span>
                  <span>AUTOMATIONS</span>
                </div>
                <p className="text-[10px] text-amber-300/80 font-mono tracking-widest font-semibold uppercase">
                  Your Growth, Our Automation
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              We Find, Message, Build &amp; Grow Your Business &mdash; Automatically.
              Founded by Abhishek Kumar. Serving salons, restaurants, gyms, clinics &amp; more across India.
            </p>

            {/* Contact Links */}
            <div className="space-y-2 pt-1">
              <a
                href="mailto:rockautomations@gmail.com"
                className="flex items-center gap-2 text-xs text-amber-400/80 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>rockautomations@gmail.com</span>
              </a>
              <a
                href="https://wa.me/916209817520?text=Hi%20Rock%20Automations!%20I%20want%20to%20grow%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-emerald-400/80 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>Direct WhatsApp Support</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20grow%20my%20business%20with%20Rock%20Automations"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-black" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="https://linkedin.com/in/abhishek-kumar-527921384"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#0D111A] hover:bg-[#131826] text-slate-300 hover:text-white border border-amber-500/20 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>Abhishek Kumar</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">&#x1F50D; FIND &mdash; Lead Discovery</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">&#x1F4AC; MESSAGE &mdash; AI Outreach</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">&#x1F310; BUILD &mdash; Websites</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">&#x1F4C8; GROW &mdash; Analytics &amp; Retention</Link></li>
              <li><Link href="/pricing" className="hover:text-amber-400 transition-colors">&#x1F4B0; View Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/work" className="hover:text-amber-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Blog &amp; Guides</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/marketplace" className="hover:text-amber-400 transition-colors">Marketplace</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-amber-400 transition-colors">Refund Policy</Link></li>
              <li><Link href="/dispute-policy" className="hover:text-amber-400 transition-colors">Dispute Policy</Link></li>
              <li><Link href="/fee-policy" className="hover:text-amber-400 transition-colors">Platform Fees</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800 pt-6 text-[11px] text-slate-500">
          <p>&copy; 2025&ndash;2026 ROCK AUTOMATIONS. Founded by Abhishek Kumar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Pan India &bull; Remote Services</span>
            <span className="text-amber-400 font-mono font-semibold">&ldquo;Your Growth, Our Automation&rdquo;</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
