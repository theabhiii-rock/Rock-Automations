"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Check,
  Lock,
  Loader2
} from "lucide-react";

export default function StartProjectPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { currency, formatPrice } = useCurrency();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AI & Automation");
  const [description, setDescription] = useState("");
  const [budgetType, setBudgetType] = useState<"fixed" | "hourly">("fixed");
  const [budgetMin, setBudgetMin] = useState<number>(5000);
  const [budgetMax, setBudgetMax] = useState<number>(20000);
  const [timeline, setTimeline] = useState("2-4 weeks");
  const [skills, setSkills] = useState(["WhatsApp API", "Python", "Automation", "Next.js"]);
  const [skillInput, setSkillInput] = useState("");

  const [clientEmail, setClientEmail] = useState("");
  const [clientName, setClientName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Please provide a project title and detailed description.");
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        title,
        category,
        description,
        budgetType: budgetType.toUpperCase(),
        budgetMin: Number(budgetMin),
        budgetMax: Number(budgetMax),
        currency: currency || "INR",
        timeline,
        skills,
      };

      if (!user) {
        if (!clientEmail.trim() || !clientName.trim()) {
          throw new Error("Please provide your contact name and email so engineers can respond.");
        }
        payload.clientEmail = clientEmail;
        payload.clientName = clientName;
      }

      const res = await fetch("/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create project listing.");
      }

      setCreatedProjectId(data.project?.id || data.id);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Escrow Protected &bull; Verified Engineers &bull; Rock Automations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">New Project</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
            Post your project scope and match directly with vetted AI engineers and technical specialists.
          </p>
        </div>

        {success ? (
          <div className="bg-[#0D111A] p-8 sm:p-14 rounded-3xl border border-emerald-500/40 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Project Published Successfully!</h2>
            <p className="text-base text-slate-400 max-w-md mx-auto leading-relaxed">
              Your project <span className="font-semibold text-amber-400">"{title}"</span> is now active. Qualified engineers will review your scope and propose milestones.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/client/dashboard"
                className="px-6 py-3 text-xs font-black uppercase tracking-wider rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg hover:from-amber-400 hover:to-yellow-400 transition"
              >
                Go to Client Dashboard
              </Link>
              <Link
                href="/talent"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition"
              >
                Browse Verified Talent
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-[#0D111A] p-8 sm:p-12 rounded-3xl border border-amber-500/20 shadow-xl space-y-8">
            {error && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-400" />
                <div>
                  <p className="font-semibold">Unable to submit project</p>
                  <p className="mt-0.5 text-rose-300">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Title & Category */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Automated Salon Lead Extraction & WhatsApp Follow-up System"
                    className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Domain Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                    >
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="WhatsApp & Outreach Engines">WhatsApp & Outreach Engines</option>
                      <option value="High-Converting Web & Landing Pages">High-Converting Web & Landing Pages</option>
                      <option value="Lead Extraction & Scraping">Lead Extraction & Scraping</option>
                      <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Estimated Delivery Timeline
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        placeholder="e.g. 2-4 weeks"
                        className="w-full bg-[#07090E] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Deliverables */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Project Scope & Deliverables
                </label>
                <textarea
                  rows={5}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the technical specifications, business goals, automation logic, target customer profile, and expected deliverables..."
                  className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition leading-relaxed"
                />
              </div>

              {/* Budget Parameters */}
              <div className="p-5 rounded-2xl bg-[#07090E] border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Budget Model ({currency})
                  </span>
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setBudgetType("fixed")}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-bold ${
                        budgetType === "fixed"
                          ? "bg-amber-400 text-black shadow-sm"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      Fixed Milestone
                    </button>
                    <button
                      type="button"
                      onClick={() => setBudgetType("hourly")}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-bold ${
                        budgetType === "hourly"
                          ? "bg-amber-400 text-black shadow-sm"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      Hourly Engagement
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Min Estimated Budget ({currency})
                    </label>
                    <input
                      type="number"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(Number(e.target.value))}
                      className="w-full bg-[#0D111A] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Max Target Budget ({currency})
                    </label>
                    <input
                      type="number"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(Number(e.target.value))}
                      className="w-full bg-[#0D111A] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Required Technologies & Skills
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                    placeholder="e.g. WhatsApp Cloud API, Next.js, Python, PostgreSQL"
                    className="flex-1 bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold transition cursor-pointer"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-medium text-amber-400"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-amber-500/60 hover:text-amber-300 cursor-pointer text-sm font-bold ml-1"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Guest Client Details if not authenticated */}
              {!user && (
                <div className="p-5 rounded-2xl bg-[#07090E] border border-slate-800 space-y-4">
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Client Contact Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Your Name / Business</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Apex Salon / Dr. Sharma"
                        className="w-full bg-[#0D111A] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Contact Email / Phone</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="contact@business.com"
                        className="w-full bg-[#0D111A] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Platform Guarantee */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-3">
                <Lock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="text-amber-400 font-bold">100% Escrow Protection:</span> Funds are securely held in milestone escrow and released only after your formal approval of deliverables and test passes.
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-xs font-black uppercase tracking-wider rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition active:scale-98"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                ) : (
                  <>
                    <span>Publish Project & Match Engineers</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
