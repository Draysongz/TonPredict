"use client";

import { useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import { useTonAddress } from "@tonconnect/ui-react";

function truncateAddress(address: string, start = 4, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export default function DeployNewMarketPage() {
  const walletAddress = useTonAddress();
  const [marketId, setMarketId] = useState("");
  const [resolutionValue, setResolutionValue] = useState("");
  const [resolutionUnit, setResolutionUnit] = useState<"seconds" | "minutes" | "hours" | "days">("days");

  const creatorDisplay = walletAddress ? truncateAddress(walletAddress) : "—";

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="Deploy New Market" subtitle="Create a new prediction market" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex gap-3">
            <span className="material-icons-round text-ton-primary text-2xl">info</span>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Before You Deploy</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Configure and deploy a new prediction market instance through the Factory contract. 
                Market IDs must be unique and permanent.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Creator Address
            </label>
            <div className="relative">
              <input
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 pr-12 text-sm font-mono text-slate-400 cursor-not-allowed transition-all"
                readOnly
                type="text"
                value={creatorDisplay}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 text-xl">
                lock
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-icons-round text-sm">info</span>
              The administrative wallet that will own this market
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Market ID
            </label>
            <input
              className="w-full bg-white border-2 border-slate-200 focus:border-ton-primary rounded-xl px-4 py-4 text-sm font-medium transition-all placeholder:text-slate-400 outline-none"
              placeholder="Enter unique integer ID"
              type="number"
              min={1}
              value={marketId}
              onChange={(e) => setMarketId(e.target.value)}
            />
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-icons-round text-sm">info</span>
              Must be a unique positive integer
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Resolution Time
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-4 text-sm font-medium transition-all placeholder:text-slate-400 outline-none"
                placeholder="Value"
                type="number"
                min={1}
                value={resolutionValue}
                onChange={(e) => setResolutionValue(e.target.value)}
              />
              <div className="relative">
                <select
                  className="w-full bg-white border-2 border-slate-200 focus:border-ton-primary rounded-xl px-4 py-4 text-sm font-medium appearance-none transition-all outline-none"
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
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 pointer-events-none text-xl">
                  expand_more
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-icons-round text-sm">schedule</span>
              Duration after which the market can be resolved
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <button
              type="button"
              className="w-full bg-gradient-to-r from-ton-primary to-ton-cyan text-white py-4 rounded-xl font-bold text-base hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-icons-round">rocket_launch</span>
              Deploy Market
            </button>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-5 flex gap-3">
          <span className="material-icons-round text-amber-600 text-2xl shrink-0">warning_amber</span>
          <div className="space-y-1">
            <h5 className="text-sm font-bold text-amber-900">Important Note</h5>
            <p className="text-sm text-amber-800 leading-relaxed">
              Market IDs are permanent and must be unique within the Factory instance. Check the
              existing registry to avoid deployment failure and gas waste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
