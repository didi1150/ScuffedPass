<script lang="ts">
  import { goto } from "$app/navigation";
  import MediaQuery from "$lib/components/MediaQuery.svelte";
  import MobileVault from "$lib/components/MobileVault.svelte";
  import AddPassword from "$lib/components/modals/content/AddPassword.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import VaultTable from "$lib/components/tables/VaultTable.svelte";
  export let data = [];

  let openModal = false;

  let mobileQuery = "(max-width: 1100px)";
  let desktopQuery = "(min-width: 1101px)";
</script>

<Modal bind:isOpen={openModal}>
  <AddPassword bind:isOpen={openModal}></AddPassword>
</Modal>
<MediaQuery query={mobileQuery}>
  <MobileVault tableData={data.passwords}></MobileVault>
</MediaQuery>
<MediaQuery query={desktopQuery}>
  <VaultTable tableData={data.passwords}></VaultTable>
</MediaQuery>
<button class="add" on:click={() => (openModal = true)}>Add</button>
<button class="back" on:click={() => goto("/")}
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    ><path
      fill="white"
      d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"
    /></svg
  ></button
>

<style>
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

  .back {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    color: black;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border-radius: 100%;
    font-size: 2em;
  }

  .back svg {
    opacity: 50%;
  }
</style>
