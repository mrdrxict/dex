import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './contexts/WalletContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout/Layout'
import Swap from './pages/Swap'
import Pools from './pages/Pools'
import Bridge from './pages/Bridge'
import Stake from './pages/Stake'
import Farm from './pages/Farm'
import Analytics from './pages/Analytics'
import AdminRewards from './pages/AdminRewards'
import AdminPanel from './components/AdminPanel'

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Swap />} />
              <Route path="/pools" element={<Pools />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/farm" element={<Farm />} />
              <Route path="/analytics" element={<Analytics />} />
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