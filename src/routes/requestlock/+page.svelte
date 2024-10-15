<script lang="ts">
  import { axiosInstance } from "$lib/interceptors/axios.js";

  export let data;

  let email = "";
  let success = true;
  const handleSubmit = async () => {
    const result = await axiosInstance.get(
      `/auth/account/requestlock?email=${email}`
    );
    if (result.status === 200) {
      success = true;
    } else {
      success = false;
    }
  };
</script>

<div class="background">
  <div class="lock-box">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="input-box">
        <input
          type="text"
          name="email"
          id="email"
          bind:value={email}
          required
        />
        <label for="password">Enter your email</label>
      </div>
      <button type="submit">Get the link</button>

      {#if !success}
        <p>User does not exist</p>
      {:else}
        <p>Check your email</p>
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

  .lock-box {
    position: relative;
    width: 400px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
  }

  p {
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
    .lock-box {
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
