"use client";

import { WalletButton } from "@/app/components/WalletButton";

type AdminHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 sticky top-0 z-40">
      <div className="pl-12 lg:pl-0">
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs lg:text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
        {action}
        <WalletButton />
      </div>
    </header>
  );
}
