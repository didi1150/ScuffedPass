<script lang="ts">
  import {
    base64ToUint8Array,
    decryptPrivateKey,
    encryptPrivateKey,
    hashMasterPassword,
  } from "$lib/key";
  import InputBox from "$lib/components/InputBox.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { getSalt } from "$lib/session";

  export let isOpen: boolean;
  export let username = "";
  let currentMasterPassword = "";
  let newMasterPassword = "";

  let error: string = "";

  const handleSubmit = async () => {
    username = (await axiosInstance.get("/auth/account/user")).data;
    const salt = await getSalt(username);
    const hash = await hashMasterPassword(
      username,
      currentMasterPassword,
      salt
    );
    try {
      const response = await axiosInstance.post(
        "/auth/account/user/encryptionKey",
        {
          hash: hash.hashPW,
        }
      );
      if (response.status === 200) {
        const { privateKeyMaster, iv, salt } = response.data;
        const decryptedPrivateKey = await decryptPrivateKey(
          privateKeyMaster,
          currentMasterPassword,
          salt,
          iv
        );
        const { hashPW } = await hashMasterPassword(
          username,
          newMasterPassword
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
            oldPassword: hash.hashPW,
            newPassword: hashPW,
            salt,
          }
        );
        if (updateAttempt.status === 200) {
          isOpen = false;
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
