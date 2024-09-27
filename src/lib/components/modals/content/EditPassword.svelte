<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidate, invalidateAll } from "$app/navigation";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { decryptData, encryptData } from "$lib/key";
  import { getSalt } from "$lib/session";

  export let passwordID: number;
  export let isOpen: boolean;

  let password = "",
    repeat = "",
    masterPassword = "";

  let error = "";

  const handleSubmit = () => {
    if (
      password.length === 0 ||
      repeat.length === 0 ||
      masterPassword.length === 0
    ) {
      error = "Please fill in all fields";
      return;
    }

    if (password !== repeat) {
      error = "Please confirm the password you are trying to use";
      return;
    }

    axiosInstance
      .get("/password-check", {
        data: masterPassword,
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
  <div class="input-box">
    <input id="password" type="password" required bind:value={password} /><label
      for="password">Enter New Password</label
    >
  </div>
  <div class="input-box">
    <input id="repeat" type="password" required bind:value={repeat} /><label
      for="repeat">Enter Password again to confirm</label
    >
  </div>
  <div class="input-box">
    <input
      id="master"
      type="password"
      required
      bind:value={masterPassword}
    /><label for="master">Enter Master Password</label>
  </div>
  <button type="submit">Edit</button>
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
  .input-box {
    position: relative;
    width: calc(100% - 40px);
    margin: 30px 0px;
    border-bottom: 2px solid white;
  }

  .input-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    color: white;
    pointer-events: none;
    transition: 0.5s;
  }

  .input-box input:focus ~ label,
  .input-box input:valid ~ label {
    top: -5px;
  }

  .input-box input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: white;
    padding: 0 0 0 5px;
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
