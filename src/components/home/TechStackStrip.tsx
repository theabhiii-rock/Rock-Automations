'use client';

import React from 'react';
import { 
  Zap, 
  Code2, 
  Globe, 
  Layers, 
  Database, 
  MessageSquare, 
  Box, 
  Cloud, 
  Server,
  Cpu
} from 'lucide-react';

export default function TechStackStrip() {
  const technologies = [
    { name: 'Python', icon: Code2 },
    { name: 'FastAPI', icon: Zap },
    { name: 'Next.js 16', icon: Globe },
    { name: 'React', icon: Cpu },
    { name: 'Tailwind CSS', icon: Layers },
    { name: 'PostgreSQL', icon: Database },
    { name: 'WhatsApp API', icon: MessageSquare },
    { name: 'Docker', icon: Box },
    { name: 'AWS Cloud', icon: Cloud },
    { name: 'Linux', icon: Server },
  ];

  return (
    <section className="w-full bg-[#080B12] py-14 px-4 sm:px-6 lg:px-8 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Enterprise Automation Stacks
          </h2>
          <p className="text-xs text-slate-300 font-normal mt-1">
            Deterministic tools, scrapers & frameworks deployed by Abhishek Kumar.
          </p>
        </div>

        {/* Tech Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="bg-[#0D111A] rounded-xl border border-slate-800 hover:border-amber-500/50 p-3.5 shadow-md flex flex-col items-center justify-center gap-2.5 group hover:scale-105 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
