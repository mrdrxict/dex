import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

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
      alert('Please install MetaMask!')
      return
    }

    try {
      setIsConnecting(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])
      const network = await provider.getNetwork()
      
      setProvider(provider)
      setAccount(accounts[0])
      setChainId(Number(network.chainId))
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
  }

  const switchChain = async (targetChainId: number) => {
    if (!window.ethereum) return

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added to wallet
        console.error('Chain not added to wallet')
      }
    }
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