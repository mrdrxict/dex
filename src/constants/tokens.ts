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
      address: '0xA0b86a33E6441b8C4CAad45bAeF941aBc7d3Ab32',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://tokens.1inch.io/0xa0b86a33e6441b8c4caad45baef941abc7d3ab32.png'
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
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 18,
      chainId: 56,
      logoURI: 'https://tokens.1inch.io/0x55d398326f99059ff775485246999027b3197955.png'
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
    },
    {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://tokens.1inch.io/0xc2132d05d31c914a87c6611c10748aeb04b58e8f.png'
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
    },
    {
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 42161,
      logoURI: 'https://tokens.1inch.io/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.png'
    }
  ],
  // Avalanche C-Chain
  43114: [
    {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      symbol: 'WAVAX',
      name: 'Wrapped AVAX',
      decimals: 18,
      chainId: 43114,
      logoURI: 'https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png'
    },
    {
      address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 43114,
      logoURI: 'https://tokens.1inch.io/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e.png'
    },
    {
      address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 43114,
      logoURI: 'https://tokens.1inch.io/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7.png'
    },
    {
      address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
      symbol: 'WETH.e',
      name: 'Wrapped Ether',
      decimals: 18,
      chainId: 43114,
      logoURI: 'https://tokens.1inch.io/0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab.png'
    },
    {
      address: '0x50b7545627a5162F82A992c33b87aDc75187B218',
      symbol: 'WBTC.e',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      chainId: 43114,
      logoURI: 'https://tokens.1inch.io/0x50b7545627a5162f82a992c33b87adc75187b218.png'
    }
  ],
  // Fantom Opera
  250: [
    {
      address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
      symbol: 'WFTM',
      name: 'Wrapped Fantom',
      decimals: 18,
      chainId: 250,
      logoURI: 'https://tokens.1inch.io/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83.png'
    },
    {
      address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 250,
      logoURI: 'https://tokens.1inch.io/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png'
    },
    {
      address: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
      symbol: 'fUSDT',
      name: 'Frapped USDT',
      decimals: 6,
      chainId: 250,
      logoURI: 'https://tokens.1inch.io/0x049d68029688eabf473097a2fc38ef61633a3c7a.png'
    },
    {
      address: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      chainId: 250,
      logoURI: 'https://tokens.1inch.io/0x74b23882a30290451a17c44f4f05243b6b58c76d.png'
    },
    {
      address: '0x321162Cd933E2Be498Cd2267a90534A804051b11',
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      chainId: 250,
      logoURI: 'https://tokens.1inch.io/0x321162cd933e2be498cd2267a90534a804051b11.png'
    }
  ],
  // Ethereum Goerli Testnet
  5: [
    {
      address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      chainId: 5,
      logoURI: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png'
    },
    {
      address: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 5,
      logoURI: 'https://tokens.1inch.io/0xa0b86a33e6441b8c4caad45baef941abc7d3ab32.png'
    },
    {
      address: '0x509ee0d083ddf8ac028f2a56731412edd63223b9',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 5,
      logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
    }
  ],
  // BSC Testnet
  97: [
    {
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      symbol: 'WBNB',
      name: 'Wrapped BNB',
      decimals: 18,
      chainId: 97,
      logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png'
    },
    {
      address: '0x64544969ed7EBf5f083679233325356EbE738930',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 18,
      chainId: 97,
      logoURI: 'https://tokens.1inch.io/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d.png'
    },
    {
      address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 18,
      chainId: 97,
      logoURI: 'https://tokens.1inch.io/0x55d398326f99059ff775485246999027b3197955.png'
    }
  ],
  // Polygon Mumbai
  80001: [
    {
      address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      symbol: 'WMATIC',
      name: 'Wrapped Matic',
      decimals: 18,
      chainId: 80001,
      logoURI: 'https://tokens.1inch.io/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png'
    },
    {
      address: '0xe11A86849d99F524cAC3E7A0Ec1241828e332C62',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 80001,
      logoURI: 'https://tokens.1inch.io/0x2791bca1f2de4661ed88a30c99a7a9449aa84174.png'
    },
    {
      address: '0x3813e82e6f7098b9583FC0F33a962D02018B6803',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 80001,
      logoURI: 'https://tokens.1inch.io/0xc2132d05d31c914a87c6611c10748aeb04b58e8f.png'
    }
  ],
  // Avalanche Fuji
  43113: [
    {
      address: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
      symbol: 'WAVAX',
      name: 'Wrapped AVAX',
      decimals: 18,
      chainId: 43113,
      logoURI: 'https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png'
    },
    {
      address: '0x5425890298aed601595a70AB815c96711a31Bc65',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 43113,
      logoURI: 'https://tokens.1inch.io/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e.png'
    },
    {
      address: '0x65e66a61D0a8F1e686C2D6083ad611a10D84D97A',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 43113,
      logoURI: 'https://tokens.1inch.io/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7.png'
    }
  ],
  // Fantom Testnet
  4002: [
    {
      address: '0xf1277d1Ed8AD466beddF92ef448A132661956621',
      symbol: 'WFTM',
      name: 'Wrapped Fantom',
      decimals: 18,
      chainId: 4002,
      logoURI: 'https://tokens.1inch.io/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83.png'
    },
    {
      address: '0x2F194315f122d13a9E3000Df33Fd9c0b762A91C1',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 4002,
      logoURI: 'https://tokens.1inch.io/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png'
    },
    {
      address: '0xD5a7Df8B56d5eaCe47A9C8Bb734E76Dd7E9C6C1F',
      symbol: 'fUSDT',
      name: 'Frapped USDT',
      decimals: 6,
      chainId: 4002,
      logoURI: 'https://tokens.1inch.io/0x049d68029688eabf473097a2fc38ef61633a3c7a.png'
    }
  ],
  // ESR Testnet
  25062019: [
    {
      address: '0x0000000000000000000000000000000000000000', // Native ESR
      symbol: 'ESR',
      name: 'ESR Token',
      decimals: 18,
      chainId: 25062019,
      logoURI: 'https://via.placeholder.com/32/00FF00/FFFFFF?text=ESR'
    },
    {
      address: '0x0000000000000000000000000000000000000000', // USDT on ESR
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 25062019,
      logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
    }
  ]
}

export const getTokensByChain = (chainId: number): Token[] => {
  return TOKENS[chainId] || []
}