# Hardhat Polkadot Starter Template

A production-ready starter template for developing smart contracts on Polkadot Hub using Hardhat. This template includes a simple Counter contract example with tests, deployment scripts, and interaction examples.

## Features

- ✅ Pre-configured for Polkadot Hub (TestNet and local node)
- ✅ Simple Counter contract example
- ✅ Comprehensive test suite with 12 passing tests
- ✅ Simple deployment script (`scripts/deploy.js`)
- ✅ Interactive CLI for contract interaction
- ✅ Prettier configured for code formatting
- ✅ Environment-based configuration with dotenv

## Prerequisites

Before getting started, ensure you have:

- [Node.js](https://nodejs.org/) (v22.5.0 or later recommended)
- npm (v10.9.0 or later recommended)
- Basic understanding of Solidity programming
- Some PAS test tokens for deployment (get them from the [Polkadot faucet](https://faucet.polkadot.io/?parachain=1111))

## Installation

1. Clone or download this template:

```bash
git clone https://github.com/polkadotafrica/polkadot-hardhat-starter-template
cd polkadot-hardhat-starter-template
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your private key (never commit this file!).

## Project Structure

```
polkadot-hardhat-starter-template/
├── contracts/          # Solidity smart contracts
│   └── Counter.sol     # Simple counter contract example
├── scripts/            # Deployment and interaction scripts
│   ├── deploy.js       # Deployment script
│   └── interact.js     # Interactive script to interact with deployed contracts
├── test/               # Test files
│   └── Counter.test.js # Counter contract tests
├── hardhat.config.js   # Hardhat configuration
├── .env.example        # Environment variables template
└── package.json        # Project dependencies and scripts
```

## Configuration

### Compiler Configuration

The template is pre-configured to use the npm compiler. If you want to use a binary compiler instead, update `hardhat.config.js`:

```javascript
resolc: {
  compilerSource: 'binary',
  settings: {
    compilerPath: '/path/to/resolc',
  },
}
```

### Local Node Setup (Optional)

To test with a local Substrate node, update the `nodeConfig` and `adapterConfig` sections in `hardhat.config.js` with your binary paths.

## Usage

### Compile Contracts

```bash
npm run compile
```

This compiles your Solidity contracts to PolkaVM bytecode. Artifacts will be generated in the `artifacts-pvm` directory.

### Run Tests

```bash
npm test
```

Runs the test suite for the Counter contract.

### Deploy to Local Node (Optional)

If you have a local Substrate node with ETH-RPC adapter running:

```bash
npm run deploy -- --network localNode
```

### Deploy to Polkadot Hub TestNet

1. Set up your private key in the `.env` file:

```bash
cp .env.example .env
# Edit .env and add your private key
```

⚠️ **Warning**: Never share your private key or commit your `.env` file to version control!

2. Make sure you have PAS test tokens in your account (get them from the [faucet](https://faucet.polkadot.io/?parachain=1111))

3. Deploy:

```bash
npm run deploy:testnet
```

### Interact with Deployed Contract

The interact script provides an interactive CLI menu to interact with your deployed contract:

```bash
CONTRACT_ADDRESS=0xYourContractAddress npx hardhat run scripts/interact.js --network polkadotHubTestnet
```

Or pass it as an argument:

```bash
npx hardhat run scripts/interact.js --network polkadotHubTestnet 0xYourContractAddress
```

The interactive menu allows you to:
- Increment the counter
- Decrement the counter
- Reset the counter (owner only)
- View the contract owner
- See the current count in real-time

### Format Code

Format all JavaScript files with Prettier:

```bash
npm run format
```

Check if files are formatted correctly:

```bash
npm run format:check
```

## The Counter Contract

The included Counter contract (`contracts/Counter.sol`) demonstrates basic smart contract functionality:

- `increment()` - Increases the counter by 1
- `decrement()` - Decreases the counter by 1 (reverts if count is 0)
- `reset()` - Resets counter to 0 (only owner)
- `getCount()` - Returns the current count
- `owner` - Public variable storing the contract owner address

## Deployment Script

The `scripts/deploy.js` file contains a simple deployment script that:

1. Connects to the specified network
2. Displays the deployer account and balance
3. Deploys the Counter contract with an initial count of 0
4. Outputs the deployed contract address
5. Provides the command to interact with the deployed contract

Example output:
```
Deploying Counter contract to polkadotHubTestnet ...

Deploying with account: 0x3B465D0695621f330a45BCc15fcF6B2d8f2046d6
Account balance: 9853.4719547776 PAS

Deploying Counter contract...
Waiting for deployment...

✅ Counter deployed successfully!
Contract address: 0xB7f6F99271978081b6357bd239005bbA337A56ce

📝 Save this address to interact with your contract:
CONTRACT_ADDRESS=0xB7f6F99271978081b6357bd239005bbA337A56ce npx hardhat run scripts/interact.js --network polkadotHubTestnet
```

## Network Configuration

The template includes configurations for:

- **localNode**: Local Substrate node with ETH-RPC adapter
- **polkadotHubTestnet**: Polkadot Hub TestNet

## Important Notes

- Maximum contract code blob size on Polkadot Hub is 100 kilobytes
- Some Hardhat network helpers (like `time` and `loadFixture`) are not fully compatible with Polkadot Hub
- Always test on TestNet before deploying to production

## Troubleshooting

### Upgrading the Plugin

If you encounter issues after upgrading, clean your dependencies:

```bash
rm -rf node_modules package-lock.json
npm install --save-dev @parity/hardhat-polkadot@latest
npm install
```

### Common Issues

- **Module not found errors**: Try cleaning and reinstalling dependencies
- **Compilation errors**: Ensure you're using Solidity 0.8.0 or higher
- **Deployment failures**: Check that you have sufficient PAS tokens and correct network configuration

## Resources

- [Polkadot Hub Documentation](https://docs.polkadot.com/develop/smart-contracts/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Hardhat Polkadot Plugin](https://github.com/paritytech/hardhat-polkadot)

## License

MIT

## Author

Polkadot Africa
