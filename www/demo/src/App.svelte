<script>
  import logo from "../public/vite.svg";
  import bottle from "../public/bottle.png";
  import qr from "../public/QR-bar.png";
  import bg from "../public/bg.jpg";
  import inimage from "../public/images.png";
  import token from "../public/token.png";
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

<main class="up">
  <section class="first">
    <div class="head-one">
      <h1 class="title">
        <img class="header__image" src={logo} alt="logotype" /> FUSE
      </h1>
      <p class="gray">Web3 platform to make the world a cleaner place</p>
      <p class="gray">
        Collect bottles and get <b class="green">BOTTLE</b> tokens
      </p>
      <p class="gray">
        <b class="green">Fuse</b> is the new era of ecofriendly products
      </p>
    </div>
    {#if selectedAccount}
      <Wallet bind:selectedAccount bind:selectedWallet />
    {:else}
      <Provider {providers} bind:selectedWallet bind:selectedAccount />
    {/if}
  </section>
  <section class="bottom-image">
    <div class="bottom-image__item">
      <img class="bottom-image__content" src={bottle} alt="bottle" />
      <p>1. Finds a plastic bottle</p>
    </div>
    <div class="bottom-image__item">
      <img class="bottom-image__content" src={qr} alt="qr" />
      <p>
        2. Scan barcode with <a
          href="https://products.fileformat.app/ru/barcode/recognize/gs1-datamatrix"
          >this app</a
        >
      </p>
    </div>
    <div class="bottom-image__item">
      <img class="bottom-image__content" src={inimage} alt="123" />
      <p>3. Enter barcode</p>
    </div>
    <div class="bottom-image__item">
      <img class="bottom-image__content" src={token} alt="super" />
      <p>4. Catch new tokens!</p>
    </div>
  </section>
</main>

<style>
  .header__image {
    padding-top: 0.5rem;
    height: 4rem;
  }
  .title {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 3.6rem;
    font-weight: 800;
    padding: 0 0 12px;
  }
  .head-one {
    margin-bottom: 30px;
  }
  .up {
    margin-top: 5%;
    animation: transport 5s linear;
  }
  .gray {
    padding: 0;
    margin: 0 auto;
    font-size: 1em;
    color: #66688880;
  }
  .green {
    color: coral;
  }

  .bottom-image {
    padding-top: 30px;
    margin: 5% auto;
    display: flex;
    width: 70%;
    justify-content: space-between;
    gap: 15px;
    flex-wrap: wrap;
  }

  .bottom-image__item {
    width: 20%;
    min-width: 80px;
    font-size: 16px;
  }

  .bottom-image__content {
    width: 80px;
    border-radius: 15px;
  }

  @keyframes transport {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
