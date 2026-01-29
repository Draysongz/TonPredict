"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminNav } from "../components/AdminNav";

export default function ManageMarketsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"active" | "resolved">("active");

  return (
    <div className="bg-background-dark text-white min-h-screen overflow-x-hidden gradient-bg">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center"
          >
            <span className="material-icons-round text-white">arrow_back_ios_new</span>
          </button>
          <div>
            <h1 className="font-bold text-base leading-tight">Manage Markets</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Factory Admin</p>
          </div>
        </div>
      </header>

      <main className="p-5 pt-24 pb-36">
        <div className="bg-white/5 p-1 rounded-2xl mb-8 flex items-center">
          <button
            type="button"
            onClick={() => setFilter("active")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              filter === "active"
                ? "bg-primary text-background-dark shadow-lg shadow-primary/20"
                : "text-slate-400"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setFilter("resolved")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              filter === "resolved"
                ? "bg-primary text-background-dark shadow-lg shadow-primary/20"
                : "text-slate-400"
            }`}
          >
            Resolved
          </button>
        </div>

        <div className="space-y-4">
          {/* Active market 1 */}
          {filter === "active" && (
          <div className="glass p-5 rounded-[24px] border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-primary/60 mb-1 block">ID: #TON-842-X</span>
                <h3 className="font-semibold text-base">Will TON hit $10 before Jan 2025?</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">
                ACTIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Resolution In</p>
                <div className="flex items-center gap-1.5">
                  <span className="material-icons-round text-sm text-primary">timer</span>
                  <span className="text-sm font-bold font-mono">14d : 22h : 10m</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Total Volume</p>
                <div className="flex items-center gap-1.5">
                  <span className="material-icons-round text-sm text-primary">account_balance_wallet</span>
                  <span className="text-sm font-bold">128,402 TON</span>
                </div>
              </div>
            </div>
            <Link
              href="/admin/markets/842"
              className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-sm transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              View Details
              <span className="material-icons-round text-sm">arrow_forward</span>
            </Link>
          </div>
          )}

          {/* Active market 2 */}
          {filter === "active" && (
          <div className="glass p-5 rounded-[24px] border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-primary/60 mb-1 block">ID: #ETH-391-B</span>
                <h3 className="font-semibold text-base">ETH/BTC Ratio &gt; 0.05 (Monthly)</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">
                ACTIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Resolution In</p>
                <div className="flex items-center gap-1.5">
                  <span className="material-icons-round text-sm text-primary">timer</span>
                  <span className="text-sm font-bold font-mono">03d : 08h : 45m</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Total Volume</p>
                <div className="flex items-center gap-1.5">
                  <span className="material-icons-round text-sm text-primary">account_balance_wallet</span>
                  <span className="text-sm font-bold">45,190 TON</span>
                </div>
              </div>
            </div>
            <Link
              href="/admin/markets/391"
              className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-sm transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              View Details
              <span className="material-icons-round text-sm">arrow_forward</span>
            </Link>
          </div>
          )}

          {/* Resolved market */}
          {filter === "resolved" && (
          <div className="glass opacity-70 p-5 rounded-[24px] border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-500 mb-1 block">ID: #BTC-112-S</span>
                <h3 className="font-semibold text-base text-slate-300">Bitcoin Price &gt; $65,000 Friday</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-500/20 text-slate-400 border border-slate-500/30">
                RESOLVED
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 uppercase font-medium">Status</p>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="material-icons-round text-sm">check_circle</span>
                  <span className="text-sm font-bold">Finalized</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 uppercase font-medium">Final Volume</p>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="material-icons-round text-sm">account_balance_wallet</span>
                  <span className="text-sm font-bold">92,400 TON</span>
                </div>
              </div>
            </div>
            <Link
              href="/admin/markets/112/claims"
              className="w-full bg-white/5 text-slate-400 py-3 rounded-xl font-bold text-sm border border-white/5 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            >
              View History
            </Link>
          </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
        <Link
          href="/admin/deploy"
          className="bg-primary text-background-dark py-3 px-6 rounded-full font-bold text-sm shadow-xl shadow-primary/20 flex items-center gap-2 whitespace-nowrap active:scale-95 transition-transform"
        >
          <span className="material-icons-round">add</span>
          Deploy New Market
        </Link>
      </div>

      <AdminNav activeTab="markets" />
    </div>
  );
}
