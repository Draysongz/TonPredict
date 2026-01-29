import { TonClient4 } from "@ton/ton";

const MAINNET = "https://mainnet-v4.tonhubapi.com";


export function useTonClient() {
  const client = new TonClient4({
    endpoint: MAINNET,
  });

  return client;
}
