/**
 * Network configurations for all supported chains
 */

const NETWORKS = {
  optimism: {
    name: 'Optimism',
    chainId: 10,
    rpcUrl: process.env.OPTIMISM_RPC || 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  
  base: {
    name: 'Base',
    chainId: 8453,
    rpcUrl: process.env.BASE_RPC || 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  
  arbitrum: {
    name: 'Arbitrum One',
    chainId: 42161,
    rpcUrl: process.env.ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },

  scroll: {
    name: 'Scroll',
    chainId: 534352,
    rpcUrl: process.env.SCROLL_RPC || 'https://rpc.scroll.io',
    explorer: 'https://scrollscan.com',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },

  linea: {
    name: 'Linea',
    chainId: 59144,
    rpcUrl: process.env.LINEA_RPC || 'https://rpc.linea.build',
    explorer: 'https://lineascan.build',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },

  zksync: {
    name: 'zkSync Era',
    chainId: 324,
    rpcUrl: process.env.ZKSYNC_RPC || 'https://mainnet.era.zksync.io',
    explorer: 'https://explorer.zksync.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  }
}

/**
 * Get network configuration
 */
function getNetwork(name) {
  const network = NETWORKS[name.toLowerCase()]
  if (!network) {
    throw new Error(`Unknown network: ${name}`)
  }
  return network
}

/**
 * Get all supported networks
 */
function getAllNetworks() {
  return Object.keys(NETWORKS)
}

module.exports = {
  NETWORKS,
  getNetwork,
  getAllNetworks
}
