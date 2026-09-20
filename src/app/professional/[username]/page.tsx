'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import {
  ShieldCheck,
  Star,
  ExternalLink,
  Send,
  CheckCircle2,
  Calendar,
  DollarSign,
  Clock,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  Eye,
} from 'lucide-react';
import ProjectScreensDrawer, { ProjectDetail } from '@/components/ui/ProjectScreensDrawer';

export default function ProfessionalProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { formatPrice, currency } = useCurrency();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'reviews'>('portfolio');
  const [selectedDrawerProj, setSelectedDrawerProj] = useState<ProjectDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Direct Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    clientName: '',
    clientEmail: '',
    projectTitle: '',
    budget: '',
    timeline: '2-4 weeks',
    message: '',
  });
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);

  useEffect(() => {
    if (!username) return;
    fetch(`/api/v1/professionals/${username}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data?.professional) {
          setData(resData.data.professional);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [username]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setEnquirySubmitting(true);
    try {
      const res = await fetch('/api/v1/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professionalId: data.id,
          clientName: enquiryForm.clientName,
          clientEmail: enquiryForm.clientEmail,
          projectTitle: enquiryForm.projectTitle,
          budget: parseFloat(enquiryForm.budget || '50000'),
          currency,
          timeline: enquiryForm.timeline,
          message: enquiryForm.message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setEnquirySent(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setEnquirySubmitting(false);
    }
  };

  const handleOpenScreens = (proj: any) => {
    let screens = [];
    if (proj.id === 'proj_paisawise_studio') {
      screens = [
        {
          title: 'PaisaWise Telegram SaaS Bot Menu & Delivery',
          url: '/images/project-paisawise-studio.png',
          caption: 'Live Telegram bot interface showing automated video delivery, multi-platform publishing (YouTube, Blog, Telegram), and full keypad menu: Write Any Topic, Viral Ideas Gallery, Edit My Video, AI Dub Video, and Credit Wallet.',
          tag: 'Live In-App Bot UI',
        },
      ];
    } else if (proj.id === 'proj_shubhaangi') {
      screens = [
        {
          title: '01 • Luxury Bridal Couture Storefront',
          url: '/images/project-shubhaangi-store.png',
          caption: 'Exclusive bridal catalog featuring Gulabi Noor, Zar-e-Khaas, and Rose Quartz couture with dual Rent & Buy pricing models, high-res lookbook, and direct 1-tap WhatsApp bridal styling consultations.',
          tag: 'Couture Storefront',
        },
        {
          title: '02 • Executive Studio OS / Business Dashboard',
          url: '/images/project-shubhaangi-dashboard.png',
          caption: 'Real-time executive operating system tracking ₹1.48L+ Gross Store Revenue, 3 Active Rentals, Automated Overdue Returns Alert (Meera S. 2 days overdue), and Client Bookings CRM with instant WhatsApp chat routing.',
          tag: 'Executive Studio OS',
        },
      ];
    } else if (proj.id === 'proj_video_pipe') {
      screens = [
        {
          title: '01 • Automated Multi-Track Video Assembly Studio',
          url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000',
          caption: 'Broadcast video editing engine with precision multi-track assembly, J-cuts, L-cuts, and motivated pacing control.',
          tag: 'Editing Studio',
        },
        {
          title: '02 • 13-Stage AI Video Pipeline Console & Vertical Monitor',
          url: '/images/project-video-pipeline-ui.jpg',
          caption: 'Visual workflow tree (Script -> Neural Voice -> Scene Match -> Captions -> 4K Render), automated B-roll sync, voiceover ducking, and 9:16 mobile monitor preview.',
          tag: 'Pipeline Console',
        },
      ];
    } else if (proj.id === 'proj_telegram_platform') {
      screens = [
        {
          title: '01 • Modal GPU Cluster Console & Telegram Dispatcher',
          url: '/images/project-telegram-video-platform.jpg',
          caption: 'Enterprise console displaying Modal serverless GPU worker clusters, live video render queue, completed video metrics, and multi-platform export telemetry.',
          tag: 'Cloud Console',
        },
        {
          title: '02 • Telegram Bot Creator Interface',
          url: '/images/project-paisawise-studio.png',
          caption: 'Conversational Telegram bot interface allowing creators to submit topics, preview viral reels, dub audio, and manage rendering wallet.',
          tag: 'Telegram Bot UI',
        },
      ];
    } else {
      screens = (proj.images || []).map((img: string, idx: number) => ({
        title: `${proj.title} • Screen 0${idx + 1}`,
        url: img,
        caption: proj.description || '',
        tag: idx === 0 ? 'Featured Cover' : 'In-App View',
      }));
    }

    setSelectedDrawerProj({
      id: proj.id,
      title: proj.title,
      subtitle: proj.category_name || 'AI Engineering & Production Systems',
      category: proj.category_name || 'Production Portfolio',
      description: proj.description,
      thumbnail: proj.images?.[0] || '/images/project-ai-apps.png',
      screens: screens.length > 0 ? screens : [{
        title: proj.title,
        url: proj.images?.[0] || '/images/project-ai-apps.png',
        caption: proj.description || '',
      }],
      liveUrl: proj.live_url,
      isTelegram: proj.live_url && proj.live_url.includes('t.me'),
      technologies: proj.technologies,
    });
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-400 text-sm">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p>Loading professional profile...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[70vh] bg-[#07090E] text-white flex flex-col items-center justify-center px-4">
        <div className="max-w-md mx-auto my-auto text-center p-8 bg-[#0D111A] border border-slate-800 rounded-3xl shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-white">Professional Not Found</h2>
          <p className="text-sm text-slate-400">No verified engineer matching @{username} was found in the network.</p>
          <Link href="/talent" className="btn-primary px-5 py-2.5 text-sm font-semibold rounded-xl inline-block">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col">
      {/* Breadcrumb Strip */}
      <div className="border-b border-slate-800 bg-[#0D111A]/80 py-3 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Link href="/talent" className="hover:text-white transition">Talent Network</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">{data.full_name}</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Verified Escrow Solvency Active
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-10">
        {/* Profile Hero Section */}
        <div className="bg-[#0D111A] p-8 rounded-3xl border border-amber-500/20 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Avatar Column */}
            <div className="md:col-span-3 flex flex-col items-center text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-md mb-4">
                <img
                  src={data.avatar_url || '/images/abhishek-kumar.png'}
                  alt={data.full_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/abhishek-kumar.png';
                  }}
                />
              </div>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Engineer</span>
              </div>
            </div>

            {/* Core Info Column */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{data.full_name}</span>
                </h1>
                <p className="text-sm sm:text-base text-amber-400 font-semibold mt-1">{data.title}</p>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                {data.bio}
              </p>

              {/* Metadata chips */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-400 pt-1">
                <span>📍 {data.country}</span>
                <span>&bull;</span>
                <span>⏱ {data.experience_years}+ Years Experience</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {data.rating_avg} ({data.review_count} Reviews)
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(data.skills || []).map((sk: any) => (
                  <span
                    key={sk.id}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400 font-medium"
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & Quick Action Column */}
            <div className="md:col-span-3 p-6 rounded-2xl bg-[#07090E] border border-slate-800 flex flex-col justify-between space-y-6 text-center md:text-left">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold block">Hourly Valuation</span>
                <div className="text-2xl font-extrabold text-white mt-1">
                  {formatPrice(data.hourly_rate, data.currency)}<span className="text-xs text-slate-400 font-normal"> / hour</span>
                </div>
                <span className="text-xs text-amber-400 font-medium block mt-1">
                  Zero client markup on talent rate
                </span>
              </div>

              <div className="space-y-2">
                <a
                  href="#enquiry"
                  className="btn-primary w-full py-2.5 text-xs font-semibold rounded-xl block text-center"
                >
                  Contact / Send Enquiry
                </a>
                {data.linkedin_url && (
                  <a
                    href={data.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full py-2 text-xs font-semibold rounded-xl block text-center"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout: Left Tabs / Right Quick Enquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tabs & Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tab Bar */}
            <div className="flex border-b border-slate-800 text-sm gap-6">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`pb-3 border-b-2 font-semibold transition-colors cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'border-indigo-600 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Portfolio Projects ({(data.portfolio || []).length})
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`pb-3 border-b-2 font-semibold transition-colors cursor-pointer ${
                  activeTab === 'services'
                    ? 'border-indigo-600 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Services & Packages ({(data.services || []).length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 border-b-2 font-semibold transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-indigo-600 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Verified Reviews ({(data.reviews || []).length || data.review_count || 0})
              </button>
            </div>

            {/* Tab Content: Portfolio */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                {(data.portfolio || []).length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">No portfolio projects uploaded yet.</div>
                ) : (
                  data.portfolio.map((proj: any) => (
                    <div
                      key={proj.id}
                      className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm space-y-4 hover:border-amber-500/30 hover:shadow-md transition-all"
                    >
                      {proj.images && proj.images.length === 1 && (
                        <div
                          onClick={() => handleOpenScreens(proj)}
                          className="relative aspect-16/9 w-full rounded-xl overflow-hidden border border-slate-800 bg-black cursor-pointer group"
                          title="Click to inspect full screenshots"
                        >
                          <img
                            src={proj.images[0]}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                            <div className="p-2 rounded-full bg-amber-500 text-black shadow">
                              <Eye className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-white">Inspect Screenshots</span>
                          </div>
                        </div>
                      )}

                      {proj.images && proj.images.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {proj.images.slice(0, 2).map((img: string, idx: number) => (
                            <div
                              key={idx}
                              onClick={() => handleOpenScreens(proj)}
                              className="relative aspect-16/9 w-full rounded-xl overflow-hidden border border-slate-800 bg-black group cursor-pointer"
                              title="Click to inspect in side-scrolling drawer"
                            >
                              <img
                                src={img}
                                alt={`${proj.title} preview ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] text-amber-300 border border-amber-500/30">
                                {idx === 0 ? 'Featured 3D Cover' : 'In-App Live Screen'}
                              </span>
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-[1px]">
                                <Eye className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-xs font-semibold text-white">Side-Scroll Gallery</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3
                            onClick={() => handleOpenScreens(proj)}
                            className="text-lg font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
                          >
                            {proj.title}
                          </h3>
                          <p className="text-xs text-amber-400 font-semibold mt-0.5">{proj.category_name || 'AI Engineering'}</p>
                        </div>
                        {proj.live_url && (
                          <a
                            href={proj.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 transition flex items-center gap-1.5 text-xs font-semibold"
                            title="Open live link"
                          >
                            <span>{proj.live_url.includes('t.me') ? 'Telegram Bot' : 'Live App'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Workflow Steps if present */}
                      {proj.workflow_steps && proj.workflow_steps.length > 0 && (
                        <div className="p-4 rounded-xl bg-[#07090E] border border-slate-800 space-y-2">
                          <span className="text-xs uppercase font-semibold text-amber-400 block">
                            System Architecture Pipeline
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {proj.workflow_steps.map((st: any) => (
                              <div key={st.step} className="p-2.5 rounded-lg bg-[#0D111A] border border-slate-800 text-xs">
                                <span className="text-amber-400 font-bold mr-1.5">0{st.step}.</span>
                                <span className="text-white font-semibold">{st.label}:</span>{' '}
                                <span className="text-slate-400">{st.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech stack pills & live link CTA */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {(proj.technologies || []).map((t: string) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-xs text-slate-300 font-medium border border-slate-800"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={() => handleOpenScreens(proj)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-amber-400 hover:text-white text-xs font-semibold transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Screenshots</span>
                          </button>

                          {proj.live_url && (
                            <a
                              href={proj.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-bold text-xs shadow transition-all"
                            >
                              <span>{proj.live_url.includes('t.me') ? 'Launch Bot' : 'Launch App'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab Content: Services */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                {(data.services || []).length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">No service packages configured yet.</div>
                ) : (
                  data.services.map((srv: any) => (
                    <div key={srv.id} className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white">{srv.title}</h4>
                        <p className="text-sm text-slate-400">{srv.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                          <span>⏱ {srv.delivery_days} Days Delivery</span>
                          <span>&bull;</span>
                          <span>↺ {srv.revisions} Revisions Included</span>
                        </div>
                      </div>
                      <div className="text-right sm:shrink-0">
                        <div className="text-xl font-extrabold text-white">
                          {formatPrice(srv.starting_price, srv.currency)}
                        </div>
                        <a
                          href="#enquiry"
                          className="btn-primary mt-2 px-4 py-2 text-xs font-semibold rounded-xl inline-block"
                        >
                          Select Service
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab Content: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {(data.reviews || []).length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">No reviews submitted yet. Reviews are verified upon completed platform milestone releases.</div>
                ) : (
                  data.reviews.map((rev: any) => (
                    <div key={rev.id} className="bg-[#0D111A] p-5 rounded-2xl border border-amber-500/20 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{rev.client_name || 'Verified Client'}</span>
                          {rev.company_name && <span className="text-slate-400 text-xs">({rev.company_name})</span>}
                        </div>
                        <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">"{rev.written_review}"</p>
                      <span className="text-xs text-slate-400 block">
                        Verified Platform Milestone Delivery &bull; {new Date(rev.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Column: Direct Enquiry Card (4 cols) */}
          <div id="enquiry" className="lg:col-span-4 bg-[#0D111A] p-6 rounded-3xl border border-amber-500/20 shadow-sm space-y-6 sticky top-28">
            <div className="border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-400" />
                Direct Project Enquiry
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Send a project brief directly to {data.full_name}.
              </p>
            </div>

            {enquirySent ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-white text-base">Enquiry Sent!</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Your enquiry has been delivered. {data.full_name} will review and respond directly.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/916209817520?text=${encodeURIComponent(`Hi Abhishek, I just submitted an enquiry on Rock Automations for "${enquiryForm.projectTitle}" (Budget: ${currency} ${enquiryForm.budget}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-900/30"
                  >
                    <span>Instant WhatsApp Connect (+91 6209817520)</span>
                  </a>
                  <button
                    onClick={() => setEnquirySent(false)}
                    className="btn-secondary px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-1 text-xs font-semibold uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp"
                    value={enquiryForm.clientName}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white placeholder-slate-400 focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 text-xs font-semibold uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={enquiryForm.clientEmail}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, clientEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white placeholder-slate-400 focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 text-xs font-semibold uppercase tracking-wider">Project Scope / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Customer Support Agent"
                    value={enquiryForm.projectTitle}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, projectTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white placeholder-slate-400 focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 text-xs font-semibold uppercase tracking-wider">Budget ({currency}) *</label>
                    <input
                      type="number"
                      required
                      placeholder={currency === 'INR' ? '50000' : '1000'}
                      value={enquiryForm.budget}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white placeholder-slate-400 focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 text-xs font-semibold uppercase tracking-wider">Timeline</label>
                    <select
                      value={enquiryForm.timeline}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-xs"
                    >
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 text-xs font-semibold uppercase tracking-wider">Message / Requirements *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe what you are looking to build..."
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white placeholder-slate-400 focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={enquirySubmitting}
                  className="btn-primary w-full py-3 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{enquirySubmitting ? 'Sending Enquiry...' : 'Send Project Enquiry'}</span>
                </button>

                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  Direct client enquiry. Zero markup. Escrow protection active.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Slide-over Side Gallery Drawer */}
      <ProjectScreensDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        project={selectedDrawerProj}
      />
    </div>
  );
}

