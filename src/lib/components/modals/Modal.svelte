<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let isOpen: boolean = false;
  export let closeOnClickOutside: boolean = true;

  const dispatch = createEventDispatcher();

  function closeModal() {
    isOpen = false;
    dispatch("close");
  }

  function handleOutsideClick(event: MouseEvent) {
    if (closeOnClickOutside && event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleButtonClose() {
    closeModal();
  }

  // Handle escape key to close modal
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  // Add event listener for escape key
  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" on:click={handleOutsideClick}>
    <div class="modal-content">
      <button class="close" on:click={handleButtonClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          ><path
            fill="white"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
          /></svg
        >
      </button>
      <slot />
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.5);
    display: flex;
    backdrop-filter: blur(5px);
    justify-content: center;
    align-items: center;
    z-index: 1000;
    border: none;
  }

  .modal-content {
    background-color: rgba(10, 10, 10, 0.5);
    color: white;
    border: 2px solid white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    animation-name: popup;
    animation-duration: 0.8s;
  }

  .close {
    position: absolute;
    left: 4px;
    top: 4px;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    background-color: transparent;
    display: none;
  }

  @keyframes popup {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(1.3);
    }
    50% {
      transform: scale(1);
    }
  }

  @media (max-width: 640px) {
    .modal-content {
      position: relative;
      /* width: 100%;
      height: 100%; */
      max-width: 80%;
      padding: 20px;
      /* border: none; */
    }

    .close {
      display: block;
      opacity: 50%;
    }
  }
</style>
