"use client";

import { useTonConnect } from "@/hooks/useTonConnect";
import { TonConnectButton } from "@tonconnect/ui-react";

function truncateAddress(address: string, start = 4, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function WalletButton() {
 

  

  return (
     <>
     <TonConnectButton />
     </>
  );
}
