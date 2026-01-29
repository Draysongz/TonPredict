"use client";

import Link from "next/link";
import { getFirebaseAuth } from "@/lib/firebase";
import { AdminNav } from "../components/AdminNav";
import { signOut } from "firebase/auth";
import { WalletButton } from "@/app/components/WalletButton";

export default function AdminSettingsPage() {
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
              <span className="material-icons-round text-background-dark text-lg">settings</span>
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight leading-none">Settings</h1>
              <p className="text-[10px] text-slate-400 font-mono mt-1">Admin Console</p>
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
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">Contract & System</h2>
        <div className="space-y-3">
          <Link
            href="/admin/factory"
            className="glass rounded-2xl p-4 flex items-center gap-4 border border-white/5 hover:border-primary/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <span className="material-icons-round text-primary text-2xl">precision_manufacturing</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white">Factory Contract Overview</p>
              <p className="text-xs text-slate-400 mt-0.5">View contract state, admin wallet & deployment log</p>
            </div>
            <span className="material-icons-round text-slate-500 group-hover:text-primary transition-colors">chevron_right</span>
          </Link>
        </div>

        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mt-8 mb-4">Account</h2>
        <div className="space-y-3">
          <div className="glass rounded-2xl p-4 flex items-center gap-4 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
              <span className="material-icons-round text-slate-400 text-2xl">person</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white">Admin account</p>
              <p className="text-xs text-slate-400 mt-0.5">Signed in via Firebase</p>
            </div>
          </div>
        </div>
      </main>

      <AdminNav activeTab="settings" />
    </div>
  );
}
