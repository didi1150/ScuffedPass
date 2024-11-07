import { c as create_ssr_component, a as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { M as Modal } from "../../../chunks/Modal.js";
import "../../../chunks/session.js";
import "../../../chunks/client.js";
import { h as hasRole } from "../../../chunks/roles.js";
import "bcryptjs";
/* empty css                                                     */
/* empty css                                                                 */
import { M as MediaQuery } from "../../../chunks/MediaQuery.js";
const css$1 = {
  code: '.backdrop.svelte-g332p4.svelte-g332p4{z-index:1;margin-top:0;position:absolute;width:100%;height:100%;background-color:rgba(10, 10, 10, 0.5);backdrop-filter:blur(5px)}.list.svelte-g332p4.svelte-g332p4{z-index:2;position:absolute;padding:50px 0 0 0;top:0;list-style:none;display:flex;flex-direction:column;justify-content:flex-start;margin:0;width:80%;margin-left:-80%;height:100%;background-color:lightgrey;transition:0.3s margin-left}.list.svelte-g332p4 li.svelte-g332p4{width:100%;height:60px;display:flex;align-items:center;opacity:0}.list.svelte-g332p4 li button.svelte-g332p4{text-decoration:none;color:white;font-family:system-ui,\n      -apple-system,\n      BlinkMacSystemFont,\n      "Segoe UI",\n      Roboto,\n      Oxygen,\n      Ubuntu,\n      Cantarell,\n      "Open Sans",\n      "Helvetica Neue",\n      sans-serif;cursor:pointer;width:100%;background:none;outline:none;border:none;font-size:1em;margin-bottom:10px}.list.svelte-g332p4 li a.svelte-g332p4{text-decoration:none;color:white;height:100%;font-family:system-ui,\n      -apple-system,\n      BlinkMacSystemFont,\n      "Segoe UI",\n      Roboto,\n      Oxygen,\n      Ubuntu,\n      Cantarell,\n      "Open Sans",\n      "Helvetica Neue",\n      sans-serif;cursor:pointer;width:100%;display:flex;justify-content:center;align-items:center}.hamburger.svelte-g332p4.svelte-g332p4{z-index:3;position:absolute;width:30px;height:4px;border-radius:10px;background-color:white;display:block;top:20px;cursor:pointer;transition:0.3s;left:10px}.hamburger.svelte-g332p4.svelte-g332p4::before,.hamburger.svelte-g332p4.svelte-g332p4::after{display:block;content:"";height:4px;width:30px;border-radius:10px;background-color:white;transition:0.3s}.hamburger.svelte-g332p4.svelte-g332p4::before{position:inherit;top:10px}.hamburger.svelte-g332p4.svelte-g332p4::after{position:inherit;top:-10px}.toggle-menu.svelte-g332p4.svelte-g332p4{top:4px;position:absolute;width:30px;height:30px;z-index:4;opacity:0;cursor:pointer;left:7px}.toggle-menu.svelte-g332p4:checked~.hamburger.svelte-g332p4::before{transform:rotate(-45deg);top:0}.toggle-menu.svelte-g332p4:checked~.hamburger.svelte-g332p4::after{transform:rotate(45deg);top:0}.toggle-menu.svelte-g332p4:checked~.hamburger.svelte-g332p4{background:transparent}.toggle-menu.svelte-g332p4:checked~ul.svelte-g332p4{margin-left:0}.toggle-menu:checked~ul.svelte-g332p4 li.svelte-g332p4{opacity:100%}',
  map: '{"version":3,"file":"Sidebar.svelte","sources":["Sidebar.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { goto } from \\"$app/navigation\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios\\";\\nimport { hasRole } from \\"$lib/roles\\";\\nimport { setRefreshToken, setSalt, setToken } from \\"$lib/session\\";\\nexport let isVault = false;\\nlet isOpen = false;\\n$: isAdmin = hasRole(\\"admin\\");\\n$: logout = async () => {\\n  await axiosInstance.post(\\"/auth/account/logout\\");\\n  setSalt(\\"\\");\\n  setToken(\\"\\");\\n  setRefreshToken(\\"\\");\\n  axiosInstance.defaults.headers.common[\\"Authorization\\"] = \\"\\";\\n  await goto(\\"/login\\");\\n};\\nconst closeSidebar = (event) => {\\n  const element = document.getElementsByClassName(\\"toggle-menu\\").item(0);\\n  if (!element) return;\\n  if (element instanceof HTMLInputElement) element.checked = false;\\n  isOpen = false;\\n};\\n<\/script>\\n\\n{#if isOpen}\\n  <div class=\\"backdrop\\" on:click={closeSidebar}></div>\\n{/if}\\n\\n<input type=\\"checkbox\\" class=\\"toggle-menu\\" bind:checked={isOpen} />\\n<div class=\\"hamburger\\" />\\n<ul class=\\"list\\">\\n  {#if !isVault}\\n    <li>\\n      <a href=\\"/\\"><h2>Vault</h2></a>\\n    </li>{/if}\\n  {#if isAdmin}\\n    <li>\\n      <a href=\\"/users\\"><h2>Users</h2></a>\\n    </li>\\n  {/if}\\n  <li>\\n    <button on:click><h2>Change Masterpassword</h2></button>\\n  </li>\\n  <li>\\n    <button on:click={logout}><h2>Logout</h2></button>\\n  </li>\\n</ul>\\n\\n<style>\\n  .backdrop {\\n    z-index: 1;\\n    margin-top: 0;\\n    position: absolute;\\n    width: 100%;\\n    height: 100%;\\n    background-color: rgba(10, 10, 10, 0.5);\\n    backdrop-filter: blur(5px);\\n  }\\n  .list {\\n    z-index: 2;\\n    position: absolute;\\n    padding: 50px 0 0 0;\\n    top: 0;\\n    list-style: none;\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: flex-start;\\n    margin: 0;\\n\\n    width: 80%;\\n    margin-left: -80%;\\n    height: 100%;\\n    background-color: lightgrey;\\n    transition: 0.3s margin-left;\\n  }\\n\\n  .list li {\\n    width: 100%;\\n    height: 60px;\\n    display: flex;\\n    align-items: center;\\n    opacity: 0;\\n  }\\n\\n  .list li button {\\n    text-decoration: none;\\n    color: white;\\n    font-family:\\n      system-ui,\\n      -apple-system,\\n      BlinkMacSystemFont,\\n      \\"Segoe UI\\",\\n      Roboto,\\n      Oxygen,\\n      Ubuntu,\\n      Cantarell,\\n      \\"Open Sans\\",\\n      \\"Helvetica Neue\\",\\n      sans-serif;\\n    cursor: pointer;\\n    width: 100%;\\n    background: none;\\n    outline: none;\\n    border: none;\\n    font-size: 1em;\\n    margin-bottom: 10px;\\n  }\\n\\n  .list li a {\\n    text-decoration: none;\\n    color: white;\\n    height: 100%;\\n    font-family:\\n      system-ui,\\n      -apple-system,\\n      BlinkMacSystemFont,\\n      \\"Segoe UI\\",\\n      Roboto,\\n      Oxygen,\\n      Ubuntu,\\n      Cantarell,\\n      \\"Open Sans\\",\\n      \\"Helvetica Neue\\",\\n      sans-serif;\\n    cursor: pointer;\\n    width: 100%;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n\\n  .hamburger {\\n    z-index: 3;\\n    position: absolute;\\n    width: 30px;\\n    height: 4px;\\n    border-radius: 10px;\\n    background-color: white;\\n    display: block;\\n    top: 20px;\\n    cursor: pointer;\\n    transition: 0.3s;\\n    left: 10px;\\n  }\\n\\n  .hamburger::before,\\n  .hamburger::after {\\n    display: block;\\n    content: \\"\\";\\n    height: 4px;\\n    width: 30px;\\n    border-radius: 10px;\\n    background-color: white;\\n    transition: 0.3s;\\n  }\\n\\n  .hamburger::before {\\n    position: inherit;\\n    top: 10px;\\n  }\\n\\n  .hamburger::after {\\n    position: inherit;\\n    top: -10px;\\n  }\\n\\n  .toggle-menu {\\n    top: 4px;\\n    position: absolute;\\n    width: 30px;\\n    height: 30px;\\n    z-index: 4;\\n    opacity: 0;\\n    cursor: pointer;\\n    left: 7px;\\n  }\\n\\n  .toggle-menu:checked ~ .hamburger::before {\\n    transform: rotate(-45deg);\\n    top: 0;\\n  }\\n\\n  .toggle-menu:checked ~ .hamburger::after {\\n    transform: rotate(45deg);\\n    top: 0;\\n  }\\n\\n  .toggle-menu:checked ~ .hamburger {\\n    background: transparent;\\n  }\\n\\n  .toggle-menu:checked ~ ul {\\n    margin-left: 0;\\n  }\\n\\n  .toggle-menu:checked ~ ul li {\\n    opacity: 100%;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isAdmin;
  let { isVault = false } = $$props;
  let isOpen = false;
  if ($$props.isVault === void 0 && $$bindings.isVault && isVault !== void 0) $$bindings.isVault(isVault);
  $$result.css.add(css$1);
  isAdmin = hasRole("admin");
  return `${``} <input type="checkbox" class="toggle-menu svelte-g332p4"${add_attribute("checked", isOpen, 1)}> <div class="hamburger svelte-g332p4"></div> <ul class="list svelte-g332p4">${!isVault ? `<li class="svelte-g332p4" data-svelte-h="svelte-juvom7"><a href="/" class="svelte-g332p4"><h2>Vault</h2></a></li>` : ``} ${isAdmin ? `<li class="svelte-g332p4" data-svelte-h="svelte-1wfzfkn"><a href="/users" class="svelte-g332p4"><h2>Users</h2></a></li>` : ``} <li class="svelte-g332p4"><button class="svelte-g332p4" data-svelte-h="svelte-r0mkpf"><h2>Change Masterpassword</h2></button></li> <li class="svelte-g332p4"><button class="svelte-g332p4" data-svelte-h="svelte-inkx71"><h2>Logout</h2></button></li> </ul>`;
});
const css = {
  code: "nav.svelte-151g2g2{background-color:white;width:100%;position:fixed;display:flex;justify-content:flex-end;z-index:2;height:fit-content}button.svelte-151g2g2{color:grey;padding:20px;cursor:pointer;background-color:white;font-size:1.2em;font-family:Verdana, Geneva, Tahoma, sans-serif;border:none}button.svelte-151g2g2:hover{background-color:lightgrey;transition:0.3s}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Modal from \\"$lib/components/modals/Modal.svelte\\";\\nimport { setRefreshToken, setSalt, setToken } from \\"$lib/session\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios\\";\\nimport { hasRole } from \\"$lib/roles\\";\\nimport ChangeMasterPassword from \\"$lib/components/modals/content/ChangeMasterPassword.svelte\\";\\nimport MediaQuery from \\"$lib/components/MediaQuery.svelte\\";\\nimport Sidebar from \\"$lib/components/Sidebar.svelte\\";\\nlet isOpen = false;\\nlet mode = \\"lock\\";\\n$: isAdmin = hasRole(\\"admin\\");\\n$: logout = async () => {\\n  await axiosInstance.post(\\"/auth/account/logout\\");\\n  setSalt(\\"\\");\\n  setToken(\\"\\");\\n  setRefreshToken(\\"\\");\\n  axiosInstance.defaults.headers.common[\\"Authorization\\"] = \\"\\";\\n  await goto(\\"/login\\");\\n};\\nlet hamburgerQuery = \\"(max-width: 600px)\\";\\nlet navbarQuery = \\"(min-width: 601px)\\";\\n<\/script>\\n\\n<Modal bind:isOpen>\\n  {#if mode === \\"change\\"}\\n    <ChangeMasterPassword bind:isOpen></ChangeMasterPassword>\\n  {/if}\\n</Modal>\\n<MediaQuery query={hamburgerQuery}><Sidebar></Sidebar></MediaQuery>\\n<MediaQuery query={navbarQuery}>\\n  <nav>\\n    <div class=\\"controls\\">\\n      <button class=\\"vault\\" on:click={() => goto(\\"/vault\\")}>Vault</button>\\n      <button\\n        on:click={() => {\\n          mode = \\"change\\";\\n          isOpen = true;\\n        }}>Change Master Password</button\\n      >\\n      {#if isAdmin}\\n        <button class=\\"users\\" on:click={() => goto(\\"/users\\")}>Users</button>\\n      {/if}\\n\\n      <button class=\\"logout\\" on:click={logout}>Logout</button>\\n    </div>\\n  </nav></MediaQuery\\n>\\n<slot></slot>\\n\\n<style>\\n  nav {\\n    background-color: white;\\n    width: 100%;\\n    position: fixed;\\n    display: flex;\\n    justify-content: flex-end;\\n    z-index: 2;\\n    height: fit-content;\\n  }\\n\\n  button {\\n    color: grey;\\n    padding: 20px;\\n    cursor: pointer;\\n    background-color: white;\\n    font-size: 1.2em;\\n    font-family: Verdana, Geneva, Tahoma, sans-serif;\\n    border: none;\\n  }\\n\\n  button:hover {\\n    background-color: lightgrey;\\n    transition: 0.3s;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkDE,kBAAI,CACF,gBAAgB,CAAE,KAAK,CACvB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,QAAQ,CACzB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,WACV,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,OAAO,CACf,gBAAgB,CAAE,KAAK,CACvB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,OAAO,CAAC,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,CAAC,UAAU,CAChD,MAAM,CAAE,IACV,CAEA,qBAAM,MAAO,CACX,gBAAgB,CAAE,SAAS,CAC3B,UAAU,CAAE,IACd"}'
};
let hamburgerQuery = "(max-width: 600px)";
let navbarQuery = "(min-width: 601px)";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isAdmin;
  let isOpen = false;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    isAdmin = hasRole("admin");
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
          return `${``}`;
        }
      }
    )} ${validate_component(MediaQuery, "MediaQuery").$$render($$result, { query: hamburgerQuery }, {}, {
      default: () => {
        return `${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}`;
      }
    })} ${validate_component(MediaQuery, "MediaQuery").$$render($$result, { query: navbarQuery }, {}, {
      default: () => {
        return `<nav class="svelte-151g2g2"><div class="controls"><button class="vault svelte-151g2g2" data-svelte-h="svelte-1kdmd62">Vault</button> <button class="svelte-151g2g2" data-svelte-h="svelte-893euc">Change Master Password</button> ${isAdmin ? `<button class="users svelte-151g2g2" data-svelte-h="svelte-1wjx4u">Users</button>` : ``} <button class="logout svelte-151g2g2" data-svelte-h="svelte-1pvvsj5">Logout</button></div></nav>`;
      }
    })} ${slots.default ? slots.default({}) : ``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Layout as default
};