import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWallet } from '../contexts/WalletContext'
import { getContractAddresses } from '../constants/contracts'

const BRIDGE_ABI = [
  'function lockTokens(address token, uint256 amount, uint256 targetChain, address targetAddress) external payable returns (bytes32 txId)',
  'function releaseTokens(bytes32 txId) external',
  'function burnAndBridge(address token, uint256 amount, uint256 targetChain, address targetAddress) external returns (bytes32 txId)',
  'function getTransaction(bytes32 txId) external view returns (tuple(bytes32 txId, address user, address token, uint256 amount, uint256 fee, uint256 sourceChain, uint256 targetChain, address targetAddress, uint256 timestamp, uint8 status))',
  'function getUserTransactions(address user) external view returns (bytes32[] memory)',
  'function supportedTokens(address token) external view returns (tuple(address tokenAddress, uint256 chainId, bool isNative, bool isActive, uint256 minAmount, uint256 maxAmount, uint256 fee))',
  'function bridgeFee() external view returns (uint256)',
  'event TokenLocked(bytes32 indexed txId, address indexed user, address indexed token, uint256 amount, uint256 targetChain, address targetAddress)',
  'event TokenReleased(bytes32 indexed txId, address indexed user, address indexed token, uint256 amount)',
  'event TokenMinted(bytes32 indexed txId, address indexed user, address indexed token, uint256 amount)',
  'event TokenBurned(bytes32 indexed txId, address indexed user, address indexed token, uint256 amount)',
  'event BridgeCompleted(bytes32 indexed txId)'
]

export interface BridgeTransaction {
  txId: string
  user: string
  token: string
  amount: string
  fee: string
  sourceChain: number
  targetChain: number
  targetAddress: string
  timestamp: number
  status: BridgeStatus
}

export enum BridgeStatus {
  Pending = 0,
  Locked = 1,
  Released = 2,
  Completed = 3,
  Failed = 4
}

export const useBridgeContract = () => {
  const { provider, chainId, account } = useWallet()
  const [bridgeContract, setBridgeContract] = useState<ethers.Contract | null>(null)

  useEffect(() => {
    if (!provider || !chainId) {
      setBridgeContract(null)
      return
    }

    const addresses = getContractAddresses(chainId)
    if (!addresses) {
      setBridgeContract(null)
      return
    }

    const signer = provider.getSigner()
    const bridge = new ethers.Contract(addresses.bridge, BRIDGE_ABI, signer)
    setBridgeContract(bridge)
  }, [provider, chainId])

  const lockTokens = async (
    tokenAddress: string,
    amount: string,
    targetChain: number,
    targetAddress?: string
  ) => {
    if (!bridgeContract || !account) throw new Error('Bridge contract not available')
    
    const destination = targetAddress || account
    const tx = await bridgeContract.lockTokens(
      tokenAddress,
      ethers.parseEther(amount),
      targetChain,
      destination
    )
    
    return tx.wait()
  }

  const burnAndBridge = async (
    tokenAddress: string,
    amount: string,
    targetChain: number,
    targetAddress?: string
  ) => {
    if (!bridgeContract || !account) throw new Error('Bridge contract not available')
    
    const destination = targetAddress || account
    const tx = await bridgeContract.burnAndBridge(
      tokenAddress,
      ethers.parseEther(amount),
      targetChain,
      destination
    )
    
    return tx.wait()
  }

  const releaseTokens = async (txId: string) => {
    if (!bridgeContract) throw new Error('Bridge contract not available')
    
    const tx = await bridgeContract.releaseTokens(txId)
    return tx.wait()
  }

  const getTransaction = async (txId: string): Promise<BridgeTransaction> => {
    if (!bridgeContract) throw new Error('Bridge contract not available')
    
    const tx = await bridgeContract.getTransaction(txId)
    return {
      txId: tx.txId,
      user: tx.user,
      token: tx.token,
      amount: ethers.formatEther(tx.amount),
      fee: ethers.formatEther(tx.fee),
      sourceChain: Number(tx.sourceChain),
      targetChain: Number(tx.targetChain),
      targetAddress: tx.targetAddress,
      timestamp: Number(tx.timestamp),
      status: tx.status as BridgeStatus
    }
  }

  const getUserTransactions = async (userAddress?: string): Promise<string[]> => {
    if (!bridgeContract) throw new Error('Bridge contract not available')
    
    const address = userAddress || account
    if (!address) throw new Error('No address provided')
    
    return await bridgeContract.getUserTransactions(address)
  }

  const getBridgeFee = async (): Promise<string> => {
    if (!bridgeContract) throw new Error('Bridge contract not available')
    
    const fee = await bridgeContract.bridgeFee()
    return (Number(fee) / 100).toString() // Convert basis points to percentage
  }

  const getSupportedToken = async (tokenAddress: string) => {
    if (!bridgeContract) throw new Error('Bridge contract not available')
    
    const tokenInfo = await bridgeContract.supportedTokens(tokenAddress)
    return {
      tokenAddress: tokenInfo.tokenAddress,
      chainId: Number(tokenInfo.chainId),
      isNative: tokenInfo.isNative,
      isActive: tokenInfo.isActive,
      minAmount: ethers.formatEther(tokenInfo.minAmount),
      maxAmount: ethers.formatEther(tokenInfo.maxAmount),
      fee: Number(tokenInfo.fee) / 100 // Convert basis points to percentage
    }
  }

  const estimateBridgeFee = async (tokenAddress: string, amount: string) => {
    try {
      const tokenInfo = await getSupportedToken(tokenAddress)
      const amountBN = ethers.parseEther(amount)
      const feeBN = (amountBN * BigInt(tokenInfo.fee * 100)) / BigInt(10000)
      return ethers.formatEther(feeBN)
    } catch (error) {
      console.error('Error estimating bridge fee:', error)
      return '0'
    }
  }

  return {
    bridgeContract,
    lockTokens,
    burnAndBridge,
    releaseTokens,
    getTransaction,
    getUserTransactions,
    getBridgeFee,
    getSupportedToken,
    estimateBridgeFee
  }
}