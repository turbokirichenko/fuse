<script>
  import { useSwitchNetwork } from "./lib/utils/use-switch-network";
  import { useDisctonnectNetwork } from "./lib/utils/use-disconnect-network";

  /**
   * @type { EIP6963AnnounceProviderEvent["detail"][] }
   */
  export let providers = [];

  export let selectedAccount = null;

  export let selectedWallet = null;

  // @ts-ignore
  window.addEventListener(
    "eip6963:announceProvider",
    /**
     * @param {EIP6963AnnounceProviderEvent} event
     */
    (event) => {
      providers = [...providers, event.detail];
    }
  );
  window.dispatchEvent(new Event("eip6963:requestProvider"));

  /**
   *
   * @param {EIP6963AnnounceProviderEvent["detail"]} wallet
   */
  const handleConnect = async (wallet) => {
    try {
      console.log("HANDLE:start");
      if (selectedWallet) return;
      const accounts = await useSwitchNetwork(wallet);
      console.log("HANDLE:get-accounts:", accounts);
      selectedAccount = accounts?.[0];
      selectedWallet = wallet;
      console.log("HANDLE:set-account:", accounts?.[0]);
    } catch (err) {
      alert(err.message);
    }
  };

  /**
   *
   * @param {EIP6963AnnounceProviderEvent["detail"]} wallet
   */
  const handleDisconnect = async (wallet) => {
    try {
      const res = await useDisctonnectNetwork(wallet);
      if (!res) {
        selectedAccount = null;
        selectedWallet = null;
      }
    } catch (err) {
      alert(err.message);
    }
  };
</script>

<main>
  <h1>Metamask manage connection</h1>

  {#if selectedAccount}
    <div>
      <div>
        <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
        <div>{selectedWallet.info.name}</div>
        <div>{selectedAccount} SIBR</div>
      </div>
      <button on:click={() => handleDisconnect(selectedWallet)}>
        <div>disconnect</div>
      </button>
    </div>
  {:else}
    <p class="read-the-docs">Connect</p>
    {#each providers as provider}
      <button on:pointerdown={() => handleConnect(provider)}>
        <img src={provider.info.icon} alt={provider.info.name} />
        <div>{provider.info.name}</div>
      </button>
    {/each}
  {/if}
</main>

<style>
  .read-the-docs {
    color: #888;
  }
</style>
