const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../build/CampaignFactory.json");
const compiledCampaign = require("../build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  console.log(`Attempting to deploy from account: ${accounts[0]}`);

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({
      data: "0x" + compiledFactory.evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  console.log(
    `Factory Contract deployed at address: ${factory.options.address}`
  );

  //   await factory.methods.createCampaign("100").send({
  //     from: accounts[0],
  //     gas: "1000000",
  //   });

  //   [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  //   campaign = await web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    // assert.ok(campaign.options.address);
  });
});
