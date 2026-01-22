"use client";

import Image from "next/image";
import Link from "next/link";

export default function WalletPage() {
  return (
    <div className="bg-background-dark text-white min-h-screen overflow-x-hidden gradient-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="material-icons-round text-background-dark text-lg">bolt</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight">TON Predict</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-[11px] font-mono text-slate-300">EQD4...3f8A</span>
          </div>
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center">
            <span className="material-icons-round text-xl">notifications_none</span>
          </button>
        </div>
      </header>

      <main className="px-5 pt-24 pb-32">
        {/* Total Balance Section */}
        <section className="text-center py-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-2">Total Balance</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Image
              alt="TON"
              className="w-8 h-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASlEL3A5fJ1N5X9HKX3Ydd9oZHuJX7yTSKkuiOBNVMOiBTuzXmnRUdjkDWFrnGj6nMf2HizbnoQ43ZC-aOd9QYYZAWwqfF0fzE7Av4AIyKNw24xa3GsfvsOiPpn7oqWTl375qxhNwY65qL72EziEVxjvK28zyb19XJZcbSwGd3lVhVNAzaNlyB3Dvt5HbkqbsJfiHLxJaEAXZBmbDRP_yPGTJrm9ERX0ckI7mFu5qCmLvOtj_54Io5lW7S7n47pJnJr21Bi8UggzM"
              width={32}
              height={32}
            />
            <h2 className="text-5xl font-bold tracking-tighter">1,248.50</h2>
          </div>
          <p className="text-slate-400 text-lg font-medium">≈ $8,427.38 USD</p>
        </section>

        {/* Deposit/Withdraw Buttons */}
        <section className="grid grid-cols-2 gap-4 mb-10">
          <button className="bg-primary text-background-dark py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <span className="material-icons-round">south_west</span>
            Deposit
          </button>
          <button className="border border-primary/50 text-primary py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 glass active:scale-[0.98] transition-transform">
            <span className="material-icons-round">north_east</span>
            Withdraw
          </button>
        </section>

        {/* Transaction History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">Transaction History</h3>
            <span className="text-xs text-slate-500">See All</span>
          </div>
          <div className="space-y-3">
            {/* Transaction 1 */}
            <div className="glass p-4 rounded-2xl flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-icons-round text-primary text-xl">trending_up</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Trade Outcome: YES</p>
                  <p className="text-[10px] text-slate-500">Oct 24, 2023 • Successful</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">- 50.00 TON</p>
                <p className="text-[10px] text-slate-500">$337.50</p>
              </div>
            </div>

            {/* Transaction 2 */}
            <div className="glass p-4 rounded-2xl flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="material-icons-round text-emerald-400 text-xl">emoji_events</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Market Reward</p>
                  <p className="text-[10px] text-slate-500">Oct 22, 2023 • Credited</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">+ 124.20 TON</p>
                <p className="text-[10px] text-slate-500">$838.35</p>
              </div>
            </div>

            {/* Transaction 3 */}
            <div className="glass p-4 rounded-2xl flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <span className="material-icons-round text-blue-400 text-xl">account_balance_wallet</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Deposit</p>
                  <p className="text-[10px] text-slate-500">Oct 20, 2023 • Confirmed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">+ 500.00 TON</p>
                <p className="text-[10px] text-slate-500">$3,375.00</p>
              </div>
            </div>

            {/* Transaction 4 */}
            <div className="glass p-4 rounded-2xl flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-icons-round text-primary text-xl">trending_down</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Trade Outcome: NO</p>
                  <p className="text-[10px] text-slate-500">Oct 19, 2023 • Successful</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">- 25.00 TON</p>
                <p className="text-[10px] text-slate-500">$168.75</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pt-4 pb-8 bg-background-dark/95 backdrop-blur-2xl border-t border-white/5">
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          <Link href="/" className="flex flex-col items-center gap-1 text-slate-400 w-16">
            <span className="material-icons-round text-[24px]">explore</span>
            <span className="text-[10px] font-medium">Discover</span>
          </Link>
          <Link href="/reward" className="flex flex-col items-center gap-1 text-slate-400 w-16">
            <span className="material-icons-round text-[24px]">redeem</span>
            <span className="text-[10px] font-medium">Reward</span>
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
          <Link href="/wallet" className="flex flex-col items-center gap-1 text-primary w-16">
            <span className="material-icons-round text-[24px]">account_balance_wallet</span>
            <span className="text-[10px] font-bold">Wallet</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
