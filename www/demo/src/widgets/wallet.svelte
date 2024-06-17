<script>
  import { ethers } from "ethers";
  import { useDisctonnectNetwork } from "../lib/utils/use-disconnect-network";
  import {
    useMintContract,
    useGetBottle,
  } from "../lib/utils/use-mint-contract";

  /** @type {string} */
  export let selectedAccount;

  /** @type { EIP6963AnnounceProviderEvent["detail"] | null } */
  export let selectedWallet;

  /** @type { ethers.BrowserProvider | null } */
  $: provider = selectedWallet
    ? new ethers.BrowserProvider(selectedWallet.provider)
    : null;

  /** @param {EIP6963AnnounceProviderEvent["detail"]} wallet */
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

  let nonce = 0;
  let inputText = "";
  let success = "";
  let notice = "";
  let error = "";
  let txhash = "";
  const handleContractEvent = async () => {
    error = "";
    success = "";
    notice = "";
    txhash = "";
    if (provider && selectedAccount) {
      if (!inputText) {
        error = "Plest enter GS1 code!";
        return;
      }
      try {
        const tx = await useMintContract(inputText, selectedAccount, provider);
        txhash = tx.hash;
        notice = `Транзакция в обработке...`;
        try {
          const res = await tx.wait();
          error = "";
          notice = "";
          success = `Поздравляю! Вам начислено 0.01 BOTTLE`;
          nonce++;
        } catch (err) {
          notice = "";
          error = `Ошибка валидации штрих-кода!`;
          console.error(err);
          return;
        }
      } catch (err) {
        notice = "";
        console.error(err);
        error = "Отклонена: При исполнении операции возникла ошибка!";
      }
      notice = "";
    }
  };
</script>

<div>
  <div class="balance">
    <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
    <div>
      View contract on <a
        target="_blank"
        href="https://explorer.test.siberium.net/address/0x986796bD24f06C6AE28b6397f8eA53cfB39c6B0b"
        >block explorer</a
      >
    </div>
  </div>
  <div class="input-block">
    <div class="input-bar">
      <input
        class="input-bar__input"
        bind:value={inputText}
        placeholder="enter the datamatrix scanned code"
      />
      <button
        disabled={!!notice}
        class="input-bar__button"
        on:click={() => handleContractEvent()}>Mine!</button
      >
    </div>
    <div class="notice">
      {#if error}
        <p class="red">{error}</p>
        <p class="red">
          <a
            target="_blank"
            href={"https://explorer.test.siberium.net/tx/" + txhash}
            >txid explore</a
          >
        </p>
      {:else if notice}
        <p class="gray">{notice}</p>
        <p class="gray">
          <a
            target="_blank"
            href={"https://explorer.test.siberium.net/tx/" + txhash}
            >txid explore</a
          >
        </p>
      {:else if success}
        <p class="green">{success}</p>
        <p class="gray">
          <a
            target="_blank"
            href={"https://explorer.test.siberium.net/tx/" + txhash}
            >txid explore</a
          >
        </p>
      {/if}
    </div>
  </div>
  <button on:click={() => handleDisconnect(selectedWallet)}>
    <div>disconnect</div>
  </button>
</div>

<style>
  .input-block {
    width: 90%;
    height: 160px;
    margin: 20px auto 20px;
  }
  .input-bar {
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    width: 100%;
    max-width: 480px;
    height: 60px;
    border-radius: 30px;
    margin: 0 auto 0;
    padding: 5px 8px;
    border: 3px solid #f0f0f0;
  }

  .input-bar__input {
    box-sizing: border-box;
    border: none;
    width: 80%;
    height: 100%;
    border-radius: 30px;
    padding: 10px;
  }

  .input-bar__button {
    width: 20%;
    height: 100%;
    border-radius: 30px;
    padding: 0;
  }

  .red {
    color: crimson;
    margin: 0;
    padding: 0;
  }
  .gray {
    color: #88866680;
    margin: 0;
    padding: 0;
  }
  .green {
    color: #f90;
    margin: 0;
    padding: 0;
  }
</style>
