<script lang="ts">
  import { onMount } from "svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { goto } from "$app/navigation";
  import { checkToken } from "$lib/interceptors/authenticationCheck";
  import { page } from "$app/stores";
  import { setRefreshToken, setSalt, setToken } from "$lib/session";
  import { hasRole } from "$lib/roles";
  import Modal from "$lib/components/modals/Modal.svelte";
  import ChangeMasterPassword from "$lib/components/modals/content/ChangeMasterPassword.svelte";

  $: currentUrl = $page.url.pathname;

  let message = "You are not logged in";

  let isOpen = false;

  $: isAdmin = hasRole("admin");

  onMount(async () => {
    message = "Welcome, " + (await checkToken(currentUrl));
  });

  $: logout = async () => {
    await axiosInstance.post("/auth/account/logout");

    setSalt("");
    setToken("");
    setRefreshToken("");

    axiosInstance.defaults.headers.common["Authorization"] = "";

    await goto("/login");
  };
</script>

<Modal bind:isOpen>
  <ChangeMasterPassword bind:isOpen></ChangeMasterPassword>
</Modal>
<div class="container">
  <h2>{message}</h2>
  <div class="controls">
    <button class="vault" on:click={() => goto("/vault")}>Vault</button>
    <button class="logout" on:click={logout}>Logout</button>
    {#if isAdmin}
      <button class="users" on:click={() => goto("/users")}>Users</button>
    {/if}
  </div>
  <button on:click={() => (isOpen = true)}>Change Master Password</button>
</div>

<style>
  .container {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h2 {
    color: white;
    text-align: center;
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  button {
    color: white;
    font-size: 1.5em;
    font-weight: 500;
    padding: 20px 25px;
    background-color: transparent;
    border: 2px solid white;
    outline: none;
    border-radius: 50px;
    margin: 10px;
    cursor: pointer;
  }

  @media (max-width: 360px) {
    .container {
      text-wrap: wrap;
    }
    h2 {
      font-size: 1em;
    }
  }
</style>
