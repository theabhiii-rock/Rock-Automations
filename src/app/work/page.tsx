"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Globe, 
  MapPin, 
  MessageSquare, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  Zap,
  Repeat,
  Mic,
  TrendingUp,
  Download,
  ExternalLink,
  Send,
  ShoppingBag,
  Bot,
  Eye
} from "lucide-react";
import ProjectScreensDrawer, { ProjectDetail } from "@/components/ui/ProjectScreensDrawer";

interface SystemItem {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  icon: any;
  image: string;
  secondaryImage?: string;
  badge?: string;
  description: string;
  deliverables: string[];
  tech: string[];
  liveUrl?: string | null;
  liveLabel?: string;
  isTelegram?: boolean;
  screens: {
    title: string;
    url: string;
    caption: string;
    tag?: string;
  }[];
}

const systems: SystemItem[] = [
  {
    id: 1,
    slug: "paisawise-studio",
    title: "PaisaWise Studio — Autonomous Telegram AI SaaS Bot",
    subtitle: "AI Video & Viral Thumbnail Automation Engine with Multilingual Dubbing",
    category: "AI TELEGRAM SAAS • Video & Thumbnail Automation",
    icon: Send,
    image: "/images/thumb-paisawise-studio.jpg",
    badge: "Live Telegram SaaS • t.me/PaisaWise_bot",
    description:
      "Production-grade Telegram SaaS bot engineered for autonomous faceless video generation, kinetic subtitle synchronization, viral topic discovery, AI dubbing, automated YouTube & Blog publishing, and in-bot credit/affiliate monetization.",
    deliverables: [
      "Automated end-to-end video synthesis from a single topic prompt with BGM flat-mix fixing",
      "Automated thumbnail composition and multi-channel publishing to YouTube, Blogger & Telegram",
      "Interactive bot dashboard: 'Write Any Topic', 'Viral Ideas Gallery', 'Edit My Video', and 'AI Dub Video'",
      "In-bot credit economy system with daily bonuses and affiliate earning tracking",
    ],
    tech: ["Python", "Telegram Bot API", "FFmpeg", "Whisper", "Edge-TTS", "Asyncio", "Redis"],
    liveUrl: "https://t.me/PaisaWise_bot",
    liveLabel: "Launch PaisaWise Bot on Telegram",
    isTelegram: true,
    screens: [
      {
        title: "PaisaWise Telegram SaaS Bot Menu & Delivery",
        url: "/images/project-paisawise-studio.png",
        caption: "Live Telegram bot interface showing automated video delivery, multi-platform publishing (YouTube, Blog, Telegram), and full keypad menu: Write Any Topic, Viral Ideas Gallery, Edit My Video, AI Dub Video, and Credit Wallet.",
        tag: "Live In-App Bot UI",
      },
    ],
  },
  {
    id: 2,
    slug: "shubhaangi",
    title: "SHUBHAANGI — Luxury Bridal E-Commerce & Studio OS",
    subtitle: "Couture Bridal E-Commerce Platform + Executive Studio Operating System",
    category: "LUXURY E-COMMERCE • Storefront & Operating System",
    icon: ShoppingBag,
    image: "/images/thumb-shubhaangi-couture.jpg",
    secondaryImage: "/images/project-shubhaangi-dashboard.png",
    badge: "The Ultimate Bride • Storefront + OS",
    description:
      "High-end bridal couture e-commerce platform and bespoke Studio Operating System engineered for luxury bridal rentals and purchases. Features dual 'Rent & Buy' financial models, automated WhatsApp booking inquiry funnels, and an Executive Business Intelligence dashboard managing store revenue, rental return tracking, and client CRM.",
    deliverables: [
      "High-converting bridal storefront with 'Rent & Buy' dual pricing and direct 1-tap WhatsApp inquiry triggers",
      "Executive Business Intelligence Portal tracking store revenue (₹1.48L+), visitors, and conversion metrics",
      "Rental Returns Tracker monitoring overdue garment returns and security deposit reconciliations",
      "Client Bookings CRM with direct WhatsApp chat links and customer measurement records",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "WhatsApp API", "Analytics"],
    liveUrl: null,
    screens: [
      {
        title: "01 • Luxury Bridal Couture Storefront",
        url: "/images/project-shubhaangi-store.png",
        caption: "Exclusive bridal catalog featuring Gulabi Noor, Zar-e-Khaas, and Rose Quartz couture with dual Rent & Buy pricing models, high-res lookbook, and direct 1-tap WhatsApp bridal styling consultations.",
        tag: "Couture Storefront",
      },
      {
        title: "02 • Executive Studio OS / Business Dashboard",
        url: "/images/project-shubhaangi-dashboard.png",
        caption: "Real-time executive operating system tracking ₹1.48L+ Gross Store Revenue, 3 Active Rentals, Automated Overdue Returns Alert (Meera S. 2 days overdue), and Client Bookings CRM with instant WhatsApp chat routing.",
        tag: "Executive Studio OS",
      },
    ],
  },
  {
    id: 3,
    slug: "aditi-assistant",
    title: "Aditi — AI Personal Voice & Desktop Assistant",
    subtitle: "Multimodal Voice AI with Hands-Free Windows 11 & Android Control",
    category: "VOICE AI • Desktop & Android System Control",
    icon: Mic,
    image: "/images/aditi-voice-assistant.jpg",
    badge: "Voice AI Flagship",
    description:
      "Custom-built multimodal AI personal assistant ('Oye Aditi') designed for hands-free voice desktop control, speech recognition, automated application launching (VS Code, Chrome, Terminal), file management, web research, and synchronized Android device status.",
    deliverables: [
      "'Oye Aditi' hotword wake-word detection with real-time voice waveform UI",
      "Automated Windows 11 system tasks: opens VS Code, launches Chrome, takes screenshots, creates folders",
      "Low-latency neural voice synthesis (<300ms) with conversational personality",
      "Cross-device Android status integration and live connectivity bridge",
    ],
    tech: ["Python", "Whisper", "Edge-TTS", "Windows 11 API", "Local AI / LLM", "Android Bridge"],
    liveUrl: null,
    screens: [
      {
        title: "Aditi Multimodal Desktop Assistant Architecture",
        url: "/images/aditi-voice-assistant.jpg",
        caption: "Continuous acoustic hotword listener ('Oye Aditi'), sub-300ms neural voice synthesis, OS system automation hooks (VS Code, Chrome, Terminal, folders, screenshots), and cross-device Android telemetry bridge.",
        tag: "Desktop Assistant",
      },
    ],
  },
  {
    id: 4,
    slug: "aviator-predictor",
    title: "Aviator Predictor & Crash Game Suite",
    subtitle: "High-Concurrency Real-Time Algorithm & Cloud Game Simulation",
    category: "FULL STACK • Real-Time Algorithm & Game Engine",
    icon: TrendingUp,
    image: "/images/aviator-predictor-game.jpg",
    badge: "Live on Render",
    description:
      "High-concurrency full-stack crash game simulation and real-time multiplier prediction platform. Features dynamic mathematical curve plotting, live cash-out probability algorithms, WebSocket state synchronization, and instant cloud distribution.",
    deliverables: [
      "Real-time multiplier trajectory curve calculation (1.25x up to 10.00x+ dynamic cash-out)",
      "Low-latency WebSocket telemetry synchronization between server and client",
      "Dedicated Android APK download package and web client interface",
      "High-availability cloud deployment on Render with automated build pipeline",
    ],
    tech: ["Node.js", "React Native / Web", "WebSocket", "Tailwind CSS", "Render Cloud", "Python"],
    liveUrl: "https://royal-app-b0qz.onrender.com/download",
    liveLabel: "Download App / View on Render",
    screens: [
      {
        title: "Live Prediction Dashboard & Multiplier Curve",
        url: "/images/aviator-predictor-game.jpg",
        caption: "Real-time mathematical trajectory generator computing live multiplier velocity, sub-50ms WebSocket telemetry, and probability cash-out triggers.",
        tag: "Predictor App",
      },
    ],
  },
  {
    id: 5,
    slug: "city-discovery",
    title: "City Business Discovery & Extraction Engine",
    subtitle: "Automated Lead Extraction & Geographic Prospect Intelligence",
    category: "FIND • Lead Discovery Pipeline",
    icon: MapPin,
    image: "/images/project-social-media.png",
    description:
      "Engineered automated scraper workflows that query Google Maps and local business registries across target cities to discover active businesses, phone numbers, addresses, and operating hours.",
    deliverables: [
      "Targeted city and category filter configuration",
      "Automated deduplication and phone verification",
      "CSV/Google Sheets real-time synchronization",
      "Scheduled weekly and monthly discovery runs",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    screens: [
      {
        title: "City Lead Discovery & Scraper Pipeline",
        url: "/images/project-social-media.png",
        caption: "Automated business entity extraction from Google Maps and registries with deduplication and phone verification.",
        tag: "Scraper Pipeline",
      },
    ],
  },
  {
    id: 6,
    slug: "whatsapp-outreach",
    title: "Personalized WhatsApp Outreach Pipeline",
    subtitle: "Smart Messaging Sequences & Inbound Lead Routing",
    category: "ENGAGE • Multi-Channel Outreach",
    icon: MessageSquare,
    image: "/images/project-video-pipeline.png",
    description:
      "Built structured, compliant messaging cadences that deliver customized business inquiries to qualified prospective clients, handling initial responses and routing warm conversations to the owner.",
    deliverables: [
      "Official WhatsApp Business API integration",
      "Variable-based message personalization",
      "Automated Day-1, Day-3, Day-7 follow-up sequences",
      "Instant push notifications upon prospect reply",
    ],
    tech: ["Node.js", "Meta Cloud API", "Webhooks", "Redis"],
    screens: [
      {
        title: "Personalized WhatsApp Outreach Engine",
        url: "/images/project-video-pipeline.png",
        caption: "Official WhatsApp Business API integration, variable-based personalization, and automated follow-up cadences.",
        tag: "Outreach Pipeline",
      },
    ],
  },
  {
    id: 7,
    slug: "appointment-web",
    title: "High-Converting Appointment & Web Systems",
    subtitle: "Next.js Modern Architecture with Direct WhatsApp & Payment Integrations",
    category: "BUILD • Digital Experience",
    icon: Globe,
    image: "/images/project-web-apps.png",
    description:
      "Developed blazing-fast, mobile-optimized business websites and dedicated landing funnels designed to convert local organic traffic into direct appointment inquiries via WhatsApp.",
    deliverables: [
      "Sub-second page loads with Next.js & Tailwind",
      "Mobile-first touch interfaces and booking dialogs",
      "Integrated Razorpay & UPI digital payment flows",
      "Technical SEO foundations and schema markup",
    ],
    tech: ["Next.js 16", "React", "Tailwind CSS", "Razorpay"],
    screens: [
      {
        title: "High-Converting Appointment & Web Systems",
        url: "/images/project-web-apps.png",
        caption: "Sub-second page loads with Next.js & Tailwind, mobile-first touch interfaces, and integrated payment flows.",
        tag: "Web Experience",
      },
    ],
  },
  {
    id: 8,
    slug: "review-automation",
    title: "Automated Customer Review & Reputation Workflow",
    subtitle: "Google Business Profile 5-Star Review Growth Funnel",
    category: "GROW • Retention & Reputation",
    icon: Repeat,
    image: "/images/project-telegram-bot.png",
    description:
      "Configured automated post-service follow-up sequences that prompt satisfied clients to leave authentic 5-star reviews on Google Maps, organically strengthening local search authority.",
    deliverables: [
      "Automated feedback collection trigger after service",
      "Direct Google Review link generation",
      "Internal notification if client expresses dissatisfaction",
      "Customer loyalty & re-booking broadcast sequences",
    ],
    tech: ["WhatsApp API", "Google Business Profile API", "Automations"],
    screens: [
      {
        title: "Automated Customer Review & Reputation Workflow",
        url: "/images/project-telegram-bot.png",
        caption: "Automated feedback collection trigger after service, direct Google Review link generation, and customer loyalty sequences.",
        tag: "Reputation Engine",
      },
    ],
  },
];

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenScreens = (sys: SystemItem) => {
    setSelectedProject({
      id: sys.slug,
      title: sys.title,
      subtitle: sys.subtitle || sys.category,
      category: sys.category,
      description: sys.description,
      thumbnail: sys.image,
      badge: sys.badge,
      screens: sys.screens,
      liveUrl: sys.liveUrl,
      isTelegram: sys.isTelegram,
      actionLabel: sys.liveLabel,
      technologies: sys.tech,
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full bg-[#07090E] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENGINEERING SHOWCASE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Selected Projects &amp; Systems
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            What We Build &mdash; Production Telegram SaaS bots, couture e-commerce operating systems, AI voice assistants, and business outreach engines engineered by Abhishek Kumar. Click any thumbnail to inspect real in-app screenshots in a side-scrolling drawer.
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {systems.map((sys) => {
            const Icon = sys.icon;

            return (
              <div
                key={sys.id}
                id={sys.slug}
                className="bg-[#0D111A] rounded-3xl border border-slate-800 hover:border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between transition-all group shadow-xl hover:shadow-amber-500/10"
              >
                <div className="space-y-4">
                  {/* Thumbnail Banner with Click-to-Open Drawer */}
                  {sys.image && (
                    <div className="space-y-2">
                      <div
                        onClick={() => handleOpenScreens(sys)}
                        className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-slate-800/80 bg-black group-hover:border-amber-500/30 transition-all cursor-pointer"
                        title="Click to view real in-app screenshots"
                      >
                        <img
                          src={sys.image}
                          alt={sys.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {sys.badge && (
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 shadow">
                            <Sparkles className="w-3 h-3" />
                            <span>{sys.badge}</span>
                          </div>
                        )}

                        {/* Hover Overlay: "View In-App Screenshots (Side Scroll)" */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center backdrop-blur-[2px]">
                          <div className="p-3 rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-extrabold text-white drop-shadow">
                            Inspect In-App Screenshots
                          </span>
                          <span className="text-xs text-amber-300 bg-black/70 px-3 py-1 rounded-full border border-amber-500/40">
                            {sys.screens.length} Screen{sys.screens.length > 1 ? 's' : ''} • Side Scrollable Gallery
                          </span>
                        </div>
                      </div>

                      {/* Quick "Inspect Screenshots" Trigger Button Under Image */}
                      <button
                        type="button"
                        onClick={() => handleOpenScreens(sys)}
                        className="w-full py-1.5 px-3 rounded-xl bg-[#080B12] hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 text-amber-400/90 hover:text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Real In-App Screenshots ({sys.screens.length} Screen{sys.screens.length > 1 ? 's' : ''})</span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      PROJECT 0{sys.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      {sys.category}
                    </span>
                    <h3
                      onClick={() => handleOpenScreens(sys)}
                      className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug cursor-pointer"
                    >
                      {sys.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {sys.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Architectural Deliverables
                    </span>
                    <ul className="space-y-1.5">
                      {sys.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {sys.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#131826] border border-slate-700 text-[10px] font-mono font-medium text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {sys.liveUrl ? (
                    <a
                      href={sys.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      {sys.isTelegram ? (
                        <Send className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Download className="w-4 h-4 stroke-[2.5]" />
                      )}
                      <span>{sys.liveLabel || "View Live Project"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20am%20interested%20in%20a%20system%20like%20${encodeURIComponent(sys.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#131826] hover:bg-amber-500/10 border border-slate-700 hover:border-amber-400 text-amber-300 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Request Similar Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="bg-gradient-to-r from-[#0D111A] via-[#131826] to-[#0D111A] border-2 border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Want to build an AI system, Telegram bot, or custom web platform?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Discuss your requirements directly with Abhishek Kumar. From automated video SaaS bots and luxury e-commerce engines to full-scale business automations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20build%20a%20system%20like%20PaisaWise%20or%20Shubhaangi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Discuss Your System on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/services"
              className="px-6 py-3.5 rounded-xl bg-[#0D111A] hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-sm transition-all"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Slide-over Side Gallery Drawer */}
      <ProjectScreensDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}
