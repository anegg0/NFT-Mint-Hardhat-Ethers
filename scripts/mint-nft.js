require("dotenv").config()
const API_URL_TESTNET = process.env.API_URL
const  Web3 = require("web3")
const web3Instance = new Web3(process.env.API_URL_TESTNET+process.env.PALM_TESTNET_PROJECT_ID)
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
console.log(JSON.stringify(contract.abi))
