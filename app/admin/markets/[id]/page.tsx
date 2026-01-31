"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminHeader } from "../../components/AdminHeader";
import { useGetMarket, useResolveMarket } from "@/lib/api";

// Helper function to truncate address
function truncateAddress(address: string, start = 6, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

// Helper function to format time remaining
function formatTimeRemaining(closingTime: Date): string {
  const now = new Date();
  const diff = new Date(closingTime).getTime() - now.getTime();
  
  if (diff <= 0) return "Ended";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${days}d ${hours}h ${minutes}m`;
}

// Helper function to calculate duration from closing time
function calculateDuration(closingTime: Date, createdAt: Date): string {
  const diff = new Date(closingTime).getTime() - new Date(createdAt).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 24) return `${hours} Hours`;
  const days = Math.floor(hours / 24);
  return `${days} Day${days > 1 ? 's' : ''}`;
}

export default function AdminMarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [selectedOutcome, setSelectedOutcome] = useState<number>(0);
  const [isResolving, setIsResolving] = useState(false);

  // Fetch market data
  const { data: marketResponse, isLoading, error } = useGetMarket(id);
  const { mutateAsync: resolveMarket } = useResolveMarket();
  
  const market = marketResponse?.data;

  // Check if eligible to resolve (closing time has passed and not already resolved)
  const isEligibleToResolve = market ? 
    new Date(market.closingTime).getTime() < Date.now() && !market.resolved : 
    false;

  const handleResolve = async () => {
    if (!market) return;
    
    setIsResolving(true);
    try {
      await resolveMarket({ id: market._id, winningOutcome: selectedOutcome });
      alert(`Market resolved successfully! Winner: ${market.outcomes[selectedOutcome]}`);
    } catch (error) {
      console.error("Failed to resolve market:", error);
      alert("Failed to resolve market. Please try again.");
    } finally {
      setIsResolving(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ton-primary"></div>
          <p className="mt-4 text-slate-600">Loading market details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !market) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-md">
          <span className="material-icons-round text-red-500 text-6xl mb-4">error</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Market Not Found</h2>
          <p className="text-slate-600 mb-6">The market you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/admin/markets')}
            className="px-6 py-3 bg-ton-primary text-white rounded-xl font-semibold hover:bg-ton-primary/90 transition-colors"
          >
            Back to Markets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader 
        title={market.question} 
        subtitle={truncateAddress(market.address)}
        action={
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition-colors text-slate-700 font-semibold"
          >
            <span className="material-icons-round text-lg">arrow_back</span>
            Back
          </button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6">
        {/* Market Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Market Information</h2>
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Market ID</span>
                  <div className="text-lg font-bold text-slate-900 mt-1">#{market.contractMarketId}</div>
                </div>
                <div className={`px-3 py-1 rounded-lg ${
                  market.resolved 
                    ? 'bg-slate-100 border border-slate-200' 
                    : 'bg-emerald-50 border border-emerald-200'
                }`}>
                  <span className={`text-xs font-bold ${
                    market.resolved ? 'text-slate-600' : 'text-emerald-700'
                  }`}>
                    {market.resolved ? 'Resolved' : 'Active'}
                  </span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contract Address</span>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                  <code className="text-sm font-mono text-slate-700">{truncateAddress(market.address, 8, 6)}</code>
                  <button 
                    type="button" 
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(market.address);
                      alert('Address copied!');
                    }}
                  >
                    <span className="material-icons-round text-base">content_copy</span>
                  </button>
                </div>
              </div>
              
              <div className="pb-4 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Resolution Duration</span>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  {calculateDuration(market.closingTime, market.createdAt)}
                </div>
              </div>
              
              <div className="pb-4 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Closing Time</span>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  {new Date(market.closingTime).toLocaleString()}
                </div>
                {!market.resolved && (
                  <div className="text-sm text-slate-600 mt-1">
                    {formatTimeRemaining(market.closingTime)} remaining
                  </div>
                )}
              </div>
              
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Outcomes</span>
                <div className="flex gap-2 mt-2">
                  {market.outcomes.map((outcome, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        market.resolved && market.winningOutcome === index
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {outcome}
                      {market.resolved && market.winningOutcome === index && (
                        <span className="material-icons-round text-sm ml-1 align-middle">check_circle</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Status</h2>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  market.resolved 
                    ? 'bg-linear-to-br from-slate-50 to-slate-100' 
                    : 'bg-linear-to-br from-blue-50 to-cyan-50'
                }`}>
                  <span className={`material-icons-round text-2xl ${
                    market.resolved ? 'text-slate-500' : 'text-blue-500'
                  }`}>
                    {market.resolved ? 'check_circle' : 'monitoring'}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500">Market State</div>
                  <div className="text-xl font-bold text-slate-900">
                    {market.resolved ? 'Resolved' : 'Active'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs font-semibold text-slate-600">Liquidity (b)</span>
                  <span className="text-lg font-bold text-slate-900">{market.bParam}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs font-semibold text-slate-600">q(Yes)</span>
                  <span className="text-lg font-bold text-slate-900">{Number(market.qYes).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs font-semibold text-slate-600">q(No)</span>
                  <span className="text-lg font-bold text-slate-900">{Number(market.qNo).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market State - Prices & Volume */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Market Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">YES Probability</span>
              </div>
              <div className="text-3xl font-bold text-emerald-600">
                {market.impliedProbability ? `${(market.impliedProbability * 100).toFixed(1)}%` : '50.0%'}
              </div>
              <div className="text-xs text-slate-500 mt-1">Current odds</div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">NO Probability</span>
              </div>
              <div className="text-3xl font-bold text-rose-600">
                {market.impliedProbability ? `${((1 - market.impliedProbability) * 100).toFixed(1)}%` : '50.0%'}
              </div>
              <div className="text-xs text-slate-500 mt-1">Current odds</div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Shares</span>
              <div className="text-3xl font-bold text-slate-900 mt-2">
                {market.statistics?.totalShares ? Number(market.statistics.totalShares).toLocaleString() : '0'}
              </div>
              <div className="text-xs text-slate-500 mt-1">Shares issued</div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Volume</span>
              <div className="text-3xl font-bold text-slate-900 mt-2">
                {market.statistics?.totalVolume ? Number(market.statistics.totalVolume).toLocaleString() : '0'}
              </div>
              <div className="text-xs text-slate-500 mt-1">TON traded</div>
            </div>
          </div>
        </div>

        {/* Resolve Market - only when eligible */}
        {!market.resolved && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Resolve Market</h2>
            {isEligibleToResolve ? (
              <span className="px-3 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase">Timer Expired</span>
            ) : (
              <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase">Active</span>
            )}
          </div>
          
          <div className={`bg-white rounded-xl p-6 ${isEligibleToResolve ? "border-2 border-red-200" : "border border-slate-200 opacity-60"}`}>
            <div className="flex items-start gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isEligibleToResolve ? "bg-red-50" : "bg-slate-50"}`}>
                <span className={`material-icons-round text-2xl ${isEligibleToResolve ? "text-red-500" : "text-slate-400"}`}>gavel</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Market Resolution</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isEligibleToResolve
                    ? "The resolution timer has expired. Please select the final outcome to release funds to the winners."
                    : "Resolution is only available after the resolution timer has expired."}
                </p>
              </div>
            </div>
            
            {isEligibleToResolve && (
              <>
                <div className="space-y-3 mb-6">
                  {market.outcomes.map((outcomeText, index) => (
                    <label
                      key={index}
                      className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedOutcome === index ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedOutcome === index ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                        }`}>
                          {selectedOutcome === index && <span className="material-icons-round text-white text-sm">check</span>}
                        </div>
                        <div>
                          <span className="font-bold text-lg text-slate-900">{outcomeText}</span>
                          <div className="text-xs text-slate-500 mt-0.5">Market resolves to {outcomeText} outcome</div>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="outcome"
                        checked={selectedOutcome === index}
                        onChange={() => setSelectedOutcome(index)}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="material-icons-round text-amber-600">warning</span>
                    <div>
                      <div className="font-bold text-sm text-amber-900 mb-1">Warning</div>
                      <div className="text-xs text-amber-800">This action cannot be undone. Ensure the selected outcome is correct before finalizing.</div>
                    </div>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleResolve}
                  disabled={isResolving}
                  className="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-base hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResolving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Resolving...
                    </>
                  ) : (
                    <>
                      <span className="material-icons-round">check_circle</span>
                      Finalize Resolution
                    </>
                  )}
                </button>
                
                <Link
                  href={`/admin/markets/${id}/claims`}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-icons-round text-base">visibility</span>
                  View Claims
                </Link>
              </>
            )}
            
            {!isEligibleToResolve && (
              <Link
                href={`/admin/markets/${id}/claims`}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-icons-round text-base">visibility</span>
                View Claims
              </Link>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
