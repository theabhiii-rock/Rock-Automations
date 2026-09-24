'use client';

import React, { useState } from 'react';
import RazorpayCheckoutButton from '@/components/ui/RazorpayCheckoutButton';
import { MessageCircle, Sparkles, Check, X, ArrowRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const plans = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '₹4,999',
    amount: 4999,
    period: '/month',
    tagline: 'For businesses getting started online.',
    pillars: ['FIND'],
    highlight: false,
    badge: null,
    features: [
      { text: 'Targeted Business Lead Discovery', included: true },
      { text: 'Directory & Location Filtering', included: true },
      { text: 'Structured Lead Reports (CSV/Excel)', included: true },
      { text: 'WhatsApp Support & Setup Guidance', included: true },
      { text: 'Automated Outreach Workflows', included: false },
      { text: 'Custom Web Systems', included: false },
      { text: 'Retention & Review Automation', included: false },
    ],
    cta: 'Explore Starter Plan',
    whatsapp:
      'https://wa.me/916209817520?text=Hi!%20I%20am%20interested%20in%20the%20Starter%20plan%20(₹4%2C999%2Fmonth).',
  },
  {
    id: 'growth',
    name: 'GROWTH',
    price: '₹9,999',
    amount: 9999,
    period: '/month',
    tagline: 'For businesses focused on generating more enquiries and improving their digital presence.',
    pillars: ['FIND', 'ENGAGE'],
    highlight: true,
    badge: 'MOST POPULAR',
    features: [
      { text: 'Expanded Lead Discovery & Intelligence', included: true },
      { text: 'Personalized WhatsApp Outreach Sequences', included: true },
      { text: 'Multi-Touch Follow-Up Cadence', included: true },
      { text: 'High-Converting Landing Page Setup', included: true },
      { text: 'Inquiry Routing to Your Device', included: true },
      { text: 'Priority WhatsApp Support', included: true },
      { text: 'Advanced Retention Workflows', included: false },
    ],
    cta: 'Explore Growth Plan',
    whatsapp:
      'https://wa.me/916209817520?text=Hi!%20I%20am%20interested%20in%20the%20Growth%20plan%20(₹9%2C999%2Fmonth).',
  },
  {
    id: 'automation',
    name: 'AUTOMATION',
    price: '₹14,999',
    amount: 14999,
    period: '/month',
    tagline: 'For businesses ready to automate repetitive workflows and customer processes.',
    pillars: ['FIND', 'ENGAGE', 'BUILD', 'GROW'],
    highlight: false,
    badge: 'FULL SUITE',
    features: [
      { text: 'Comprehensive Lead Pipeline Architecture', included: true },
      { text: 'Automated Multi-Channel Outreach Systems', included: true },
      { text: 'Modern High-Converting Web System', included: true },
      { text: 'Customer Review & Follow-Up Automation', included: true },
      { text: 'Performance Tracking & Insights Dashboard', included: true },
      { text: 'Bi-Weekly Strategy & Optimization Calls', included: true },
      { text: 'Direct Founder Technical Oversight', included: true },
    ],
    cta: 'Explore Automation Plan',
    whatsapp:
      'https://wa.me/916209817520?text=Hi!%20I%20am%20interested%20in%20the%20Automation%20plan%20(₹14%2C999%2Fmonth).',
  },
  {
    id: 'custom',
    name: 'CUSTOM',
    price: 'Custom',
    amount: 0,
    period: ' / quote',
    tagline: 'For businesses requiring tailored automation or digital systems.',
    pillars: ['CUSTOM'],
    highlight: false,
    badge: 'BESPOKE',
    features: [
      { text: 'Tailored API Integrations & Webhooks', included: true },
      { text: 'Multi-Branch CRM Synchronization', included: true },
      { text: 'Proprietary Scraping & Mining Tools', included: true },
      { text: 'Custom Web Apps & Operational Portals', included: true },
      { text: 'Dedicated Server Infrastructure', included: true },
      { text: 'Custom SLAs & Security Review', included: true },
      { text: 'Direct Collaboration with Abhishek Kumar', included: true },
    ],
    cta: 'Discuss Custom Scope',
    whatsapp:
      'https://wa.me/916209817520?text=Hi!%20I%20have%20custom%20automation%20requirements%20for%20my%20business.',
  },
];

