import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, b as createEventDispatcher, e as escape, v as validate_component, d as each } from "../../../chunks/ssr.js";
import "../../../chunks/axios.js";
import { p as page } from "../../../chunks/stores.js";
import "../../../chunks/client.js";
const css$3 = {
  code: "form.svelte-qfhzue{display:flex;flex-direction:column;margin:auto}button.svelte-qfhzue{padding:10px}",
  map: '{"version":3,"file":"AddPassword.svelte","sources":["AddPassword.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { axiosInstance } from \\"$lib/interceptors/axios\\";\\nimport { encryptData } from \\"$lib/key\\";\\nimport { getSalt } from \\"$lib/session\\";\\nimport { get } from \\"svelte/store\\";\\nexport let isOpen = false;\\nlet error = false;\\nconst handleSubmit = () => {\\n  encryptData(masterPassword, getSalt(), password).then((value) => {\\n    if (value === \\"ERROR\\") error = true;\\n    else {\\n      axiosInstance.post(\\"/vault\\", {\\n        website,\\n        email,\\n        password: value.encryptedData,\\n        iv: value.iv\\n      }).then((res) => {\\n        if (res.status === 200) {\\n          isOpen = false;\\n        }\\n      });\\n    }\\n  });\\n};\\nlet email = \\"\\", password = \\"\\", website = \\"\\", masterPassword = \\"\\";\\n<\/script>\\n\\n<form on:submit|preventDefault={handleSubmit}>\\n  <label for=\\"website\\">Website</label>\\n  <input type=\\"text\\" name=\\"website\\" id=\\"website\\" bind:value={website} />\\n\\n  <label for=\\"email\\">Email</label>\\n  <input type=\\"text\\" name=\\"email\\" id=\\"email\\" bind:value={email} />\\n  <label for=\\"password\\">Password</label>\\n  <input type=\\"text\\" name=\\"password\\" id=\\"password\\" bind:value={password} />\\n  <label for=\\"masterPassword\\">Master Password</label>\\n  <input\\n    type=\\"text\\"\\n    name=\\"masterPassword\\"\\n    id=\\"masterPassword\\"\\n    bind:value={masterPassword}\\n  />\\n  <button type=\\"submit\\">Save</button>\\n</form>\\n\\n<style>\\n  form {\\n    display: flex;\\n    flex-direction: column;\\n    margin: auto;\\n  }\\n\\n  button {\\n    padding: 10px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA6CE,kBAAK,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,IACV,CAEA,oBAAO,CACL,OAAO,CAAE,IACX"}'
};
const AddPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen = false } = $$props;
  let email = "", password = "", website = "", masterPassword = "";
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
  $$result.css.add(css$3);
  return `<form class="svelte-qfhzue"><label for="website" data-svelte-h="svelte-q3ee2c">Website</label> <input type="text" name="website" id="website"${add_attribute("value", website)}> <label for="email" data-svelte-h="svelte-1p9d3fm">Email</label> <input type="text" name="email" id="email"${add_attribute("value", email)}> <label for="password" data-svelte-h="svelte-pepa0a">Password</label> <input type="text" name="password" id="password"${add_attribute("value", password)}> <label for="masterPassword" data-svelte-h="svelte-1xxtmvs">Master Password</label> <input type="text" name="masterPassword" id="masterPassword"${add_attribute("value", masterPassword)}> <button type="submit" class="svelte-qfhzue" data-svelte-h="svelte-1f2bxem">Save</button> </form>`;
});
const css$2 = {
  code: ".modal-overlay.svelte-18aoxsx{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.5);display:flex;justify-content:center;align-items:center;z-index:1000}.modal-content.svelte-18aoxsx{background:white;padding:20px;border-radius:8px;max-width:500px;width:100%}",
  map: '{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { createEventDispatcher, onMount } from \\"svelte\\";\\nexport let isOpen = false;\\nexport let closeOnClickOutside = true;\\nconst dispatch = createEventDispatcher();\\nfunction closeModal() {\\n  isOpen = false;\\n  dispatch(\\"close\\");\\n}\\nfunction handleOutsideClick(event) {\\n  if (closeOnClickOutside && event.target === event.currentTarget) {\\n    closeModal();\\n  }\\n}\\nfunction handleKeydown(event) {\\n  if (event.key === \\"Escape\\") {\\n    closeModal();\\n  }\\n}\\nonMount(() => {\\n  document.addEventListener(\\"keydown\\", handleKeydown);\\n  return () => {\\n    document.removeEventListener(\\"keydown\\", handleKeydown);\\n  };\\n});\\n<\/script>\\n\\n{#if isOpen}\\n  <div class=\\"modal-overlay\\" on:click={handleOutsideClick}>\\n    <div class=\\"modal-content\\">\\n      <slot />\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  .modal-overlay {\\n    position: fixed;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    height: 100%;\\n    background-color: rgba(0, 0, 0, 0.5);\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    z-index: 1000;\\n  }\\n\\n  .modal-content {\\n    background: white;\\n    padding: 20px;\\n    border-radius: 8px;\\n    max-width: 500px;\\n    width: 100%;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAmCE,6BAAe,CACb,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IACX,CAEA,6BAAe,CACb,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,IACT"}'
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen = false } = $$props;
  let { closeOnClickOutside = true } = $$props;
  createEventDispatcher();
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
  if ($$props.closeOnClickOutside === void 0 && $$bindings.closeOnClickOutside && closeOnClickOutside !== void 0) $$bindings.closeOnClickOutside(closeOnClickOutside);
  $$result.css.add(css$2);
  return `${isOpen ? `<div class="modal-overlay svelte-18aoxsx"><div class="modal-content svelte-18aoxsx">${slots.default ? slots.default({}) : ``}</div></div>` : ``}`;
});
const ConfirmWithPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { iv } = $$props;
  let { isOpen } = $$props;
  let password = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.iv === void 0 && $$bindings.iv && iv !== void 0) $$bindings.iv(iv);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
  return `<form><h3>Password to reveal: ${escape(data)}</h3> <label for="password" data-svelte-h="svelte-1m3ozag">Enter Master Password</label> <input type="password" id="password"${add_attribute("value", password)}> <button type="submit" data-svelte-h="svelte-wmvqau">Reveal</button></form> ${``} <button class="exit" data-svelte-h="svelte-kq22ao">Exit</button>`;
});
const css$1 = {
  code: "table.svelte-6s0oqu{margin:auto}table.svelte-6s0oqu,td.svelte-6s0oqu{border:1px solid;border-radius:5px;padding:10px}th.svelte-6s0oqu{width:75px;padding:10px}.header.svelte-6s0oqu{background-color:aqua}",
  map: '{"version":3,"file":"VaultTable.svelte","sources":["VaultTable.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Modal from \\"$lib/components/modals/Modal.svelte\\";\\nimport ConfirmWithPassword from \\"$lib/components/modals/content/ConfirmWithPassword.svelte\\";\\nexport let tableData = [];\\nlet tableDataWithoutIV = tableData.map((item) => {\\n  return {\\n    website: item.website,\\n    email: item.email,\\n    password: item.password\\n  };\\n});\\nlet ivLookup = [];\\n$: {\\n  tableData.forEach(\\n    (value) => ivLookup.push({ website: value.website, iv: value.iv })\\n  );\\n}\\nconst lookup = (website) => {\\n  const entry = ivLookup.find((item) => item.website === website);\\n  return entry ? entry.iv : \\"\\";\\n};\\nlet isOpen = false;\\nlet data = \\"\\", iv = \\"\\";\\n<\/script>\\n\\n<Modal bind:isOpen>\\n  <ConfirmWithPassword bind:isOpen bind:data bind:iv></ConfirmWithPassword>\\n</Modal>\\n\\n<table>\\n  <thead>\\n    <tr class=\\"header\\">\\n      <th>Website</th>\\n      <th>Email</th>\\n      <th>Password</th>\\n    </tr><tr />\\n  </thead>\\n\\n  <tbody>\\n    {#each Object.values(tableDataWithoutIV) as row}\\n      <tr>\\n        {#each Object.values(row) as cell}\\n          <td>{cell}</td>\\n        {/each}\\n        <td\\n          ><button\\n            class=\\"reveal\\"\\n            on:click={() => {\\n              data = row.password;\\n              iv = lookup(row.website);\\n              isOpen = true;\\n            }}>Reveal</button\\n          ></td\\n        >\\n      </tr>\\n    {/each}\\n  </tbody>\\n</table>\\n\\n<style>\\n  table {\\n    margin: auto;\\n  }\\n\\n  table,\\n  td {\\n    border: 1px solid;\\n    border-radius: 5px;\\n    padding: 10px;\\n  }\\n\\n  th {\\n    width: 75px;\\n    padding: 10px;\\n  }\\n\\n  .header {\\n    background-color: aqua;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA2DE,mBAAM,CACJ,MAAM,CAAE,IACV,CAEA,mBAAK,CACL,gBAAG,CACD,MAAM,CAAE,GAAG,CAAC,KAAK,CACjB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IACX,CAEA,gBAAG,CACD,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IACX,CAEA,qBAAQ,CACN,gBAAgB,CAAE,IACpB"}'
};
const VaultTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tableData = [] } = $$props;
  let tableDataWithoutIV = tableData.map((item) => {
    return {
      website: item.website,
      email: item.email,
      password: item.password
    };
  });
  let ivLookup = [];
  let isOpen = false;
  let data = "", iv = "";
  if ($$props.tableData === void 0 && $$bindings.tableData && tableData !== void 0) $$bindings.tableData(tableData);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        tableData.forEach((value) => ivLookup.push({ website: value.website, iv: value.iv }));
      }
    }
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
          return `${validate_component(ConfirmWithPassword, "ConfirmWithPassword").$$render(
            $$result,
            { isOpen, data, iv },
            {
              isOpen: ($$value) => {
                isOpen = $$value;
                $$settled = false;
              },
              data: ($$value) => {
                data = $$value;
                $$settled = false;
              },
              iv: ($$value) => {
                iv = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )} <table class="svelte-6s0oqu"><thead data-svelte-h="svelte-1czv9h"><tr class="header svelte-6s0oqu"><th class="svelte-6s0oqu">Website</th> <th class="svelte-6s0oqu">Email</th> <th class="svelte-6s0oqu">Password</th> </tr><tr></tr></thead> <tbody>${each(Object.values(tableDataWithoutIV), (row) => {
      return `<tr>${each(Object.values(row), (cell) => {
        return `<td class="svelte-6s0oqu">${escape(cell)}</td>`;
      })} <td class="svelte-6s0oqu"><button class="reveal" data-svelte-h="svelte-tfw9db">Reveal</button></td> </tr>`;
    })}</tbody> </table>`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: "button.svelte-j38glp{position:relative;margin-left:calc(50% - 50px);margin-top:20px;width:100px;height:50px;cursor:pointer;background-color:limegreen}button.svelte-j38glp:hover{background-color:lime}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import AddPassword from \\"$lib/components/modals/content/AddPassword.svelte\\";\\nimport Modal from \\"$lib/components/modals/Modal.svelte\\";\\nimport VaultTable from \\"$lib/components/tables/VaultTable.svelte\\";\\nexport let data = [];\\nimport { page } from \\"$app/stores\\";\\nimport { onMount } from \\"svelte\\";\\nimport { checkToken } from \\"$lib/interceptors/authenticationCheck\\";\\n$: currentUrl = $page.url.pathname;\\nonMount(async () => {\\n  await checkToken(currentUrl);\\n});\\nlet openModal = false;\\n<\/script>\\n\\n<Modal bind:isOpen={openModal}>\\n  <AddPassword bind:isOpen={openModal}></AddPassword>\\n</Modal>\\n<VaultTable tableData={data.passwords}></VaultTable>\\n<button on:click={() => (openModal = true)}> + </button>\\n\\n<style>\\n  button {\\n    position: relative;\\n    margin-left: calc(50% - 50px);\\n    margin-top: 20px;\\n    width: 100px;\\n    height: 50px;\\n    cursor: pointer;\\n    background-color: limegreen;\\n  }\\n\\n  button:hover {\\n    background-color: lime;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAqBE,oBAAO,CACL,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,CAAC,CAC7B,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,gBAAgB,CAAE,SACpB,CAEA,oBAAM,MAAO,CACX,gBAAgB,CAAE,IACpB"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
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
    $page.url.pathname;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
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
    )} ${validate_component(VaultTable, "VaultTable").$$render($$result, { tableData: data.passwords }, {}, {})} <button class="svelte-j38glp" data-svelte-h="svelte-l6amdm">+ </button>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
