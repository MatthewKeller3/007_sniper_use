/**
 * Token addresses across different networks
 */

const TOKENS = {
  // Optimism
  optimism: {
    USDC: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    WETH: '0x4200000000000000000000000000000000000006',
    OP: '0x4200000000000000000000000000000000000042',
    WELL: '0xA88594D404727625A9437C3f886C7643872296AE',
    VELO: '0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db'
  },

  // Base
  base: {
    USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    WETH: '0x4200000000000000000000000000000000000006',
    DAI: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    AERO: '0x940181a94A35A4569E4529A3CDfB74e38FD98631'
  },

  // Arbitrum
  arbitrum: {
    USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    ARB: '0x912CE59144191C1204E64559FE8253a0e49E6548'
  },

  // Scroll
  scroll: {
    USDC: '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4',
    WETH: '0x5300000000000000000000000000000000000004'
  },

  // Linea
  linea: {
    USDC: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff',
    WETH: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f'
  },

  // zkSync Era
  zksync: {
    USDC: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
    WETH: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91'
  }
}

/**
 * Get token address for a specific network
 */
function getTokenAddress(network, symbol) {
  const networkTokens = TOKENS[network.toLowerCase()]
  if (!networkTokens) {
    throw new Error(`Unknown network: ${network}`)
  }

  const address = networkTokens[symbol.toUpperCase()]
  if (!address) {
    throw new Error(`Token ${symbol} not found on ${network}`)
  }

  return address
}

/**
 * Get all tokens for a network
 */
function getNetworkTokens(network) {
  return TOKENS[network.toLowerCase()] || {}
}

/**
 * Check if token exists on network
 */
function hasToken(network, symbol) {
  const networkTokens = TOKENS[network.toLowerCase()]
  return networkTokens && networkTokens[symbol.toUpperCase()] !== undefined
}

module.exports = {
  TOKENS,
  getTokenAddress,
  getNetworkTokens,
  hasToken
}
