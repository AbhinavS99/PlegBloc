const web3 = require("./web3");
const campaignFactory = require("./build/CampaignFactory.json");
const address = require("./address");

const instance = new web3.eth.Contract(campaignFactory.abi, address);
export default instance;
