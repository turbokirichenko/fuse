<script>
  import Provider from "./widgets/provider.svelte";
  import Wallet from "./widgets/wallet.svelte";

  /**
   * @type { EIP6963AnnounceProviderEvent["detail"][] }
   */
  let providers = [];

  /**
   * @type { string | null }
   */
  let selectedAccount = null;

  /**
   * @type { EIP6963AnnounceProviderEvent["detail"] | null }
   */
  let selectedWallet = null;

  // @ts-ignore
  window.addEventListener(
    "eip6963:announceProvider",
    /** @param {EIP6963AnnounceProviderEvent} event */
    (event) => {
      providers = [...providers, event.detail];
    }
  );
  window.dispatchEvent(new Event("eip6963:requestProvider"));
</script>

<main>
  <h1>PlanC</h1>
  <p>Just collect the bottles and convert it to carbon credits!</p>
  {#if selectedAccount}
    <Wallet bind:selectedAccount bind:selectedWallet />
  {:else}
    <Provider {providers} bind:selectedWallet bind:selectedAccount />
  {/if}
</main>

<style>
</style>
