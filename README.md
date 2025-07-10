# DexBridge - Decentralized Exchange with Cross-Chain Bridge

A modern, **100% self-contained** decentralized exchange (DEX) built with React, TypeScript, and custom smart contracts. DexBridge provides seamless token swapping, liquidity provision, cross-chain bridging, and comprehensive analytics with **NO external dependencies** on protocols like Uniswap, LayerZero, or Axelar.

## 🌟 Features

### Core DEX Functionality
- **Custom DEX Contracts**: Our own Factory.sol, Router.sol, and Pair.sol (Uniswap V2-style)
- **Token Swapping**: Swap tokens using our proprietary routing system
- **Liquidity Pools**: Create and manage liquidity pools within our ecosystem
- **Multi-Chain Deployment**: Deploy on Ethereum, BSC, Polygon, and Arbitrum
- **Real-time Pricing**: AMM-based pricing with slippage protection
- **LP Token Management**: Mint and burn LP tokens for liquidity providers

### Cross-Chain Bridge
- **Custom Bridge Contracts**: Lock/Mint and Burn/Release mechanisms
- **Native Bridge Logic**: No LayerZero, no Axelar - 100% owned infrastructure
- **Admin-Controlled**: Relayer system for cross-chain transaction processing
- **Token Locking**: Lock tokens on source chain, mint on destination
- **Burn & Release**: Burn wrapped tokens, release native tokens
- **Bridge Dashboard**: Real-time transaction tracking and history

### Advanced Features
- **Admin Panel**: Manage supported tokens, relayers, and bridge settings
- **Analytics Dashboard**: Track TVL, volume, and trading metrics
- **Rewards System**: Staking and farming with our DXB token
- **Professional UI**: Dark/light mode with responsive design
- **Wallet Integration**: MetaMask and Web3 wallet support

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** 
- **Hardhat** for smart contract deployment
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

3. **Deploy smart contracts** (for local development)
   ```bash
   # Start local Hardhat node
   npx hardhat node
   
   # Deploy contracts (in another terminal)
   npx hardhat run deployment/deploy.js --network localhost
   ```

4. **Update contract addresses**
   - Copy deployed contract addresses from deployment output
   - Update `src/constants/contracts.ts` with the new addresses

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

### Environment Setup (Optional)

Create a `.env` file in the root directory for custom configuration:

```env
# Smart Contract Deployment
PRIVATE_KEY=your_private_key_here

# RPC URLs for deployment
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org
VITE_POLYGON_RPC_URL=https://polygon-rpc.com
VITE_ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
```

## 🏗️ Smart Contract Architecture

### DEX Contracts

#### Factory.sol
- Creates new trading pairs
- Manages pair registry
- Emits PairCreated events

#### Router.sol  
- Handles all user interactions
- Manages liquidity operations
- Executes token swaps
- Calculates optimal routing paths

#### Pair.sol
- Individual trading pair contract
- Implements AMM (x * y = k) formula
- Manages LP token minting/burning
- Handles swap execution

### Bridge Contracts

#### BridgeCore.sol
- Main bridge contract for each chain
- Handles token locking and releasing
- Manages supported tokens and fees
- Controls relayer permissions

#### DexBridgeWrappedToken.sol
- Wrapped token contract for non-native assets
- Mintable/burnable by bridge contract
- Standard ERC-20 implementation

### Token Contracts

#### DexBridgeToken.sol (DXB)
- Native governance and utility token
- Used for staking and rewards
- Deflationary tokenomics

#### WETH.sol
- Wrapped ETH implementation
- Standard deposit/withdraw functions

## 📱 Usage Guide

### Getting Started

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top right
   - Select MetaMask or your preferred wallet
   - Approve the connection

2. **Select Network**
   - Use the chain selector to switch between networks
   - Ensure contracts are deployed on selected network

### Token Swapping

1. **Navigate to Swap** (default page)
2. **Select Tokens**
   - Choose "From" token and amount
   - Select "To" token
   - System calculates output using our AMM
3. **Execute Swap**
   - Approve token spending if needed
   - Click "Swap" button
   - Confirm transaction in wallet
   - Wait for confirmation

### Adding Liquidity

1. **Go to Pools tab**
2. **Click "Add Liquidity"**
3. **Select Token Pair**
   - Choose two tokens for the pool
   - Enter amounts (system calculates ratios)
4. **Add Liquidity**
   - Approve both tokens if needed
   - Confirm transaction
   - Receive LP tokens

### Cross-Chain Bridging

1. **Navigate to Bridge tab**
2. **Configure Transfer**
   - Select source and destination chains
   - Choose token and amount
   - Enter destination address (optional)
3. **Execute Bridge**
   - Review bridge fees
   - Confirm transaction
   - Wait for relayer to process on destination chain

