/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
module.exports = {
    solidity: "0.8.6",
    settings: {
    optimizer: {
    enabled: true,
    runs: 1000000,
    },
    },
    mocha: {
    timeout: 90000
    },
    networks: {
    hardhat: {
    blockGasLimit: 18_800_000
    },
    palm_testnet:{
    url: process.env.API_URL_TESTNET+process.env.PALM_TESTNET_PROJECT_ID,
    accounts: [`0x`+process.env.TESTNET_PRIVATE_KEY],
    gasPrice: 1000
    },
    palm_mainnet:{
    url: process.env.API_URL_MAINNET+process.env.PALM_MAINNET_PROJECT_ID,
    accounts: [`0x`+process.env.MAINNET_PRIVATE_KEY],
    gasPrice: 1000
    }
    }
    };
