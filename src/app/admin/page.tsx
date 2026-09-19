"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Settings,
  Users,
  FileCheck,
  DollarSign,
  Activity,
  ExternalLink,
  Save,
  Lock,
  RefreshCw,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { currency, formatPrice } = useCurrency();

  const [activeTab, setActiveTab] = useState<"stats" | "verifications" | "settings" | "audit">("stats");
  const [stats, setStats] = useState<any>(null);
  const [verifications, setVerifications] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    membership_fee_inr: 7000,
    membership_fee_usd: 70,
    platform_fee_percent: 20,
    membership_terms_version: "v1.0",
    escrow_hold_days: 7,
  });
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadAllAdminData = async () => {
    setLoading(true);
    setError("");

    try {
      const [statsRes, verifRes, setRes, logsRes] = await Promise.all([
        fetch("/api/v1/admin/stats").then((r) => r.json()),
        fetch("/api/v1/admin/verifications").then((r) => r.json()),
        fetch("/api/v1/admin/settings").then((r) => r.json()),
        fetch("/api/v1/admin/audit-logs").then((r) => r.json()),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (verifRes.success) setVerifications(verifRes.data || []);
      if (setRes.success) setSettings(setRes.data || {});
      if (logsRes.success) setAuditLogs(logsRes.data || []);
    } catch (err: any) {
      setError("Failed to load administration data. Check database permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const handleVerificationDecision = async (id: string, status: "VERIFIED" | "REJECTED", notes: string) => {
    setActionLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/v1/admin/verifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verificationId: id,
          status,
          reviewNotes: notes || `Admin ${status.toLowerCase()} decision logged.`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to update verification");
      }

      setMessage(`Verification status updated to ${status}.`);
      loadAllAdminData();
    } catch (err: any) {
      setError(err.message || "Failed to process verification.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/v1/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to save settings");
      }

      setMessage("Platform settings updated successfully across all clients and APIs.");
    } catch (err: any) {
      setError(err.message || "Failed to save settings.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Platform Administration & Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Admin Console
          </h1>
          <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-2xl">
            Review identity vetting applications, configure platform take-rates, and inspect immutable audit trails.
          </p>
        </div>

        <button
          onClick={loadAllAdminData}
          disabled={loading}
          className="btn-secondary px-4 py-2.5 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Alerts */}
      {message && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-800 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("stats")}
          className={`pb-3 text-sm font-semibold transition cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "stats"
              ? "border-indigo-600 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Overview & Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab("verifications")}
          className={`pb-3 text-sm font-semibold transition cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "verifications"
              ? "border-indigo-600 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>
            Verification Queue ({verifications.filter((v) => v.status === "PENDING").length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`pb-3 text-sm font-semibold transition cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "settings"
              ? "border-indigo-600 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Platform Fees & Policies</span>
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`pb-3 text-sm font-semibold transition cursor-pointer flex items-center gap-2 border-b-2 whitespace-nowrap ${
            activeTab === "audit"
              ? "border-indigo-600 text-amber-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Audit Logs</span>
        </button>
      </div>

      {/* TAB 1: METRICS & STATS */}
      {activeTab === "stats" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm">
              <span className="text-xs font-semibold uppercase text-slate-400">Total Users</span>
              <div className="text-3xl font-extrabold text-white mt-2">
                {stats?.totalUsers || 8}
              </div>
              <p className="text-xs text-slate-400 mt-1">Verified engineers + clients</p>
            </div>

            <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm">
              <span className="text-xs font-semibold uppercase text-slate-400">Verified Professionals</span>
              <div className="text-3xl font-extrabold text-emerald-600 mt-2">
                {stats?.verifiedPros || 6}
              </div>
              <p className="text-xs text-slate-400 mt-1">Active talent in marketplace</p>
            </div>

            <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm">
              <span className="text-xs font-semibold uppercase text-slate-400">Pending Reviews</span>
              <div className="text-3xl font-extrabold text-amber-600 mt-2">
                {verifications.filter((v) => v.status === "PENDING").length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Awaiting identity review</p>
            </div>

            <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm">
              <span className="text-xs font-semibold uppercase text-slate-400">Platform Take Rate</span>
              <div className="text-3xl font-extrabold text-amber-400 mt-2">
                {settings.platform_fee_percent || 20}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Gross - {settings.platform_fee_percent || 20}% = Net payout rule</p>
            </div>
          </div>

          <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" /> Founder Spotlight Architecture
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              Abhishek Kumar is featured as the Founder & Principal Architect with a distinct verified spotlight on the home and public portfolio routes. Marketplace additions remain segregated in the talent directory.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: VERIFICATION QUEUE */}
      {activeTab === "verifications" && (
        <div className="space-y-4">
          {verifications.length === 0 ? (
            <div className="bg-[#0D111A] p-12 rounded-3xl border border-amber-500/20 text-center shadow-sm">
              <FileCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-base font-bold text-white">No Pending Verifications</p>
              <p className="text-xs text-slate-400 mt-1">
                All professional applications have been reviewed and resolved.
              </p>
            </div>
          ) : (
            verifications.map((v) => (
              <div
                key={v.id}
                className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">
                        {v.professional_name || "Applicant"}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          v.status === "VERIFIED"
                            ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                            : v.status === "REJECTED"
                            ? "bg-rose-950/40 text-rose-300 border border-rose-500/40"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {v.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Submitted: {new Date(v.created_at).toLocaleString()} &bull; ID: {v.id.slice(0, 8)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {v.status === "PENDING" && (
                      <>
                        <button
                          disabled={actionLoading}
                          onClick={() => handleVerificationDecision(v.id, "VERIFIED", "Approved by Admin.")}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Verify
                        </button>
                        <button
                          disabled={actionLoading}
                          onClick={() => handleVerificationDecision(v.id, "REJECTED", "Did not meet technical criteria.")}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-red-100 text-rose-300 border border-rose-500/40 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#07090E] border border-slate-800">
                    <p className="text-slate-400 font-semibold text-[10px] uppercase">LinkedIn Profile</p>
                    {v.linkedin_url ? (
                      <a
                        href={v.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 mt-1 font-semibold truncate"
                      >
                        <span>View LinkedIn</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-slate-400 mt-1 block">None provided</span>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#07090E] border border-slate-800">
                    <p className="text-slate-400 font-semibold text-[10px] uppercase">GitHub / Portfolio</p>
                    {v.portfolio_url ? (
                      <a
                        href={v.portfolio_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 mt-1 font-semibold truncate"
                      >
                        <span>Inspect Repositories</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-slate-400 mt-1 block">None provided</span>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#07090E] border border-slate-800">
                    <p className="text-slate-400 font-semibold text-[10px] uppercase">ID Proof Document</p>
                    {v.id_document_url ? (
                      <a
                        href={v.id_document_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 mt-1 font-semibold truncate"
                      >
                        <span>Inspect Document</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-slate-400 mt-1 block">Uploaded Document</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: DYNAMIC SETTINGS & POLICIES */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="bg-[#0D111A] p-8 rounded-3xl border border-amber-500/20 shadow-sm space-y-6 max-w-3xl">
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-400" /> Platform Financial & Policy Controls
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Changes update immediately across checkout endpoints, fee ledger calculators, and terms acceptance prompts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Annual Membership Fee (INR ₹)
              </label>
              <input
                type="number"
                value={settings.membership_fee_inr || 7000}
                onChange={(e) => setSettings({ ...settings, membership_fee_inr: Number(e.target.value) })}
                className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Annual Membership Fee (USD $)
              </label>
              <input
                type="number"
                value={settings.membership_fee_usd || 70}
                onChange={(e) => setSettings({ ...settings, membership_fee_usd: Number(e.target.value) })}
                className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Platform Success Fee (% of Gross)
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={settings.platform_fee_percent || 20}
                onChange={(e) => setSettings({ ...settings, platform_fee_percent: Number(e.target.value) })}
                className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              />
              <p className="text-xs text-slate-400 mt-1">Rule: Gross - {settings.platform_fee_percent || 20}% = Net Professional Payout</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Membership Agreement Version
              </label>
              <input
                type="text"
                value={settings.membership_terms_version || "v1.0"}
                onChange={(e) => setSettings({ ...settings, membership_terms_version: e.target.value })}
                className="w-full bg-[#07090E] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
              />
              <p className="text-xs text-slate-400 mt-1">Stored in audit logs upon onboarding acceptance</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <p className="font-semibold text-amber-800 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Mandatory Earning Disclosure Enforced
            </p>
            <p className="leading-relaxed">
              Platform onboarding mandates explicit active consent: <em>"Membership fee covers identity verification & portfolio hosting; does not guarantee work or income."</em> This disclosure is permanently locked.
            </p>
          </div>

          <button
            type="submit"
            disabled={actionLoading}
            className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{actionLoading ? "Saving..." : "Save Platform Configuration"}</span>
          </button>
        </form>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === "audit" && (
        <div className="bg-[#0D111A] rounded-3xl border border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-800/80 bg-[#07090E] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" /> Immutable Security & Action Log
            </h3>
            <span className="text-xs text-slate-400 font-medium">Total Events: {auditLogs.length}</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {auditLogs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No audit records found.
              </div>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-[#07090E]/70 transition text-xs flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400 font-semibold">
                        {log.action}
                      </span>
                      <span className="text-slate-400 text-xs">
                        Actor: {log.actor_id || "SYSTEM"}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs truncate">
                      Entity: {log.entity_type} ({log.entity_id})
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-slate-400 text-xs flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

