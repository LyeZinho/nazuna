import { e as ensure_array_like, a as attr, b as attr_class, s as store_get, c as escape_html, d as unsubscribe_stores } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const navItems = [
      { href: "/", label: "Home", icon: "home" },
      { href: "/characters", label: "Characters", icon: "users" },
      { href: "/rankings", label: "Rankings", icon: "trophy" },
      { href: "/user/me", label: "Profile", icon: "user" }
    ];
    $$renderer2.push(`<nav class="navbar glass svelte-ocbj1u"><div class="nav-content svelte-ocbj1u"><a href="/" class="logo svelte-ocbj1u"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="url(#logoGrad)" stroke-width="2"></circle><circle cx="16" cy="16" r="8" fill="url(#logoGrad)" opacity="0.3"></circle><circle cx="16" cy="16" r="4" fill="url(#logoGrad)"></circle><defs><linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32"><stop offset="0%" stop-color="#3b82f6"></stop><stop offset="100%" stop-color="#8b5cf6"></stop></linearGradient></defs></svg> <span class="logo-text gradient-text svelte-ocbj1u">Waifu<span class="accent svelte-ocbj1u">Roulette</span></span></a> <div class="nav-links svelte-ocbj1u"><!--[-->`);
    const each_array = ensure_array_like(navItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr("href", item.href)}${attr_class("nav-link svelte-ocbj1u", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith(item.href) && item.href !== "/"
      })}><span class="nav-icon svelte-ocbj1u">`);
      if (item.icon === "home") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`);
      } else if (item.icon === "users") {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`);
      } else if (item.icon === "trophy") {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`);
      } else if (item.icon === "user") {
        $$renderer2.push("<!--[3-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></span> ${escape_html(item.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="nav-auth"><button class="btn-login svelte-ocbj1u"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg> Login with Discord</button></div></div></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function BackgroundSVG($$renderer, $$props) {
  $$renderer.push(`<svg class="bg-svg svelte-10suvi" viewBox="0 0 100 100" preserveAspectRatio="none"><defs class="svelte-10suvi"><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%" class="svelte-10suvi"><stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1" class="svelte-10suvi"></stop><stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.05" class="svelte-10suvi"></stop></linearGradient><radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" class="svelte-10suvi"><stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.15" class="svelte-10suvi"></stop><stop offset="100%" style="stop-color:transparent;stop-opacity:0" class="svelte-10suvi"></stop></radialGradient><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse" class="svelte-10suvi"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(99,102,241,0.05)" stroke-width="0.5" class="svelte-10suvi"></path></pattern><filter id="noise" class="svelte-10suvi"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" class="svelte-10suvi"></feTurbulence><feColorMatrix type="saturate" values="0" class="svelte-10suvi"></feColorMatrix><feComponentTransfer class="svelte-10suvi"><feFuncA type="linear" slope="0.05" class="svelte-10suvi"></feFuncA></feComponentTransfer></filter></defs><rect width="100%" height="100%" fill="url(#grad1)" class="svelte-10suvi"></rect><circle cx="20" cy="20" r="30" fill="url(#grad2)" class="floating-circle svelte-10suvi"></circle><circle cx="80" cy="70" r="25" fill="url(#grad2)" class="floating-circle svelte-10suvi" style="animation-delay: -1s"></circle><circle cx="60" cy="30" r="15" fill="url(#grad2)" class="floating-circle svelte-10suvi" style="animation-delay: -2s"></circle><rect width="100%" height="100%" fill="url(#grid)" class="svelte-10suvi"></rect><rect width="100%" height="100%" filter="url(#noise)" opacity="0.3" class="svelte-10suvi"></rect></svg>`);
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  BackgroundSVG($$renderer);
  $$renderer.push(`<!----> <div class="app-container svelte-12qhfyh">`);
  Navigation($$renderer);
  $$renderer.push(`<!----> <main class="svelte-12qhfyh">`);
  children($$renderer);
  $$renderer.push(`<!----></main></div>`);
}
export {
  _layout as default
};
