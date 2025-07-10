import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWallet } from '../contexts/WalletContext'

const STAKING_ABI = [
  'function stake(uint256 amount) external',
  'function unstake(uint256 amount) external',
  'function claimRewards(uint256 distributionId) external',
  'function claimAllRewards() external',
  'function getStakeInfo(address user) external view returns (uint256 amount, uint256 stakedAt, uint256 lockEndsAt, bool canUnstake, uint256 pendingRewards)',
  'function getStakingStats() external view returns (uint256 totalStaked, uint256 totalStakers, uint256 totalRewardsDistributed, uint256 pendingRewards, uint256 currentAPR)',
  'function checkFeeRequirements(address user) external view returns (bool hasBalance, bool hasAllowance, uint256 balance, uint256 allowance)',
  'function MINIMUM_STAKE() external view returns (uint256)',
  'function LOCK_PERIOD() external view returns (uint256)',
  'event Staked(address indexed user, uint256 amount)',
  'event Unstaked(address indexed user, uint256 amount)',
  'event RewardsClaimed(address indexed user, uint256 distributionId, uint256 amount)'
]

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address owner) external view returns (uint256)'
]

export const useStakingContract = () => {
  const { provider, chainId, account } = useWallet()
  const [stakingContract, setStakingContract] = useState<ethers.Contract | null>(null)
  const [esrContract, setEsrContract] = useState<ethers.Contract | null>(null)
  const [usdtContract, setUsdtContract] = useState<ethers.Contract | null>(null)

  // Contract addresses - these should be updated after deployment
  const STAKING_ADDRESS = '0x0000000000000000000000000000000000000000' // Deploy staking contract here
  const ESR_ADDRESS = '0x0000000000000000000000000000000000000000'    // ESR token address
  const USDT_ADDRESS = '0x0000000000000000000000000000000000000000'   // USDT token address

  useEffect(() => {
    const initializeContracts = async () => {
      if (!provider || !chainId) {
        setStakingContract(null)
        setEsrContract(null)
        setUsdtContract(null)
        return
      }

      try {
        const signer = await provider.getSigner()
        
        const staking = new ethers.Contract(STAKING_ADDRESS, STAKING_ABI, signer)
        const esr = new ethers.Contract(ESR_ADDRESS, ERC20_ABI, signer)
        const usdt = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer)

        setStakingContract(staking)
        setEsrContract(esr)
        setUsdtContract(usdt)
      } catch (error) {
        console.error('Error initializing staking contracts:', error)
      }
    }

    initializeContracts()
  }, [provider, chainId])

  const stakeESR = async (amount: string) => {
    if (!stakingContract || !esrContract || !account) {
      throw new Error('Contracts not available')
    }

    const amountWei = ethers.parseEther(amount)
    
    // Check allowance
    const allowance = await esrContract.allowance(account, STAKING_ADDRESS)
    if (allowance < amountWei) {
      const approveTx = await esrContract.approve(STAKING_ADDRESS, amountWei)
      await approveTx.wait()
    }

    const tx = await stakingContract.stake(amountWei)
    return tx.wait()
  }

  const unstakeESR = async (amount: string) => {
    if (!stakingContract) throw new Error('Staking contract not available')
    
    const tx = await stakingContract.unstake(ethers.parseEther(amount))
    return tx.wait()
  }

  const claimRewards = async (distributionId: number) => {
    if (!stakingContract) throw new Error('Staking contract not available')
    
    const tx = await stakingContract.claimRewards(distributionId)
    return tx.wait()
  }

  const claimAllRewards = async () => {
    if (!stakingContract) throw new Error('Staking contract not available')
    
    const tx = await stakingContract.claimAllRewards()
    return tx.wait()
  }

  const getStakeInfo = async (userAddress: string) => {
    if (!stakingContract) throw new Error('Staking contract not available')
    
    const info = await stakingContract.getStakeInfo(userAddress)
    return {
      amount: ethers.formatEther(info.amount),
      stakedAt: Number(info.stakedAt),
      lockEndsAt: Number(info.lockEndsAt),
      canUnstake: info.canUnstake,
      pendingRewards: ethers.formatUnits(info.pendingRewards, 6) // USDT has 6 decimals
    }
  }

  const getStakingStats = async () => {
    if (!stakingContract) throw new Error('Staking contract not available')
    
    const stats = await stakingContract.getStakingStats()
    return {
      totalStaked: ethers.formatEther(stats.totalStaked),
      totalStakers: Number(stats.totalStakers),
      totalRewardsDistributed: ethers.formatUnits(stats.totalRewardsDistributed, 6),
      pendingRewards: ethers.formatUnits(stats.pendingRewards, 6),
      currentAPR: ethers.formatEther(stats.currentAPR)
    }
  }

  const checkFeeRequirements = async (userAddress: string) => {
    if (!stakingContract) throw new Error('Staking contract not available')
    
    const requirements = await stakingContract.checkFeeRequirements(userAddress)
    return {
      hasBalance: requirements.hasBalance,
      hasAllowance: requirements.hasAllowance,
      balance: requirements.balance.toString(),
      allowance: requirements.allowance.toString()
    }
  }

  const approveUSDT = async (spenderAddress: string, amount: string) => {
    if (!usdtContract) throw new Error('USDT contract not available')
    
    const tx = await usdtContract.approve(spenderAddress, ethers.parseUnits(amount, 6))
    return tx.wait()
  }

  const getUSDTBalance = async (userAddress: string) => {
    if (!usdtContract) throw new Error('USDT contract not available')
    
    const balance = await usdtContract.balanceOf(userAddress)
    return ethers.formatUnits(balance, 6)
  }

  return {
    stakingContract,
    esrContract,
    usdtContract,
    stakeESR,
    unstakeESR,
    claimRewards,
    claimAllRewards,
    getStakeInfo,
    getStakingStats,
    checkFeeRequirements,
    approveUSDT,
    getUSDTBalance
  }
}