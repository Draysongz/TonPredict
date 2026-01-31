import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface CreateMarketPayload {
  address: string;
  contractMarketId: number;
  question: string;
  outcomes: string[];
  liquidityParameter: number;
  closingTime: Date;
}

export interface Market {
  _id: string;
  address: string;
  contractMarketId: number;
  question: string;
  outcomes: string[];
  bParam: number;
  qYes: number;
  qNo: number;
  closingTime: Date;
  resolved: boolean;
  winningOutcome?: number;
  createdAt: Date;
  updatedAt: Date;
  impliedProbability?: number;
  statistics?: {
    totalShares: string;
    totalVolume: string;
    currentPrice: number;
  };
}

export interface GetMarketsResponse {
  success: boolean;
  data: Market[];
}

export interface GetMarketResponse {
  success: boolean;
  data: Market;
}

export interface CreateMarketResponse {
  success: boolean;
  data: Market;
}

export interface QuoteRequest {
  userAddress: string;
  side: 'buy' | 'sell';
  outcome: number; // 0x01 for NO, 0x02 for YES
  amount: string; // Amount in nanoTON as string
}

export interface QuoteResponse {
  payload: any;
  signature: any;
  pricePerShare: string;
  totalCost: string;
  nonce: number;
  impliedProbability: number;
}

// API Functions
export const marketApi = {
  // Get all markets
  getMarkets: async (): Promise<GetMarketsResponse> => {
    const response = await apiClient.get('/markets');
    return response.data;
  },

  // Get market by ID
  getMarket: async (id: string): Promise<GetMarketResponse> => {
    const response = await apiClient.get(`/markets/${id}`);
    return response.data;
  },

  // Create market (after blockchain deployment)
  createMarket: async (payload: CreateMarketPayload): Promise<CreateMarketResponse> => {
    const response = await apiClient.post('/markets', payload);
    return response.data;
  },

  // Resolve market
  resolveMarket: async (id: string, winningOutcome: number) => {
    const response = await apiClient.post(`/markets/${id}/resolve`, { winningOutcome });
    return response.data;
  },

  // Get quote for trade
  getQuote: async (marketId: string, request: QuoteRequest): Promise<QuoteResponse> => {
    const response = await apiClient.post(`/markets/${marketId}/quote`, request);
    return response.data;
  },
};

// React Query Hooks

// Get all markets
export const useGetMarkets = () => {
  return useQuery({
    queryKey: ['markets'],
    queryFn: marketApi.getMarkets,
  });
};

// Get single market
export const useGetMarket = (id: string) => {
  return useQuery({
    queryKey: ['market', id],
    queryFn: () => marketApi.getMarket(id),
    enabled: !!id,
  });
};

// Create market mutation
export const useCreateMarket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: marketApi.createMarket,
    onSuccess: () => {
      // Invalidate markets list to refetch
      queryClient.invalidateQueries({ queryKey: ['markets'] });
    },
  });
};

// Resolve market mutation
export const useResolveMarket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, winningOutcome }: { id: string; winningOutcome: number }) =>
      marketApi.resolveMarket(id, winningOutcome),
    onSuccess: (_, variables) => {
      // Invalidate specific market and markets list
      queryClient.invalidateQueries({ queryKey: ['market', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['markets'] });
    },
  });
};

// Get trade quote mutation
export const useGetQuote = () => {
  return useMutation({
    mutationFn: ({ marketId, request }: { marketId: string; request: QuoteRequest }) =>
      marketApi.getQuote(marketId, request),
  });
};

// Utility: Generate unique market ID
export const generateMarketId = (): number => {
  // Use timestamp + random for uniqueness
  return Date.now() + Math.floor(Math.random() * 1000);
};
