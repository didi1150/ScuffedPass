

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DimRGS5L.js","_app/immutable/chunks/scheduler.DLXp1mf0.js","_app/immutable/chunks/index.CDjF2aYJ.js"];
export const stylesheets = [];
export const fonts = [];
