<script lang="ts">
  import { invalidateAll, goto } from "$app/navigation";
  import { axiosInstance } from "$lib/interceptors/axios";
  import { hashMasterPassword } from "$lib/key";

  let error = false;
  let success = false;
  let email = "",
    password = "";
  $: handleSubmit = async () => {
    error = false;
    const { hashPW, salt } = await hashMasterPassword(email, password);
    axiosInstance
      .post("auth/account/register", {
        email,
        password: hashPW,
        salt,
      })
      .then(() => {
        success = true;
      })
      .catch((reason) => {
        // console.error(reason);
        invalidateAll().then(() => (error = true));
      });
  };
</script>

<div class="background">
  <div class="register-box">
    <form on:submit|preventDefault={handleSubmit}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
      <p class="login-link">
        Already have an account? <a href="login">Login</a>
      </p>
      {#if error}
        <p class="error">Please try again</p>
      {/if}
      {#if success}
        <p class="success">Check your email for a confirmation link</p>
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

  .register-box {
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

  .login-link {
    font-size: 0.9em;
    color: white;
    text-align: center;
    margin: 25px 0 10px;
  }

  .login-link a {
    color: white;
    text-decoration: none;
    font-weight: 600;
  }

  .error {
    font-size: 0.9em;
    color: red;
    text-align: center;
  }

  .success {
    color: lime;
    text-align: center;
  }

  .login-link a:hover {
    text-decoration: underline;
  }

  @media (max-width: 360px) {
    .register-box {
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
