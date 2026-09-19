'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function MarketplacePreview() {
  const { formatPrice } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Outreach',
    'Automation',
    'Websites',
    'AI Engines',
    'Growth',
  ];

  const allTalent = [
    {
      id: 'sarah-wilson',
      name: 'Sarah Wilson',
      role: 'High-Converting UI/UX & Web',
      category: 'Websites',
      rating: 4.8,
      reviewsCount: 34,
      hourlyRate: 35,
      avatar: '/images/talent-sarah.jpg',
      username: 'sarahwilson',
    },
    {
      id: 'david-chen',
      name: 'David Chen',
      role: 'Full-Stack Next.js Architect',
      category: 'Websites',
      rating: 4.7,
      reviewsCount: 18,
      hourlyRate: 45,
      avatar: '/images/talent-david.jpg',
      username: 'davidchen',
    },
    {
      id: 'maria-garcia',
      name: 'Maria Garcia',
      role: 'Cold Outreach & Copy Specialist',
      category: 'Outreach',
      rating: 4.9,
      reviewsCount: 52,
      hourlyRate: 30,
      avatar: '/images/talent-maria.jpg',
      username: 'mariagarcia',
    },
    {
      id: 'james-smith',
      name: 'James Smith',
      role: 'Automation & Scraping Engineer',
      category: 'Automation',
      rating: 4.9,
      reviewsCount: 26,
      hourlyRate: 50,
      avatar: '/images/talent-james.jpg',
      username: 'jamessmith',
    },
  ];

  const filteredTalent = allTalent.filter((t) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      t.category.toLowerCase() === selectedCategory.toLowerCase() ||
      t.role.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full bg-[#080B12] py-16 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>VERIFIED SPECIALIST NETWORK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hire Verified Automation & Web Specialists
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Handpicked, identity-vetted talent under Rock Automations standards with 20% capped platform fees and 100% escrow protection.
          </p>
        </div>

        {/* Search & Category Filter Box */}
        <div className="bg-[#0D121F] rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
          
          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, services or specialists..."
              className="w-full pl-4 pr-14 py-3 rounded-xl bg-[#0D111A] border border-amber-500/20 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all"
            />
            <button
              type="button"
              className="absolute right-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-bold transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                      : 'bg-[#0D111A] hover:bg-[#131826] text-slate-300 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Talent Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-3">
            {filteredTalent.length > 0 ? (
              filteredTalent.map((talent) => (
                <div
                  key={talent.id}
                  className="bg-[#0A0E18] rounded-2xl border border-slate-800 hover:border-amber-500/40 p-4 shadow-md transition-all flex flex-col items-center text-center relative group"
                >
                  {/* Verified Indicator Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono text-emerald-400" title="Identity & Repository Verified">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Avatar Photo */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/30 mb-3 group-hover:scale-105 transition-transform bg-[#0D111A]">
                    <Image
                      src={talent.avatar}
                      alt={talent.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {talent.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {talent.role}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 mt-2">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{talent.rating.toFixed(1)}</span>
                    <span className="text-slate-500 font-normal">({talent.reviewsCount})</span>
                  </div>

                  {/* Rate and View Profile CTA */}
                  <div className="w-full flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80">
                    <span className="text-xs font-bold text-amber-300 font-mono">
                      {formatPrice(talent.hourlyRate)}<span className="text-[10px] text-slate-500 font-normal">/hr</span>
                    </span>

                    <Link
                      href="/talent"
                      className="w-7 h-7 rounded-full bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-black flex items-center justify-center transition-colors shadow-sm"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-xs text-slate-500">
                No specialists found matching your filter. Try another keyword or browse all talent.
              </div>
            )}
          </div>

          {/* Browse All Talent Link */}
          <div className="text-center pt-2">
            <Link
              href="/talent"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Explore All Verified Specialists in Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
