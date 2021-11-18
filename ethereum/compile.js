const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const build_path = path.resolve(__dirname, "build");
// fs.removeSync(build_path);

// const campaign_path = path.resolve(__dirname, "contracts", "Campaign.sol");
// const source = fs.readFileSync(campaign_path, "utf-8");
// const file_name = "Campaign.sol";

// var input = {
//   language: "Solidity",
//   sources: {
//     "Campaign.sol": {
//       content: source,
//     },
//   },
//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["abi", "evm.bytecode"],
//       },
//     },
//   },
// };

// // fs.ensureDirSync(build_path);
// // const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
// // for (let contract in output) {
// //   console.log(contract);
// //   for (let contractName in output[contract]) {
// //     console.log(contractName);
// //   }
// // }

// // if (output.errors) {
// //   output.errors.forEach((err) => {
// //     console.log(err.formattedMessage);
// //   });
// // } else {
// //   const contracts = output.contracts[file_name];
// //   for (let contractName in contracts) {
// //     const contract = contracts[contractName];
// //     fs.writeFileSync(
// //       path.resolve(build_path, `${contractName}.json`),
// //       JSON.stringify(contract.abi, null, 2),
// //       "utf8"
// //     );
// //   }
// // }
