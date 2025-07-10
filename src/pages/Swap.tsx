import React, { useState } from 'react'
import { ArrowUpDown, Settings } from 'lucide-react'
import { Token } from '../constants/tokens'
import { useWallet } from '../contexts/WalletContext'
import TokenSelector from '../components/TokenSelector'

const Swap: React.FC = () => {
  const { isConnected } = useWallet()
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')

  const handleSwapTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleSwap = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    // Implement swap logic here
    console.log('Swapping:', { fromToken, toToken, fromAmount, toAmount })
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Swap</h2>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* From Token */}
          <div className="space-y-2">
            <TokenSelector
              selectedToken={fromToken}
              onTokenSelect={setFromToken}
              label="From"
            />
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="input-field text-right text-2xl font-semibold"
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapTokens}
              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <TokenSelector
              selectedToken={toToken}
              onTokenSelect={setToToken}
              label="To"
            />
            <input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="input-field text-right text-2xl font-semibold"
              readOnly
            />
          </div>

          {/* Slippage Settings */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Slippage Tolerance</span>
              <span className="font-medium">{slippage}%</span>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!fromToken || !toToken || !fromAmount || !isConnected}
            className="w-full btn-primary py-4 text-lg font-semibold"
          >
            {!isConnected ? 'Connect Wallet' : 'Swap'}
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No recent transactions
        </div>
      </div>
    </div>
  )
}

export default Swap