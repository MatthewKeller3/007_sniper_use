#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

/**
 * Quick status check for all strategies
 */
async function checkStatus() {
  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════╗'))
  console.log(chalk.bold.cyan('║    007 SNIPER QUICK STATUS CHECK       ║'))
  console.log(chalk.bold.cyan('╚════════════════════════════════════════╝\n'))
  
  // Check environment
  require('dotenv').config()
  const hasPrivateKey = !!process.env.PRIVATE_KEY
  const hasRPC = !!(process.env.OPTIMISM_RPC || process.env.ALCHEMY_API_KEY)
  
  console.log(chalk.white('Environment:'))
  console.log(hasPrivateKey ? chalk.green('  ✓ Private key configured') : chalk.red('  ✗ Private key missing'))
  console.log(hasRPC ? chalk.green('  ✓ RPC endpoint configured') : chalk.red('  ✗ RPC endpoint missing'))
  console.log()
  
  // Check strategies
  console.log(chalk.white('Strategies:'))
  
  // Flash Loans
  const flashLoansDeployed = fs.existsSync(path.join(__dirname, '../strategies/flash-loans/contracts'))
  console.log(flashLoansDeployed 
    ? chalk.gray('  ⏸  Flash Loans: Waiting for capital ($10k+)')
    : chalk.yellow('  ⚠  Flash Loans: Code not found')
  )
  
  // Token Sniper
  const sniperStatusPath = path.join(__dirname, '../strategies/token-sniper/status.json')
  if (fs.existsSync(sniperStatusPath)) {
    const sniperStatus = JSON.parse(fs.readFileSync(sniperStatusPath, 'utf8'))
    console.log(sniperStatus.active 
      ? chalk.green(`  ✓ Token Sniper: ACTIVE - ${sniperStatus.trades} trades, $${sniperStatus.pnl} P&L`)
      : chalk.yellow(`  🚧 Token Sniper: In development - $${sniperStatus.capital} ready`)
    )
  } else {
    console.log(chalk.gray('  ⏸  Token Sniper: Not initialized'))
  }
  
  // Airdrop Farmer
  const airdropStatusPath = path.join(__dirname, '../strategies/airdrop-farmer/status.json')
  if (fs.existsSync(airdropStatusPath)) {
    const airdropStatus = JSON.parse(fs.readFileSync(airdropStatusPath, 'utf8'))
    const activeProtocols = Object.values(airdropStatus.protocols).filter(p => p.active).length
    console.log(airdropStatus.active
      ? chalk.green(`  ✓ Airdrop Farmer: ACTIVE - ${activeProtocols} protocols`)
      : chalk.yellow(`  🔧 Airdrop Farmer: Ready - Est. $${airdropStatus.estimated}`)
    )
  } else {
    console.log(chalk.gray('  ⏸  Airdrop Farmer: Not initialized'))
  }
  
  console.log()
  
  // Quick stats
  let totalCapital = 0
  let totalPnL = 0
  
  if (fs.existsSync(sniperStatusPath)) {
    const sniper = JSON.parse(fs.readFileSync(sniperStatusPath, 'utf8'))
    totalCapital += sniper.capital
    totalPnL += sniper.pnl
  }
  
  console.log(chalk.white('Portfolio:'))
  console.log(chalk.yellow(`  Capital: $${totalCapital.toFixed(2)}`))
  console.log(totalPnL > 0 
    ? chalk.green(`  P&L: +$${totalPnL.toFixed(2)} (+${((totalPnL/totalCapital)*100).toFixed(2)}%)`)
    : totalPnL < 0
    ? chalk.red(`  P&L: $${totalPnL.toFixed(2)} (${((totalPnL/totalCapital)*100).toFixed(2)}%)`)
    : chalk.gray(`  P&L: $0.00`)
  )
  
  console.log()
  console.log(chalk.cyan('Run "npm run dashboard" for detailed view\n'))
}

checkStatus().catch(console.error)
