import React from 'react'
import { Wallet, LogOut } from 'lucide-react'
import { useWallet } from '../../contexts/WalletContext'
import { isMobileDevice } from '../../utils/device'

const WalletButton: React.FC = () => {
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet()
  const isMobile = isMobileDevice()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isConnected && account) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-2 rounded-lg text-sm font-medium">
          {formatAddress(account)}
        </div>
        <button
          onClick={disconnectWallet}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          aria-label="Disconnect wallet"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    )
  }

  const handleConnectClick = () => {
    if (isMobile && !window.ethereum) {
      // Open deep link to wallet app
      window.location.href = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`
      return
    }
    connectWallet()
  }

  return (
    <button
      onClick={handleConnectClick}
      disabled={isConnecting}
      className="btn-primary flex items-center space-x-2"
    >
      <Wallet className="w-4 h-4" />
      <span>{isConnecting ? 'Connecting...' : isMobile && !window.ethereum ? 'Open in Wallet' : 'Connect Wallet'}</span>
    </button>
  )
}

export default WalletButton