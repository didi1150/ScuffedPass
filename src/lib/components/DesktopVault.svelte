<script lang="ts">
  import Modal from "$lib/components/modals/Modal.svelte";
  import ConfirmWithPassword from "$lib/components/modals/content/RevealPassword.svelte";
  import ConfirmDelete from "$lib/components/modals/content/ConfirmDelete.svelte";
  import AddPassword from "$lib/components/modals/content/AddPassword.svelte";
  import EditPasswordDetails from "$lib/components/modals/content/EditPasswordDetails.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { invalidateAll } from "$app/navigation";

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
    <ConfirmDelete
      deleteFunction={() => {
        axiosInstance
          .delete(`/vault/${selectedPasswordID}`)
          .then((response) => {
            if (response.status === 200) {
              isOpen = false;
            }
          })
          .finally(() => invalidateAll());
      }}
      question="Do you want to delete this password?"
      bind:isOpen
    ></ConfirmDelete>
  {:else if mode === "edit"}
    <EditPasswordDetails bind:passwordID={selectedPasswordID} bind:isOpen
    ></EditPasswordDetails>
  {:else if mode === "add"}
    <AddPassword></AddPassword>
  {/if}
</Modal>
<div class="background">
  <div class="vault-box">
    <table>
      <thead>
        <tr class="header">
          <th>Website</th>
          <th>Email</th>
          <th>Password</th>
          <th>Reveal</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr><tr />
      </thead>

      <tbody>
        {#each tableData as row}
          <tr>
            {#each Object.entries(row) as [key, value]}
              {#if key !== "iv" && key !== "passwordID"}
                <td>{value}</td>
              {/if}
            {/each}
            <td
              ><button
                on:click={() => {
                  data = row.password;
                  iv = row.iv;
                  mode = "reveal";
                  isOpen = true;
                }}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  ><path
                    fill="white"
                    d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
                  /></svg
                ></button
              ></td
            >

            <td
              ><button
                on:click={() => {
                  mode = "edit";
                  selectedPasswordID = row.passwordID;
                  isOpen = true;
                }}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  ><path
                    fill="white"
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
                  /></svg
                >
              </button></td
            >

            <td
              ><button
                on:click={() => {
                  selectedPasswordID = row.passwordID;
                  mode = "delete";
                  isOpen = true;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  ><path
                    fill="#ff0000"
                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                  /></svg
                >
              </button></td
            >
          </tr>
        {/each}
      </tbody>
      {#if tableData.length == 0}
        <div class="empty">
          <span>Nothing to show here</span>
        </div>
      {/if}
    </table>
  </div>
</div>

<style>
  .background {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 100%;
  }

  table {
    border: 2px solid white;
    border-radius: 20px;
    display: block;
    overflow-y: scroll;
    max-height: 400px;
    border-collapse: collapse;
  }

  table::-webkit-scrollbar {
    display: none;
  }

  td {
    padding: 25px;
  }

  th {
    width: 75px;
    padding: 20px;
  }

  thead {
    position: sticky;
    top: 0;
    background: blur(15);
    background-color: rgb(60, 68, 97);
  }

  .empty {
    border-radius: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .empty span {
    opacity: 50%;
  }

  button {
    width: 50px;
    height: 50px;
    margin-top: 8px;
    background: transparent;
    border: none;
    border-radius: 100%;
    cursor: pointer;
    font-size: 2em;
  }
</style>
