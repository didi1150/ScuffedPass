<script lang="ts">
  import InputBox from "$lib/components/InputBox.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import {
    base64ToUint8Array,
    decryptPrivateKey,
    decryptSymmetricKeyWithPrivateKey,
    encryptData,
    hashMasterPassword,
  } from "$lib/key";
  import { getSalt } from "$lib/session";
  export let isOpen = false;
  let error = false;

  export let data: Password[] = [];

  const handleSubmit = async () => {
    const username = (await axiosInstance.get("/auth/account/user")).data;
    const salt = await getSalt(username);
    const { hashPW } = await hashMasterPassword(username, masterPassword, salt);
    try {
      const response = await axiosInstance.post(
        "/auth/account/user/encryptionKey",
        { hash: hashPW }
      );
      if (response.status === 200) {
        const { encryptionKey, privateKeyMaster, iv } = response.data;
        const decryptedPrivateKey = await decryptPrivateKey(
          privateKeyMaster,
          masterPassword,
          salt,
          iv
        );
        const symmetricKey = await decryptSymmetricKeyWithPrivateKey(
          encryptionKey,
          decryptedPrivateKey
        );
        const enc_website = await encryptData(website, symmetricKey);
        const value = await encryptData(
          password,
          symmetricKey,
          base64ToUint8Array(enc_website.iv)
        );
        if (!value) error = true;
        else {
          const res = await axiosInstance.post("/vault", {
            website: enc_website.encryptedData,
            email,
            password: value.encryptedData,
            iv: enc_website.iv,
          });
          if (res.status === 200) {
            isOpen = false;
            data.push({
              email: email,
              websiteURL: website,
              iv: enc_website.iv,
              password: value.encryptedData,
              passwordID: res.data.passwordID,
            });
            data = [...data];
          }
        }
      }
    } catch {
      error = true;
    }
  };

  let email = "",
    password = "",
    website = "",
    masterPassword = "";
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h2>Add Password</h2>
  <InputBox
    bind:value={website}
    id="website"
    label="Enter a Website"
    required={true}
  ></InputBox>
  <InputBox bind:value={email} id="email" label="Enter an Email" required={true}
  ></InputBox>
  <InputBox
    bind:value={password}
    id="password"
    label="Enter a Password"
    required={true}
    type="password"
  ></InputBox>
  <InputBox
    bind:value={masterPassword}
    id="masterPassword"
    label="Enter your Master Password"
    required={true}
    type="password"
  ></InputBox>
  <button type="submit">Save</button>
  {#if error}
    <p class="error">Wrong Credentials</p>
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
    font-size: 1.5em;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    width: 200px;
    font-weight: 700;
  }
</style>
