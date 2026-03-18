<script lang="ts">
  import StatCard from '$lib/components/StatCard.svelte';
  
  let { data } = $props();
  
  const COLORS = ['#A78BFA', '#F472B6', '#60A5FA', '#34D399', '#FBBF24'];
</script>

<svelte:head>
  <title>Statistics - Nazuna Bot</title>
</svelte:head>

<main class="statistics-page">
  <header class="page-header">
    <h1>Bot Statistics</h1>
    <p class="page-subtitle">Real-time insights into the Nazuna ecosystem</p>
  </header>
  
  {#if data.source === 'mock'}
    <div class="mock-banner">
      <span class="mock-badge">DEMO DATA</span>
      <span>API unavailable. Showing mock statistics.</span>
    </div>
  {/if}
  
  <!-- Stats Grid -->
  <section class="stats-section">
    <StatCard 
      icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
      label="Total Users"
      value={data.stats.totalUsers.toLocaleString()}
      color="var(--accent-purple)"
    />
    <StatCard 
      icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>'
      label="Total Servers"
      value={data.stats.totalServers.toLocaleString()}
      color="var(--accent-pink)"
    />
    <StatCard 
      icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
      label="Total Characters"
      value={data.stats.totalCharacters.toLocaleString()}
      color="var(--accent-blue)"
    />
    <StatCard 
      icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
      label="Total Spins"
      value={data.stats.totalSpins.toLocaleString()}
      color="var(--accent-yellow)"
    />
    <StatCard 
      icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
      label="Characters Obtained"
      value={data.stats.totalObtained.toLocaleString()}
      color="var(--accent-cyan)"
    />
    <StatCard 
      icon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'
      label="Total Works"
      value={data.stats.totalWorks.toLocaleString()}
      color="var(--accent-purple)"
    />
  </section>
  
  <div class="charts-grid">
    <!-- Gender Distribution -->
    <div class="chart-card neobrutal-card">
      <div class="chart-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
          <path d="M22 12A10 10 0 0 0 12 2v10z"/>
        </svg>
        <h2>Gender Distribution</h2>
      </div>
      <div class="chart-container">
        <svg viewBox="0 0 100 100" class="pie-chart">
          {#each data.distribution.gender as item, i}
            {@const total = data.distribution.gender.reduce((acc, g) => acc + g.value, 0)}
            {@const percentage = (item.value / total) * 100}
            {@const previousPercentage = data.distribution.gender.slice(0, i).reduce((acc, g) => acc + (g.value / total) * 100, 0)}
            <circle
              cx="50" cy="50" r="25"
              fill="none"
              stroke={COLORS[i % COLORS.length]}
              stroke-width="20"
              stroke-dasharray="{percentage} {100 - percentage}"
              stroke-dashoffset="{-previousPercentage}"
              transform="rotate(-90 50 50)"
            />
          {/each}
          <circle cx="50" cy="50" r="15" fill="var(--bg-card)" />
        </svg>
        <div class="legend">
          {#each data.distribution.gender as item, i}
            <div class="legend-item">
              <div class="legend-color" style="background: {COLORS[i % COLORS.length]}"></div>
              <span class="legend-label">{item.name}</span>
              <span class="legend-value">{item.value}%</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Role Distribution -->
    <div class="chart-card neobrutal-card">
      <div class="chart-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
        <h2>Role Distribution</h2>
      </div>
      <div class="bar-chart">
        {#each data.distribution.role as item, i}
          <div class="bar-item">
            <div class="bar-label">{item.name}</div>
            <div class="bar-wrapper">
              <div class="bar" style="width: {item.value}%; background: {COLORS[(i + 1) % COLORS.length]}"></div>
            </div>
            <div class="bar-value">{item.value}%</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Ledger -->
  <div class="ledger-card neobrutal-card">
    <div class="ledger-header">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      <h2>Global Ledger</h2>
    </div>
    <div class="ledger-list">
      {#each data.ledger as log}
        <div class="ledger-item">
          <div class="ledger-content">
            <p class="ledger-text">
              <span class="username">@{log.username}</span>
              performed
              <span class="action">{log.action.replace('_', ' ')}</span>
            </p>
            <p class="ledger-char">Character: <span>{log.character}</span></p>
          </div>
          <span class="ledger-time">{log.time}</span>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  .statistics-page { display: flex; flex-direction: column; gap: 48px; }
  .page-header { display: flex; flex-direction: column; gap: 8px; }
  .page-header h1 { font-size: 48px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
  .page-subtitle { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-secondary); }
  .mock-banner { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--bg-secondary); border: 2px solid var(--accent-yellow); }
  .mock-badge { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; background: var(--accent-yellow); color: #000; padding: 2px 6px; border: 1px solid #000; }
  
  .stats-section { display: grid; grid-template-columns: repeat(1, 1fr); gap: 24px; }
  @media (min-width: 640px) { .stats-section { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .stats-section { grid-template-columns: repeat(3, 1fr); } }
  
  .charts-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
  @media (min-width: 1024px) { .charts-grid { grid-template-columns: 1fr 1fr; } }
  
  .chart-card { padding: 24px; display: flex; flex-direction: column; gap: 24px; }
  .chart-header { display: flex; align-items: center; gap: 8px; }
  .chart-header :global(svg) { color: var(--accent-purple); }
  .chart-header h2 { font-size: 20px; font-weight: 900; text-transform: uppercase; }
  
  .chart-container { display: flex; flex-direction: column; align-items: center; gap: 24px; }
  @media (min-width: 640px) { .chart-container { flex-direction: row; justify-content: center; } }
  
  .pie-chart { width: 160px; height: 160px; }
  .legend { display: flex; flex-direction: column; gap: 12px; }
  .legend-item { display: flex; align-items: center; gap: 8px; }
  .legend-color { width: 16px; height: 16px; border: 2px solid #000; }
  .legend-label { font-size: 12px; font-weight: 700; text-transform: uppercase; flex: 1; }
  .legend-value { font-size: 14px; font-weight: 900; }
  
  .bar-chart { width: 100%; display: flex; flex-direction: column; gap: 16px; }
  .bar-item { display: flex; align-items: center; gap: 12px; }
  .bar-label { width: 100px; font-size: 11px; font-weight: 700; text-transform: uppercase; flex-shrink: 0; }
  .bar-wrapper { flex: 1; height: 24px; background: var(--bg-secondary); border: 2px solid #000; }
  .bar { height: 100%; transition: width 0.5s ease; }
  .bar-value { width: 48px; font-size: 14px; font-weight: 900; text-align: right; flex-shrink: 0; }
  
  .ledger-card { padding: 24px; display: flex; flex-direction: column; gap: 24px; }
  .ledger-header { display: flex; align-items: center; gap: 8px; }
  .ledger-header :global(svg) { color: var(--accent-blue); }
  .ledger-header h2 { font-size: 20px; font-weight: 900; text-transform: uppercase; }
  
  .ledger-list { display: flex; flex-direction: column; gap: 16px; }
  .ledger-item { display: flex; flex-direction: column; gap: 8px; padding: 16px; background: var(--bg-secondary); border: 2px solid #000; box-shadow: 4px 4px 0 #000; }
  @media (min-width: 640px) { .ledger-item { flex-direction: row; justify-content: space-between; align-items: flex-start; } }
  .ledger-content { display: flex; flex-direction: column; gap: 4px; }
  .ledger-text { font-size: 12px; font-weight: 700; }
  .username { color: var(--accent-purple); }
  .action { font-size: 9px; font-weight: 900; text-transform: uppercase; background: #000; color: white; padding: 2px 4px; }
  .ledger-char { font-size: 11px; color: var(--text-secondary); }
  .ledger-char span { color: white; }
  .ledger-time { font-size: 9px; font-weight: 900; text-transform: uppercase; color: var(--text-secondary); flex-shrink: 0; }
</style>
