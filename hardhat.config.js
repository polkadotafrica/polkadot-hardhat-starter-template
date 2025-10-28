require('@nomicfoundation/hardhat-toolbox')
require('@parity/hardhat-polkadot')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.26',

    // Compiler configuration for PolkaVM
    resolc: {
        compilerSource: 'npm',
        settings: {
            optimizer: {
                enabled: true,
                parameters: 'z',
                fallbackOz: true,
                runs: 200,
            },
            standardJson: true,
        },
    },

    networks: {
        // Local node deployment with PolkaVM
        localNode: {
            polkavm: true,
            url: 'http://127.0.0.1:8545',
        },

        // Polkadot Hub TestNet
        polkadotHubTestnet: {
            polkavm: true,
            url: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        },
    },
}
