<script lang="ts">
  interface Props {
    label: string;
    value: string;
    icon: string;
    color: 'blue' | 'purple' | 'cyan' | 'pink';
  }
  
  let { label, value, icon, color }: Props = $props();
  
  const colorMap = {
    blue: { bg: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)' },
    purple: { bg: 'rgba(139, 92, 246, 0.1)', border: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.3)' },
    cyan: { bg: 'rgba(6, 182, 212, 0.1)', border: '#06b6d4', glow: 'rgba(6, 182, 212, 0.3)' },
    pink: { bg: 'rgba(236, 72, 153, 0.1)', border: '#ec4899', glow: 'rgba(236, 72, 153, 0.3)' },
  };
</script>

<div class="stat-card" style="--card-color: {colorMap[color].border}; --card-bg: {colorMap[color].bg}; --card-glow: {colorMap[color].glow}">
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
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);
    position: relative;
    overflow: hidden;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--card-color);
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    border-color: var(--card-color);
    box-shadow: 0 8px 30px var(--card-glow);
  }
  
  .stat-card:hover::before {
    opacity: 1;
  }
  
  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--card-bg);
    border-radius: var(--radius-md);
    color: var(--card-color);
  }
  
  .stat-content {
    display: flex;
    flex-direction: column;
  }
  
  .stat-value {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 13px;
    color: var(--text-secondary);
    margin-top: 4px;
  }
</style>
