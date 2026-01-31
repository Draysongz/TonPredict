# Market Creation Implementation

## Overview
This document explains the complete market creation flow, integrating the frontend, blockchain, and backend.

## Architecture

### Components Involved

1. **Frontend (Next.js)**
   - `/app/admin/deploy/page.tsx` - Admin interface for market creation
   - `/hooks/usePrediction.ts` - React hook for blockchain interactions

2. **Blockchain (TON)**
   - `PredictionFactory` contract - Deploys new market contracts
   - `PredictionMarket` contract - Individual market instance

3. **Backend (Express + MongoDB)**
   - `/predict-backend/src/routes/markets.routes.ts` - API endpoints
   - `/predict-backend/src/services/market-state.service.ts` - Business logic
   - `/predict-backend/src/models/Market.ts` - Database schema

## Market Creation Flow

### Step 1: User Input (Frontend)
The admin fills out the deployment form with:
- **Market Question**: The prediction question (e.g., "Will TON hit $10 before Jan 2025?")
- **Market ID**: Unique integer identifier
- **Resolution Time**: Duration (value + unit) before market can be resolved
- **Liquidity Parameter (b)**: LMSR parameter for price stability (default: 100)

### Step 2: Blockchain Deployment
```typescript
// Convert resolution time to Unix timestamp
const resolutionTimeSeconds = convertToSeconds(resolutionNum, resolutionUnit);
const resolutionTimestamp = Math.floor(Date.now() / 1000) + resolutionTimeSeconds;

// Deploy to blockchain via Factory contract
await createMarket(
  BigInt(marketId),
  Address.parse(walletAddress),
  BigInt(resolutionTimestamp)
);
```

The `usePredictionFactory` hook sends a transaction to the Factory contract:
```typescript
factoryContract?.send(
  sender,
  { value: toNano("0.05") },
  {
    $$type: "CreatePredictionMarket",
    creator: creator,
    marketId: marketId,
    resolutionTime: resolutionTime
  }
)
```

### Step 3: Backend Registration
After blockchain deployment, the frontend registers the market in the backend:

```typescript
const response = await fetch('/api/v1/markets', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    question,
    outcomes: ["Yes", "No"],
    liquidityParameter: liquidityNum,
    closingTime: closingTime.toISOString(),
    marketId: marketIdNum,
  }),
});
```

### Step 4: Backend Processing

#### Validation
The backend validates:
- Question is non-empty string
- Outcomes array has at least 2 items
- Liquidity parameter is positive number
- Closing time is in the future
- Market ID is positive integer
- No duplicate market addresses

#### Database Storage
```typescript
const market = await MarketStateService.createMarket(
  marketAddress,
  question,
  outcomes,
  liquidityParameter,
  new Date(closingTime),
);
```

Creates a MongoDB document with:
- `address`: TON contract address
- `question`: Market question
- `outcomes`: ["Yes", "No"]
- `bParam`: Liquidity parameter
- `qYes`: Initial YES shares (0)
- `qNo`: Initial NO shares (0)
- `closingTime`: When market expires
- `resolved`: false
- `winningOutcome`: null (until resolved)

## Data Models

### Frontend State
```typescript
{
  marketId: string;           // User input
  question: string;           // User input
  resolutionValue: string;    // User input
  resolutionUnit: string;     // "seconds" | "minutes" | "hours" | "days"
  liquidityParameter: string; // User input (default: "100")
  isDeploying: boolean;       // Loading state
  deploymentStatus: {
    type: "success" | "error" | null;
    message: string;
  }
}
```

