<script lang="ts">
  import { goto } from "$app/navigation";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { hasRole } from "$lib/roles";
  import { setRefreshToken, setSalt, setToken } from "$lib/session";
  export let isVault = false;

  let isOpen = false;

  $: isAdmin = hasRole("admin");

  $: logout = async () => {
    await axiosInstance.post("/auth/account/logout");

    setSalt("");
    setToken("");
    setRefreshToken("");

    axiosInstance.defaults.headers.common["Authorization"] = "";

    await goto("/login");
  };

  const closeSidebar = (event: MouseEvent) => {
    const element = document.getElementsByClassName("toggle-menu").item(0);
    if (!element) return;
    if (element instanceof HTMLInputElement) element.checked = false;
    isOpen = false;
  };
</script>

{#if isOpen}
  <div class="backdrop" on:click={closeSidebar}></div>
{/if}

<input type="checkbox" class="toggle-menu" bind:checked={isOpen} />
<div class="hamburger" />
<ul class="list">
  {#if !isVault}
    <li>
      <a href="/"><h2>Vault</h2></a>
    </li>{/if}
  {#if isAdmin}
    <li>
      <a href="/users"><h2>Users</h2></a>
    </li>
  {/if}
  <li>
    <button on:click><h2>Change Masterpassword</h2></button>
  </li>
  <li>
    <button on:click={logout}><h2>Logout</h2></button>
  </li>
</ul>

<style>
  .backdrop {
    z-index: 1;
    margin-top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.5);
    backdrop-filter: blur(5px);
  }
  .list {
    z-index: 2;
    position: absolute;
    padding: 50px 0 0 0;
    top: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0;

    width: 80%;
    margin-left: -80%;
    height: 100%;
    background-color: lightgrey;
    transition: 0.3s margin-left;
  }

  .list li {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    opacity: 0;
  }

  .list li button {
    text-decoration: none;
    color: white;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    cursor: pointer;
    width: 100%;
    background: none;
    outline: none;
    border: none;
    font-size: 1em;
    margin-bottom: 10px;
  }

  .list li a {
    text-decoration: none;
    color: white;
    height: 100%;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hamburger {
    z-index: 3;
    position: absolute;
    width: 30px;
    height: 4px;
    border-radius: 10px;
    background-color: white;
    display: block;
    top: 20px;
    cursor: pointer;
    transition: 0.3s;
    left: 10px;
  }

  .hamburger::before,
  .hamburger::after {
    display: block;
    content: "";
    height: 4px;
    width: 30px;
    border-radius: 10px;
    background-color: white;
    transition: 0.3s;
  }

  .hamburger::before {
    position: inherit;
    top: 10px;
  }

  .hamburger::after {
    position: inherit;
    top: -10px;
  }

  .toggle-menu {
    top: 4px;
    position: absolute;
    width: 30px;
    height: 30px;
    z-index: 4;
    opacity: 0;
    cursor: pointer;
    left: 7px;
  }

  .toggle-menu:checked ~ .hamburger::before {
    transform: rotate(-45deg);
    top: 0;
  }

  .toggle-menu:checked ~ .hamburger::after {
    transform: rotate(45deg);
    top: 0;
  }

  .toggle-menu:checked ~ .hamburger {
    background: transparent;
  }

  .toggle-menu:checked ~ ul {
    margin-left: 0;
  }

  .toggle-menu:checked ~ ul li {
    opacity: 100%;
  }
</style>
