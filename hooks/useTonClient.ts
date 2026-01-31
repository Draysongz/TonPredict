import { TonClient4 } from "@ton/ton";
import { useMemo } from "react";

// Change to testnet if your factory contract is deployed there
const MAINNET = "https://mainnet-v4.tonhubapi.com";
const TESTNET = "https://testnet-v4.tonhubapi.com";

// TODO: Set this to TESTNET if your contract is on testnet
const ENDPOINT = TESTNET;  // Change to MAINNET if on mainnet


export function useTonClient() {
  const client = useMemo(() => {
    return new TonClient4({
      endpoint: ENDPOINT,
    });
  }, []);

  return client;
}
