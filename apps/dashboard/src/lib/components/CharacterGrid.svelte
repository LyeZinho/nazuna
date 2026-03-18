<script lang="ts">
  import CharacterCard from '$components/CharacterCard.svelte';
  import { api } from '$lib/api';
  
  interface Props {
    search?: string;
    gender?: string;
    personality?: string;
    hairColor?: string;
  }
  
  let { search = '', gender = '', personality = '', hairColor = '' }: Props = $props();
  
  let page = $state(1);
  let loading = $state(false);
  let characters = $state<any[]>([]);
  let total = $state(0);
  let hasMore = $state(true);
  
  async function fetchCharacters() {
    loading = true;
    try {
      const params: Record<string, string | number> = { page, limit: 20 };
      if (search) params.search = search;
      if (gender) params.gender = gender;
      if (personality) params.personality = personality;
      if (hairColor) params.hairColor = hairColor;
      
      const result = await api.characters.list(params);
      if (page === 1) {
        characters = result.data || [];
      } else {
        characters = [...characters, ...(result.data || [])];
      }
      total = result.total || 0;
      hasMore = characters.length < total;
    } catch (e) {
      console.error('Failed to fetch characters:', e);
    } finally {
      loading = false;
    }
  }
  
  $effect(() => {
    page = 1;
    fetchCharacters();
  });
  
  async function loadMore() {
    if (loading || !hasMore) return;
    page++;
    await fetchCharacters();
  }
</script>

<div class="character-grid-container">
  <div class="grid-header">
    <span class="results-count">{total.toLocaleString()} characters</span>
    <div class="sort-options">
      <button class="sort-btn active">Popular</button>
      <button class="sort-btn">Rating</button>
      <button class="sort-btn">Name</button>
    </div>
  </div>
  
  <div class="character-grid">
    {#each characters as char, i}
      <div class="animate-fade-in" style="opacity: 0; animation-delay: {Math.min(i * 0.05, 0.3)}s">
        <a href="/characters/{char.anilistId}">
          <CharacterCard 
            name={char.name} 
            work={char.work?.title || 'Unknown'}
            rank={char.popularity || 0}
            image={char.imageUrl || ''}
          />
        </a>
      </div>
    {/each}
  </div>
  
  {#if hasMore}
    <div class="load-more">
      <button class="load-more-btn" onclick={loadMore} disabled={loading}>
        {#if loading}
          <span class="spinner"></span>
          Loading...
        {:else}
          Load More
        {/if}
      </button>
    </div>
  {/if}
</div>

<style>
  .character-grid-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .grid-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .results-count {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .sort-options {
    display: flex;
    gap: 8px;
  }
  
  .sort-btn {
    padding: 8px 16px;
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-brutal-sm);
  }
  
  .sort-btn:hover {
    border-color: var(--accent-blue);
    color: var(--text-primary);
    transform: translate(-1px, -1px);
    box-shadow: var(--shadow-brutal);
  }
  
  .sort-btn:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 #000;
  }
  
  .sort-btn.active {
    background: var(--accent-blue);
    border-color: #1e40af;
    color: white;
    font-weight: 700;
    box-shadow: 3px 3px 0 #1e40af;
  }
  
  .character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }
  
  .load-more {
    display: flex;
    justify-content: center;
    padding: 24px 0;
  }
  
  .load-more-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-brutal);
  }
  
  .load-more-btn:hover:not(:disabled) {
    border-color: var(--accent-blue);
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-brutal-lg);
  }
  
  .load-more-btn:active:not(:disabled) {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
  }
  
  .load-more-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 3px solid var(--border-thick);
    border-top-color: var(--accent-blue);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
