import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
import "../../chunks/axios.js";
import "../../chunks/client.js";
import { p as page } from "../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let message = "You are not logged in";
  $page.url.pathname;
  $$unsubscribe_page();
  return `<div class="container mt-5 text-center"><h3>${escape(message)}</h3> <a href="javascript:void(0)" class="btn btn-lg btn-primary" data-svelte-h="svelte-1h40d2k">Logout</a> <a href="/vault" data-svelte-h="svelte-gzancw">Go to Vault</a></div>`;
});
export {
  Page as default
};
