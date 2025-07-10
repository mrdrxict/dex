import React, { useState } from 'react'
import { Bridge as BridgeIcon, ArrowRight, Clock } from 'lucide-react'
import { SUPPORTED_CHAINS } from '../constants/chains'
import { useWallet } from '../contexts/WalletContext'

const Bridge: React.FC = () => {
  const { isConnected } = useWallet()
  const [fromChain, setFromChain] = useState(SUPPORTED_CHAINS[0])
  const [toChain, setToChain] = useState(SUPPORTED_CHAINS[1])
  const [amount, setAmount] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')

  const handleBridge = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    // Implement bridge logic here
    console.log('Bridging:', { fromChain, toChain, amount, destinationAddress })
  }

  const mockTransactions = [
    {
      id: 1,
      fromChain: 'Ethereum',
      toChain: 'Polygon',
      amount: '100 USDC',
      status: 'completed',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      fromChain: 'BSC',
      toChain: 'Arbitrum',
      amount: '0.5 ETH',
      status: 'pending',
      timestamp: '30 minutes ago'
    }
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6 mb-6">
        <div className="flex items-center space-x-2 mb-6">
          <BridgeIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">Cross-Chain Bridge</h2>
        </div>

        <div className="space-y-6">
          {/* Chain Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <select
                value={fromChain.id}
                onChange={(e) => setFromChain(SUPPORTED_CHAINS.find(c => c.id === Number(e.target.value))!)}
                className="input-field"
              >
                {SUPPORTED_CHAINS.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.icon} {chain.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <select
                value={toChain.id}
                onChange={(e) => setToChain(SUPPORTED_CHAINS.find(c => c.id === Number(e.target.value))!)}
                className="input-field"
              >
                {SUPPORTED_CHAINS.filter(c => c.id !== fromChain.id).map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.icon} {chain.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field text-right text-xl font-semibold"
            />
          </div>

          {/* Destination Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destination Address (Optional)
            </label>
            <input
              type="text"
              placeholder="0x... (leave empty to use connected wallet)"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Bridge Info */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Bridge Fee</span>
              <span className="font-medium">~$2.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Estimated Time</span>
              <span className="font-medium">5-10 minutes</span>
            </div>
          </div>

          {/* Bridge Button */}
          <button
            onClick={handleBridge}
            disabled={!amount || !isConnected}
            className="w-full btn-primary py-4 text-lg font-semibold"
          >
            {!isConnected ? 'Connect Wallet' : 'Bridge Tokens'}
          </button>
        </div>
      </div>

      {/* Bridge History */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Bridge History</h3>
        <div className="space-y-3">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  tx.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <p className="font-medium">{tx.amount}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tx.fromChain} → {tx.toChain}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium capitalize">{tx.status}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {tx.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bridge