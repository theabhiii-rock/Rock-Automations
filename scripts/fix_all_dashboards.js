const fs = require('fs');

const files = [
  'src/app/professional/dashboard/page.tsx',
  'src/app/admin/page.tsx',
  'src/app/professional/[username]/page.tsx',
  'src/app/join-professional/page.tsx',
];

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log('Skipping missing file:', file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');

  // Outer background
  content = content.replace(/className="min-h-screen py-10/g, 'className="min-h-screen bg-[#07090E] text-white py-10');
  content = content.replace(/className="min-h-screen py-16/g, 'className="min-h-screen bg-[#07090E] text-white py-16');
  content = content.replace(/className="min-h-screen flex flex-col"/g, 'className="min-h-screen bg-[#07090E] text-white flex flex-col"');
  content = content.replace(/className="min-h-\[70vh\] flex flex-col items-center justify-center px-4"/g, 'className="min-h-[70vh] bg-[#07090E] text-white flex flex-col items-center justify-center px-4"');

  // Card surfaces
  content = content.replace(/bg-white\s+p-([0-9]+)\s+rounded-([0-9a-z]+)\s+border\s+border-slate-200\/80/g, 'bg-[#0D111A] p-$1 rounded-$2 border border-amber-500/20');
  content = content.replace(/bg-white\s+p-([0-9]+)\s+rounded-([0-9a-z]+)\s+border\s+border-slate-200/g, 'bg-[#0D111A] p-$1 rounded-$2 border border-amber-500/20');
  content = content.replace(/bg-white\/70/g, 'bg-[#0D111A]/80');
  content = content.replace(/bg-white/g, 'bg-[#0D111A]');

  // Borders
  content = content.replace(/border-slate-200\/80/g, 'border-slate-800');
  content = content.replace(/border-slate-200/g, 'border-slate-800');
  content = content.replace(/border-slate-100/g, 'border-slate-800/80');

  // Surface subtle / inputs
  content = content.replace(/bg-slate-50/g, 'bg-[#07090E]');
  content = content.replace(/bg-slate-100/g, 'bg-slate-800/80');

  // Badges (indigo/purple -> amber)
  content = content.replace(/bg-indigo-50/g, 'bg-amber-500/10');
  content = content.replace(/border-indigo-100/g, 'border-amber-500/30');
  content = content.replace(/border-indigo-200/g, 'border-amber-500/30');
  content = content.replace(/text-indigo-600/g, 'text-amber-400');
  content = content.replace(/text-indigo-700/g, 'text-amber-400');
  content = content.replace(/text-indigo-400/g, 'text-amber-400');

  content = content.replace(/bg-purple-50/g, 'bg-amber-500/10');
  content = content.replace(/border-purple-100/g, 'border-amber-500/30');
  content = content.replace(/border-purple-200/g, 'border-amber-500/30');
  content = content.replace(/text-purple-600/g, 'text-amber-400');
  content = content.replace(/text-purple-700/g, 'text-amber-400');

  // Text contrast
  content = content.replace(/text-slate-900/g, 'text-white');
  content = content.replace(/text-slate-800/g, 'text-slate-200');
  content = content.replace(/text-slate-700/g, 'text-slate-300');
  content = content.replace(/text-slate-600/g, 'text-slate-400');
  content = content.replace(/text-slate-500/g, 'text-slate-400');

  // Emerald stays emerald, but ensure text is legible
  content = content.replace(/bg-emerald-50/g, 'bg-emerald-950/40');
  content = content.replace(/border-emerald-200/g, 'border-emerald-500/30');
  content = content.replace(/border-emerald-100/g, 'border-emerald-500/30');
  content = content.replace(/text-emerald-700/g, 'text-emerald-400');

  // Red/error states
  content = content.replace(/bg-red-50/g, 'bg-rose-950/40');
  content = content.replace(/border-red-200/g, 'border-rose-500/40');
  content = content.replace(/text-red-700/g, 'text-rose-300');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated:', file);
});
