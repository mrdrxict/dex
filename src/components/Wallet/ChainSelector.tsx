import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useWallet } from '../../contexts/WalletContext'
import { SUPPORTED_CHAINS, MAINNET_CHAINS, TESTNET_CHAINS, getChainById, isTestnet } from '../../constants/chains'

const ChainSelector: React.FC = () => {
  const { chainId, switchChain } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [showTestnets, setShowTestnets] = useState(false)

  const currentChain = chainId ? getChainById(chainId) : null
  const currentIsTestnet = chainId ? isTestnet(chainId) : false

  const handleChainSelect = async (targetChainId: number) => {
    await switchChain(targetChainId)
    setIsOpen(false)
  }

  // Filter chains based on testnet toggle
  const displayedChains = showTestnets ? TESTNET_CHAINS : MAINNET_CHAINS;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
      >
        {currentChain ? (
          <>
            <span className="text-lg">{currentChain.icon}</span>
            <span className="font-medium flex items-center">
              {currentChain.name}
              {currentIsTestnet && (
                <span className="ml-1 text-xs px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                  Testnet
                </span>
              )}
            </span>
          </>
        ) : (
          <span className="font-medium">Unknown Chain</span>
        )}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <label className="flex items-center text-sm">
              <input 
                type="checkbox" 
                checked={showTestnets} 
                onChange={() => setShowTestnets(!showTestnets)}
                className="mr-2"
              />
              Show Testnets
            </label>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {displayedChains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleChainSelect(chain.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  chainId === chain.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : ''
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{chain.icon}</span>
                  <span className="font-medium">{chain.name}</span>
                </div>
                {chain.isTestnet && (
                  <span className="text-xs px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                    Testnet
                  </span>
                )}
              </button>
            ))}
            {chainId && !getChainById(chainId) && (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
                Unknown Chain ({chainId})
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default ChainSelector