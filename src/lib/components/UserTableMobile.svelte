<script lang="ts">
  import Modal from "$lib/components/modals/Modal.svelte";
  import ConfirmAction from "$lib/components/modals/content/ConfirmAction.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  export let users: User[];
  let isOpen = false;
  let mode: "delete" | "lock" = "delete";
  let selectedUserId: number;
</script>

<Modal bind:isOpen>
  {#if mode === "delete"}
    <ConfirmAction
      errorMessage="Couldn't delete this password"
      callback={() => {
        axiosInstance;
        axiosInstance
          .delete(`/admin/delete?id=${selectedUserId}`)
          .then((result) => {
            if (result.status === 200) {
              isOpen = false;

              const targetIndex = users.findIndex((us) => {
                return us.id === selectedUserId;
              });

              users.splice(targetIndex, 1);
              users = [...users];
            }
          });
      }}
      question="Do you want to delete this user?"
      bind:isOpen
    ></ConfirmAction>
  {/if}
</Modal>

<div class="anchor">
  <ul>
    {#if users.length == 0}
      <div class="empty">
        <span>Nothing to show here</span>
      </div>
    {/if}
    {#each users as user}
      <li>
        <div class="details">
          <div class="id">
            ID: {user.id}
          </div>
          <div class="email">
            {user.email}
          </div>
          <div class="Created At">Created at: {user.createdAt}</div>
        </div>
        <div class="controls">
          <button
            class="svg-container"
            on:click={() => {
              mode = "delete";
              selectedUserId = user.id;
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

  @media (max-width: 600px) {
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
