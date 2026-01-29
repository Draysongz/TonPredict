"use client";

import Link from "next/link";
import { WalletButton } from "../components/WalletButton";

export default function RewardPage() {
  return (
    <div className="bg-background-dark text-white min-h-screen overflow-x-hidden gradient-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="material-icons-round text-background-dark text-lg">bolt</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight">TON Predict</h1>
        </div>
        <div className="flex items-center gap-2">
          <WalletButton />
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center">
            <span className="material-icons-round">notifications_none</span>
          </button>
        </div>
      </header>

      <main className="pb-32 px-5 pt-24">
        {/* Liquidity Rewards Section */}
        <section className="mb-8">
          <div className="glass rounded-[28px] p-6 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-6xl">water_drop</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Liquidity Rewards</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Earn rewards by placing orders within the spread. Rewards are distributed directly to wallets everyday at midnight UTC.
              </p>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Estimated Rewards</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary tracking-tight tabular-nums">14.82</span>
                  <span className="text-sm font-bold text-primary/60">TON</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <p className="text-[10px] text-slate-500 font-medium">Updating in real-time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Liquidity Section */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/80 flex items-center gap-2">
              <span className="material-icons-round text-primary text-base">waves</span>
              Your Active Liquidity
            </h2>
            <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-300">2 Markets</span>
          </div>
          <div className="space-y-3">
            {/* Market 1 */}
            <div className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <span className="material-symbols-outlined text-blue-400">trending_up</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">TON Price &gt; $10.00</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Expires: Oct 25, 2023</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white">$450.00</p>
                <p className="text-[10px] text-primary font-medium">+2.4% Share</p>
              </div>
            </div>

            {/* Market 2 */}
            <div className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <span className="material-symbols-outlined text-purple-400">rocket_launch</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">BTC New ATH in 2024</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Expires: Dec 31, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white">$1,200.00</p>
                <p className="text-[10px] text-primary font-medium">+0.8% Share</p>
              </div>
            </div>

            {/* Add More Liquidity Button */}
            <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-primary hover:border-primary/30 transition-colors">
              <span className="material-icons-round text-sm">add_circle_outline</span>
              <span className="text-xs font-bold uppercase tracking-wider">Provide More Liquidity</span>
            </button>
          </div>
        </section>

        {/* Info Box */}
        <div className="mt-8 glass p-4 rounded-2xl border border-white/5 bg-primary/5">
          <div className="flex gap-3">
            <span className="material-icons-round text-primary text-xl">info</span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Higher rewards are earned by maintaining narrow spreads and providing deep liquidity in high-volume prediction markets.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pt-4 pb-8 bg-background-dark/95 backdrop-blur-2xl border-t border-white/5">
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          <Link href="/" className="flex flex-col items-center gap-1 text-slate-400 w-16">
            <span className="material-icons-round text-[24px]">explore</span>
            <span className="text-[10px] font-medium">Discover</span>
          </Link>
          <Link href="/reward" className="flex flex-col items-center gap-1 text-primary w-16">
            <span className="material-icons-round text-[24px]">redeem</span>
            <span className="text-[10px] font-bold">Reward</span>
          </Link>
          <div className="relative w-16 flex justify-center">
            <div className="absolute -top-12 bg-primary w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(195,255,77,0.4)] border-4 border-background-dark">
              <span className="material-icons-round text-background-dark text-3xl font-bold">add</span>
            </div>
          </div>
          <Link href="/leaderboard" className="flex flex-col items-center gap-1 text-slate-400 w-16">
            <span className="material-icons-round text-[24px]">leaderboard</span>
            <span className="text-[10px] font-medium">Leaderboard</span>
          </Link>
          <Link href="/wallet" className="flex flex-col items-center gap-1 text-slate-400 w-16">
            <span className="material-icons-round text-[24px]">account_balance_wallet</span>
            <span className="text-[10px] font-medium">Wallet</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
