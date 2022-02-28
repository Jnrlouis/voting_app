const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so verifyContract here is a factory for instances of our Verify contract.
  */
  // Balancer token address on the Kovan Network is 0x41286Bb1D3E870f3F750eB7E1C25d7E48c8A1Ac7;
  const KOVAN_BALANCER_ADDRESS = "0x41286Bb1D3E870f3F750eB7E1C25d7E48c8A1Ac7";

  const simpleVoting = await ethers.getContractFactory("SimpleVoting");

  // deploy the contract
  const deployedSimpleVoting = await simpleVoting.deploy(KOVAN_BALANCER_ADDRESS);

  await deployedSimpleVoting.deployed();

  // print the address of the deployed contract
  console.log("Contract Address:", deployedSimpleVoting.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(10000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedSimpleVoting.address,
    constructorArguments: [KOVAN_BALANCER_ADDRESS],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });