require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractInterface = contract.abi;

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#provider-object
let provider = ethers.provider;

const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);
const tokenURI = "https://bafkreicy65wumngcgryslwjmbgdiaypkzbd2t5mohgpt3gksrxgks2yrse.ipfs.dweb.link/";

wallet.provider = provider;
const signer = wallet.connect(provider);
const cliSpinners = require('cli-spinners');

// https://docs.ethers.io/v5/api/contract/contract
const MyNFT = new ethers.Contract(
  process.env.TESTNET_CONTRACT_ADDRESS,
  contractInterface,
  signer
);

const main = () => {
  console.log("Waiting 5 blocks for confirmation...");
  MyNFT
    .mintNFT(process.env.PUBLIC_KEY, tokenURI)    
    .then((tx) => tx.wait(5))
    .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))

    .catch((e) => console.log("something went wrong", e));
};

main();
