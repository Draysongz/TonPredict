"use client";

import { useTonConnectModal, useTonAddress } from "@tonconnect/ui-react";

function truncateAddress(address: string, start = 4, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function WalletButton() {
  const address = useTonAddress();
  const { open } = useTonConnectModal();

  if (address) {
    return (
      <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 border border-slate-200">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-[11px] font-mono text-slate-300">
          {truncateAddress(address)}
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
    >
      Connect Wallet
    </button>
  );
}
