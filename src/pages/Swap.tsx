import React, { useState } from 'react'
import { ArrowUpDown, Settings, AlertCircle } from 'lucide-react'
import { Token } from '../constants/tokens'
import { useWallet } from '../contexts/WalletContext'
import { useDexContract } from '../hooks/useDexContract'
import TokenSelector from '../components/TokenSelector'

const Swap: React.FC = () => {
  const { isConnected, account } = useWallet()
  const { 
    swapExactTokensForTokens, 
    getAmountsOut, 
    approveToken, 
    getTokenAllowance,
    contracts 
  } = useDexContract()
  
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [isSwapping, setIsSwapping] = useState(false)
  const [priceImpact, setPriceImpact] = useState('0')
  const [needsApproval, setNeedsApproval] = useState(false)
  const [feeWarning, setFeeWarning] = useState('')

  const calculateOutputAmount = async () => {
    if (!fromToken || !toToken || !fromAmount || !contracts.router) return
    
    try {
      const path = [fromToken.address, toToken.address]
      const amounts = await getAmountsOut(fromAmount, path)
      setToAmount(amounts[1])
      
      // Calculate price impact (simplified)
      const impact = ((parseFloat(amounts[0]) - parseFloat(amounts[1])) / parseFloat(amounts[0]) * 100).toFixed(2)
      setPriceImpact(impact)
    } catch (error) {
      console.error('Error calculating output amount:', error)
      setToAmount('0')
    }
  }

  const checkApproval = async () => {
    if (!fromToken || !fromAmount || !contracts.router || !account) return
    
    try {
      const allowance = await getTokenAllowance(fromToken.address, contracts.router.target as string)
      setNeedsApproval(parseFloat(allowance) < parseFloat(fromAmount))
    } catch (error) {
      console.error('Error checking approval:', error)
      setNeedsApproval(true)
    }
  }

  const checkUSDTFeeRequirements = async () => {
    // This would check if user has $3 USDT balance and allowance
    // Implementation depends on your fee contract integration
    try {
      // Mock check - replace with actual contract call
      const hasUSDT = true // await checkFeeRequirements(account)
      if (!hasUSDT) {
        setFeeWarning('You need $3 USDT balance and approval for swap fees')
      } else {
        setFeeWarning('')
      }
    } catch (error) {
      setFeeWarning('Unable to verify USDT fee requirements')
    }
  }

  React.useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      calculateOutputAmount()
      checkApproval()
      checkUSDTFeeRequirements()
    }
  }, [fromToken, toToken, fromAmount])

  const handleSwapTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleApprove = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    
    if (!fromToken || !contracts.router) return
    
    try {
      setIsSwapping(true)
      await approveToken(fromToken.address, contracts.router.target as string, fromAmount)
      setNeedsApproval(false)
    } catch (error) {
      console.error('Approval failed:', error)
      alert('Approval failed. Please try again.')
    } finally {
      setIsSwapping(false)
    }
  }

  const handleSwap = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    
    if (!fromToken || !toToken || !fromAmount || !toAmount) {
      alert('Please select tokens and enter amounts')
      return
    }
    
    try {
      setIsSwapping(true)
      const path = [fromToken.address, toToken.address]
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes
      const minAmountOut = (parseFloat(toAmount) * (100 - parseFloat(slippage)) / 100).toString()
      
      const tx = await swapExactTokensForTokens(fromAmount, minAmountOut, path, deadline)
      
      alert('Swap successful!')
      setFromAmount('')
      setToAmount('')
    } catch (error) {
      console.error('Swap failed:', error)
      alert('Swap failed. Please try again.')
    } finally {
      setIsSwapping(false)
    }
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
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Slippage Tolerance</span>
              <span className="font-medium">{slippage}%</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Swap Fee</span>
              <span className="font-medium text-orange-600 dark:text-orange-400">$3 USDT</span>
            </div>
            {parseFloat(priceImpact) > 5 && (
              <div className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400">
                <AlertCircle className="w-4 h-4" />
                <span>High price impact: {priceImpact}%</span>
              </div>
            )}
            {feeWarning && (
              <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>{feeWarning}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {needsApproval && isConnected ? (
            <button
              onClick={handleApprove}
              disabled={isSwapping || !fromToken}
              className="w-full btn-primary py-4 text-lg font-semibold"
            >
              {isSwapping ? 'Approving...' : `Approve ${fromToken?.symbol}`}
            </button>
          ) : (
            <button
              onClick={handleSwap}
              disabled={!fromToken || !toToken || !fromAmount || !isConnected || isSwapping}
              className="w-full btn-primary py-4 text-lg font-semibold"
            >
              {!isConnected ? 'Connect Wallet' : isSwapping ? 'Swapping...' : 'Swap'}
            </button>
          )}
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