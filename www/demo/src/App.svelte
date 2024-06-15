<script>
  // @ts-ignore
  const switchNetwork = async () => {
    // @ts-ignore
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        // @ts-ignore
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1b198" }], // Check networks.js for hexadecimal network ids
        });
      } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        if (error.code === 4902) {
          try {
            // @ts-ignore
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x1b198",
                  chainName: "Siberium Test Network",
                  rpcUrls: ["https://rpc.test.siberium.net"],
                  nativeCurrency: {
                    name: "SIBR",
                    symbol: "SIBR",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://explorer.test.siberium.net"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  switchNetwork();
</script>

<main>
  <div></div>
  <h1>Connect to metamask example</h1>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .read-the-docs {
    color: #888;
  }
</style>
