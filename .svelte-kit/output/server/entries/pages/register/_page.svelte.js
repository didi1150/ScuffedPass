import { c as create_ssr_component, a as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import "../../../chunks/axios.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "", password = "";
  return `<div><form><label for="email" data-svelte-h="svelte-1p9d3fm">Email</label> <input type="text" name="email" id="email"${add_attribute("value", email)}> <label for="password" data-svelte-h="svelte-pepa0a">Password</label> <input type="password" name="password" id="password"${add_attribute("value", password)}> <button type="submit" data-svelte-h="svelte-1s7k2qu">Register</button> <p data-svelte-h="svelte-l5aju1">Already have an account? Click <a href="login">here</a> to login</p></form></div>`;
});
export {
  Page as default
};
