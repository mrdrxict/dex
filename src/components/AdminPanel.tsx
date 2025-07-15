import React, { useState, useEffect } from 'react'
import { Shield, Plus, Settings, Users, Gift } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWallet } from '../contexts/WalletContext'
import { useBridgeContract } from '../hooks/useBridgeContract'

const AdminPanel: React.FC = () => {
  const { account, isConnected } = useWallet()
  const { bridgeContract } = useBridgeContract()
  const [activeTab, setActiveTab] = useState<'tokens' | 'relayers' | 'settings'>('tokens')
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(false)

  const [newToken, setNewToken] = useState({
    address: '',
    chainId: '',
    isNative: false,
    minAmount: '',
    maxAmount: '',
    fee: ''
  })

  const [newRelayer, setNewRelayer] = useState('')

  // Check if current account is contract owner
  useEffect(() => {
    const checkOwnership = async () => {
      if (!bridgeContract || !account) {
        setIsOwner(false)
        return
      }

      try {
        const owner = await bridgeContract.owner()
        setIsOwner(owner.toLowerCase() === account.toLowerCase())
      } catch (error) {
        console.error('Error checking ownership:', error)
        setIsOwner(false)
      }
    }

    checkOwnership()
  }, [bridgeContract, account])

  const handleAddToken = async () => {
    if (!bridgeContract || !newToken.address || !newToken.chainId) {
      alert('Please fill in required fields')
      return
    }
    
    try {
      setLoading(true)
      const tx = await bridgeContract.addSupportedToken(
        newToken.address,
        parseInt(newToken.chainId),
        newToken.isNative,
        newToken.minAmount || '0',
        newToken.maxAmount || ethers.parseEther('1000000').toString(),
        parseInt(newToken.fee) || 250 // 2.5% default
      )
      await tx.wait()
      
      alert('Token added successfully!')
      setNewToken({
        address: '',
        chainId: '',
        isNative: false,
        minAmount: '',
        maxAmount: '',
        fee: ''
      })
    } catch (error) {
      console.error('Failed to add token:', error)
      alert('Failed to add token: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddRelayer = async () => {
    if (!bridgeContract || !newRelayer) {
      alert('Please enter relayer address')
      return
    }
    
    try {
      setLoading(true)
      const tx = await bridgeContract.addRelayer(newRelayer)
      await tx.wait()
      alert('Relayer added successfully!')
      setNewRelayer('')
    } catch (error) {
      console.error('Failed to add relayer:', error)
      alert('Failed to add relayer: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card p-12 text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Admin Access Required</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please connect your wallet to access the admin panel.
          </p>
        </div>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card p-12 text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Access Denied</h3>
          <p className="text-gray-500 dark:text-gray-400">
            You don't have permission to access the admin panel. Only the contract owner can access this area.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Connected as: {account}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-2 mb-8">
        <Shield className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold">Bridge Admin Panel</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('tokens')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            activeTab === 'tokens'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Tokens</span>
        </button>
        <button
          onClick={() => setActiveTab('relayers')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            activeTab === 'relayers'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Relayers</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            activeTab === 'settings'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <Link
          to="/admin/rewards"
          className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        >
          <Gift className="w-4 h-4" />
          <span>Rewards</span>
        </Link>
      </div>

      {activeTab === 'tokens' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6">Add Supported Token</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token Address *
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={newToken.address}
                onChange={(e) => setNewToken({ ...newToken, address: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chain ID *
              </label>
              <input
                type="number"
                placeholder="1"
                value={newToken.chainId}
                onChange={(e) => setNewToken({ ...newToken, chainId: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Amount (ETH)
              </label>
              <input
                type="number"
                placeholder="0.01"
                value={newToken.minAmount}
                onChange={(e) => setNewToken({ ...newToken, minAmount: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maximum Amount (ETH)
              </label>
              <input
                type="number"
                placeholder="1000"
                value={newToken.maxAmount}
                onChange={(e) => setNewToken({ ...newToken, maxAmount: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fee (basis points, 100 = 1%)
              </label>
              <input
                type="number"
                placeholder="250"
                value={newToken.fee}
                onChange={(e) => setNewToken({ ...newToken, fee: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isNative"
                checked={newToken.isNative}
                onChange={(e) => setNewToken({ ...newToken, isNative: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="isNative" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Is Native Token
              </label>
            </div>
          </div>
          <button
            onClick={handleAddToken}
            disabled={loading}
            className="btn-primary mt-6"
          >
            {loading ? 'Adding...' : 'Add Token'}
          </button>
        </div>
      )}

      {activeTab === 'relayers' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6">Manage Relayers</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Relayer Address
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="0x..."
                  value={newRelayer}
                  onChange={(e) => setNewRelayer(e.target.value)}
                  className="input-field flex-1"
                />
                <button
                  onClick={handleAddRelayer}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Adding...' : 'Add Relayer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6">Bridge Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Global Bridge Fee (basis points)
              </label>
              <input
                type="number"
                placeholder="250"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fee Collector Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                className="input-field"
              />
            </div>
            <div className="flex space-x-3">
              <button className="btn-primary">
                Update Settings
              </button>
              <button className="btn-secondary">
                Pause Bridge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel