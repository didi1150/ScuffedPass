<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { encryptData, hashMasterPassword } from "$lib/key";
  import { getSalt } from "$lib/session";
  import InputBox from "$lib/components/InputBox.svelte";

  export let passwordID: number;
  export let isOpen: boolean;
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
      isOpen = false;
    }

    const username = (await axiosInstance.get("/auth/account/user")).data;
    const { hashPW } = await hashMasterPassword(username, masterPassword);
    axiosInstance
      .post("/auth/account/user/password-check", {
        masterPassword: hashPW,
      })
      .then((response) => {
        if (response.status === 200) {
          encryptData(masterPassword, getSalt(), password).then((value) => {
            if (value === "ERROR")
              error = "Something went wrong. Please try again later";
            else {
              axiosInstance
                .patch("vault", {
                  id: passwordID,
                  iv: value.iv,
                  password: value.encryptedData,
                  website,
                  email,
                })
                .then((response) => {
                  if (response.status === 200) {
                    isOpen = false;
                  }
                })
                .finally(() => invalidateAll());
            }
          });
        }
      })
      .catch(() => {
        error = "The master password is incorrect.";
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
