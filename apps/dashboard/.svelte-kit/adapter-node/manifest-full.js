export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.B_N07aOe.js",app:"_app/immutable/entry/app.Bwt91aLw.js",imports:["_app/immutable/entry/start.B_N07aOe.js","_app/immutable/chunks/rR6jtiIk.js","_app/immutable/chunks/D8lIUDP2.js","_app/immutable/chunks/B8JeMPfk.js","_app/immutable/chunks/BIhItLcp.js","_app/immutable/entry/app.Bwt91aLw.js","_app/immutable/chunks/D8lIUDP2.js","_app/immutable/chunks/Ba4oGplt.js","_app/immutable/chunks/BIhItLcp.js","_app/immutable/chunks/B3i0r4sX.js","_app/immutable/chunks/DagnnaL0.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/auth/discord/callback",
				pattern: /^\/auth\/discord\/callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/characters",
				pattern: /^\/characters\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/characters/[id]",
				pattern: /^\/characters\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/user/[id]",
				pattern: /^\/user\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
