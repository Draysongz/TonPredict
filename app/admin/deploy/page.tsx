"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "../components/AdminNav";
import { useTonAddress } from "@tonconnect/ui-react";

function truncateAddress(address: string, start = 4, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export default function DeployNewMarketPage() {
  const router = useRouter();
  const walletAddress = useTonAddress();
  const [marketId, setMarketId] = useState("");
  const [resolutionValue, setResolutionValue] = useState("");
  const [resolutionUnit, setResolutionUnit] = useState<"seconds" | "minutes" | "hours" | "days">("days");

  const creatorDisplay = walletAddress ? truncateAddress(walletAddress) : "—";

  return (
    <div className="bg-background-dark text-slate-900 min-h-screen overflow-x-hidden gradient-bg flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between bg-background-dark/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center"
          >
            <span className="material-icons-round text-slate-900">arrow_back_ios_new</span>
          </button>
          <h1 className="ton-heading text-lg tracking-tight">Deploy New Market</h1>
        </div>
      </header>

      <main className="flex-1 px-5 pt-20 pb-32">
        <div className="mb-8">
          <p className="text-slate-400 text-sm">
            Configure and deploy a new prediction market instance through the Factory contract.
          </p>
        </div>

        <div className="glass p-6 rounded-[28px] space-y-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-primary/80 ml-1">
              Creator Address
            </label>
            <div className="relative">
              <input
                className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-mono text-slate-300 cursor-not-allowed glass-input"
                readOnly
                type="text"
                value={creatorDisplay}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-500 text-sm">
                lock
              </span>
            </div>
            <p className="text-[10px] text-slate-500 ml-1">
              The administrative wallet that will own this market.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-primary/80 ml-1">
              Market ID
            </label>
            <input
              className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-medium glass-input transition-all placeholder:text-slate-600"
              placeholder="Enter unique integer ID"
              type="number"
              min={1}
              value={marketId}
              onChange={(e) => setMarketId(e.target.value)}
            />
            <div className="flex items-center gap-1.5 ml-1">
              <span className="material-icons-round text-[12px] text-primary/60">info</span>
              <p className="text-[10px] text-slate-400">Must be a unique positive integer.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-primary/80 ml-1">
              Resolution Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-medium glass-input transition-all placeholder:text-slate-600"
                placeholder="Value"
                type="number"
                min={1}
                value={resolutionValue}
                onChange={(e) => setResolutionValue(e.target.value)}
              />
              <div className="relative">
                <select
                  className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-medium glass-input appearance-none transition-all"
                  value={resolutionUnit}
                  onChange={(e) =>
                    setResolutionUnit(e.target.value as "seconds" | "minutes" | "hours" | "days")
                  }
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 ml-1">
              Duration after which the market can be resolved.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-icons-round">rocket_launch</span>
              Create Market
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex gap-3">
          <span className="material-icons-round text-yellow-500 text-lg">warning_amber</span>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-yellow-500 uppercase">Important Note</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Market IDs are permanent and must be unique within the Factory instance. Check the
              existing registry to avoid deployment failure and gas waste.
            </p>
          </div>
        </div>
      </main>

      <AdminNav />
    </div>
  );
}
