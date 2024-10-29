<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getSymmetricKey } from "$lib/session";
  import Modal from "$lib/components/modals/Modal.svelte";
  import DesktopVault from "$lib/components/DesktopVault.svelte";
  import MobileVault from "$lib/components/MobileVault.svelte";
  import MediaQuery from "$lib/components/MediaQuery.svelte";
  import { decryptData } from "$lib/key";
  import AddPassword from "$lib/components/modals/content/AddPassword.svelte";

  let isOpen = false;

  export let data: { responseArray: Password[] };
  console.log("Data: ", data);
  let websitesDecrypted = false;

  const decryptWebsites = () => {
    if (!data) return;
    data.responseArray.map(async (item) => {
      item.websiteURL = await decryptData(
        item.websiteURL,
        item.iv,
        getSymmetricKey()
      );
    });
    // For reactivity
    setTimeout(() => {
      data = data;
      websitesDecrypted = true;
    }, 5);
  };

  onMount(async () => {
    const encryptionKey = getSymmetricKey();
    if (!encryptionKey) {
      await goto("/unlockvault");
    } else if (!websitesDecrypted) {
      decryptWebsites();
    }
  });

  let mobileQuery = "(max-width: 1100px)";
  let desktopQuery = "(min-width: 1101px)";
</script>

<section>
  <Modal bind:isOpen>
    <AddPassword bind:isOpen bind:data={data.responseArray}></AddPassword>
  </Modal>
  {#if websitesDecrypted}
    <MediaQuery query={mobileQuery}>
      <MobileVault tableData={data.responseArray}></MobileVault>
    </MediaQuery>
    <MediaQuery query={desktopQuery}>
      <DesktopVault tableData={data.responseArray}></DesktopVault>
    </MediaQuery>
  {/if}
  <button
    class="add"
    on:click={() => {
      isOpen = true;
    }}>Add</button
  >
</section>

<style>
  section {
    height: 100%;
    overflow: auto;
  }

  .add {
    position: absolute;
    bottom: 50px;
    margin-left: calc(50% - 75px);
    width: 150px;
    height: 50px;
    cursor: pointer;
    color: black;
    background-color: white;
    border: none;
    outline: none;
    border-radius: 25px;
    font-size: 1.25em;
  }
</style>
