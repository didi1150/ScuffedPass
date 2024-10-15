<script lang="ts">
  export let data;
</script>

<div>
  {#if !data.success}
    <h2>Oops something went wrong. Your token might have expired</h2>
  {:else}
    <h2>
      Your account has been successfully locked. Contact the administration to
      unlock it.
    </h2>
  {/if}
</div>

<style>
  div {
    display: flex;
    justify-content: center;
  }
  h2 {
    color: white;
    word-break: normal;
    margin: 10px;
    font-size: 1em;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: #73beff;
  }
</style>
