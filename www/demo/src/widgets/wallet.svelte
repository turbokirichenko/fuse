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

  export let balanceBOTTLE = 0;

  let inputText = "";
  let success = "";
  let notice = "";
  let error = "";
  const handleContractEvent = async () => {
    error = "";
    success = "";
    notice = "";
    if (provider && selectedAccount) {
      if (!inputText) {
        error = "Plest enter GS1 code!";
        return;
      }
      try {
        const tx = await useMintContract(inputText, selectedAccount, provider);
        notice = "Операция в обработке!";
        try {
          await tx.wait();
          error = "";
          notice = "";
          success = "Операция прошла успешно! Начислено 0.1 BOTTLE";
        } catch (err) {
          error =
            "Операция отклонена: проверьте правильность введенных данных!";
          return;
        }
      } catch (err) {
        error = "Отклонена: При исполнении операции возникла ошибка!";
      }
    }
  };
</script>

<div>
  <div class="balance">
    <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
    <div>{selectedWallet.info.name}</div>
  </div>
  <div class="notice">
    {#if error}
      <p class="red">{error}</p>
    {:else if notice}
      <p class="gray">{notice}</p>
    {:else}
      <p class="green">{success}</p>
    {/if}
  </div>
  <div class="input-bar">
    <input
      class="input-bar__input"
      bind:value={inputText}
      placeholder="enter the datamatrix scanned code"
    />
    <button class="input-bar__button" on:click={() => handleContractEvent()}
      >Mine!</button
    >
  </div>
  <button on:click={() => handleDisconnect(selectedWallet)}>
    <div>disconnect</div>
  </button>
</div>

<style>
  .input-bar {
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    width: 100%;
    margin: auto;
    height: 60px;
    border-radius: 30px;
    margin: 20px 0 20px;
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
  }

  .red {
    color: crimson;
  }
  .gray {
    color: bisque;
  }
  .green {
    color: chartreuse;
  }
</style>
