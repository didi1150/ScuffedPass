<script lang="ts">
  import UserTable from "$lib/components/UserTable.svelte";
  import { onMount } from "svelte";

  export let data;
</script>

<UserTable users={data.users}></UserTable>
