import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useWallet } from '../../contexts/WalletContext'
import { SUPPORTED_CHAINS, getChainById } from '../../constants/chains'

const ChainSelector: React.FC = () => {
  const { chainId, switchChain } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  const currentChain = chainId ? getChainById(chainId) : null

  const handleChainSelect = async (targetChainId: number) => {
    await switchChain(targetChainId)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
      >
        {currentChain ? (
          <>
            <span className="text-lg">{currentChain.icon}</span>
            <span className="font-medium">{currentChain.name}</span>
          </>
        ) : (
          <span className="font-medium">Unknown Chain</span>
        )}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[160px]">
          {SUPPORTED_CHAINS.map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleChainSelect(chain.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                chainId === chain.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : ''
              }`}
            >
              <span className="text-lg">{chain.icon}</span>
              <span className="font-medium">{chain.name}</span>
            </button>
          ))}
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