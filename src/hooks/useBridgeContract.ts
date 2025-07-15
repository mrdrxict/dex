import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWallet } from '../contexts/WalletContext'
import { getContractAddresses } from '../constants/contracts'
import BRIDGE_ABI from '../../abi/Bridge/BridgeCore.json'

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

    const loadContract = async () => {
      try {
        const signer = await provider.getSigner()
        const bridge = new ethers.Contract(addresses.bridge, BRIDGE_ABI, signer)
        setBridgeContract(bridge)
      } catch (error) {
        console.error('Error loading bridge contract:', error)
        setBridgeContract(null)
      }
    }

    loadContract()
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

  const estimateBridgeFee = async (tokenAddress: string, amount: string) => {
    if (!bridgeContract) throw new Error('Bridge contract not available')
    
    try {
      const tokenInfo = await bridgeContract.supportedTokens(tokenAddress)
      const amountBN = ethers.parseEther(amount)
      const feeBN = (amountBN * BigInt(tokenInfo.fee)) / BigInt(10000)
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
    getTransaction,
    getUserTransactions,
    estimateBridgeFee
  }
}