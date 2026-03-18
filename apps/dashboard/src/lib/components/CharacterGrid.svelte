<script lang="ts">
  import CharacterCard from '$components/CharacterCard.svelte';
  import { invalidate } from '$app/navigation';
  
  interface Props {
    search?: string;
    gender?: string;
    personality?: string;
    hairColor?: string;
  }
  
  let { search = '', gender = '', personality = '', hairColor = '' }: Props = $props();
  
  let page = $state(1);
  let loading = $state(false);
  let characters = $state([
    { anilistId: 40882, name: 'Eren Yeager', work: 'Attack on Titan', rank: 1, image: 'https://s4.anilist.co/file/anilistcdn/character/large/b40882-dsj7IP943WFF.jpg' },
    { anilistId: 40881, name: 'Mikasa Ackerman', work: 'Attack on Titan', rank: 2, image: 'https://s4.anilist.co/file/anilistcdn/character/large/b40881-F3gr1PkreDvj.png' },
    { anilistId: 126071, name: 'Tanjirou Kamado', work: 'Demon Slayer', rank: 3, image: 'https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png' },
    { anilistId: 127518, name: 'Nezuko Kamado', work: 'Demon Slayer', rank: 4, image: 'https://s4.anilist.co/file/anilistcdn/character/large/b127518-NRlq1CQ1v1ro.png' },
    { anilistId: 129130, name: 'Inosuke Hashibira', work: 'Demon Slayer', rank: 5, image: 'https://s4.anilist.co/file/anilistcdn/character/large/n129130-SJC0Kn1DU39E.jpg' },
    { anilistId: 129131, name: 'Zenitsu Agatsuma', work: 'Demon Slayer', rank: 6, image: 'https://s4.anilist.co/file/anilistcdn/character/large/b129131-FZrQ7lSlxmEr.png' },
    { anilistId: 5114, name: 'Light Yagami', work: 'Death Note', rank: 7, image: 'https://s4.anilist.co/file/anilistcdn/character/large/b5114-Q1V7JXa0Nbbb.jpg' },
    { anilistId: 7888, name: 'L Lawliet', work: 'Death Note', rank: 8, image: 'https://s4.anilist.co/file/anilistcdn/character/large/b7888-W1D3PSW59lD6.jpg' },
  ]);
  
  let hasMore = $state(true);
  
  async function loadMore() {
    if (loading || !hasMore) return;
    loading = true;
    page++;
    await new Promise(r => setTimeout(r, 500));
    loading = false;
  }
</script>

<div class="character-grid-container">
  <div class="grid-header">
    <span class="results-count">{Number(12044).toLocaleString()} characters</span>
    <div class="sort-options">
      <button class="sort-btn active">Popular</button>
      <button class="sort-btn">Rating</button>
      <button class="sort-btn">Name</button>
    </div>
  </div>
  
  <div class="character-grid">
    {#each characters as char, i}
      <div class="animate-fade-in" style="opacity: 0; animation-delay: {Math.min(i * 0.05, 0.3)}s">
        <CharacterCard 
          name={char.name} 
          work={char.work}
          rank={char.rank}
          image={char.image}
        />
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
  }
  
  .sort-options {
    display: flex;
    gap: 8px;
  }
  
  .sort-btn {
    padding: 8px 16px;
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
    transition: all var(--transition-fast);
  }
  
  .sort-btn:hover {
    border-color: var(--accent-blue);
    color: var(--text-primary);
  }
  
  .sort-btn.active {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    color: white;
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
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-weight: 600;
    transition: all var(--transition-fast);
  }
  
  .load-more-btn:hover:not(:disabled) {
    border-color: var(--accent-blue);
    background: var(--bg-hover);
  }
  
  .load-more-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border-color);
    border-top-color: var(--accent-blue);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
