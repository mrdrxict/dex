export interface ContractAddresses {
  factory: string
  router: string
  bridge: string
  staking: string
  farming: string
  dxbToken: string
  weth: string
}

export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  // Localhost/Hardhat for development
  1337: {
    factory: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    router: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    bridge: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    staking: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    farming: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
    dxbToken: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
    weth: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'
  },
  // Ethereum Mainnet
  1: {
    factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Uniswap V2 Factory
    router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',  // Uniswap V2 Router
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'     // Official WETH
  },
  // BSC Mainnet
  56: {
    factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // PancakeSwap Factory
    router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',  // PancakeSwap Router
    bridge: '0x0000000000000000000000000000000000000000',
    staking: '0x0000000000000000000000000000000000000000',
    farming: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'     // WBNB
  },
  // Polygon Mainnet
  137: {
    factory: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32', // QuickSwap Factory
    router: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',  // QuickSwap Router
    bridge: '0x0000000000000000000000000000000000000000',
    staking: '0x0000000000000000000000000000000000000000',
    farming: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'     // WMATIC
  },
  // Arbitrum One
  42161: {
    factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4', // SushiSwap Factory
    router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',  // SushiSwap Router
    bridge: '0x0000000000000000000000000000000000000000',
    staking: '0x0000000000000000000000000000000000000000',
    farming: '0x0000000000000000000000000000000000000000',
    dxbToken: '0x0000000000000000000000000000000000000000',
    weth: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'     // WETH on Arbitrum
  },
  // Avalanche C-Chain
  43114: {
    factory: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10', // Trader Joe Factory
    router: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',  // Trader Joe Router
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'     // WAVAX
  },
  // Fantom Opera
  250: {
    factory: '0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3', // SpookySwap Factory
    router: '0xF491e7B69E4244ad4002BC14e878a34207E38c29',  // SpookySwap Router
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'     // WFTM
  },
  // Ethereum Goerli Testnet
  5: {
    factory: '0x0000000000000000000000000000000000000000', // Deploy Factory here
    router: '0x0000000000000000000000000000000000000000',  // Deploy Router here
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'     // Goerli WETH
  },
  // BSC Testnet
  97: {
    factory: '0x0000000000000000000000000000000000000000', // Deploy Factory here
    router: '0x0000000000000000000000000000000000000000',  // Deploy Router here
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'     // BSC Testnet WBNB
  },
  // Polygon Mumbai
  80001: {
    factory: '0x0000000000000000000000000000000000000000', // Deploy Factory here
    router: '0x0000000000000000000000000000000000000000',  // Deploy Router here
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'     // Mumbai WMATIC
  },
  // Avalanche Fuji
  43113: {
    factory: '0x0000000000000000000000000000000000000000', // Deploy Factory here
    router: '0x0000000000000000000000000000000000000000',  // Deploy Router here
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'     // Fuji WAVAX
  },
  // Fantom Testnet
  4002: {
    factory: '0x0000000000000000000000000000000000000000', // Deploy Factory here
    router: '0x0000000000000000000000000000000000000000',  // Deploy Router here
    bridge: '0x0000000000000000000000000000000000000000',  // Deploy Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0xf1277d1Ed8AD466beddF92ef448A132661956621'     // Fantom Testnet WFTM
  },
  // ESR Testnet
  25062019: {
    factory: '0x0000000000000000000000000000000000000000',  // Deploy our Factory here
    router: '0x0000000000000000000000000000000000000000',   // Deploy our Router here
    bridge: '0x0000000000000000000000000000000000000000',   // Deploy our Bridge here
    staking: '0x0000000000000000000000000000000000000000', // Deploy our Staking here
    farming: '0x0000000000000000000000000000000000000000', // Deploy our Farming here
    dxbToken: '0x0000000000000000000000000000000000000000', // Deploy DXB Token here
    weth: '0x0000000000000000000000000000000000000000'      // Deploy WESR here
  }
}

export const getContractAddresses = (chainId: number): ContractAddresses | undefined => {
  return CONTRACT_ADDRESSES[chainId]
}