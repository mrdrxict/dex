export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  chainId: number
  logoURI: string
}

export const TOKENS: Record<number, Token[]> = {
  // Ethereum
  1: [
    {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      chainId: 1,
      logoURI: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png'
    },
    {
      address: '0xA0b86a33E6441b8C4505B6B8C0E4F7c4E4B8C4F5',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://tokens.1inch.io/0xa0b86a33e6441b8c4505b6b8c0e4f7c4e4b8c4f5.png'
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
    }
  ],
  // BSC
  56: [
    {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      symbol: 'WBNB',
      name: 'Wrapped BNB',
      decimals: 18,
      chainId: 56,
      logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png'
    },
    {
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 18,
      chainId: 56,
      logoURI: 'https://tokens.1inch.io/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d.png'
    }
  ],
  // Polygon
  137: [
    {
      address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      symbol: 'WMATIC',
      name: 'Wrapped Matic',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://tokens.1inch.io/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png'
    },
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://tokens.1inch.io/0x2791bca1f2de4661ed88a30c99a7a9449aa84174.png'
    }
  ],
  // Arbitrum
  42161: [
    {
      address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      chainId: 42161,
      logoURI: 'https://tokens.1inch.io/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png'
    },
    {
      address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 42161,
      logoURI: 'https://tokens.1inch.io/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8.png'
    }
  ]
}

export const getTokensByChain = (chainId: number): Token[] => {
  return TOKENS[chainId] || []
}