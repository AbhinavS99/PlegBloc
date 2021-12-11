import Web3 from "web3";
import compiledFactory from "../ethereum/build/CampaignFactory.json";
import compiledUserFactory from "../ethereum/build/User.json";
import compiledCampaign from "../ethereum/build/Campaign.json";
import compiledMain from "../ethereum/build/Main.json";
import addressUser from "../ethereum/scripts/address_user";
import addressMain from "../ethereum/scripts/main_address";
import main_address from "../ethereum/scripts/main_address";

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

const createCampaign = async (
  email,
  name,
  description,
  min_amount,
  target_amount,
  factoryAddress
) => {
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
      .createCampaign(email, name, description, min_amount, target_amount)
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

const registerUser = async (email, password, name, mobile) => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  let userFactory;
  let accounts;
  let flag = 0;
  const register_user = async () => {
    accounts = await web3.eth.getAccounts();
    const userFactoryAddress = main_address;

    userFactory = await new web3.eth.Contract(
      compiledMain.abi,
      userFactoryAddress
    );

    await userFactory.methods
      .registerUser(email, password, name, mobile)
      .send({
        from: accounts[0],
        gas: "5000000",
      })
      .catch((error) => {
        console.log(error.message);
        flag = 1;
      });
  };

  await register_user();
  if (flag == 0) {
    return 69;
  } else {
    return -69;
  }
};

const loginUser = async (email, password) => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  let userFactory;
  let login_flag = 0;
  let accounts;
  const login_user = async () => {
    accounts = await web3.eth.getAccounts();
    const userFactoryAddress = main_address;

    userFactory = await new web3.eth.Contract(
      compiledMain.abi,
      userFactoryAddress
    );
    await userFactory.methods
      .login(email, password)
      .call()
      .then((e) => {
        login_flag = e;
      });
  };

  try {
    await login_user();
    console.log("Login Flag = ", login_flag);
    return login_flag;
  } catch {
    return -1;
  }
};

const getName = async (email, password) => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  let userFactory;
  let name = "";
  let accounts;
  const user_name = async () => {
    accounts = await web3.eth.getAccounts();
    const userFactoryAddress = main_address;

    userFactory = await new web3.eth.Contract(
      compiledMain.abi,
      userFactoryAddress
    );
    await userFactory.methods
      .get_name(email, password)
      .call()
      .then((e) => {
        name = e;
      });
  };
  try {
    await user_name();
    return name;
  } catch {
    return "";
  }
};

const getMobile = async (email, password) => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  let userFactory;
  let mobile = "";
  let accounts;
  const user_mobile = async () => {
    accounts = await web3.eth.getAccounts();
    const userFactoryAddress = main_address;

    userFactory = await new web3.eth.Contract(
      compiledMain.abi,
      userFactoryAddress
    );
    await userFactory.methods
      .get_mobile(email, password)
      .call()
      .then((e) => {
        mobile = e;
      });
  };
  try {
    await user_mobile();
    return mobile;
  } catch {
    return "";
  }
};

const getFactory = async (email, password) => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  let userFactory;
  let camp_factory = "";
  let accounts;
  const user_factory = async () => {
    accounts = await web3.eth.getAccounts();
    const userFactoryAddress = main_address;

    userFactory = await new web3.eth.Contract(
      compiledMain.abi,
      userFactoryAddress
    );
    await userFactory.methods
      .get_factory(email, password)
      .call()
      .then((e) => {
        camp_factory = e;
      });
  };
  try {
    await user_factory();
    return camp_factory;
  } catch {
    return "";
  }
};

const getAllCampaigns = async () => {
  const provider = detectProvider();
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(provider);

  let userFactory;
  let campaigns = [];
  let accounts;
  const user_factory = async () => {
    accounts = await web3.eth.getAccounts();
    const userFactoryAddress = main_address;

    userFactory = await new web3.eth.Contract(
      compiledMain.abi,
      userFactoryAddress
    );
    await userFactory.methods
      .get_deployed_factories()
      .call()
      .then((e) => {
        campaigns = e;
      });
  };
  try {
    await user_factory();
    console.log(campaigns)
    return campaigns;
  } catch {
    return [];
  }
};

export {
  injectMetaMask,
  // createCampaignFactory,
  detectProvider,
  createCampaign,
  registerUser,
  loginUser,
  getName,
  getMobile,
  getFactory,
  getAllCampaigns,
};
