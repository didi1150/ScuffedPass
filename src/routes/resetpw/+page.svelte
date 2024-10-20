<script lang="ts">
  import InputBox from "$lib/components/InputBox.svelte";
  import RecoveryKey from "$lib/components/modals/content/RecoveryKey.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import { axiosInstance } from "$lib/interceptors/axios.js";
  import {
    decryptPrivateKeyWithRecoveryKey,
    encryptPrivateKey,
    generateRecoveryKey,
    hashMasterPassword,
  } from "$lib/key";
  import { onMount } from "svelte";

  let email = "";
  let token = "";
  let password = "";
  let confirmPassword = "";
  let recoveryKey = "";
  let status: "pending" | "success" | "fail" = "pending";
  let isResetFlow = false;
  let newRecoveryKey = "";

  let isOpen = false;

  // Check if token and email are present in the URL search parameters
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    email = params.get("email") || "";
    token = params.get("token") || "";

    if (email && token) {
      isResetFlow = true;
    }
  });

  // Function to handle requesting a password reset link
  const handleRequestReset = async () => {
    const result = await axiosInstance.get(
      `/auth/account/resetpw?email=${email}`
    );
    if (result.status === 200) {
      status = "success";
    } else {
      status = "fail";
    }
  };

  // Function to handle password reset submission
  const handlePasswordReset = async () => {
    if (password !== confirmPassword || recoveryKey.length === 0) {
      status = "fail";
      return;
    }
    try {
      const result = await axiosInstance.post("/auth/account/requestrecovery", {
        email,
        token,
        password,
      });

      if (result.status === 200) {
        const { privateKeyRecovery, iv, salt } = result.data;
        const privateKey = await decryptPrivateKeyWithRecoveryKey(
          privateKeyRecovery,
          recoveryKey,
          salt,
          iv
        );
        const newRecoveryKey = generateRecoveryKey();
        const hash = await hashMasterPassword(email, password);
        const encryptionBundle = await encryptPrivateKey(
          privateKey,
          password,
          newRecoveryKey,
          hash.salt
        );
        if (!encryptionBundle) {
          status = "fail";
          return;
        }
        const updateAttempt = await axiosInstance.patch(
          "/auth/account/updatepw",
          {
            iv: encryptionBundle.iv,
            privateKeyMaster: encryptionBundle.masterEncryptedPrivateKey,
            privateKeyRecovery: encryptionBundle.recoveryEncryptedPrivateKey,
            password: hash.hashPW,
            salt: hash.salt,
            token,
          }
        );

        if (updateAttempt.status === 200) {
          status = "success";
          isOpen = true;
        }
      } else {
        status = "fail";
      }
    } catch (error) {
      status = "fail";
    }
  };
</script>

<Modal bind:isOpen>
  <RecoveryKey recoveryKey={newRecoveryKey} bind:isOpen></RecoveryKey>
</Modal>

<div class="background">
  <div class="reset-box">
    {#if !isResetFlow}
      <!-- Request Reset Email View -->
      <form on:submit|preventDefault={handleRequestReset}>
        <InputBox
          type="text"
          id="email"
          bind:value={email}
          required
          label="Enter your email"
        ></InputBox>
        <button type="submit">Get the link</button>

        {#if status === "fail"}
          <p>User does not exist</p>
        {:else if status === "success"}
          <p>Check your email</p>
        {/if}
      </form>
    {:else}
      <!-- Password Reset Form (Triggered by URL with token and email) -->
      <form on:submit|preventDefault={handlePasswordReset}>
        <InputBox
          id="recoveryKey"
          label="Enter your recovery key"
          type="text"
          bind:value={recoveryKey}
        ></InputBox>
        <InputBox
          id="password"
          label="Enter new password"
          type="password"
          bind:value={password}
        ></InputBox>
        <InputBox
          id="confirmPassword"
          label="Confirm new password"
          type="password"
          bind:value={confirmPassword}
        ></InputBox>
        <button type="submit">Reset Password</button>

        {#if status === "fail"}
          <p>Passwords do not match or reset failed</p>
        {:else if status === "success"}
          <p>Password reset successful</p>
        {/if}
      </form>
    {/if}
  </div>
</div>

<style>
  .background {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .reset-box {
    position: relative;
    width: 400px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    padding: 20px;
    flex-direction: column;
  }

  p {
    color: white;
    text-align: center;
  }

  .input-box {
    position: relative;
    width: 330px;
    margin: 20px 0;
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
    height: 40px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: white;
    padding: 0 0 0 5px;
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

  @media (max-width: 360px) {
    .reset-box {
      width: 100%;
      height: 100vh;
      border: none;
      border-radius: 0;
    }
    .input-box {
      width: 280px;
    }
  }
</style>
