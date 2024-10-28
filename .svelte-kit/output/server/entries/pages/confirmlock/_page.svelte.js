import { c as create_ssr_component } from "../../../chunks/ssr.js";
const css = {
  code: "div.svelte-1ntanoa{display:flex;justify-content:center}h2.svelte-1ntanoa{color:white;word-break:normal;margin:10px;font-size:1em}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let data;\\n<\/script>\\r\\n\\r\\n<div>\\r\\n  {#if !data.success}\\r\\n    <h2>Oops something went wrong. Your token might have expired</h2>\\r\\n  {:else}\\r\\n    <h2>\\r\\n      Your account has been successfully locked. Contact the administration to\\r\\n      unlock it.\\r\\n    </h2>\\r\\n  {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  div {\\r\\n    display: flex;\\r\\n    justify-content: center;\\r\\n  }\\r\\n  h2 {\\r\\n    color: white;\\r\\n    word-break: normal;\\r\\n    margin: 10px;\\r\\n    font-size: 1em;\\r\\n  }\\r\\n\\r\\n  a {\\r\\n    text-decoration: none;\\r\\n    font-weight: bold;\\r\\n    color: #73beff;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAeE,kBAAI,CACF,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MACnB,CACA,iBAAG,CACD,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,GACb"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="svelte-1ntanoa">${!data.success ? `<h2 class="svelte-1ntanoa" data-svelte-h="svelte-a1d77a">Oops something went wrong. Your token might have expired</h2>` : `<h2 class="svelte-1ntanoa" data-svelte-h="svelte-wod9to">Your account has been successfully locked. Contact the administration to
      unlock it.</h2>`} </div>`;
});
export {
  Page as default
};
