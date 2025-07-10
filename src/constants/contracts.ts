export interface ContractAddresses {
  factory: string
  router: string
  bridge: string
  dxbToken: string
  weth: string
}

export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  // Localhost/Hardhat for development
  1337: {
    factory: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    router: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    bridge: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    dxbToken: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    weth: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'
  },
  // Ethereum Mainnet
  1: {
    factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Uniswap V2 Factory
    router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',  // Uniswap V2 Router
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'     // Official WETH
  },
  // BSC Mainnet
  56: {
    factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // PancakeSwap Factory
    router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',  // PancakeSwap Router
    bridge: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'     // WBNB
  },
  // Polygon Mainnet
  137: {
    factory: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32', // QuickSwap Factory
    router: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',  // QuickSwap Router
    bridge: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'     // WMATIC
  },
  // Arbitrum One
  42161: {
    factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4', // SushiSwap Factory
    router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',  // SushiSwap Router
    bridge: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'     // WETH on Arbitrum
  }
}

export const getContractAddresses = (chainId: number): ContractAddresses | undefined => {
  return CONTRACT_ADDRESSES[chainId]
}