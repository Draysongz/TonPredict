"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "../components/AdminHeader";
import { Address } from "@ton/core";
import { usePredictionFactory } from "@/hooks/usePrediction";
import { useTonConnect } from "@/hooks/useTonConnect";
import { useCreateMarket, generateMarketId } from "@/lib/api";
import { waitForMarketCreated } from "@/lib/eventListener";

function truncateAddress(address: string, start = 4, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

// Factory contract address
const FACTORY_ADDRESS = "kQBjWj2YlJtF4J3KQQRuC4V8khXMzfZ37xaOhQTgQ3uWQ1_W";

export default function DeployNewMarketPage() {
  const {connected, userAddress} = useTonConnect()
  const { createMarket: deployContract } = usePredictionFactory();
  const { mutateAsync: registerMarket } = useCreateMarket();
  
  // Form state
  const [marketId, setMarketId] = useState<number>(0);
  const [question, setQuestion] = useState("");
  const [resolutionValue, setResolutionValue] = useState("");
  const [resolutionUnit, setResolutionUnit] = useState<"seconds" | "minutes" | "hours" | "days">("days");
  const [liquidityParameter, setLiquidityParameter] = useState("100");
  
  // UI state
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
    contractAddress?: string;
  }>({ type: null, message: "" });

  // Auto-generate unique marketId on mount
  useEffect(() => {
    setMarketId(generateMarketId());
  }, []);

  const creatorDisplay = userAddress ? truncateAddress(userAddress) : "—";

  const convertToSeconds = (value: number, unit: string): number => {
    const multipliers = {
      seconds: 1,
      minutes: 60,
      hours: 3600,
      days: 86400,
    };
    return value * multipliers[unit as keyof typeof multipliers];
  };

  const handleDeployMarket = async () => {
    try {
      // Validation
      if (!userAddress) {
        setDeploymentStatus({
          type: "error",
          message: "Please connect your wallet first",
        });
        return;
      }

      if (!question || !resolutionValue) {
        setDeploymentStatus({
          type: "error",
          message: "Please fill in all required fields",
        });
        return;
      }

      const resolutionNum = parseInt(resolutionValue);
      if (isNaN(resolutionNum) || resolutionNum <= 0) {
        setDeploymentStatus({
          type: "error",
          message: "Resolution time must be a positive number",
        });
        return;
      }

      const liquidityNum = parseFloat(liquidityParameter);
      if (isNaN(liquidityNum) || liquidityNum <= 0) {
        setDeploymentStatus({
          type: "error",
          message: "Liquidity parameter must be a positive number",
        });
        return;
      }

      setIsDeploying(true);
      setDeploymentStatus({ type: null, message: "" });

      // Calculate resolution duration in seconds (not timestamp)
      const resolutionDurationSeconds = convertToSeconds(resolutionNum, resolutionUnit);

      console.log("Step 1: Deploying market to blockchain...", {
        marketId,
        creator: userAddress,
        resolutionDuration: resolutionDurationSeconds,
      });

      // Record deployment timestamp (in seconds) BEFORE deploying
      const deploymentTime = Math.floor(Date.now() / 1000);
      console.log("📅 Deployment timestamp:", deploymentTime, `(${new Date(deploymentTime * 1000).toISOString()})`);

      // Step 1: Deploy contract to blockchain with marketId and duration
      await deployContract(
        BigInt(marketId),
        Address.parse(userAddress),
        BigInt(resolutionDurationSeconds)
      );

      // Step 2: Wait for the PredictionMarketCreated event and get the contract address
      console.log("Step 2: Waiting for blockchain confirmation and market creation event...");
      console.log("User address (expected creator):", userAddress);
      console.log("Factory address:", FACTORY_ADDRESS);

      const marketCreatedEvent = await waitForMarketCreated(
        FACTORY_ADDRESS,
        userAddress,
        deploymentTime, // Pass deployment timestamp
        15, // Max 15 attempts
        3000 // 3 seconds between attempts
      );

      if (!marketCreatedEvent) {
        throw new Error("Failed to get market creation event. Transaction may have failed or timed out.");
      }

      const contractAddress = marketCreatedEvent.marketAddress.toString();
      
      console.log("✅ Market created successfully!", {
        contractAddress,
        creator: marketCreatedEvent.creator.toString(),
        resolutionTime: marketCreatedEvent.resolutionTime.toString(),
      });

      console.log("Step 3: Registering market in backend...", {
        address: contractAddress,
        contractMarketId: marketId,
      });
      
      // Calculate closing time (current time + duration)
      const closingTime = new Date(Date.now() + resolutionDurationSeconds * 1000);
      
      // Step 3: Register market in backend with actual contract address
      const response = await registerMarket({
        address: contractAddress,
        contractMarketId: marketId,
        question,
        outcomes: ["Yes", "No"],
        liquidityParameter: liquidityNum,
        closingTime,
      });

      console.log("✅ Market registered in backend:", response);

      setDeploymentStatus({
        type: "success",
        message: `Market deployed successfully!`,
        contractAddress: contractAddress,
      });

      // Reset form (generate new marketId for next deployment)
      setMarketId(generateMarketId());
      setQuestion("");
      setResolutionValue("");
      setLiquidityParameter("100");

    } catch (error) {
      console.error("Market deployment error:", error);
      setDeploymentStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to deploy market",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="Deploy New Market" subtitle="Create a new prediction market" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex gap-3">
            <span className="material-icons-round text-blue-500 text-2xl">info</span>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Before You Deploy</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Configure and deploy a new prediction market instance through the Factory contract. 
                Market IDs are auto-generated and unique.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Creator Address
            </label>
            <div className="relative">
              <input
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 pr-12 text-sm font-mono text-slate-400 cursor-not-allowed transition-all"
                readOnly
                type="text"
                value={creatorDisplay}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 text-xl">
                lock
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-icons-round text-sm">info</span>
              The administrative wallet that will own this market
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Market ID (Auto-generated)
            </label>
            <div className="relative">
              <input
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 pr-12 text-sm font-mono text-slate-700 cursor-not-allowed transition-all"
                readOnly
                type="text"
                value={marketId}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400 text-xl">
                tag
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-icons-round text-sm">info</span>
              Unique ID auto-generated for this market
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Market Question <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-4 text-sm font-medium transition-all placeholder:text-slate-400 outline-none resize-none"
              placeholder="e.g., Will TON hit $10 before Jan 2025?"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-icons-round text-sm">help_outline</span>
              The question that this market will predict
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Liquidity Parameter (b) <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-4 text-sm font-medium transition-all placeholder:text-slate-400 outline-none"
              placeholder="100"
              type="number"
              min={0.0001}
              step={0.1}
              value={liquidityParameter}
              onChange={(e) => setLiquidityParameter(e.target.value)}
            />
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-icons-round text-sm">info</span>
              LMSR liquidity parameter (higher = more stable prices). Recommended: 100
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              Resolution Duration <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-4 text-sm font-medium transition-all placeholder:text-slate-400 outline-none"
                placeholder="Value"
                type="number"
                min={1}
                value={resolutionValue}
                onChange={(e) => setResolutionValue(e.target.value)}
              />
              <select
                className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-xl px-4 py-4 text-sm font-medium transition-all outline-none cursor-pointer"
                value={resolutionUnit}
                onChange={(e) =>
                  setResolutionUnit(e.target.value as "seconds" | "minutes" | "hours" | "days")
                }
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="material-icons-round text-sm">schedule</span>
              Duration from now until the market can be resolved
            </p>
          </div>

          {/* Status Messages */}
          {deploymentStatus.type && (
            <div
              className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
                deploymentStatus.type === "success"
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span
                className={`material-icons-round text-2xl ${
                  deploymentStatus.type === "success" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {deploymentStatus.type === "success" ? "check_circle" : "error"}
              </span>
              <div className="flex-1">
                <p
                  className={`text-sm font-semibold ${
                    deploymentStatus.type === "success" ? "text-emerald-900" : "text-red-900"
                  }`}
                >
                  {deploymentStatus.message}
                </p>
                {deploymentStatus.contractAddress && (
                  <p className="text-xs font-mono mt-2 text-emerald-700">
                    Contract: {deploymentStatus.contractAddress}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handleDeployMarket}
              disabled={isDeploying || !connected}
              className="w-full bg-linear-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-base hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeploying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <span className="material-icons-round">rocket_launch</span>
                  Deploy Market
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-5 flex gap-3">
          <span className="material-icons-round text-amber-600 text-2xl shrink-0">warning_amber</span>
          <div className="space-y-1">
            <h5 className="text-sm font-bold text-amber-900">Deployment Process</h5>
            <p className="text-sm text-amber-800 leading-relaxed">
              The market will first be deployed to the blockchain, then registered in the backend with the contract address. 
              This ensures the backend has the actual contract address for tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

