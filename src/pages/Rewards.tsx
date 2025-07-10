import React, { useState } from 'react'
import { Gift, Lock, Zap } from 'lucide-react'
import { useWallet } from '../contexts/WalletContext'

const Rewards: React.FC = () => {
  const { isConnected } = useWallet()
  const [activeTab, setActiveTab] = useState<'staking' | 'farming'>('staking')

  const stakingPools = [
    {
      id: 1,
      token: 'DXB',
      name: 'DexBridge Token',
      apr: '25.5%',
      lockPeriod: '30 days',
      totalStaked: '$2.1M',
      userStaked: '0',
      rewards: '0'
    },
    {
      id: 2,
      token: 'LP-ETH/USDC',
      name: 'ETH/USDC LP Token',
      apr: '18.2%',
      lockPeriod: '7 days',
      totalStaked: '$5.6M',
      userStaked: '0',
      rewards: '0'
    }
  ]

  const farmingPools = [
    {
      id: 1,
      pair: 'ETH/USDC',
      apr: '45.8%',
      multiplier: '2x',
      totalLiquidity: '$8.9M',
      userLiquidity: '0',
      rewards: '0'
    },
    {
      id: 2,
      pair: 'WBTC/ETH',
      apr: '32.1%',
      multiplier: '1.5x',
      totalLiquidity: '$4.2M',
      userLiquidity: '0',
      rewards: '0'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Rewards</h1>
        <div className="card p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Rewards Earned</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">$0.00</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('staking')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            activeTab === 'staking'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Staking</span>
        </button>
        <button
          onClick={() => setActiveTab('farming')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            activeTab === 'farming'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Farming</span>
        </button>
      </div>

      {activeTab === 'staking' && (
        <div className="space-y-4">
          {stakingPools.map((pool) => (
            <div key={pool.id} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{pool.token[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{pool.token}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{pool.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{pool.apr}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">APR</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lock Period</p>
                  <p className="font-medium">{pool.lockPeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Staked</p>
                  <p className="font-medium">{pool.totalStaked}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your Stake</p>
                  <p className="font-medium">{pool.userStaked}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rewards</p>
                  <p className="font-medium text-green-600 dark:text-green-400">{pool.rewards}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="btn-primary flex-1">
                  Stake
                </button>
                <button className="btn-secondary">
                  Claim Rewards
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'farming' && (
        <div className="space-y-4">
          {farmingPools.map((pool) => (
            <div key={pool.id} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {pool.pair.split('/')[0][0]}
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold -ml-2">
                      {pool.pair.split('/')[1][0]}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{pool.pair}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                        {pool.multiplier}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{pool.apr}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">APR</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Liquidity</p>
                  <p className="font-medium">{pool.totalLiquidity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your Liquidity</p>
                  <p className="font-medium">{pool.userLiquidity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rewards</p>
                  <p className="font-medium text-green-600 dark:text-green-400">{pool.rewards}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="btn-primary flex-1">
                  Add Liquidity
                </button>
                <button className="btn-secondary">
                  Harvest
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isConnected && (
        <div className="card p-12 text-center mt-8">
          <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Connect your wallet to view and manage your rewards.
          </p>
        </div>
      )}
    </div>
  )
}

export default Rewards