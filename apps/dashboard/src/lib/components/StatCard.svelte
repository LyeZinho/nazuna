<script lang="ts">
  interface Props {
    label: string;
    value: string;
    icon: string;
    color: 'blue' | 'purple' | 'cyan' | 'pink';
  }
  
  let { label, value, icon, color }: Props = $props();
  
  const colorMap = {
    blue: { bg: 'var(--accent-blue)', shadow: 'var(--shadow-brutal-blue)' },
    purple: { bg: 'var(--accent-purple)', shadow: 'var(--shadow-brutal-accent)' },
    cyan: { bg: 'var(--accent-cyan)', shadow: 'var(--shadow-brutal-cyan)' },
    pink: { bg: 'var(--accent-pink)', shadow: 'var(--shadow-brutal-pink)' },
  };
</script>

<div class="stat-card" style="--card-color: {colorMap[color].bg}; --card-shadow: {colorMap[color].shadow}">
  <div class="stat-icon">
    {#if icon === 'users'}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    {:else if icon === 'user-check'}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
      </svg>
    {:else if icon === 'server'}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    {:else if icon === 'box'}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    {/if}
  </div>
  <div class="stat-content">
    <span class="stat-value">{value}</span>
    <span class="stat-label">{label}</span>
  </div>
</div>

<style>
  .stat-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-brutal);
    border-left: 6px solid var(--card-color);
  }
  
  .stat-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-brutal-lg);
    border-color: var(--card-color);
    border-left-color: var(--card-color);
  }
  
  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--bg-secondary);
    border: 2px solid var(--card-color);
    border-radius: var(--radius-md);
    color: var(--card-color);
    box-shadow: 2px 2px 0 #000;
  }
  
  .stat-content {
    display: flex;
    flex-direction: column;
  }
  
  .stat-value {
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 13px;
    color: var(--text-secondary);
    margin-top: 4px;
    font-weight: 500;
  }
</style>
