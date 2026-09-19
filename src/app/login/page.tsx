"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  UserCheck, 
  Briefcase, 
  ShieldAlert,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDemoBox, setShowDemoBox] = useState(false);

  const redirectUrl = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        throw new Error(result.error || "Login failed");
      }

      setSuccess("Authentication successful! Redirecting...");

      const loggedUser = result.user;
      setTimeout(() => {
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (loggedUser?.role === 'ADMIN') {
          router.push('/admin');
        } else if (loggedUser?.role === 'PROFESSIONAL') {
          router.push('/professional/dashboard');
        } else {
          router.push('/client/dashboard');
        }
      }, 700);
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please verify your credentials.");
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError("");
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Rock Automations Portal</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Sign In to Your Account
        </h1>
        <p className="text-sm text-slate-300 mt-2">
          Access your business dashboard, manage automated campaigns, and review results.
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-[#0D111A] p-7 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
        {error && (
          <div className="mb-5 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
            <div>
              <p className="font-bold">Authentication Failed</p>
              <p className="mt-0.5 text-rose-300">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-5 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <p className="font-bold text-emerald-300">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              Email Address <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@business.com"
                className="w-full bg-[#07090E] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                Password <span className="text-amber-400">*</span>
              </label>
              <a
                href="https://wa.me/916209817520?text=Hi%20Abhishek,%20I%20need%20help%20resetting%20my%20password"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:underline"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#07090E] border border-slate-800 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Accounts Toggle (Optional Helper) */}
        <div className="mt-5 pt-5 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setShowDemoBox(!showDemoBox)}
            className="w-full text-center text-xs font-semibold text-slate-400 hover:text-amber-400 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{showDemoBox ? "Hide Test Accounts" : "Click to view 1-Click Demo Accounts"}</span>
          </button>

          {showDemoBox && (
            <div className="mt-3 p-3 rounded-xl bg-black/40 border border-slate-800 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Click any profile to test instant login:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill("admin@platform.com", "AdminSecure123!")}
                  className="px-2 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-200 hover:text-amber-400 flex flex-col items-center gap-1 cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-bold">Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill("client1@techventures.io", "ClientSecure123!")}
                  className="px-2 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-200 hover:text-amber-400 flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-bold">Client</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill("john@example.com", "ProfessionalSecure123!")}
                  className="px-2 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-200 hover:text-amber-400 flex flex-col items-center gap-1 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-bold">Engineer</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-300">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="text-amber-400 font-bold hover:text-amber-300 transition underline underline-offset-2"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#07090E] py-16 flex items-center justify-center px-4 sm:px-6 relative">
      <Suspense fallback={<div className="text-amber-400 font-mono text-sm">Loading login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
