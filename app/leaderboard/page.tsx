"use client";

import Link from "next/link";
import Image from "next/image";

export default function LeaderboardPage() {
  const rankings = [
    { rank: 1, name: "TON_Whale.ton", avatar: "TW", profit: "+12,450.50", change: "+24.5%", color: "bg-yellow-500/20", borderColor: "border-yellow-500/30", textColor: "text-yellow-400" },
    { rank: 2, name: "CryptoMaster", avatar: "CM", profit: "+9,820.30", change: "+19.2%", color: "bg-slate-400/20", borderColor: "border-slate-400/30", textColor: "text-slate-300" },
    { rank: 3, name: "PredictorPro", avatar: "PP", profit: "+8,150.75", change: "+16.8%", color: "bg-orange-500/20", borderColor: "border-orange-500/30", textColor: "text-orange-400" },
    { rank: 4, name: "MarketWizard", avatar: "MW", profit: "+7,420.10", change: "+14.5%", color: "bg-primary/20", borderColor: "border-primary/30", textColor: "text-primary" },
    { rank: 5, name: "TON_Trader", avatar: "TT", profit: "+6,890.25", change: "+13.2%", color: "bg-primary/20", borderColor: "border-primary/30", textColor: "text-primary" },
    { rank: 6, name: "SmartBets", avatar: "SB", profit: "+5,670.80", change: "+11.8%", color: "bg-primary/20", borderColor: "border-primary/30", textColor: "text-primary" },
    { rank: 7, name: "PredictionKing", avatar: "PK", profit: "+4,950.40", change: "+10.5%", color: "bg-primary/20", borderColor: "border-primary/30", textColor: "text-primary" },
    { rank: 8, name: "TON_Hunter", avatar: "TH", profit: "+4,320.60", change: "+9.2%", color: "bg-primary/20", borderColor: "border-primary/30", textColor: "text-primary" },
  ];

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
          <button className="bg-primary text-background-dark px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform">
            Connect Wallet
          </button>
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center">
            <span className="material-icons-round">notifications_none</span>
          </button>
        </div>
      </header>

      <main className="px-5 pt-24 pb-32">
        {/* Top 3 Podium */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-4 text-center">Top Traders</h2>
          <div className="flex items-end justify-center gap-3 mb-6">
            {/* 2nd Place */}
            <div className="flex-1 max-w-[100px]">
              <div className="glass rounded-2xl p-4 border border-slate-400/30 text-center mb-2">
                <div className="w-12 h-12 rounded-full bg-slate-400/20 border-2 border-slate-400/30 flex items-center justify-center mx-auto mb-2">
                  <span className="text-slate-300 font-bold text-sm">CM</span>
                </div>
                <p className="text-xs font-bold text-slate-300 mb-1">CryptoMaster</p>
                <p className="text-[10px] text-slate-500">#2</p>
              </div>
              <div className="bg-slate-400/20 h-16 rounded-t-xl"></div>
            </div>

            {/* 1st Place */}
            <div className="flex-1 max-w-[120px]">
              <div className="glass rounded-2xl p-4 border-2 border-yellow-500/50 text-center mb-2 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="material-icons-round text-yellow-400 text-2xl">emoji_events</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-yellow-500/20 border-2 border-yellow-500/30 flex items-center justify-center mx-auto mb-2 mt-2">
                  <span className="text-yellow-400 font-bold">TW</span>
                </div>
                <p className="text-xs font-bold text-yellow-400 mb-1">TON_Whale.ton</p>
                <p className="text-[10px] text-yellow-500/70">#1</p>
              </div>
              <div className="bg-yellow-500/20 h-20 rounded-t-xl"></div>
            </div>

            {/* 3rd Place */}
            <div className="flex-1 max-w-[100px]">
              <div className="glass rounded-2xl p-4 border border-orange-500/30 text-center mb-2">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500/30 flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-400 font-bold text-sm">PP</span>
                </div>
                <p className="text-xs font-bold text-orange-400 mb-1">PredictorPro</p>
                <p className="text-[10px] text-orange-500/70">#3</p>
              </div>
              <div className="bg-orange-500/20 h-12 rounded-t-xl"></div>
            </div>
          </div>
        </section>

        {/* Rankings List */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">All Rankings</h3>
            <div className="flex gap-2">
              <button className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">Weekly</button>
              <button className="text-xs text-slate-400 px-3 py-1 rounded-full">Monthly</button>
              <button className="text-xs text-slate-400 px-3 py-1 rounded-full">All Time</button>
            </div>
          </div>

          <div className="space-y-2">
            {rankings.map((user, index) => (
              <div
                key={user.rank}
                className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full ${user.color} border ${user.borderColor} flex items-center justify-center flex-shrink-0`}>
                    <span className={`${user.textColor} font-bold text-sm`}>{user.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      {user.rank <= 3 && (
                        <span className="material-icons-round text-xs text-primary">
                          {user.rank === 1 ? "emoji_events" : user.rank === 2 ? "workspace_premium" : "military_tech"}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500">Rank #{user.rank}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-primary">{user.profit} TON</p>
                  <p className="text-[10px] text-slate-500">{user.change}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Your Position Card */}
        <section className="mt-8">
          <div className="glass rounded-2xl p-5 border border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Your Position</h3>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-slate-300">#127</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold">YO</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Your Wallet</p>
                <p className="text-[10px] text-slate-500">EQD4...3f8A</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-slate-400 mb-1">Total Profit</p>
                <p className="text-lg font-bold text-primary">+245.80 TON</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 mb-1">Win Rate</p>
                <p className="text-lg font-bold text-white">68.5%</p>
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
          <Link href="/leaderboard" className="flex flex-col items-center gap-1 text-primary w-16">
            <span className="material-icons-round text-[24px]">leaderboard</span>
            <span className="text-[10px] font-bold">Leaderboard</span>
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
