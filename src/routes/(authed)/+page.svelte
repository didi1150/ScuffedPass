<script lang="ts">
  import { onMount } from "svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { goto, invalidate, invalidateAll } from "$app/navigation";
  import { checkToken } from "$lib/interceptors/authenticationCheck";
  import { page } from "$app/stores";
  import {
    getSymmetricKey,
    setRefreshToken,
    setSalt,
    setToken,
  } from "$lib/session";
  import { hasRole } from "$lib/roles";
  import Modal from "$lib/components/modals/Modal.svelte";
  import ChangeMasterPassword from "$lib/components/modals/content/ChangeMasterPassword.svelte";
  import DesktopVault from "$lib/components/DesktopVault.svelte";
  import MobileVault from "$lib/components/MobileVault.svelte";
  import MediaQuery from "$lib/components/MediaQuery.svelte";
  import AddPassword from "$lib/components/modals/content/AddPassword.svelte";
  import { decryptData } from "$lib/key";

  let isOpen = false;
  let mode = "changemaster";

  export let data: { passwords: Password[] } = [];

  let openModal = false;

  let websitesDecrypted = false;

  onMount(async () => {
    const encryptionKey = getSymmetricKey();
    if (!encryptionKey) {
      await goto("/unlockvault");
    } else if (!websitesDecrypted) {
      data.passwords.map(async (item) => {
        item.websiteURL = await decryptData(
          item.websiteURL,
          item.iv,
          getSymmetricKey()
        );
      });
      // For reactivity
      setTimeout(() => {
        data.passwords = data.passwords;
        websitesDecrypted = true;
      }, 5);
    }
  });

  let mobileQuery = "(max-width: 1100px)";
  let desktopQuery = "(min-width: 1101px)";
</script>

<section>
  <Modal bind:isOpen>
    {#if mode === "changemaster"}
      <ChangeMasterPassword bind:isOpen></ChangeMasterPassword>
    {/if}
  </Modal>
  <Modal bind:isOpen={openModal}>
    <AddPassword bind:isOpen={openModal}></AddPassword>
  </Modal>
  {#if websitesDecrypted}
    <MediaQuery query={mobileQuery}>
      <MobileVault tableData={data.passwords}></MobileVault>
    </MediaQuery>
    <MediaQuery query={desktopQuery}>
      <DesktopVault tableData={data.passwords}></DesktopVault>
    </MediaQuery>
  {/if}
  <button class="add" on:click={() => (openModal = true)}>Add</button>
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
