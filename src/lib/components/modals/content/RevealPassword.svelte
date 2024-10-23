<script lang="ts">
  import { axiosInstance } from "$lib/interceptors/axios";
  import {
    decryptPassword,
    decryptPrivateKey,
    decryptSymmetricKeyWithPrivateKey,
    hashMasterPassword,
  } from "$lib/key";
  import { getSalt } from "$lib/session";

  export let data;
  export let passwordIV;

  let password = "";
  let revealed = "N/A";
  let error = false;
  let tooltipVisible = false;
  let tooltipTimeout: number;

  const handleSubmit = async () => {
    error = false;

    const email = (await axiosInstance.get("/auth/account/user")).data;
    const salt = await getSalt(email);
    const { hashPW } = await hashMasterPassword(email, password, salt);
    axiosInstance
      .post("/auth/account/user/encryptionKey", { hash: hashPW })
      .then((response) => {
        if (response.status === 200) {
          const { encryptionKey, privateKeyMaster, iv } = response.data;
          decryptPrivateKey(privateKeyMaster, password, salt, iv)
            .then((decryptedPrivateKey) => {
              decryptSymmetricKeyWithPrivateKey(
                encryptionKey,
                decryptedPrivateKey
              ).then((symmetricKey) => {
                decryptPassword(data, passwordIV, symmetricKey).then(
                  (value) => {
                    if (!value) error = true;
                    else {
                      revealed = value;
                    }
                  }
                );
              });
            })

            .catch(() => (error = true));
        }
      });
  };

  const copy = () => {
    navigator.clipboard.writeText(revealed).then(() => {
      tooltipVisible = true;
      // Hide tooltip after 2 seconds
      clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(() => {
        tooltipVisible = false;
      }, 2000);
    });
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h2 class="title">Password to reveal: {data}</h2>
  <div class="reveal-box">
    <input type="password" id="password" bind:value={password} required />
    <label for="password">Enter Master Password</label>
    <button type="submit"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        ><path
          fill="white"
          d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m0 12H6V10h12z"
        /></svg
      ></button
    >
  </div>
</form>

{#if revealed !== "N/A"}
  <h2 id="revealed">
    Revealed Password:
    <span class="reveal-pw">{revealed}</span>
  </h2>
  <div class="tooltip">
    <span class="tooltipText{tooltipVisible ? ' visible' : ''}"
      >Text copied!</span
    >
    <button class="copy" on:click={copy}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        ><path
          fill="white"
          d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
        /></svg
      ></button
    >
  </div>
{/if}

{#if error}
  <p>Please enter the correct master password.</p>
{/if}

<style>
  h2,
  p {
    word-wrap: break-word;
    text-align: center;
  }

  #revealed {
    font-style: normal;
  }
  .reveal-pw {
    font-style: italic;
  }
  .title {
    margin-bottom: 40px;
  }

  p {
    color: red;
  }

  .reveal-box {
    /* width: 330px; */
    /* margin: 30px 0px; */
    position: relative;
    border-bottom: 2px solid white;
  }

  .reveal-box input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: white;
    padding: 0 0 0 5px;
  }

  .reveal-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    color: white;
    pointer-events: none;
    transition: 0.5s;
  }

  .reveal-box input:focus ~ label,
  .reveal-box input:valid ~ label {
    top: -5px;
  }

  .reveal-box button {
    position: absolute;
    right: 8px;
    top: 0.8em;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .reveal-box button svg {
    font-size: 2em;
  }

  .tooltip {
    position: relative;
    margin-top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
  }

  .tooltip .copy {
    background: transparent;
    border: none;
    outline: none;
    font-size: 2em;
    cursor: pointer;
  }

  .tooltipText {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid white;
    padding: 10px 15px;
    border-radius: 20px;
    white-space: nowrap;
    background-color: black;
    opacity: 0;
    transition: opacity 0.5s ease;
    visibility: hidden;
  }
  .tooltipText::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    border: 15px solid;
    border-color: #000 #0000 #0000 #0000;
  }

  .tooltipText.visible {
    top: -130%;
    visibility: visible;
    opacity: 1;
  }
</style>
