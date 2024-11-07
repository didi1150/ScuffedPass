import { c as create_ssr_component, a as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/session.js";
const css = {
  code: ".background.svelte-ql0ydn.svelte-ql0ydn.svelte-ql0ydn{display:flex;align-items:center;justify-content:center;height:100%}.lock-box.svelte-ql0ydn.svelte-ql0ydn.svelte-ql0ydn{position:relative;width:400px;height:200px;display:flex;justify-content:center;align-items:center;border-radius:20px;background:transparent;border:2px solid rgba(255, 255, 255, 0.5);backdrop-filter:blur(15px)}p.svelte-ql0ydn.svelte-ql0ydn.svelte-ql0ydn{color:white;text-align:center}.input-box.svelte-ql0ydn.svelte-ql0ydn.svelte-ql0ydn{position:relative;width:330px;margin:30px 0px;border-bottom:2px solid white}.input-box.svelte-ql0ydn label.svelte-ql0ydn.svelte-ql0ydn{position:absolute;top:50%;left:5px;transform:translateY(-50%);font-size:1em;color:white;pointer-events:none;transition:0.5s}.input-box.svelte-ql0ydn input.svelte-ql0ydn:focus~label.svelte-ql0ydn,.input-box.svelte-ql0ydn input.svelte-ql0ydn:valid~label.svelte-ql0ydn{top:-5px}.input-box.svelte-ql0ydn input.svelte-ql0ydn.svelte-ql0ydn{width:85%;height:50px;background:transparent;border:none;outline:none;font-size:1em;color:white;padding:0 0 0 5px}button.svelte-ql0ydn.svelte-ql0ydn.svelte-ql0ydn{width:100%;height:40px;background:white;border:none;border-radius:40px;cursor:pointer;font-size:1em;font-weight:500}@media(max-width: 360px){.lock-box.svelte-ql0ydn.svelte-ql0ydn.svelte-ql0ydn{width:100%;height:100vh;border:none;border-radius:0}.input-box.svelte-ql0ydn.svelte-ql0ydn.svelte-ql0ydn{width:280px}}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { axiosInstance } from \\"$lib/interceptors/axios.js\\";\\nexport let data;\\nlet email = \\"\\";\\nlet status = \\"pending\\";\\nconst handleSubmit = async () => {\\n  const result = await axiosInstance.get(\\n    `/auth/account/requestlock?email=${email}`\\n  );\\n  if (result.status === 200) {\\n    status = \\"success\\";\\n  } else {\\n    status = \\"fail\\";\\n  }\\n};\\n<\/script>\\r\\n\\r\\n<div class=\\"background\\">\\r\\n  <div class=\\"lock-box\\">\\r\\n    <form on:submit|preventDefault={handleSubmit}>\\r\\n      <div class=\\"input-box\\">\\r\\n        <input\\r\\n          type=\\"text\\"\\r\\n          name=\\"email\\"\\r\\n          id=\\"email\\"\\r\\n          bind:value={email}\\r\\n          required\\r\\n        />\\r\\n        <label for=\\"password\\">Enter your email</label>\\r\\n      </div>\\r\\n      <button type=\\"submit\\">Get the link</button>\\r\\n\\r\\n      {#if status === \\"fail\\"}\\r\\n        <p>User does not exist</p>\\r\\n      {:else if status === \\"success\\"}\\r\\n        <p>Check your email</p>\\r\\n      {/if}\\r\\n    </form>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .background {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n    justify-content: center;\\r\\n    height: 100%;\\r\\n  }\\r\\n\\r\\n  .lock-box {\\r\\n    position: relative;\\r\\n    width: 400px;\\r\\n    height: 200px;\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n    align-items: center;\\r\\n    border-radius: 20px;\\r\\n    background: transparent;\\r\\n    border: 2px solid rgba(255, 255, 255, 0.5);\\r\\n    backdrop-filter: blur(15px);\\r\\n  }\\r\\n\\r\\n  p {\\r\\n    color: white;\\r\\n    text-align: center;\\r\\n  }\\r\\n\\r\\n  .input-box {\\r\\n    position: relative;\\r\\n    width: 330px;\\r\\n    margin: 30px 0px;\\r\\n    border-bottom: 2px solid white;\\r\\n  }\\r\\n\\r\\n  .input-box label {\\r\\n    position: absolute;\\r\\n    top: 50%;\\r\\n    left: 5px;\\r\\n    transform: translateY(-50%);\\r\\n    font-size: 1em;\\r\\n    color: white;\\r\\n    pointer-events: none;\\r\\n    transition: 0.5s;\\r\\n  }\\r\\n\\r\\n  .input-box input:focus ~ label,\\r\\n  .input-box input:valid ~ label {\\r\\n    top: -5px;\\r\\n  }\\r\\n\\r\\n  .input-box input {\\r\\n    width: 85%;\\r\\n    height: 50px;\\r\\n    background: transparent;\\r\\n    border: none;\\r\\n    outline: none;\\r\\n    font-size: 1em;\\r\\n    color: white;\\r\\n    padding: 0 0 0 5px;\\r\\n  }\\r\\n\\r\\n  button {\\r\\n    width: 100%;\\r\\n    height: 40px;\\r\\n    background: white;\\r\\n    border: none;\\r\\n    border-radius: 40px;\\r\\n    cursor: pointer;\\r\\n    font-size: 1em;\\r\\n    font-weight: 500;\\r\\n  }\\r\\n\\r\\n  @media (max-width: 360px) {\\r\\n    .lock-box {\\r\\n      width: 100%;\\r\\n      height: 100vh;\\r\\n      border: none;\\r\\n      border-radius: 0;\\r\\n    }\\r\\n    .input-box {\\r\\n      width: 280px;\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAyCE,qDAAY,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,IACV,CAEA,mDAAU,CACR,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,eAAe,CAAE,KAAK,IAAI,CAC5B,CAEA,2CAAE,CACA,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MACd,CAEA,oDAAW,CACT,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CAAC,GAAG,CAChB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAC3B,CAEA,wBAAU,CAAC,iCAAM,CACf,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,SAAS,CAAE,GAAG,CACd,KAAK,CAAE,KAAK,CACZ,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,IACd,CAEA,wBAAU,CAAC,mBAAK,MAAM,CAAG,mBAAK,CAC9B,wBAAU,CAAC,mBAAK,MAAM,CAAG,mBAAM,CAC7B,GAAG,CAAE,IACP,CAEA,wBAAU,CAAC,iCAAM,CACf,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,GAAG,CACd,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GACjB,CAEA,gDAAO,CACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,GACf,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,mDAAU,CACR,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,CACjB,CACA,oDAAW,CACT,KAAK,CAAE,KACT,CACF"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let email = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="background svelte-ql0ydn"><div class="lock-box svelte-ql0ydn"><form><div class="input-box svelte-ql0ydn"><input type="text" name="email" id="email" required class="svelte-ql0ydn"${add_attribute("value", email, 0)}> <label for="password" class="svelte-ql0ydn" data-svelte-h="svelte-qiifaa">Enter your email</label></div> <button type="submit" class="svelte-ql0ydn" data-svelte-h="svelte-xdb7ie">Get the link</button> ${`${``}`}</form></div> </div>`;
});
export {
  Page as default
};
