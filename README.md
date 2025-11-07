# Hardhat Polkadot Starter Template

A production-ready starter template for developing smart contracts on Polkadot Hub using Hardhat. This template provides everything you need to build, test, and deploy Solidity smart contracts that compile to PolkaVM bytecode for the Polkadot ecosystem.

## Features

- ✅ **PolkaVM Ready**: Pre-configured for Polkadot Hub with PolkaVM compilation
- ✅ **Complete Example**: Fully documented Counter contract with events and access control
- ✅ **Comprehensive Testing**: 12 test cases covering all contract functionality
- ✅ **Smart Deployment**: Automated deployment with balance checks and error handling
- ✅ **Interactive CLI**: User-friendly interface for contract interaction
- ✅ **Code Quality**: Prettier formatting and consistent code style
- ✅ **Environment Management**: Secure configuration with dotenv
- ✅ **Multiple Networks**: Support for local nodes and Polkadot Hub TestNet

## Prerequisites

### Required Software
- **[Node.js](https://nodejs.org/)** (v18.0.0 or later, v22.5.0+ recommended)
- **npm** (v8.0.0 or later, v10.9.0+ recommended) or **yarn**
- **Git** for version control

### For Deployment
- **PAS Test Tokens**: Required for TestNet deployment ([Get from faucet](https://faucet.polkadot.io/?parachain=1111))
- **Wallet Setup**: A wallet with a private key for signing transactions

## Installation

```bash
git clone https://github.com/polkadotafrica/polkadot-hardhat-starter-template
cd polkadot-hardhat-starter-template
npm install
```

## Environment Setup

```bash
cp .env.example .env
```

Edit `.env` and add your private key (without 0x prefix):
```bash
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=
```

> ⚠️ **Security Warning**: Never commit your `.env` file or share your private key!

Another secure way to do this is to use hardhat vars to manage the private key(s):
```bash
 npx hardhat vars set PRIVATE_KEY <PRIVATE_KEY>
```

You can confirm that the PRIVATE_KEY is stored using:
```bash
npx hardhat vars get PRIVATE_KEY
```

## Project Structure

```
polkadot-hardhat-starter-template/
├── 📁 contracts/              # Smart contract source code
│   └── Counter.sol            # Example counter contract with events & access control
├── 📁 scripts/                # Automation scripts
│   ├── deploy.js              # Contract deployment with balance checks
│   └── interact.js            # Interactive CLI for contract operations
├── 📁 test/                   # Test suite
│   └── Counter.test.js        # Comprehensive contract tests (12 test cases)
├── 📁 artifacts/              # Compiled contract artifacts (EVM)
├── 📁 artifacts-pvm/          # Compiled PolkaVM bytecode
├── 📁 cache/                  # Hardhat compilation cache
├── 📁 ignition/               # Hardhat Ignition deployment modules
│   └── modules/Counter.js     # Deployment configuration
├── hardhat.config.js          # Hardhat & PolkaVM configuration
├── .env.example               # Environment variables template
├── .prettierrc                # Code formatting rules
└── package.json               # Dependencies and npm scripts
```

### Key Files

- **`contracts/Counter.sol`**: Example contract with state management, events, and access control
- **`hardhat.config.js`**: PolkaVM compilation configuration with optimizer settings
- **`scripts/deploy.js`**: Deployment script with balance checks and error handling
- **`scripts/interact.js`**: Interactive CLI for contract operations
- **`test/Counter.test.js`**: Complete test suite (12 test cases)

## Configuration

### PolkaVM Compilation

The template uses ResolC compiler to convert Solidity to PolkaVM bytecode:

```javascript
// hardhat.config.js
resolc: {
    compilerSource: 'npm',        // Uses npm-installed compiler
    settings: {
        optimizer: {
            enabled: true,        // Enable optimization
            parameters: 'z',      // Optimization level
            fallbackOz: true,     // Fallback to Oz optimizer
            runs: 200,           // Optimization runs
        },
        standardJson: true,       // Use standard JSON output
    },
}
```

### Network Configuration

**Polkadot Hub TestNet:**
```javascript
polkadotHubTestnet: {
    polkavm: true,                                    // Enable PolkaVM
    url: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
}
```

**Local Development Node:**
```javascript
localNode: {
    polkavm: true,
    url: 'http://127.0.0.1:8545',  // Local ETH-RPC adapter
}
```

### Binary Compiler (Advanced)

```javascript
resolc: {
    compilerSource: 'binary',
    settings: {
        compilerPath: '/path/to/resolc',
    },
}
```

## Usage

### Compile Contracts

```bash
npm run compile
```

Compiles Solidity contracts to PolkaVM bytecode. Artifacts are generated in `artifacts-pvm/` directory.

### Run Tests

```bash
npm test
```

Runs comprehensive test suite covering deployment, functionality, access control, and events.

### Deploy to TestNet

1. Get PAS test tokens from [Polkadot Faucet](https://faucet.polkadot.io/?parachain=1111)
2. Set your private key in `.env` file
3. Deploy:

```bash
npm run deploy:testnet
```

### Interact with Contract

```bash
CONTRACT_ADDRESS=0xYourContractAddress npm run interact
```

Provides interactive CLI for testing deployed contract functionality.

## Interactive CLI

The interaction script provides a menu-driven interface for testing deployed contracts:

- Real-time counter display
- Transaction confirmation with hashes
- Error handling for failed operations
- Owner verification
- Network and contract information

Example interaction:
```
Current count: 0

? What would you like to do? › 
❯ Increment counter
  Decrement counter  
  Reset counter (owner only)
  View owner
  Exit
```

## Code Formatting

```bash
npm run format        # Format all JavaScript files
npm run format:check  # Check formatting
```

Prettier configuration is included for consistent code style.

## Counter Contract

The example contract demonstrates essential smart contract patterns:

### Contract Architecture

```solidity
contract Counter {
    uint256 private count;        // Private state variable
    address public owner;         // Public owner address
    
    // Events for transparency
    event CountIncremented(uint256 newCount);
    event CountDecremented(uint256 newCount);
    event CountReset(uint256 newCount);
}
```

### Functions

| Function | Access | Description |
|----------|--------|-------------|
| `increment()` | Public | Increases counter by 1, emits event |
| `decrement()` | Public | Decreases counter by 1, includes validation |
| `reset()` | Owner Only | Resets counter to 0, access controlled |
| `getCount()` | View | Returns current count |

### Features

- **State Management**: Private counter with public getter
- **Access Control**: Owner-only reset function
- **Input Validation**: Prevents decrementing below zero
- **Event Emission**: Logs all state changes
- **Security**: Solidity 0.8+ overflow protection

## Deployment Script

The deployment script includes:

- Network connection validation
- Account balance verification
- Contract deployment with confirmation
- Error handling and logging

### Customization

Deploy with custom initial count:
```javascript
const counter = await Counter.deploy(100)  // Start with count = 100
```

## Networks

| Network | Purpose | RPC URL |
|---------|---------|---------|
| **polkadotHubTestnet** | Testing & Development | `https://testnet-passet-hub-eth-rpc.polkadot.io` |
| **localNode** | Local Development | `http://127.0.0.1:8545` |

### Adding Custom Networks

```javascript
networks: {
    customNetwork: {
        polkavm: true,
        url: 'https://your-rpc-endpoint.com',
        accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
}
```

## Important Notes

### PolkaVM Limitations

- Maximum contract size: 100KB bytecode
- Some Hardhat helpers (`time`, `loadFixture`) have limited compatibility
- Different gas model from Ethereum
- Limited EVM precompiles

### Best Practices

- Always test on TestNet before production
- Never commit private keys to version control
- Use `view` functions for read-only operations
- Implement proper access controls and input validation
- Emit events for important state changes

## Troubleshooting

### Common Issues

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json cache/ artifacts/
npm install
```

**Compilation errors:**
- Ensure Solidity version 0.8.0+
- Update Hardhat Polkadot plugin: `npm install --save-dev @parity/hardhat-polkadot@latest`

**Deployment failures:**
- Get test tokens from [Polkadot Faucet](https://faucet.polkadot.io/?parachain=1111)
- Verify private key in `.env` (without 0x prefix)
- Check network configuration

**Plugin updates:**
```bash
npm install --save-dev @parity/hardhat-polkadot@latest
npm install
```

## Learning Resources

### Official Documentation
- [Polkadot Smart Contracts Documentation](https://docs.polkadot.com/develop/smart-contracts/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Hardhat Polkadot Plugin](https://github.com/paritytech/hardhat-polkadot)

### Solidity & Smart Contracts
- [Solidity by Example](https://solidity-by-example.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Ethereum Development Tutorials](https://ethereum.org/en/developers/tutorials/)

### Polkadot Ecosystem
- [Polkadot Wiki](https://wiki.polkadot.network/)
- [Substrate Documentation](https://docs.substrate.io/)
- [Polkadot Academy](https://polkadot.network/development/academy/)

### Community & Support
- [Polkadot Discord](https://discord.gg/polkadot)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/polkadot)
- [GitHub Discussions](https://github.com/paritytech/hardhat-polkadot/discussions)

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure compatibility with PolkaVM

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Created by:** [Polkadot Africa](https://github.com/polkadotafrica)

**Acknowledgments:**
- Parity Technologies for the Hardhat Polkadot plugin
- The Hardhat team for the development framework
- The Polkadot community for support and feedback
