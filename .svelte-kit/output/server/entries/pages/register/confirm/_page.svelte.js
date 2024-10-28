import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const css = {
  code: "div.svelte-pr6w4a{display:flex;justify-content:center}h2.svelte-pr6w4a{color:white;word-break:normal;margin:10px;font-size:1em}a.svelte-pr6w4a{text-decoration:none;font-weight:bold;color:#73beff}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let data;\\n<\/script>\\r\\n\\r\\n<div>\\r\\n    {#if !data.success}\\r\\n        <h2>Oops something went wrong. Your token might have expired</h2>\\r\\n    {:else}\\r\\n        <h2>\\r\\n            This is your confirmation page! You can <a href=\\"/login\\">login</a> now\\r\\n        </h2>\\r\\n    {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    div {\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n    }\\r\\n    h2 {\\r\\n        color: white;\\r\\n        word-break: normal;\\r\\n        margin: 10px;\\r\\n        font-size: 1em;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        text-decoration: none;\\r\\n        font-weight: bold;\\r\\n        color: #73beff;\\r\\n    }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAcI,iBAAI,CACA,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MACrB,CACA,gBAAG,CACC,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,GACf,CAEA,eAAE,CACE,eAAe,CAAE,IAAI,CACrB,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OACX"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="svelte-pr6w4a">${!data.success ? `<h2 class="svelte-pr6w4a" data-svelte-h="svelte-a1d77a">Oops something went wrong. Your token might have expired</h2>` : `<h2 class="svelte-pr6w4a" data-svelte-h="svelte-ctbke1">This is your confirmation page! You can <a href="/login" class="svelte-pr6w4a">login</a> now</h2>`} </div>`;
});
export {
  Page as default
};
