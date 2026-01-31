# Event Listener for PredictionMarketCreated

This document describes how to listen for the `PredictionMarketCreated` event emitted by the PredictionFactory contract when a new market is deployed.

## Event Structure

```typescript
message(0x4fdaa985) PredictionMarketCreated {
    marketAddress: Address;
    creator: Address;
    resolutionTime: Int;
}
```

**Op Code**: `1339730309` (hex: `0x4fdaa985`)

## Usage

### 1. Listen for Market Creation Events

```typescript
import { listenForMarketCreated } from '@/lib/eventListener';
import { useTonClient } from '@/hooks/useTonClient';

const client = useTonClient();
const factoryAddress = "kQBjWj2YlJtF4J3KQQRuC4V8khXMzfZ37xaOhQTgQ3uWQ1_W";

// Get the last 10 market creation events
const events = await listenForMarketCreated(factoryAddress, client, 10);

events.forEach(event => {
  console.log('Market Address:', event.data.marketAddress.toString());
  console.log('Creator:', event.data.creator.toString());
  console.log('Resolution Time:', event.data.resolutionTime.toString());
});
```

### 2. Wait for a Specific Market Creation

```typescript
import { waitForMarketCreated } from '@/lib/eventListener';

// Wait for market created by a specific creator
const marketEvent = await waitForMarketCreated(
  factoryAddress,
  client,
  creatorAddress, // Expected creator address
  15, // Max 15 attempts (15 * 3s = 45s total)
  3000 // 3 seconds between attempts
);

if (marketEvent) {
  const contractAddress = marketEvent.marketAddress.toString();
  console.log('Market deployed at:', contractAddress);
} else {
  console.error('Market creation event not found');
}
```

### 3. Get Latest Market Address

```typescript
import { getLatestMarketAddress } from '@/lib/eventListener';

// Get the most recent market address
const latestMarketAddress = await getLatestMarketAddress(factoryAddress, client);

if (latestMarketAddress) {
  console.log('Latest market:', latestMarketAddress);
}
```

## Implementation in Deploy Page

The deploy page uses `waitForMarketCreated` to get the actual contract address after deployment:

```typescript
// 1. Deploy contract to blockchain
await deployContract(marketId, creator, resolutionDuration);

// 2. Wait for the PredictionMarketCreated event
const marketCreatedEvent = await waitForMarketCreated(
  FACTORY_ADDRESS,
  client,
  userAddress,
  15, // Max attempts
  3000 // Delay between attempts
);

if (!marketCreatedEvent) {
  throw new Error("Failed to get market creation event");
}

// 3. Get the actual contract address from the event
const contractAddress = marketCreatedEvent.marketAddress.toString();

// 4. Register in backend with real address
await registerMarket({
  address: contractAddress,
  contractMarketId: marketId,
  question,
  outcomes: ["Yes", "No"],
  liquidityParameter,
  closingTime,
});
```

## API Reference

### `listenForMarketCreated(factoryAddress, client, limit)`

Fetches recent transactions from the factory contract and extracts `PredictionMarketCreated` events.

**Parameters:**
- `factoryAddress`: string - Factory contract address
- `client`: TonClient4 - TON client instance
- `limit`: number - Number of transactions to check (default: 10)

**Returns:** `Promise<EmitLogEvent[]>` - Array of market creation events

### `waitForMarketCreated(factoryAddress, client, expectedCreator, maxAttempts, delayMs)`

Polls the blockchain for a market creation event matching the expected creator.

**Parameters:**
- `factoryAddress`: string - Factory contract address
- `client`: TonClient4 - TON client instance
- `expectedCreator`: string - Creator address to match
- `maxAttempts`: number - Maximum polling attempts (default: 10)
- `delayMs`: number - Delay between attempts in ms (default: 2000)

**Returns:** `Promise<PredictionMarketCreated | null>` - Event data or null

### `getLatestMarketAddress(factoryAddress, client)`

Gets the market address from the most recent creation event.

**Parameters:**
- `factoryAddress`: string - Factory contract address
- `client`: TonClient4 - TON client instance

**Returns:** `Promise<string | null>` - Market address or null

## Event Flow

```
User clicks "Deploy Market"
         ↓
Frontend sends transaction to blockchain
         ↓
Factory contract deploys new PredictionMarket
         ↓
Factory emits PredictionMarketCreated event
         ↓
Event listener polls for event
         ↓
Event found, extract marketAddress
         ↓
Register market in backend with real address
```

## Error Handling

The event listener includes several safeguards:

1. **Retry Logic**: `waitForMarketCreated` retries up to `maxAttempts` times
2. **Timeout**: Total wait time = `maxAttempts * delayMs`
3. **Error Logging**: All errors are logged to console
4. **Graceful Degradation**: Returns `null` if event not found instead of throwing

## Best Practices

1. **Set Reasonable Timeouts**: Default of 15 attempts × 3s = 45s total
2. **Match Creator Address**: Ensure you're listening for the correct market
3. **Handle Null Returns**: Always check if `waitForMarketCreated` returns null
4. **Log Events**: Keep console logs for debugging deployment issues
5. **Show Loading States**: Display progress to users during polling

## TonClient4 vs TonClient

This implementation uses `TonClient4` from `@ton/ton` which is the v4 API:

```typescript
import { TonClient4 } from "@ton/ton";

const client = new TonClient4({
  endpoint: "https://mainnet-v4.tonhubapi.com"
});
```

Key differences:
- Uses `getAccountTransactions(address, lt, hash)` instead of `getTransactions`
- Transaction structure includes `tx.outMessages` as a Map
- Message bodies are `Cell` instances directly

## Troubleshooting

**Event not found:**
- Check factory contract address is correct
- Verify transaction was successful on blockchain
- Increase `maxAttempts` or `delayMs`
- Check creator address matches exactly

**Decode errors:**
- Verify op code matches: `1339730309`
- Check contract emits events correctly
- Ensure contract code is up to date

**Type errors:**
- Ensure using `TonClient4` not `TonClient`
- Convert lt to BigInt: `BigInt(account.account.last.lt)`
- Message body is already a `Cell` instance
