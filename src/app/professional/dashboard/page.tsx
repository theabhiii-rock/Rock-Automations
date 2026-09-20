'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  ShieldCheck,
  DollarSign,
  Inbox,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Send,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export default function ProfessionalDashboard() {
  const { user } = useAuth();
  const { formatPrice, currency } = useCurrency();

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [calcBudget, setCalcBudget] = useState<number>(50000);
  const [loading, setLoading] = useState(true);

  // Add Project Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: 'Python, FastAPI, Next.js',
    liveUrl: '',
    githubUrl: '',
  });

  const fetchData = async () => {
    try {
      const [enqRes, portRes, projRes] = await Promise.all([
        fetch('/api/v1/enquiries'),
        fetch('/api/v1/portfolio'),
        fetch('/api/v1/projects'),
      ]);
      const [enqData, portData, projData] = await Promise.all([
        enqRes.json(),
        portRes.json(),
        projRes.json(),
      ]);

      if (enqData.success) setEnquiries(enqData.data?.enquiries || []);
      if (portData.success) setPortfolio(portData.data?.projects || []);
      if (projData.success) setProjects(projData.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const completedProjects = projects.filter((p) => p.status === 'COMPLETED');
  const realGrossEarnings = completedProjects.reduce(
    (sum, p) => sum + (p.budget_max || p.budget_min || 0),
    0
  );
  const realNetEarnings = realGrossEarnings * 0.8; // 80% net after 20% platform fee
  const integrityScore = Math.min(
    100,
    50 + (portfolio.length > 0 ? 30 : 0) + (enquiries.length > 0 ? 20 : 0)
  );

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (enquiryId: string, status: string) => {
    try {
      await fetch(`/api/v1/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProject.title,
          description: newProject.description,
          technologies: newProject.technologies.split(',').map((s) => s.trim()),
          liveUrl: newProject.liveUrl,
          githubUrl: newProject.githubUrl,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        setNewProject({ title: '', description: '', technologies: '', liveUrl: '', githubUrl: '' });
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to remove this project?')) return;
    try {
      await fetch(`/api/v1/portfolio/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Engineer Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Professional Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Signed in as <span className="font-semibold text-slate-200">{user?.email || 'Active Professional'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary px-4 py-2 text-sm font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Portfolio Project</span>
          </button>
        </div>
      </div>

      {/* Guest Warning Banner if not logged in */}
      {!user && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-3.5">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-amber-400">Aap Abhi Logged In Nahi Hain (Guest Mode)</div>
              <p className="text-xs text-slate-300 mt-0.5">
                Client enquiries aur leads dekhne ke liye apne registered account (<strong className="text-white">abhishek@platform.com</strong>) se Log In karein.
              </p>
            </div>
          </div>
          <a
            href="/login"
            className="btn-primary px-5 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap shadow-md shadow-amber-500/20"
          >
            Log In Now →
          </a>
        </div>
      )}

      {/* Top Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D111A] p-5 rounded-2xl border border-amber-500/20 shadow-sm space-y-2">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Profile Integrity</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{integrityScore}%</span>
            <span className="text-xs font-semibold text-emerald-400">Verified</span>
          </div>
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${integrityScore}%` }} />
          </div>
        </div>

        <div className="bg-[#0D111A] p-5 rounded-2xl border border-amber-500/20 shadow-sm space-y-2">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Membership Status</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-400">ACTIVE</span>
            <span className="text-xs text-slate-400">Verified Pro</span>
          </div>
          <p className="text-xs text-slate-400">100% Escrow Protection active</p>
        </div>

        <div className="bg-[#0D111A] p-5 rounded-2xl border border-amber-500/20 shadow-sm space-y-2">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Enquiries</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{enquiries.length}</span>
            <span className="text-xs font-semibold text-amber-400">Client Leads</span>
          </div>
          <p className="text-xs text-slate-400">Target response time: &lt; 2 hours</p>
        </div>

        <div className="bg-[#0D111A] p-5 rounded-2xl border border-amber-500/20 shadow-sm space-y-2">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Earnings (Net)</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">
              {formatPrice(realNetEarnings, currency)}
            </span>
            <span className="text-xs font-semibold text-emerald-400">
              {completedProjects.length > 0 ? `${completedProjects.length} Settled` : 'Real Balance'}
            </span>
          </div>
          <p className="text-xs text-slate-400">80% net settled after milestone signoff</p>
        </div>
      </div>

      {/* 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Platform Fee & Payout Ledger (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <span className="text-white font-bold text-sm uppercase flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                20% Platform Fee Transparency
              </span>
              <span className="text-xs font-semibold text-amber-400">OFFICIAL POLICY</span>
            </div>

            {/* Fee Breakdown Calculator */}
            <div className="p-4 rounded-xl bg-[#07090E] border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">Simulate Project Budget:</span>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={calcBudget}
                  onChange={(e) => setCalcBudget(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-32 px-2.5 py-1 bg-[#0D111A] border border-slate-700 rounded-lg text-white text-right text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="h-[1px] bg-slate-800 my-1" />
              <div className="flex justify-between items-center text-slate-300">
                <span>Project Value (Gross):</span>
                <span className="font-semibold text-white">{formatPrice(calcBudget, currency)}</span>
              </div>
              <div className="flex justify-between items-center text-amber-500 font-medium">
                <span>Platform Success Fee (20%):</span>
                <span className="font-bold">-{formatPrice(calcBudget * 0.2, currency)}</span>
              </div>
              <div className="h-[1px] bg-slate-800 my-1" />
              <div className="flex justify-between items-center text-amber-400 text-sm font-bold">
                <span>Your Net Payout (80%):</span>
                <span>{formatPrice(calcBudget * 0.8, currency)}</span>
              </div>
              <div className="pt-1 text-[11px] text-slate-400">
                Settled automatically post-completion signoff. Zero upfront fee, zero hidden deductions.
              </div>
            </div>

            {/* Real Settlement Records */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase font-semibold text-slate-400 block">Settlement History</span>
              {completedProjects.length === 0 ? (
                <div className="p-6 rounded-xl bg-[#07090E] border border-slate-800/80 text-center py-6 space-y-1.5">
                  <Clock className="w-5 h-5 text-slate-500 mx-auto" />
                  <p className="text-xs font-semibold text-slate-300">No Settlement Records Yet</p>
                  <p className="text-[11px] text-slate-500">
                    Completed client milestones and approved escrow releases will automatically generate payout settlement entries here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  {completedProjects.map((p) => {
                    const gross = p.budget_max || p.budget_min || 0;
                    const fee = gross * 0.2;
                    const net = gross * 0.8;
                    return (
                      <div key={p.id} className="p-3.5 rounded-xl bg-[#07090E] border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-white font-semibold">{p.title}</div>
                          <div className="text-xs text-slate-400">Gross: {formatPrice(gross, currency)} | Fee (20%): -{formatPrice(fee, currency)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-400 font-bold">{formatPrice(net, currency)}</div>
                          <div className="text-[10px] font-semibold text-emerald-400">SETTLED</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Projects Manager */}
          <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <span className="text-white font-bold text-sm uppercase">Portfolio Projects</span>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            <div className="space-y-3">
              {portfolio.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No portfolio projects yet. Click Add Project to showcase your work.</p>
              ) : (
                portfolio.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded-xl bg-[#07090E] border border-slate-800 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <h4 className="font-semibold text-white text-sm">{proj.title}</h4>
                      <p className="text-xs text-amber-400">{proj.category_name || 'Engineering'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Client Enquiries Stream (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0D111A] p-6 rounded-2xl border border-amber-500/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <span className="text-white font-bold text-sm uppercase flex items-center gap-1.5">
                <Inbox className="w-4 h-4 text-amber-400" />
                Client Enquiries Inbox ({enquiries.length})
              </span>
              <span className="text-xs text-slate-400">DIRECT CLIENT LEADS</span>
            </div>

            <div className="space-y-4">
              {enquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">No new client enquiries received yet.</p>
              ) : (
                enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-[#07090E] border border-slate-800 space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-semibold text-amber-400 uppercase">{enq.status}</span>
                        <h4 className="font-bold text-white text-sm mt-1.5">{enq.project_title}</h4>
                        <p className="text-xs text-slate-400">{enq.client_name} ({enq.client_email})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-white block">
                          {formatPrice(enq.budget, enq.currency)}
                        </span>
                        <span className="text-xs text-slate-400">{enq.timeline}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-[#0D111A] p-3 rounded-xl border border-amber-500/20">
                      "{enq.message}"
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      {enq.status === 'NEW' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(enq.id, 'RESPONDED')}
                            className="btn-primary px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer"
                          >
                            Accept & Respond
                          </button>
                          <button
                            onClick={() => handleStatusChange(enq.id, 'DECLINED')}
                            className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-800 text-slate-300 hover:bg-slate-200 text-xs font-medium cursor-pointer"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {enq.status !== 'NEW' && (
                        <span className="text-xs text-slate-400">
                          Status: <span className="text-amber-400 font-semibold">{enq.status}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl max-w-lg w-full space-y-4 text-xs">
            <h3 className="text-base font-bold text-white uppercase">Add New Portfolio Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Multi-Agent Research Swarm"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white text-xs focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe architecture, features, and results..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white text-xs focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="Python, FastAPI, Docker, LangGraph"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white text-xs focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Live Demo URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-800 text-white text-xs focus:bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-200 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

