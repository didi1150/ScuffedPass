import { c as create_ssr_component, e as escape, v as validate_component, b as each } from "../../../../../chunks/ssr.js";
import { M as MediaQuery } from "../../../../../chunks/MediaQuery.js";
import { i as invalidateAll } from "../../../../../chunks/client.js";
import { M as Modal } from "../../../../../chunks/Modal.js";
/* empty css                                                                */
import { a as axiosInstance } from "../../../../../chunks/session.js";
const css$2 = {
  code: "h2.svelte-1bj7427{text-align:center;font-weight:500}p.svelte-1bj7427{text-align:center;color:red}.buttons.svelte-1bj7427{display:flex;justify-content:center}button.svelte-1bj7427{width:100px;height:50px;border-radius:50px;border:none;font-size:1.5em;font-weight:900;cursor:pointer;color:white}.yes.svelte-1bj7427{margin-right:10px;background-color:limegreen}.no.svelte-1bj7427{background-color:red}",
  map: '{"version":3,"file":"ConfirmAction.svelte","sources":["ConfirmAction.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { invalidateAll } from \\"$app/navigation\\";\\nexport let isOpen;\\nexport let question;\\nexport let errorMessage;\\nexport let callback;\\nlet error = false;\\n<\/script>\\r\\n\\r\\n<h2>{question}</h2>\\r\\n<div class=\\"buttons\\">\\r\\n  <button\\r\\n    class=\\"yes\\"\\r\\n    on:click={() => {\\r\\n      callback();\\r\\n      invalidateAll();\\r\\n    }}>Yes</button\\r\\n  >\\r\\n  <button class=\\"no\\" on:click={() => (isOpen = false)}>No</button>\\r\\n</div>\\r\\n{#if error}\\r\\n  <p>{errorMessage}</p>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n  h2 {\\r\\n    text-align: center;\\r\\n    font-weight: 500;\\r\\n  }\\r\\n\\r\\n  p {\\r\\n    text-align: center;\\r\\n    color: red;\\r\\n  }\\r\\n  .buttons {\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n  }\\r\\n  button {\\r\\n    width: 100px;\\r\\n    height: 50px;\\r\\n    border-radius: 50px;\\r\\n    border: none;\\r\\n    font-size: 1.5em;\\r\\n    font-weight: 900;\\r\\n    cursor: pointer;\\r\\n    color: white;\\r\\n  }\\r\\n  .yes {\\r\\n    margin-right: 10px;\\r\\n    background-color: limegreen;\\r\\n  }\\r\\n  .no {\\r\\n    background-color: red;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAwBE,iBAAG,CACD,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,GACf,CAEA,gBAAE,CACA,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,GACT,CACA,uBAAS,CACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MACnB,CACA,qBAAO,CACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,KACT,CACA,mBAAK,CACH,YAAY,CAAE,IAAI,CAClB,gBAAgB,CAAE,SACpB,CACA,kBAAI,CACF,gBAAgB,CAAE,GACpB"}'
};
const ConfirmAction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen } = $$props;
  let { question } = $$props;
  let { errorMessage } = $$props;
  let { callback } = $$props;
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
  if ($$props.question === void 0 && $$bindings.question && question !== void 0) $$bindings.question(question);
  if ($$props.errorMessage === void 0 && $$bindings.errorMessage && errorMessage !== void 0) $$bindings.errorMessage(errorMessage);
  if ($$props.callback === void 0 && $$bindings.callback && callback !== void 0) $$bindings.callback(callback);
  $$result.css.add(css$2);
  return `<h2 class="svelte-1bj7427">${escape(question)}</h2> <div class="buttons svelte-1bj7427"><button class="yes svelte-1bj7427" data-svelte-h="svelte-15mnb1u">Yes</button> <button class="no svelte-1bj7427" data-svelte-h="svelte-hit1l0">No</button></div> ${``}`;
});
const css$1 = {
  code: ".background.svelte-zaxcxq.svelte-zaxcxq{position:relative;display:flex;justify-content:center;align-items:center;color:white;height:100%}table.svelte-zaxcxq.svelte-zaxcxq{border:2px solid white;border-radius:20px;display:block;overflow-y:scroll;max-height:400px;border-collapse:collapse}table.svelte-zaxcxq.svelte-zaxcxq::-webkit-scrollbar{display:none}td.svelte-zaxcxq.svelte-zaxcxq{padding:25px;text-align:center}th.svelte-zaxcxq.svelte-zaxcxq{width:75px;padding:20px}thead.svelte-zaxcxq.svelte-zaxcxq{position:sticky;top:0;background:blur(15);background-color:rgb(60, 68, 97)}.empty.svelte-zaxcxq.svelte-zaxcxq{border-radius:10px;padding:20px;display:flex;justify-content:center}.empty.svelte-zaxcxq span.svelte-zaxcxq{opacity:50%}button.svelte-zaxcxq.svelte-zaxcxq{width:50px;height:50px;margin-top:8px;background:transparent;border:none;border-radius:100%;cursor:pointer;font-size:2em}",
  map: '{"version":3,"file":"UserTable.svelte","sources":["UserTable.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { invalidateAll } from \\"$app/navigation\\";\\nexport let users;\\nimport Modal from \\"$lib/components/modals/Modal.svelte\\";\\nimport ConfirmAction from \\"$lib/components/modals/content/ConfirmAction.svelte\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios\\";\\nlet isOpen = false;\\nlet mode = \\"delete\\";\\nlet selectedUserId;\\n<\/script>\\r\\n\\r\\n<Modal bind:isOpen>\\r\\n  {#if mode === \\"delete\\"}\\r\\n    <ConfirmAction\\r\\n      bind:isOpen\\r\\n      question=\\"Do you want to delete this user?\\"\\r\\n      errorMessage=\\"Couldn\'t delete this user\\"\\r\\n      callback={() => {\\r\\n        axiosInstance\\r\\n          .delete(`/admin/delete?id=${selectedUserId}`)\\r\\n          .then((result) => {\\r\\n            if (result.status === 200) isOpen = false;\\r\\n          })\\r\\n          .finally(invalidateAll);\\r\\n      }}\\r\\n    ></ConfirmAction>\\r\\n  {/if}\\r\\n</Modal>\\r\\n<div class=\\"background\\">\\r\\n  <div class=\\"vault-box\\">\\r\\n    <table>\\r\\n      <thead>\\r\\n        <tr class=\\"header\\">\\r\\n          <th>Id</th>\\r\\n          <th>Email</th>\\r\\n          <th>Enabled</th>\\r\\n          <th>Locked</th>\\r\\n          <th>Created At</th>\\r\\n          <th>Delete</th>\\r\\n        </tr><tr />\\r\\n      </thead>\\r\\n\\r\\n      <tbody>\\r\\n        {#each users as row}\\r\\n          <tr>\\r\\n            {#each Object.values(row) as value}\\r\\n              <td>{value}</td>\\r\\n            {/each}\\r\\n            <td\\r\\n              ><button\\r\\n                on:click={() => {\\r\\n                  mode = \\"delete\\";\\r\\n                  selectedUserId = row.id;\\r\\n                  isOpen = true;\\r\\n                }}\\r\\n              >\\r\\n                <svg\\r\\n                  xmlns=\\"http://www.w3.org/2000/svg\\"\\r\\n                  width=\\"1em\\"\\r\\n                  height=\\"1em\\"\\r\\n                  viewBox=\\"0 0 24 24\\"\\r\\n                  ><path\\r\\n                    fill=\\"#ff0000\\"\\r\\n                    d=\\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z\\"\\r\\n                  /></svg\\r\\n                >\\r\\n              </button></td\\r\\n            >\\r\\n          </tr>\\r\\n        {/each}\\r\\n      </tbody>\\r\\n      {#if users.length == 0}\\r\\n        <div class=\\"empty\\">\\r\\n          <span>Nothing to show here</span>\\r\\n        </div>\\r\\n      {/if}\\r\\n    </table>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .background {\\r\\n    position: relative;\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n    align-items: center;\\r\\n    color: white;\\r\\n    height: 100%;\\r\\n  }\\r\\n\\r\\n  table {\\r\\n    border: 2px solid white;\\r\\n    border-radius: 20px;\\r\\n    display: block;\\r\\n    overflow-y: scroll;\\r\\n    max-height: 400px;\\r\\n    border-collapse: collapse;\\r\\n  }\\r\\n\\r\\n  table::-webkit-scrollbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  td {\\r\\n    padding: 25px;\\r\\n    text-align: center;\\r\\n  }\\r\\n\\r\\n  th {\\r\\n    width: 75px;\\r\\n    padding: 20px;\\r\\n  }\\r\\n\\r\\n  thead {\\r\\n    position: sticky;\\r\\n    top: 0;\\r\\n    background: blur(15);\\r\\n    background-color: rgb(60, 68, 97);\\r\\n  }\\r\\n\\r\\n  .empty {\\r\\n    border-radius: 10px;\\r\\n    padding: 20px;\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n  }\\r\\n\\r\\n  .empty span {\\r\\n    opacity: 50%;\\r\\n  }\\r\\n\\r\\n  button {\\r\\n    width: 50px;\\r\\n    height: 50px;\\r\\n    margin-top: 8px;\\r\\n    background: transparent;\\r\\n    border: none;\\r\\n    border-radius: 100%;\\r\\n    cursor: pointer;\\r\\n    font-size: 2em;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAgFE,uCAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IACV,CAEA,iCAAM,CACJ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,KAAK,CACjB,eAAe,CAAE,QACnB,CAEA,iCAAK,mBAAoB,CACvB,OAAO,CAAE,IACX,CAEA,8BAAG,CACD,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MACd,CAEA,8BAAG,CACD,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IACX,CAEA,iCAAM,CACJ,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,CACN,UAAU,CAAE,KAAK,EAAE,CAAC,CACpB,gBAAgB,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAClC,CAEA,kCAAO,CACL,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MACnB,CAEA,oBAAM,CAAC,kBAAK,CACV,OAAO,CAAE,GACX,CAEA,kCAAO,CACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,GAAG,CACf,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,GACb"}'
};
const UserTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { users } = $$props;
  let isOpen = false;
  let selectedUserId;
  if ($$props.users === void 0 && $$bindings.users && users !== void 0) $$bindings.users(users);
  $$result.css.add(css$1);
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
          return `${`${validate_component(ConfirmAction, "ConfirmAction").$$render(
            $$result,
            {
              question: "Do you want to delete this user?",
              errorMessage: "Couldn't delete this user",
              callback: () => {
                axiosInstance.delete(`/admin/delete?id=${selectedUserId}`).then((result) => {
                  if (result.status === 200) isOpen = false;
                }).finally(invalidateAll);
              },
              isOpen
            },
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
    )} <div class="background svelte-zaxcxq"><div class="vault-box"><table class="svelte-zaxcxq"><thead class="svelte-zaxcxq" data-svelte-h="svelte-15iijx0"><tr class="header"><th class="svelte-zaxcxq">Id</th> <th class="svelte-zaxcxq">Email</th> <th class="svelte-zaxcxq">Enabled</th> <th class="svelte-zaxcxq">Locked</th> <th class="svelte-zaxcxq">Created At</th> <th class="svelte-zaxcxq">Delete</th> </tr><tr></tr></thead> <tbody>${each(users, (row) => {
      return `<tr>${each(Object.values(row), (value) => {
        return `<td class="svelte-zaxcxq">${escape(value)}</td>`;
      })} <td class="svelte-zaxcxq"><button class="svelte-zaxcxq" data-svelte-h="svelte-oblaxo"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ff0000" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg> </button></td> </tr>`;
    })}</tbody> ${users.length == 0 ? `<div class="empty svelte-zaxcxq" data-svelte-h="svelte-ipshvi"><span class="svelte-zaxcxq">Nothing to show here</span></div>` : ``}</table></div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: ".anchor.svelte-1g64iky.svelte-1g64iky{display:flex;justify-content:center;align-items:center;height:100%}ul.svelte-1g64iky.svelte-1g64iky{margin:0;padding:0;width:80%;height:60%;border:2px solid white;border-radius:20px;position:relative;display:block;overflow-y:scroll;scrollbar-width:thin;scrollbar-color:white rgba(0, 0, 0, 0)}.empty.svelte-1g64iky.svelte-1g64iky{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center}.empty.svelte-1g64iky span.svelte-1g64iky{font-size:1.5em;color:white;opacity:50%;word-break:break-all}ul.svelte-1g64iky li.svelte-1g64iky{display:flex;flex-direction:row;justify-content:space-between;width:100%;border-bottom:2px dashed white}ul.svelte-1g64iky li .details.svelte-1g64iky{color:white;padding:10px 0;margin-left:20px;display:flex;flex-direction:column;justify-content:center;flex-grow:1;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;min-width:0;font-size:1.5em}.email.svelte-1g64iky.svelte-1g64iky{font-weight:lighter}ul.svelte-1g64iky li.svelte-1g64iky:nth-child(even){background-color:rgba(0, 0, 0, 0.5)}ul.svelte-1g64iky li.svelte-1g64iky:nth-child(odd){background-color:rgba(0, 0, 0, 0.1)}ul.svelte-1g64iky li .controls.svelte-1g64iky{width:100px;height:200px;border-left:2px solid white;flex-shrink:0;margin-left:20px;text-align:center;display:flex;justify-content:center;align-items:center;flex-direction:column}ul.svelte-1g64iky li .controls svg.svelte-1g64iky{font-size:2.5em}.details.svelte-1g64iky div.svelte-1g64iky{word-wrap:break-word}.svg-container.svelte-1g64iky.svelte-1g64iky{background-color:transparent;padding:10px;margin:5px;border-radius:20px;outline:none;border:none}@media(max-width: 360px){ul.svelte-1g64iky.svelte-1g64iky{height:calc(100% - 150px);border:none;border-bottom:2px solid white;width:100%;font-size:0.7em;border-radius:0px}.anchor.svelte-1g64iky.svelte-1g64iky{display:block}}",
  map: '{"version":3,"file":"UserTableMobile.svelte","sources":["UserTableMobile.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Modal from \\"$lib/components/modals/Modal.svelte\\";\\nimport ConfirmAction from \\"$lib/components/modals/content/ConfirmAction.svelte\\";\\nimport { axiosInstance } from \\"$lib/interceptors/axios\\";\\nimport { invalidateAll } from \\"$app/navigation\\";\\nimport { onMount } from \\"svelte\\";\\nexport let users;\\nlet isOpen = false;\\nlet mode = \\"delete\\";\\nlet selectedUserId;\\nonMount(async () => {\\n});\\n<\/script>\\n\\n<Modal bind:isOpen>\\n  {#if mode === \\"delete\\"}\\n    <ConfirmAction\\n      errorMessage=\\"Couldn\'t delete this password\\"\\n      callback={() => {\\n        axiosInstance;\\n        axiosInstance\\n          .delete(`/admin/delete?id=${selectedUserId}`)\\n          .then((result) => {\\n            if (result.status === 200) isOpen = false;\\n          })\\n          .finally(invalidateAll);\\n      }}\\n      question=\\"Do you want to delete this user?\\"\\n      bind:isOpen\\n    ></ConfirmAction>\\n  {/if}\\n</Modal>\\n\\n<div class=\\"anchor\\">\\n  <ul>\\n    {#if users.length == 0}\\n      <div class=\\"empty\\">\\n        <span>Nothing to show here</span>\\n      </div>\\n    {/if}\\n    {#each users as user}\\n      <li>\\n        <div class=\\"details\\">\\n          <div class=\\"id\\">\\n            ID: {user.id}\\n          </div>\\n          <div class=\\"email\\">\\n            {user.email}\\n          </div>\\n          <div class=\\"Created At\\">Created at: {user.createdAt}</div>\\n        </div>\\n        <div class=\\"controls\\">\\n          <button\\n            class=\\"svg-container\\"\\n            on:click={() => {\\n              mode = \\"delete\\";\\n              selectedUserId = user.id;\\n              isOpen = true;\\n            }}\\n            ><svg\\n              xmlns=\\"http://www.w3.org/2000/svg\\"\\n              width=\\"1em\\"\\n              height=\\"1em\\"\\n              viewBox=\\"0 0 24 24\\"\\n              ><path\\n                fill=\\"#ff0000\\"\\n                d=\\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z\\"\\n              /></svg\\n            ></button\\n          >\\n        </div>\\n      </li>\\n    {/each}\\n  </ul>\\n</div>\\n\\n<style>\\n  .anchor {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    height: 100%;\\n  }\\n\\n  ul {\\n    margin: 0;\\n    padding: 0;\\n    width: 80%;\\n    height: 60%;\\n    border: 2px solid white;\\n    border-radius: 20px;\\n    position: relative;\\n    display: block;\\n    overflow-y: scroll;\\n\\n    scrollbar-width: thin;\\n    scrollbar-color: white rgba(0, 0, 0, 0);\\n  }\\n\\n  .empty {\\n    width: 100%;\\n    height: 100%;\\n    position: relative;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n\\n  .empty span {\\n    font-size: 1.5em;\\n    color: white;\\n    opacity: 50%;\\n    word-break: break-all;\\n  }\\n\\n  ul li {\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-between;\\n    width: 100%;\\n    border-bottom: 2px dashed white;\\n  }\\n\\n  ul li .details {\\n    color: white;\\n    padding: 10px 0;\\n    margin-left: 20px;\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    flex-grow: 1; /* Allow details to take up remaining space */\\n    overflow-wrap: break-word; /* Break long words if needed */\\n    word-wrap: break-word; /* Fallback for older browsers */\\n    word-break: break-word;\\n    min-width: 0; /* Ensure text can shrink to fit available space */\\n    font-size: 1.5em;\\n  }\\n\\n  .website {\\n    font-weight: bold;\\n  }\\n\\n  .email {\\n    font-weight: lighter;\\n  }\\n\\n  ul li:nth-child(even) {\\n    background-color: rgba(0, 0, 0, 0.5);\\n  }\\n\\n  ul li:nth-child(odd) {\\n    background-color: rgba(0, 0, 0, 0.1);\\n  }\\n\\n  ul li .controls {\\n    width: 100px;\\n    height: 200px;\\n    border-left: 2px solid white;\\n    flex-shrink: 0; /* Prevent controls from shrinking */\\n    margin-left: 20px; /* Optional: Add space between details and controls */\\n    text-align: center; /* Align controls content to the right */\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    flex-direction: column;\\n  }\\n\\n  ul li .controls svg {\\n    font-size: 2.5em;\\n  }\\n\\n  .details div {\\n    word-wrap: break-word;\\n  }\\n\\n  .svg-container {\\n    background-color: transparent;\\n    padding: 10px;\\n    margin: 5px;\\n    border-radius: 20px;\\n    outline: none;\\n    border: none;\\n  }\\n\\n  @media (max-width: 360px) {\\n    ul {\\n      height: calc(100% - 150px);\\n      border: none;\\n      border-bottom: 2px solid white;\\n      width: 100%;\\n      font-size: 0.7em;\\n      border-radius: 0px;\\n    }\\n\\n    .anchor {\\n      display: block;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
};
const UserTableMobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { users } = $$props;
  let isOpen = false;
  let selectedUserId;
  if ($$props.users === void 0 && $$bindings.users && users !== void 0) $$bindings.users(users);
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
          return `${`${validate_component(ConfirmAction, "ConfirmAction").$$render(
            $$result,
            {
              errorMessage: "Couldn't delete this password",
              callback: () => {
                axiosInstance.delete(`/admin/delete?id=${selectedUserId}`).then((result) => {
                  if (result.status === 200) isOpen = false;
                }).finally(invalidateAll);
              },
              question: "Do you want to delete this user?",
              isOpen
            },
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
    )} <div class="anchor svelte-1g64iky"><ul class="svelte-1g64iky">${users.length == 0 ? `<div class="empty svelte-1g64iky" data-svelte-h="svelte-1kzj0e"><span class="svelte-1g64iky">Nothing to show here</span></div>` : ``} ${each(users, (user) => {
      return `<li class="svelte-1g64iky"><div class="details svelte-1g64iky"><div class="id svelte-1g64iky">ID: ${escape(user.id)}</div> <div class="email svelte-1g64iky">${escape(user.email)}</div> <div class="Created At svelte-1g64iky">Created at: ${escape(user.createdAt)}</div></div> <div class="controls svelte-1g64iky"><button class="svg-container svelte-1g64iky" data-svelte-h="svelte-1i6xcky"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="svelte-1g64iky"><path fill="#ff0000" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg></button></div> </li>`;
    })}</ul> </div>`;
  } while (!$$settled);
  return $$rendered;
});
let mobileQuery = "(max-width: 1100px)";
let desktopQuery = "(min-width: 1101px)";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(MediaQuery, "MediaQuery").$$render($$result, { query: mobileQuery }, {}, {
    default: () => {
      return `${validate_component(UserTableMobile, "UserTableMobile").$$render($$result, { users: data.users }, {}, {})}`;
    }
  })} ${validate_component(MediaQuery, "MediaQuery").$$render($$result, { query: desktopQuery }, {}, {
    default: () => {
      return `${validate_component(UserTable, "UserTable").$$render($$result, { users: data.users }, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
