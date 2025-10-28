const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

let bot = null

/**
 * Initialize Telegram bot
 */
function initTelegram() {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('Telegram credentials not found. Notifications disabled.')
    return false
  }

  try {
    bot = new TelegramBot(token, { polling: false })
    return true
  } catch (error) {
    console.error('Failed to initialize Telegram bot:', error.message)
    return false
  }
}

/**
 * Send a notification
 */
async function notify(message, options = {}) {
  const {
    strategy = 'SmarTron',
    priority = 'normal', // 'low', 'normal', 'high', 'critical'
    silent = false
  } = options

  // Console output
  console.log(`[${strategy}] ${message}`)

  // Telegram notification
  if (bot && process.env.TELEGRAM_CHAT_ID) {
    try {
      const emoji = {
        low: 'ℹ️',
        normal: '📢',
        high: '⚠️',
        critical: '🚨'
      }

      const formattedMessage = `${emoji[priority]} *${strategy}*\n\n${message}`
      
      await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, formattedMessage, {
        parse_mode: 'Markdown',
        disable_notification: silent
      })
    } catch (error) {
      console.error('Failed to send Telegram notification:', error.message)
    }
  }
}

/**
 * Send trade notification
 */
async function notifyTrade(strategy, action, token, amount, price, profit = null) {
  let message = `${action} ${amount} ${token} @ $${price}`
  
  if (profit !== null) {
    const profitEmoji = profit > 0 ? '📈' : '📉'
    message += `\n\nP&L: ${profitEmoji} ${profit > 0 ? '+' : ''}$${profit.toFixed(2)}`
  }

  await notify(message, {
    strategy,
    priority: profit && Math.abs(profit) > 100 ? 'high' : 'normal'
  })
}

/**
 * Send error notification
 */
async function notifyError(strategy, error, context = '') {
  const message = `*ERROR*\n\n${context}\n\n\`${error.message}\``
  
  await notify(message, {
    strategy,
    priority: 'critical'
  })
}

/**
 * Send daily summary
 */
async function notifyDailySummary(stats) {
  const message = `
📊 *Daily Summary*

💰 Total P&L: ${stats.totalPnL > 0 ? '+' : ''}$${stats.totalPnL.toFixed(2)}
📈 Wins: ${stats.wins}
📉 Losses: ${stats.losses}
🎯 Win Rate: ${stats.winRate.toFixed(1)}%

*By Strategy:*
${Object.entries(stats.byStrategy).map(([name, data]) => 
  `• ${name}: ${data.pnl > 0 ? '+' : ''}$${data.pnl.toFixed(2)}`
).join('\n')}

💼 Portfolio Value: $${stats.portfolioValue.toFixed(2)}
  `.trim()

  await notify(message, {
    strategy: 'SmarTron',
    priority: 'normal'
  })
}

// Initialize on module load
initTelegram()

module.exports = {
  notify,
  notifyTrade,
  notifyError,
  notifyDailySummary
}
