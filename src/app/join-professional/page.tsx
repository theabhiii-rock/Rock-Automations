"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  FileText,
  User,
  Sparkles,
  Layers,
  FolderGit2,
  Lock,
  DollarSign,
  HelpCircle,
  ExternalLink,
  Check
} from "lucide-react";
import ProfessionalAgreementSection from "@/components/agreements/ProfessionalAgreementSection";
import { SignatureResult } from "@/components/ui/DigitalSignatureBox";

export default function JoinProfessionalPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { currency, formatPrice } = useCurrency();

  // Wizard current step: 1 to 8
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pricing, setPricing] = useState({
    membershipFeeInr: 7000,
    membershipFeeUsd: 70,
    platformFeePct: 20,
    membershipTermsVersion: "v2026.2"
  });

  // Form states
  const [headline, setHeadline] = useState("Senior AI & Automation Engineer");
  const [bio, setBio] = useState("Specializing in autonomous agent orchestration, computer vision video pipelines, and high-throughput backend APIs.");
  const [category, setCategory] = useState("AI & Machine Learning");
  const [hourlyRate, setHourlyRate] = useState(85);
  const [location, setLocation] = useState("Bangalore, India");
  const [languages, setLanguages] = useState("English, Hindi");

  // Skills
  const [skills, setSkills] = useState(["Python", "PyTorch", "FastAPI", "Docker", "LangChain", "Next.js"]);
  const [skillInput, setSkillInput] = useState("");

  // Portfolio Project
  const [projectTitle, setProjectTitle] = useState("Automated Multi-Agent Video Production Suite");
  const [projectDescription, setProjectDescription] = useState("Full pipeline combining Whisper transcription, dynamic kinetic captions, Edge-TTS synthesis, and automated FFmpeg video rendering.");
  const [projectUrl, setProjectUrl] = useState("https://github.com/example/video-pipeline");
  const [projectTechStack, setProjectTechStack] = useState("Python, FFmpeg, Whisper, Redis");

  // Verification Documents
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/sample-profile");
  const [githubUrl, setGithubUrl] = useState("https://github.com/sample-profile");
  const [yearsExperience, setYearsExperience] = useState(5);
  const [idProofType, setIdProofType] = useState("Government ID / Passport / National ID");
  const [documentUrl, setDocumentUrl] = useState("https://storage.platform.com/verifications/id-sample.pdf");

  // Terms, 20% Fee Covenant & Digital Signature State
  const [agreementState, setAgreementState] = useState<{
    agreedToTerms: boolean;
    agreedToEscrow: boolean;
    agreedToAntiCircumvention: boolean;
    isFullySigned: boolean;
    signature: SignatureResult | null;
  }>({
    agreedToTerms: false,
    agreedToEscrow: false,
    agreedToAntiCircumvention: false,
    isFullySigned: false,
    signature: null,
  });

  // Payment
  const [paymentProvider, setPaymentProvider] = useState("sandbox");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/v1/payments/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setPricing({
            membershipFeeInr: data.data.membership?.inr || 7000,
            membershipFeeUsd: data.data.membership?.usd || 70,
            platformFeePct: data.data.platformFeePercent || 20,
            membershipTermsVersion: data.data.membership?.termsVersion || "v2026.2"
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSaveProfileAndProject = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/professionals/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          headline,
          bio,
          category,
          hourlyRate,
          location,
          languages: languages.split(",").map((l) => l.trim()),
          skills,
          portfolioProject: {
            title: projectTitle,
            description: projectDescription,
            category,
            projectUrl,
            techStack: projectTechStack.split(",").map((t) => t.trim())
          },
          verification: {
            linkedinUrl,
            githubUrl,
            yearsExperience,
            idProofType,
            documentUrl
          },
          acceptedTerms: true,
          agreedToTerms: agreementState.agreedToTerms,
          agreedToEscrow: agreementState.agreedToEscrow,
          agreedToAntiCircumvention: agreementState.agreedToAntiCircumvention,
          termsVersion: pricing.membershipTermsVersion,
          acceptedAt: new Date().toISOString(),
          signatureType: agreementState.signature?.type || 'DRAWN',
          signatureData: agreementState.signature?.data || '',
          signerName: agreementState.signature?.signerName || user?.email || 'Talent Signatory'
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || errData.error || "Failed to submit application");
      }

      setCurrentStep(7); // Proceed to Payment
    } catch (err: any) {
      setError(err.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/payments/membership/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: paymentProvider,
          currency: "USD",
          termsVersion: pricing.membershipTermsVersion
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment checkout failed");
      }

      setPaymentSuccess(true);
      setCurrentStep(8); // Submission Complete
    } catch (err: any) {
      setError(err.message || "Payment processing failed.");
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { num: 1, label: "Auth Check" },
    { num: 2, label: "Basic Info" },
    { num: 3, label: "Skills" },
    { num: 4, label: "Portfolio" },
    { num: 5, label: "Verification" },
    { num: 6, label: "Terms & Legal" },
    { num: 7, label: "Membership Fee" },
    { num: 8, label: "Final Status" }
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>8-Stage Professional Vetting Protocol</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Join the <span className="text-amber-400">Verified Network</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed max-w-xl mx-auto">
          Pass multi-tier identity, code repository, and architectural vetting. Receive direct client project commissions and build an audited track record.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="overflow-x-auto pb-4 pt-2">
        <div className="flex items-center justify-between min-w-[640px] px-2">
          {stepsList.map((step) => {
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div key={step.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isDone
                        ? "bg-emerald-600 text-white shadow-sm"
                        : isCurrent
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-4 ring-indigo-50"
                        : "bg-[#0D111A] border border-slate-800 text-slate-400"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                  </div>
                  <span
                    className={`text-xs mt-2 whitespace-nowrap font-medium ${
                      isCurrent ? "text-amber-400 font-bold" : isDone ? "text-slate-300" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {step.num < 8 && (
                  <div
                    className={`h-[2px] flex-1 mx-2 transition-all duration-300 ${
                      currentStep > step.num ? "bg-indigo-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-[#0D111A] p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-sm relative">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="mt-0.5 text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* STEP 1: Auth & Eligibility Check */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" /> Step 1: Authentication & Eligibility
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Verify your session and review platform vetting criteria.
              </p>
            </div>

            {user ? (
              <div className="p-4 rounded-2xl bg-[#07090E] border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">LOGGED IN AS</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{user.email}</p>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">Role: {user.role.toUpperCase()}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    Active Session Valid
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Guest Session Detected
                </h4>
                <p className="text-xs leading-relaxed text-amber-800">
                  You can complete this wizard right now, and an account will be registered automatically upon confirmation, or you can sign in first.
                </p>
                <div className="mt-3 flex gap-3">
                  <Link
                    href="/login?redirect=/join-professional"
                    className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-3.5 py-1.5 rounded-lg bg-[#0D111A] border border-amber-200 text-xs font-medium text-amber-900 hover:bg-amber-100/50 transition"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}

            <div className="p-5 rounded-2xl bg-[#07090E] border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                Marketplace Verification Standard
              </h4>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Demonstrated production experience in AI, software engineering, or automation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Valid identity verification (ID document + verifiable LinkedIn/GitHub profile).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Commitment to transparent escrow-backed milestones & 20% platform service fee.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Profile Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Basic Info */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" /> Step 2: Professional Profile
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                How clients discover and evaluate your technical profile.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Senior AI Systems Engineer | LLM Orchestration"
                  className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Bio / Technical Summary
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your technical mastery, architectural approach, and core capabilities..."
                  className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Primary Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Automation Architecture">Automation Architecture</option>
                    <option value="Full-Stack Web">Full-Stack Web</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Hourly Rate (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full bg-[#07090E] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Location / Timezone
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India (IST / UTC+5:30)"
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Working Languages
                  </label>
                  <input
                    type="text"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="e.g. English, Hindi, German"
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-200 transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Skills</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Skills & Technical Stack */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" /> Step 3: Technical Skills & Stack
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Add frameworks, tools, and platforms you use in production.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Add Skills (Press Enter or Click Add)
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                  placeholder="e.g. Kubernetes, Redis, WebRTC, vLLM"
                  className="flex-1 bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-200 border border-slate-800 text-slate-200 font-semibold text-xs transition cursor-pointer"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[80px] p-4 rounded-2xl bg-[#07090E] border border-slate-800">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-medium text-amber-400"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-amber-400 hover:text-indigo-800 cursor-pointer text-sm font-bold ml-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-200 transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Initial Portfolio Project */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-amber-400" /> Step 4: Add First Portfolio Project
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Showcase a real production system, open-source repo, or architecture you built.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Architecture & Implementation Breakdown
                </label>
                <textarea
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Live URL or GitHub Repository
                </label>
                <input
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Technologies Used (Comma-separated)
                </label>
                <input
                  type="text"
                  value={projectTechStack}
                  onChange={(e) => setProjectTechStack(e.target.value)}
                  className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-200 transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Verification Submission */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" /> Step 5: Verification Credentials
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Provide verifiable links and identification for administrative vetting.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    GitHub or Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/yourname"
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Years of Professional Experience
                  </label>
                  <input
                    type="number"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(Number(e.target.value))}
                    min={1}
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Document / Proof URL
                  </label>
                  <input
                    type="url"
                    value={documentUrl}
                    onChange={(e) => setDocumentUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-200 transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
              >
                <span>Review Terms & Legal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Active Terms Acceptance, 20% Fee Covenant & Digital Signature */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" /> Step 6: 20% Platform Fee Covenant &amp; Digital Signature
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Review platform escrow economics, accept covenants, and apply your legal digital signature ({pricing.membershipTermsVersion}).
              </p>
            </div>

            {/* Comprehensive Agreement Section with 20% Fee Calculator & Digital Signature Box */}
            <ProfessionalAgreementSection
              signerName={user?.email?.split('@')[0] || ''}
              onAgreementStateChange={(state) => setAgreementState(state)}
            />

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                disabled={!agreementState.isFullySigned || loading}
                onClick={handleSaveProfileAndProject}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Securing Legal Application..." : "Confirm Signature & Proceed to Verification"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Professional Membership Payment */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" /> Step 7: Membership Activation Fee
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Dynamic pricing retrieved live from platform settings.
              </p>
            </div>

            {/* Fee Card */}
            <div className="p-6 rounded-2xl bg-amber-500/10/50 border border-amber-500/30 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Annual Verified Membership
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">
                    {currency === 'INR' ? formatPrice(pricing.membershipFeeInr, 'INR') : formatPrice(pricing.membershipFeeUsd, 'USD')}
                    <span className="text-sm font-normal text-slate-400"> / year</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Includes manual identity vetting, portfolio showcase, zero monthly subscription fees, and 24/7 priority support.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D111A] border border-slate-800 text-xs text-slate-300 min-w-[210px] shadow-sm">
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Verification</span>
                    <span className="text-white font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Platform Take</span>
                    <span className="text-emerald-400 font-semibold">{pricing.platformFeePct}% on release</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Guaranteed Work</span>
                    <span className="text-amber-700 font-semibold">None (Disclosed)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Payment Gateway Provider
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentProvider("sandbox")}
                  className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                    paymentProvider === "sandbox"
                      ? "bg-amber-500/10 border-indigo-600 text-amber-400 font-semibold ring-1 ring-indigo-600"
                      : "bg-[#07090E] border-slate-800 text-slate-400 hover:bg-slate-800/80"
                  }`}
                >
                  <p className="text-xs font-bold">Platform Sandbox</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Instant Mock Card</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentProvider("razorpay")}
                  className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                    paymentProvider === "razorpay"
                      ? "bg-amber-500/10 border-indigo-600 text-amber-400 font-semibold ring-1 ring-indigo-600"
                      : "bg-[#07090E] border-slate-800 text-slate-400 hover:bg-slate-800/80"
                  }`}
                >
                  <p className="text-xs font-bold">Razorpay</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">UPI / Cards</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentProvider("stripe")}
                  className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                    paymentProvider === "stripe"
                      ? "bg-amber-500/10 border-indigo-600 text-amber-400 font-semibold ring-1 ring-indigo-600"
                      : "bg-[#07090E] border-slate-800 text-slate-400 hover:bg-slate-800/80"
                  }`}
                >
                  <p className="text-xs font-bold">Stripe</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Visa / Mastercard</p>
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-200 transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handlePaymentCheckout}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Pay {currency === 'INR' ? formatPrice(pricing.membershipFeeInr, 'INR') : formatPrice(pricing.membershipFeeUsd, 'USD')} & Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: Final Submission & Confirmation */}
        {currentStep === 8 && (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-950/40 border-2 border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-extrabold text-white">
              Application & Payment Received!
            </h2>

            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Your professional verification dossier has been submitted.
              Our engineering review board checks code samples and credentials within 24–48 hours.
            </p>

            <div className="p-4 rounded-2xl bg-[#07090E] border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Application Status:</span>
                <span className="text-amber-700 font-semibold">PENDING REVIEW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Terms Accepted:</span>
                <span className="text-emerald-400 font-semibold">{pricing.membershipTermsVersion} (Signed)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Membership Fee:</span>
                <span className="text-white font-semibold">PAID ({paymentProvider.toUpperCase()})</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/professional/dashboard"
                className="btn-primary w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Go to Professional Dashboard
              </Link>
              <Link
                href="/talent"
                className="btn-secondary w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Browse Marketplace Directory
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
