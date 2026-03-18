import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.B84ho8wz.js","_app/immutable/chunks/Ba4oGplt.js","_app/immutable/chunks/D8lIUDP2.js","_app/immutable/chunks/B3i0r4sX.js","_app/immutable/chunks/C_SZc-zE.js","_app/immutable/chunks/BtimIro1.js","_app/immutable/chunks/BUhy33w6.js","_app/immutable/chunks/DszqIPCx.js","_app/immutable/chunks/CdFps_uM.js","_app/immutable/chunks/IC-rXPy1.js","_app/immutable/chunks/BIhItLcp.js"];
export const stylesheets = ["_app/immutable/assets/0.md6YX718.css"];
export const fonts = [];
