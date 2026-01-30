"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "../components/AdminHeader";

export default function ManageMarketsPage() {
  const [filter, setFilter] = useState<"active" | "resolved">("active");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="Markets" subtitle="Manage all prediction markets" />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input
                type="text"
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-ton-primary focus:ring-2 focus:ring-ton-primary/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-1 rounded-xl flex items-center">
            <button
              type="button"
              onClick={() => setFilter("active")}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === "active"
                  ? "bg-gradient-to-r from-ton-primary to-ton-cyan text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setFilter("resolved")}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === "resolved"
                  ? "bg-gradient-to-r from-ton-primary to-ton-cyan text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Markets List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active market 1 */}
          {filter === "active" && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-ton-primary bg-ton-primary/10 px-2 py-1 rounded-lg">
                    #TON-842-X
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700">
                    ACTIVE
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 leading-snug">
                  Will TON hit $10 before Jan 2025?
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-5 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <span className="material-icons-round text-sm">timer</span>
                  Resolution In
                </p>
                <p className="text-sm font-bold text-slate-900 font-mono">14d : 22h : 10m</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <span className="material-icons-round text-sm">account_balance_wallet</span>
                  Total Volume
                </p>
                <p className="text-sm font-bold text-slate-900">128,402 TON</p>
              </div>
            </div>
            
            <Link
              href="/admin/markets/842"
              className="w-full bg-slate-50 hover:bg-gradient-to-r hover:from-ton-primary hover:to-ton-cyan border border-slate-200 hover:border-transparent text-slate-900 hover:text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              View Details
              <span className="material-icons-round text-base">arrow_forward</span>
            </Link>
          </div>
          )}

          {/* Active market 2 */}
          {filter === "active" && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-ton-primary bg-ton-primary/10 px-2 py-1 rounded-lg">
                    #ETH-391-B
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700">
                    ACTIVE
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 leading-snug">
                  ETH above $4k by EOY?
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-5 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <span className="material-icons-round text-sm">timer</span>
                  Resolution In
                </p>
                <p className="text-sm font-bold text-slate-900 font-mono">8d : 14h : 32m</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <span className="material-icons-round text-sm">account_balance_wallet</span>
                  Total Volume
                </p>
                <p className="text-sm font-bold text-slate-900">95,204 TON</p>
              </div>
            </div>
            
            <Link
              href="/admin/markets/391"
              className="w-full bg-slate-50 hover:bg-gradient-to-r hover:from-ton-primary hover:to-ton-cyan border border-slate-200 hover:border-transparent text-slate-900 hover:text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              View Details
              <span className="material-icons-round text-base">arrow_forward</span>
            </Link>
          </div>
          )}

          {/* Resolved markets */}
          {filter === "resolved" && (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-6 opacity-70 hover:opacity-100 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                      #BTC-112-S
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">
                      RESOLVED
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-700 leading-snug">
                    Bitcoin Price &gt; $65,000 Friday
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-5 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <span className="material-icons-round text-sm">check_circle</span>
                    Status
                  </p>
                  <p className="text-sm font-bold text-slate-700">Finalized</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <span className="material-icons-round text-sm">account_balance_wallet</span>
                    Final Volume
                  </p>
                  <p className="text-sm font-bold text-slate-700">92,400 TON</p>
                </div>
              </div>
              
              <Link
                href="/admin/markets/112/claims"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-slate-200"
              >
                View History
                <span className="material-icons-round text-base">arrow_forward</span>
              </Link>
            </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
