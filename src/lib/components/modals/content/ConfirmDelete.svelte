<script lang="ts">
  import { invalidateAll } from "$app/navigation";

  export let isOpen: boolean;

  export let question: string;
  export let deleteFunction;

  let error = false;
</script>

<h2>{question}</h2>
<div class="buttons">
  <button
    class="yes"
    on:click={() => {
      deleteFunction();
      invalidateAll();
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
