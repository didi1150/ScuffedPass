import * as universal from '../entries/pages/vault/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/vault/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/vault/+page.ts";
export const imports = ["_app/immutable/nodes/5.B7VzWCFR.js","_app/immutable/chunks/axios.B3ERvgox.js","_app/immutable/chunks/entry.ChMssdJ8.js","_app/immutable/chunks/scheduler.B1oJxWRp.js","_app/immutable/chunks/index.DtR5D7br.js","_app/immutable/chunks/stores.CCV25G2G.js","_app/immutable/chunks/authenticationCheck.D5ITmbYD.js"];
export const stylesheets = ["_app/immutable/assets/5.DvDGbhwd.css"];
export const fonts = [];
