import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import { I as InputBox } from "../../../../chunks/InputBox.js";
import "../../../../chunks/session.js";
import "bcryptjs";
const css = {
  code: ".frame.svelte-z2bjws{width:100%;height:100%;display:flex;justify-content:center;align-items:center;flex-direction:column}h2.svelte-z2bjws{color:white}form.svelte-z2bjws{display:flex;flex-direction:column;align-items:center;width:600px;height:200px;border:2px solid white;padding:10px;border-radius:10px}button.svelte-z2bjws{cursor:pointer;font-size:1.5em;padding:10px 15px;border:none;border-radius:20px;width:200px;font-weight:700;margin:0 15px 20px 0}.control.svelte-z2bjws{display:flex;flex-wrap:wrap;justify-content:center}.submit.svelte-z2bjws{background-color:lime}.logout.svelte-z2bjws{background-color:red}@media(max-width: 630px){form.svelte-z2bjws{width:300px;height:fit-content}}@media(max-width: 330px){form.svelte-z2bjws{border:none;width:270px;height:fit-content}}",
  map: '{"version":3,"file":"+page@.svelte","sources":["+page@.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { goto } from \\"$app/navigation\\";\\nimport InputBox from \\"$lib/components/InputBox.svelte\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios\\";\\nimport {\\n  decryptPrivateKey,\\n  decryptSymmetricKeyWithPrivateKey,\\n  hashMasterPassword\\n} from \\"$lib/key\\";\\nimport {\\n  getSalt,\\n  getSymmetricKey,\\n  setRefreshToken,\\n  setSalt,\\n  setSymmetricKey,\\n  setToken\\n} from \\"$lib/session\\";\\nimport { onMount } from \\"svelte\\";\\nonMount(() => {\\n  if (getSymmetricKey()) goto(\\"/\\");\\n});\\nconst handleSubmit = async () => {\\n  const email = (await axiosInstance.get(\\"/auth/account/user\\")).data;\\n  const pwSalt = await getSalt(email);\\n  const { hashPW } = await hashMasterPassword(email, password, pwSalt);\\n  const axiosResponse = await axiosInstance.post(\\n    \\"/auth/account/user/encryptionKey\\",\\n    { hash: hashPW }\\n  );\\n  const { encryptionKey, privateKeyMaster, iv, salt } = axiosResponse.data;\\n  const decryptedPrivateKey = await decryptPrivateKey(\\n    privateKeyMaster,\\n    password,\\n    salt,\\n    iv\\n  );\\n  const symmKey = await decryptSymmetricKeyWithPrivateKey(\\n    encryptionKey,\\n    decryptedPrivateKey\\n  );\\n  setSymmetricKey(symmKey);\\n  await goto(\\"/\\");\\n};\\nconst handleLogout = async () => {\\n  await axiosInstance.post(\\"/auth/account/logout\\");\\n  setSalt(\\"\\");\\n  setToken(\\"\\");\\n  setRefreshToken(\\"\\");\\n  axiosInstance.defaults.headers.common[\\"Authorization\\"] = \\"\\";\\n  await goto(\\"/login\\");\\n};\\nlet password = \\"\\";\\n<\/script>\\n\\n<div class=\\"frame\\">\\n  <h2>Your vault is locked.</h2>\\n  <form method=\\"post\\" on:submit|preventDefault={handleSubmit}>\\n    <InputBox\\n      id=\\"password\\"\\n      label=\\"Enter master password\\"\\n      type=\\"password\\"\\n      bind:value={password}\\n      required\\n    ></InputBox>\\n    <div class=\\"control\\">\\n      <button class=\\"submit\\" on:submit={handleSubmit}>Unlock</button>\\n      <button class=\\"logout\\" on:click={handleLogout}>Logout</button>\\n    </div>\\n  </form>\\n</div>\\n\\n<style>\\n  .frame {\\n    width: 100%;\\n    height: 100%;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    flex-direction: column;\\n  }\\n  h2 {\\n    color: white;\\n  }\\n  form {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    width: 600px;\\n    height: 200px;\\n    border: 2px solid white;\\n    padding: 10px;\\n    border-radius: 10px;\\n  }\\n  button {\\n    cursor: pointer;\\n    font-size: 1.5em;\\n    padding: 10px 15px;\\n    border: none;\\n    border-radius: 20px;\\n    width: 200px;\\n    font-weight: 700;\\n    margin: 0 15px 20px 0;\\n  }\\n\\n  .control {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n  }\\n\\n  .submit {\\n    background-color: lime;\\n  }\\n  .logout {\\n    background-color: red;\\n  }\\n\\n  @media (max-width: 630px) {\\n    form {\\n      width: 300px;\\n      height: fit-content;\\n    }\\n  }\\n\\n  @media (max-width: 330px) {\\n    form {\\n      border: none;\\n      width: 270px;\\n      height: fit-content;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuEE,oBAAO,CACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,MAClB,CACA,gBAAG,CACD,KAAK,CAAE,KACT,CACA,kBAAK,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IACjB,CACA,oBAAO,CACL,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,CACtB,CAEA,sBAAS,CACP,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MACnB,CAEA,qBAAQ,CACN,gBAAgB,CAAE,IACpB,CACA,qBAAQ,CACN,gBAAgB,CAAE,GACpB,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,kBAAK,CACH,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,WACV,CACF,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,kBAAK,CACH,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,WACV,CACF"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let password = "";
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="frame svelte-z2bjws"><h2 class="svelte-z2bjws" data-svelte-h="svelte-ckhoc5">Your vault is locked.</h2> <form method="post" class="svelte-z2bjws">${validate_component(InputBox, "InputBox").$$render(
      $$result,
      {
        id: "password",
        label: "Enter master password",
        type: "password",
        required: true,
        value: password
      },
      {
        value: ($$value) => {
          password = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="control svelte-z2bjws"><button class="submit svelte-z2bjws" data-svelte-h="svelte-184by3v">Unlock</button> <button class="logout svelte-z2bjws" data-svelte-h="svelte-15ll9dz">Logout</button></div></form> </div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
