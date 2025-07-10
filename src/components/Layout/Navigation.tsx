import React from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowLeftRight, Droplets, Grid as Bridge, BarChart3, Gift, Sprout, Shield } from 'lucide-react'
import { useWallet } from '../../contexts/WalletContext'

const Navigation: React.FC = () => {
  const { account } = useWallet()
  
  const navItems = [
    { path: '/', label: 'Swap', icon: ArrowLeftRight },
    { path: '/pools', label: 'Pools', icon: Droplets },
    { path: '/bridge', label: 'Bridge', icon: Bridge },
    { path: '/stake', label: 'Stake', icon: Gift },
    { path: '/farm', label: 'Farm', icon: Sprout },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  // Mock admin check - replace with actual owner verification
  const isAdmin = account === '0x...' // Replace with actual admin check

  // TODO: Replace with actual contract owner check
  // const isAdmin = account && account.toLowerCase() === CONTRACT_OWNER_ADDRESS.toLowerCase()

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  isActive
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
          
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  isActive
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`
              }
            >
              <Shield className="w-4 h-4" />
              <span className="font-medium">Admin</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation