<script lang="ts">
  import Modal from "$lib/components/modals/Modal.svelte";
  import ConfirmAction from "$lib/components/modals/content/ConfirmAction.svelte";
  import EditPasswordDetails from "$lib/components/modals/content/EditPasswordDetails.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { decryptData } from "$lib/key";
  import { getSymmetricKey } from "$lib/session";
  export let tableData: Password[] = [];
  let decryptedPasswords: { password: string; id: number }[] = [];
  let isOpen = false;
  let mode = "edit";

  let selectedPasswordID: number;
  tableData.forEach(async (value) => {
    try {
      let decryptedPW = await decryptData(
        value.password,
        value.iv,
        getSymmetricKey(),
      );
      decryptedPasswords.push({ password: decryptedPW, id: value.passwordID });
    } catch (error) {}
  });

  const getDecryptedPassword = (id: number) => {
    return decryptedPasswords.find((value) => {
      return value.id === id;
    });
  };

  let copyToolTip = "";
  let showCopyToolTip = -1;
  let tooltipTimer: number;
  const handleCopy = async (passwordID: number) => {
    clearTimeout(tooltipTimer);
    let pw = getDecryptedPassword(passwordID);
    if (!pw) {
      copyToolTip = "Error: Couldn't decrypt password";
    } else {
      try {
        await navigator.clipboard.writeText(pw.password);
        copyToolTip = "Password copied";
      } catch (error) {
        copyToolTip = "Failed to copy!";
      }
    }
    showCopyToolTip = passwordID;
    tooltipTimer = setTimeout(() => {
      showCopyToolTip = -1;
    }, 2000);
  };
</script>

<Modal bind:isOpen>
  {#if mode === "delete"}
    <ConfirmAction
      errorMessage="Couldn't delete this password"
      callback={() => {
        axiosInstance
          .delete(`/vault/${selectedPasswordID}`)
          .then((response) => {
            if (response.status === 200) {
              isOpen = false;
              const targetIndex = tableData.findIndex((passwordValue) => {
                return passwordValue.passwordID === selectedPasswordID;
              });

              tableData.splice(targetIndex, 1);
              tableData = [...tableData];
            }
          });
      }}
      question="Do you want to delete this password?"
      bind:isOpen
    ></ConfirmAction>
  {:else if mode === "edit"}
    <EditPasswordDetails
      bind:passwordID={selectedPasswordID}
      bind:isOpen
      bind:data={tableData}
    ></EditPasswordDetails>
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
          <div class="copy-container">
            <button
              class="svg-container"
              on:click={() => {
                handleCopy(row.passwordID);
              }}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                ><path
                  fill="white"
                  d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
                /></svg
              ></button
            >
            <!-- Tooltip -->
            {#if showCopyToolTip === row.passwordID}
              <span class="tooltip">{copyToolTip}</span>
            {/if}
          </div>
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
    overflow-y: auto;

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

  .copy-container {
    position: relative;
    display: inline-block;
  }

  /* Tooltip styling */
  .tooltip {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    white-space: nowrap;
    opacity: 0.9;
    z-index: 100;
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
