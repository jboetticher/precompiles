const hre = require("hardhat");

async function main() {
  await hre.run("compile");

  const batch = await hre.ethers
    .getContractAt("Batch", "0x0000000000000000000000000000000000000808");
  const simple = await hre.ethers
    .getContractAt("SimpleContract", "0x9Ed1703f8ed4863e561d921F8bEdFb9e8430B893");

  console.log("Batch and simple contract found.");

  const to = [ simple.address, simple.address, simple.address ];
  const value = [ 0, 0, 0 ];
  const gasLimit = [ 70000, 70000, 70000 ];
  const callData = [];

  /*
  648345c8                                                            // selector
  0000000000000000000000000000000000000000000000000000000000000064    // uint256
  0000000000000000000000000000000000000000000000000000000000000040    // Offset
  0000000000000000000000000000000000000000000000000000000000000011    // Length
  68656c6c6f206920616d206a6572656d79000000000000000000000000000000    // Text
  */
  
  // Send to the relay chain
  const res = await batch.batchSome(
    to,
    value,
    callData,
    gasLimit
  );

  console.log("Transaction finished");
  console.log(res);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
