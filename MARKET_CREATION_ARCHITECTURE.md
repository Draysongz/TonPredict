# Market Creation Architecture Update

## Overview
This document describes the updated market creation flow that separates blockchain deployment from backend registration.

## Key Changes

### 1. Architecture Flow
**OLD FLOW:**
- Backend generates marketId
- Backend generates fake address
- Frontend calls backend first, then deploys (if at all)

**NEW FLOW:**
1. Frontend auto-generates unique marketId
2. Frontend deploys contract to blockchain with marketId and duration
3. Frontend waits for contract deployment and gets contract address
4. Frontend registers market in backend with actual address and marketId

### 2. Resolution Time Changed to Duration
- **OLD:** Used timestamp (absolute time)
- **NEW:** Uses duration in seconds (relative time)
- Contract stores duration, calculates closing time from deployment time
- Backend calculates closingTime = now + duration

### 3. Centralized API with TanStack Query

#### New Files Created:
- **`/lib/api.ts`**: Centralized API client with:
  - Axios client configuration
  - Type definitions for all API payloads/responses
  - React Query hooks (useGetMarkets, useGetMarket, useCreateMarket, useResolveMarket)
  - Utility function: `generateMarketId()` - generates unique IDs

#### Updated Files:
- **`/app/clientLayout.tsx`**: Added QueryClientProvider wrapper

### 4. Backend Changes

#### Model: `/predict-backend/src/models/Market.ts`
```typescript
interface IMarket {
  address: string;           // Contract address
  contractMarketId: number;  // NEW: Market ID from contract (unique, indexed)
  question: string;
  outcomes: string[];
  bParam: number;
  qYes: number;
  qNo: number;
  closingTime: Date;
  resolved: boolean;
  winningOutcome?: number;
}
```

#### Service: `/predict-backend/src/services/market-state.service.ts`
```typescript
// OLD signature
createMarket(question, outcomes, bParam, closingTime)

// NEW signature
createMarket(address, contractMarketId, question, outcomes, bParam, closingTime)
```

#### Routes: `/predict-backend/src/routes/markets.routes.ts`
**POST /api/v1/markets** now expects:
```json
{
  "address": "EQxxx...",           // Actual contract address
  "contractMarketId": 1234567890,   // Unique market ID
  "question": "Will TON hit $10?",
  "outcomes": ["Yes", "No"],
  "liquidityParameter": 100,
  "closingTime": "2025-01-15T00:00:00Z"
}
```

### 5. Frontend Deploy Page

#### Changes to `/app/admin/deploy/page.tsx`:
1. **Auto-generated Market ID**: 
   - Displayed as read-only field
   - Generated on component mount using `generateMarketId()`
   - Regenerated after successful deployment

2. **Resolution Duration (not timestamp)**:
   - Changed label from "Resolution Time" to "Resolution Duration"
   - Accepts value + unit (seconds/minutes/hours/days)
   - Converts to seconds before sending to contract
   - Calculates closingTime for backend: `now + duration`

3. **Two-step Deployment**:
   ```typescript
   // Step 1: Deploy to blockchain
   await deployContract(marketId, creator, durationSeconds);
   
   // Step 2: Register in backend
   await registerMarket({
     address: contractAddress,
     contractMarketId: marketId,
     question,
     outcomes,
     liquidityParameter,
     closingTime: new Date(now + duration * 1000)
   });
   ```

## Installation

```bash
npm install @tanstack/react-query
```

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
```

## Usage Example

```typescript
import { useCreateMarket, generateMarketId } from '@/lib/api';

function DeployMarket() {
  const [marketId] = useState(generateMarketId());
  const { mutateAsync: registerMarket, isPending } = useCreateMarket();

  const handleDeploy = async () => {
    // 1. Deploy contract
    await deployContract(marketId, creator, duration);
    
    // 2. Register in backend
    const result = await registerMarket({
      address: contractAddress,
      contractMarketId: marketId,
      question: "Will TON hit $10?",
      outcomes: ["Yes", "No"],
      liquidityParameter: 100,
      closingTime: new Date(Date.now() + duration * 1000)
    });
    
    console.log('Deployed:', result.data.address);
  };
}
```

## Data Flow Diagram

```
┌─────────────┐
│   Frontend  │
│  (Deploy)   │
└──────┬──────┘
       │
       │ 1. Generate marketId
       │ 2. Deploy contract (marketId, duration)
       ▼
┌─────────────┐
│  Blockchain │ ──> Returns contract address
│  (TON)      │
└──────┬──────┘
       │
       │ 3. Send address + marketId
       ▼
┌─────────────┐
│   Backend   │ ──> Stores: address, contractMarketId,
│  (Express)  │     question, outcomes, bParam, closingTime
└─────────────┘
```

## Benefits

1. **Accurate Data**: Backend stores actual contract addresses, not generated ones
2. **Unique IDs**: MarketId matches between contract and backend
3. **Better UX**: Duration is more intuitive than timestamps
4. **Type Safety**: TanStack Query provides full TypeScript support
5. **Centralized API**: All API calls in one place with consistent error handling
6. **Automatic Refetch**: React Query handles cache invalidation automatically
7. **Loading States**: Built-in loading/error states with mutations

## TODO

- [ ] Get actual contract address from deployment transaction result (currently using placeholder)
- [ ] Add contract address extraction from TON transaction
- [ ] Implement proper error handling for contract deployment failures
- [ ] Add transaction confirmation polling before backend registration

## Notes

- Market IDs are generated using: `Date.now() + Math.floor(Math.random() * 1000)`
- This ensures uniqueness for concurrent deployments
- Backend validates contractMarketId is a positive integer
- Backend checks for duplicate addresses before insertion
