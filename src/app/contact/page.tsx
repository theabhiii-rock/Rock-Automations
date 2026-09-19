'use client';

import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Zap, CheckCircle2, Sparkles, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: <MessageCircle className="w-5 h-5 text-[#25D366]" />,
    label: 'WhatsApp Direct',
    value: 'Click to Chat Directly',
    href: 'https://wa.me/916209817520?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20automation%20services.',
    color: 'text-green-400',
    bg: 'bg-green-950/20 border-green-500/30',
  },
  {
    icon: <Mail className="w-5 h-5 text-amber-400" />,
    label: 'Official Email',
    value: 'rockautomations@gmail.com',
    href: 'mailto:rockautomations@gmail.com',
    color: 'text-amber-400',
    bg: 'bg-amber-950/20 border-amber-500/30',
  },
  {
    icon: <MapPin className="w-5 h-5 text-blue-400" />,
    label: 'Headquarters & Coverage',
    value: 'New Delhi / Pan-India',
    href: null,
    color: 'text-blue-400',
    bg: 'bg-blue-950/20 border-blue-500/30',
  },
];

const businessTypes = ['Salon', 'Restaurant', 'Gym', 'Clinic', 'E-Commerce', 'Real Estate', 'Coaching / Education', 'Other'];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Abhishek! My name is ${formData.name}. I run a ${formData.businessType} business. My Phone/WhatsApp is ${formData.phone}. Message: ${formData.message}`;
    const url = `https://wa.me/916209817520?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#07090E] text-white">
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CONNECT WITH US</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-2">
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Touch
            </span>
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Let's discuss how intelligent automation can accelerate your business growth. We typically respond within{' '}
            <strong className="text-amber-400 font-bold">2 hours</strong>.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
        {/* LEFT: Contact Info */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <h2 className="text-xl font-extrabold text-white mb-1">Contact Information</h2>

          {contactInfo.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 rounded-2xl border ${item.bg} transition-all duration-200 hover:scale-[1.01]`}
            >
              <div className="mt-1 flex-shrink-0">{item.icon}</div>
              <div>
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-0.5">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`font-extrabold text-sm sm:text-base ${item.color} hover:underline`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className={`font-extrabold text-sm sm:text-base ${item.color}`}>{item.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* WhatsApp quick button */}
          <a
            href="https://wa.me/916209817520?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20automation%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-black px-6 py-4 rounded-xl transition-all text-xs uppercase tracking-wider mt-2 shadow-lg shadow-green-500/20 active:scale-98 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
            <span>Chat on WhatsApp Now</span>
          </a>

          {/* Response time note */}
          <div className="border border-amber-400/30 rounded-xl p-4 bg-amber-500/10 flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-200 leading-relaxed">
              <span className="font-extrabold text-amber-400">Rapid Response Guarantee:</span> Weekdays 9:00 AM &ndash; 9:00 PM IST, our engineering team replies within 2 hours.
            </p>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="lg:col-span-3">
          <div className="bg-[#0D111A] border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-extrabold text-white mb-6">Send Us a Direct Message</h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto text-green-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-white">Opening in WhatsApp!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Your message has been formatted for WhatsApp. Abhishek Kumar or our engineering lead will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-amber-400 text-xs font-bold uppercase tracking-wider underline hover:text-amber-300 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2" htmlFor="name">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#07090E] border border-slate-800 focus:border-amber-400 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2" htmlFor="phone">
                    Phone / WhatsApp Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#07090E] border border-slate-800 focus:border-amber-400 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2" htmlFor="businessType">
                    Business Category <span className="text-amber-400">*</span>
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full bg-[#07090E] border border-slate-800 focus:border-amber-400 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-500">
                      Select your business type...
                    </option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#0D111A] text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2" htmlFor="message">
                    What Would You Like to Automate?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe your business and growth objectives — lead discovery, AI outreach, or web systems?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#07090E] border border-slate-800 focus:border-amber-400 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all text-xs mt-2 shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Send Message via WhatsApp</span>
                </button>

                <p className="text-xs text-slate-400 text-center">
                  Submitting this form connects you directly to our WhatsApp support channel.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