### Admin Functions (Contract Owner Only)

1. **Access Admin Panel** (`/admin`)
2. **Manage Supported Tokens**
   - Add new tokens to bridge
   - Set minimum/maximum amounts
   - Configure bridge fees
3. **Manage Relayers**
   - Add/remove authorized relayers
   - Control bridge operations
4. **Bridge Settings**
   - Update global fees
   - Pause/unpause bridge
   - Emergency controls

## 🔧 Development & Deployment

### Local Development

1. **Start Hardhat Node**
   ```bash
   npx hardhat node
   ```

2. **Deploy Contracts**
   ```bash
   npx hardhat run deployment/deploy.js --network localhost
   ```

3. **Update Frontend Config**
   - Copy contract addresses to `src/constants/contracts.ts`
   - Update token addresses in `src/constants/tokens.ts`

4. **Start Frontend**
   ```bash
   npm run dev
   ```

### Mainnet Deployment

1. **Configure Networks**
   - Update `hardhat.config.js` with RPC URLs
   - Set `PRIVATE_KEY` in environment

2. **Deploy to Each Chain**
   ```bash
   # Ethereum
   npx hardhat run deployment/deploy.js --network ethereum
   
   # BSC
   npx hardhat run deployment/deploy.js --network bsc
   
   # Polygon  
   npx hardhat run deployment/deploy.js --network polygon
   
   # Arbitrum
   npx hardhat run deployment/deploy.js --network arbitrum
   ```

3. **Update Frontend**
   - Update contract addresses for each network
   - Deploy frontend to hosting service

### Contract Verification

After deployment, verify contracts on block explorers:

```bash
npx hardhat verify --network ethereum CONTRACT_ADDRESS
```

## 🔐 Security Features

### Smart Contract Security
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Access Control**: Owner-only functions for critical operations
- **Pausable**: Emergency pause functionality
- **Input Validation**: Comprehensive parameter checking
- **Safe Math**: Overflow protection built-in

### Bridge Security
- **Multi-signature**: Recommended for production relayers
- **Rate Limiting**: Configurable min/max amounts
- **Fee Protection**: Prevents excessive fee extraction
- **Emergency Withdrawal**: Owner can recover stuck funds

### Frontend Security
- **Input Sanitization**: All user inputs validated
- **Transaction Simulation**: Preview before execution
- **Slippage Protection**: Configurable slippage tolerance
- **Approval Management**: Precise token approvals

## 📊 Contract Addresses

After deployment, update these addresses in `src/constants/contracts.ts`:

```typescript
export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  1: { // Ethereum
    factory: '0x...', // Your deployed Factory
    router: '0x...',  // Your deployed Router  
    bridge: '0x...',  // Your deployed Bridge
    dxbToken: '0x...', // Your DXB Token
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  }
  // ... other networks
}
```

## 🚀 Production Checklist

Before going live:

- [ ] **Smart Contract Audits**: Get contracts audited by professionals
- [ ] **Testnet Testing**: Deploy and test on testnets first  
- [ ] **Multi-sig Setup**: Use multi-signature wallets for admin functions
- [ ] **Monitoring**: Set up contract monitoring and alerts
- [ ] **Documentation**: Update all contract addresses and configurations
- [ ] **Emergency Procedures**: Establish incident response procedures
- [ ] **Insurance**: Consider smart contract insurance coverage

## 🤝 Support & Community

### Getting Help
- **Documentation**: This README and inline code comments
- **Issues**: Report bugs via GitHub issues
- **Discussions**: Technical discussions and feature requests

### Contributing
- Fork the repository
- Create feature branches
- Submit pull requests
- Follow coding standards

## ⚠️ Important Disclaimers

### Security Notice
⚠️ **CRITICAL**: This is a complex DeFi system handling real value. Before mainnet deployment:
- **GET PROFESSIONAL AUDITS** for all smart contracts
- **TEST EXTENSIVELY** on testnets with real scenarios
- **USE MULTI-SIGNATURE** wallets for all admin functions
- **IMPLEMENT MONITORING** for all contract interactions
- **HAVE EMERGENCY PROCEDURES** ready for incident response

### Legal Disclaimer
This software is provided "as is" without warranty of any kind. Users assume all risks associated with:
- Smart contract vulnerabilities
- Bridge failures or delays  
- Loss of funds due to bugs or exploits
- Regulatory compliance in their jurisdiction

The developers are not responsible for any financial losses, legal issues, or other damages arising from the use of this software.

### Regulatory Compliance
Users are responsible for ensuring compliance with local laws and regulations regarding:
- Cryptocurrency trading and exchange
- Cross-border financial transfers
- Tax reporting and obligations
- KYC/AML requirements where applicable

---

**Built with ❤️ for the DeFi community**

*A truly decentralized, self-contained DEX and bridge solution*