

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DpRhF-UD.js","_app/immutable/chunks/scheduler.B1oJxWRp.js","_app/immutable/chunks/index.DtR5D7br.js","_app/immutable/chunks/entry.ChMssdJ8.js","_app/immutable/chunks/axios.B3ERvgox.js"];
export const stylesheets = ["_app/immutable/assets/3.vHzbCXD6.css"];
export const fonts = [];
