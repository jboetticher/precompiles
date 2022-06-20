const hre = require("hardhat");

// npx hardhat run scripts/batchTest.js --network moonbase
// SimpleContract was deployed with remix beforehand 0x9Ed1703f8ed4863e561d921F8bEdFb9e8430B893

async function main() {
  await hre.run("compile");

  // Get relevant interfaces
  const batch = await hre.ethers
    .getContractAt("Batch", "0x0000000000000000000000000000000000000808");
  const simple = await hre.ethers
    .getContractAt("SimpleContract", "0x9Ed1703f8ed4863e561d921F8bEdFb9e8430B893");

  console.log("Batch and simple contract found.");

  /* 
  Transaction calldata breakdown
  648345c8                                                            // func selector
  0000000000000000000000000000000000000000000000000000000000000064    // uint256 (100)
  0000000000000000000000000000000000000000000000000000000000000040    // Offset
  0000000000000000000000000000000000000000000000000000000000000011    // Length (11)
  68656c6c6f206920616d206a6572656d79000000000000000000000000000000    // Text (hello i am jeremy)

  Make 5 transactions for batch vvv
  */
  const to = [], value = [], gasLimit = [], callData = [];
  const messages = [ 'jeremy', 'erin', 'alberto', 'kevin', 'henry' ];
  const ids = [ 5, 10, 15, 20, 25 ];
  for(let i = 0; i < messages.length; i++) {
    to[i] = simple.address;
    value[i] = 0;
    gasLimit[i] = 70000;
    callData[i] = simple.interface.encodeFunctionData("setMessage", [
      ids[i],
      messages[i]
    ]);
  }
  
  // Send batch transaction
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
