import React, { useState } from 'react'
import { Plus, Droplets } from 'lucide-react'
import { useWallet } from '../contexts/WalletContext'
import { useDexContract } from '../hooks/useDexContract'
import { getTokensByChain } from '../constants/tokens'

const Pools: React.FC = () => {
  const { isConnected, chainId } = useWallet()
  const { addLiquidity, removeLiquidity, getPairAddress, createPair } = useDexContract()
  const [activeTab, setActiveTab] = useState<'pools' | 'positions'>('pools')
  const [showAddLiquidity, setShowAddLiquidity] = useState(false)
  const [tokenA, setTokenA] = useState('')
  const [tokenB, setTokenB] = useState('')
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false)

  const availableTokens = chainId ? getTokensByChain(chainId) : []

  const handleAddLiquidity = async () => {
    if (!tokenA || !tokenB || !amountA || !amountB) {
      alert('Please fill in all fields')
      return
    }

    try {
      setIsAddingLiquidity(true)
      
      // Check if pair exists, create if not
      const pairAddress = await getPairAddress(tokenA, tokenB)
      if (pairAddress === '0x0000000000000000000000000000000000000000') {
        await createPair(tokenA, tokenB)
      }
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes
      const minAmountA = (parseFloat(amountA) * 0.95).toString() // 5% slippage
      const minAmountB = (parseFloat(amountB) * 0.95).toString()
      
      await addLiquidity(tokenA, tokenB, amountA, amountB, minAmountA, minAmountB, deadline)
      
      alert('Liquidity added successfully!')
      setShowAddLiquidity(false)
      setTokenA('')
      setTokenB('')
      setAmountA('')
      setAmountB('')
    } catch (error) {
      console.error('Add liquidity failed:', error)
      alert('Failed to add liquidity. Please try again.')
    } finally {
      setIsAddingLiquidity(false)
    }
  }

  const mockPools = [
    {
      id: 1,
      token0: { symbol: 'ETH', name: 'Ethereum' },
      token1: { symbol: 'USDC', name: 'USD Coin' },
      tvl: '$1,234,567',
      apr: '12.5%',
      volume24h: '$456,789'
    },
    {
      id: 2,
      token0: { symbol: 'WBTC', name: 'Wrapped Bitcoin' },
      token1: { symbol: 'ETH', name: 'Ethereum' },
      tvl: '$987,654',
      apr: '8.3%',
      volume24h: '$234,567'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Liquidity Pools</h1>
        <button className="btn-primary flex items-center space-x-2">
          onClick={() => setShowAddLiquidity(true)}
          <Plus className="w-4 h-4" />
          <span>Add Liquidity</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('pools')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'pools'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          All Pools
        </button>
        <button
          onClick={() => setActiveTab('positions')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'positions'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          My Positions
        </button>
      </div>

      {activeTab === 'pools' && (
        <div className="space-y-4">
          {mockPools.map((pool) => (
            <div key={pool.id} className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {pool.token0.symbol[0]}
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold -ml-2">
                      {pool.token1.symbol[0]}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {pool.token0.symbol}/{pool.token1.symbol}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {pool.token0.name} / {pool.token1.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">TVL</p>
                    <p className="font-semibold">{pool.tvl}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">APR</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">{pool.apr}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
                    <p className="font-semibold">{pool.volume24h}</p>
                  </div>
                  <button className="btn-primary">
                    Add Liquidity
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Liquidity Modal */}
      {showAddLiquidity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-6">Add Liquidity</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Token A
                </label>
                <select
                  value={tokenA}
                  onChange={(e) => setTokenA(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Token A</option>
                  {availableTokens.map((token) => (
                    <option key={token.address} value={token.address}>
                      {token.symbol} - {token.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount A
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Token B
                </label>
                <select
                  value={tokenB}
                  onChange={(e) => setTokenB(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Token B</option>
                  {availableTokens.filter(token => token.address !== tokenA).map((token) => (
                    <option key={token.address} value={token.address}>
                      {token.symbol} - {token.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount B
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  value={amountB}
                  onChange={(e) => setAmountB(e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddLiquidity(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLiquidity}
                  disabled={isAddingLiquidity}
                  className="flex-1 btn-primary"
                >
                  {isAddingLiquidity ? 'Adding...' : 'Add Liquidity'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'positions' && (
        <div className="card p-12 text-center">
          <Droplets className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No liquidity positions</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {isConnected 
              ? "You don't have any liquidity positions yet."
              : "Connect your wallet to view your liquidity positions."
            }
          </p>
          {isConnected && (
            <button className="btn-primary">
              Add Your First Liquidity
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Pools