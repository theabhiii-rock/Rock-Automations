import React from 'react';
import { MapPin, MessageSquare, ShieldCheck, MessageCircle } from 'lucide-react';

export default function TrustStrip() {
  const items = [
    {
      icon: MapPin,
      title: 'Targeted City Discovery',
      subtitle: 'Find high-value local businesses in any city',
    },
    {
      icon: MessageSquare,
      title: 'Personalized Cold Outreach',
      subtitle: 'High-converting WhatsApp & Email messaging',
    },
    {
      icon: ShieldCheck,
      title: '100% Escrow Protection',
      subtitle: 'Funds released on deliverable approval',
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Support',
      subtitle: 'Instant strategic founder communication',
    },
  ];

  return (
    <section className="w-full bg-[#0A0D15] border-y border-amber-500/20 py-8 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 group">
                <div className="w-11 h-11 rounded-xl bg-[#0D111A] border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-500/10 transition-all shrink-0 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-normal mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
