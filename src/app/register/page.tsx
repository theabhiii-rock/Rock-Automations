"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Briefcase, 
  UserCheck, 
  Check, 
  Lock, 
  Mail, 
  User,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  Scale,
  Percent
} from "lucide-react";
import DigitalSignatureBox from "@/components/ui/DigitalSignatureBox";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [role, setRole] = useState<"client" | "professional">("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Professional agreement & digital signature states
  const [agreedToFee, setAgreedToFee] = useState(false);
  const [agreedToAntiBypass, setAgreedToAntiBypass] = useState(false);
  const [signatureData, setSignatureData] = useState<{
    type: 'DRAWN' | 'TYPED';
    data: string;
    isSigned: boolean;
  }>({
    type: 'DRAWN',
    data: '',
    isSigned: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (role === "professional") {
      if (!agreedToFee || !agreedToAntiBypass) {
        setError("You must accept both the 20% Platform Fee and Anti-Circumvention covenants.");
        return;
      }
      if (!signatureData.isSigned || !signatureData.data) {
        setError("Please provide your authorized digital signature before creating your talent account.");
        return;
      }
    }

    setLoading(true);

    try {
      const result = await register(
        name,
        email,
        password,
        role === "professional" ? "PROFESSIONAL" : "CLIENT",
        role === "professional"
          ? {
              agreedToTerms: agreedToFee,
              agreedToEscrow: agreedToFee,
              agreedToAntiCircumvention: agreedToAntiBypass,
              signatureType: signatureData.type,
              signatureData: signatureData.data,
            }
          : undefined
      );

      if (!result.success) {
        throw new Error(result.error || "Registration failed");
      }

      setSuccess("Account created successfully! Logging you in...");

      setTimeout(() => {
        if (role === "professional") {
          router.push("/professional/dashboard");
        } else {
          router.push("/client/dashboard");
        }
      }, 800);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] py-16 flex items-center justify-center px-4 sm:px-6 relative">
      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Rock Automations Account</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Hire automation talent, deploy outreach campaigns, or join as a verified developer.
          </p>
        </div>

        {/* Account Type Selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole("client")}
            className={`p-4 rounded-2xl border text-left transition relative cursor-pointer ${
              role === "client"
                ? "bg-[#0D111A] border-amber-500 shadow-md shadow-amber-500/20 ring-1 ring-amber-500"
                : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Briefcase className={`w-5 h-5 ${role === "client" ? "text-amber-400" : "text-slate-400"}`} />
              {role === "client" && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
            </div>
            <h3 className="font-bold text-sm text-white">Business Owner / Client</h3>
            <p className="text-xs text-slate-300 mt-1">Get leads, WhatsApp bots &amp; web funnels</p>
          </button>

          <button
            type="button"
            onClick={() => setRole("professional")}
            className={`p-4 rounded-2xl border text-left transition relative cursor-pointer ${
              role === "professional"
                ? "bg-[#0D111A] border-amber-500 shadow-md shadow-amber-500/20 ring-1 ring-amber-500"
                : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <UserCheck className={`w-5 h-5 ${role === "professional" ? "text-amber-400" : "text-slate-400"}`} />
              {role === "professional" && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
            </div>
            <h3 className="font-bold text-sm text-white">Join as Talent</h3>
            <p className="text-xs text-slate-300 mt-1">Accept projects &amp; build client pipelines</p>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-[#0D111A] p-7 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
              <div>
                <p className="font-bold">Registration Issue</p>
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
                Full Name / Business Name <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === "client" ? "Amit Sharma (Sharma Salon)" : "Rahul Verma"}
                  className="w-full bg-[#07090E] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Password <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 chars"
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Confirm Password <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Talent Platform Covenant & 20% Fee Agreement */}
            {role === "professional" && (
              <div className="space-y-4 pt-2 pb-1 border-t border-slate-800">
                <div className="p-4 rounded-2xl bg-[#07090E] border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-mono border border-amber-500/30">
                      <Scale className="w-3 h-3" /> TALENT COVENANT &amp; ESCROW TERMS
                    </span>
                    <span className="text-amber-400 font-bold text-xs">20% PLATFORM FEE</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    By joining as talent, you agree that Rock Automations retains a <strong>20% platform commission</strong> from gross milestone amounts upon client completion approval. Client funds are 100% pre-funded into Escrow before work begins.
                  </p>

                  {/* 2 Checkboxes */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToFee}
                        onChange={(e) => setAgreedToFee(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
                      />
                      <span className="text-xs text-slate-300 leading-snug">
                        I accept the <strong>20% platform fee</strong> on released milestones &amp; 100% upfront escrow rules.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToAntiBypass}
                        onChange={(e) => setAgreedToAntiBypass(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
                      />
                      <span className="text-xs text-slate-300 leading-snug">
                        I agree to the strict <strong>24-Month Anti-Circumvention policy</strong> (no direct off-platform deals).
                      </span>
                    </label>
                  </div>
                </div>

                {/* Digital Signature Pad */}
                <DigitalSignatureBox
                  signerName={name}
                  onSignatureChange={(sig) => setSignatureData(sig)}
                  title="Talent Digital Signature (Required)"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (role === "professional" && (!agreedToFee || !agreedToAntiBypass || !signatureData.isSigned))}
              className="w-full mt-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Creating Your Account...</span>
                </>
              ) : (
                <>
                  <span>
                    {role === "professional"
                      ? "Digitally Sign & Register as Talent"
                      : "Complete Free Registration"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-amber-400 font-bold hover:text-amber-300 transition underline underline-offset-2"
              >
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
