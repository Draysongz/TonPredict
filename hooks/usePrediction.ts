import { Address, OpenedContract,  toNano } from "@ton/core";
import { PredictionFactory } from "@/contract/PredictionFactory";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useEffect, useState } from "react";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function usePredictionFactory() {
  const { sender, userAddress } = useTonConnect();
  const  client  = useTonClient();
 

  const factoryContract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = PredictionFactory.fromAddress(
      Address.parse("kQBjWj2YlJtF4J3KQQRuC4V8khXMzfZ37xaOhQTgQ3uWQ1_W")
    );

    return client.open(contract) as OpenedContract<PredictionFactory>;
  }, [client]);

  return {
     createMarket: async (marketId: bigint, creator: Address, resolutionTime: bigint)=>{
        factoryContract?.send(
            sender,
            {
                value: toNano("0.05")
            },
            {
                $$type: "CreatePredictionMarket",
                creator: creator,
                marketId: marketId,
                resolutionTime: resolutionTime
            }
        )
     }
  };
}