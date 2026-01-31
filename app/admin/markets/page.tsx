"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "../components/AdminHeader";
import { useGetMarkets } from "@/lib/api";

// Helper function to format time remaining
function formatTimeRemaining(closingTime: Date): string {
  const now = new Date();
  const diff = new Date(closingTime).getTime() - now.getTime();
  
  if (diff <= 0) return "Ended";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${days}d : ${hours}h : ${minutes}m`;
}

// Helper function to truncate address
function truncateAddress(address: string, start = 6, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export default function ManageMarketsPage() {
  const [filter, setFilter] = useState<"active" | "resolved">("active");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch markets from backend
  const { data: marketsResponse, isLoading, error } = useGetMarkets();
  
  const markets = marketsResponse?.data || [];
  
  // Filter markets based on status and search query
  const filteredMarkets = markets.filter(market => {
    const matchesFilter = filter === "active" ? !market.resolved : market.resolved;
    const matchesSearch = searchQuery === "" || 
      market.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.contractMarketId.toString().includes(searchQuery);
    
    return matchesFilter && matchesSearch;
  });

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
                  ? "bg-linear-to-r from-ton-primary to-ton-cyan text-white shadow-md"
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
                  ? "bg-linear-to-r from-ton-primary to-ton-cyan text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ton-primary"></div>
            <p className="mt-4 text-slate-600">Loading markets...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <span className="material-icons-round text-red-500 text-4xl mb-2">error</span>
            <p className="text-red-700 font-semibold">Failed to load markets</p>
            <p className="text-red-600 text-sm mt-1">{error.message}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredMarkets.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <span className="material-icons-round text-slate-300 text-6xl mb-4">inbox</span>
            <p className="text-slate-600 font-semibold text-lg mb-2">No markets found</p>
            <p className="text-slate-500 text-sm">
              {searchQuery ? "Try adjusting your search query" : `No ${filter} markets available`}
            </p>
          </div>
        )}

        {/* Markets List */}
        {!isLoading && !error && filteredMarkets.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMarkets.map((market) => (
              <div 
                key={market._id} 
                className={`bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all ${
                  market.resolved ? 'opacity-70 hover:opacity-100' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg ${
                        market.resolved 
                          ? 'text-slate-500 bg-slate-100' 
                          : 'text-ton-primary bg-ton-primary/10'
                      }`}>
                        #{market.contractMarketId}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                        market.resolved
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {market.resolved ? 'RESOLVED' : 'ACTIVE'}
                      </span>
                      <span className="text-xs text-slate-400" title={market.address}>
                        {truncateAddress(market.address)}
                      </span>
                    </div>
                    <h3 className={`font-bold text-lg leading-snug ${
                      market.resolved ? 'text-slate-700' : 'text-slate-900'
                    }`}>
                      {market.question}
                    </h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-5 pt-4 border-t border-slate-100">
                  {!market.resolved ? (
                    <>
                      <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <span className="material-icons-round text-sm">timer</span>
                          Resolution In
                        </p>
                        <p className={`text-sm font-bold font-mono ${
                          market.resolved ? 'text-slate-700' : 'text-slate-900'
                        }`}>
                          {formatTimeRemaining(market.closingTime)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <span className="material-icons-round text-sm">show_chart</span>
                          Liquidity Param
                        </p>
                        <p className={`text-sm font-bold ${
                          market.resolved ? 'text-slate-700' : 'text-slate-900'
                        }`}>
                          {market.bParam}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <span className="material-icons-round text-sm">check_circle</span>
                          Status
                        </p>
                        <p className="text-sm font-bold text-slate-700">Finalized</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <span className="material-icons-round text-sm">emoji_events</span>
                          Winner
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                          {market.winningOutcome !== undefined 
                            ? market.outcomes[market.winningOutcome] 
                            : 'Pending'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                
                <Link
                  href={market.resolved ? `/admin/markets/${market._id}/claims` : `/admin/markets/${market._id}`}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 border ${
                    market.resolved
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-slate-50 hover:bg-linear-to-r hover:from-ton-primary hover:to-ton-cyan border-slate-200 hover:border-transparent text-slate-900 hover:text-white'
                  }`}
                >
                  {market.resolved ? 'View History' : 'View Details'}
                  <span className="material-icons-round text-base">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
