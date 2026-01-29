"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/app/admin/components/AdminNav";

export default function MarketClaimsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const claims = [
    { address: "UQBy...9Xk2", time: "2 mins ago", amount: "+840.00" },
    { address: "EQA1...M3p1", time: "12 mins ago", amount: "+2,150.45" },
    { address: "UQD9...Lp8w", time: "45 mins ago", amount: "+120.00" },
    { address: "EQC4...v0o9", time: "1 hour ago", amount: "+5,900.00" },
  ];

  return (
    <div className="bg-background-dark text-white min-h-screen overflow-x-hidden gradient-bg">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center text-slate-400"
          >
            <span className="material-icons-round">arrow_back_ios</span>
          </button>
          <div>
            <h1 className="font-bold text-base tracking-tight leading-tight">Claims Visibility</h1>
            <p className="text-[10px] text-primary/70 uppercase font-bold tracking-widest">
              Market #{id} Resolved
            </p>
          </div>
        </div>
        <button
          type="button"
          className="w-10 h-10 glass rounded-full flex items-center justify-center"
        >
          <span className="material-icons-round text-primary">refresh</span>
        </button>
      </header>

      <main className="px-5 pt-20 pb-36">
        <section className="mb-8">
          <div className="glass rounded-[24px] p-5 border-l-4 border-l-primary relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <h2 className="text-sm font-medium text-slate-400 mb-4 italic">
              &ldquo;Will TON hit $10 before Jan 2025?&rdquo;
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Winning Outcome</span>
                <span className="bg-primary text-background-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  YES
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Total Claims Made</p>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-bold">142,850</span>
                    <span className="text-[10px] text-primary mb-1">TON</span>
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Contract Balance</p>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-bold">12,150</span>
                    <span className="text-[10px] text-primary mb-1">TON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
              Claim Transactions
            </h3>
            <span className="text-[10px] text-slate-400">Read-Only View</span>
          </div>
          <div className="space-y-3">
            {claims.map((claim, i) => (
              <div
                key={claim.address + claim.time}
                className={`glass p-4 rounded-2xl flex items-center justify-between gap-4 ${
                  i >= 2 ? (i === 2 ? "opacity-70" : "opacity-50") : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-icons-round text-primary text-lg">account_balance_wallet</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold font-mono">{claim.address}</p>
                    <p className="text-[10px] text-slate-500">{claim.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{claim.amount}</p>
                  <p className="text-[10px] text-slate-500">TON</p>
                </div>
              </div>
            ))}
          </div>
          <div className="py-6 flex flex-col items-center gap-2 opacity-30">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-medium">Syncing Ledger...</span>
          </div>
        </section>
      </main>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 glass border-primary/20 py-2 px-6 rounded-full flex items-center gap-3 whitespace-nowrap shadow-xl z-40 bg-surface-dark/80">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">
          Live Claims Monitoring
        </span>
      </div>

      <AdminNav activeTab="markets" />
    </div>
  );
}
