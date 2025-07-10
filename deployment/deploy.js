const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  
  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  // Deploy WETH first (if not using existing)
  const WETH = await ethers.getContractFactory('WETH')
  const weth = await WETH.deploy()
  await weth.deployed()
  console.log('WETH deployed to:', weth.address)

  // Deploy DexBridge Token
  const DexBridgeToken = await ethers.getContractFactory('DexBridgeToken')
  const dxbToken = await DexBridgeToken.deploy()
  await dxbToken.deployed()
  console.log('DexBridge Token deployed to:', dxbToken.address)

  // Deploy Factory
  const Factory = await ethers.getContractFactory('DexBridgeFactory')
  const factory = await Factory.deploy()
  await factory.deployed()
  console.log('Factory deployed to:', factory.address)

  // Deploy Router
  const Router = await ethers.getContractFactory('DexBridgeRouter')
  const router = await Router.deploy(factory.address, weth.address)
  await router.deployed()
  console.log('Router deployed to:', router.address)

  // Deploy Bridge
  const chainId = await deployer.getChainId()
  const Bridge = await ethers.getContractFactory('DexBridgeCore')
  const bridge = await Bridge.deploy(chainId, deployer.address) // deployer as fee collector
  await bridge.deployed()
  console.log('Bridge deployed to:', bridge.address)

  // Add some initial supported tokens to bridge
  console.log('Adding supported tokens to bridge...')
  
  // Add WETH
  await bridge.addSupportedToken(
    weth.address,
    chainId,
    true, // is native
    ethers.utils.parseEther('0.001'), // min amount
    ethers.utils.parseEther('100'), // max amount
    250 // 2.5% fee
  )
  
  // Add DXB Token
  await bridge.addSupportedToken(
    dxbToken.address,
    chainId,
    true, // is native
    ethers.utils.parseEther('1'), // min amount
    ethers.utils.parseEther('10000'), // max amount
    200 // 2% fee
  )

  console.log('Deployment completed!')
  console.log('Contract addresses:')
  console.log('- Factory:', factory.address)
  console.log('- Router:', router.address)
  console.log('- Bridge:', bridge.address)
  console.log('- DXB Token:', dxbToken.address)
  console.log('- WETH:', weth.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })