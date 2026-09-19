"use client";

import React from "react";
import Image from "next/image";
import { 
  Search, 
  MessageSquare, 
  Globe, 
  TrendingUp, 
  Users, 
  Zap, 
  Compass, 
  ShieldCheck, 
  Rocket, 
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Phone
} from "lucide-react";

const pillars = [
  {
    id: "FIND",
    icon: Search,
    title: "FIND",
    subtitle: "Lead Discovery",
    description:
      "We build automated bots that scrape WhatsApp groups, Google Maps, Instagram pages & local directories to find your next 1,000 customers — before your competition does.",
    color: "from-amber-500/10 to-amber-600/5",
    border: "border-amber-500/30",
    tag: "Lead Discovery Bots",
    iconColor: "text-amber-400",
  },
  {
    id: "MESSAGE",
    icon: MessageSquare,
    title: "MESSAGE",
    subtitle: "AI Outreach",
    description:
      "Automated WhatsApp & SMS campaigns with personalized messages, smart follow-up sequences, and AI-driven replies that convert leads into paying customers 24/7.",
    color: "from-amber-400/10 to-amber-500/5",
    border: "border-amber-400/30",
    tag: "AI-Powered Outreach",
    iconColor: "text-amber-400",
  },
  {
    id: "BUILD",
    icon: Globe,
    title: "BUILD",
    subtitle: "Websites & Apps",
    description:
      "High-converting business websites, booking systems, and payment integrations built specifically for salons, restaurants, gyms, clinics and local Indian businesses.",
    color: "from-amber-500/10 to-amber-600/5",
    border: "border-amber-500/30",
    tag: "Web & Landing Pages",
    iconColor: "text-amber-400",
  },
  {
    id: "GROW",
    icon: TrendingUp,
    title: "GROW",
    subtitle: "Analytics & Retention",
    description:
      "Customer retention flows, loyalty programs, review generation systems, and growth dashboards that turn one-time visitors into loyal, repeat customers.",
    color: "from-amber-400/10 to-amber-500/5",
    border: "border-amber-400/30",
    tag: "Analytics + Retention",
    iconColor: "text-amber-400",
  },
];

const stats = [
  { value: "50+", label: "Automations Built" },
  { value: "100+", label: "Businesses Helped" },
  { value: "3+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
];

const values = [
  {
    icon: Users,
    title: "Relationship First",
    desc: "We treat every business like our own. Your growth is our growth.",
  },
  {
    icon: Zap,
    title: "Speed & Results",
    desc: "We move fast, iterate quickly, and focus obsessively on measurable outcomes.",
  },
  {
    icon: Compass,
    title: "Made for India",
    desc: "Built by an Indian, for Indian businesses — we understand the local market deeply.",
  },
  {
    icon: ShieldCheck,
    title: "Honest & Transparent",
    desc: "No hidden fees, no false promises. We show exactly what we do and why it works.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5 pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ROCK AUTOMATIONS MISSION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
            Who We Are &mdash;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              The Automation Company
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            We are a team of automation builders on a mission to make every
            salon, restaurant, gym, and clinic in India grow using the power of
            smart automation &mdash; at prices that make sense for real businesses.
          </p>

          <a
            href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20know%20more%20about%20Rock%20Automations"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold rounded-xl transition-all text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
            <span>Chat with Abhishek on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-amber-600/10 rounded-2xl blur-xl" />
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20 bg-black">
                  <img
                    src="/images/abhishek-kumar.png"
                    alt="Abhishek Kumar - Founder, Rock Automations"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400";
                    }}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-amber-400 text-black px-4 py-2 rounded-xl font-black text-sm shadow-xl flex items-center gap-1.5">
                  <Rocket className="w-4 h-4 text-black" />
                  <span>Founder &amp; Builder</span>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-6">
              <div>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                  The Founder's Story
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Abhishek Kumar
                </h2>
                <p className="text-slate-300 text-sm mt-1">
                  Champaran, Bihar &rarr; New Delhi, India
                </p>
              </div>

              <div className="space-y-4 text-slate-200 text-sm leading-relaxed">
                <p>
                  Started Rock Automations with a simple observation: Small and medium business owners in India work 14+ hours a day, yet struggle to get consistent new customers because marketing is manual, messy, and expensive.
                </p>
                <p>
                  We build custom software, web pipelines, and automated WhatsApp bots that solve client acquisition once and for all. What used to take a marketing agency ₹50,000/month, we automate for a fraction of the cost.
                </p>
                <p>
                  Every system is personally tested and architected by Abhishek to ensure zero downtime and measurable return on investment.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20connect"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold rounded-xl transition-all text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Direct WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#0D111A] via-[#131826] to-[#0D111A] border border-amber-500/30 text-center overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <p className="text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              OUR CORE MISSION
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              &ldquo;Building intelligent growth systems for ambitious businesses.&rdquo;
            </h2>
            <p className="mt-5 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              ROCK AUTOMATIONS connects lead discovery, AI outreach, modern websites and business automation into one seamless growth engine &mdash; designed to reduce repetitive work and create more opportunities to grow.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              How We Do It
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              The 4 Pillars of Growth
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Every service we offer maps to one of four fundamental levers of business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className={`relative p-7 rounded-2xl bg-gradient-to-br ${p.color} border ${p.border} group hover:border-amber-400/70 transition-all shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-amber-400 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
                    {p.subtitle}
                  </p>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D111A] border-y border-amber-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                  {s.value}
                </div>
                <div className="text-slate-300 text-xs uppercase tracking-widest font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Our Values
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              How We Think &amp; Work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-[#0D111A] border border-slate-800 hover:border-amber-500/40 transition-all shadow-md"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white mb-1">
                      {v.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D111A] border-t border-amber-500/20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready to{" "}
            <span className="text-amber-400">Automate &amp; Grow</span>?
          </h2>
          <p className="text-slate-200 text-base leading-relaxed">
            Join 100+ Indian businesses already using Rock Automations. Let's
            talk about how we can grow your business &mdash; starting today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20grow%20my%20business%20with%20Rock%20Automations"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold rounded-xl transition-all text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>Start on WhatsApp &mdash; Free Consultation</span>
            </a>
          </div>
          <p className="text-slate-400 text-xs font-mono">
            Direct WhatsApp Support &bull; Response within 2 hours
          </p>
        </div>
      </section>
    </div>
  );
}