const faqs = [
  {
    q: 'Is there a long-term contract or lock-in period?',
    a: 'No. All standard plans operate on a flexible month-to-month schedule with zero lock-in contracts. You may cancel or pause with prior notice before your next billing cycle.',
  },
  {
    q: 'How do you handle messaging compliance?',
    a: 'We strictly operate through official WhatsApp Business APIs and adhere to cadence controls and opt-out requests to ensure compliant, professional communication.',
  },
  {
    q: 'Can I upgrade or downgrade between plans?',
    a: 'Yes, you can adjust your tier anytime. Upgrades take effect immediately with pro-rated billing, while downgrades take effect at the start of your next billing cycle.',
  },
  {
    q: 'Do you offer an initial consultation?',
    a: 'Yes. We provide a complimentary consultation call where we review your operational model, customer flow, and determine the exact automation strategy suited for your business.',
  },
  {
    q: 'What types of businesses do you work with?',
    a: 'We work primarily with local and service-based businesses including salons, restaurants, gyms, clinics, retail shops, coaching centers, and professional service providers.',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { currency, formatPrice } = useCurrency();

  return (
    <main className="min-h-screen bg-[#07090E] text-white">
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase border border-amber-400/30 px-4 py-1.5 rounded-full bg-amber-500/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>TRANSPARENT VALUE ARCHITECTURES</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-2">
            Explore{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Growth Plans
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Deterministic, scalable automation systems engineered to remove repetitive manual work and drive steady business growth.
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Month-to-month plans &bull; Direct WhatsApp founder support</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan) => {
            const displayPrice = plan.amount > 0 ? formatPrice(plan.amount, 'INR') : 'Custom';
            const whatsappUrl = plan.amount > 0
              ? `https://wa.me/916209817520?text=${encodeURIComponent(`Hi! I am interested in the ${plan.name} plan (${displayPrice}${plan.period}).`)}`
              : `https://wa.me/916209817520?text=${encodeURIComponent(`Hi! I have custom automation requirements for my business.`)}`;
            const payButtonLabel = currency === 'USD'
              ? `Pay ${displayPrice} (~₹${plan.amount.toLocaleString('en-IN')}) Online`
              : `Pay ${displayPrice} Online (Razorpay)`;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-300 h-full ${
                  plan.highlight
                    ? 'border-2 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.2)] lg:-translate-y-2 bg-[#0D111A]'
                    : 'border border-slate-800 bg-[#0D111A] hover:border-amber-500/30'
                }`}
              >
                {/* Badges */}
                {plan.badge && (
                  <div
                    className={`absolute top-3 right-3 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md ${
                      plan.highlight
                        ? 'bg-amber-400 text-black border border-amber-300'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-normal mt-1 leading-relaxed min-h-[40px]">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white font-mono">
                        {displayPrice}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 pt-2 border-t border-slate-800">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs">
                        {feature.included ? (
                          <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-3 h-3" />
                          </div>
                        )}
                        <span className={feature.included ? 'text-slate-200 font-medium' : 'text-slate-500 line-through'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions: Razorpay / WhatsApp */}
                <div className="p-6 pt-0 space-y-2.5">
                  {plan.amount > 0 ? (
                    <RazorpayCheckoutButton
                      planName={`${plan.name} Plan`}
                      amount={plan.amount}
                      buttonText={payButtonLabel}
                      className={`w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black shadow-md shadow-amber-500/20 active:scale-98'
                          : 'bg-amber-400 hover:bg-amber-300 text-black font-extrabold active:scale-98'
                      }`}
                    />
                  ) : null}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      plan.amount === 0
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-extrabold shadow-md shadow-amber-500/20'
                        : 'bg-[#131826] hover:bg-[#1a2133] text-slate-200 hover:text-white border border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>{plan.amount === 0 ? 'Discuss on WhatsApp' : 'Inquire on WhatsApp'}</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-8">
          Frequently Asked{' '}
          <span className="text-amber-400">Questions</span>
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#0D111A] border border-slate-800 hover:border-amber-500/30 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-amber-400 text-lg font-mono ml-4">
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
