require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const KOVAN_PRIVATE_KEY = process.env.KOVAN_PRIVATE_KEY;

const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

module.exports = {
  solidity: "0.8.10",
  networks: {
    kovan: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [KOVAN_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      kovan: ETHERSCAN_KEY,
    },
  },
};