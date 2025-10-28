# Getting Started with SmarTron Wealth Builder 🚀

### Project Structure
```
SmarTron/
├── strategies/
│   ├── flash-loans/        ✅ Your existing code (moved here)
│   ├── token-sniper/       ✅ Placeholder ready to build
│   └── airdrop-farmer/     ✅ Placeholder ready to build
├── shared/
│   ├── utils/              ✅ Wallet, logger, notifications
│   ├── config/             ✅ Networks, tokens
│   └── monitoring/         ✅ Unified dashboard
├── scripts/                ✅ Setup and status scripts
├── docs/                   ✅ Documentation
├── .env.example            ✅ Updated configuration template
├── package.json            ✅ All new scripts added
├── hardhat.config.js       ✅ Multi-network support
├── README.md               ✅ Updated project overview
└── PROGRESS.md             ✅ Journey tracker
```

---
### Step 1: Install New Dependencies
```bash
npm install
```

This will install the new packages needed for:
- Telegram notifications
- Dashboard (chalk, cli-table3)
- Scheduling (node-cron)
- API calls (axios)

### Step 2: Configure Environment
```bash
# Copy the example if you haven't already
cp .env.example .env

# Edit with your settings
nano .env
```

**Minimum required:**
- `PRIVATE_KEY` - Your wallet private key
- `ALCHEMY_API_KEY` OR specific RPC URLs for Base/Optimism

**Recommended:**
- `TELEGRAM_BOT_TOKEN` - Get from @BotFather on Telegram
- `TELEGRAM_CHAT_ID` - Your chat ID for alerts

### Step 3: Run Setup Script
```bash
npm run setup
```

This will:
- Create necessary directories
- Initialize status files
- Verify your configuration
- Give you a checklist

### Step 4: Test the Dashboard
```bash
npm run dashboard
```

You should see your unified dashboard showing all three strategies!

### Step 5: Check Status Anytime
```bash
npm run status
```

Quick command to see what's active and current P&L.

---

## 📅 Week 1 Focus: Token Sniper Bot

### What Needs to be Built

#### File: `strategies/token-sniper/bot/monitor.js`
- Watch for new token pair creation events
- Filter by liquidity and token type
- Log new opportunities

#### File: `strategies/token-sniper/bot/analyzer.js`
- Check if contract is verified
- Detect honeypots
- Validate liquidity levels
- Safety score calculation

#### File: `strategies/token-sniper/bot/executor.js`
- Execute buy orders
- Set up auto-sell conditions
- Track positions
- Update P&L

#### File: `strategies/token-sniper/bot/index.js`
- Already has placeholder
- Connect monitor → analyzer → executor
- Main bot loop

### Development Workflow

1. **Start with monitoring (Days 1-2)**
   - Listen to Uniswap V3 Factory on Base
   - Log every new pair creation
   - Filter by criteria

2. **Add safety checks (Days 3-4)**
   - Contract verification check
   - Basic honeypot detection
   - Test with historical data

3. **Build executor (Days 5-6)**
   - Buy/sell functions
   - Position tracking
   - P&L calculation

4. **Integration & testing (Day 7)**
   - Connect all pieces
   - Test on Base testnet
   - Dry run with fake funds

### Testing Strategy

```bash
# Test mode (no real trades)
npm run sniper:test

# When ready, start for real
npm run sniper:start
```

---

## 📊 Tracking Your Progress

### Update PROGRESS.md
Every week, update `PROGRESS.md` with:
- Trades executed
- Wins and losses
- Capital changes
- Lessons learned

### Dashboard Always Available
```bash
npm run dashboard
```

Real-time view of all strategies and total portfolio.

---

## 🛠️ Available Commands

### Global
- `npm run dashboard` - Real-time dashboard
- `npm run status` - Quick status check
- `npm run setup` - Re-run setup script

### Flash Loans (When you have capital)
- `npm run flash:test` - Test contracts
- `npm run flash:deploy` - Deploy to Optimism

### Token Sniper (Week 1 focus)
- `npm run sniper:start` - Start the bot
- `npm run sniper:test` - Test mode
- `npm run sniper:status` - Check bot status

### Airdrop Farmer (Week 5+)
- `npm run airdrop:run` - Run daily tasks
- `npm run airdrop:status` - Check progress
- `npm run airdrop:scroll` - Interact with Scroll
- `npm run airdrop:layerzero` - Interact with LayerZero

---

## 💡 Tips

### Security
- **NEVER** commit your `.env` file (already in .gitignore)
- Use a dedicated wallet for testing
- Start with small amounts

### Development
- Check `logs/` folder for detailed logs
- Each strategy logs separately
- Telegram alerts keep you informed

### Capital Management
- Token Sniper: Start with $200/attempt
- Split your $1k into 5 attempts
- Track every trade in PROGRESS.md

---

## 🚨 If Something Goes Wrong

### Dashboard won't start?
```bash
# Install missing dependencies
npm install chalk cli-table3 ethers
```

### Bot crashes?
```bash
# Check logs
cat logs/TokenSniper.log

# Verify .env file
cat .env
```

### Need help?
- Check strategy-specific README files
- Review shared/utils code for examples
- All utilities are documented

---

## 🎯 Success Criteria for Week 1

By end of Week 1, you should have:
- [ ] Token sniper bot monitoring new pairs on Base
- [ ] Safety checks working (honeypot detection, etc.)
- [ ] Buy/sell execution tested on testnet
- [ ] First test trade executed (even if small loss)
- [ ] Dashboard showing sniper activity
- [ ] Telegram alerts working

**Once you hit these milestones, you're ready to start real sniping!**

---

## 📞 What's Next?

After completing the Token Sniper (Weeks 1-4):
1. Start Airdrop Farming (Weeks 5-8)
2. Scale up Token Sniper profits
3. Deploy Flash Loan strategy when you hit $10k+

**Track everything. Every trade teaches you something.**

---

Good luck! Let's turn that $1k into $100k! 🚀
