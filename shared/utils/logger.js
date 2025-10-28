const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const LOG_DIR = path.join(__dirname, '../../logs')

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true })
}

/**
 * Log levels
 */
const LogLevel = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
}

/**
 * Format timestamp
 */
function getTimestamp() {
  return new Date().toISOString()
}

/**
 * Write to log file
 */
function writeToFile(strategy, level, message, data = null) {
  const logFile = path.join(LOG_DIR, `${strategy}.log`)
  const logEntry = {
    timestamp: getTimestamp(),
    level,
    message,
    data
  }
  
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n')
}

/**
 * Main logger class
 */
class Logger {
  constructor(strategy) {
    this.strategy = strategy
  }

  info(message, data = null) {
    console.log(chalk.blue(`[${this.strategy}] ℹ ${message}`))
    writeToFile(this.strategy, LogLevel.INFO, message, data)
  }

  success(message, data = null) {
    console.log(chalk.green(`[${this.strategy}] ✓ ${message}`))
    writeToFile(this.strategy, LogLevel.SUCCESS, message, data)
  }

  warning(message, data = null) {
    console.log(chalk.yellow(`[${this.strategy}] ⚠ ${message}`))
    writeToFile(this.strategy, LogLevel.WARNING, message, data)
  }

  error(message, data = null) {
    console.log(chalk.red(`[${this.strategy}] ✗ ${message}`))
    writeToFile(this.strategy, LogLevel.ERROR, message, data)
  }

  debug(message, data = null) {
    if (process.env.DEBUG === 'true') {
      console.log(chalk.gray(`[${this.strategy}] 🐛 ${message}`))
      writeToFile(this.strategy, LogLevel.DEBUG, message, data)
    }
  }

  trade(action, token, amount, price, profit = null) {
    const message = `${action} ${amount} ${token} @ ${price}`
    const data = { action, token, amount, price, profit }
    
    if (profit !== null) {
      const color = profit > 0 ? chalk.green : chalk.red
      console.log(color(`[${this.strategy}] 💰 ${message} | P&L: ${profit > 0 ? '+' : ''}${profit}`))
    } else {
      console.log(chalk.cyan(`[${this.strategy}] 💰 ${message}`))
    }
    
    writeToFile(this.strategy, 'TRADE', message, data)
  }
}

/**
 * Create a logger instance for a strategy
 */
function createLogger(strategy) {
  return new Logger(strategy)
}

module.exports = {
  createLogger,
  LogLevel
}
