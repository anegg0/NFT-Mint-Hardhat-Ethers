require("dotenv").config()
const API_URL = process.env.API_URL_TESTNET+process.env.PALM_TESTNET_PROJECT_ID
const PUBLIC_KEY = process.env.TESTNET_PUBLIC_KEY
const PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY
const Web3 = require("web3")
const web3Provider = new Web3.providers.HttpProvider(API_URL)
const web3Instance = new Web3(web3Provider)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x9e9189266b1e6143428E9ad5431aa8e7dc463aBf"

const nftContract = new web3Instance.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3Instance.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    const transaction = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    }
    const signaturePromise = web3Instance.eth.accounts.signTransaction(transaction, PRIVATE_KEY)
    signaturePromise
      .then((signedTx) => {
        web3Instance.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck https://explorer.palm-uat.xyz to view the status of your transaction"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log(" Promise failed:", err)
      })
  }

  mintNFT(
    "https://bafkreicy65wumngcgryslwjmbgdiaypkzbd2t5mohgpt3gksrxgks2yrse.ipfs.dweb.link/"
  )
  


