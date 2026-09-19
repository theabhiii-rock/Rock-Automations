'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  Menu, 
  X, 
  ArrowRight, 
  User, 
  LogOut,
  MessageCircle,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { currency, toggleCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Results', href: '/work' },
    { label: 'Talent', href: '/talent' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const getDashboardHref = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'PROFESSIONAL') return '/professional/dashboard';
    return '/client/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080B12]/95 backdrop-blur-md border-b border-amber-500/20 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Identity - ROCK AUTOMATIONS */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform bg-black shrink-0">
            <Image
              src="/images/rock-automations-logo.png"
              alt="Rock Automations Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
                ROCK
              </span>
              <span className="font-extrabold text-xl tracking-tight text-white">
                AUTOMATIONS
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400/80 font-semibold uppercase">
              By Abhishek Kumar
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop CTA Actions */}
        <div className="hidden md:flex items-center space-x-2.5">
          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            aria-label="Toggle currency"
            className="px-2.5 py-1.5 rounded-lg border border-amber-500/30 bg-[#0D111A] text-xs font-mono font-bold text-amber-300 hover:border-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20grow%20my%20business%20with%20Rock%20Automations"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-green-500/20 transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black" />
            <span>WhatsApp</span>
          </a>

          {/* User Auth state */}
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                href={getDashboardHref()}
                className="px-3 py-1.5 rounded-lg bg-[#0D111A] border border-amber-500/30 text-xs font-bold text-slate-200 hover:text-amber-400 hover:border-amber-400 flex items-center gap-1.5 transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-3 py-1.5 rounded-lg bg-[#0D111A] hover:bg-amber-500/10 text-amber-400 border border-amber-500/40 hover:border-amber-400 text-xs font-bold transition-all"
              >
                Register
              </Link>
              <Link
                href="/pricing"
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center gap-1 transition-all active:scale-95 shrink-0"
              >
                <span>Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Actions: WhatsApp Icon + Hamburger Toggle */}
        <div className="flex items-center md:hidden space-x-2">
          <a
            href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20grow%20my%20business%20with%20Rock%20Automations"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#25D366] text-black font-bold shadow-md shadow-green-500/20"
            aria-label="WhatsApp Abhishek"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#0D111A] border border-slate-800 text-slate-200 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090E] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3">
          {/* User Status in Mobile */}
          {user ? (
            <div className="p-3 rounded-2xl bg-[#0D111A] border border-amber-500/30 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-white truncate block">{user.email}</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                  Role: {user.role}
                </span>
              </div>
              <button
                onClick={() => { setMobileMenuOpen(false); logout(); }}
                className="px-3 py-1.5 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl bg-[#0D111A] border border-amber-500/30 text-slate-200 font-extrabold text-xs text-center uppercase tracking-wider hover:border-amber-400"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-xs text-center uppercase tracking-wider shadow-md shadow-amber-500/20"
              >
                Create Account
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-bold transition ${
                  pathname === link.href
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <Link
                href={getDashboardHref()}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 flex items-center justify-between"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-3">
            <a
              href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20want%20to%20grow%20my%20business%20with%20Rock%20Automations"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#25D366] text-black font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-green-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={toggleCurrency}
                className="px-3 py-2 rounded-xl border border-amber-500/30 bg-[#0D111A] text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Currency: {currency === 'INR' ? '₹ INR' : '$ USD'}</span>
              </button>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider"
              >
                View Pricing &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
