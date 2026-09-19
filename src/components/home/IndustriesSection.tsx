'use client';

import React from 'react';
import { 
  Scissors, 
  Utensils, 
  Dumbbell, 
  ShoppingBag, 
  GraduationCap, 
  Building2, 
  Home, 
  Sparkles,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export default function IndustriesSection() {
  const industries = [
    {
      title: 'BEAUTY & WELLNESS',
      icon: Scissors,
      subtypes: ['Salons', 'Spas', 'Clinics', 'Wellness Centers', 'Beauty Professionals'],
      description: 'Automate appointment scheduling, repeat client reminders, and localized WhatsApp customer outreach.',
    },
    {
      title: 'FOOD & HOSPITALITY',
      icon: Utensils,
      subtypes: ['Restaurants', 'Cafés', 'Cloud Kitchens', 'Hotels', 'Catering Businesses'],
      description: 'Streamline party bookings, automated review capture, holiday specials, and direct diner communication.',
    },
    {
      title: 'FITNESS & HEALTH',
      icon: Dumbbell,
      subtypes: ['Gyms', 'Fitness Studios', 'Yoga Centers', 'Personal Trainers', 'Healthcare Practices'],
      description: 'Engage trial inquiries immediately, nurture membership renewals, and reduce front-desk follow-up overhead.',
    },
    {
      title: 'RETAIL & LOCAL COMMERCE',
      icon: ShoppingBag,
      subtypes: ['Retail Stores', 'Boutiques', 'Local Shops', 'Automotive Businesses', 'Service Providers'],
      description: 'Promote seasonal catalogs, announce new arrivals, and re-engage dormant local shoppers on autopilot.',
    },
    {
      title: 'EDUCATION & PROFESSIONAL SERVICES',
      icon: GraduationCap,
      subtypes: ['Coaching Institutes', 'Consultants', 'Agencies', 'Training Centers', 'Freelancers'],
      description: 'Capture student and client leads, automate consultation scheduling, and qualify prospects effortlessly.',
    },
    {
      title: 'REAL ESTATE & PROPERTY',
      icon: Building2,
      subtypes: ['Real Estate Agencies', 'Property Consultants', 'Brokers', 'Developers'],
      description: 'Distribute property brochures, follow up with home seekers, and coordinate site visit schedules automatically.',
    },
    {
      title: 'HOME & LOCAL SERVICES',
      icon: Home,
      subtypes: ['Repair Services', 'Cleaning Services', 'Contractors', 'Home Improvement', 'Local Professionals'],
      description: 'Organize incoming service calls, send automated job confirmations, and collect positive customer feedback.',
    },
    {
      title: 'AND MORE',
      icon: Sparkles,
      subtypes: ['Custom Systems', 'B2B Suppliers', 'Niche Services', 'Specialized Workflows'],
      description: 'Custom systems engineered for businesses with specialized operational workflows and growth targets.',
    },
  ];

  return (
    <section className="w-full bg-[#080B12] py-20 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INDUSTRY-SPECIFIC ARCHITECTURES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Built for Businesses That Want to Grow
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Specialized automation, websites and growth systems for local and service-based businesses.
          </p>
        </div>

        {/* 8-Card Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isLast = idx === industries.length - 1;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all group ${
                  isLast
                    ? 'bg-gradient-to-b from-[#131826] to-[#0D111A] border-2 border-amber-500/40 shadow-lg shadow-amber-500/10'
                    : 'bg-[#0D111A] border border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {ind.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {ind.subtypes.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-[#131826] border border-slate-700/80 text-[10px] font-semibold text-slate-300"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800">
                  <a
                    href={`https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20run%20a%20business%20in%20${encodeURIComponent(ind.title)}%20and%20want%20to%20learn%20about%20your%20systems`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Configure for your business</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action strip */}
        <div className="text-center pt-2">
          <a
            href="https://wa.me/916209817520?text=Hi%20Abhishek,%20let's%20discuss%20automation%20for%20my%20industry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Chat with Abhishek about Your Industry on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
