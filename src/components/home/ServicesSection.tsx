'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  MessageSquare, 
  Globe, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      id: '01',
      action: 'FIND',
      title: 'FIND — Lead Discovery & Market Intelligence',
      slug: '/services/lead-discovery',
      icon: Search,
      description: 'Discover the right businesses, prospects and opportunities across cities, industries and target markets.',
      features: [
        'Business Discovery',
        'Lead Filtering',
        'Location Targeting',
        'Contact Research',
        'Market Segmentation',
      ],
      tag: 'DISCOVERY',
    },
    {
      id: '02',
      action: 'ENGAGE',
      title: 'ENGAGE — AI Outreach & Follow-Up',
      slug: '/services/ai-outreach',
      icon: MessageSquare,
      description: 'Connect with potential customers through personalized, structured and scalable outreach workflows.',
      features: [
        'AI-Powered Messaging',
        'Personalization',
        'Follow-Up Automation',
        'Lead Qualification',
        'Outreach Campaigns',
      ],
      tag: 'OUTREACH',
    },
    {
      id: '03',
      action: 'BUILD',
      title: 'BUILD — Websites & Digital Experiences',
      slug: '/services/web-development',
      icon: Globe,
      description: 'Build fast, modern and conversion-focused websites designed to turn visitors into enquiries and customers.',
      features: [
        'Business Websites',
        'Landing Pages',
        'Mobile Optimization',
        'WhatsApp Integration',
        'SEO Foundations',
      ],
      tag: 'DIGITAL',
    },
    {
      id: '04',
      action: 'AUTOMATE',
      title: 'AUTOMATE — Business Process Automation',
      slug: '/services/business-automation',
      icon: Zap,
      description: 'Automate repetitive business workflows so teams can spend more time serving customers and closing opportunities.',
      features: [
        'Workflow Automation',
        'Lead Management',
        'Notifications',
        'Data Synchronization',
        'Custom Business Automations',
      ],
      tag: 'WORKFLOW',
    },
    {
      id: '05',
      action: 'GROW',
      title: 'GROW — Analytics & Retention',
      slug: '/services/analytics-retention',
      icon: TrendingUp,
      description: 'Turn incoming opportunities into measurable growth with analytics, customer follow-up and retention workflows.',
      features: [
        'Lead Tracking',
        'Analytics',
        'Customer Follow-Up',
        'Retention Automation',
        'Performance Insights',
      ],
      tag: 'RETENTION',
    },
  ];

  return (
    <section className="w-full bg-[#07090E] py-20 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>STANDARDIZED CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our Services
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Automation systems designed to help businesses find opportunities, engage prospects, build a stronger digital presence and grow.
          </p>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-[#0D111A] rounded-2xl border border-slate-800 hover:border-amber-500/40 p-7 flex flex-col justify-between transition-all group shadow-xl hover:shadow-amber-500/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400">
                      SERVICE {svc.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-normal mt-2 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Key Highlights
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

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <Link
                    href={svc.slug}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#131826] hover:bg-amber-500/10 border border-slate-700 hover:border-amber-400 text-amber-300 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 group-hover:translate-x-0.5"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Custom Solution Callout */}
          <div className="bg-gradient-to-br from-[#0D111A] via-[#131826] to-[#0D111A] rounded-2xl border-2 border-amber-500/30 p-7 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  CUSTOM ARCHITECTURES
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  Need a Tailored System?
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  We engineer bespoke API integrations, specialized scrapers, custom dashboards, and multi-platform automation pipelines built precisely for your unique business logic.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <a
                href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20have%20a%20custom%20automation%20requirement"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black text-center transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <span>Discuss Custom Requirements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
