export interface Chain {
  id: number
  name: string
  symbol: string
  rpcUrl: string
  blockExplorer: string
  icon: string
}

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorer: 'https://etherscan.io',
    icon: '⟠'
  },
  {
    id: 56,
    name: 'BSC',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com',
    icon: '🟡'
  },
  {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    icon: '🟣'
  },
  {
    id: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    icon: '🔵'
  }
]

export const getChainById = (chainId: number): Chain | undefined => {
  return SUPPORTED_CHAINS.find(chain => chain.id === chainId)
}