<script lang="ts">
  export let id: string = "";
  export let type: string = "text";
  export let label: string = "";
  export let value: string = "";
  export let required: boolean = false;

  $: hasContent = value.length > 0;
</script>

<div class="input-box" class:has-content={hasContent}>
  <input {id} {...{ type }} {required} bind:value on:focus on:blur />
  <label for={id}>{label}</label>
</div>

<style>
  .input-box {
    position: relative;
    width: 100%;
    margin: 30px 0px;
    border-bottom: 2px solid white;
  }

  .input-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1.25em;
    color: white;
    pointer-events: none;
    transition: 0.5s;
  }

  .input-box input:focus ~ label,
  .input-box.has-content label {
    top: -5px;
  }

  .input-box input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.25em;
    color: white;
    padding: 0 0 0 5px;
  }
</style>
