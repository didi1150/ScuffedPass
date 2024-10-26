<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import RecoveryKey from "$lib/components/modals/content/RecoveryKey.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import { axiosInstance } from "$lib/interceptors/axios";
  import {
    decryptPrivateKey,
    decryptSymmetricKeyWithPrivateKey,
    encryptPrivateKey,
    encryptPrivateKeyWithRecoverKey,
    encryptSymmetricKeyWithPublicKey,
    generateIV,
    generateKeyPair,
    generateRecoveryKey,
    generateSymmetricKey,
    hashMasterPassword,
    uint8ArrayToBase64,
  } from "$lib/key";
  import { getSalt, refreshToken, setSymmetricKey, token } from "$lib/session";
  let email = "",
    password = "";

  let error = false;
  let recoveryKey = "";
  let isOpen = false;

  $: handleSubmit = async () => {
    error = false;
    const salt = await getSalt(email);
    const { hashPW } = await hashMasterPassword(email, password, salt);
    axiosInstance
      .post("auth/account/authenticate", {
        email,
        password: hashPW,
      })
      .then(async (res) => {
        try {
          if (res.status === 200) {
            token.set(res.data.access_token);
            refreshToken.set(res.data.refresh_token);
            if (res.data.first_login) {
              const { publicKey, privateKey } = await generateKeyPair();
              const localRecoveryKey = generateRecoveryKey();
              const symmKey = await generateSymmetricKey();
              setSymmetricKey(symmKey);
              const encryptedSymmetricKey =
                await encryptSymmetricKeyWithPublicKey(symmKey, publicKey);
              const iv = generateIV();
              const masterKey = await encryptPrivateKey(
                privateKey,
                password,
                salt,
                iv
              );

              const recoveryEncKey = await encryptPrivateKeyWithRecoverKey(
                privateKey,
                localRecoveryKey,
                salt,
                iv
              );
              if (!masterKey || !recoveryEncKey)
                throw Error("Couldn't encrypt private key");
              else {
                const cryptoAttempt = await axiosInstance.post(
                  "/auth/account/user/crypto",
                  {
                    publicKey,
                    privateKeyMaster: masterKey,
                    privateKeyRecovery: recoveryEncKey,
                    iv: uint8ArrayToBase64(iv),
                    symmetricKey: encryptedSymmetricKey,
                  }
                );
                if (cryptoAttempt.status === 200) {
                  recoveryKey = localRecoveryKey;
                  isOpen = true;
                }
              }
            } else {
              const cryptoResponse = await axiosInstance.post(
                "/auth/account/user/encryptionKey",
                { hash: hashPW }
              );
              const { encryptionKey, privateKeyMaster, iv, salt } =
                cryptoResponse.data;
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
            }
            await goto("/");
          } else {
            invalidateAll().then(() => (error = true));
          }
        } catch (error) {
          invalidateAll().then(() => (error = true));
        }
      })
      .catch((reason) => {
        // console.error(reason);
        invalidateAll().then(() => (error = true));
      });
  };
</script>

<Modal bind:isOpen>
  <RecoveryKey bind:recoveryKey bind:isOpen></RecoveryKey>
</Modal>

<div class="background">
  <div class="login-box">
    <form on:submit|preventDefault={handleSubmit}>
      <h2>Login</h2>
      <div class="input-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          ><path
            fill="white"
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"
          /></svg
        >
        <input
          type="text"
          name="email"
          id="email"
          bind:value={email}
          required
        />
        <label for="email">Email</label>
      </div>
      <div class="input-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          ><path
            fill="white"
            d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"
          /></svg
        >
        <input
          type="password"
          name="password"
          id="password"
          bind:value={password}
          required
        />
        <label for="password">Password</label>
      </div>
      <button type="submit">Login</button>

      <p class="register-link">
        Don't have an account? <a href="register">Register</a>
      </p>
      <div class="advanced">
        <a class="lock" href="/requestlock">Lock account</a>
        <a class="forgot" href="/resetpw">Forgot Password?</a>
      </div>
      {#if error}
        <p class="error">Please try again</p>
      {/if}
    </form>
  </div>
</div>

<style>
  .background {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .login-box {
    position: relative;
    width: 400px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
  }

  h2 {
    font-size: 2em;
    color: white;
    text-align: center;
  }

  .input-box {
    position: relative;
    width: 330px;
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
    width: 85%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: white;
    padding: 0 0 0 5px;
  }
  .input-box svg {
    position: absolute;
    right: 8px;
    bottom: 0.8em;
    color: white;
    font-size: 1.2em;
    line-height: 57px;
  }

  button {
    width: 100%;
    height: 40px;
    background: white;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1em;
    font-weight: 500;
  }

  .register-link {
    font-size: 0.9em;
    color: white;
    text-align: center;
    margin: 25px 0 10px;
  }
  .error {
    font-size: 0.9em;
    color: red;
    text-align: center;
  }

  .advanced {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .advanced a {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }

  .register-link a {
    color: white;
    text-decoration: none;
    font-weight: 600;
  }

  .register-link a:hover {
    text-decoration: underline;
  }

  @media (max-width: 360px) {
    .login-box {
      width: 100%;
      height: 100vh;
      border: none;
      border-radius: 0;
    }
    .input-box {
      width: 280px;
    }
    .advanced {
      flex-direction: column;
      align-items: center;
    }

    .advanced a {
      margin-bottom: 6px;
    }
  }
</style>
