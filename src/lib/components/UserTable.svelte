<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  export let users;
  import Modal from "$lib/components/modals/Modal.svelte";
  import ConfirmDelete from "$lib/components/modals/content/ConfirmDelete.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import ChangeMasterPassword from "./modals/content/ChangeMasterPassword.svelte";
  let isOpen = false;
  let mode = "";
  let selectedUserId: number;
  let selectedUserEmail: string = "";
</script>

<Modal bind:isOpen>
  {#if mode === "delete"}
    <ConfirmDelete
      bind:isOpen
      question="Do you want to delete this user?"
      deleteFunction={() => {
        axiosInstance
          .delete(`/admin/delete?id=${selectedUserId}`)
          .then((result) => {
            if (result.status === 200) isOpen = false;
          })
          .finally(invalidateAll);
      }}
    ></ConfirmDelete>
  {:else if mode === "edit"}
    <ChangeMasterPassword
      username={selectedUserEmail}
      bind:isOpen
      isAdmin={true}
    ></ChangeMasterPassword>
  {/if}
</Modal>
<div class="background">
  <div class="vault-box">
    <table>
      <thead>
        <tr class="header">
          <th>Id</th>
          <th>Email</th>
          <th>Enabled</th>
          <th>Locked</th>
          <th>Created At</th>
          <th>Delete</th>
          <th>Edit Master Password</th>
        </tr><tr />
      </thead>

      <tbody>
        {#each users as row}
          <tr>
            {#each Object.values(row) as value}
              <td>{value}</td>
            {/each}
            <td
              ><button
                on:click={() => {
                  mode = "delete";
                  selectedUserId = row.id;
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
            {#if !row.locked}
              <td
                ><button
                  on:click={() => {
                    mode = "edit";
                    selectedUserEmail = row.email;
                    selectedUserId = row.id;
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
            {:else}
              <td>N/A</td>
            {/if}
          </tr>
        {/each}
      </tbody>
      {#if users.length == 0}
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
    text-align: center;
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
