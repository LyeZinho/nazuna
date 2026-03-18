import { s as store_get, h as head, c as escape_html, e as ensure_array_like, k as attr_style, a as attr, j as stringify, d as unsubscribe_stores } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { S as StatCard } from "../../../../chunks/StatCard.js";
import { C as CharacterCard } from "../../../../chunks/CharacterCard.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.id || "me";
    let user = {
      username: " example_user",
      globalName: "Example User",
      createdAt: "2024-01-15"
    };
    let stats = {
      totalCharacters: 47,
      totalFavorites: 23,
      serversJoined: 5,
      totalSpins: 156
    };
    let recentCharacters = [
      {
        anilistId: 40882,
        name: "Eren Yeager",
        work: "Attack on Titan",
        rank: 1,
        image: "https://s4.anilist.co/file/anilistcdn/character/large/b40882-dsj7IP943WFF.jpg"
      },
      {
        anilistId: 40881,
        name: "Mikasa Ackerman",
        work: "Attack on Titan",
        rank: 2,
        image: "https://s4.anilist.co/file/anilistcdn/character/large/b40881-F3gr1PkreDvj.png"
      },
      {
        anilistId: 126071,
        name: "Tanjirou Kamado",
        work: "Demon Slayer",
        rank: 3,
        image: "https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png"
      }
    ];
    let favorites = [
      {
        anilistId: 127518,
        name: "Nezuko Kamado",
        work: "Demon Slayer",
        image: "https://s4.anilist.co/file/anilistcdn/character/large/b127518-NRlq1CQ1v1ro.png"
      },
      {
        anilistId: 5114,
        name: "Light Yagami",
        work: "Death Note",
        image: "https://s4.anilist.co/file/anilistcdn/character/large/b5114-Q1V7JXa0Nbbb.jpg"
      }
    ];
    let activityData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      spins: [12, 19, 25, 15, 28, 22],
      claims: [8, 12, 18, 10, 20, 15]
    };
    head("1htx3e8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Profile - ${escape_html(user.username)} - Waifu Roulette</title>`);
      });
    });
    $$renderer2.push(`<div class="profile-page svelte-1htx3e8"><header class="profile-header animate-slide-up svelte-1htx3e8"><div class="profile-avatar svelte-1htx3e8">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="avatar-placeholder svelte-1htx3e8"><svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="avatar-glow svelte-1htx3e8"></div></div> <div class="profile-info svelte-1htx3e8"><h1 class="profile-name gradient-text svelte-1htx3e8">${escape_html(user.globalName)}</h1> <p class="profile-username svelte-1htx3e8">@${escape_html(user.username)}</p> <p class="profile-joined svelte-1htx3e8"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Joined ${escape_html(user.createdAt)}</p></div> <div class="profile-actions"><button class="settings-btn svelte-1htx3e8"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Settings</button></div></header> <section class="stats-section"><div class="stats-grid">`);
    StatCard($$renderer2, {
      label: "Characters Collected",
      value: stats.totalCharacters,
      icon: "users",
      color: "blue"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      label: "Favorites",
      value: stats.totalFavorites,
      icon: "heart",
      color: "pink"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      label: "Servers",
      value: stats.serversJoined,
      icon: "server",
      color: "purple"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      label: "Total Spins",
      value: stats.totalSpins,
      icon: "zap",
      color: "cyan"
    });
    $$renderer2.push(`<!----></div></section> <section class="activity-section"><h2 class="section-title svelte-1htx3e8"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1htx3e8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg> Activity</h2> <div class="activity-chart neobrutal-card svelte-1htx3e8"><div class="chart-bars svelte-1htx3e8"><!--[-->`);
    const each_array = ensure_array_like(activityData.spins);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let spin = each_array[i];
      $$renderer2.push(`<div class="bar-group svelte-1htx3e8"><div class="bar spin-bar svelte-1htx3e8"${attr_style(`height: ${stringify(spin * 3)}px`)}></div> <div class="bar claim-bar svelte-1htx3e8"${attr_style(`height: ${stringify(activityData.claims[i] * 3)}px`)}></div> <span class="bar-label svelte-1htx3e8">${escape_html(activityData.labels[i])}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="chart-legend svelte-1htx3e8"><span class="legend-item svelte-1htx3e8"><span class="legend-dot spin svelte-1htx3e8"></span> Spins</span> <span class="legend-item svelte-1htx3e8"><span class="legend-dot claim svelte-1htx3e8"></span> Claims</span></div></div></section> <section class="collection-section"><div class="section-header svelte-1htx3e8"><h2 class="section-title svelte-1htx3e8"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1htx3e8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg> Recent Collection</h2> <a href="/collection" class="see-all svelte-1htx3e8">View All</a></div> <div class="character-row svelte-1htx3e8"><!--[-->`);
    const each_array_1 = ensure_array_like(recentCharacters);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let char = each_array_1[$$index_1];
      CharacterCard($$renderer2, {
        name: char.name,
        work: char.work,
        rank: char.rank,
        image: char.image
      });
    }
    $$renderer2.push(`<!--]--></div></section> <section class="favorites-section"><div class="section-header svelte-1htx3e8"><h2 class="section-title svelte-1htx3e8"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1htx3e8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> Favorites</h2></div> <div class="favorites-grid svelte-1htx3e8"><!--[-->`);
    const each_array_2 = ensure_array_like(favorites);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let fav = each_array_2[$$index_2];
      $$renderer2.push(`<a${attr("href", `/characters/${stringify(fav.anilistId)}`)} class="favorite-card svelte-1htx3e8"><img${attr("src", fav.image)}${attr("alt", fav.name)} class="svelte-1htx3e8"/> <span class="favorite-name svelte-1htx3e8">${escape_html(fav.name)}</span></a>`);
    }
    $$renderer2.push(`<!--]--></div></section></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