### Backend Model (MongoDB)
```typescript
interface IMarket {
  address: string;          // TON Smart Contract Address
  question: string;         // Market question
  outcomes: string[];       // ["Yes", "No"]
  bParam: number;           // LMSR Liquidity parameter
  qYes: bigint;            // Current YES shares
  qNo: bigint;             // Current NO shares
  closingTime: Date;        // Market closing time
  resolved: boolean;        // Resolution status
  winningOutcome?: number;  // 0 or 1 (if resolved)
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### POST /api/v1/markets
Creates a new prediction market.

**Request Body:**
```json
{
  "question": "Will TON hit $10 before Jan 2025?",
  "outcomes": ["Yes", "No"],
  "liquidityParameter": 100,
  "closingTime": "2025-01-01T00:00:00.000Z",
  "marketId": 123
}
```

**Response (201 Created):**
```json
{
  "marketId": "507f1f77bcf86cd799439011",
  "contractMarketId": 123,
  "address": "EQD0000000123abcdef",
  "question": "Will TON hit $10 before Jan 2025?",
  "outcomes": ["Yes", "No"],
  "liquidityParameter": 100,
  "closingTime": "2025-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400`: Invalid input (missing fields, invalid values)
- `409`: Market already exists
- `500`: Server error

### GET /api/v1/markets
Lists all active markets.

**Response (200 OK):**
```json
{
  "markets": [
    {
      "id": "507f1f77bcf86cd799439011",
      "address": "EQD0000000123abcdef",
      "question": "Will TON hit $10 before Jan 2025?",
      "outcomes": ["Yes", "No"],
      "liquidityParameter": 100,
      "closingTime": "2025-01-01T00:00:00.000Z",
      "impliedProbability": 0.5,
      "currentShares": {
        "yes": "0",
        "no": "0"
      }
    }
  ],
  "total": 1
}
```

### GET /api/v1/markets/:marketId
Gets details for a specific market.

## Configuration

### Frontend Environment Variables
Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### Backend Environment Variables
`.env` in `predict-backend/`:
```bash
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ton-predict

# Redis (optional)
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:3000

# Admin
ADMIN_API_KEY=your_secure_admin_key
```

## Testing the Flow

### 1. Start Backend
```bash
cd predict-backend
npm run dev
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Deploy a Market
1. Navigate to `/admin/deploy`
2. Connect wallet (TON wallet required)
3. Fill in:
   - Question: "Will TON hit $10 before Jan 2025?"
   - Market ID: 1001
   - Resolution Time: 30 days
   - Liquidity: 100
4. Click "Deploy Market"

### 4. Verify Deployment
- Check browser console for logs
- Check backend logs for market creation
- Query `GET /api/v1/markets` to see the new market

## Error Handling

### Frontend Errors
- **Wallet Not Connected**: Prompts user to connect wallet
- **Invalid Input**: Validates all fields before submission
- **Blockchain Error**: Catches and displays transaction failures
- **Backend Error**: Shows server error messages

### Backend Errors
- **Validation Errors**: Returns 400 with specific error message
- **Duplicate Market**: Returns 409 if address exists
- **Database Errors**: Returns 500 with generic message, logs details

## Next Steps

1. **Contract Address Resolution**: Currently uses placeholder address. Implement proper address derivation from Factory contract.

2. **Transaction Confirmation**: Add polling to confirm blockchain transaction before backend registration.

3. **Market Discovery**: Implement event listeners to auto-discover deployed markets from blockchain.

4. **Market Metadata**: Store additional metadata (creator, tags, categories).

5. **Admin Authorization**: Add API key requirement for market creation endpoint.

## Security Considerations

1. **Wallet Authentication**: Only connected wallet can deploy
2. **Transaction Signing**: User must approve blockchain transaction
3. **Backend Validation**: All inputs validated server-side
4. **Unique Market IDs**: Prevents duplicate markets
5. **Future Timestamps**: Ensures markets can't close immediately

## LMSR Integration

The backend uses Logarithmic Market Scoring Rule (LMSR) for automated market making:
- **b parameter**: Controls liquidity (higher = more stable prices)
- **Initial state**: Both YES and NO shares start at 0
- **Price calculation**: Based on current share quantities
- **Trading**: Backend calculates new share quantities after trades

## Useful Commands

```bash
# Backend
cd predict-backend
npm run dev          # Start development server
npm run build        # Build for production
npm run start:prod   # Run production build

# Frontend
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run start        # Run production build

# Database
mongod               # Start MongoDB
mongo                # MongoDB shell
```

## Troubleshooting

### "Failed to deploy market"
- Check wallet is connected
- Ensure sufficient TON balance (>0.05 TON)
- Verify backend is running
- Check browser console for details

### "Market already exists"
- Use a different Market ID
- Check existing markets in database

### Backend not responding
- Verify MongoDB is running
- Check `MONGODB_URI` in `.env`
- Ensure port 3001 is available

## Resources

- [TON Documentation](https://docs.ton.org/)
- [LMSR Paper](https://hanson.gmu.edu/mktscore.pdf)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Next.js Documentation](https://nextjs.org/docs)
