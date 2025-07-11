import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}

interface WalletContextType {
  account: string | null
  chainId: number | null
  provider: ethers.BrowserProvider | null
  isConnected: boolean
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchChain: (chainId: number) => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: React.ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const isConnected = !!account

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask or use a Web3-enabled browser!')
      return
    }

    try {
      setIsConnecting(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      
      // Request accounts
      const accounts = await provider.send('eth_requestAccounts', [])
      
      const network = await provider.getNetwork()
      
      setProvider(provider)
      setAccount(accounts[0])
      setChainId(Number(network.chainId))
      
      // Save connection state
      localStorage.setItem('walletConnected', 'true')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setChainId(null)
    setProvider(null)
    localStorage.removeItem('walletConnected')
  }

  const switchChain = async (targetChainId: number) => {
    if (!window.ethereum) return

    const hexChainId = `0x${targetChainId.toString(16)}`

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      })
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added to wallet
        try {
          // Get chain info to add
          const chainInfo = getChainAddParams(targetChainId)
          if (chainInfo) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [chainInfo],
            })
          }
        } catch (addError) {
          console.error('Failed to add chain to wallet:', addError)
        }
      }
    }
  }

  // Helper function to get chain parameters for adding to wallet
  const getChainAddParams = (chainId: number) => {
    const chains: Record<number, any> = {
      1: {
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
        blockExplorerUrls: ['https://etherscan.io'],
      },
      56: {
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorerUrls: ['https://bscscan.com'],
      },
      137: {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
        rpcUrls: ['https://polygon-rpc.com'],
        blockExplorerUrls: ['https://polygonscan.com'],
      },
      42161: {
        chainId: '0xa4b1',
        chainName: 'Arbitrum One',
        nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://arbiscan.io'],
      },
      43114: {
        chainId: '0xa86a',
        chainName: 'Avalanche C-Chain',
        nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://snowtrace.io'],
      },
      250: {
        chainId: '0xfa',
        chainName: 'Fantom Opera',
        nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
        rpcUrls: ['https://rpc.ftm.tools'],
        blockExplorerUrls: ['https://ftmscan.com'],
      },
    }
    
    return chains[chainId]
  }

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
        }
      }

      const handleChainChanged = (chainId: string) => {
        setChainId(parseInt(chainId, 16))
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  // Auto-connect on page load if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      if (window.ethereum && localStorage.getItem('walletConnected') === 'true') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await provider.listAccounts()
          
          if (accounts.length > 0) {
            const network = await provider.getNetwork()
            setProvider(provider)
            setAccount(accounts[0].address)
            setChainId(Number(network.chainId))
          }
        } catch (error) {
          console.error('Auto-connect failed:', error)
        }
      }
    }
    
    autoConnect()
  }, [])

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        provider,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        switchChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}