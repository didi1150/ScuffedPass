<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import InputBox from "$lib/components/InputBox.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import {
    decryptPrivateKey,
    decryptSymmetricKeyWithPrivateKey,
    hashMasterPassword,
  } from "$lib/key";
  import {
    getSalt,
    setRefreshToken,
    setSalt,
    setSymmetricKey,
    setToken,
  } from "$lib/session";

  export let isOpen = false;

  const handleSubmit = async () => {
    const email = (await axiosInstance.get("/auth/account/user")).data;
    const pwSalt = await getSalt(email);
    const { hashPW } = await hashMasterPassword(email, password, pwSalt);
    const axiosResponse = await axiosInstance.post(
      "/auth/account/user/encryptionKey",
      { hash: hashPW }
    );

    const { encryptionKey, privateKeyMaster, iv, salt } = axiosResponse.data;
    const decryptedPrivateKey = await decryptPrivateKey(
      privateKeyMaster,
      password,
      salt,
      iv
    );
    const symmKey = await decryptSymmetricKeyWithPrivateKey(
      encryptionKey,
      decryptedPrivateKey
    );
    setSymmetricKey(symmKey);
    invalidateAll();
  };

  const handleLogout = async () => {
    isOpen = false;
    await axiosInstance.post("/auth/account/logout");

    setSalt("");
    setToken("");
    setRefreshToken("");

    axiosInstance.defaults.headers.common["Authorization"] = "";

    await goto("/login");
  };
  let password = "";
</script>

<form method="post" on:submit|preventDefault={handleSubmit}>
  <h2>Your vault is locked.</h2>
  <InputBox
    id="password"
    label="Enter master password to unlock"
    type="password"
    bind:value={password}
    required
  ></InputBox>
  <div class="control">
    <button class="submit" on:submit={handleSubmit}>Unlock</button>
    <button class="logout" on:click={handleLogout}>Logout</button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    cursor: pointer;
    font-size: 1.5em;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    width: 200px;
    font-weight: 700;
    margin: 0 15px;
  }

  .control {
    display: flex;
  }

  .submit {
    background-color: lime;
  }
  .logout {
    background-color: red;
  }
</style>
