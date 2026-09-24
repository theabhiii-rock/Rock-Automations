"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  FolderGit2,
  Send,
  Building2,
  ShieldCheck,
  Zap,
  User
} from "lucide-react";

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const { currency, formatPrice } = useCurrency();

  const [projects, setProjects] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"projects" | "enquiries">("projects");

  useEffect(() => {
    Promise.all([
      fetch("/api/v1/projects").then((r) => r.json()),
      fetch("/api/v1/enquiries").then((r) => r.json()).catch(() => ({ success: false, data: [] }))
    ])
      .then(([projRes, enqRes]) => {
        if (projRes.success && projRes.data) {
          setProjects(projRes.data);
        }
        if (enqRes.success && enqRes.data) {
          setEnquiries(enqRes.data.enquiries || enqRes.data || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Client Workspace &bull; Escrow Monitored</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Client Project Dashboard
          </h1>
          <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-2xl">
            Supervise your active project specifications, invite verified talent, and manage milestone deliverables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/start-project"
            className="px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20 inline-flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" /> Start New Project
          </Link>
          <Link
            href="/talent"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#0D111A] border border-slate-700 text-slate-300 hover:text-white transition"
          >
            Browse Verified Talent
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Projects</span>
            <FolderGit2 className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{projects.length}</div>
          <div className="text-xs text-slate-500 mt-1">Active project listings</div>
        </div>

        <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Direct Enquiries</span>
            <Send className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{enquiries.length}</div>
          <div className="text-xs text-slate-500 mt-1">Engineer inquiries submitted</div>
        </div>

        <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Escrow Protection</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">100% Protected</div>
          <div className="text-xs text-slate-500 mt-1">Milestone-gated releases</div>
        </div>

        <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Currency</span>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{currency}</div>
          <div className="text-xs text-slate-500 mt-1">Real-time exchange conversion</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-800">
        <button
          onClick={() => setActiveTab("projects")}
          className={`pb-3 text-sm font-bold transition cursor-pointer flex items-center gap-2 border-b-2 ${
            activeTab === "projects"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>My Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("enquiries")}
          className={`pb-3 text-sm font-bold transition cursor-pointer flex items-center gap-2 border-b-2 ${
            activeTab === "enquiries"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Direct Enquiries ({enquiries.length})</span>
        </button>
      </div>

      {/* Tab Contents */}
      {loading ? (
        <div className="text-center py-20 bg-[#0D111A] rounded-3xl border border-slate-800 shadow-sm">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400">Loading projects...</p>
        </div>
      ) : activeTab === "projects" ? (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="bg-[#0D111A] p-12 sm:p-16 rounded-3xl border border-slate-800 text-center space-y-4 shadow-sm">
              <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Projects Published Yet</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Post your first engineering initiative to receive proposals from vetted specialists.
              </p>
              <div className="pt-2">
                <Link
                  href="/start-project"
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black inline-flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Start a Project
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#0D111A] p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-amber-500/40 hover:shadow-lg transition group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
                        {p.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition mt-1.5">{p.title}</h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-lg font-bold text-white font-mono">
                        {p.budget_min && p.budget_max
                          ? `${formatPrice(p.budget_min, p.currency || 'INR')} - ${formatPrice(p.budget_max, p.currency || 'INR')}`
                          : formatPrice(p.budget_min || p.budget_max || 5000, p.currency || 'INR')}
                      </div>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 sm:justify-end">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        {p.status || "OPEN"}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-4 text-slate-400 text-xs">
                      <span>⏱ Timeline: {p.timeline || "Flexible"}</span>
                      <span>📅 Created: {new Date(p.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/talent?category=${encodeURIComponent(p.category)}`}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 text-xs font-medium transition"
                      >
                        Invite Matching Talent &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.length === 0 ? (
            <div className="bg-[#0D111A] p-12 sm:p-16 rounded-3xl border border-slate-800 text-center space-y-4 shadow-sm">
              <Send className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Direct Inquiries Yet</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Explore the verified directory to contact engineers directly for consultations.
              </p>
              <div className="pt-2">
                <Link
                  href="/talent"
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black inline-flex items-center gap-2 shadow-lg"
                >
                  Browse Verified Talent
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-[#0D111A] p-6 rounded-2xl border border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-mono">ENQUIRY #{enq.id.slice(0, 8)}</p>
                      <h4 className="text-base font-bold text-white mt-0.5">{enq.project_title || enq.subject || "Project Scope Discussion"}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase">
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 bg-[#07090E] p-4 rounded-xl border border-slate-800 leading-relaxed">
                    {enq.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
