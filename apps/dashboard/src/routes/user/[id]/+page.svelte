<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import StatCard from '$components/StatCard.svelte';
  import CharacterCard from '$components/CharacterCard.svelte';
  import { api } from '$lib/api';
  
  const userId = $page.params.id || 'me';
  
  let loading = $state(true);
  let error = $state<string | null>(null);
  
  let user = $state({
    id: '',
    username: '',
    avatar: null as string | null,
    globalName: '',
    createdAt: '',
  });
  
  let stats = $state({
    totalCharacters: 0,
    totalFavorites: 0,
    serversJoined: 0,
    totalSpins: 0,
  });
  
  let recentCharacters = $state<any[]>([]);
  let favorites = $state<any[]>([]);
  
  let activityData = $state({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    spins: [0, 0, 0, 0, 0, 0],
    claims: [0, 0, 0, 0, 0, 0],
  });
  
  onMount(async () => {
    try {
      const userData = await api.users.get(userId);
      user = {
        id: userData.id,
        username: userData.username,
        avatar: userData.avatar,
        globalName: userData.globalName,
        createdAt: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A',
      };
      
      const favData = await api.favorites.list(userId);
      favorites = (favData.data || []).map((fav: any) => ({
        anilistId: fav.character?.anilistId || fav.anilistId,
        name: fav.character?.name || fav.name,
        image: fav.character?.imageUrl || fav.imageUrl,
      }));
      
      stats = {
        totalCharacters: favData.total || 0,
        totalFavorites: favorites.length,
        serversJoined: 0,
        totalSpins: 0,
      };
    } catch (e) {
      console.error('Failed to load profile:', e);
      error = 'Failed to load profile data';
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Profile - {user.username || 'Loading...'} - Nazuna Bot</title>
</svelte:head>

{#if loading}
  <div class="loading">Loading profile...</div>
{:else if error}
  <div class="error">{error}</div>
{:else}

<div class="profile-page">
  <header class="profile-header animate-slide-up">
    <div class="profile-avatar">
      {#if user.avatar}
        <img src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png?size=256" alt={user.username} />
      {:else}
        <div class="avatar-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      {/if}
      <div class="avatar-glow"></div>
    </div>
    
    <div class="profile-info">
      <h1 class="profile-name gradient-text">{user.globalName || user.username}</h1>
      <p class="profile-username">@{user.username}</p>
      <p class="profile-joined">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Joined {user.createdAt}
      </p>
    </div>
    
    <div class="profile-actions">
      <button class="settings-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        Settings
      </button>
    </div>
  </header>
  
  <section class="stats-section">
    <div class="stats-grid">
      <StatCard label="Characters Collected" value={stats.totalCharacters} icon="users" color="blue" />
      <StatCard label="Favorites" value={stats.totalFavorites} icon="heart" color="pink" />
      <StatCard label="Servers" value={stats.serversJoined} icon="server" color="purple" />
      <StatCard label="Total Spins" value={stats.totalSpins} icon="zap" color="cyan" />
    </div>
  </section>
  
  <section class="activity-section">
    <h2 class="section-title">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
      Activity
    </h2>
    
    <div class="activity-chart neobrutal-card">
      <div class="chart-bars">
        {#each activityData.spins as spin, i}
          <div class="bar-group">
            <div class="bar spin-bar" style="height: {spin * 3}px"></div>
            <div class="bar claim-bar" style="height: {activityData.claims[i] * 3}px"></div>
            <span class="bar-label">{activityData.labels[i]}</span>
          </div>
        {/each}
      </div>
      <div class="chart-legend">
        <span class="legend-item"><span class="legend-dot spin"></span> Spins</span>
        <span class="legend-item"><span class="legend-dot claim"></span> Claims</span>
      </div>
    </div>
  </section>
  
  <section class="collection-section">
    <div class="section-header">
      <h2 class="section-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
        Recent Collection
      </h2>
      <a href="/collection" class="see-all">View All</a>
    </div>
    
    <div class="character-row">
      {#each recentCharacters as char}
        <CharacterCard name={char.name} work={char.work} rank={char.rank} image={char.image} />
      {/each}
    </div>
  </section>
  
  <section class="favorites-section">
    <div class="section-header">
      <h2 class="section-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        Favorites
      </h2>
    </div>
    
    <div class="favorites-grid">
      {#each favorites as fav}
        <a href="/characters/{fav.anilistId}" class="favorite-card">
          <img src={fav.image} alt={fav.name} />
          <span class="favorite-name">{fav.name}</span>
        </a>
      {/each}
    </div>
  </section>
</div>
{/if}

<style>
  .profile-page {
    display: flex;
    flex-direction: column;
    gap: 48px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 32px;
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-brutal);
    position: relative;
  }
  
  .profile-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--accent-purple);
  }
  
  .profile-avatar {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }
  
  .profile-avatar img, .avatar-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--accent-purple);
    box-shadow: var(--shadow-brutal-accent);
  }
  
  .avatar-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-secondary);
    color: var(--text-muted);
  }
  
  .avatar-glow {
    display: none;
  }
  
  .profile-info {
    flex: 1;
  }
  
  .profile-name {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 4px;
  }
  
  .profile-username {
    color: var(--text-secondary);
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .profile-joined {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-muted);
    font-size: 13px;
  }
  
  .settings-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: var(--bg-secondary);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    font-weight: 600;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-brutal-sm);
  }
  
  .settings-btn:hover {
    border-color: var(--accent-blue);
    color: var(--text-primary);
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-brutal);
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  
  .section-title svg {
    color: var(--accent-purple);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .see-all {
    font-size: 14px;
    color: var(--accent-blue);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .activity-chart {
    padding: 32px;
  }
  
  .chart-bars {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 150px;
    margin-bottom: 16px;
  }
  
  .bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .bar {
    width: 24px;
    border-radius: 2px 2px 0 0;
    border: 2px solid #000;
    border-bottom: none;
    transition: height var(--transition-normal);
  }
  
  .spin-bar {
    background: var(--accent-blue);
  }
  
  .claim-bar {
    background: var(--accent-purple);
  }
  
  .bar-label {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 600;
  }
  
  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 24px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text-secondary);
  }
  
  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 2px solid #000;
  }
  
  .legend-dot.spin { background: var(--accent-blue); }
  .legend-dot.claim { background: var(--accent-purple); }
  
  .character-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
  
  .favorite-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-brutal-sm);
  }
  
  .favorite-card:hover {
    transform: translate(-2px, -2px);
    border-color: var(--accent-pink);
    box-shadow: 4px 4px 0 var(--accent-pink);
  }
  
  .favorite-card:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 #000;
  }
  
  .favorite-card img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--border-thick);
  }
  
  .favorite-name {
    font-size: 12px;
    text-align: center;
    color: var(--text-secondary);
    font-weight: 600;
  }
</style>
