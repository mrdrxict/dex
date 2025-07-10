const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  
  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.provider.getBalance(deployer.address)).toString())

  // Get network info
  const network = await deployer.provider.getNetwork()
  const chainId = Number(network.chainId)
  console.log('Deploying to chain ID:', chainId)

  // Deploy USDT first (for fees)
  const USDT = await ethers.getContractFactory('DexBridgeToken') // Reuse token contract for USDT
  const usdt = await USDT.deploy()
  await usdt.waitForDeployment()
  console.log('USDT deployed to:', await usdt.getAddress())

  // Deploy WETH first (if not using existing)
  const WETH = await ethers.getContractFactory('WETH')
  const weth = await WETH.deploy()
  await weth.waitForDeployment()
  console.log('WETH deployed to:', await weth.getAddress())

  // Deploy DexBridge Token
  const DexBridgeToken = await ethers.getContractFactory('DexBridgeToken')
  const dxbToken = await DexBridgeToken.deploy()
  await dxbToken.waitForDeployment()
  console.log('DexBridge Token deployed to:', await dxbToken.getAddress())

  // Deploy Factory
  const Factory = await ethers.getContractFactory('DexBridgeFactory')
  const factory = await Factory.deploy()
  await factory.waitForDeployment()
  console.log('Factory deployed to:', await factory.getAddress())

  // Deploy Router
  const Router = await ethers.getContractFactory('DexBridgeRouter')
  const router = await Router.deploy(await factory.getAddress(), await weth.getAddress(), await usdt.getAddress())
  await router.waitForDeployment()
  console.log('Router deployed to:', await router.getAddress())

  // Deploy ESR Staking Contract
  const ESRStaking = await ethers.getContractFactory('ESRStaking')
  const esrStaking = await ESRStaking.deploy(
    await dxbToken.getAddress(), // Use DXB as ESR for now
    await usdt.getAddress(),
    deployer.address, // Fee collector
    deployer.address  // Reward pool
  )
  await esrStaking.waitForDeployment()
  console.log('ESR Staking deployed to:', await esrStaking.getAddress())

  // Deploy Bridge
  const Bridge = await ethers.getContractFactory('DexBridgeCore')
  const bridge = await Bridge.deploy(chainId, deployer.address, await usdt.getAddress()) // deployer as fee collector
  await bridge.waitForDeployment()
  console.log('Bridge deployed to:', await bridge.getAddress())

  // Configure Router with Staking Contract
  await router.setStakingContract(await esrStaking.getAddress())
  console.log('Router configured with staking contract')

  // Configure Bridge with Staking Contract  
  await bridge.setStakingContract(await esrStaking.getAddress())
  console.log('Bridge configured with staking contract')

  // Deploy LP Farming Contract
  const LPFarming = await ethers.getContractFactory('LPFarming')
  const lpFarming = await LPFarming.deploy(
    await dxbToken.getAddress(), // ESR token (using DXB for now)
    deployer.address, // Reward pool
    ethers.parseEther('0.1'), // 0.1 ESR per second
    Math.floor(Date.now() / 1000) // Start time
  )
  await lpFarming.waitForDeployment()
  console.log('LP Farming deployed to:', await lpFarming.getAddress())

  // Add some initial supported tokens to bridge
  console.log('Adding supported tokens to bridge...')
  
  // Add WETH/WAVAX/WFTM
  await bridge.addSupportedToken(
    await weth.getAddress(),
    chainId,
    true, // is native
    ethers.parseEther('0.001'), // min amount
    ethers.parseEther('100'), // max amount
    250 // 2.5% fee
  )
  
  // Add DXB Token
  await bridge.addSupportedToken(
    await dxbToken.getAddress(),
    chainId,
    true, // is native
    ethers.parseEther('1'), // min amount
    ethers.parseEther('10000'), // max amount
    200 // 2% fee
  )

  console.log('Deployment completed!')
  console.log('Contract addresses:')
  console.log('- Factory:', await factory.getAddress())
  console.log('- Router:', await router.getAddress())
  console.log('- Bridge:', await bridge.getAddress())
  console.log('- ESR Staking:', await esrStaking.getAddress())
  console.log('- LP Farming:', await lpFarming.getAddress())
  console.log('- DXB Token:', await dxbToken.getAddress())
  console.log('- USDT:', await usdt.getAddress())
  console.log('- WETH:', await weth.getAddress())

  // Chain-specific notes
  if (chainId === 43114) {
    console.log('\n🔺 AVALANCHE DEPLOYMENT NOTES:')
    console.log('- Native token: AVAX')
    console.log('- Wrapped token: WAVAX')
    console.log('- Consider integrating with Trader Joe DEX')
    console.log('- Gas fees are typically low on Avalanche')
  } else if (chainId === 250) {
    console.log('\n👻 FANTOM DEPLOYMENT NOTES:')
    console.log('- Native token: FTM')
    console.log('- Wrapped token: WFTM')
    console.log('- Consider integrating with SpookySwap DEX')
    console.log('- Very low gas fees on Fantom')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })