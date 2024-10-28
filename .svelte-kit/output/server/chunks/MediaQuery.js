import { c as create_ssr_component } from "./ssr.js";
const MediaQuery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { query = "" } = $$props;
  let matches = false;
  function handleMediaQuery() {
    const mediaQueryList = window.matchMedia(query);
    matches = mediaQueryList.matches;
    mediaQueryList.onchange = (event) => {
      matches = event.matches;
    };
  }
  if ($$props.query === void 0 && $$bindings.query && query !== void 0) $$bindings.query(query);
  {
    handleMediaQuery();
  }
  return ` ${matches ? `${slots.default ? slots.default({}) : ``}` : ``}`;
});
export {
  MediaQuery as M
};
