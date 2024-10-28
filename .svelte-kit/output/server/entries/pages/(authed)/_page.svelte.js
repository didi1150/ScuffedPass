import { c as create_ssr_component, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import "../../../chunks/session.js";
import "../../../chunks/client.js";
import { M as Modal } from "../../../chunks/Modal.js";
import "bcryptjs";
import { I as InputBox } from "../../../chunks/InputBox.js";
/* empty css                                                                 */
/* empty css                                                          */
/* empty css                                                     */
const css$2 = {
  code: ".error.svelte-1yam46n{color:red}form.svelte-1yam46n{display:flex;flex-direction:column;align-items:center}button.svelte-1yam46n{margin:20px 0;cursor:pointer;font-size:1em;padding:10px 15px;border:none;border-radius:20px;width:200px;font-weight:700}",
  map: `{"version":3,"file":"ChangeMasterPassword.svelte","sources":["ChangeMasterPassword.svelte"],"sourcesContent":["<script lang=\\"ts\\">import {\\n  base64ToUint8Array,\\n  decryptPrivateKey,\\n  encryptPrivateKey,\\n  hashMasterPassword\\n} from \\"$lib/key\\";\\nimport InputBox from \\"$lib/components/InputBox.svelte\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios\\";\\nimport { getSalt } from \\"$lib/session\\";\\nexport let isOpen;\\nexport let username = \\"\\";\\nlet currentMasterPassword = \\"\\";\\nlet newMasterPassword = \\"\\";\\nlet error = \\"\\";\\nconst handleSubmit = async () => {\\n  username = (await axiosInstance.get(\\"/auth/account/user\\")).data;\\n  const salt = await getSalt(username);\\n  const hash = await hashMasterPassword(\\n    username,\\n    currentMasterPassword,\\n    salt\\n  );\\n  try {\\n    const response = await axiosInstance.post(\\n      \\"/auth/account/user/encryptionKey\\",\\n      {\\n        hash: hash.hashPW\\n      }\\n    );\\n    if (response.status === 200) {\\n      const { privateKeyMaster, iv, salt: salt2 } = response.data;\\n      const decryptedPrivateKey = await decryptPrivateKey(\\n        privateKeyMaster,\\n        currentMasterPassword,\\n        salt2,\\n        iv\\n      );\\n      const { hashPW } = await hashMasterPassword(\\n        username,\\n        newMasterPassword\\n      );\\n      const reencryptedPrivateKeyMaster = await encryptPrivateKey(\\n        decryptedPrivateKey,\\n        newMasterPassword,\\n        salt2,\\n        base64ToUint8Array(iv)\\n      );\\n      if (!reencryptedPrivateKeyMaster)\\n        throw new Error(\\"Couldn't reencrypt private key\\");\\n      const updateAttempt = await axiosInstance.patch(\\n        \\"auth/account/user/updatepw\\",\\n        {\\n          privateKeyMaster: reencryptedPrivateKeyMaster,\\n          oldPassword: hash.hashPW,\\n          newPassword: hashPW,\\n          salt: salt2\\n        }\\n      );\\n      if (updateAttempt.status === 200) {\\n        isOpen = false;\\n      }\\n    }\\n  } catch (reason) {\\n    console.error(reason);\\n    error = \\"The master password is incorrect.\\";\\n  }\\n};\\n<\/script>\\r\\n\\r\\n<form on:submit|preventDefault={handleSubmit}>\\r\\n  <h2>Change Master Password</h2>\\r\\n  <InputBox\\r\\n    id=\\"password\\"\\r\\n    type=\\"password\\"\\r\\n    label=\\"Enter Current Master Password\\"\\r\\n    required={true}\\r\\n    bind:value={currentMasterPassword}\\r\\n  />\\r\\n  <InputBox\\r\\n    id=\\"master\\"\\r\\n    type=\\"password\\"\\r\\n    label=\\"Enter New Master Password\\"\\r\\n    bind:value={newMasterPassword}\\r\\n    required={true}\\r\\n  />\\r\\n  <button type=\\"submit\\">Update</button>\\r\\n  {#if error.length != 0}\\r\\n    <p class=\\"error\\">{error}</p>\\r\\n  {/if}\\r\\n</form>\\r\\n\\r\\n<style>\\r\\n  .error {\\r\\n    color: red;\\r\\n  }\\r\\n  form {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n  }\\r\\n  button {\\r\\n    margin: 20px 0;\\r\\n    cursor: pointer;\\r\\n    font-size: 1em;\\r\\n    padding: 10px 15px;\\r\\n    border: none;\\r\\n    border-radius: 20px;\\r\\n    width: 200px;\\r\\n    font-weight: 700;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA4FE,qBAAO,CACL,KAAK,CAAE,GACT,CACA,mBAAK,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MACf,CACA,qBAAO,CACL,MAAM,CAAE,IAAI,CAAC,CAAC,CACd,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,GAAG,CACd,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GACf"}`
};
const ChangeMasterPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen } = $$props;
  let { username = "" } = $$props;
  let currentMasterPassword = "";
  let newMasterPassword = "";
  let error = "";
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
  if ($$props.username === void 0 && $$bindings.username && username !== void 0) $$bindings.username(username);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form class="svelte-1yam46n"><h2 data-svelte-h="svelte-q75921">Change Master Password</h2> ${validate_component(InputBox, "InputBox").$$render(
      $$result,
      {
        id: "password",
        type: "password",
        label: "Enter Current Master Password",
        required: true,
        value: currentMasterPassword
      },
      {
        value: ($$value) => {
          currentMasterPassword = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(InputBox, "InputBox").$$render(
      $$result,
      {
        id: "master",
        type: "password",
        label: "Enter New Master Password",
        required: true,
        value: newMasterPassword
      },
      {
        value: ($$value) => {
          newMasterPassword = $$value;
          $$settled = false;
        }
      },
      {}
    )} <button type="submit" class="svelte-1yam46n" data-svelte-h="svelte-xszv96">Update</button> ${error.length != 0 ? `<p class="error svelte-1yam46n">${escape(error)}</p>` : ``} </form>`;
  } while (!$$settled);
  return $$rendered;
});
const css$1 = {
  code: ".error.svelte-1kik828{color:red}form.svelte-1kik828{display:flex;flex-direction:column;align-items:center}button.svelte-1kik828{margin:20px 0;cursor:pointer;font-size:1.5em;padding:10px 15px;border:none;border-radius:20px;width:200px;font-weight:700}",
  map: '{"version":3,"file":"AddPassword.svelte","sources":["AddPassword.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { invalidateAll } from \\"$app/navigation\\";\\nimport InputBox from \\"$lib/components/InputBox.svelte\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios\\";\\nimport {\\n  base64ToUint8Array,\\n  decryptPrivateKey,\\n  decryptSymmetricKeyWithPrivateKey,\\n  encryptData,\\n  hashMasterPassword\\n} from \\"$lib/key\\";\\nimport { getSalt } from \\"$lib/session\\";\\nexport let isOpen = false;\\nlet error = false;\\nconst handleSubmit = async () => {\\n  const username = (await axiosInstance.get(\\"/auth/account/user\\")).data;\\n  const salt = await getSalt(username);\\n  console.log(salt);\\n  const { hashPW } = await hashMasterPassword(username, masterPassword, salt);\\n  axiosInstance.post(\\"/auth/account/user/encryptionKey\\", { hash: hashPW }).then((response) => {\\n    if (response.status === 200) {\\n      console.log(response.data);\\n      const { encryptionKey, privateKeyMaster, iv } = response.data;\\n      decryptPrivateKey(privateKeyMaster, masterPassword, salt, iv).then((decryptedPrivateKey) => {\\n        decryptSymmetricKeyWithPrivateKey(\\n          encryptionKey,\\n          decryptedPrivateKey\\n        ).then(async (symmetricKey) => {\\n          const enc_website = await encryptData(website, symmetricKey);\\n          encryptData(\\n            password,\\n            symmetricKey,\\n            base64ToUint8Array(enc_website.iv)\\n          ).then((value) => {\\n            if (!value) error = true;\\n            else {\\n              axiosInstance.post(\\"/vault\\", {\\n                website: enc_website.encryptedData,\\n                email,\\n                password: value.encryptedData,\\n                iv: enc_website.iv\\n              }).then((res) => {\\n                if (res.status === 200) {\\n                  isOpen = false;\\n                  invalidateAll();\\n                }\\n              });\\n            }\\n          });\\n        });\\n      }).catch((reason) => {\\n        console.error(reason);\\n        error = true;\\n      });\\n    }\\n  });\\n};\\nlet email = \\"\\", password = \\"\\", website = \\"\\", masterPassword = \\"\\";\\n<\/script>\\r\\n\\r\\n<form on:submit|preventDefault={handleSubmit}>\\r\\n  <h2>Add Password</h2>\\r\\n  <InputBox\\r\\n    bind:value={website}\\r\\n    id=\\"website\\"\\r\\n    label=\\"Enter a Website\\"\\r\\n    required={true}\\r\\n  ></InputBox>\\r\\n  <InputBox bind:value={email} id=\\"email\\" label=\\"Enter an Email\\" required={true}\\r\\n  ></InputBox>\\r\\n  <InputBox\\r\\n    bind:value={password}\\r\\n    id=\\"password\\"\\r\\n    label=\\"Enter a Password\\"\\r\\n    required={true}\\r\\n    type=\\"password\\"\\r\\n  ></InputBox>\\r\\n  <InputBox\\r\\n    bind:value={masterPassword}\\r\\n    id=\\"masterPassword\\"\\r\\n    label=\\"Enter your Master Password\\"\\r\\n    required={true}\\r\\n    type=\\"password\\"\\r\\n  ></InputBox>\\r\\n  <button type=\\"submit\\">Save</button>\\r\\n  {#if error}\\r\\n    <p class=\\"error\\">Oops, something went wrong</p>\\r\\n  {/if}\\r\\n</form>\\r\\n\\r\\n<style>\\r\\n  .error {\\r\\n    color: red;\\r\\n  }\\r\\n  form {\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n  }\\r\\n\\r\\n  button {\\r\\n    margin: 20px 0;\\r\\n    cursor: pointer;\\r\\n    font-size: 1.5em;\\r\\n    padding: 10px 15px;\\r\\n    border: none;\\r\\n    border-radius: 20px;\\r\\n    width: 200px;\\r\\n    font-weight: 700;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA0FE,qBAAO,CACL,KAAK,CAAE,GACT,CACA,mBAAK,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MACf,CAEA,qBAAO,CACL,MAAM,CAAE,IAAI,CAAC,CAAC,CACd,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GACf"}'
};
const AddPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen = false } = $$props;
  let email = "", password = "", website = "", masterPassword = "";
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form class="svelte-1kik828"><h2 data-svelte-h="svelte-1arwlf2">Add Password</h2> ${validate_component(InputBox, "InputBox").$$render(
      $$result,
      {
        id: "website",
        label: "Enter a Website",
        required: true,
        value: website
      },
      {
        value: ($$value) => {
          website = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(InputBox, "InputBox").$$render(
      $$result,
      {
        id: "email",
        label: "Enter an Email",
        required: true,
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(InputBox, "InputBox").$$render(
      $$result,
      {
        id: "password",
        label: "Enter a Password",
        required: true,
        type: "password",
        value: password
      },
      {
        value: ($$value) => {
          password = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(InputBox, "InputBox").$$render(
      $$result,
      {
        id: "masterPassword",
        label: "Enter your Master Password",
        required: true,
        type: "password",
        value: masterPassword
      },
      {
        value: ($$value) => {
          masterPassword = $$value;
          $$settled = false;
        }
      },
      {}
    )} <button type="submit" class="svelte-1kik828" data-svelte-h="svelte-1f2bxem">Save</button> ${``} </form>`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: "section.svelte-1d6ru4h{height:100%;overflow:auto}.add.svelte-1d6ru4h{position:absolute;bottom:50px;margin-left:calc(50% - 75px);width:150px;height:50px;cursor:pointer;color:black;background-color:white;border:none;outline:none;border-radius:25px;font-size:1.25em}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios\\";\\nimport { goto, invalidate, invalidateAll } from \\"$app/navigation\\";\\nimport { checkToken } from \\"$lib/interceptors/authenticationCheck\\";\\nimport { page } from \\"$app/stores\\";\\nimport {\\n  getSymmetricKey,\\n  setRefreshToken,\\n  setSalt,\\n  setToken\\n} from \\"$lib/session\\";\\nimport { hasRole } from \\"$lib/roles\\";\\nimport Modal from \\"$lib/components/modals/Modal.svelte\\";\\nimport ChangeMasterPassword from \\"$lib/components/modals/content/ChangeMasterPassword.svelte\\";\\nimport DesktopVault from \\"$lib/components/DesktopVault.svelte\\";\\nimport MobileVault from \\"$lib/components/MobileVault.svelte\\";\\nimport MediaQuery from \\"$lib/components/MediaQuery.svelte\\";\\nimport AddPassword from \\"$lib/components/modals/content/AddPassword.svelte\\";\\nimport { decryptData } from \\"$lib/key\\";\\nlet isOpen = false;\\nlet mode = \\"changemaster\\";\\nexport let data = [];\\nlet openModal = false;\\nlet websitesDecrypted = false;\\nonMount(async () => {\\n  const encryptionKey = getSymmetricKey();\\n  if (!encryptionKey) {\\n    await goto(\\"/unlockvault\\");\\n  } else if (!websitesDecrypted) {\\n    data.passwords.map(async (item) => {\\n      item.websiteURL = await decryptData(\\n        item.websiteURL,\\n        item.iv,\\n        getSymmetricKey()\\n      );\\n    });\\n    setTimeout(() => {\\n      data.passwords = data.passwords;\\n      websitesDecrypted = true;\\n    }, 5);\\n  }\\n});\\nlet mobileQuery = \\"(max-width: 1100px)\\";\\nlet desktopQuery = \\"(min-width: 1101px)\\";\\n<\/script>\\r\\n\\r\\n<section>\\r\\n  <Modal bind:isOpen>\\r\\n    {#if mode === \\"changemaster\\"}\\r\\n      <ChangeMasterPassword bind:isOpen></ChangeMasterPassword>\\r\\n    {/if}\\r\\n  </Modal>\\r\\n  <Modal bind:isOpen={openModal}>\\r\\n    <AddPassword bind:isOpen={openModal}></AddPassword>\\r\\n  </Modal>\\r\\n  {#if websitesDecrypted}\\r\\n    <MediaQuery query={mobileQuery}>\\r\\n      <MobileVault tableData={data.passwords}></MobileVault>\\r\\n    </MediaQuery>\\r\\n    <MediaQuery query={desktopQuery}>\\r\\n      <DesktopVault tableData={data.passwords}></DesktopVault>\\r\\n    </MediaQuery>\\r\\n  {/if}\\r\\n  <button class=\\"add\\" on:click={() => (openModal = true)}>Add</button>\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n  section {\\r\\n    height: 100%;\\r\\n    overflow: auto;\\r\\n  }\\r\\n\\r\\n  .add {\\r\\n    position: absolute;\\r\\n    bottom: 50px;\\r\\n    margin-left: calc(50% - 75px);\\r\\n    width: 150px;\\r\\n    height: 50px;\\r\\n    cursor: pointer;\\r\\n    color: black;\\r\\n    background-color: white;\\r\\n    border: none;\\r\\n    outline: none;\\r\\n    border-radius: 25px;\\r\\n    font-size: 1.25em;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAmEE,sBAAQ,CACN,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,IACZ,CAEA,mBAAK,CACH,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,CAAC,CAC7B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,KAAK,CACZ,gBAAgB,CAAE,KAAK,CACvB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,MACb"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isOpen = false;
  let { data = [] } = $$props;
  let openModal = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<section class="svelte-1d6ru4h">${validate_component(Modal, "Modal").$$render(
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
          return `${`${validate_component(ChangeMasterPassword, "ChangeMasterPassword").$$render(
            $$result,
            { isOpen },
            {
              isOpen: ($$value) => {
                isOpen = $$value;
                $$settled = false;
              }
            },
            {}
          )}`}`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { isOpen: openModal },
      {
        isOpen: ($$value) => {
          openModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(AddPassword, "AddPassword").$$render(
            $$result,
            { isOpen: openModal },
            {
              isOpen: ($$value) => {
                openModal = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )} ${``} <button class="add svelte-1d6ru4h" data-svelte-h="svelte-8pv6p2">Add</button> </section>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
