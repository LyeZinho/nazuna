import { k as attr_style, j as stringify, c as escape_html } from "./index.js";
function StatCard($$renderer, $$props) {
  let { label, value, icon, color } = $$props;
  const colorMap = {
    blue: {
      bg: "rgba(59, 130, 246, 0.1)",
      border: "#3b82f6",
      glow: "rgba(59, 130, 246, 0.3)"
    },
    purple: {
      bg: "rgba(139, 92, 246, 0.1)",
      border: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.3)"
    },
    cyan: {
      bg: "rgba(6, 182, 212, 0.1)",
      border: "#06b6d4",
      glow: "rgba(6, 182, 212, 0.3)"
    },
    pink: {
      bg: "rgba(236, 72, 153, 0.1)",
      border: "#ec4899",
      glow: "rgba(236, 72, 153, 0.3)"
    }
  };
  $$renderer.push(`<div class="stat-card svelte-17xvzis"${attr_style(`--card-color: ${stringify(colorMap[color].border)}; --card-bg: ${stringify(colorMap[color].bg)}; --card-glow: ${stringify(colorMap[color].glow)}`)}><div class="stat-icon svelte-17xvzis">`);
  if (icon === "users") {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`);
  } else if (icon === "user-check") {
    $$renderer.push("<!--[1-->");
    $$renderer.push(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>`);
  } else if (icon === "server") {
    $$renderer.push("<!--[2-->");
    $$renderer.push(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`);
  } else if (icon === "box") {
    $$renderer.push("<!--[3-->");
    $$renderer.push(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div> <div class="stat-content svelte-17xvzis"><span class="stat-value svelte-17xvzis">${escape_html(value)}</span> <span class="stat-label svelte-17xvzis">${escape_html(label)}</span></div></div>`);
}
export {
  StatCard as S
};
