"use client";

import { AdminNav } from "../components/AdminNav";

const deploymentLog = [
  { id: "10284", time: "2 mins ago", address: "EQB8...xL92" },
  { id: "10283", time: "14 mins ago", address: "EQC4...vP11" },
  { id: "10282", time: "42 mins ago", address: "EQF1...mK30" },
  { id: "10281", time: "1h ago", address: "EQH9...rX44" },
];

export default function FactoryOverviewPage() {
  return (
    <div className="bg-background-dark text-slate-900 min-h-screen overflow-x-hidden gradient-bg selection:bg-primary selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50 px-5 py-4 flex items-center justify-between bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/10">
            <span className="material-icons-round text-white text-xl">precision_manufacturing</span>
          </div>
          <div>
            <h1 className="ton-heading text-lg tracking-tight">Factory Overview</h1>
            <p className="text-[10px] uppercase tracking-widest text-primary/70 font-bold">Admin Console</p>
          </div>
        </div>
        <button
          type="button"
          className="w-10 h-10 glass rounded-full flex items-center justify-center"
        >
          <span className="material-icons-round text-primary/80">settings</span>
        </button>
      </header>

      <main className="px-5 pt-24 pb-36 space-y-8">
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary/80 px-1">Global State</h2>
          <div className="space-y-3">
            <div className="glass rounded-2xl p-4 border-l-4 border-l-primary">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Factory Contract</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-white/5">
                <code className="text-xs font-mono text-slate-600">EQA7...9Zk2</code>
                <button type="button" className="text-primary hover:opacity-80">
                  <span className="material-icons-round text-sm">content_copy</span>
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
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total Markets</span>
            <div className="text-2xl font-bold text-primary mt-1">1,284</div>
          </div>
          <div className="glass rounded-2xl p-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Status</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-lg font-bold">Synced</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary/80">Market Deployment Log</h2>
            <span className="text-[10px] text-slate-400">Showing last 20</span>
          </div>
          <div className="space-y-3">
            {deploymentLog.map((entry, i) => (
              <div
                key={entry.id}
                className={`glass rounded-2xl p-4 border border-white/5 relative overflow-hidden ${
                  i === 0 ? "" : ""
                }`}
              >
                {i === 0 && (
                  <div className="absolute right-0 top-0 h-full w-1 bg-primary/20" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">#{entry.id}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-[10px] text-slate-400 font-medium uppercase">{entry.time}</span>
                  </div>
                  <span className="material-icons-round text-xs text-primary/40">rocket_launch</span>
                </div>
                <div className="flex items-center justify-between bg-slate-100 p-2.5 rounded-lg border border-white/5">
                  <code className="text-[11px] font-mono text-slate-600">{entry.address}</code>
                  <button type="button" className="text-primary hover:opacity-80">
                    <span className="material-icons-round text-xs">content_copy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <AdminNav activeTab="overview" />
    </div>
  );
}
