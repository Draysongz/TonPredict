"use client";

import Link from "next/link";
import { getFirebaseAuth } from "@/lib/firebase";
import { AdminNav } from "../components/AdminNav";
import { signOut } from "firebase/auth";
import { WalletButton } from "@/app/components/WalletButton";

const recentDeployments = [
  { id: "10284", time: "2 mins ago", address: "EQB8...xL92" },
  { id: "10283", time: "14 mins ago", address: "EQC4...vP11" },
  { id: "10282", time: "42 mins ago", address: "EQF1...mK30" },
];

const recentResolutions = [
  { id: "10280", market: "Will TON hit $10 before Jan 2025?", outcome: "Yes", time: "1h ago" },
  { id: "10279", market: "ETH above $4k by EOY?", outcome: "No", time: "3h ago" },
  { id: "10278", market: "Binance listing by Q1?", outcome: "Yes", time: "5h ago" },
];

export default function AdminHistoryPage() {
  async function handleSignOut() {
    const auth = getFirebaseAuth();
    if (auth) {
      await signOut(auth);
      window.location.href = "/admin/login";
    }
  }

  return (
    <div className="bg-background-dark text-white min-h-screen overflow-x-hidden gradient-bg">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex flex-col gap-2 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons-round text-background-dark text-lg">history</span>
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight leading-none">History</h1>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Deployments & resolutions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <WalletButton />
            <button
              type="button"
              onClick={handleSignOut}
              className="w-9 h-9 glass rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
              title="Sign out"
            >
              <span className="material-icons-round text-lg">logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-5 pt-24 pb-32">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Recent Deployments</h2>
          <Link
            href="/admin/factory"
            className="text-[10px] font-bold text-primary hover:underline"
          >
            Full log
          </Link>
        </div>
        <div className="space-y-3 mb-8">
          {recentDeployments.map((entry, i) => (
            <div
              key={entry.id}
              className="glass rounded-2xl p-4 border border-white/5 relative overflow-hidden"
            >
              {i === 0 && (
                <div className="absolute right-0 top-0 h-full w-1 bg-primary/20" />
              )}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">#{entry.id}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span className="text-[10px] text-slate-400 font-medium uppercase">{entry.time}</span>
                </div>
                <span className="material-icons-round text-xs text-primary/40">rocket_launch</span>
              </div>
              <code className="text-[11px] font-mono text-slate-300 block truncate">{entry.address}</code>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">Recent Resolutions</h2>
          <Link
            href="/admin/markets"
            className="text-[10px] font-bold text-primary hover:underline"
          >
            All markets
          </Link>
        </div>
        <div className="space-y-3">
          {recentResolutions.map((entry, i) => (
            <div
              key={entry.id}
              className="glass rounded-2xl p-4 border border-white/5 relative overflow-hidden"
            >
              {i === 0 && (
                <div className="absolute right-0 top-0 h-full w-1 bg-primary/20" />
              )}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] text-slate-400 font-medium uppercase">{entry.time}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary shrink-0">
                  {entry.outcome}
                </span>
              </div>
              <p className="text-sm font-medium text-white leading-tight">{entry.market}</p>
              <Link
                href={`/admin/markets/${entry.id}`}
                className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-primary hover:underline"
              >
                View details
                <span className="material-icons-round text-xs">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <AdminNav activeTab="history" />
    </div>
  );
}
