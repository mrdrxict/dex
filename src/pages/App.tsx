import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './contexts/WalletContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Swap from './pages/Swap'
import Pools from './pages/Pools'
import Bridge from './pages/Bridge'
import Stake from './pages/Stake'
import Farm from './pages/Farm'
import Analytics from './pages/Analytics'
import NetworkSwitcher from './components/NetworkSwitcher'
import AdminRewards from './pages/AdminRewards'
import AdminPanel from './components/AdminPanel'
import Settings from './pages/Settings'

function App() {
  const [testnetMode, setTestnetMode] = useState(false)

  return (
    <ThemeProvider>
      <WalletProvider>
        <Router>
          <Layout testnetMode={testnetMode} setTestnetMode={setTestnetMode}>
            <NetworkSwitcher testnetMode={testnetMode} />
            <Routes>
              <Route path="/" element={<Swap testnetMode={testnetMode} />} />
              <Route path="/pools" element={<Pools testnetMode={testnetMode} />} />
              <Route path="/bridge" element={<Bridge testnetMode={testnetMode} />} />
              <Route path="/stake" element={<Stake testnetMode={testnetMode} />} />
              <Route path="/farm" element={<Farm testnetMode={testnetMode} />} />
              <Route path="/analytics" element={<Analytics testnetMode={testnetMode} />} />
              <Route path="/admin/rewards" element={<AdminRewards />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App