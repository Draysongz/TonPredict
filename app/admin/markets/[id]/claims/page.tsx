"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/app/admin/components/AdminHeader";

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
    <div className="min-h-screen bg-slate-50">
      <AdminHeader 
        title="Claims Monitoring" 
        subtitle={`Market #${id} - Resolved`}
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
        {/* Market Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 flex items-center justify-center shrink-0">
              <span className="material-icons-round text-blue-500 text-2xl">check_circle</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-bold text-slate-900">Market Resolved</h2>
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  YES
                </span>
              </div>
              <p className="text-sm text-slate-600 italic">
                "Will TON hit $10 before Jan 2025?"
              </p>
            </div>
            <button
              type="button"
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <span className="material-icons-round text-blue-500">refresh</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Claims Made</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                142,850 <span className="text-sm font-normal text-slate-500">TON</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contract Balance</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                12,150 <span className="text-sm font-normal text-slate-500">TON</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Unique Claimants</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">824</div>
            </div>
          </div>
        </div>

        {/* Live Monitoring Badge */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Claim Transactions
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-slate-700">Live Monitoring</span>
          </div>
        </div>

        {/* Claims List */}
        <div className="space-y-3">
          {claims.map((claim, i) => (
            <div
              key={claim.address + claim.time}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="material-icons-round text-blue-500">account_balance_wallet</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono font-bold text-slate-900">{claim.address}</code>
                      <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors">
                        <span className="material-icons-round text-base">content_copy</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="material-icons-round text-xs">schedule</span>
                      {claim.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-emerald-600">{claim.amount}</div>
                  <div className="text-xs text-slate-500">TON</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading More */}
        <div className="py-8 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-500">Syncing ledger data...</span>
        </div>
      </div>
    </div>
  );
}
