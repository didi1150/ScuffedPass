<script lang="ts">
  import {
    base64ToUint8Array,
    decryptPrivateKey,
    encryptPrivateKey,
    hashMasterPassword,
  } from "$lib/key";
  import InputBox from "$lib/components/InputBox.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { getSalt, setRefreshToken, setSalt, setToken } from "$lib/session";
  import { goto } from "$app/navigation";

  export let isOpen: boolean;
  export let username = "";
  let currentMasterPassword = "";
  let newMasterPassword = "";

  let error: string = "";

  const logout = async () => {
    await axiosInstance.post("/auth/account/logout");

    setSalt("");
    setToken("");
    setRefreshToken("");

    axiosInstance.defaults.headers.common["Authorization"] = "";

    await goto("/login");
  };

  const handleSubmit = async () => {
    username = (await axiosInstance.get("/auth/account/user")).data;
    const salt = await getSalt(username);
    const oldHash = await hashMasterPassword(
      username,
      currentMasterPassword,
      salt
    );
    try {
      const response = await axiosInstance.post(
        "/auth/account/user/encryptionKey",
        {
          hash: oldHash.hashPW,
        }
      );
      if (response.status === 200) {
        const { privateKeyMaster, iv } = response.data;
        const decryptedPrivateKey = await decryptPrivateKey(
          privateKeyMaster,
          currentMasterPassword,
          salt,
          iv
        );
        const newHash = await hashMasterPassword(
          username,
          newMasterPassword,
          salt
        );
        const reencryptedPrivateKeyMaster = await encryptPrivateKey(
          decryptedPrivateKey,
          newMasterPassword,
          salt,
          base64ToUint8Array(iv)
        );
        if (!reencryptedPrivateKeyMaster)
          throw new Error("Couldn't reencrypt private key");
        const updateAttempt = await axiosInstance.patch(
          "auth/account/user/updatepw",
          {
            privateKeyMaster: reencryptedPrivateKeyMaster,
            oldPassword: oldHash.hashPW,
            newPassword: newHash.hashPW,
            salt,
          }
        );
        if (updateAttempt.status === 200) {
          isOpen = false;
          goto("/login");
        }
      }
    } catch (reason) {
      console.error(reason);
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
  <button type="submit">Update</button>
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
