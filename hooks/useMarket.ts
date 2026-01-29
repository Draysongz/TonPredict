import { Address, OpenedContract, toNano, Slice } from "@ton/core";
import { PredictionMarket } from "@/contract/PredictionMarket";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useEffect, useState } from "react";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function usePredictionFactory(marketAddress: string) {
  const { sender, userAddress } = useTonConnect();
  const  client  = useTonClient();
  
  const marketContract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = PredictionMarket.fromAddress(
      Address.parse(marketAddress)
    );

    return client.open(contract) as OpenedContract<PredictionMarket>;
  }, [client]);

  return {
    buyShares: async (nonce: bigint, signature: Slice, payload: Slice, amount: bigint) =>{
        marketContract?.send(
            sender,
            {
                value: amount + toNano("0.1")
            },

            {
                $$type: "BuyShares",
                nonce: nonce,
                signature,
                payload
            }
        )

    },
    sellShares: async(nonce: bigint, signature: Slice, payload: Slice, amount: bigint)=>{
        marketContract?.send(
            sender,
            {
                value: toNano("0.1")
            },
            {
                $$type: "SellShares",
                nonce,
                signature,
                payload
            }
        )
    },
    claimWinnings: async(nonce: bigint, signature: Slice, payload: Slice)=>{
        marketContract?.send(
            sender,
            {
                value: toNano("0.1")
            },
            {
                $$type: "ClaimWinnings",
                nonce,
                signature,
                payload
            }
        )
    },
    withdrawTon : async(nonce: bigint, signature: Slice, payload: Slice)=>{
        marketContract?.send(
            sender,
            {
                value: toNano("0.1")
            },
            {
                $$type: "WithdrawTon",
                nonce,
                signature,
                payload
            }
        )
    },
    pauseMarket:  async()=>{
        marketContract?.send(
            sender,
            {
                value: toNano("0.05")
            }
            {
                $$type: "PauseMarket"
            }
        )
    },
    resumeMarket:  async()=>{
        marketContract?.send(
            sender,
            {
                value: toNano("0.05")
            }
            {
                $$type: "ResumeMarket"
            }
        )
    },
    setWinningOutcome:  async(winningOutcome: bigint)=>{
        marketContract?.send(
            sender,
            {
                value: toNano("0.05")
            },
            {
                $$type: "SetWinningOutcome",
                winningOutcome
            }
        )
    },
    updateSigner: async(signer: bigint)=>{
        marketContract?.send(
            sender,
            {
                value: toNano("0.05")
            },
            {
                $$type: "UpdateBackendSigner",
                newPubKey: signer
            }
        )
    },
    getMarketInfo: async()=>{
        const marketInfo = marketContract?.getMarketInfo()
        return marketInfo
    },
    getTotalYesShare: async()=>{
        let yesShare = marketContract?.getTotalYesShareCount()
        return yesShare
    },
     getTotalNoShare: async()=>{
        let noShare = marketContract?.getTotalNoShareCount()
        return noShare
    },
    getIsPaused: async()=>{
        let isPaused = marketContract?.getIsPaused
        return isPaused
    },
    getMarketBalance: async()=>{
        let balance = marketContract?.getBalance()
        return balance
    },
    getIsNonceUsed: async()=>{
        let isNonceUsed= marketContract?.getIsNonceUsed()
        return isNonceUsed
    },
    getStartTime: async()=>{
        let startTime= marketContract?.getGetStartTime()
        return startTime
    }
  };
}