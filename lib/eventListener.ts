import { Address, Cell } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { 
    PredictionMarketCreated, 
    loadPredictionMarketCreated 
} from "@/contract/PredictionFactory";

// Define the emitted event type
type EmitLogEvent = {
    type: 'PredictionMarketCreated';
    data: PredictionMarketCreated;
};

// Function to decode the PredictionMarketCreated event from a cell
function decodePredictionMarketCreated(cell: Cell): PredictionMarketCreated {
    const slice = cell.beginParse();
    return loadPredictionMarketCreated(slice);
}

// Check event type by reading the header (op code)
function getEventType(cell: Cell): 'PredictionMarketCreated' | 'Unknown' {
    const slice = cell.beginParse();
    const header = slice.loadUint(32);
    
    // PredictionMarketCreated op code is 1339730309 (0x4fdaa985)
    if (header === 1339730309) {
        return 'PredictionMarketCreated';
    } else {
        return 'Unknown';
    }
}

/**
 * Listen for PredictionMarketCreated events from a factory contract
 * @param factoryAddress - The address of the PredictionFactory contract
 * @param startTime - Unix timestamp (seconds) to start looking for events from
 * @param limit - Number of transactions to check (default: 50)
 * @returns Array of PredictionMarketCreated events
 */
export async function listenForMarketCreated(
    factoryAddress: string,
    startTime: number,
    limit: number = 50
): Promise<EmitLogEvent[]> {
    try {
        console.log('🔍 Initializing TON client v4...');
        const client = new TonClient4({
            endpoint: "https://testnet-v4.tonhubapi.com", // Change to mainnet-v4 if needed
        });
        
        console.log('📡 Connected to testnet v4');
        console.log('🏭 Fetching transactions for factory:', factoryAddress);
        
        // Get the latest block
        const lastBlock = await client.getLastBlock();
        console.log('� Latest block seqno:', lastBlock.last.seqno);
        
        // Get account state
        const account = await client.getAccount(lastBlock.last.seqno, Address.parse(factoryAddress));
        
        if (!account.account.last) {
            console.log('⚠️ Account has no transaction history');
            return [];
        }
        
        // Get transactions using getAccountTransactions
        const transactions = await client.getAccountTransactions(
            Address.parse(factoryAddress),
            BigInt(account.account.last.lt),
            Buffer.from(account.account.last.hash, 'base64')
        );

        console.log(`📨 Found ${transactions.length} transactions`);
        console.log(`🕐 Filtering transactions after timestamp: ${startTime} (${new Date(startTime * 1000).toISOString()})`);
        const logs: EmitLogEvent[] = [];
        let count = 0;

        for (const txData of transactions) {
            if (count >= limit) break;
            
            const tx = txData.tx;
            
            // Filter by timestamp - only process transactions after startTime
            const txTimestamp = Number(tx.now);
            if (txTimestamp < startTime) {
                console.log(`⏭️  Skipping old transaction (timestamp: ${txTimestamp}, before start: ${startTime})`);
                count++;
                continue;
            }
            
            if (tx?.outMessages && tx.outMessages.size > 0) {
                console.log(`🔍 Transaction ${count + 1} (timestamp: ${txTimestamp}) has ${tx.outMessages.size} outMessages`);
                
                for (const msg of tx.outMessages.values()) {
                    if (msg.body) {
                        let bodyCell: Cell | undefined;
                        
                        // TonClient4 returns body as Cell directly
                        if (msg.body instanceof Cell) {
                            bodyCell = msg.body;
                        } else {
                            console.log('⚠️ Unknown body type', typeof msg.body);
                        }

                        if (bodyCell) {
                            try {
                                const eventType = getEventType(bodyCell);
                                console.log('📤 Event type detected:', eventType);
                                
                                if (eventType === 'PredictionMarketCreated') {
                                    const decodedEvent = decodePredictionMarketCreated(bodyCell);
                                    console.log('✅ Found PredictionMarketCreated event!', {
                                        marketAddress: decodedEvent.marketAddress.toString(),
                                        creator: decodedEvent.creator.toString(),
                                        resolutionTime: decodedEvent.resolutionTime.toString()
                                    });
                                    logs.push({ 
                                        type: 'PredictionMarketCreated', 
                                        data: decodedEvent 
                                    });
                                }
                            } catch (e) {
                                // Skip invalid messages
                                console.debug('⚠️ Failed to decode message:', e);
                            }
                        }
                    }
                }
            }
            
            count++;
        }

        console.log(`📊 Total PredictionMarketCreated events found: ${logs.length}`);
        return logs;
    } catch (error) {
        console.error('❌ Error listening for market created events:', error);
        throw error;
    }
}

/**
 * Wait for a specific PredictionMarketCreated event after a transaction
 * Polls the blockchain for new events
 * @param factoryAddress - The address of the PredictionFactory contract
 * @param expectedCreator - The creator address to match
 * @param deploymentTime - Unix timestamp (seconds) when deployment started
 * @param maxAttempts - Maximum number of polling attempts (default: 10)
 * @param delayMs - Delay between attempts in milliseconds (default: 2000)
 * @returns The PredictionMarketCreated event or null if not found
 */
export async function waitForMarketCreated(
    factoryAddress: string,
    expectedCreator: string,
    deploymentTime: number,
    maxAttempts: number = 10,
    delayMs: number = 2000
): Promise<PredictionMarketCreated | null> {
    console.log('🔄 Starting to wait for market creation event...');
    console.log('👤 Expected creator:', expectedCreator);
    console.log('🏭 Factory address:', factoryAddress);
    console.log('🕐 Deployment time:', deploymentTime, `(${new Date(deploymentTime * 1000).toISOString()})`);
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        console.log(`🔄 Polling attempt ${attempt + 1}/${maxAttempts}...`);
        
        // Only look for events AFTER the deployment time
        const events = await listenForMarketCreated(factoryAddress, deploymentTime, 50);
        
        console.log(`📋 Found ${events.length} PredictionMarketCreated events after deployment time`);
        events.forEach((event, index) => {
            console.log(`  Event ${index + 1}:`, {
                creator: event.data.creator.toString(),
                marketAddress: event.data.marketAddress.toString()
            });
        });
        
        // Normalize expected creator address for comparison
        const normalizedExpectedCreator = Address.parse(expectedCreator).toString();
        console.log(`🔍 Normalized expected creator: ${normalizedExpectedCreator}`);
        
        // Find the event matching the expected creator
        const matchingEvent = events.find(event => {
            const eventCreator = event.data.creator.toString();
            console.log(`  🔎 Comparing: ${eventCreator} === ${normalizedExpectedCreator}`);
            return eventCreator === normalizedExpectedCreator;
        });
        
        if (matchingEvent) {
            console.log('✅ Market creation event found!', {
                marketAddress: matchingEvent.data.marketAddress.toString(),
                creator: matchingEvent.data.creator.toString(),
                resolutionTime: matchingEvent.data.resolutionTime.toString()
            });
            return matchingEvent.data;
        }
        
        console.log(`⏳ No matching event found, waiting ${delayMs}ms before retry...`);
        
        // Wait before next attempt
        if (attempt < maxAttempts - 1) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    
    console.warn('❌ Market creation event not found after maximum attempts');
    return null;
}

/**
 * Extract market address from the most recent PredictionMarketCreated event
 * @param factoryAddress - The address of the PredictionFactory contract
 * @returns The market address or null if no event found
 */
export async function getLatestMarketAddress(
    factoryAddress: string
): Promise<string | null> {
    const events = await listenForMarketCreated(factoryAddress, 1);
    
    if (events.length > 0) {
        return events[0].data.marketAddress.toString();
    }
    
    return null;
}
