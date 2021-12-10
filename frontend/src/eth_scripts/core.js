// Connecting with MetaMask.
async function injectMetaMask() {
    const provider = detectProvider();
    if (provider) {
        if (provider !== window.ethereum) {
          console.error("Not window.entherum proviider. Do you hhave multiple wallets installed ?")
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
}


export {
    injectMetaMask
};