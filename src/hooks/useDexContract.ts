import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWallet } from '../contexts/WalletContext'
import { getContractAddresses } from '../constants/contracts'

// ABI definitions (simplified for demo)
const FACTORY_ABI = [
  'function createPair(address tokenA, address tokenB) external returns (address pair)',
  'function getPair(address tokenA, address tokenB) external view returns (address pair)',
  'function allPairs(uint) external view returns (address pair)',
  'function allPairsLength() external view returns (uint)',
  'event PairCreated(address indexed token0, address indexed token1, address pair, uint)'
]

const ROUTER_ABI = [
  'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)',
  'function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  'function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
  'function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)',
  'function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB)'
]

const PAIR_ABI = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function totalSupply() external view returns (uint)',
  'function balanceOf(address owner) external view returns (uint)',
  'function transfer(address to, uint value) external returns (bool)',
  'function transferFrom(address from, address to, uint value) external returns (bool)',
  'function approve(address spender, uint value) external returns (bool)'
]

const ERC20_ABI = [
  'function balanceOf(address owner) external view returns (uint)',
  'function transfer(address to, uint amount) external returns (bool)',
  'function transferFrom(address from, address to, uint amount) external returns (bool)',
  'function approve(address spender, uint amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
  'function name() external view returns (string)'
]

export const useDexContract = () => {
  const { provider, chainId, account } = useWallet()
  const [contracts, setContracts] = useState<{
    factory: ethers.Contract | null
    router: ethers.Contract | null
  }>({ factory: null, router: null })

  useEffect(() => {
    const initializeContracts = async () => {
      if (!provider || !chainId) {
        setContracts({ factory: null, router: null })
        return
      }

      const addresses = getContractAddresses(chainId)
      if (!addresses) {
        setContracts({ factory: null, router: null })
        return
      }

      const signer = await provider.getSigner()
      
      const factory = new ethers.Contract(addresses.factory, FACTORY_ABI, signer)
      const router = new ethers.Contract(addresses.router, ROUTER_ABI, signer)

      setContracts({ factory, router })
    }

    initializeContracts()
  }, [provider, chainId])

  const getTokenContract = (tokenAddress: string) => {
    if (!provider) return null
    return provider.getSigner().then(signer => 
      new ethers.Contract(tokenAddress, ERC20_ABI, signer)
    )
  }

  const getPairContract = (pairAddress: string) => {
    if (!provider) return null
    return provider.getSigner().then(signer => 
      new ethers.Contract(pairAddress, PAIR_ABI, signer)
    )
  }

  const swapExactTokensForTokens = async (
    amountIn: string,
    amountOutMin: string,
    path: string[],
    deadline: number
  ) => {
    if (!contracts.router || !account) throw new Error('Router not available')
    
    const tx = await contracts.router.swapExactTokensForTokens(
      ethers.parseEther(amountIn),
      ethers.parseEther(amountOutMin),
      path,
      account,
      deadline
    )
    
    return tx.wait()
  }

  const addLiquidity = async (
    tokenA: string,
    tokenB: string,
    amountADesired: string,
    amountBDesired: string,
    amountAMin: string,
    amountBMin: string,
    deadline: number
  ) => {
    if (!contracts.router || !account) throw new Error('Router not available')
    
    const tx = await contracts.router.addLiquidity(
      tokenA,
      tokenB,
      ethers.parseEther(amountADesired),
      ethers.parseEther(amountBDesired),
      ethers.parseEther(amountAMin),
      ethers.parseEther(amountBMin),
      account,
      deadline
    )
    
    return tx.wait()
  }

  const removeLiquidity = async (
    tokenA: string,
    tokenB: string,
    liquidity: string,
    amountAMin: string,
    amountBMin: string,
    deadline: number
  ) => {
    if (!contracts.router || !account) throw new Error('Router not available')
    
    const tx = await contracts.router.removeLiquidity(
      tokenA,
      tokenB,
      ethers.parseEther(liquidity),
      ethers.parseEther(amountAMin),
      ethers.parseEther(amountBMin),
      account,
      deadline
    )
    
    return tx.wait()
  }

  const getAmountsOut = async (amountIn: string, path: string[]) => {
    if (!contracts.router) throw new Error('Router not available')
    
    const amounts = await contracts.router.getAmountsOut(
      ethers.parseEther(amountIn),
      path
    )
    
    return amounts.map((amount: bigint) => ethers.formatEther(amount))
  }

  const getPairAddress = async (tokenA: string, tokenB: string) => {
    if (!contracts.factory) throw new Error('Factory not available')
    
    return await contracts.factory.getPair(tokenA, tokenB)
  }

  const createPair = async (tokenA: string, tokenB: string) => {
    if (!contracts.factory) throw new Error('Factory not available')
    
    const tx = await contracts.factory.createPair(tokenA, tokenB)
    return tx.wait()
  }

  const getTokenBalance = async (tokenAddress: string, userAddress?: string) => {
    const token = await getTokenContract(tokenAddress)
    if (!token) throw new Error('Token contract not available')
    
    const address = userAddress || account
    if (!address) throw new Error('No address provided')
    
    const balance = await token.balanceOf(address)
    return ethers.formatEther(balance)
  }

  const approveToken = async (tokenAddress: string, spenderAddress: string, amount: string) => {
    const token = await getTokenContract(tokenAddress)
    if (!token) throw new Error('Token contract not available')
    
    const tx = await token.approve(spenderAddress, ethers.parseEther(amount))
    return tx.wait()
  }

  const getTokenAllowance = async (tokenAddress: string, spenderAddress: string) => {
    const token = await getTokenContract(tokenAddress)
    if (!token || !account) throw new Error('Token contract or account not available')
    
    const allowance = await token.allowance(account, spenderAddress)
    return ethers.formatEther(allowance)
  }

  return {
    contracts,
    getTokenContract,
    getPairContract,
    swapExactTokensForTokens,
    addLiquidity,
    removeLiquidity,
    getAmountsOut,
    getPairAddress,
    createPair,
    getTokenBalance,
    approveToken,
    getTokenAllowance
  }
}