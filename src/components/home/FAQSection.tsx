'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What does ROCK AUTOMATIONS do?',
    a: 'ROCK AUTOMATIONS builds intelligent client acquisition and workflow automation systems for growing businesses. We operate across 4 core pillars: FIND (automated lead discovery & extraction), ENGAGE (AI outreach & personalized multi-channel messaging), BUILD (high-converting websites & digital hubs), and GROW (analytics, review automation, and customer retention). Every system runs automatically, freeing you to focus on high-value business operations.',
  },
  {
    q: 'Will these automation systems work for my specific industry?',
    a: 'Yes. Our systems are custom-engineered for retail stores, salons, wellness clinics, medical practices, gyms, restaurants, coaching institutes, real estate agencies, and professional services. During your initial consultation, we analyze your client acquisition journey and calibrate pipelines tailored to your local market.',
  },
  {
    q: 'What is the pricing model and investment required?',
    a: 'Our modular solutions start from ₹4,999/month for specialized pipelines up to complete growth architectures. Pricing is completely transparent with zero hidden fees — what is quoted is what you pay. Most client partners recover their monthly system investment within the first 30 days through newly acquired customers.',
  },
  {
    q: 'Are there any long-term contract lock-ins?',
    a: 'No. We operate strictly on flexible month-to-month retainers. You are never locked into restrictive long-term commitments. We maintain partnerships through measurable client ROI and system performance, not contractual obligations.',
  },
  {
    q: 'How quickly can we expect measurable results?',
    a: 'Most businesses observe initial system activity within 7 to 14 days. Lead discovery bots and outreach campaigns produce qualified responses within week one. Website inquiry funnels convert within 2 to 3 weeks, while automated reputation and review flows show tangible momentum within 30 days.',
  },
  {
    q: 'Is WhatsApp automation compliant and safe for my brand?',
    a: 'Absolutely. We strictly deploy official WhatsApp Business API channels in full compliance with Meta policies. We never engage in untargeted spam; all outbound messaging is directed toward verified commercial prospects, warm inquiries, or opt-in customer lists with strict safety pacing.',
  },
  {
    q: 'Can I speak directly with your engineering leadership?',
    a: 'Yes. Founder & Chief Systems Architect Abhishek Kumar personally oversees every client architecture. You can connect via WhatsApp call, voice note, or text message — whichever communication channel works best for your schedule.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major secure payment methods: UPI (PhonePe, Google Pay, Paytm), direct bank transfers (NEFT / RTGS / IMPS), credit/debit cards, net banking via Razorpay, and international payments. Invoices and service level agreements are issued immediately upon confirmation.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(prev => (prev === i ? null : i));
  };

  return (
    <section className="w-full bg-[#0D111A] py-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-4">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
            FAQ
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          Frequently Asked{' '}
          <span className="text-amber-400">Questions</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Clear answers to common questions about our systems, implementation timeline, and performance standards.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                isOpen
                  ? 'border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.12)]'
                  : 'border-amber-400/20 hover:border-amber-400/50'
              } bg-[#07090E]`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group cursor-pointer"
                aria-expanded={isOpen}
              >
                <span
                  className={`font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
                    isOpen ? 'text-amber-400' : 'text-white group-hover:text-amber-300'
                  }`}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-amber-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {/* Answer Panel */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-amber-400/10 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <p className="text-slate-400 text-sm mb-4">
          Have a specific question about your workflow? We respond promptly.
        </p>
        <a
          href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20have%20a%20question%20about%20Rock%20Automations%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold px-6 py-3.5 rounded-full text-sm transition-all duration-200 shadow-md hover:shadow-green-500/30 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          Ask on WhatsApp &mdash; Free Consultation
        </a>
      </div>
    </section>
  );
}
