"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  MessageSquare, 
  Globe, 
  TrendingUp, 
  Zap,
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";

const services = [
  {
    id: "lead-discovery",
    number: "01",
    action: "FIND",
    icon: Search,
    title: "FIND — Lead Discovery & Market Intelligence",
    slug: "/services/lead-discovery",
    description:
      "Discover the right businesses, prospects and opportunities across cities, industries and target markets with structured data and verified contact intelligence.",
    features: [
      "Business Discovery",
      "Lead Filtering",
      "Location Targeting",
      "Contact Research",
      "Market Segmentation",
    ],
    price: "Starting ₹4,999/month",
    priceNote: "Configured to your target cities and sectors",
    tag: "DISCOVERY",
    tagColor: "bg-amber-400 text-black",
  },
  {
    id: "ai-outreach",
    number: "02",
    action: "ENGAGE",
    icon: MessageSquare,
    title: "ENGAGE — AI Outreach & Follow-Up",
    slug: "/services/ai-outreach",
    description:
      "Connect with potential customers through personalized, structured and scalable outreach workflows across WhatsApp and professional communication channels.",
    features: [
      "AI-Powered Messaging",
      "Personalization",
      "Follow-Up Automation",
      "Lead Qualification",
      "Outreach Campaigns",
    ],
    price: "Starting ₹6,999/month",
    priceNote: "Controlled, compliant & personalized cadences",
    tag: "OUTREACH",
    tagColor: "bg-emerald-400 text-black",
  },
  {
    id: "web-development",
    number: "03",
    action: "BUILD",
    icon: Globe,
    title: "BUILD — Websites & Digital Experiences",
    slug: "/services/web-development",
    description:
      "Build fast, modern and conversion-focused websites designed to turn visitors into enquiries, scheduled appointments and paying customers.",
    features: [
      "Business Websites",
      "Landing Pages",
      "Mobile Optimization",
      "WhatsApp Integration",
      "SEO Foundations",
    ],
    price: "Starting ₹14,999 one-time",
    priceNote: "High-performance Next.js architecture",
    tag: "DIGITAL",
    tagColor: "bg-cyan-400 text-black",
  },
  {
    id: "business-automation",
    number: "04",
    action: "AUTOMATE",
    icon: Zap,
    title: "AUTOMATE — Business Process Automation",
    slug: "/services/business-automation",
    description:
      "Automate repetitive business workflows so teams can spend more time serving customers and closing opportunities with dependable system backends.",
    features: [
      "Workflow Automation",
      "Lead Management",
      "Notifications",
      "Data Synchronization",
      "Custom Business Automations",
    ],
    price: "Starting ₹7,999/month",
    priceNote: "Custom integrations and webhook triggers",
    tag: "WORKFLOW",
    tagColor: "bg-yellow-400 text-black",
  },
  {
    id: "analytics-retention",
    number: "05",
    action: "GROW",
    icon: TrendingUp,
    title: "GROW — Analytics & Retention",
    slug: "/services/analytics-retention",
    description:
      "Turn incoming opportunities into measurable growth with analytics, customer follow-up and retention workflows that build long-term repeat business.",
    features: [
      "Lead Tracking",
      "Analytics",
      "Customer Follow-Up",
      "Retention Automation",
      "Performance Insights",
    ],
    price: "Starting ₹3,999/month",
    priceNote: "Ongoing performance reviews and reviews flow",
    tag: "RETENTION",
    tagColor: "bg-purple-400 text-black",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Consultation & Scope",
    desc: "We analyze your business model, target market and operational bottlenecks to determine the best automation setup.",
  },
  {
    step: "02",
    title: "Architecture & Setup",
    desc: "Within 3-5 days, we build and test your custom lead pipeline, messaging workflows and web landing funnels.",
  },
  {
    step: "03",
    title: "Launch & Qualification",
    desc: "We deploy the systems, verify message delivery rates, and establish direct response notifications on your device.",
  },
  {
    step: "04",
    title: "Optimize & Retain",
    desc: "Continuous refinement based on responses, automating review generation and ongoing customer retention.",
  },
];

const faqs = [
  {
    q: "How quickly can an automation system be deployed?",
    a: "Most lead discovery pipelines and WhatsApp outreach sequences can be deployed within 3 to 7 business days following scope finalization.",
  },
  {
    q: "Is WhatsApp outreach compliant with platform rules?",
    a: "Yes. We strictly utilize official WhatsApp Business APIs and adhere to cadence controls and opt-out policies to ensure compliant communication.",
  },
  {
    q: "Can I combine multiple services into one package?",
    a: "Absolutely. Many businesses pair Lead Discovery (FIND) with AI Outreach (ENGAGE) and a High-Converting Website (BUILD). We configure customized growth packages.",
  },
  {
    q: "Do you provide training on how to use the dashboard?",
    a: "Yes, we provide full walkthrough onboarding and continuous technical support via WhatsApp so your team is completely confident.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#07090E] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ROCK AUTOMATIONS PORTFOLIO</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Our Services
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Automation systems designed to help businesses find opportunities, engage prospects, build a stronger digital presence and grow.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20learn%20more%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Discuss Requirements on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 5 Services Cards Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="bg-[#0D111A] rounded-2xl border border-slate-800 hover:border-amber-500/40 p-7 flex flex-col justify-between transition-all group shadow-xl hover:shadow-amber-500/10"
                >
                  <div className="space-y-4">
                    
                    {/* Top Row: Icon + Step Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md font-mono ${svc.tagColor}`}>
                        {svc.tag}
                      </span>
                    </div>

                    {/* Title and Short Description */}
                    <div>
                      <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                        SERVICE {svc.number} &bull; {svc.action}
                      </span>
                      <h2 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {svc.title}
                      </h2>
                      <p className="text-xs text-slate-300 font-normal mt-2 leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        Included Features
                      </span>
                      <ul className="space-y-1.5">
                        {svc.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Pricing and Action Links */}
                  <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
                    <div>
                      <div className="text-base font-bold text-amber-300 font-mono">
                        {svc.price}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {svc.priceNote}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href={svc.slug}
                        className="py-2 px-3 rounded-lg bg-[#131826] hover:bg-amber-500/10 border border-slate-700 hover:border-amber-400 text-amber-300 text-xs font-bold text-center transition-all flex items-center justify-center gap-1"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                      <a
                        href={`https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20am%20interested%20in%20your%20${encodeURIComponent(svc.title)}%20service`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1"
                      >
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
              DELIVERY PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              How We Deploy Your Systems
            </h2>
            <p className="text-xs text-slate-400">
              Clear timelines, collaborative setup, and transparent milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((p, idx) => (
              <div
                key={idx}
                className="bg-[#0D111A] rounded-xl border border-slate-800 p-5 space-y-2 relative group hover:border-amber-500/40 transition-all"
              >
                <span className="text-2xl font-mono font-black text-amber-500/30 group-hover:text-amber-400/60 transition-colors">
                  {p.step}
                </span>
                <h3 className="text-sm font-bold text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6 max-w-3xl mx-auto pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Service Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0D111A] rounded-xl border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <Minus className="w-4 h-4 text-amber-400 shrink-0" /> : <Plus className="w-4 h-4 text-slate-500 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="bg-gradient-to-r from-[#0D111A] via-[#131826] to-[#0D111A] border-2 border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to deploy an automation engine for your business?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Schedule a brief conversation with Founder Abhishek Kumar to audit your customer journey and build a deterministic automation pipeline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20discuss%20an%20automation%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-[#0D111A] hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-sm transition-all"
            >
              <span>Explore Pricing Plans</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
