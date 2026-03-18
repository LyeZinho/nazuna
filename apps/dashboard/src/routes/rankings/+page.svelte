<script lang="ts">
  import CharacterCard from '$components/CharacterCard.svelte';
  
  let { data } = $props();
  
  const tabs = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'ratings', label: 'Ratings' },
    { value: 'combined', label: 'Combined' },
  ];
</script>

<svelte:head>
  <title>Rankings - Nazuna Bot</title>
</svelte:head>

<div class="rankings-page">
  <header class="page-header animate-slide-up">
    <h1 class="page-title">
      <span class="gradient-text">Rankings</span>
    </h1>
    <p class="page-subtitle">
      Top characters by popularity and ratings
    </p>
  </header>

  <div class="tabs">
    {#each tabs as tab}
      <a 
        href="/rankings?type={tab.value}" 
        class="tab" 
        class:active={data.currentType === tab.value}
      >
        {tab.label}
      </a>
    {/each}
  </div>

  <div class="rankings-grid">
    {#each data.rankings as char, i}
      <div class="ranking-item">
        <span class="rank">#{((data.pagination.page - 1) * data.pagination.limit) + i + 1}</span>
        <CharacterCard 
          name={char.name} 
          work={char.work?.title || 'Unknown'} 
          rank={((data.pagination.page - 1) * data.pagination.limit) + i + 1}
          image={char.imageUrl || ''}
        />
      </div>
    {/each}
  </div>

  {#if data.pagination.totalPages > 1}
    <div class="pagination">
      {#if data.pagination.page > 1}
        <a href="/rankings?type={data.currentType}&page={data.pagination.page - 1}" class="page-btn">
          Previous
        </a>
      {/if}
      
      <span class="page-info">
        Page {data.pagination.page} of {data.pagination.totalPages}
      </span>
      
      {#if data.pagination.page < data.pagination.totalPages}
        <a href="/rankings?type={data.currentType}&page={data.pagination.page + 1}" class="page-btn">
          Next
        </a>
      {/if}
    </div>
  {/if}
</div>

<style>
  .rankings-page {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .page-header {
    text-align: center;
    padding: 32px 0;
  }

  .page-title {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  .page-subtitle {
    font-size: 16px;
    color: var(--text-secondary);
  }

  .tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 16px 0;
  }

  .tab {
    padding: 12px 24px;
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-md);
    font-weight: 700;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
    text-decoration: none;
    box-shadow: var(--shadow-brutal-sm);
  }

  .tab:hover {
    border-color: var(--accent-blue);
    color: var(--text-primary);
  }

  .tab.active {
    background: var(--accent-blue);
    border-color: #000;
    color: white;
  }

  .rankings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }

  .ranking-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .rank {
    font-size: 24px;
    font-weight: 900;
    color: var(--accent-purple);
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 32px 0;
  }

  .page-btn {
    padding: 12px 24px;
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-md);
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
    box-shadow: var(--shadow-brutal-sm);
    transition: all var(--transition-fast);
  }

  .page-btn:hover {
    border-color: var(--accent-blue);
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-brutal);
  }

  .page-info {
    font-size: 14px;
    color: var(--text-secondary);
  }
</style>
