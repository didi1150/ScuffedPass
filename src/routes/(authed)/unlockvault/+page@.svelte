<script lang="ts">
  import { goto } from "$app/navigation";
  import InputBox from "$lib/components/InputBox.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import {
    decryptPrivateKey,
    decryptSymmetricKeyWithPrivateKey,
    hashMasterPassword,
  } from "$lib/key";
  import {
    getSalt,
    getSymmetricKey,
    setRefreshToken,
    setSalt,
    setSymmetricKey,
    setToken,
  } from "$lib/session";
  import { onMount } from "svelte";

  onMount(() => {
    if (getSymmetricKey()) goto("/");
  });

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
    await goto("/");
  };

  const handleLogout = async () => {
    await axiosInstance.post("/auth/account/logout");

    setSalt("");
    setToken("");
    setRefreshToken("");

    axiosInstance.defaults.headers.common["Authorization"] = "";

    await goto("/login");
  };
  let password = "";
</script>

<div class="frame">
  <h2>Your vault is locked.</h2>
  <form method="post" on:submit|preventDefault={handleSubmit}>
    <InputBox
      id="password"
      label="Enter master password"
      type="password"
      bind:value={password}
      required
    ></InputBox>
    <div class="control">
      <button class="submit" on:submit={handleSubmit}>Unlock</button>
      <button class="logout" on:click={handleLogout}>Logout</button>
    </div>
  </form>
</div>

<style>
  .frame {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h2 {
    color: white;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 200px;
    border: 2px solid white;
    padding: 10px;
    border-radius: 10px;
  }
  button {
    cursor: pointer;
    font-size: 1.5em;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    width: 200px;
    font-weight: 700;
    margin: 0 15px 20px 0;
  }

  .control {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .submit {
    background-color: lime;
  }
  .logout {
    background-color: red;
  }

  @media (max-width: 630px) {
    form {
      width: 300px;
      height: fit-content;
    }
  }

  @media (max-width: 330px) {
    form {
      border: none;
      width: 270px;
      height: fit-content;
    }
  }
</style>
