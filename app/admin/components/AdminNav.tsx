"use client";

import Link from "next/link";

type AdminTab = "overview" | "markets" | "history" | "settings";

type AdminNavProps = {
  activeTab?: AdminTab;
};

export function AdminNav({ activeTab }: AdminNavProps) {
  const linkClass = (tab: AdminTab) =>
    `flex flex-col items-center gap-1 w-16 ${
      activeTab === tab ? "text-primary" : "text-slate-400"
    }`;
  const labelClass = (tab: AdminTab) =>
    activeTab === tab ? "text-[10px] font-bold" : "text-[10px] font-medium";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pt-4 pb-8 bg-background-dark/95 backdrop-blur-2xl border-t border-white/5">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        <Link href="/admin" className={linkClass("overview")}>
          <span className="material-icons-round text-[24px]">dashboard</span>
          <span className={labelClass("overview")}>Overview</span>
        </Link>
        <Link href="/admin/markets" className={linkClass("markets")}>
          <span className="material-icons-round text-[24px]">analytics</span>
          <span className={labelClass("markets")}>Markets</span>
        </Link>
        <div className="relative w-16 flex justify-center">
          <Link
            href="/admin/deploy"
            className="absolute -top-12 bg-primary w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(195,255,77,0.4)] border-4 border-background-dark"
          >
            <span className="material-icons-round text-background-dark text-3xl font-bold">add</span>
          </Link>
        </div>
        <Link href="/admin/history" className={linkClass("history")}>
          <span className="material-icons-round text-[24px]">history</span>
          <span className={labelClass("history")}>History</span>
        </Link>
        <Link href="/admin/settings" className={linkClass("settings")}>
          <span className="material-icons-round text-[24px]">settings</span>
          <span className={labelClass("settings")}>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
