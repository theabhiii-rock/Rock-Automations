const fs = require('fs');
const path = require('path');

const policyFiles = [
  'src/app/privacy/page.tsx',
  'src/app/terms/page.tsx',
  'src/app/fee-policy/page.tsx',
  'src/app/refund-policy/page.tsx',
  'src/app/dispute-policy/page.tsx',
  'src/app/membership-policy/page.tsx',
  'src/app/client-agreement/page.tsx',
  'src/app/professional-agreement/page.tsx'
];

policyFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/className="min-h-screen py-16/g, 'className="min-h-screen bg-[#07090E] text-white py-16');
  content = content.replace(/border-slate-200/g, 'border-slate-800');
  content = content.replace(/bg-indigo-50 border border-indigo-200 text-indigo-700/g, 'bg-amber-500/10 border border-amber-500/30 text-amber-400');
  content = content.replace(/bg-indigo-50 border-indigo-200 text-indigo-700/g, 'bg-amber-500/10 border border-amber-500/30 text-amber-400');
  content = content.replace(/text-slate-900/g, 'text-white');
  content = content.replace(/text-slate-600/g, 'text-slate-300');
  content = content.replace(/text-slate-500/g, 'text-slate-400');
  content = content.replace(/clean-card p-8 rounded-2xl/g, 'bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl');
  content = content.replace(/glass-panel p-8 rounded-2xl/g, 'bg-[#0D111A] border border-amber-500/20 p-8 rounded-2xl shadow-xl');
  content = content.replace(/bg-slate-50/g, 'bg-slate-900/60');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed policy page:', file);
});
