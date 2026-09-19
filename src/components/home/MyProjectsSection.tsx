'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ExternalLink, Download, Send, Eye, Layers } from 'lucide-react';
import ProjectScreensDrawer, { ProjectDetail } from '@/components/ui/ProjectScreensDrawer';

export default function MyProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const projects: ProjectDetail[] = [
    {
      id: 'paisawise-studio',
      title: 'PaisaWise Studio — Telegram AI SaaS Bot',
      subtitle: 'Autonomous Video & Viral Thumbnail AI Engine with Multilingual Dubbing',
      category: 'AI Video & Thumbnail Automation • Multi-Platform',
      description:
        'PaisaWise Studio (@PaisaWise_bot) is an autonomous Telegram SaaS application engineered for high-velocity viral content creation. Features prompt-to-video synthesis ("Write Any Topic"), a curated viral ideas gallery, automated video re-editing, multilingual AI voice dubbing, CTR-optimized thumbnail generation, and a complete SaaS credit economy with daily bonuses and affiliate rewards.',
      thumbnail: '/images/thumb-paisawise-studio.jpg',
      badge: 'Live SaaS Bot • t.me/PaisaWise_bot',
      screens: [
        {
          title: 'PaisaWise Telegram SaaS Bot Menu & Delivery',
          url: '/images/project-paisawise-studio.png',
          caption:
            'Live Telegram bot interface showing automated video delivery, multi-platform publishing (YouTube, Blog, Telegram), and full keypad menu: Write Any Topic, Viral Ideas Gallery, Edit My Video, AI Dub Video, and Credit Wallet.',
          tag: 'Live In-App Bot UI',
        },
      ],
      liveUrl: 'https://t.me/PaisaWise_bot',
      isTelegram: true,
      actionLabel: 'Launch Telegram Bot',
      technologies: ['Telegram Bot API', 'Python', 'FFmpeg', 'AI Dubbing', 'Whisper', 'Thumbnail Engine', 'Stripe/UPI Payments', 'Cloud GPU'],
    },
    {
      id: 'shubhaangi-couture',
      title: 'SHUBHAANGI — "The Ultimate Bride" & Studio OS',
      subtitle: 'Haute Couture Bridal E-Commerce + Executive Studio Operating System',
      category: 'Luxury Bridal E-Commerce • Rental CRM & OS',
      description:
        'A comprehensive luxury fashion platform combining a high-conversion bridal couture storefront with an Executive Studio Operating System. Features dual "Rent & Buy" models (e.g. ₹24,999 Rent vs ₹89,999 Buy), an automated WhatsApp styling concierge, and an internal business intelligence hub tracking ₹1.48L+ gross revenue, active rentals, automated overdue return alerts, and customer measurement CRM.',
      thumbnail: '/images/thumb-shubhaangi-couture.jpg',
      badge: 'The Ultimate Bride • Storefront + OS',
      screens: [
        {
          title: '01 • Luxury Bridal Couture Storefront',
          url: '/images/project-shubhaangi-store.png',
          caption:
            'Exclusive bridal catalog featuring Gulabi Noor, Zar-e-Khaas, and Rose Quartz couture with dual Rent & Buy pricing models, high-res lookbook, and direct 1-tap WhatsApp bridal styling consultations.',
          tag: 'Couture Storefront',
        },
        {
          title: '02 • Executive Studio OS / Business Dashboard',
          url: '/images/project-shubhaangi-dashboard.png',
          caption:
            'Real-time executive operating system tracking ₹1.48L+ Gross Store Revenue, 3 Active Rentals, Automated Overdue Returns Alert (Meera S. 2 days overdue), and Client Bookings CRM with instant WhatsApp chat routing.',
          tag: 'Executive Studio OS',
        },
      ],
      liveUrl: 'https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20saw%20Shubhaangi%20Couture%20Storefront%20and%20want%20to%20discuss%20a%20similar%20system',
      isTelegram: false,
      actionLabel: 'Inquire About Shubhaangi Architecture',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Business Intelligence OS', 'WhatsApp Commerce API', 'PostgreSQL/SQLite'],
    },
    {
      id: 'aditi-assistant',
      title: 'Aditi — AI Personal Voice & Desktop Assistant',
      subtitle: 'Voice AI with "Oye Aditi" Hotword & Native Windows/Android Bridge',
      category: 'Voice AI • "Oye Aditi" Windows & Android',
      description:
        'Custom-built multimodal AI personal desktop assistant ("Oye Aditi") designed for hands-free voice desktop control, speech recognition, automated application launching (VS Code, Chrome, Terminal), file management, web research, and synchronized Android device status.',
      thumbnail: '/images/aditi-voice-assistant.jpg',
      badge: 'Voice AI Flagship',
      screens: [
        {
          title: 'Aditi Multimodal Desktop Assistant Architecture',
          url: '/images/aditi-voice-assistant.jpg',
          caption:
            'Continuous acoustic hotword listener ("Oye Aditi"), sub-300ms neural voice synthesis, OS system automation hooks (VS Code, Chrome, Terminal, folders, screenshots), and cross-device Android telemetry bridge.',
          tag: 'Desktop Assistant',
        },
      ],
      liveUrl: 'https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20know%20more%20about%20Aditi%20AI%20Voice%20Assistant',
      isTelegram: false,
      actionLabel: 'Discuss Voice AI Architecture',
      technologies: ['Python', 'Whisper', 'Edge-TTS', 'Windows 11 API', 'Local LLM', 'Android Bridge'],
    },
    {
      id: 'aviator-predictor',
      title: 'Aviator Predictor & Crash Game Suite',
      subtitle: 'Real-Time Multiplier Prediction & High-Concurrency Crash Game Engine',
      category: 'Real-Time Algorithm • Android & Web App',
      description:
        'High-concurrency full-stack crash game simulation engine and real-time multiplier prediction platform. Features dynamic mathematical curve plotting, live cash-out probability algorithms, WebSocket state synchronization, and instant cloud distribution on Render.',
      thumbnail: '/images/aviator-predictor-game.jpg',
      badge: 'Live on Render • Download',
      screens: [
        {
          title: 'Live Prediction Dashboard & Multiplier Curve',
          url: '/images/aviator-predictor-game.jpg',
          caption:
            'Real-time mathematical trajectory generator computing live multiplier velocity, sub-50ms WebSocket telemetry, and probability cash-out triggers.',
          tag: 'Predictor App',
        },
      ],
      liveUrl: 'https://royal-app-b0qz.onrender.com/download',
      isTelegram: false,
      actionLabel: 'Download / Launch App',
      technologies: ['Node.js', 'React Native / Web', 'WebSocket', 'Tailwind CSS', 'Render Cloud', 'Python'],
    },
    {
      id: 'city-discovery',
      title: 'City Lead Discovery & Scraper DAG',
      subtitle: 'Automated Local Business Intelligence & Google Maps Extraction',
      category: 'Find Businesses • City Scraper',
      description:
        'Engineered automated scraper workflows that query Google Maps and local business registries across target cities to discover active businesses, phone numbers, addresses, and operating hours with deduplication and phone verification.',
      thumbnail: '/images/project-social-media.png',
      screens: [
        {
          title: 'City Business Discovery Engine Architecture',
          url: '/images/project-social-media.png',
          caption:
            'Automated geographic entity extraction, Google Maps query dispatcher, data normalization pipeline, and real-time CRM export.',
          tag: 'Scraper Pipeline',
        },
      ],
      liveUrl: '/work',
      isTelegram: false,
      actionLabel: 'Explore Architecture',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Selenium'],
    },
    {
      id: 'outreach-suite',
      title: 'AI Multi-Channel Outreach Suite',
      subtitle: 'Automated WhatsApp Campaigns & Smart Conversational Routing',
      category: 'Send Messages • WhatsApp & Email',
      description:
        'Structured, compliant messaging cadences delivering customized business inquiries to qualified prospective clients, handling initial responses, and routing warm conversations directly to the business owner via WhatsApp.',
      thumbnail: '/images/project-video-pipeline.png',
      screens: [
        {
          title: 'Personalized WhatsApp Outreach Pipeline',
          url: '/images/project-video-pipeline.png',
          caption:
            'Official WhatsApp Business API integration, variable-based personalization, automated Day-1/Day-3/Day-7 follow-ups, and instant lead alerts.',
          tag: 'Outreach Pipeline',
        },
      ],
      liveUrl: '/work',
      isTelegram: false,
      actionLabel: 'Explore Architecture',
      technologies: ['Node.js', 'Meta Cloud API', 'Webhooks', 'Redis', 'PostgreSQL'],
    },
  ];

  const handleOpenScreens = (project: ProjectDetail) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  return (
    <section className="w-full bg-[#07090E] py-16 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Title and View All */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ROCK AUTOMATIONS &bull; FEATURED PRODUCTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Flagship Built Systems &amp; Live Apps
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-normal mt-1">
              Engineered by Abhishek Kumar — click any thumbnail to inspect real in-app production screenshots and side-scrolling galleries.
            </p>
          </div>

          <Link
            href="/work"
            className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group whitespace-nowrap"
          >
            <span>View All Architectures</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Grid: 2 cols on mobile, 3 cols on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#0D111A] rounded-2xl border border-slate-800 hover:border-amber-500/40 overflow-hidden shadow-lg hover:shadow-amber-500/10 transition-all flex flex-col justify-between"
            >
              {/* Interactive Thumbnail Container: Clicking opens the side-scrolling drawer */}
              <div
                onClick={() => handleOpenScreens(project)}
                className="relative aspect-16/10 w-full overflow-hidden bg-black cursor-pointer"
                title="Click to view real in-app screenshots"
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge (Top Left) */}
                {project.badge && (
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 shadow">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{project.badge}</span>
                  </div>
                )}

                {/* Direct Action Link (Top Right) */}
                {project.liveUrl && project.liveUrl.startsWith('http') && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-black shadow transition-transform hover:scale-110"
                    title={project.isTelegram ? 'Launch Telegram Bot' : 'Visit Live URL'}
                  >
                    {project.isTelegram ? (
                      <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </a>
                )}

                {/* Hover Overlay Prompt: "Click to View Screenshots (Side Scroll)" */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center backdrop-blur-[2px]">
                  <div className="p-2.5 rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-white drop-shadow">
                    View In-App Screenshots
                  </span>
                  <span className="text-[10px] text-amber-300 bg-black/70 px-2.5 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>{project.screens.length} Screen{project.screens.length > 1 ? 's' : ''} • Side Scroll</span>
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3
                    onClick={() => handleOpenScreens(project)}
                    className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <span className="inline-block text-[10px] font-semibold text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {project.category}
                  </span>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenScreens(project)}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Screenshots</span>
                  </button>

                  {project.liveUrl && project.liveUrl.startsWith('http') ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      <span>{project.isTelegram ? 'Open Bot' : 'Open App'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={project.liveUrl || '/work'}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Slide-over Side Gallery Drawer */}
      <ProjectScreensDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}
