const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  
  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.provider.getBalance(deployer.address)).toString())

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
  const router = await Router.deploy(await factory.getAddress(), await weth.getAddress())
  await router.waitForDeployment()
  console.log('Router deployed to:', await router.getAddress())

  // Deploy Bridge
  const network = await deployer.provider.getNetwork()
  const chainId = Number(network.chainId)
  const Bridge = await ethers.getContractFactory('DexBridgeCore')
  const bridge = await Bridge.deploy(chainId, deployer.address) // deployer as fee collector
  await bridge.waitForDeployment()
  console.log('Bridge deployed to:', await bridge.getAddress())

  // Add some initial supported tokens to bridge
  console.log('Adding supported tokens to bridge...')
  
  // Add WETH
  await bridge.addSupportedToken(
    await weth.getAddress(),
    chainId,
    true, // is native
    ethers.utils.parseEther('0.001'), // min amount
    ethers.utils.parseEther('100'), // max amount
    250 // 2.5% fee
  )
  
  // Add DXB Token
  await bridge.addSupportedToken(
    await dxbToken.getAddress(),
    chainId,
    true, // is native
    ethers.utils.parseEther('1'), // min amount
    ethers.utils.parseEther('10000'), // max amount
    200 // 2% fee
  )

  console.log('Deployment completed!')
  console.log('Contract addresses:')
  console.log('- Factory:', await factory.getAddress())
  console.log('- Router:', await router.getAddress())
  console.log('- Bridge:', await bridge.getAddress())
  console.log('- DXB Token:', await dxbToken.getAddress())
  console.log('- WETH:', await weth.getAddress())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })