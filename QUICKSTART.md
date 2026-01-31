# Quick Start Guide - Market Creation

## Prerequisites
1. MongoDB running locally or connection string
2. Node.js v18+ installed
3. TON wallet with test TON
4. Firebase project configured

## Setup

### 1. Backend Setup
```bash
cd predict-backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ton-predict
CORS_ORIGIN=http://localhost:3000
ADMIN_API_KEY=test_admin_key_123
EOF

# Start backend
npm run dev
```

### 2. Frontend Setup
```bash
# From project root
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

# Start frontend
npm run dev
```

## Testing Market Creation

### Quick Test
1. Open http://localhost:3000/admin/login
2. Login with Firebase credentials
3. Navigate to http://localhost:3000/admin/deploy
4. Fill form:
   - Question: "Test Market"
   - Market ID: 1001
   - Resolution: 1 day
   - Liquidity: 100
5. Click "Deploy Market"

### Verify Backend
```bash
# Check if market was created
curl http://localhost:3001/api/v1/markets
```

## API Examples

### Create Market
```bash
curl -X POST http://localhost:3001/api/v1/markets \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Will TON hit $10?",
    "outcomes": ["Yes", "No"],
    "liquidityParameter": 100,
    "closingTime": "2025-12-31T23:59:59.000Z",
    "marketId": 1001
  }'
```

### List Markets
```bash
curl http://localhost:3001/api/v1/markets
```

### Get Market Details
```bash
curl http://localhost:3001/api/v1/markets/{marketId}
```

## Common Issues

### Backend won't start
- Check MongoDB is running: `mongod`
- Verify port 3001 is free: `lsof -i :3001`

### Market creation fails
- Check wallet is connected
- Ensure TON balance > 0.05
- Verify backend logs for errors

### Can't see created markets
- Check backend response in Network tab
- Verify MongoDB has data: `mongo ton-predict --eval "db.markets.find()"`

## Next Features to Implement

1. **Market Resolution** - Allow admin to resolve markets
2. **Trading Interface** - User trading page
3. **Market Discovery** - Listen to blockchain events
4. **Price Charts** - Real-time probability visualization
5. **User Portfolio** - Track user positions

## Development Tips

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Backend logs show all API calls
- Use React DevTools for state debugging
- Check MongoDB Compass for data visualization
