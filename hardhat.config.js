require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox")

const privateKey = process.env.PRIVATE_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  
  networks: {
    hardhat: {
      forking: {
        url: process.env.OPTIMISM_RPC || `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: process.env.FORK_BLOCK_NUMBER === "true" ? 131285000 : undefined,
        enabled: process.env.FORK_ENABLED === "true"
      }
    },
    
    optimism: {
      url: process.env.OPTIMISM_RPC || `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: privateKey ? [privateKey] : [],
      chainId: 10,
      gasPrice: "auto"
    },
    
    base: {
      url: process.env.BASE_RPC || `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: privateKey ? [privateKey] : [],
      chainId: 8453,
      gasPrice: "auto"
    },
    
    arbitrum: {
      url: process.env.ARBITRUM_RPC || `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: privateKey ? [privateKey] : [],
      chainId: 42161,
      gasPrice: "auto"
    },
    
    scroll: {
      url: process.env.SCROLL_RPC || "https://rpc.scroll.io",
      accounts: privateKey ? [privateKey] : [],
      chainId: 534352,
      gasPrice: "auto"
    },
    
    linea: {
      url: process.env.LINEA_RPC || "https://rpc.linea.build",
      accounts: privateKey ? [privateKey] : [],
      chainId: 59144,
      gasPrice: "auto"
    },
    
    zksync: {
      url: process.env.ZKSYNC_RPC || "https://mainnet.era.zksync.io",
      accounts: privateKey ? [privateKey] : [],
      chainId: 324,
      gasPrice: "auto"
    }
  },
  
  paths: {
    sources: "./strategies",
    tests: "./strategies",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD"
  }
};
