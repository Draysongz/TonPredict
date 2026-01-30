"use client";

import Link from "next/link";
import { AdminHeader } from "./components/AdminHeader";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader 
        title="Overview" 
        subtitle="Monitor your prediction markets platform"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="material-icons-round text-ton-primary text-2xl">layers</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <p className="text-sm text-slate-500 mb-1">Total Markets</p>
            <p className="text-3xl font-bold text-slate-900">1,284</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                <span className="material-icons-round text-ton-cyan text-2xl">bolt</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+8</span>
            </div>
            <p className="text-sm text-slate-500 mb-1">Active Markets</p>
            <p className="text-3xl font-bold text-slate-900">42</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <span className="material-icons-round text-emerald-600 text-2xl">task_alt</span>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">+142</span>
            </div>
            <p className="text-sm text-slate-500 mb-1">Resolved Markets</p>
            <p className="text-3xl font-bold text-slate-900">1,242</p>
          </div>

          <div className="bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="material-icons-round text-white text-2xl">account_balance_wallet</span>
              </div>
              <span className="text-xs font-semibold text-white/90 bg-white/20 px-2 py-1 rounded-lg">+24%</span>
            </div>
            <p className="text-sm text-white/80 mb-1 relative z-10">Total Volume</p>
            <p className="text-3xl font-bold text-white relative z-10">840K <span className="text-lg font-medium">TON</span></p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/admin/deploy"
                  className="flex items-center gap-3 p-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all group"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-icons-round text-xl">add_circle</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Deploy Market</p>
                    <p className="text-xs text-white/80">Create new</p>
                  </div>
                </Link>
                <Link
                  href="/admin/markets"
                  className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all group"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform">
                    <span className="material-icons-round text-blue-500 text-xl">analytics</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">View Markets</p>
                    <p className="text-xs text-slate-500">Manage all</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Markets Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Recent Markets</h2>
                <Link href="/admin/markets" className="text-sm font-semibold text-ton-primary hover:text-ton-cyan transition-colors">
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { id: "842", title: "Will TON hit $10 before Jan 2025?", volume: "128K", status: "Active" },
                  { id: "841", title: "ETH above $4k by EOY?", volume: "95K", status: "Active" },
                  { id: "840", title: "Binance listing by Q1?", volume: "203K", status: "Resolved" },
                  { id: "839", title: "Bitcoin reaches $100k in 2025?", volume: "412K", status: "Active" },
                ].map((market) => (
                  <Link
                    key={market.id}
                    href={`/admin/markets/${market.id}`}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-semibold text-ton-primary">#{market.id}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          market.status === "Active" 
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {market.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 truncate">{market.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Volume</p>
                      <p className="text-sm font-bold text-slate-900">{market.volume} TON</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Factory Info */}
            <Link
              href="/admin/factory"
              className="block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-purple-600 text-xl">precision_manufacturing</span>
                </div>
                <h3 className="font-bold text-slate-900">Factory Config</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Creation Fee</span>
                  <span className="text-sm font-bold text-slate-900">5 TON</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Platform Fee</span>
                  <span className="text-sm font-bold text-slate-900">2.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Min. Liquidity</span>
                  <span className="text-sm font-bold text-slate-900">50 TON</span>
                </div>
              </div>
            </Link>

            {/* Platform Stats */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">Platform Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500">Market Activity</span>
                    <span className="text-xs font-semibold text-slate-900">78%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-blue-500 to-cyan-500" style={{ width: "78%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500">Resolution Rate</span>
                    <span className="text-xs font-semibold text-slate-900">96%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-emerald-500 to-emerald-600" style={{ width: "96%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500">User Engagement</span>
                    <span className="text-xs font-semibold text-slate-900">84%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-purple-500 to-purple-600" style={{ width: "84%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-600">Factory Contract</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-600">API Services</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-600">Database</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
