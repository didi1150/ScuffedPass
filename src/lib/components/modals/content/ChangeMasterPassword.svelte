<script lang="ts">
  import { hashMasterPassword } from "$lib/key";
  import InputBox from "$lib/components/InputBox.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";

  export let isOpen: boolean;
  export let username = "";
  let currentMasterPassword = "";
  let newMasterPassword = "";

  let error: string = "";

  const handleSubmit = async () => {
    username = (await axiosInstance.get("/auth/account/user")).data;

    const { hashPW } = await hashMasterPassword(
      username,
      currentMasterPassword
    );
    try {
      const response = await axiosInstance.post(
        "/auth/account/user/password-check",
        {
          masterPassword: hashPW,
        }
      );
      if (response.status === 200) {
        const response = await axiosInstance.get<Password>("/vault");
        // console.log(response.data);
        // TODO: Salt Request for admin
        const saltResponse = await axiosInstance.get("/auth/account/user/salt");
        if (
          response.data &&
          Array.isArray(response.data) &&
          saltResponse.data
        ) {
        } else {
        }
      }
    } catch (reason) {
      error = "The master password is incorrect.";
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h2>Change Master Password</h2>
  <InputBox
    id="password"
    type="password"
    label="Enter Current Master Password"
    required={true}
    bind:value={currentMasterPassword}
  />
  <InputBox
    id="master"
    type="password"
    label="Enter New Master Password"
    bind:value={newMasterPassword}
    required={true}
  />
  <button type="submit">Edit</button>
  {#if error.length != 0}
    <p class="error">{error}</p>
  {/if}
</form>

<style>
  .error {
    color: red;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: white rgba(0, 0, 0, 0);
  }
  button {
    margin: 20px 0;
    cursor: pointer;
    font-size: 1em;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    width: 200px;
    font-weight: 700;
  }
</style>
