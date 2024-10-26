<script lang="ts">
  import MediaQuery from "$lib/components/MediaQuery.svelte";
  import UserTable from "$lib/components/UserTable.svelte";
  import UserTableMobile from "$lib/components/UserTableMobile.svelte";

  export let data;

  let mobileQuery = "(max-width: 1100px)";
  let desktopQuery = "(min-width: 1101px)";
</script>

<MediaQuery query={mobileQuery}>
  <UserTableMobile users={data.users}></UserTableMobile>
</MediaQuery>
<MediaQuery query={desktopQuery}>
  <UserTable users={data.users}></UserTable>
</MediaQuery>
