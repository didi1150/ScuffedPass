<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import InputBox from "$lib/components/InputBox.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { encryptData, hashMasterPassword } from "$lib/key";
  import { getSalt } from "$lib/session";
  export let isOpen = false;
  let error = false;

  const handleSubmit = async () => {
    const email = (await axiosInstance.get("/auth/account/user")).data;
    const { hashPW } = await hashMasterPassword(email, masterPassword);
    axiosInstance
      .post("/auth/account/user/password-check", {
        masterPassword: hashPW,
      })
      .then((response) => {
        if (response.status === 200) {
          encryptData(masterPassword, getSalt(), password).then((value) => {
            if (value === "ERROR") error = true;
            else {
              axiosInstance
                .post("/vault", {
                  website,
                  email,
                  password: value.encryptedData,
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
        }
      })
      .catch(() => (error = true));
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
    font-size: 1em;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    width: 200px;
    font-weight: 700;
  }
</style>
