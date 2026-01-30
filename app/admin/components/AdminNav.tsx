"use client";

import Link from "next/link";

type AdminTab = "overview" | "markets" | "history" | "settings";

type AdminNavProps = {
  activeTab?: AdminTab;
};

export function AdminNav({ activeTab }: AdminNavProps) {
  const linkClass = (tab: AdminTab) =>
    `flex flex-col items-center gap-1.5 w-16 transition-all ${
      activeTab === tab ? "text-ton-primary" : "text-slate-400 hover:text-slate-600"
    }`;
  const labelClass = (tab: AdminTab) =>
    activeTab === tab ? "text-[10px] font-bold" : "text-[10px] font-medium";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pt-5 pb-8 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        <Link href="/admin" className={linkClass("overview")}>
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${activeTab === "overview" ? "bg-gradient-to-br from-ton-primary to-ton-cyan shadow-lg shadow-ton-primary/25" : "bg-slate-100"}`}>
            <span className={`material-icons-round text-[22px] ${activeTab === "overview" ? "text-white" : "text-slate-500"}`}>dashboard</span>
          </div>
          <span className={labelClass("overview")}>Overview</span>
        </Link>
        <Link href="/admin/markets" className={linkClass("markets")}>
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${activeTab === "markets" ? "bg-gradient-to-br from-ton-primary to-ton-cyan shadow-lg shadow-ton-primary/25" : "bg-slate-100"}`}>
            <span className={`material-icons-round text-[22px] ${activeTab === "markets" ? "text-white" : "text-slate-500"}`}>analytics</span>
          </div>
          <span className={labelClass("markets")}>Markets</span>
        </Link>
        <div className="relative w-16 flex justify-center">
          <Link
            href="/admin/deploy"
            className="absolute -top-14 ton-gradient-button w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-white transition-all hover:scale-105 active:scale-95"
          >
            <span className="material-icons-round text-white text-3xl font-bold">add</span>
          </Link>
        </div>
        <Link href="/admin/history" className={linkClass("history")}>
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${activeTab === "history" ? "bg-gradient-to-br from-ton-primary to-ton-cyan shadow-lg shadow-ton-primary/25" : "bg-slate-100"}`}>
            <span className={`material-icons-round text-[22px] ${activeTab === "history" ? "text-white" : "text-slate-500"}`}>history</span>
          </div>
          <span className={labelClass("history")}>History</span>
        </Link>
        <Link href="/admin/settings" className={linkClass("settings")}>
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${activeTab === "settings" ? "bg-gradient-to-br from-ton-primary to-ton-cyan shadow-lg shadow-ton-primary/25" : "bg-slate-100"}`}>
            <span className={`material-icons-round text-[22px] ${activeTab === "settings" ? "text-white" : "text-slate-500"}`}>settings</span>
          </div>
          <span className={labelClass("settings")}>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
