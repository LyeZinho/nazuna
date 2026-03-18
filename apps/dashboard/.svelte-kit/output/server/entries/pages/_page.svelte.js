import { h as head, e as ensure_array_like, b as attr_class, i as spread_props, j as stringify } from "../../chunks/index.js";
import { S as StatCard } from "../../chunks/StatCard.js";
import { C as CharacterCard } from "../../chunks/CharacterCard.js";
function _page($$renderer, $$props) {
  let { data } = $$props;
  const stats = [
    {
      label: "Total Characters",
      value: "12,044",
      icon: "users",
      color: "blue"
    },
    {
      label: "Active Users",
      value: "2,847",
      icon: "user-check",
      color: "purple"
    },
    {
      label: "Servers",
      value: "156",
      icon: "server",
      color: "cyan"
    },
    {
      label: "Collections",
      value: "45,231",
      icon: "box",
      color: "pink"
    }
  ];
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Waifu Roulette - Home</title>`);
    });
  });
  $$renderer.push(`<div class="home svelte-1uha8ag"><header class="hero animate-slide-up svelte-1uha8ag"><div class="hero-content"><h1 class="hero-title svelte-1uha8ag">Collect Your <span class="gradient-text">Waifus</span></h1> <p class="hero-subtitle svelte-1uha8ag">Spin the roulette, collect anime characters, and build your collection!</p> <div class="hero-actions svelte-1uha8ag"><a href="/characters" class="btn-primary svelte-1uha8ag"><span>Explore Characters</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a> <a href="/rankings" class="btn-secondary svelte-1uha8ag">View Rankings</a></div></div> <div class="hero-visual svelte-1uha8ag"><div class="floating-cards svelte-1uha8ag"><div class="floating-card card-1 animate-float svelte-1uha8ag"><div class="card-glow svelte-1uha8ag"></div></div> <div class="floating-card card-2 animate-float svelte-1uha8ag" style="animation-delay: -1s"></div> <div class="floating-card card-3 animate-float svelte-1uha8ag" style="animation-delay: -2s"></div></div></div></header> <section class="stats-section svelte-1uha8ag"><div class="stats-grid svelte-1uha8ag"><!--[-->`);
  const each_array = ensure_array_like(stats);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let stat = each_array[i];
    $$renderer.push(`<div${attr_class(`animate-fade-in stagger-${stringify(i + 1)}`, "svelte-1uha8ag")} style="opacity: 0">`);
    StatCard($$renderer, spread_props([stat]));
    $$renderer.push(`<!----></div>`);
  }
  $$renderer.push(`<!--]--></div></section> <section class="featured-section"><div class="section-header svelte-1uha8ag"><h2 class="section-title svelte-1uha8ag"><span class="section-icon svelte-1uha8ag"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span> Top Characters</h2> <a href="/rankings" class="see-all svelte-1uha8ag">See All <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a></div> <div class="characters-grid svelte-1uha8ag">`);
  CharacterCard($$renderer, {
    name: "Eren Yeager",
    work: "Attack on Titan",
    rank: 1,
    image: "https://s4.anilist.co/file/anilistcdn/character/large/b40882-dsj7IP943WFF.jpg"
  });
  $$renderer.push(`<!----> `);
  CharacterCard($$renderer, {
    name: "Mikasa Ackerman",
    work: "Attack on Titan",
    rank: 2,
    image: "https://s4.anilist.co/file/anilistcdn/character/large/b40881-F3gr1PkreDvj.png"
  });
  $$renderer.push(`<!----> `);
  CharacterCard($$renderer, {
    name: "Tanjirou Kamado",
    work: "Demon Slayer",
    rank: 3,
    image: "https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png"
  });
  $$renderer.push(`<!----> `);
  CharacterCard($$renderer, {
    name: "Nezuko Kamado",
    work: "Demon Slayer",
    rank: 4,
    image: "https://s4.anilist.co/file/anilistcdn/character/large/b127518-NRlq1CQ1v1ro.png"
  });
  $$renderer.push(`<!----></div></section></div>`);
}
export {
  _page as default
};
