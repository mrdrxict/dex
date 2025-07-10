import React from 'react'
import { TrendingUp, DollarSign, Users, Activity } from 'lucide-react'

const Analytics: React.FC = () => {
  const stats = [
    {
      title: 'Total Value Locked',
      value: '$12.5M',
      change: '+15.2%',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: '24h Volume',
      value: '$2.8M',
      change: '+8.7%',
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+12.3%',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Total Transactions',
      value: '45,678',
      change: '+5.4%',
      icon: Activity,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ]

  const topPairs = [
    { pair: 'ETH/USDC', volume: '$1.2M', tvl: '$5.6M', fees: '$3,600' },
    { pair: 'WBTC/ETH', volume: '$890K', tvl: '$3.2M', fees: '$2,670' },
    { pair: 'USDC/USDT', volume: '$567K', tvl: '$2.1M', fees: '$1,701' },
    { pair: 'MATIC/USDC', volume: '$234K', tvl: '$1.8M', fees: '$702' }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Volume Chart</h3>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">TVL Chart</h3>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
          </div>
        </div>
      </div>

      {/* Top Trading Pairs */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-6">Top Trading Pairs</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Pair</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">24h Volume</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">TVL</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">24h Fees</th>
              </tr>
            </thead>
            <tbody>
              {topPairs.map((pair, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {pair.pair.split('/')[0][0]}
                        </div>
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold -ml-1">
                          {pair.pair.split('/')[1][0]}
                        </div>
                      </div>
                      <span className="font-medium">{pair.pair}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-medium">{pair.volume}</td>
                  <td className="py-4 px-4 text-right font-medium">{pair.tvl}</td>
                  <td className="py-4 px-4 text-right font-medium text-green-600 dark:text-green-400">{pair.fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics