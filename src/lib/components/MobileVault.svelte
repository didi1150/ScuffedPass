<script lang="ts">
  import Modal from "$lib/components/modals/Modal.svelte";
  import ConfirmWithPassword from "$lib/components/modals/content/RevealPassword.svelte";
  import ConfirmDelete from "$lib/components/modals/content/ConfirmDelete.svelte";
  import AddPassword from "$lib/components/modals/content/AddPassword.svelte";
  import EditPasswordDetails from "$lib/components/modals/content/EditPasswordDetails.svelte";
  export let tableData: Password[] = [];

  let isOpen = false;
  let mode = "reveal";

  let selectedPasswordID: number;

  let data = "",
    iv = "";
</script>

<Modal bind:isOpen>
  {#if mode === "reveal"}
    <ConfirmWithPassword bind:data bind:iv></ConfirmWithPassword>
  {:else if mode === "delete"}
    <ConfirmDelete bind:passwordID={selectedPasswordID} bind:isOpen
    ></ConfirmDelete>
  {:else if mode === "edit"}
    <EditPasswordDetails bind:passwordID={selectedPasswordID} bind:isOpen
    ></EditPasswordDetails>
  {:else if mode === "add"}
    <AddPassword></AddPassword>
  {/if}
</Modal>

<div class="anchor">
  <ul>
    {#if tableData.length == 0}
      <div class="empty">
        <span>Nothing to show here</span>
      </div>
    {/if}
    {#each tableData as row}
      <li>
        <div class="details">
          <div class="website">
            {row.websiteURL}
          </div>
          <div class="email">
            {row.email}
          </div>
        </div>
        <div class="controls">
          <button
            class="svg-container"
            on:click={() => {
              data = row.password;
              iv = row.iv;
              mode = "reveal";
              isOpen = true;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              ><path
                fill="white"
                d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
              /></svg
            ></button
          >
          <button
            class="svg-container"
            on:click={() => {
              mode = "edit";
              selectedPasswordID = row.passwordID;
              isOpen = true;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              ><path
                fill="white"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
              /></svg
            ></button
          ><button
            class="svg-container"
            on:click={() => {
              selectedPasswordID = row.passwordID;
              mode = "delete";
              isOpen = true;
            }}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              ><path
                fill="#ff0000"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
              /></svg
            ></button
          >
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .anchor {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
    width: 80%;
    height: 60%;
    border: 2px solid white;
    border-radius: 20px;
    position: relative;
    display: block;
    overflow-y: scroll;

    scrollbar-width: thin;
    scrollbar-color: white rgba(0, 0, 0, 0);
  }

  .empty {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .empty span {
    font-size: 1.5em;
    color: white;
    opacity: 50%;
    word-break: break-all;
  }

  ul li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-bottom: 2px dashed white;
  }

  ul li .details {
    color: white;
    padding: 10px 0;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1; /* Allow details to take up remaining space */
    overflow-wrap: break-word; /* Break long words if needed */
    word-wrap: break-word; /* Fallback for older browsers */
    word-break: break-word;
    min-width: 0; /* Ensure text can shrink to fit available space */
    font-size: 1.5em;
  }

  .website {
    font-weight: bold;
  }

  .email {
    font-weight: lighter;
  }

  ul li:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.5);
  }

  ul li:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ul li .controls {
    width: 100px;
    height: 200px;
    border-left: 2px solid white;
    flex-shrink: 0; /* Prevent controls from shrinking */
    margin-left: 20px; /* Optional: Add space between details and controls */
    text-align: center; /* Align controls content to the right */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  ul li .controls svg {
    font-size: 2.5em;
  }

  .details div {
    word-wrap: break-word;
  }

  .svg-container {
    background-color: transparent;
    padding: 10px;
    margin: 5px;
    border-radius: 20px;
    outline: none;
    border: none;
  }

  @media (max-width: 360px) {
    ul {
      height: calc(100% - 150px);
      border: none;
      border-bottom: 2px solid white;
      width: 100%;
      font-size: 0.7em;
      border-radius: 0px;
    }

    .anchor {
      display: block;
    }
  }
</style>
