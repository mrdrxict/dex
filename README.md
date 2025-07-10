# DexBridge - Decentralized Exchange with Cross-Chain Bridge

A modern, full-featured decentralized exchange (DEX) built with React, TypeScript, and Web3 technologies. DexBridge provides seamless token swapping, liquidity provision, cross-chain bridging, and comprehensive analytics in a beautiful, responsive interface.

## 🌟 Features

### Core DEX Functionality
- **Token Swapping**: Swap any ERC-20 tokens with real-time price calculations
- **Liquidity Pools**: Add/remove liquidity and earn trading fees
- **Multi-Chain Support**: Ethereum, BSC, Polygon, and Arbitrum
- **Slippage Protection**: Configurable slippage tolerance and price impact warnings
- **Transaction History**: Track all your swaps and liquidity operations

### Cross-Chain Bridge
- **Multi-Chain Transfers**: Bridge tokens between supported networks
- **Real-Time Tracking**: Monitor bridge transaction status in real-time
- **Bridge History**: Complete history of all cross-chain transfers
- **Fee Estimation**: Transparent fee calculation and time estimates

### Advanced Features
- **Analytics Dashboard**: Comprehensive DEX metrics and insights
- **Rewards System**: Staking and farming opportunities with APR calculations
- **Dark/Light Mode**: Beautiful UI with theme switching
- **Wallet Integration**: Support for MetaMask and other Web3 wallets
- **Responsive Design**: Optimized for desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MetaMask** or compatible Web3 wallet
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dex-bridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Environment Setup (Optional)

Create a `.env` file in the root directory for custom configuration:

```env
# RPC URLs (optional - defaults are provided)
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org
VITE_POLYGON_RPC_URL=https://polygon-rpc.com
VITE_ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc

# Analytics (optional)
VITE_ANALYTICS_API_URL=https://api.your-analytics-provider.com
```

## 📱 Usage Guide

### Getting Started

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top right
   - Select MetaMask or your preferred wallet
   - Approve the connection

2. **Select Network**
   - Use the chain selector to switch between networks
   - Supported: Ethereum, BSC, Polygon, Arbitrum

### Token Swapping

1. **Navigate to Swap** (default page)
2. **Select Tokens**
   - Choose "From" token and amount
   - Select "To" token
   - Review price impact and slippage
3. **Execute Swap**
   - Click "Swap" button
   - Confirm transaction in wallet
   - Wait for confirmation

### Adding Liquidity

1. **Go to Pools tab**
2. **Click "Add Liquidity"**
3. **Select Token Pair**
   - Choose two tokens for the pool
   - Enter amounts for both tokens
4. **Add Liquidity**
   - Review pool share and LP tokens
   - Confirm transaction
   - Receive LP tokens

### Cross-Chain Bridging

1. **Navigate to Bridge tab**
2. **Configure Transfer**
   - Select source and destination chains
   - Choose token and amount
   - Enter destination address
3. **Execute Bridge**
   - Review fees and estimated time
   - Confirm transaction
   - Track progress in Bridge History

### Staking & Rewards

1. **Visit Rewards tab**
2. **Choose Staking Pool**
   - Review APR and lock periods
   - Select amount to stake
3. **Stake Tokens**
   - Confirm staking transaction
   - Earn rewards over time
   - Claim rewards when ready

## 🏗️ Architecture

### Frontend Stack
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Ethers.js** - Ethereum interaction library

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, navigation
│   ├── Wallet/         # Wallet connection components
│   └── TokenSelector.tsx
├── contexts/           # React contexts
│   ├── ThemeContext.tsx
│   └── WalletContext.tsx
├── pages/              # Main application pages
│   ├── Swap.tsx
│   ├── Pools.tsx
│   ├── Bridge.tsx
│   ├── Analytics.tsx
│   └── Rewards.tsx
├── constants/          # Configuration and constants
│   ├── chains.ts
│   └── tokens.ts
└── App.tsx            # Main application component
```

### Key Components

#### WalletContext
Manages wallet connection, chain switching, and Web3 provider state.

#### ThemeContext
Handles dark/light mode switching with localStorage persistence.

#### TokenSelector
Reusable component for token selection with search functionality.

#### Chain Management
Support for multiple blockchain networks with automatic switching.

## 🔧 Configuration

### Supported Chains

The application supports the following blockchain networks:

| Network | Chain ID | Symbol | RPC URL |
|---------|----------|--------|---------|
| Ethereum | 1 | ETH | Infura/Alchemy |
| BSC | 56 | BNB | Binance RPC |
| Polygon | 137 | MATIC | Polygon RPC |
| Arbitrum | 42161 | ETH | Arbitrum RPC |

### Token Lists

Tokens are configured in `src/constants/tokens.ts`. Each token includes:
- Contract address
- Symbol and name
- Decimals
- Chain ID
- Logo URI

### Adding New Tokens

To add support for new tokens:

1. **Update token constants**
   ```typescript
   // src/constants/tokens.ts
   export const TOKENS: Record<number, Token[]> = {
     1: [ // Ethereum
       {
         address: '0x...',
         symbol: 'TOKEN',
         name: 'Token Name',
         decimals: 18,
         chainId: 1,
         logoURI: 'https://...'
       }
     ]
   };
   ```

2. **Add chain support** (if needed)
   ```typescript
   // src/constants/chains.ts
   export const SUPPORTED_CHAINS: Chain[] = [
     {
       id: 1,
       name: 'Ethereum',
       symbol: 'ETH',
       rpcUrl: 'https://...',
       blockExplorer: 'https://etherscan.io',
       icon: '⟠'
     }
   ];
   ```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** (recommended) for code formatting

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🔐 Security Considerations

### Smart Contract Integration

This frontend is designed to work with:
- **Uniswap V2/V3** compatible DEX contracts
- **LayerZero/Axelar** bridge protocols
- **Standard ERC-20** token contracts

### Security Best Practices

- Always verify contract addresses
- Use hardware wallets for large amounts
- Check slippage and price impact
- Verify bridge destinations
- Keep private keys secure

### Audit Status

⚠️ **Important**: This is a frontend interface. Always verify that the underlying smart contracts have been properly audited before using with real funds.

## 📊 Analytics & Monitoring

### Built-in Analytics

The application includes comprehensive analytics:
- Total Value Locked (TVL)
- 24h trading volume
- Fee generation
- Active users
- Top trading pairs

### External Integration

For production use, consider integrating:
- **The Graph** for blockchain data indexing
- **DeFiPulse** for TVL tracking
- **CoinGecko API** for price feeds
- **Custom analytics** for user behavior

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### IPFS (Decentralized)
```bash
npm run build
# Upload dist/ folder to IPFS
```

### Environment Variables

For production deployment, set:
- RPC URLs for each supported chain
- Analytics API keys
- Error tracking (Sentry, etc.)

## 🤝 Support & Community

### Getting Help

- **Documentation**: Check this README and code comments
- **Issues**: Report bugs via GitHub issues
- **Discussions**: Join community discussions

### Roadmap

- [ ] Additional chain support (Avalanche, Fantom)
- [ ] Advanced order types (limit orders)
- [ ] Portfolio tracking
- [ ] Mobile app
- [ ] Governance features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This software is provided "as is" without warranty. Use at your own risk. Always verify smart contract addresses and audit status before interacting with DeFi protocols. The developers are not responsible for any financial losses.

---

**Built with ❤️ for the DeFi community**