require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("web3")
const web3 = createAlchemyWeb3(API_URL)
