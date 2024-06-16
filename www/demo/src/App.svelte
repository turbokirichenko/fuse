<script>
  import { useSwitchNetwork } from "./lib/utils/use-switch-network";

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
      const accounts = await useSwitchNetwork(wallet);
      console.log("HANDLE:get-accounts:", accounts);
      selectedAccount = accounts?.[0];
      selectedWallet = wallet;
      console.log("HANDLE:set-account:", accounts?.[0]);
    } catch (err) {
      console.error(err);
    }
  };
</script>

<main>
  <div></div>
  <h1>Connect to metamask example</h1>

  <p class="read-the-docs">Connect</p>
  {#each providers as provider}
    <button on:click={() => handleConnect(provider)}>
      <img src={provider.info.icon} alt={provider.info.name} />
      <div>{provider.info.name}</div>
    </button>
  {/each}

  {#if selectedAccount}
    <div>
      <div>
        <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
        <div>{selectedWallet.info.name}</div>
        <div>{selectedAccount} SIBR</div>
      </div>
    </div>
  {/if}
</main>

<style>
  .read-the-docs {
    color: #888;
  }
</style>
