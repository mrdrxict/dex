import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useWallet } from '../../contexts/WalletContext'
import WalletButton from '../Wallet/WalletButton'
import ChainSelector from '../Wallet/ChainSelector'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { isConnected } = useWallet()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DB</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              DexBridge
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected && <ChainSelector />}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header