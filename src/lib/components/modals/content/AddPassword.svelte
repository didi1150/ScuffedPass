<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { encryptData } from "$lib/key";
  import { getSalt } from "$lib/session";
  import { get } from "svelte/store";
  export let isOpen = false;
  let error = false;

  const handleSubmit = () => {
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
  };
  let email = "",
    password = "",
    website = "",
    masterPassword = "";
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h2>Add Password</h2>
  <div class="input-box">
    <input
      type="text"
      name="website"
      id="website"
      bind:value={website}
      required
    />
    <label for="website">Website</label>
  </div>
  <div class="input-box">
    <input
      type="text"
      name="email"
      id="email"
      bind:value={email}
      required
    /><label for="email">Email</label>
  </div>

  <div class="input-box">
    <input
      type="password"
      name="password"
      id="password"
      bind:value={password}
      required
    /><label for="password">Password</label>
  </div>
  <div class="input-box">
    <input
      type="password"
      name="masterPassword"
      id="masterPassword"
      bind:value={masterPassword}
      required
    /><label for="masterPassword">Master Password</label>
  </div>
  <button type="submit">Save</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input:-webkit-autofill {
    background-color: transparent !important; /* Removes background */
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important; /* Set background color */
    box-shadow: 0 0 0px 1000px transparent inset !important; /* Backup for other browsers */
    color: inherit !important; /* Ensure text color remains the same */
  }

  input:-moz-autofill {
    background-color: transparent !important; /* Removes background */
    box-shadow: 0 0 0px 1000px transparent inset !important; /* Set background color */
    color: inherit !important; /* Ensure text color remains the same */
  }

  /* Optional: reset border and text color */
  input:-webkit-autofill,
  input:-moz-autofill {
    border: 1px solid transparent !important; /* Reset border if autofill changes it */
    -webkit-text-fill-color: inherit !important; /* Ensure text color remains */
  }

  .input-box {
    position: relative;
    width: 100%;
    margin: 25px 0px;
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
