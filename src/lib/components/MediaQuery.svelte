<script>
  export let query = ""; // Accept a media query string as a parameter

  let matches = false; // To track if the media query matches or not

  // Set up a function to listen for media query changes
  function handleMediaQuery() {
    const mediaQueryList = window.matchMedia(query);
    matches = mediaQueryList.matches; // Set initial value

    // Listen for changes
    mediaQueryList.onchange = (event) => {
      matches = event.matches; // Update matches when media query state changes
    };
  }

  // Reactively update the media query check whenever the query changes
  $: handleMediaQuery();
</script>

<!-- Conditionally render slot content based on media query match -->
{#if matches}
  <slot />
{/if}
