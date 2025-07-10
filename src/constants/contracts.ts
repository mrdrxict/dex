export interface ContractAddresses {
  factory: string
  router: string
  bridge: string
  dxbToken: string
  weth: string
}

export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  // Ethereum Mainnet
  1: {
    factory: '0x0000000000000000000000000000000000000000', // Deploy Factory here
    router: '0x0000000000000000000000000000000000000000',  // Deploy Router here
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'     // Official WETH
  },
  // BSC Mainnet
  56: {
    factory: '0x0000000000000000000000000000000000000000',
    router: '0x0000000000000000000000000000000000000000',
    bridge: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'     // WBNB
  },
  // Polygon Mainnet
  137: {
    factory: '0x0000000000000000000000000000000000000000',
    router: '0x0000000000000000000000000000000000000000',
    bridge: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'     // WMATIC
  },
  // Arbitrum One
  42161: {
    factory: '0x0000000000000000000000000000000000000000',
    router: '0x0000000000000000000000000000000000000000',
    bridge: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'     // WETH on Arbitrum
  }
}

export const getContractAddresses = (chainId: number): ContractAddresses | undefined => {
  return CONTRACT_ADDRESSES[chainId]
}