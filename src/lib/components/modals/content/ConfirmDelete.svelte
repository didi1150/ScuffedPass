<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { axiosInstance } from "$lib/interceptors/axios";

  export let passwordID: number;
  export let isOpen: boolean;

  let error = false;
</script>

<h2>Do you want to delete this password?</h2>
<div class="buttons">
  <button
    class="yes"
    on:click={() => {
      axiosInstance
        .delete(`/vault/${passwordID}`)
        .then((response) => {
          if (response.status === 200) {
            isOpen = false;
          }
        })
        .finally(() => invalidateAll());
    }}>Yes</button
  >
  <button class="no" on:click={() => (isOpen = false)}>No</button>
</div>
{#if error}
  <p>Couldn't delete the password</p>
{/if}

<style>
  h2 {
    text-align: center;
    font-weight: 500;
  }

  p {
    text-align: center;
    color: red;
  }
  .buttons {
    display: flex;
    justify-content: center;
  }
  button {
    width: 100px;
    height: 50px;
    border-radius: 50px;
    border: none;
    font-size: 1.5em;
    font-weight: 900;
    cursor: pointer;
    color: white;
  }
  .yes {
    margin-right: 10px;
    background-color: limegreen;
  }
  .no {
    background-color: red;
  }
</style>
