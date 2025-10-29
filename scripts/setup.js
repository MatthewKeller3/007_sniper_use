#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════════╗'))
console.log(chalk.bold.cyan('║          007 SNIPER - SETUP WIZARD                            ║'))
console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════╝\n'))

/**
 * Check if .env file exists
 */
function checkEnvFile() {
  const envPath = path.join(__dirname, '../.env')
  const envExamplePath = path.join(__dirname, '../.env.example')
  
  if (!fs.existsSync(envPath)) {
    console.log(chalk.yellow('⚠  .env file not found!'))
    console.log(chalk.white('   Creating from .env.example...\n'))
    
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath)
      console.log(chalk.green('✓  .env file created successfully!'))
      console.log(chalk.yellow('   Please edit .env with your configuration before proceeding.\n'))
      return false
    } else {
      console.log(chalk.red('✗  .env.example not found! Cannot create .env file.\n'))
      return false
    }
  }
  
  console.log(chalk.green('✓  .env file exists\n'))
  return true
}

/**
 * Check required environment variables
 */
function checkEnvVariables() {
  require('dotenv').config()
  
  const required = ['PRIVATE_KEY']
  const recommended = ['OPTIMISM_RPC', 'BASE_RPC', 'TELEGRAM_BOT_TOKEN']
  
  console.log(chalk.cyan('Checking environment variables...\n'))
  
  let allRequired = true
  required.forEach(varName => {
    if (process.env[varName]) {
      console.log(chalk.green(`✓  ${varName} is set`))
    } else {
      console.log(chalk.red(`✗  ${varName} is MISSING (required)`))
      allRequired = false
    }
  })
  
  console.log()
  recommended.forEach(varName => {
    if (process.env[varName]) {
      console.log(chalk.green(`✓  ${varName} is set`))
    } else {
      console.log(chalk.yellow(`⚠  ${varName} is not set (recommended)`))
    }
  })
  
  console.log()
  return allRequired
}

/**
 * Create necessary directories
 */
function createDirectories() {
  const dirs = [
    'logs',
    'strategies/token-sniper/bot',
    'strategies/token-sniper/config',
    'strategies/token-sniper/scripts',
    'strategies/airdrop-farmer/protocols',
    'strategies/airdrop-farmer/tasks',
    'strategies/airdrop-farmer/scripts'
  ]
  
  console.log(chalk.cyan('Creating directories...\n'))
  
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
      console.log(chalk.green(`✓  Created ${dir}`))
    } else {
      console.log(chalk.gray(`  ${dir} already exists`))
    }
  })
  
  console.log()
}

/**
 * Create status files for strategies
 */
function createStatusFiles() {
  console.log(chalk.cyan('Initializing strategy status files...\n'))
  
  const sniperStatus = {
    active: false,
    capital: 1000,
    pnl: 0,
    trades: 0,
    wins: 0,
    losses: 0,
    notes: 'Not started yet'
  }
  
  const airdropStatus = {
    active: false,
    capital: 0,
    estimated: 15000,
    protocols: {
      scroll: { active: false, transactions: 0, estimatedValue: 5000 },
      layerzero: { active: false, transactions: 0, estimatedValue: 8000 },
      linea: { active: false, transactions: 0, estimatedValue: 3000 },
      zksync: { active: false, transactions: 0, estimatedValue: 2000 }
    },
    notes: 'Ready to start'
  }
  
  const sniperPath = path.join(__dirname, '../strategies/token-sniper/status.json')
  const airdropPath = path.join(__dirname, '../strategies/airdrop-farmer/status.json')
  
  if (!fs.existsSync(sniperPath)) {
    fs.writeFileSync(sniperPath, JSON.stringify(sniperStatus, null, 2))
    console.log(chalk.green('✓  Created token-sniper/status.json'))
  }
  
  if (!fs.existsSync(airdropPath)) {
    fs.writeFileSync(airdropPath, JSON.stringify(airdropStatus, null, 2))
    console.log(chalk.green('✓  Created airdrop-farmer/status.json'))
  }
  
  console.log()
}

/**
 * Display next steps
 */
function showNextSteps() {
  console.log(chalk.bold.cyan('\n═══════════════════════════════════════════════════════════════'))
  console.log(chalk.bold.cyan('  SETUP COMPLETE! NEXT STEPS:'))
  console.log(chalk.bold.cyan('═══════════════════════════════════════════════════════════════\n'))
  
  console.log(chalk.yellow('1. Configure your .env file:'))
  console.log(chalk.white('   nano .env\n'))
  
  console.log(chalk.yellow('2. Install dependencies (if not already done):'))
  console.log(chalk.white('   npm install\n'))
  
  console.log(chalk.yellow('3. View your dashboard:'))
  console.log(chalk.white('   npm run dashboard\n'))
  
  console.log(chalk.yellow('4. Start building the token sniper (Week 1 focus):'))
  console.log(chalk.white('   See strategies/token-sniper/README.md\n'))
  
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════\n'))
}

/**
 * Main setup function
 */
async function main() {
  try {
    const hasEnv = checkEnvFile()
    
    if (hasEnv) {
      const hasRequiredVars = checkEnvVariables()
      if (!hasRequiredVars) {
        console.log(chalk.red('\n✗  Setup incomplete: Missing required environment variables\n'))
        console.log(chalk.yellow('   Please update your .env file and run setup again.\n'))
        process.exit(1)
      }
    }
    
    createDirectories()
    createStatusFiles()
    showNextSteps()
    
    console.log(chalk.green('✓  Setup completed successfully!\n'))
  } catch (error) {
    console.error(chalk.red('\n✗  Setup failed:'), error.message)
    process.exit(1)
  }
}

main()
