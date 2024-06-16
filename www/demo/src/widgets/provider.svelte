<script>
  import { useSwitchNetwork } from "../lib/utils/use-switch-network";

  /**
   * @type { EIP6963AnnounceProviderEvent["detail"][] }
   */
  export let providers = [];

  /**
   * @type { EIP6963AnnounceProviderEvent["detail"] | null }
   */
  export let selectedWallet;

  /**
   * @type { string | null }
   */
  export let selectedAccount;

  /**
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
</script>

<p class="read-the-docs">Connect to wallet</p>
{#each providers as provider}
  <button on:pointerdown={() => handleConnect(provider)}>
    <img src={provider.info.icon} alt={provider.info.name} />
    <div>{provider.info.name}</div>
  </button>
{/each}

<style>
  .read-the-docs {
    color: #888;
  }
</style>
