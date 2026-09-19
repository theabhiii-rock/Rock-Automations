'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function ContactSection() {
  const { currency } = useCurrency();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectTitle: '',
    category: 'AI Engineering & Multi-Agent Swarms',
    budget: '',
    timeline: '2-4 weeks',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/v1/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professionalId: 'pro_abhishek',
          clientName: formData.name,
          clientEmail: formData.email,
          projectTitle: formData.projectTitle || 'AI Engineering Project Inquiry',
          message: `${formData.category} | ${formData.message}`,
          budget: parseFloat(formData.budget || '50000'),
          currency,
          timeline: formData.timeline,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-200">
      
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Direct Architect Channel
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Initialize a Project Inquiry
          </h2>
          <p className="text-sm text-slate-600">
            Send your system requirements directly to Abhishek Kumar. Receive an architectural assessment and implementation breakdown.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4 max-w-lg mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">Inquiry Received</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Your inquiry has been safely received and delivered directly to Abhishek Kumar. You will receive a technical response within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wide">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Mehta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:outline-none text-slate-900 text-xs transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wide">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:outline-none text-slate-900 text-xs transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wide">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Video Rendering Engine"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:outline-none text-slate-900 text-xs transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wide">Estimated Budget ({currency}) *</label>
                <input
                  type="number"
                  required
                  placeholder={currency === 'INR' ? 'e.g. 75000' : 'e.g. 1500'}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:outline-none text-slate-900 text-xs transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wide">Technical Requirements & Brief *</label>
              <textarea
                required
                rows={4}
                placeholder="Describe the system problem, desired inputs/outputs, target scale, and existing stack..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white focus:outline-none text-slate-900 text-xs leading-relaxed transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting Brief...' : 'Submit Project Brief'}</span>
            </button>

            <p className="text-center text-[11px] text-slate-400">
              Encrypted channel. Zero spam. Direct review by Abhishek Kumar.
            </p>

          </form>
        )}

      </div>

    </section>
  );
}
