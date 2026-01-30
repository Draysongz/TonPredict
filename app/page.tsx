"use client";

import Image from "next/image";
import Link from "next/link";
import { WalletButton } from "./components/WalletButton";

export default function Home() {
  return (
    <div className="bg-background-dark text-slate-900 min-h-screen overflow-x-hidden gradient-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="material-icons-round text-white text-lg">bolt</span>
          </div>
          <h1 className="ton-heading text-lg tracking-tight">TON Predict</h1>
        </div>
        <div className="flex items-center gap-2">
          <WalletButton />
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center">
            <span className="material-icons-round">notifications_none</span>
          </button>
        </div>
      </header>

      <main className="pb-32 pt-16">
        {/* Trending Now Section */}
        <section className="mt-4">
          <div className="px-5 mb-3 flex items-center justify-between">
            <h2 className="ton-label text-sm uppercase tracking-widest text-primary/80">Trending Now</h2>
            <span className="text-xs text-slate-400">View All</span>
          </div>
          <div className="flex overflow-x-auto gap-4 px-5 hide-scrollbar py-2">
            <Link href="/market/1" className="glass min-w-[280px] p-5 rounded-[24px] border-l-4 border-l-primary relative overflow-hidden block">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-white">CRYPTO</span>
                <span className="text-[10px] text-slate-400">$1.2M Vol</span>
              </div>
              <h3 className="font-semibold text-lg leading-tight mb-4">Will TON hit $10 before Jan 2025?</h3>
              <div className="flex items-center justify-between gap-3" onClick={(e) => e.stopPropagation()}>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm">Yes $0.64</button>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex-1 glass bg-slate-100 py-2.5 rounded-xl font-bold text-sm">No $0.36</button>
              </div>
            </Link>
            <Link href="/market/2" className="glass min-w-[280px] p-5 rounded-[24px] border-l-4 border-l-blue-400 relative overflow-hidden block">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-400 text-white uppercase">US Politics</span>
                <span className="text-[10px] text-slate-400">$450K Vol</span>
              </div>
              <h3 className="font-semibold text-lg leading-tight mb-4">Who will win the next Debate?</h3>
              <div className="flex items-center justify-between gap-3" onClick={(e) => e.stopPropagation()}>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex-1 bg-white/10 py-2.5 rounded-xl font-bold text-sm">Candidate A</button>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex-1 glass bg-slate-100 py-2.5 rounded-xl font-bold text-sm">Candidate B</button>
              </div>
            </Link>
          </div>
        </section>

        {/* Category Icons Section */}
        <section className="mt-8 px-5">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <button className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-round text-white">trending_up</span>
              </div>
              <span className="text-xs font-medium">Crypto</span>
            </button>
            <button className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center">
                <span className="material-icons-round text-slate-400">gavel</span>
              </div>
              <span className="text-xs font-medium opacity-60">Politics</span>
            </button>
            <button className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center">
                <span className="material-icons-round text-slate-400">sports_soccer</span>
              </div>
              <span className="text-xs font-medium opacity-60">Sports</span>
            </button>
            <button className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center">
                <span className="material-icons-round text-slate-400">movie</span>
              </div>
              <span className="text-xs font-medium opacity-60">Pop</span>
            </button>
            <button className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center">
                <span className="material-icons-round text-slate-400">more_horiz</span>
              </div>
              <span className="text-xs font-medium opacity-60">More</span>
            </button>
          </div>
        </section>

        {/* Active Markets Section */}
        <section className="mt-8 px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="ton-label text-sm uppercase tracking-widest text-primary/80">Active Markets</h2>
            <div className="flex gap-1">
              <span className="material-icons-round text-sm text-primary">filter_list</span>
              <span className="text-xs font-medium">Newest</span>
            </div>
          </div>
          <div className="space-y-4">
            {/* Market Card 1 */}
            <Link href="/market/3" className="p-4 rounded-2xl glass border border-slate-200 flex flex-col gap-4 block">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Image
                    alt="Bitcoin logo"
                    className="w-8 h-8"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJW12kPWB1uGXfbEFOhXvozo_n2E7nzHy7TFt21nf1gsdnR6_H-9JaFGKbY9G1I3BnWhocIplIldLsNB0Kq52OcjEiwTcYESrFcMBKel5pABLnsrrHZ0EJQi655dgxaePK7RPNtFe-Zg-PUYeDAHovb5y7tc1C8HO2jS-mpHqDDkGVl7wexiZanx9Af6LRFlXKg3uwo6tQKMn1PLz2FAXYXZ_2EtNy0JvaiPUanT2eD9TAyUJztH6BVGfoq8UwQi9McIC5gOfs_y0"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1 leading-snug">Bitcoin price to stay above $65,000 until Friday?</h4>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="material-icons-round text-xs">schedule</span> 14h left
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-icons-round text-xs">bar_chart</span> $84.2K Vol
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium">Yes</span>
                  <span className="text-primary font-bold">$0.72</span>
                </div>
                <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium">No</span>
                  <span className="text-slate-900 font-bold">$0.28</span>
                </div>
              </div>
            </Link>

            {/* Market Card 2 */}
            <Link href="/market/4" className="p-4 rounded-2xl glass border border-slate-200 flex flex-col gap-4 block">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Image
                    alt="Ethereum logo"
                    className="w-8 h-8"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT4K0hf3VIxf57eZ0lr3mp4q5zNDVJsaqMJcmhT9dbv5TP-pPOPmhpBVIHDS8a4od6OAlWEttjj_Ddcc2NmGt8wgRvXIF9GZ1EfOty_UJoVDUu0_sFgMN7TyNzIe3WjJR0fOEP9zJ79YuACR43rbrYhvOZ0XEKy9V9uCCrqsxag9KbaZESqJvAycN9VBpHtKIWXYhjggSvUCtrbOJCcDoede2GnFq5RFY8Zm0BuUH_b_StVzDiFoOCJz0dErZLZjJYVp_jPtVn0TY"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1 leading-snug">Will ETH/BTC ratio cross 0.05 this month?</h4>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="material-icons-round text-xs">schedule</span> 4d left
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-icons-round text-xs">bar_chart</span> $12.5K Vol
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium">Yes</span>
                  <span className="text-primary font-bold">$0.45</span>
                </div>
                <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium">No</span>
                  <span className="text-slate-900 font-bold">$0.55</span>
                </div>
              </div>
            </Link>

            {/* Market Card 3 */}
            <Link href="/market/5" className="p-4 rounded-2xl glass border border-slate-200 flex flex-col gap-4 block">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons-round text-primary">emoji_events</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1 leading-snug">Champions League Winner 2024/25?</h4>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="material-icons-round text-xs">schedule</span> 7mo left
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-icons-round text-xs">bar_chart</span> $2.1M Vol
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-slate-100 py-3 rounded-xl text-xs font-semibold border border-slate-200">Explore 12 Options</button>
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pt-4 pb-8 bg-background-dark/95 backdrop-blur-2xl border-t border-slate-200">
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          <Link href="/" className="flex flex-col items-center gap-1 text-primary w-16">
            <span className="material-icons-round text-[24px]">explore</span>
            <span className="text-[10px] font-bold">Discover</span>
          </Link>
          <Link href="/reward" className="flex flex-col items-center gap-1 text-slate-400 w-16">
            <span className="material-icons-round text-[24px]">redeem</span>
            <span className="text-[10px] font-medium">Reward</span>
          </Link>
          <div className="relative w-16 flex justify-center">
            <div className="absolute -top-12 bg-primary w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,136,204,0.4)] border-4 border-background-dark">
              <span className="material-icons-round text-white text-3xl font-bold">add</span>
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

      {/* Notification Banner */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 glass border-primary/30 py-2 px-4 rounded-full flex items-center gap-2 whitespace-nowrap shadow-xl z-40">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">New Market</span>
        <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
        <span className="text-[10px] font-medium">NBA Finals Odds updated</span>
      </div>
    </div>
  );
}
