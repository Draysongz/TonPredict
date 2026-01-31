"use client";

import { useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";
import { useGetMarket, useGetQuote } from "@/lib/api";
import { WalletButton } from "@/app/components/WalletButton";
import { useTonConnect } from "@/hooks/useTonConnect";

// Helper function to format time remaining
function formatTimeRemaining(closingTime: Date): string {
  const now = new Date();
  const diff = new Date(closingTime).getTime() - now.getTime();
  
  if (diff <= 0) return "Market Ended";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h ${minutes}m remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
}

export default function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { data: marketResponse, isLoading, error } = useGetMarket(id);
  
  const market = marketResponse?.data;

  // Trading state
  const [selectedOutcome, setSelectedOutcome] = useState<number>(0);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<string>('');
  const [expectedShares, setExpectedShares] = useState<number>(0);
  const [averagePrice, setAveragePrice] = useState<number>(0);
  const [potentialReturn, setPotentialReturn] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const {userAddress}= useTonConnect()

  // Get quote mutation
  const getQuoteMutation = useGetQuote();

  // Calculate expected output when amount or outcome changes
  useEffect(() => {
    if (!market || !amount || parseFloat(amount) <= 0) {
      setExpectedShares(0);
      setAveragePrice(0);
      setPotentialReturn(0);
      return;
    }

    const calculateShares = async () => {
      setIsCalculating(true);
      try {
        // User enters amount of shares they want to buy
        const sharesWanted = parseFloat(amount);
        
        // Convert shares to base unit (shares * 1e9 for precision)
        const sharesInBaseUnit = Math.floor(sharesWanted * 1e9).toString();

        // Call backend quote API
        const quoteRequest = {
          userAddress: userAddress, // TODO: Get from wallet
          side: tradeType,
          outcome: selectedOutcome === 0 ? 0x02 : 0x01, // 0x02 for YES, 0x01 for NO
          amount: sharesInBaseUnit, // Amount of shares in base unit
        };

        const quote = await getQuoteMutation.mutateAsync({
          marketId: market._id,
          request: quoteRequest,
        });

        // Parse the response
        const pricePerShare = parseFloat(quote.pricePerShare) / 1e9; // Convert from nanoTON
        const totalCost = parseFloat(quote.totalCost) / 1e9; // Convert from nanoTON
        const maxReturn = sharesWanted - totalCost; // If this outcome wins, you get sharesWanted TON back
        
        setExpectedShares(sharesWanted);
        setAveragePrice(pricePerShare);
        setPotentialReturn(maxReturn);
      } catch (error) {
        console.error('Error calculating shares:', error);
        // Fallback to simplified calculation on error
        const sharesWanted = parseFloat(amount);
        const probability = selectedOutcome === 0 
          ? (market.impliedProbability || 0.5) 
          : (1 - (market.impliedProbability || 0.5));
        
        const estimatedCost = sharesWanted * probability;
        const avgPrice = probability;
        const maxReturn = sharesWanted - estimatedCost;
        
        setExpectedShares(sharesWanted);
        setAveragePrice(avgPrice);
        setPotentialReturn(maxReturn);
      } finally {
        setIsCalculating(false);
      }
    };

    const debounce = setTimeout(calculateShares, 500);
    return () => clearTimeout(debounce);
  }, [amount, selectedOutcome, market, tradeType, getQuoteMutation]);

  const handleMaxClick = () => {
    // TODO: Get actual wallet balance
    setAmount('0');
  };

  const handleTrade = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!market) {
      alert('Market data not available');
      return;
    }
    
    // TODO: Implement actual trade logic with wallet connection
    console.log('Trade:', {
      marketId: market._id,
      outcome: selectedOutcome,
      type: tradeType,
      amount: parseFloat(amount),
      expectedShares,
    });
    
    alert('Please connect your wallet to trade. Trading functionality will be enabled once wallet is connected.');
  };

  if (isLoading) {
    return (
      <div className="bg-background-dark text-slate-900 min-h-screen pb-24">
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between bg-background-dark/80 backdrop-blur-md">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full glassmorphic"
          >
            <span className="material-icons-round text-primary">arrow_back_ios_new</span>
          </button>
        </header>
        <main className="px-5 space-y-6 pt-20">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-48 bg-slate-200 rounded-3xl"></div>
            <div className="h-32 bg-slate-200 rounded-3xl"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !market) {
    return (
      <div className="bg-background-dark text-slate-900 min-h-screen pb-24 flex items-center justify-center">
        <div className="text-center px-5">
          <span className="material-icons-round text-6xl text-red-500 mb-4 block">error</span>
          <h2 className="text-2xl font-bold mb-2">Market Not Found</h2>
          <p className="text-slate-600 mb-6">This market doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-dark text-slate-900 min-h-screen pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between bg-background-dark/80 backdrop-blur-md">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full glassmorphic"
        >
          <span className="material-icons-round text-primary">arrow_back_ios_new</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphic">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300">{market.resolved ? 'Resolved' : 'Live Market'}</span>
          </div>
          <WalletButton />
          <button className="w-10 h-10 flex items-center justify-center rounded-full glassmorphic">
            <span className="material-icons-round text-primary">share</span>
          </button>
        </div>
      </header>

      <main className="px-4 pt-20 pb-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <div className="glassmorphic rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-1 bg-primary/10 border border-primary/20 rounded-md">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Market #{market.contractMarketId}</span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(market.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-slate-900 mb-3">
                    {market.question}
                  </h1>
                  {!market.resolved && (
                    <p className="text-sm text-slate-500">{formatTimeRemaining(market.closingTime)}</p>
                  )}
                  {market.resolved && market.winningOutcome !== undefined && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <span className="material-icons-round text-emerald-600">check_circle</span>
                      <span className="text-sm font-semibold text-emerald-700">
                        Resolved: {market.outcomes[market.winningOutcome]} Won
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price Chart Card */}
            <div className="glassmorphic rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Market Probability</h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-lg glassmorphic text-slate-600 hover:bg-white/40 transition-colors">
                    1H
                  </button>
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 text-primary border border-primary/20">
                    24H
                  </button>
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-lg glassmorphic text-slate-600 hover:bg-white/40 transition-colors">
                    7D
                  </button>
                  <button className="px-3 py-1.5 text-xs font-semibold rounded-lg glassmorphic text-slate-600 hover:bg-white/40 transition-colors">
                    ALL
                  </button>
                </div>
              </div>

              {/* Probability Display */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <div className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">{market.outcomes[0]}</div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    {market.impliedProbability ? `${(market.impliedProbability * 100).toFixed(1)}%` : '50.0%'}
                  </div>
                  <div className="text-xs text-slate-500">Current Probability</div>
                </div>
                <div className="p-4 rounded-2xl glassmorphic border border-slate-300">
                  <div className="text-xs text-slate-600 font-bold mb-1 uppercase tracking-wider">{market.outcomes[1]}</div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    {market.impliedProbability ? `${((1 - market.impliedProbability) * 100).toFixed(1)}%` : '50.0%'}
                  </div>
                  <div className="text-xs text-slate-500">Current Probability</div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-64 rounded-2xl bg-white/5 border border-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <span className="material-icons-round text-5xl text-slate-300 mb-2 block">show_chart</span>
                  <p className="text-sm text-slate-400">Price history chart coming soon</p>
                </div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glassmorphic rounded-2xl p-4">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Volume</div>
                <div className="text-xl font-bold text-slate-900">
                  {market.statistics?.totalVolume ? `${Number(market.statistics.totalVolume).toLocaleString()} TON` : '0 TON'}
                </div>
              </div>
              <div className="glassmorphic rounded-2xl p-4">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Liquidity</div>
                <div className="text-xl font-bold text-slate-900">{market.bParam} TON</div>
              </div>
              <div className="glassmorphic rounded-2xl p-4">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Total Shares</div>
                <div className="text-xl font-bold text-slate-900">
                  {market.statistics?.totalShares ? Number(market.statistics.totalShares).toLocaleString() : '0'}
                </div>
              </div>
              <div className="glassmorphic rounded-2xl p-4">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Traders</div>
                <div className="text-xl font-bold text-slate-900">0</div>
              </div>
            </div>

            {/* Market Details */}
            <div className="glassmorphic rounded-3xl p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Market Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-sm text-slate-600">End Date</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {new Date(market.closingTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-sm text-slate-600">Contract Address</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(market.address);
                      alert('Address copied!');
                    }}
                    className="flex items-center gap-2 text-sm font-mono text-primary hover:text-primary/80 transition-colors"
                  >
                    {market.address.slice(0, 6)}...{market.address.slice(-4)}
                    <span className="material-icons-round text-sm">content_copy</span>
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-600">Resolution Source</span>
                  <span className="text-sm font-semibold text-primary">On-Chain Oracle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trading Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trade Card */}
            <div className="glassmorphic rounded-3xl p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Place Trade</h2>
              
              {/* Buy/Sell Tabs */}
              <div className="flex gap-2 mb-6">
                <button 
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2.5 px-4 rounded-2xl font-bold text-sm transition-all ${
                    tradeType === 'buy'
                      ? 'bg-primary/10 border border-primary/20 text-primary'
                      : 'glassmorphic text-slate-600 hover:bg-white/40'
                  }`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2.5 px-4 rounded-2xl font-bold text-sm transition-all ${
                    tradeType === 'sell'
                      ? 'bg-primary/10 border border-primary/20 text-primary'
                      : 'glassmorphic text-slate-600 hover:bg-white/40'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Outcome Selection */}
              <div className="space-y-3 mb-6">
                <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Select Outcome</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSelectedOutcome(0)}
                    className={`p-4 rounded-2xl text-left transition-all ${
                      selectedOutcome === 0
                        ? 'bg-primary/10 border-2 border-primary/50 hover:border-primary'
                        : 'glassmorphic border-2 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <div className={`text-xs font-bold mb-1 ${selectedOutcome === 0 ? 'text-primary' : 'text-slate-600'}`}>
                      {market.outcomes[0]}
                    </div>
                    <div className={`text-2xl font-bold ${selectedOutcome === 0 ? 'text-slate-900' : 'text-slate-900'}`}>
                      {market.impliedProbability ? `${(market.impliedProbability * 100).toFixed(0)}%` : '50%'}
                    </div>
                  </button>
                  <button 
                    onClick={() => setSelectedOutcome(1)}
                    className={`p-4 rounded-2xl text-left transition-all ${
                      selectedOutcome === 1
                        ? 'bg-primary/10 border-2 border-primary/50 hover:border-primary'
                        : 'glassmorphic border-2 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <div className={`text-xs font-bold mb-1 ${selectedOutcome === 1 ? 'text-primary' : 'text-slate-600'}`}>
                      {market.outcomes[1]}
                    </div>
                    <div className={`text-2xl font-bold ${selectedOutcome === 1 ? 'text-slate-900' : 'text-slate-900'}`}>
                      {market.impliedProbability ? `${((1 - market.impliedProbability) * 100).toFixed(0)}%` : '50%'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-3 mb-6">
                <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Number of Shares
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 bg-white/5 border border-slate-300 rounded-2xl text-lg font-bold text-slate-900 focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400"
                  />
                  <button 
                    onClick={handleMaxClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    Max
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Each share pays 1 TON if correct</span>
                  <span>Balance: 0 shares</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="p-4 rounded-2xl glassmorphic border border-slate-300 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Shares to Buy</span>
                  <span className="text-sm font-bold text-slate-900">
                    {isCalculating ? '...' : expectedShares > 0 ? expectedShares.toFixed(2) : '0.00'}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Cost (Total)</span>
                  <span className="text-sm font-bold text-slate-900">
                    {isCalculating ? '...' : averagePrice > 0 && expectedShares > 0 ? `${(averagePrice * expectedShares).toFixed(4)} TON` : '0.00 TON'}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Price per Share</span>
                  <span className="text-sm font-bold text-slate-900">
                    {isCalculating ? '...' : averagePrice > 0 ? `${averagePrice.toFixed(4)} TON` : '0.00 TON'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">Potential Profit (if wins)</span>
                  <span className="text-sm font-bold text-primary">
                    {isCalculating ? '...' : potentialReturn > 0 ? `+${potentialReturn.toFixed(2)} TON` : '+0.00 TON'}
                  </span>
                </div>
              </div>

              {/* Trade Button */}
              <button 
                onClick={handleTrade}
                disabled={!amount || parseFloat(amount) <= 0 || isCalculating}
                className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 transition-all font-black text-white flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-icons-round">shopping_cart</span>
                {tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
              </button>

              <p className="text-xs text-center text-slate-500 mt-4">
                Connect wallet to start trading
              </p>
            </div>

            {/* Quick Stats */}
            <div className="glassmorphic rounded-3xl p-6">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-slate-500">Your Position</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Shares Owned</span>
                  <span className="text-sm font-bold text-slate-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Total Invested</span>
                  <span className="text-sm font-bold text-slate-900">0 TON</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Current Value</span>
                  <span className="text-sm font-bold text-slate-900">0 TON</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-xs text-slate-500">Profit/Loss</span>
                  <span className="text-sm font-bold text-slate-600">0 TON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
