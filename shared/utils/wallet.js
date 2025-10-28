const { ethers } = require('ethers')
require('dotenv').config()

/**
 * Get wallet instance for a specific network
 * @param {string} network - 'optimism', 'base', 'arbitrum', or 'hardhat'
 * @returns {ethers.Wallet} Connected wallet instance
 */
function getWallet(network = 'optimism') {
  const privateKey = process.env.PRIVATE_KEY
  
  if (!privateKey) {
    throw new Error('PRIVATE_KEY not found in .env file')
  }

  const providers = {
    optimism: new ethers.JsonRpcProvider(process.env.OPTIMISM_RPC),
    base: new ethers.JsonRpcProvider(process.env.BASE_RPC),
    arbitrum: new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC),
    hardhat: new ethers.JsonRpcProvider('http://localhost:8545')
  }

  const provider = providers[network]
  if (!provider) {
    throw new Error(`Unknown network: ${network}`)
  }

  return new ethers.Wallet(privateKey, provider)
}

/**
 * Get multiple wallets for airdrop farming
 * @param {string} network - Network to connect to
 * @returns {Array<ethers.Wallet>} Array of wallet instances
 */
function getAirdropWallets(network = 'optimism') {
  const wallets = []
  const provider = new ethers.JsonRpcProvider(
    network === 'optimism' ? process.env.OPTIMISM_RPC :
    network === 'base' ? process.env.BASE_RPC :
    process.env.ARBITRUM_RPC
  )

  // Main wallet
  if (process.env.PRIVATE_KEY) {
    wallets.push(new ethers.Wallet(process.env.PRIVATE_KEY, provider))
  }

  // Additional airdrop wallets
  for (let i = 1; i <= 5; i++) {
    const key = process.env[`AIRDROP_WALLET_${i}`]
    if (key) {
      wallets.push(new ethers.Wallet(key, provider))
    }
  }

  return wallets
}

/**
 * Get provider for a network
 * @param {string} network - Network name
 * @returns {ethers.Provider} Provider instance
 */
function getProvider(network = 'optimism') {
  const rpcUrls = {
    optimism: process.env.OPTIMISM_RPC,
    base: process.env.BASE_RPC,
    arbitrum: process.env.ARBITRUM_RPC
  }

  const rpcUrl = rpcUrls[network]
  
  // Use WebSocketProvider for wss:// URLs, JsonRpcProvider for http(s)://
  if (rpcUrl && rpcUrl.startsWith('wss://')) {
    return new ethers.WebSocketProvider(rpcUrl)
  } else {
    return new ethers.JsonRpcProvider(rpcUrl)
  }
}

/**
 * Get wallet balance
 * @param {ethers.Wallet} wallet - Wallet instance
 * @returns {Promise<string>} Balance in ETH
 */
async function getBalance(wallet) {
  const balance = await wallet.provider.getBalance(wallet.address)
  return ethers.formatEther(balance)
}

module.exports = {
  getWallet,
  getAirdropWallets,
  getProvider,
  getBalance
}
