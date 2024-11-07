import { c as create_ssr_component, e as escape, d as spread, f as escape_attribute_value, h as escape_object, a as add_attribute } from "./ssr.js";
/* empty css                                       */
const css = {
  code: ".input-box.svelte-1ve2cxg.svelte-1ve2cxg.svelte-1ve2cxg{position:relative;margin:30px 0px;border-bottom:2px solid white}.input-box.svelte-1ve2cxg label.svelte-1ve2cxg.svelte-1ve2cxg{position:absolute;top:50%;left:5px;transform:translateY(-50%);font-size:1.25em;color:white;pointer-events:none;transition:0.5s}.input-box.svelte-1ve2cxg input.svelte-1ve2cxg:focus~label.svelte-1ve2cxg,.input-box.has-content.svelte-1ve2cxg label.svelte-1ve2cxg.svelte-1ve2cxg{top:-5px}.input-box.svelte-1ve2cxg input.svelte-1ve2cxg.svelte-1ve2cxg{width:100%;height:50px;background:transparent;border:none;outline:none;font-size:1.25em;color:white;padding:0 0 0 5px}",
  map: '{"version":3,"file":"InputBox.svelte","sources":["InputBox.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let id = \\"\\";\\nexport let type = \\"text\\";\\nexport let label = \\"\\";\\nexport let value = \\"\\";\\nexport let required = false;\\nexport let width = \\"100%\\";\\n$: hasContent = value.length > 0;\\n<\/script>\\r\\n\\r\\n<div class=\\"input-box\\" class:has-content={hasContent} style=\\"width: {width};\\">\\r\\n  <input {id} {...{ type }} {required} bind:value on:focus on:blur />\\r\\n  <label for={id}>{label}</label>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .input-box {\\r\\n    position: relative;\\r\\n    margin: 30px 0px;\\r\\n    border-bottom: 2px solid white;\\r\\n  }\\r\\n\\r\\n  .input-box label {\\r\\n    position: absolute;\\r\\n    top: 50%;\\r\\n    left: 5px;\\r\\n    transform: translateY(-50%);\\r\\n    font-size: 1.25em;\\r\\n    color: white;\\r\\n    pointer-events: none;\\r\\n    transition: 0.5s;\\r\\n  }\\r\\n\\r\\n  .input-box input:focus ~ label,\\r\\n  .input-box.has-content label {\\r\\n    top: -5px;\\r\\n  }\\r\\n\\r\\n  .input-box input {\\r\\n    width: 100%;\\r\\n    height: 50px;\\r\\n    background: transparent;\\r\\n    border: none;\\r\\n    outline: none;\\r\\n    font-size: 1.25em;\\r\\n    color: white;\\r\\n    padding: 0 0 0 5px;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAeE,uDAAW,CACT,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CAAC,GAAG,CAChB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAC3B,CAEA,yBAAU,CAAC,mCAAM,CACf,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,IACd,CAEA,yBAAU,CAAC,oBAAK,MAAM,CAAG,oBAAK,CAC9B,UAAU,2BAAY,CAAC,mCAAM,CAC3B,GAAG,CAAE,IACP,CAEA,yBAAU,CAAC,mCAAM,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GACjB"}'
};
const InputBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasContent;
  let { id = "" } = $$props;
  let { type = "text" } = $$props;
  let { label = "" } = $$props;
  let { value = "" } = $$props;
  let { required = false } = $$props;
  let { width = "100%" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  $$result.css.add(css);
  hasContent = value.length > 0;
  return `<div class="${["input-box svelte-1ve2cxg", hasContent ? "has-content" : ""].join(" ").trim()}" style="${"width: " + escape(width, true) + ";"}"><input${spread(
    [
      { id: escape_attribute_value(id) },
      escape_object({ type }),
      { required: required || null }
    ],
    { classes: "svelte-1ve2cxg" }
  )}${add_attribute("value", value, 0)}> <label${add_attribute("for", id, 0)} class="svelte-1ve2cxg">${escape(label)}</label> </div>`;
});
export {
  InputBox as I
};
