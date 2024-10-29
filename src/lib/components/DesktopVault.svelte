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
    let decryptedPW = await decryptData(
      value.password,
      value.iv,
      getSymmetricKey()
    );
    decryptedPasswords.push({ password: decryptedPW, id: value.passwordID });
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
<div class="background">
  <div class="vault-box">
    <table>
      <thead>
        <tr class="header">
          <th>Website</th>
          <th>Email</th>
          <th>Copy</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr><tr />
      </thead>

      <tbody>
        {#each tableData as row}
          <tr>
            <td>{row.websiteURL}</td>
            <td>{row.email}</td>
            <td>
              <div class="copy-container">
                <button
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
              </div></td
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
    z-index: 1;
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

  .copy-container {
    position: relative;
    display: inline-block;
  }

  /* Tooltip styling */
  .tooltip {
    position: absolute;
    bottom: 110%;
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
</style>
