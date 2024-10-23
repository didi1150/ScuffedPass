<script lang="ts">
  import { goto } from "$app/navigation";

  export let recoveryKey: string;
  export let isOpen: boolean;
  let tooltipTimeout: number;
  let tooltipVisible = false;

  const copy = () => {
    navigator.clipboard.writeText(recoveryKey).then(() => {
      tooltipVisible = true;
      // Hide tooltip after 2 seconds
      clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(() => {
        tooltipVisible = false;
      }, 2000);
    });
  };
</script>

<div>
  <h2>Important:</h2>
  <p>
    Please make sure to save your Recovery Key as it won't be saved anywhere
    else.
  </p>
  <h1>{recoveryKey}</h1>
  <div class="tooltip">
    <span class="tooltipText{tooltipVisible ? ' visible' : ''}"
      >Text copied!</span
    >
    <button class="copy" on:click={copy}
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

    <button
      class="redirect"
      on:click={() => {
        goto("/");
        isOpen = false;
      }}>Continue</button
    >
  </div>
</div>

<style>
  h1 {
    word-break: break-all;
  }
  .tooltip {
    position: relative;
    margin-top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
  }

  .tooltip .copy {
    background: transparent;
    border: none;
    outline: none;
    font-size: 2em;
    cursor: pointer;
  }

  .tooltipText {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid white;
    padding: 10px 15px;
    border-radius: 20px;
    white-space: nowrap;
    background-color: black;
    opacity: 0;
    transition: opacity 0.5s ease;
    visibility: hidden;
  }
  .tooltipText::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    border: 15px solid;
    border-color: #000 #0000 #0000 #0000;
  }

  .tooltipText.visible {
    top: -130%;
    visibility: visible;
    opacity: 1;
  }

  .redirect {
    transform: translateX(-50%);
    margin-top: 20px;
    margin-left: 50%;
    cursor: pointer;
    font-size: 1.5em;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    width: 200px;
    font-weight: 700;
  }
</style>
