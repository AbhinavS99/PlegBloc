import Web3 from "web3";
import compiledFactory from "../ethereum/build/CampaignFactory.json";

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

export { injectMetaMask, createCampaignFactory, detectProvider };
