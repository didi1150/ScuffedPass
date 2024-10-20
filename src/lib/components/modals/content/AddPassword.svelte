<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import InputBox from "$lib/components/InputBox.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import {
    decryptPrivateKey,
    decryptSymmetricKeyWithPrivateKey,
    encryptPassword,
    hashMasterPassword,
  } from "$lib/key";
  export let isOpen = false;
  let error = false;

  const handleSubmit = async () => {
    const email = (await axiosInstance.get("/auth/account/user")).data;
    const { hashPW, salt } = await hashMasterPassword(email, masterPassword);
    axiosInstance
      .post("/auth/account/user/encryptionKey", { hash: hashPW })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const { encryptionKey, privateKeyMaster, iv } = response.data;
          decryptPrivateKey(privateKeyMaster, masterPassword, salt, iv)
            .then((decryptedPrivateKey) => {
              decryptSymmetricKeyWithPrivateKey(
                encryptionKey,
                decryptedPrivateKey
              ).then((symmetricKey) => {
                encryptPassword(password, symmetricKey).then((value) => {
                  if (!value) error = true;
                  else {
                    axiosInstance
                      .post("/vault", {
                        website,
                        email,
                        password: value.encryptedPassword,
                        iv: value.iv,
                      })
                      .then((res) => {
                        if (res.status === 200) {
                          isOpen = false;
                          invalidateAll();
                        }
                      });
                  }
                });
              });
            })

            .catch((reason) => {
              console.error(reason);
              error = true;
            });
        }
      });
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
    <p class="error">Oops, something went wrong</p>
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
