"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

export default function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <div className="bg-background-dark text-slate-900 min-h-screen pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between bg-background-dark/80 backdrop-blur-md">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full glassmorphic"
        >
          <span className="material-icons-round text-primary">arrow_back_ios_new</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphic">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-medium text-slate-300">Live Market</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full glassmorphic">
          <span className="material-icons-round text-primary">share</span>
        </button>
      </header>

      <main className="px-5 space-y-6 pt-20">
        {/* Market Title Section */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-primary/10 border border-primary/20 rounded-md">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">TON Ecosystem</span>
            </div>
            <span className="text-xs text-slate-400">$450,230 Vol.</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-slate-900">
            Will TON reach an all-time high this month?
          </h1>
        </section>

        {/* Price Chart Section */}
        <section className="glassmorphic rounded-3xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-widest">Yes Price</div>
              <div className="text-3xl font-bold text-primary">$0.64</div>
            </div>
            <div className="text-right">
              <div className="text-primary text-xs font-semibold flex items-center gap-1">
                <span className="material-icons-round text-sm">trending_up</span> +12.4%
              </div>
              <div className="text-slate-500 text-[10px]">last 24h</div>
            </div>
          </div>
          <div className="h-32 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#0088CC", stopOpacity: 1 }}></stop>
                  <stop offset="100%" style={{ stopColor: "#0088CC", stopOpacity: 0 }}></stop>
                </linearGradient>
              </defs>
              <path
                d="M0,80 Q50,85 80,60 T150,50 T220,70 T300,30 T400,10"
                fill="none"
                stroke="#0088CC"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
              <path
                d="M0,80 Q50,85 80,60 T150,50 T220,70 T300,30 T400,10 L400,100 L0,100 Z"
                fill="url(#chartGrad)"
                opacity="0.2"
              ></path>
              <circle cx="400" cy="10" fill="#0088CC" r="4"></circle>
            </svg>
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-medium">
            <span>OCT 01</span>
            <span>OCT 15</span>
            <span>OCT 31</span>
          </div>
        </section>

        {/* Buy Buttons Section */}
        <section className="grid grid-cols-2 gap-4">
          <button className="group relative overflow-hidden glassmorphic rounded-2xl p-4 transition-all active:scale-95 border border-primary/20">
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">Buy Yes</span>
              <span className="text-xl font-bold text-slate-900">$0.64</span>
            </div>
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button className="group relative overflow-hidden glassmorphic rounded-2xl p-4 transition-all active:scale-95">
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Buy No</span>
              <span className="text-xl font-bold text-slate-900">$0.36</span>
            </div>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </section>

        {/* Market Details Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Market Details</h3>
          </div>
          <div className="glassmorphic rounded-2xl divide-y divide-slate-200">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-dark flex items-center justify-center">
                  <span className="material-icons-round text-primary text-lg">event</span>
                </div>
                <span className="text-sm font-medium text-slate-600">End Date</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">Oct 31, 2024</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-dark flex items-center justify-center">
                  <span className="material-icons-round text-primary text-lg">verified</span>
                </div>
                <span className="text-sm font-medium text-slate-600">Source of Truth</span>
              </div>
              <span className="text-sm font-semibold text-primary underline underline-offset-4">CoinGecko</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-dark flex items-center justify-center">
                  <span className="material-icons-round text-primary text-lg">gavel</span>
                </div>
                <span className="text-sm font-medium text-slate-600">Market Rules</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 pl-11">
                This market resolves to "Yes" if TON (The Open Network) reaches a price equal to or greater than $8.24 USD on CoinGecko at any point before October 31st, 23:59 UTC. Otherwise, it resolves to "No".
              </p>
            </div>
          </div>
        </section>

        {/* Recent Trades Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Recent Trades</h3>
            <button className="text-xs font-bold text-primary">View all</button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between glassmorphic p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold">
                  T1
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">TON_Whale.ton</div>
                  <div className="text-[10px] text-slate-500">
                    Bought <span className="text-primary font-bold">YES</span> • 2m ago
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">5,000 TON</div>
                <div className="text-[10px] text-slate-500">at $0.62</div>
              </div>
            </div>
            <div className="flex items-center justify-between glassmorphic p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400/20 to-slate-400/5 flex items-center justify-center text-slate-400 font-bold">
                  AN
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Anonymous User</div>
                  <div className="text-[10px] text-slate-500">
                    Bought <span className="text-slate-900 font-bold">NO</span> • 15m ago
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">1,200 TON</div>
                <div className="text-[10px] text-slate-500">at $0.38</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Trade Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="bg-primary text-white p-4 rounded-full flex items-center justify-between shadow-2xl shadow-primary/20">
          <div className="pl-4">
            <div className="text-[10px] font-black uppercase tracking-tighter opacity-70">Your Position</div>
            <div className="text-sm font-black tracking-tight">0.00 YES / 0.00 NO</div>
          </div>
          <button className="bg-background-dark text-primary font-black px-6 py-2.5 rounded-full text-sm uppercase tracking-widest active:scale-95 transition-transform border border-primary/30">
            Trade Now
          </button>
        </div>
      </div>
    </div>
  );
}
