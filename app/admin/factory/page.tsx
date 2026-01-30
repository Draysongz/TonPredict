"use client";

import { AdminHeader } from "../components/AdminHeader";

const deploymentLog = [
  { id: "10284", time: "2 mins ago", address: "EQB8...xL92" },
  { id: "10283", time: "14 mins ago", address: "EQC4...vP11" },
  { id: "10282", time: "42 mins ago", address: "EQF1...mK30" },
  { id: "10281", time: "1h ago", address: "EQH9...rX44" },
];

export default function FactoryOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader 
        title="Factory Overview" 
        subtitle="Factory contract configuration and deployment log"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Global State */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Global State</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700">Factory Contract</span>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <code className="text-sm font-mono text-slate-700">EQA7...9Zk2</code>
                <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors">
                  <span className="material-icons-round text-lg">content_copy</span>
                </button>
              </div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Admin Wallet</span>
                <span className="material-icons-round text-xs text-slate-500">verified_user</span>
              </div>
              <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-white/5">
                <code className="text-xs font-mono text-slate-600">EQD3...rT5p</code>
                <button type="button" className="text-primary hover:opacity-80">
                  <span className="material-icons-round text-sm">content_copy</span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700">Admin Wallet</span>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <code className="text-sm font-mono text-slate-700">UQCX...mN90</code>
                <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors">
                  <span className="material-icons-round text-lg">content_copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Markets</span>
            <div className="text-3xl font-bold text-slate-900 mt-2">1,284</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Creation Fee</span>
            <div className="text-3xl font-bold text-slate-900 mt-2">5 <span className="text-lg">TON</span></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Platform Fee</span>
            <div className="text-3xl font-bold text-slate-900 mt-2">2.5<span className="text-lg">%</span></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</span>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xl font-bold text-slate-900">Synced</span>
            </div>
          </div>
        </div>

        {/* Deployment Log */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Market Deployment Log</h2>
            <span className="text-xs text-slate-500">Showing last 20</span>
          </div>
          <div className="space-y-3">
            {deploymentLog.map((entry, i) => (
              <div
                key={entry.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all relative"
              >
                {i === 0 && (
                  <div className="absolute right-0 top-0 h-full w-2 bg-linear-to-b from-blue-500 to-cyan-500 rounded-r-xl" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-blue-500">#{entry.id}</span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <span className="text-xs text-slate-500 font-medium">{entry.time}</span>
                    {i === 0 && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">NEW</span>
                    )}
                  </div>
                  <span className="material-icons-round text-lg text-blue-500/40">rocket_launch</span>
                </div>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <code className="text-sm font-mono text-slate-700">{entry.address}</code>
                  <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors">
                    <span className="material-icons-round text-base">content_copy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
