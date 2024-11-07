<script lang="ts">
  import { axiosInstance } from "$lib/interceptors/axios";
  import {
    base64ToUint8Array,
    decryptPrivateKey,
    decryptSymmetricKeyWithPrivateKey,
    encryptData,
    hashMasterPassword,
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

    if (
      password.length == 0 &&
      repeat.length == 0 &&
      website.length == 0 &&
      email.length == 0
    ) {
      error = "Please fill out all details";
      return;
    }

    const allIVFieldsFilled =
      password.trim().length !== 0 &&
      repeat.trim().length !== 0 &&
      website.trim().length !== 0;

    const username = (await axiosInstance.get("/auth/account/user")).data;

    const salt = await getSalt(username);
    const { hashPW } = await hashMasterPassword(username, masterPassword, salt);
    axiosInstance
      .post("/auth/account/user/encryptionKey", { hash: hashPW })
      .then((response) => {
        if (response.status === 200) {
          const { encryptionKey, privateKeyMaster, iv } = response.data;
          decryptPrivateKey(privateKeyMaster, masterPassword, salt, iv)
            .then((decryptedPrivateKey) => {
              decryptSymmetricKeyWithPrivateKey(
                encryptionKey,
                decryptedPrivateKey,
              ).then(async (symmetricKey) => {
                const enc_website = await encryptData(
                  website,
                  symmetricKey,
                  allIVFieldsFilled ? iv : null,
                );
                encryptData(
                  password,
                  symmetricKey,
                  base64ToUint8Array(enc_website.iv),
                ).then((value) => {
                  if (!value) error = "The master password is incorrect";
                  else {
                    axiosInstance
                      .patch("/vault", {
                        id: passwordID,
                        website: enc_website.encryptedData,
                        email,
                        password: value.encryptedData,
                        iv: allIVFieldsFilled ? enc_website.iv : "",
                      })
                      .then((res) => {
                        if (res.status === 200) {
                          isOpen = false;
                          const targetIndex = data.findIndex(
                            (passwordValue) => {
                              return passwordValue.passwordID === passwordID;
                            },
                          );

                          data[targetIndex] = {
                            email:
                              email.length !== 0
                                ? email
                                : data[targetIndex].email,
                            iv: allIVFieldsFilled ? enc_website.iv : "",
                            password: value.encryptedData
                              ? value.encryptedData
                              : data[targetIndex].password,
                            websiteURL:
                              website.length !== 0
                                ? website
                                : data[targetIndex].websiteURL,
                            passwordID,
                          };
                          data = [...data];
                        }
                      });
                  }
                });
              });
            })

            .catch(() => (error = "The master password is incorrect"));
        }
      });
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
