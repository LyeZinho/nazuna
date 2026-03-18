<script lang="ts">
  interface Props {
    icon: any;
    label: string;
    value: string | number;
    color?: string;
  }
  
  let { icon, label, value, color = 'var(--accent-purple)' }: Props = $props();
</script>

<div class="stat-card neobrutal-card">
  <div class="stat-icon" style="background: {color}">
    {@html icon}
  </div>
  <div class="stat-content">
    <p class="stat-label">{label}</p>
    <p class="stat-value">{value}</p>
  </div>
</div>

<style>
  .stat-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
  }
  
  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border: 2px solid #000;
    box-shadow: 3px 3px 0 #000;
    color: #000;
  }
  
  .stat-icon :global(svg) {
    width: 24px;
    height: 24px;
  }
  
  .stat-content {
    display: flex;
    flex-direction: column;
  }
  
  .stat-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: -0.02em;
  }
</style>
