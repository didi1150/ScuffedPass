<script lang="ts">
  import { axiosInstance } from "$lib/interceptors/axios";
  import {
    base64ToUint8Array,
    decryptPrivateKey,
    decryptSymmetricKeyWithPrivateKey,
    encryptData,
    hashMasterPassword,
    isStringEmpty,
  } from "$lib/key";
  import InputBox from "$lib/components/InputBox.svelte";
  import { getSalt } from "$lib/session";

  export let passwordID: number;
  export let isOpen: boolean;
  export let data: Password[];
  let website: string = "";
  let email: string = "";
  let password: string = "";
  let repeat: string = "";
  let masterPassword: string = "";

  let error: string = "";

  const handleSubmit = async () => {
    if (masterPassword.length === 0) {
      error = "Please fill in the master password";
      return;
    }

    if (password !== repeat) {
      error = "Please confirm the password you are trying to use";
      return;
    }
    const passwordEmpty = isStringEmpty(password);
    const repeatEmpty = isStringEmpty(repeat);
    const websiteEmpty = isStringEmpty(website);
    const emailEmpty = isStringEmpty(email);
    if (passwordEmpty && repeatEmpty && websiteEmpty && emailEmpty) {
      error = "Please fill out all details";
      return;
    }
    try {
      const username = (await axiosInstance.get("/auth/account/user")).data;

      const salt = await getSalt(username);
      const { hashPW } = await hashMasterPassword(
        username,
        masterPassword,
        salt
      );

      const { encryptionKey, privateKeyMaster, iv } = (
        await axiosInstance.post("/auth/account/user/encryptionKey", {
          hash: hashPW,
        })
      ).data;
      const decryptedPrivateKey = await decryptPrivateKey(
        privateKeyMaster,
        masterPassword,
        salt,
        iv
      );
      const password_iv = (await axiosInstance.get(`/vault/${passwordID}`))
        .data;
      const symmetricKey = await decryptSymmetricKeyWithPrivateKey(
        encryptionKey,
        decryptedPrivateKey
      );
      const enc_website = await encryptData(
        website,
        symmetricKey,
        base64ToUint8Array(password_iv)
      );
      const value = await encryptData(
        password,
        symmetricKey,
        base64ToUint8Array(password_iv)
      );
      if (!value) error = "The master password is incorrect";
      else {
        const res = await axiosInstance.patch("/vault", {
          id: passwordID,
          website: websiteEmpty ? "" : enc_website.encryptedData,
          email: emailEmpty ? "" : email,
          password: passwordEmpty ? "" : value.encryptedData,
        });
        if (res.status === 200) {
          isOpen = false;
          const targetIndex = data.findIndex((passwordValue) => {
            return passwordValue.passwordID === passwordID;
          });

          data[targetIndex] = {
            email: !emailEmpty ? email : data[targetIndex].email,
            iv: password_iv,
            password: !passwordEmpty
              ? value.encryptedData
              : data[targetIndex].password,
            websiteURL: !websiteEmpty ? website : data[targetIndex].websiteURL,
            passwordID,
          };
          data = [...data];
          return;
        }
      }
    } catch (reason) {
      error = "Invalid Master Password";
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h2>Edit Password</h2>
  <div class="hint">
    <span>Hint: Leave fields empty if you don't want to change their value</span
    >
  </div>
  <InputBox
    id="website"
    type="text"
    label="Change your website (Optional)"
    bind:value={website}
  />
  <InputBox
    id="email"
    type="text"
    label="Change your email (Optional)"
    bind:value={email}
  />
  <InputBox
    id="password"
    type="password"
    label="Enter New Password"
    bind:value={password}
  />
  <InputBox
    id="repeat"
    type="password"
    label="Enter Password again to confirm"
    bind:value={repeat}
  />
  <InputBox
    id="master"
    type="password"
    label="Enter Master Password"
    bind:value={masterPassword}
    required={true}
  />
  <button type="submit">Edit</button>
  {#if error.length != 0}
    <p class="error">{error}</p>
  {/if}
</form>

<style>
  .hint {
    position: relative;
    width: calc(100% - 40px);
    color: grey;
    text-align: center;
  }
  .error {
    color: red;
    font-weight: bold;
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
    font-size: 1.5em;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    width: 200px;
    font-weight: 700;
  }
</style>
