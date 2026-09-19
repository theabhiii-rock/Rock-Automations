'use client';

import React, { useState } from 'react';
import { 
  Video, 
  Share2, 
  Send, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function WorkflowPipelines() {
  const [activeTab, setActiveTab] = useState<'video' | 'social' | 'telegram'>('video');
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const videoStages = [
    { num: '01', title: 'Idea Radar', tool: 'Claude 3.5 / Perplexity', desc: 'Topic intake & conceptual framing from trend radar or editorial briefs.', benchmark: '< 45s' },
    { num: '02', title: 'Research Audit', tool: 'claims.db / Official APIs', desc: 'Automated fact extraction from regulatory & financial databases. Zero hallucination.', benchmark: '< 1.2s' },
    { num: '03', title: 'Retention Script', tool: 'Custom Pydantic Schema', desc: 'Structured narrative hooks, retention cadence, and pacing modulation.', benchmark: '98% retention' },
    { num: '04', title: 'Neural Voice', tool: 'Edge-TTS hi-IN / 24kHz', desc: 'Natural voice cadence with 180ms breathing pauses and broadcast 3-band EQ.', benchmark: '-15.0 LUFS' },
    { num: '05', title: 'Semantic Mapping', tool: 'Vision Semantic Vector', desc: 'Voice-to-visual analysis splitting narration into motivated shots and cards.', benchmark: '100% semantic match' },
    { num: '06', title: 'B-Roll Curation', tool: 'Private Vaults & APIs', desc: 'Automated retrieval of verified high-definition footage matching spoken concepts.', benchmark: '0 duplicate loops' },
    { num: '07', title: 'Auto Edit Engine', tool: 'Remotion / FFmpeg Headless', desc: 'Multi-track timeline assembly, motivated J-cuts, L-cuts, and pacing shifts.', benchmark: 'Sub-pixel sync' },
    { num: '08', title: 'Kinetic Captions', tool: 'WhisperX Millisecond Sync', desc: '2–4 word phrases with highlighted operative keywords strictly respecting safe zones.', benchmark: '0ms drift' },
    { num: '09', title: 'Sound Design', tool: 'Sidechain Dynamic Ducking', desc: 'BGM ducked by -24dB during speech; motivated SFX fired strictly on key beats.', benchmark: 'Broadcast mastered' },
    { num: '10', title: 'High-CTR Thumbnail', tool: 'Canvas / SVG Compositor', desc: 'High-contrast typography with curiosity-inducing framing and zero deception.', benchmark: 'Multi-variant render' },
    { num: '11', title: 'Quality Control (QC)', tool: 'Automated 12-Dim Evaluator', desc: 'Integrated loudness validation, temporal audit, and automated score check (>=85).', benchmark: '0 critical defects' },
    { num: '12', title: 'Distributed Export', tool: 'NVENC / Hardware Render', desc: 'Hardware-accelerated rendering in multiple aspect ratios (9:16 vertical & 16:9).', benchmark: '14h down to 8 mins' },
    { num: '13', title: 'Metadata & SEO', tool: 'Schema.org & YouTube API', desc: 'Automated title variants, chapter markers, description tags, and social dispatch.', benchmark: 'Instant webhook' },
  ];

  const socialStages = [
    { num: '01', title: 'Geotargeting', tool: 'Mapbox / Geo Spatial APIs', desc: 'Geographic and demographic parameter matrix with commercial density scoring.', benchmark: '< 2s setup' },
    { num: '02', title: 'Business Discovery', tool: 'Async Distributed Scrapers', desc: 'Programmatic discovery of local commercial entities and active listings.', benchmark: '2,400 entities/min' },
    { num: '03', title: 'Digital Audit', tool: 'Lighthouse & SEO Scanners', desc: 'Deep audit of existing digital presence, reviews, technical speed, and website gaps.', benchmark: 'Instant gap report' },
    { num: '04', title: 'Lead Qualification', tool: 'Custom ICP Classifier', desc: 'Scoring potential against customized Ideal Customer Profile (ICP) rules.', benchmark: 'Top 5% qualified' },
    { num: '05', title: 'Personalized Value Proposition', tool: 'Multi-Agent Copywriter', desc: 'Context-aware, hyper-personalized value proposition and bespoke outreach scripts.', benchmark: 'Context-grounded' },
    { num: '06', title: 'Multi-Channel Outreach', tool: 'CRM & Webhook Dispatch', desc: 'Automated multi-channel scheduling with response telemetry and CRM sync.', benchmark: '24/7 autonomous' },
  ];

  const telegramFeatures = [
    { title: 'AI Reel Creation', tag: 'END-TO-END', desc: 'Generate complete 60s viral reels from single text prompts via Telegram bot.' },
    { title: 'Faceless Video Engine', tag: 'AUTONOMOUS', desc: 'Full automated narration, stock montage, and subtitles without on-camera talent.' },
    { title: 'Chat Video Editing', tag: 'INTERACTIVE', desc: 'Trim, splice, color grade, and pace footage via simple chat commands.' },
    { title: 'AI Dubbing & Translation', tag: '40+ LANGUAGES', desc: 'Multi-lingual voice cloning and translation across international dialects.' },
    { title: 'Neural Voice Synthesis', tag: 'STUDIO GRADE', desc: 'Natural conversational neural voiceovers with customizable emotion and cadence.' },
    { title: 'Semantic B-Roll Retrieval', tag: 'ASSET VAULT', desc: 'Smart contextual video matching retrieved from private and public asset vaults.' },
    { title: 'Kinetic Safe-Zone Captions', tag: 'RETENTION BOOST', desc: 'Word-by-word highlighted captions designed for maximum mobile viewer retention.' },
    { title: 'Thumbnail Generation', tag: 'HIGH CTR', desc: 'Curiosity-inducing high-CTR thumbnails generated and rendered automatically.' },
    { title: 'Cloud Dispatch & Webhooks', tag: 'API DISPATCH', desc: 'Direct upload to AWS S3, Google Cloud, YouTube Shorts, and Instagram Reels.' },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
          <Cpu className="w-3.5 h-3.5 text-indigo-600" />
          <span>Production-Grade AI Workflow Architectures</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Engineered Pipelines & Systems
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Deterministic, multi-stage pipelines designed to eliminate manual friction with automated execution loops.
        </p>
      </div>

      {/* Pipeline Category Selector Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold gap-1 shadow-xs">
          <button
            onClick={() => { setActiveTab('video'); setSelectedStage(0); }}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'video'
                ? 'bg-white text-indigo-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>AI Video Pipeline (13 Stages)</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('social'); setSelectedStage(0); }}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'social'
                ? 'bg-white text-indigo-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Lead Engine (6 Stages)</span>
          </button>

          <button
            onClick={() => { setActiveTab('telegram'); setSelectedStage(0); }}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'telegram'
                ? 'bg-white text-indigo-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Telegram Bot Platform (9 Modules)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: AI Video Automation Pipeline (13 Stages) */}
      {activeTab === 'video' && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8 animate-in fade-in relative overflow-hidden">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Category: Autonomous Multi-Modal Pipeline</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                13-Stage Headless Video Production Suite
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Removes 95% of manual post-production overhead • Broadcast standard compliant (-15 LUFS)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100 text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Throughput Benchmark</span>
                <span className="text-base font-bold text-indigo-700">14 hrs &rarr; 8 mins</span>
              </div>
            </div>
          </div>

          {/* 13 Stages Interactive Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {videoStages.map((stage, idx) => {
              const isSelected = selectedStage === idx;
              return (
                <div
                  key={stage.num}
                  onClick={() => setSelectedStage(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-indigo-50/60 border-indigo-600 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        Stage {stage.num}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{stage.benchmark}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                      {stage.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Stack:</span>
                    <span className="text-slate-700 truncate max-w-[150px] font-semibold">{stage.tool}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Tab 2: Social Media Lead Automation (6 Stages) */}
      {activeTab === 'social' && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8 animate-in fade-in relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Category: Business Automation & ICP Discovery</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Autonomous Lead Acquisition & Outreach Engine
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
              Ready to Deploy
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialStages.map((stage) => (
              <div
                key={stage.num}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    {stage.num}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold">{stage.benchmark}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{stage.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{stage.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                  Tooling: <span className="text-slate-800 font-semibold">{stage.tool}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 3: AI Telegram Video Platform (9 Features) */}
      {activeTab === 'telegram' && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8 animate-in fade-in relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Category: Mobile-First Creator Suite</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                On-Demand Telegram Video & Media Engine
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
              Telegram Bot API v7.0
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {telegramFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{feat.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200/80 text-slate-700">
                    {feat.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}

    </section>
  );
}
