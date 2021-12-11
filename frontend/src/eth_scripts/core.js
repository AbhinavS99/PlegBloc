import Web3 from "web3";
import compiledFactory from "../ethereum/build/CampaignFactory.json";
import compiledUserFactory from "../ethereum/build/User.json";
import compiledCampaign from "../ethereum/build/Campaign.json";

async function injectMetaMask() {
  const provider = detectProvider();
  if (provider) {
    if (provider !== window.ethereum) {
      console.error(
        "Not window.ethereum provider. Do you have multiple wallets installed ?"
      );
    }
    await provider.request({
      method: "eth_requestAccounts",
    });
  }
}

const detectProvider = () => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    alert("Provider is not available. Check out Metamask!");
  }
  return provider;
};

const createCampaignFactory = async () => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  let factory;
  let accounts;
  let address;
  const create_factory = async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({
        data: "0x" + compiledFactory.evm.bytecode.object,
      })
      .send({
        from: accounts[0],
        gas: "2000000",
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
    address = factory.options.address;
  };
  try {
    await create_factory();
    return address;
  } catch {
    return "";
  }
};

const createCampaign = async (min_amount, factoryAddress) => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  let factory;
  let campaigns;
  let campaign;
  let accounts;
  let address;
  let flag = 0;

  const create_campaign = async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(compiledFactory.abi, factoryAddress);

    await factory.methods
      .createCampaign(min_amount)
      .send({
        from: accounts[0],
        gas: "2000000",
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
        flag = 1;
      });

    campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
    address = campaigns.at(-1);

    campaign = await new web3.eth.Contract(compiledCampaign.abi, address);
    if (flag === 1) {
      address = -1;
    }
  };

  try {
    await create_campaign();
    return address;
  } catch {
    return "";
  }
};



const registerUser = async (username, password, ipfsID) => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  // let factory;
  // let campaigns;
  // let campaign;
  // let accounts;
  // let address;
  // let flag = 0;

  let userFactory;
  let accounts;

  const register_user = async () => {
    accounts = await web3.eth.getAccounts();
    // factory = await new web3.eth.Contract(compiledFactory.abi, factoryAddress);
    const userFactoryAddress = "0x898747501739EF0B5a65b5606D9acEF8a85cb271";
    userFactory = await new web3.eth.Contract(compiledUserFactory.abi, userFactoryAddress);

    console.log("Accouts =>", accounts[0]);

    await userFactory.methods
      .register(username, password, ipfsID)
      .send({
        from: accounts[0],
        gas: "20000000000",
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
        return;
      });

    // campaigns = await factory.methods.getDeployedCampaigns().call();
    // console.log(campaigns);
    // address = campaigns.at(-1);

    // campaign = await new web3.eth.Contract(compiledCampaign.abi, address);
    // if (flag === 1) {
    //   address = -1;
    // }
  };

  try {
    await register_user();
    return "success";
  } catch {
    return "failure";
  }


}

export {
  injectMetaMask,
  createCampaignFactory,
  detectProvider,
  createCampaign,
  registerUser
};
