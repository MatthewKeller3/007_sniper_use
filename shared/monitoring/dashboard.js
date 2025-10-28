const Table = require('cli-table3')
const chalk = require('chalk')
const { ethers } = require('ethers')
const { getWallet } = require('../utils/wallet')
const { getTokenAddress } = require('../config/tokens')
const fs = require('fs')
const path = require('path')

/**
 * Display unified dashboard for all strategies
 */
async function showDashboard() {
  console.clear()
  
  const table = new Table({
    head: [chalk.cyan('Strategy'), chalk.cyan('Status'), chalk.cyan('Capital'), chalk.cyan('P&L'), chalk.cyan('Notes')],
    colWidths: [20, 12, 15, 15, 40]
  })

  // Get wallet balances
  const optimismWallet = getWallet('optimism')
  const baseWallet = getWallet('base')
  
  const ethBalance = await optimismWallet.provider.getBalance(optimismWallet.address)
  const ethBalanceFormatted = parseFloat(ethers.formatEther(ethBalance)).toFixed(4)

  // Flash Loans Strategy
  const flashLoanStatus = await getFlashLoanStatus()
  table.push([
    chalk.white('Flash Loans'),
    flashLoanStatus.active ? chalk.green('ACTIVE') : chalk.gray('INACTIVE'),
    chalk.yellow(`$${flashLoanStatus.capital}`),
    flashLoanStatus.pnl > 0 ? chalk.green(`+$${flashLoanStatus.pnl}`) : chalk.red(`$${flashLoanStatus.pnl}`),
    chalk.gray(flashLoanStatus.notes)
  ])

  // Token Sniper Strategy
  const sniperStatus = await getSniperStatus()
  table.push([
    chalk.white('Token Sniper'),
    sniperStatus.active ? chalk.green('ACTIVE') : chalk.yellow('BUILDING'),
    chalk.yellow(`$${sniperStatus.capital}`),
    sniperStatus.pnl > 0 ? chalk.green(`+$${sniperStatus.pnl}`) : chalk.red(`$${sniperStatus.pnl}`),
    chalk.gray(sniperStatus.notes)
  ])

  // Airdrop Farmer Strategy
  const airdropStatus = await getAirdropStatus()
  table.push([
    chalk.white('Airdrop Farmer'),
    airdropStatus.active ? chalk.green('ACTIVE') : chalk.yellow('READY'),
    chalk.yellow(`$${airdropStatus.capital}`),
    chalk.cyan(`Est. $${airdropStatus.estimated}`),
    chalk.gray(airdropStatus.notes)
  ])

  // Summary
  const totalCapital = flashLoanStatus.capital + sniperStatus.capital + airdropStatus.capital
  const totalPnL = flashLoanStatus.pnl + sniperStatus.pnl

  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════════╗'))
  console.log(chalk.bold.cyan('║          SMARTRON WEALTH BUILDER DASHBOARD                     ║'))
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════╝\n'))

  console.log(chalk.white(`Wallet: ${optimismWallet.address}`))
  console.log(chalk.white(`ETH Balance: ${ethBalanceFormatted} ETH\n`))

  console.log(table.toString())

  console.log(chalk.bold('\n═══════════════════════════════════════════════════════════════'))
  console.log(chalk.yellow(`Total Capital Deployed: $${totalCapital.toFixed(2)}`))
  console.log(totalPnL > 0 
    ? chalk.green(`Total P&L: +$${totalPnL.toFixed(2)} (+${((totalPnL/totalCapital)*100).toFixed(2)}%)`)
    : chalk.red(`Total P&L: $${totalPnL.toFixed(2)} (${((totalPnL/totalCapital)*100).toFixed(2)}%)`)
  )
  console.log(chalk.bold('═══════════════════════════════════════════════════════════════\n'))

  // Goal progress
  const goal = 100000 // $100k goal
  const current = totalCapital + totalPnL
  const progress = (current / goal) * 100

  console.log(chalk.cyan(`Goal Progress: $${current.toFixed(2)} / $${goal.toFixed(2)} (${progress.toFixed(2)}%)`))
  console.log(createProgressBar(progress))
  console.log()
}

/**
 * Create ASCII progress bar
 */
function createProgressBar(percentage, width = 50) {
  const filled = Math.round((percentage / 100) * width)
  const empty = width - filled
  const bar = '█'.repeat(filled) + '░'.repeat(empty)
  
  return chalk.green(`[${bar}] ${percentage.toFixed(2)}%`)
}

/**
 * Get Flash Loan strategy status
 */
async function getFlashLoanStatus() {
  // TODO: Check if contract is deployed and has funds
  return {
    active: false,
    capital: 0,
    pnl: 0,
    notes: 'Waiting for $10k+ capital'
  }
}

/**
 * Get Token Sniper strategy status
 */
async function getSniperStatus() {
  const statusFile = path.join(__dirname, '../../strategies/token-sniper/status.json')
  
  if (fs.existsSync(statusFile)) {
    const data = JSON.parse(fs.readFileSync(statusFile, 'utf8'))
    return data
  }

  return {
    active: false,
    capital: 1000, // Starting capital
    pnl: 0,
    notes: 'In development - starting soon'
  }
}

/**
 * Get Airdrop Farmer strategy status
 */
async function getAirdropStatus() {
  const statusFile = path.join(__dirname, '../../strategies/airdrop-farmer/status.json')
  
  if (fs.existsSync(statusFile)) {
    const data = JSON.parse(fs.readFileSync(statusFile, 'utf8'))
    return data
  }

  return {
    active: false,
    capital: 0,
    estimated: 15000, // Estimated airdrop value
    notes: 'Ready to start - 5 protocols targeted'
  }
}

/**
 * Run dashboard continuously
 */
async function runDashboard(interval = 30000) {
  await showDashboard()
  
  setInterval(async () => {
    await showDashboard()
  }, interval)
}

// Run if called directly
if (require.main === module) {
  runDashboard().catch(console.error)
}

module.exports = {
  showDashboard,
  runDashboard
}
