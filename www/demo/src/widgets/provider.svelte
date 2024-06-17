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
      if (selectedWallet) return;
      const accounts = await useSwitchNetwork(wallet);
      selectedAccount = accounts?.[0];
      selectedWallet = wallet;
      console.log("HANDLE:set-account:", accounts?.[0]);
    } catch (err) {
      alert(err.message);
    }
  };
</script>

{#each providers as provider}
  <p class="read-the-docs">Connect wallet</p>
  <button on:pointerdown={() => handleConnect(provider)}>
    <img src={provider.info.icon} alt={provider.info.name} />
    <div>{provider.info.name}</div>
  </button>
{/each}
{#if !providers.length}
  <div class="red-border">
    <p class="red-border__p">
      Please! Install <a href="https://metamask.io">Metamask</a> to using this app!
    </p>
  </div>
{/if}

<style>
  .read-the-docs {
    color: #888;
  }

  .red-border {
    width: 90%;
    margin: auto;
    max-width: 360px;
    border: solid lightblue 5px;
    border-radius: 20px;
    color: lightblue;
    padding: 5px 12px;
    font-size: 1.1rem;
  }
  .red-border__p {
    margin: 0;
    padding: 0;
    font-weight: 600;
  }
</style>
