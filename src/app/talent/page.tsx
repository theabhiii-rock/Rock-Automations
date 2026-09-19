'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  Search, 
  ShieldCheck, 
  Filter, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  SlidersHorizontal, 
  User, 
  Sparkles,
  MapPin,
  DollarSign
} from 'lucide-react';

export default function TalentMarketplace() {
  const { formatPrice, currency } = useCurrency();
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [maxBudget, setMaxBudget] = useState<number>(150);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const fetchTalent = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (selectedCategory) params.set('category', selectedCategory);
      if (verifiedOnly) params.set('verified', 'true');
      if (maxBudget < 150) params.set('max_budget', String(maxBudget));
      if (selectedCountry) params.set('country', selectedCountry);
      params.set('sort', sortBy);

      const res = await fetch(`/api/v1/professionals?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.data?.professionals) {
        setProfessionals(data.data.professionals);
      }
    } catch (err) {
      console.error('Fetch talent error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalent();
  }, [selectedCategory, verifiedOnly, maxBudget, selectedCountry, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTalent();
  };

  const categoryPills = [
    { label: 'All Domains', id: '' },
    { label: 'AI Engineers', id: 'ai-engineers' },
    { label: 'Software Developers', id: 'software-developers' },
    { label: 'AI Automation', id: 'ai-automation' },
    { label: 'UI/UX Designers', id: 'ui-ux-designers' },
    { label: 'Video Editors', id: 'video-editors' },
    { label: 'SEO Specialists', id: 'seo-specialists' },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-white">
      <div className="w-full flex flex-col py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Header & Protocol Ticker */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Vetted Digital Services Marketplace</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Talent Directory &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Specialists</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
                Connect with identity-verified AI engineers, full-stack developers, and automation architects with audited code repositories and escrow protection.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0D111A] border border-amber-500/20 text-xs text-slate-300 flex items-center gap-3 shadow-md">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Markup</span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-amber-400 font-bold font-mono">10% Success Fee Cap</span>
            </div>
          </div>

          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search verified skills or specializations (e.g. LangGraph, Next.js, n8n, Python, FFmpeg)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-32 py-3.5 rounded-xl bg-[#0D111A] border border-slate-800 focus:border-amber-500 focus:outline-none text-white placeholder-slate-500 text-sm shadow-sm transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black rounded-lg shadow-sm cursor-pointer transition active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Category Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoryPills.map((pill) => {
              const isSelected = selectedCategory === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedCategory(pill.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                      : 'bg-[#0D111A] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Marketplace Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Controls */}
          <aside className="lg:col-span-3 bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>Filters</span>
              </span>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setVerifiedOnly(false);
                  setMaxBudget(150);
                  setSearchQuery('');
                  setSelectedCountry('');
                  setSortBy('recommended');
                }}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Verified Only Toggle */}
            <div>
              <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-lg hover:bg-slate-900/60 transition-colors">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Status Only</span>
                </span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
              </label>
            </div>

            {/* Maximum Hourly Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">Max Rate:</span>
                <span className="text-amber-400 font-bold font-mono">{formatPrice(maxBudget)}/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{formatPrice(20)}</span>
                <span>{formatPrice(150)}+</span>
              </div>
            </div>

            {/* Sort Option */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#07090E] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="recommended">Recommended &amp; Verified</option>
                <option value="rating">Highest Rated</option>
                <option value="rate_low">Hourly Rate: Low to High</option>
                <option value="rate_high">Hourly Rate: High to Low</option>
                <option value="experience">Years of Experience</option>
              </select>
            </div>
          </aside>

          {/* Results Stream */}
          <section className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span>Showing {professionals.length} Vetted Specialists</span>
              <span className="font-mono text-amber-400">Rates in {currency}</span>
            </div>

            {loading ? (
              <div className="p-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span>Scanning verified talent network...</span>
              </div>
            ) : professionals.length === 0 ? (
              <div className="bg-[#0D111A] p-16 rounded-2xl text-center space-y-3 border border-slate-800 shadow-md">
                <User className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-white font-bold text-base">No Matching Professionals Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting your search query or loosening filter constraints to view available talent.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {professionals.map((pro) => (
                  <div
                    key={pro.id}
                    className={`bg-[#0D111A] p-6 rounded-2xl border flex flex-col justify-between transition-all group relative overflow-hidden ${
                      pro.is_featured
                        ? 'border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                        : 'border-slate-800 hover:border-amber-500/40 hover:shadow-lg hover:shadow-black/40'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Avatar & Badges */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={pro.avatar_url || '/images/abhishek-kumar.png'}
                            alt={pro.full_name}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0 group-hover:border-amber-400 transition-colors shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/abhishek-kumar.png';
                            }}
                          />
                          <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0D111A]" />
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-white text-base truncate group-hover:text-amber-400 transition-colors">
                              {pro.full_name}
                            </h3>
                            {pro.verification_status === 'VERIFIED' && (
                              <span title="Verified" className="shrink-0">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-amber-400 font-semibold truncate">{pro.title}</p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{pro.country}</span>
                          </p>
                        </div>
                      </div>

                      {/* Featured Tag if Abhishek */}
                      {pro.is_featured ? (
                        <div className="mb-3 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-400 inline-flex items-center gap-1 font-bold tracking-wider">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>FOUNDER &amp; PRINCIPAL ARCHITECT</span>
                        </div>
                      ) : null}

                      {/* Short Bio */}
                      <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                        {pro.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(pro.skills || []).slice(0, 4).map((sk: any) => (
                          <span
                            key={sk.id || sk.name}
                            className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium"
                          >
                            {sk.name || sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Rate & Action Buttons */}
                    <div className="pt-4 border-t border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Hourly Rate</span>
                          <span className="text-base font-bold text-white font-mono">
                            {formatPrice(pro.hourly_rate, pro.currency)}
                            <span className="text-xs text-slate-400 font-normal">/hr</span>
                          </span>
                        </div>
                        {pro.rating_avg > 0 && (
                          <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{pro.rating_avg}</span>
                            <span className="text-slate-500 text-[10px]">({pro.review_count})</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/professional/${pro.username}`}
                          className="w-full text-center py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase border border-slate-700 hover:border-amber-500/40 shadow-sm transition-all"
                        >
                          Profile
                        </Link>
                        <Link
                          href={`/professional/${pro.username}#enquiry`}
                          className="w-full text-center py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-black uppercase shadow-sm transition-all"
                        >
                          Engage
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </section>

        </div>

      </div>
    </div>
  );
}
