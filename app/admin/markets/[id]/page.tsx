"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminHeader } from "../../components/AdminHeader";

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
    <div className="min-h-screen bg-slate-50">
      <AdminHeader 
        title={`Market #${id}`} 
        subtitle="EQ...f4K9"
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
                  <div className="text-lg font-bold text-slate-900 mt-1">84920-XQ</div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-xs font-bold text-blue-700">Active</span>
                </div>
              </div>
              
              <div className="pb-4 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contract Address</span>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                  <code className="text-sm font-mono text-slate-700">EQD4...9jS2</code>
                  <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors">
                    <span className="material-icons-round text-base">content_copy</span>
                  </button>
                </div>
              </div>
              
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Resolution Duration</span>
                <div className="text-lg font-bold text-slate-900 mt-1">24 Hours</div>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Status</h2>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                  <span className="material-icons-round text-blue-500 text-2xl">monitoring</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500">Market State</div>
                  <div className="text-xl font-bold text-slate-900">Active</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs font-semibold text-slate-600">Total Trades</span>
                  <span className="text-lg font-bold text-slate-900">2,847</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-xs font-semibold text-slate-600">Unique Traders</span>
                  <span className="text-lg font-bold text-slate-900">1,204</span>
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
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">YES Price</span>
              </div>
              <div className="text-3xl font-bold text-emerald-600">$0.64</div>
              <div className="text-xs text-slate-500 mt-1">+4.2% today</div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">NO Price</span>
              </div>
              <div className="text-3xl font-bold text-rose-600">$0.36</div>
              <div className="text-xs text-slate-500 mt-1">-4.2% today</div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Shares</span>
              <div className="text-3xl font-bold text-slate-900 mt-2">1.42M</div>
              <div className="text-xs text-slate-500 mt-1">TON issued</div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Volume</span>
              <div className="text-3xl font-bold text-slate-900 mt-2">42.8K</div>
              <div className="text-xs text-slate-500 mt-1">TON traded</div>
            </div>
          </div>
        </div>

        {/* Resolve Market - only when eligible */}
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
                  <label
                    className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                      outcome === "yes" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        outcome === "yes" ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                      }`}>
                        {outcome === "yes" && <span className="material-icons-round text-white text-sm">check</span>}
                      </div>
                      <div>
                        <span className="font-bold text-lg text-slate-900">YES</span>
                        <div className="text-xs text-slate-500 mt-0.5">Market resolves to YES outcome</div>
                      </div>
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
                    className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                      outcome === "no" ? "border-rose-500 bg-rose-50" : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        outcome === "no" ? "border-rose-500 bg-rose-500" : "border-slate-300"
                      }`}>
                        {outcome === "no" && <span className="material-icons-round text-white text-sm">check</span>}
                      </div>
                      <div>
                        <span className="font-bold text-lg text-slate-900">NO</span>
                        <div className="text-xs text-slate-500 mt-0.5">Market resolves to NO outcome</div>
                      </div>
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
                  className="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-base hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <span className="material-icons-round">check_circle</span>
                  Finalize Resolution
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
      </div>
    </div>
  );
}
