

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.90Fmr86R.js","_app/immutable/chunks/scheduler.DLXp1mf0.js","_app/immutable/chunks/index.CDjF2aYJ.js","_app/immutable/chunks/entry.DszAjk8y.js"];
export const stylesheets = [];
export const fonts = [];
