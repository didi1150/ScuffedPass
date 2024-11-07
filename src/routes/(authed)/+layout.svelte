<script lang="ts">
  import Modal from "$lib/components/modals/Modal.svelte";
  import { setRefreshToken, setSalt, setToken } from "$lib/session";
  import { goto, onNavigate } from "$app/navigation";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { hasRole } from "$lib/roles";
  import ChangeMasterPassword from "$lib/components/modals/content/ChangeMasterPassword.svelte";
  import MediaQuery from "$lib/components/MediaQuery.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { onMount } from "svelte";
  let isOpen = false;
  let mode: "lock" | "change" = "lock";
  $: isAdmin = hasRole("admin");

  let isVault = true;
  let isUsers = false;

  onNavigate((navigation) => {
    isVault = navigation.to?.route.id === "/(authed)";
    isUsers = navigation.to?.route.id === "/(authed)/(admin)/users";
  });
  $: logout = async () => {
    await axiosInstance.post("/auth/account/logout");

    setSalt("");
    setToken("");
    setRefreshToken("");

    axiosInstance.defaults.headers.common["Authorization"] = "";

    await goto("/login");
  };

  let hamburgerQuery = "(max-width: 600px)";
  let navbarQuery = "(min-width: 601px)";
</script>

<Modal bind:isOpen>
  {#if mode === "change"}
    <ChangeMasterPassword bind:isOpen></ChangeMasterPassword>
  {/if}
</Modal>
<MediaQuery query={hamburgerQuery}
  ><Sidebar bind:isVault bind:changeMasterPassword={isOpen} bind:mode
  ></Sidebar></MediaQuery
>
<MediaQuery query={navbarQuery}>
  <nav>
    <div class="controls">
      {#if !isVault}
        <button class="vault" on:click={() => goto("/")}>Vault</button>{/if}

      {#if isAdmin && !isUsers}
        <button class="users" on:click={() => goto("/users")}>Users</button>
      {/if}
      <button
        on:click={() => {
          mode = "change";
          isOpen = true;
        }}>Change Master Password</button
      >

      <button class="logout" on:click={logout}>Logout</button>
    </div>
  </nav></MediaQuery
>
<slot></slot>

<style>
  nav {
    background-color: white;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: flex-end;
    z-index: 2;
    height: fit-content;
  }

  button {
    color: grey;
    padding: 20px;
    cursor: pointer;
    background-color: white;
    font-size: 1.2em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    border: none;
  }

  button:hover {
    background-color: lightgrey;
    transition: 0.3s;
  }
</style>
