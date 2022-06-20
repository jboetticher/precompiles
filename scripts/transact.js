// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const MAKE_MEMO = '0x40065dba5a00141234567889';
const TRANSFER_FROM_RELAY_TO_ALT_ACCOUNT = '0x630801000100a10f0100010300a4553e6eb81ccb6ecd613388d7b30b3449ac6a18010400000000070010a5d4e80000000000';

async function main() {
  await hre.run("compile");

  const transactor = await hre.ethers
    .getContractAt("XcmTransactor", "0x0000000000000000000000000000000000000806");

  console.log("Transactor created.");

  // Send to the relay chain
  const res = await transactor.transact_through_derivative(
    0,            // Transactor (0 for relay chain)
    380,          // Index
    "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080", // Token,
    "2000000000000",
    MAKE_MEMO
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
