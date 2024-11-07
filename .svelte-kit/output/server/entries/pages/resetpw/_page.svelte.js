import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { I as InputBox } from "../../../chunks/InputBox.js";
import { R as RecoveryKey } from "../../../chunks/RecoveryKey.js";
import { M as Modal } from "../../../chunks/Modal.js";
import "../../../chunks/session.js";
import "bcryptjs";
const css = {
  code: ".background.svelte-1uuytdt{display:flex;align-items:center;justify-content:center;height:100%}.reset-box.svelte-1uuytdt{position:relative;width:400px;height:auto;display:flex;justify-content:center;align-items:center;border-radius:20px;background:transparent;border:2px solid rgba(255, 255, 255, 0.5);backdrop-filter:blur(15px);padding:20px;flex-direction:column}p.svelte-1uuytdt{color:white;text-align:center}button.svelte-1uuytdt{width:100%;height:40px;background:white;border:none;border-radius:40px;cursor:pointer;font-size:1em;font-weight:500}@media(max-width: 360px){.reset-box.svelte-1uuytdt{width:100%;height:100vh;border:none;border-radius:0}.reset-box.svelte-1uuytdt{width:280px}}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import InputBox from \\"$lib/components/InputBox.svelte\\";\\nimport RecoveryKey from \\"$lib/components/modals/content/RecoveryKey.svelte\\";\\nimport Modal from \\"$lib/components/modals/Modal.svelte\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios.js\\";\\nimport {\\n  base64ToUint8Array,\\n  decryptPrivateKeyWithRecoveryKey,\\n  encryptPrivateKey,\\n  generateRecoveryKey,\\n  hashMasterPassword\\n} from \\"$lib/key\\";\\nimport { setSalt } from \\"$lib/session\\";\\nimport { onMount } from \\"svelte\\";\\nlet email = \\"\\";\\nlet token = \\"\\";\\nlet password = \\"\\";\\nlet confirmPassword = \\"\\";\\nlet recoveryKey = \\"\\";\\nlet status = \\"pending\\";\\nlet isResetFlow = false;\\nlet newRecoveryKey = \\"\\";\\nlet isOpen = false;\\nonMount(() => {\\n  const params = new URLSearchParams(window.location.search);\\n  email = params.get(\\"email\\") || \\"\\";\\n  token = params.get(\\"token\\") || \\"\\";\\n  setSalt(\\"\\");\\n  if (email && token) {\\n    isResetFlow = true;\\n  }\\n});\\nconst handleRequestReset = async () => {\\n  const result = await axiosInstance.get(\\n    `/auth/account/resetpw?email=${email}`\\n  );\\n  if (result.status === 200) {\\n    status = \\"success\\";\\n  } else {\\n    status = \\"fail\\";\\n  }\\n};\\nconst handlePasswordReset = async () => {\\n  if (password !== confirmPassword || recoveryKey.length === 0) {\\n    status = \\"fail\\";\\n    return;\\n  }\\n  try {\\n    const result = await axiosInstance.post(\\"/auth/account/requestrecovery\\", {\\n      email,\\n      token\\n    });\\n    if (result.status === 200) {\\n      const { privateKeyRecovery, iv, salt } = result.data;\\n      const privateKey = await decryptPrivateKeyWithRecoveryKey(\\n        privateKeyRecovery,\\n        recoveryKey,\\n        salt,\\n        iv\\n      );\\n      newRecoveryKey = generateRecoveryKey();\\n      const hash = await hashMasterPassword(email, password);\\n      const masterKey = await encryptPrivateKey(\\n        privateKey,\\n        password,\\n        hash.salt,\\n        base64ToUint8Array(iv)\\n      );\\n      const rKey = await encryptPrivateKey(\\n        privateKey,\\n        newRecoveryKey,\\n        hash.salt,\\n        base64ToUint8Array(iv)\\n      );\\n      if (!masterKey || !rKey) {\\n        status = \\"fail\\";\\n        return;\\n      }\\n      const updateAttempt = await axiosInstance.patch(\\n        \\"/auth/account/updatepw\\",\\n        {\\n          iv,\\n          privateKeyMaster: masterKey,\\n          privateKeyRecovery: rKey,\\n          password: hash.hashPW,\\n          salt: hash.salt,\\n          token\\n        }\\n      );\\n      if (updateAttempt.status === 200) {\\n        status = \\"success\\";\\n        isOpen = true;\\n      }\\n    } else {\\n      status = \\"fail\\";\\n    }\\n  } catch (error) {\\n    console.error(error);\\n    status = \\"fail\\";\\n  }\\n};\\n<\/script>\\n\\n<Modal bind:isOpen>\\n  <RecoveryKey bind:recoveryKey={newRecoveryKey} bind:isOpen></RecoveryKey>\\n</Modal>\\n\\n<div class=\\"background\\">\\n  <div class=\\"reset-box\\">\\n    {#if !isResetFlow}\\n      <!-- Request Reset Email View -->\\n      <form on:submit|preventDefault={handleRequestReset}>\\n        <h2 style=\\"text-align: center; color: white;\\">\\n          All your devices will be logged out upon your submit\\n        </h2>\\n        <InputBox\\n          type=\\"text\\"\\n          id=\\"email\\"\\n          bind:value={email}\\n          required\\n          label=\\"Enter your email\\"\\n        ></InputBox>\\n        <button type=\\"submit\\">Get the link</button>\\n\\n        {#if status === \\"fail\\"}\\n          <p>User does not exist</p>\\n        {:else if status === \\"success\\"}\\n          <p>Check your email</p>\\n        {/if}\\n      </form>\\n    {:else}\\n      <!-- Password Reset Form (Triggered by URL with token and email) -->\\n      <form on:submit|preventDefault={handlePasswordReset}>\\n        <h2 style=\\"text-align: center; color: white;\\">\\n          All your devices will be logged out upon your submit\\n        </h2>\\n        <InputBox\\n          id=\\"recoveryKey\\"\\n          label=\\"Enter your recovery key\\"\\n          type=\\"text\\"\\n          bind:value={recoveryKey}\\n        ></InputBox>\\n        <InputBox\\n          id=\\"password\\"\\n          label=\\"Enter new password\\"\\n          type=\\"password\\"\\n          bind:value={password}\\n        ></InputBox>\\n        <InputBox\\n          id=\\"confirmPassword\\"\\n          label=\\"Confirm new password\\"\\n          type=\\"password\\"\\n          bind:value={confirmPassword}\\n        ></InputBox>\\n        <button type=\\"submit\\">Reset Password</button>\\n\\n        {#if status === \\"fail\\"}\\n          <p>Passwords do not match or reset failed</p>\\n        {:else if status === \\"success\\"}\\n          <p>Password reset successful</p>\\n        {/if}\\n      </form>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n  .background {\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    height: 100%;\\n  }\\n\\n  .reset-box {\\n    position: relative;\\n    width: 400px;\\n    height: auto;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    border-radius: 20px;\\n    background: transparent;\\n    border: 2px solid rgba(255, 255, 255, 0.5);\\n    backdrop-filter: blur(15px);\\n    padding: 20px;\\n    flex-direction: column;\\n  }\\n\\n  p {\\n    color: white;\\n    text-align: center;\\n  }\\n\\n  button {\\n    width: 100%;\\n    height: 40px;\\n    background: white;\\n    border: none;\\n    border-radius: 40px;\\n    cursor: pointer;\\n    font-size: 1em;\\n    font-weight: 500;\\n  }\\n\\n  @media (max-width: 360px) {\\n    .reset-box {\\n      width: 100%;\\n      height: 100vh;\\n      border: none;\\n      border-radius: 0;\\n    }\\n    .reset-box {\\n      width: 280px;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAsKE,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,IACV,CAEA,yBAAW,CACT,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAClB,CAEA,gBAAE,CACA,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MACd,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,GACf,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,yBAAW,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,CACjB,CACA,yBAAW,CACT,KAAK,CAAE,KACT,CACF"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let newRecoveryKey = "";
  let isOpen = false;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { isOpen },
      {
        isOpen: ($$value) => {
          isOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(RecoveryKey, "RecoveryKey").$$render(
            $$result,
            { recoveryKey: newRecoveryKey, isOpen },
            {
              recoveryKey: ($$value) => {
                newRecoveryKey = $$value;
                $$settled = false;
              },
              isOpen: ($$value) => {
                isOpen = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )} <div class="background svelte-1uuytdt"><div class="reset-box svelte-1uuytdt">${` <form><h2 style="text-align: center; color: white;" data-svelte-h="svelte-1bpjcxl">All your devices will be logged out upon your submit</h2> ${validate_component(InputBox, "InputBox").$$render(
      $$result,
      {
        type: "text",
        id: "email",
        required: true,
        label: "Enter your email",
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )} <button type="submit" class="svelte-1uuytdt" data-svelte-h="svelte-xdb7ie">Get the link</button> ${`${``}`}</form>`}</div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
