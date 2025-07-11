import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { WalletProvider } from '../contexts/WalletContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import Layout from '../components/Layout/Layout'
import NetworkSwitcher from '../components/NetworkSwitcher'
import Swap from './Swap'
import Pools from './Pools'
import Bridge from './Bridge'
import Stake from './Stake'
import Farm from './Farm'
import Analytics from './Analytics'
import Settings from './Settings'
import AdminRewards from './AdminRewards'
import AdminPanel from '../components/AdminPanel'

function App() {
  const [testnetMode, setTestnetMode] = useState(false);

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
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin/rewards" element={<AdminRewards />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App