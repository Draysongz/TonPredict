"use client";

import Link from "next/link";
import { getFirebaseAuth } from "../../lib/firebase";
import { AdminNav } from "./components/AdminNav";
import { signOut } from "firebase/auth";
import { WalletButton } from "../components/WalletButton";

export default function AdminDashboardPage() {
  async function handleSignOut() {
    const auth = getFirebaseAuth();
    if (auth) {
      await signOut(auth);
      window.location.href = "/admin/login";
    }
  }

  return (
    <div className="bg-background-dark text-slate-900 min-h-screen overflow-x-hidden gradient-bg">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex flex-col gap-2 bg-background-dark/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons-round text-white text-lg">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight leading-none">Admin Panel</h1>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Factory: EQD4...9zK2</p>
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
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">Platform Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass p-4 rounded-2xl relative">
              <span className="material-icons-round text-primary/40 absolute right-2 bottom-2 text-4xl">layers</span>
              <p className="text-[10px] font-medium text-slate-400 mb-1">Total Markets</p>
              <p className="text-2xl font-bold">1,284</p>
            </div>
            <div className="glass p-4 rounded-2xl relative">
              <span className="material-icons-round text-primary/40 absolute right-2 bottom-2 text-4xl">bolt</span>
              <p className="text-[10px] font-medium text-slate-400 mb-1">Active Markets</p>
              <p className="text-2xl font-bold">42</p>
            </div>
            <div className="glass p-4 rounded-2xl relative">
              <span className="material-icons-round text-primary/40 absolute right-2 bottom-2 text-4xl">task_alt</span>
              <p className="text-[10px] font-medium text-slate-400 mb-1">Resolved Markets</p>
              <p className="text-2xl font-bold">1,242</p>
            </div>
            <div className="glass p-4 rounded-2xl relative">
              <span className="material-icons-round text-primary/40 absolute right-2 bottom-2 text-4xl">account_balance_wallet</span>
              <p className="text-[10px] font-medium text-slate-400 mb-1">Total Volume</p>
              <p className="text-2xl font-bold text-primary">840K <span className="text-xs font-medium">TON</span></p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">Primary Actions</h2>
          <Link
            href="/admin/deploy"
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform"
          >
            <span className="material-icons-round">add_circle</span>
            Create New Market
          </Link>
          <Link
            href="/admin/markets"
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform"
          >
            <span className="material-icons-round">list_alt</span>
            View All Markets
          </Link>
        </div>

        <Link
          href="/admin/factory"
          className="glass rounded-2xl p-5 border-l-4 border-l-primary/40 block hover:border-primary/60 transition-colors"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-icons-round text-primary">settings_suggest</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">Factory Configuration</h3>
              <p className="text-xs text-slate-400">Platform-wide parameters</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-xs text-slate-300">Creation Fee</span>
              <span className="text-xs font-mono font-bold">5 TON</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-xs text-slate-300">Platform Fee</span>
              <span className="text-xs font-mono font-bold">2.5%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-300">Min. Liquidity</span>
              <span className="text-xs font-mono font-bold">50 TON</span>
            </div>
          </div>
          <p className="text-[10px] text-primary/80 font-medium mt-3">View full factory overview →</p>
        </Link>
      </main>

      <AdminNav activeTab="overview" />
    </div>
  );
}
