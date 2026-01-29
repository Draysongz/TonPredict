"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WalletButton } from "@/app/components/WalletButton";
import { AdminNav } from "../../components/AdminNav";

export default function AdminMarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [outcome, setOutcome] = useState<"yes" | "no">("yes");

  const isEligibleToResolve = true; // e.g. resolution timer expired

  return (
    <div className="bg-background-dark text-white min-h-screen overflow-x-hidden gradient-bg">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full glass"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h1 className="font-bold text-base leading-none">Market #{id}</h1>
            <span className="text-[10px] text-primary/70 font-mono">ADR: EQ...f4K9</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <WalletButton />
        </div>
      </header>

      <main className="px-5 pt-24 pb-36 space-y-6">
        {/* Market Info */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">info</span>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/90">Market Info</h2>
          </div>
          <div className="glass rounded-3xl p-5 space-y-0">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-xs text-slate-400">Market ID</span>
              <span className="text-sm font-mono font-medium">84920-XQ</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-xs text-slate-400">Contract Address</span>
              <span className="text-sm font-mono text-primary truncate ml-8">EQD4...9jS2</span>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="text-xs text-slate-400">Resolution Duration</span>
              <span className="text-sm font-medium">24 Hours</span>
            </div>
          </div>
        </section>

        {/* Market State */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">monitoring</span>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/90">Market State</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-3xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase tracking-tighter text-slate-400 mb-1">YES Price</span>
              <span className="text-xl font-bold text-primary">$0.64</span>
            </div>
            <div className="glass rounded-3xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase tracking-tighter text-slate-400 mb-1">NO Price</span>
              <span className="text-xl font-bold text-white">$0.36</span>
            </div>
            <div className="glass rounded-3xl p-4 col-span-2">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-tighter text-slate-400 block mb-1">Total Shares Issued</span>
                  <span className="text-xl font-bold">1,420,500 <span className="text-xs font-normal text-slate-500">TON</span></span>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
                  <span className="text-[8px] font-bold">82%</span>
                </div>
              </div>
            </div>
            <div className="glass rounded-3xl p-4 col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-icons-round text-primary">equalizer</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-tighter text-slate-400 block">Total Volume</span>
                  <span className="text-lg font-bold">42.8K <span className="text-xs font-normal text-slate-500">TON</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resolve Market - only when eligible */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-red-400 text-xl">gavel</span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/90">Resolve Market</h2>
            </div>
            {isEligibleToResolve ? (
              <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-[10px] font-bold uppercase">Expired</span>
            ) : (
              <span className="px-2 py-1 rounded bg-slate-500/20 text-slate-400 text-[10px] font-bold uppercase">Active</span>
            )}
          </div>
          <div className={`glass rounded-3xl p-6 ${isEligibleToResolve ? "border border-red-500/20" : "border border-white/5 opacity-80"}`}>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              {isEligibleToResolve
                ? "The resolution timer has expired. Please select the final outcome to release funds to the winners."
                : "Resolution is only available after the resolution timer has expired."}
            </p>
            {isEligibleToResolve && (
              <>
                <div className="space-y-3 mb-8">
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl bg-white/5 border cursor-pointer transition-colors ${
                      outcome === "yes" ? "border-primary bg-primary/5" : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        outcome === "yes" ? "border-primary" : "border-white/20"
                      }`}>
                        {outcome === "yes" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <span className="font-bold">YES</span>
                    </div>
                    <input
                      type="radio"
                      name="outcome"
                      checked={outcome === "yes"}
                      onChange={() => setOutcome("yes")}
                      className="hidden"
                    />
                  </label>
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl bg-white/5 border cursor-pointer transition-colors ${
                      outcome === "no" ? "border-primary bg-primary/5" : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        outcome === "no" ? "border-primary" : "border-white/20"
                      }`}>
                        {outcome === "no" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <span className="font-bold">NO</span>
                    </div>
                    <input
                      type="radio"
                      name="outcome"
                      checked={outcome === "no"}
                      onChange={() => setOutcome("no")}
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full bg-primary text-background-dark py-4 rounded-2xl font-bold text-base shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  Finalize Resolution
                </button>
                <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-medium">
                  Action cannot be undone
                </p>
                <Link
                  href={`/admin/markets/${id}/claims`}
                  className="mt-4 w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-sm border border-white/10 flex items-center justify-center gap-2 transition-colors"
                >
                  View Claims
                  <span className="material-icons-round text-sm">visibility</span>
                </Link>
              </>
            )}
            {!isEligibleToResolve && (
              <Link
                href={`/admin/markets/${id}/claims`}
                className="mt-4 w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-sm border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                View Claims
                <span className="material-icons-round text-sm">visibility</span>
              </Link>
            )}
          </div>
        </section>
      </main>

      <AdminNav activeTab="markets" />
    </div>
  );
}
