import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWallet } from '../contexts/WalletContext'

const FARMING_ABI = [
  'function addPool(address lpToken, uint256 allocPoint, string memory name, bool withUpdate) external',
  'function setPool(uint256 pid, uint256 allocPoint, bool withUpdate) external',
  'function setPoolStatus(uint256 pid, bool isActive) external',
  'function setEmissionRate(uint256 esrPerSecond) external',
  'function deposit(uint256 pid, uint256 amount) external',
  'function withdraw(uint256 pid, uint256 amount) external',
  'function harvest(uint256 pid) external',
  'function harvestAll() external',
  'function pendingESR(uint256 pid, address user) external view returns (uint256)',
  'function getUserInfo(uint256 pid, address user) external view returns (uint256 amount, uint256 rewardDebt, uint256 stakedAt, uint256 pendingRewards)',
  'function getPoolInfo(uint256 pid) external view returns (address lpToken, uint256 allocPoint, uint256 lastRewardTime, uint256 accESRPerShare, uint256 totalStaked, bool isActive, string memory name)',
  'function getAllPools() external view returns (address[] memory lpTokens, uint256[] memory allocPoints, uint256[] memory totalStaked, bool[] memory isActive, string[] memory names)',
  'function getFarmingStats() external view returns (uint256 totalPools, uint256 totalAllocPoint, uint256 esrPerSecond, uint256 totalValueLocked)',
  'function poolLength() external view returns (uint256)',
  'function massUpdatePools() external',
  'function updatePool(uint256 pid) external',
  'event Deposit(address indexed user, uint256 indexed pid, uint256 amount)',
  'event Withdraw(address indexed user, uint256 indexed pid, uint256 amount)',
  'event Harvest(address indexed user, uint256 indexed pid, uint256 amount)',
  'event PoolAdded(uint256 indexed pid, address indexed lpToken, uint256 allocPoint)',
  'event PoolUpdated(uint256 indexed pid, uint256 allocPoint)',
  'event EmissionRateUpdated(uint256 esrPerSecond)'
]

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address owner) external view returns (uint256)'
]

export const useFarmingContract = () => {
  const { provider, chainId, account } = useWallet()
  const [farmingContract, setFarmingContract] = useState<ethers.Contract | null>(null)

  // Contract addresses - update after deployment
  const FARMING_ADDRESS = '0x0000000000000000000000000000000000000000' // Deploy farming contract here

  useEffect(() => {
    const initializeContract = async () => {
      if (!provider || !chainId) {
        setFarmingContract(null)
        return
      }

      try {
        const signer = await provider.getSigner()
        const farming = new ethers.Contract(FARMING_ADDRESS, FARMING_ABI, signer)
        setFarmingContract(farming)
      } catch (error) {
        console.error('Error initializing farming contract:', error)
      }
    }

    initializeContract()
  }, [provider, chainId])

  const getLPContract = async (lpTokenAddress: string) => {
    if (!provider) return null
    const signer = await provider.getSigner()
    return new ethers.Contract(lpTokenAddress, ERC20_ABI, signer)
  }

  const deposit = async (pid: number, amount: string) => {
    if (!farmingContract || !account) throw new Error('Contract not available')

    const poolInfo = await farmingContract.getPoolInfo(pid)
    const lpContract = await getLPContract(poolInfo.lpToken)
    if (!lpContract) throw new Error('LP contract not available')

    const amountWei = ethers.parseEther(amount)
    
    // Check allowance
    const allowance = await lpContract.allowance(account, FARMING_ADDRESS)
    if (allowance < amountWei) {
      const approveTx = await lpContract.approve(FARMING_ADDRESS, amountWei)
      await approveTx.wait()
    }

    const tx = await farmingContract.deposit(pid, amountWei)
    return tx.wait()
  }

  const withdraw = async (pid: number, amount: string) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const tx = await farmingContract.withdraw(pid, ethers.parseEther(amount))
    return tx.wait()
  }

  const harvest = async (pid: number) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const tx = await farmingContract.harvest(pid)
    return tx.wait()
  }

  const harvestAll = async () => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const tx = await farmingContract.harvestAll()
    return tx.wait()
  }

  const pendingESR = async (pid: number, userAddress: string) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const pending = await farmingContract.pendingESR(pid, userAddress)
    return ethers.formatEther(pending)
  }

  const getUserInfo = async (pid: number, userAddress: string) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const info = await farmingContract.getUserInfo(pid, userAddress)
    return {
      amount: ethers.formatEther(info.amount),
      rewardDebt: ethers.formatEther(info.rewardDebt),
      stakedAt: Number(info.stakedAt),
      pendingRewards: ethers.formatEther(info.pendingRewards)
    }
  }

  const getPoolInfo = async (pid: number) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const info = await farmingContract.getPoolInfo(pid)
    return {
      lpToken: info.lpToken,
      allocPoint: Number(info.allocPoint),
      lastRewardTime: Number(info.lastRewardTime),
      accESRPerShare: ethers.formatEther(info.accESRPerShare),
      totalStaked: ethers.formatEther(info.totalStaked),
      isActive: info.isActive,
      name: info.name
    }
  }

  const getAllPools = async () => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const pools = await farmingContract.getAllPools()
    return {
      lpTokens: pools.lpTokens,
      allocPoints: pools.allocPoints.map((ap: bigint) => Number(ap)),
      totalStaked: pools.totalStaked.map((ts: bigint) => ethers.formatEther(ts)),
      isActive: pools.isActive,
      names: pools.names
    }
  }

  const getFarmingStats = async () => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const stats = await farmingContract.getFarmingStats()
    return {
      totalPools: Number(stats.totalPools),
      totalAllocPoint: Number(stats._totalAllocPoint),
      esrPerSecond: ethers.formatEther(stats._esrPerSecond),
      totalValueLocked: ethers.formatEther(stats.totalValueLocked)
    }
  }

  // Admin functions
  const addPool = async (lpToken: string, allocPoint: number, name: string, withUpdate: boolean = true) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const tx = await farmingContract.addPool(lpToken, allocPoint, name, withUpdate)
    return tx.wait()
  }

  const setPool = async (pid: number, allocPoint: number, withUpdate: boolean = true) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const tx = await farmingContract.setPool(pid, allocPoint, withUpdate)
    return tx.wait()
  }

  const setPoolStatus = async (pid: number, isActive: boolean) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const tx = await farmingContract.setPoolStatus(pid, isActive)
    return tx.wait()
  }

  const setEmissionRate = async (esrPerSecond: string) => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const tx = await farmingContract.setEmissionRate(ethers.parseEther(esrPerSecond))
    return tx.wait()
  }

  const massUpdatePools = async () => {
    if (!farmingContract) throw new Error('Contract not available')
    
    const tx = await farmingContract.massUpdatePools()
    return tx.wait()
  }

  return {
    farmingContract,
    deposit,
    withdraw,
    harvest,
    harvestAll,
    pendingESR,
    getUserInfo,
    getPoolInfo,
    getAllPools,
    getFarmingStats,
    addPool,
    setPool,
    setPoolStatus,
    setEmissionRate,
    massUpdatePools
  }
}