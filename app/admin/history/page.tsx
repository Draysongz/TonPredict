"use client";

import Link from "next/link";
import { AdminHeader } from "../components/AdminHeader";

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
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="History" subtitle="Deployments and resolutions timeline" />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Recent Deployments */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Recent Deployments</h2>
            <Link
              href="/admin/factory"
              className="text-sm font-semibold text-ton-primary hover:text-ton-cyan transition-colors"
            >
              View full log →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentDeployments.map((entry, i) => (
              <div
                key={entry.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all relative"
              >
                {i === 0 && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-ton-primary to-ton-cyan rounded-r-xl" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ton-primary">#{entry.id}</span>
                    {i === 0 && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">NEW</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{entry.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-icons-round text-lg text-ton-primary/40">rocket_launch</span>
                </div>
                <code className="text-xs font-mono text-slate-600 block truncate bg-slate-50 px-2 py-1 rounded">{entry.address}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Resolutions */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Recent Resolutions</h2>
            <Link
              href="/admin/markets"
              className="text-sm font-semibold text-ton-primary hover:text-ton-cyan transition-colors"
            >
              View all markets →
            </Link>
          </div>
          <div className="space-y-4">
            {recentResolutions.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs text-slate-500 font-medium">{entry.time}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                    entry.outcome === "Yes" 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "bg-red-50 text-red-700"
                  }`}>
                    {entry.outcome}
                  </span>
                </div>
                <p className="text-base font-semibold text-slate-900 mb-3 leading-snug">{entry.market}</p>
                <Link
                  href={`/admin/markets/${entry.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ton-primary hover:text-ton-cyan transition-colors"
                >
                  View details
                  <span className="material-icons-round text-base">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
