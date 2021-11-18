const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
require("dotenv").config();
const compiledFactory = require("./build/campaignFactory.json");
const fs = require("fs-extra");
const path = require("path");

const provider = new HDWalletProvider(process.env.mnemonic, process.env.link);

const web3 = new Web3(provider);

const deployedAddressPath = path.resolve(__dirname, "../address.js");

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(result.options.address);
  fs.removeSync(deployedAddressPath);
  fs.writeFileSync(
    deployedAddressPath,
    `module.exports = "${result.options.address}";`
  );
  console.log(
    "successfully deployed, contract address now accessible in address.js"
  );
})();
