'use client';

import React from 'react';

const blogPosts = [
  {
    id: 1,
    category: 'WhatsApp Marketing',
    title: 'How to Acquire 47 New Clients via WhatsApp Automation (Step-by-Step)',
    date: 'June 12, 2025',
    readTime: '7 min read',
    excerpt:
      'A comprehensive case breakdown of how a local wellness salon deployed targeted broadcasts and automated booking cadences to secure 47 new paying clients within 30 days.',
    slug: 'whatsapp-se-naye-customers',
  },
  {
    id: 2,
    category: 'Salon Automation',
    title: 'The Complete Guide to Automating Your Salon Business in 2025',
    date: 'July 3, 2025',
    readTime: '10 min read',
    excerpt:
      'From instant appointment confirmation to automated post-treatment review requests — discover the exact high-retention workflows saving salon operators 40+ administrative hours monthly.',
    slug: 'salon-business-automate-guide-2025',
  },
  {
    id: 3,
    category: 'Lead Generation',
    title: 'B2B Lead Discovery with Google Maps: A Growth Blueprint for Retail & Dining',
    date: 'July 19, 2025',
    readTime: '6 min read',
    excerpt:
      'How to systematically extract, filter, and qualify high-intent local commercial prospects directly from map data to feed automated client acquisition pipelines.',
    slug: 'google-maps-lead-mining-restaurants',
  },
  {
    id: 4,
    category: 'AI & Chatbots',
    title: 'AI Chatbots vs. Human Support: The High-Conversion Hybrid Strategy',
    date: 'August 5, 2025',
    readTime: '8 min read',
    excerpt:
      'Examining response velocity, operational cost, and customer satisfaction across automated messaging channels — and why an AI-first triage system consistently outperforms manual agents.',
    slug: 'ai-chatbot-vs-human-customer-service',
  },
  {
    id: 5,
    category: 'Gym & Fitness',
    title: 'Preventing Member Churn: Automated Follow-Up Sequences for Fitness Studios',
    date: 'August 22, 2025',
    readTime: '9 min read',
    excerpt:
      'With industry churn rates exceeding 30%, automated attendance tracking, progress milestones, and timely re-engagement messages protect recurring membership revenue.',
    slug: 'gym-member-retention-automation',
  },
  {
    id: 6,
    category: 'Tools & Resources',
    title: '5 Essential Automation Systems Every Growing Business Must Implement',
    date: 'September 8, 2025',
    readTime: '5 min read',
    excerpt:
      'A strategic breakdown of lead capture, customer triage, review generation, messaging pipelines, and CRM syncing designed for predictable operational leverage.',
    slug: '5-automation-tools-small-business',
  },
];

const categoryColors: Record<string, string> = {
  'WhatsApp Marketing': 'bg-green-900/60 text-green-300 border-green-700',
  'Salon Automation': 'bg-pink-900/60 text-pink-300 border-pink-700',
  'Lead Generation': 'bg-blue-900/60 text-blue-300 border-blue-700',
  'AI & Chatbots': 'bg-purple-900/60 text-purple-300 border-purple-700',
  'Gym & Fitness': 'bg-orange-900/60 text-orange-300 border-orange-700',
  'Tools & Resources': 'bg-amber-900/60 text-amber-300 border-amber-700',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#07090E] text-white">
      {/* Hero Header */}
      <section className="relative pt-24 pb-16 px-4 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.3em] text-amber-400 uppercase mb-4 border border-amber-400/30 px-4 py-1.5 rounded-full">
            ROCK AUTOMATIONS BLOG
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 mb-5">
            Automation{' '}
            <span className="text-amber-400">Insights</span>{' '}
            &amp; Guides
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Proven strategies, architecture guides, and technical insights on building deterministic client acquisition and automation engines for modern businesses.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-[#0D111A] border border-white/5 hover:border-amber-400/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]"
            >
              {/* Card accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-6 flex flex-col flex-1">
                {/* Category badge */}
                <span
                  className={`self-start text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full border mb-4 ${
                    categoryColors[post.category] ?? 'bg-amber-900/60 text-amber-300 border-amber-700'
                  }`}
                >
                  {post.category}
                </span>

                {/* Title */}
                <h2 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-amber-400 transition-colors duration-200">
                  {post.title}
                </h2>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-4 font-mono">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span>{post.readTime}</span>
                </div>

                {/* Excerpt */}
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors group/link"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center border border-amber-400/20 rounded-2xl p-10 bg-[#0D111A]">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-3">Want results like these?</p>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
            Deploy Intelligent Automation for Your Business
          </h3>
          <a
            href="https://wa.me/916209817520?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20automation%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold px-8 py-3.5 rounded-full transition-all text-sm uppercase tracking-wider shadow-lg shadow-green-500/20 active:scale-95 cursor-pointer"
          >
            <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Consult on WhatsApp</span>
          </a>
        </div>
      </section>
    </main>
  );
}
