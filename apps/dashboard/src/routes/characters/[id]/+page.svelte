<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import StarRating from '$components/StarRating.svelte';
  import { api } from '$lib/api';
  
  const characterId = Number($page.params.id);
  
  let loading = $state(true);
  let error = $state<string | null>(null);
  
  let character = $state<any>(null);
  let metrics = $state({ globalRank: 0, totalClaims: 0, totalFavorites: 0 });
  let relatedCharacters = $state<any[]>([]);
  let volumeData = $state<any[]>([]);
  
  let rating = $state({ average: 0, totalVotes: 0, userRating: 0 });
  let isLoggedIn = $state(false);
  let submitting = $state(false);
  
  onMount(async () => {
    try {
      const [charData, metricsData, relatedData, volumeResult] = await Promise.all([
        api.characters.get(characterId),
        api.characters.getMetrics(characterId),
        api.characters.getRelated(characterId, 5),
        api.characters.getVolume(characterId, 6),
      ]);
      
      character = charData;
      metrics = metricsData || { globalRank: 0, totalClaims: 0, totalFavorites: 0 };
      relatedCharacters = relatedData || [];
      volumeData = volumeResult || [];
      
      if (charData.rating) {
        rating = {
          average: charData.rating.averageRating || 0,
          totalVotes: charData.rating.totalVotes || 0,
          userRating: 0
        };
      }
    } catch (e) {
      error = 'Failed to load character data';
      console.error(e);
    } finally {
      loading = false;
    }
  });
  
  async function submitRating(value: number) {
    if (!isLoggedIn) return;
    submitting = true;
    try {
      await api.ratings.submit('user-123', characterId, value);
      rating = { ...rating, userRating: value };
    } catch (e) {
      console.error('Failed to submit rating:', e);
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head>
  <title>{character?.name || 'Loading...'} - Waifu Roulette</title>
</svelte:head>

{#if loading}
  <div class="loading">Loading character...</div>
{:else if error}
  <div class="error">{error}</div>
{:else}
<div class="character-page">
  <a href="/characters" class="back-link">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
    Back to Characters
  </a>
  
  <div class="character-layout">
    <div class="character-image-section animate-slide-up">
      <div class="image-container">
        <img src={character.imageUrl} alt={character.name} class="character-image" />
        <div class="image-glow"></div>
      </div>
      
      <div class="rating-card">
        <h3 class="rating-title">Rate this Character</h3>
        
        {#if !isLoggedIn}
          <p class="rating-hint">Login to vote</p>
          <button class="login-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.2 14.5c-.6 0-1.1.5-1.1 1.1V18H3V8.5c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1V18h18v-2.4c0-.6-.5-1.1-1.1-1.1zM8.5 15c.8 0 1.5-.7 1.5-1.5S9.3 12 8.5 12 7 12.7 7 13.5 7.7 15 8.5 15zm7.5 0c.8 0 1.5-.7 1.5-1.5S16.8 12 16 12s-1.5.7-1.5 1.5.7 15 1.5 15z"/>
            </svg>
            Login with Discord
          </button>
        {:else}
          <StarRating value={rating.userRating} onChange={submitRating} disabled={submitting} />
          {#if rating.userRating > 0}
            <p class="rating-submitted">Your rating: {rating.userRating} ⭐</p>
          {/if}
        {/if}
        
        <div class="rating-stats">
          <div class="stat">
            <span class="stat-value">{rating.average.toFixed(1)}</span>
            <span class="stat-label">Average</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">{rating.totalVotes.toLocaleString()}</span>
            <span class="stat-label">Votes</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="character-info animate-slide-up" style="animation-delay: 0.1s">
      <h1 class="character-name gradient-text">{character.name}</h1>
      
      <div class="character-meta">
        <span class="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          {character.work?.title || 'Unknown'}
        </span>
        <span class="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          #{character.popularity.toLocaleString()}
        </span>
        <span class="meta-item role-badge">
          {character.role}
        </span>
      </div>
      
      <div class="character-description">
        <p>{character.description}</p>
      </div>
      
      <div class="character-tags">
        {#if character.categories?.personality_trait?.length}
          <div class="tag-section">
            <h4 class="tag-title">Personality</h4>
            <div class="tags">
              {#each character.categories.personality_trait as trait}
                <span class="tag personality">{trait}</span>
              {/each}
            </div>
          </div>
        {/if}
        
        {#if character.categories?.genre?.length}
          <div class="tag-section">
            <h4 class="tag-title">Genres</h4>
            <div class="tags">
              {#each character.categories.genre as genre}
                <span class="tag genre">{genre}</span>
              {/each}
            </div>
          </div>
        {/if}
        
        {#if character.categories?.hair_color?.length || character.categories?.eye_color?.length}
          <div class="tag-section">
            <h4 class="tag-title">Appearance</h4>
            <div class="tags">
              {#if character.categories.hair_color?.length}
                {#each character.categories.hair_color as hair}
                  <span class="tag appearance">💇 {hair} hair</span>
                {/each}
              {/if}
              {#if character.categories.eye_color?.length}
                {#each character.categories.eye_color as eye}
                  <span class="tag appearance">👁 {eye} eyes</span>
                {/each}
              {/if}
            </div>
          </div>
        {/if}
      </div>

      <!-- Metrics Section -->
      <div class="metrics-section">
        <h2 class="metrics-title">📊 Statistics</h2>
        
        <div class="metrics-stats">
          <div class="metric-card">
            <span class="metric-value">#{metrics.globalRank || '-'}</span>
            <span class="metric-label">Global Rank</span>
          </div>
          <div class="metric-card">
            <span class="metric-value">{(metrics.totalClaims || 0).toLocaleString()}</span>
            <span class="metric-label">Total Claims</span>
          </div>
          <div class="metric-card">
            <span class="metric-value">{(metrics.totalFavorites || 0).toLocaleString()}</span>
            <span class="metric-label">Favorites</span>
          </div>
        </div>

        <div class="chart-section">
          <h3 class="chart-title">Claim Volume (Last 6 Months)</h3>
          <div class="bar-chart">
            {#each volumeData as data}
              <div class="bar-container">
                <div class="bar" style="height: {Math.max(4, (data.count / Math.max(...volumeData.map(v => v.count), 1)) * 80)}%"></div>
                <span class="bar-label">{data.month}</span>
                <span class="bar-value">{data.count}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="related-section">
          <h3 class="related-title">🔥 Related Characters</h3>
          <p class="related-subtitle">Based on shared tags</p>
          <div class="related-grid">
            {#each relatedCharacters as char}
              <a href="/characters/{char.anilistId}" class="related-card">
                <img src={char.imageUrl} alt={char.name} class="related-image" />
                <div class="related-info">
                  <span class="related-name">{char.name}</span>
                  <span class="related-tags">{char.sharedTags} shared tags</span>
                </div>
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<style>
  .character-page {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 14px;
    margin-bottom: 24px;
    transition: all var(--transition-fast);
  }
  
  .back-link:hover {
    color: var(--accent-blue-light);
    gap: 12px;
  }
  
  .character-layout {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 48px;
  }
  
  .character-image-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .image-container {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: hidden;
  }
  
  .character-image {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
  }
  
  .image-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, var(--bg-primary) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .rating-card {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 24px;
    text-align: center;
  }
  
  .rating-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  .rating-hint {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 16px;
  }
  
  .login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    background: #5865F2;
    color: white;
    border-radius: var(--radius-md);
    font-weight: 600;
    transition: all var(--transition-fast);
  }
  
  .login-btn:hover {
    background: #4752C4;
    transform: translateY(-2px);
  }
  
  .rating-submitted {
    font-size: 13px;
    color: var(--accent-cyan);
    margin-top: 8px;
  }
  
  .rating-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--accent-purple-light);
  }
  
  .stat-label {
    font-size: 12px;
    color: var(--text-secondary);
  }
  
  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--border-color);
  }
  
  .character-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .character-name {
    font-size: 40px;
    font-weight: 800;
    line-height: 1.1;
  }
  
  .character-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: var(--text-secondary);
  }
  
  .role-badge {
    padding: 4px 12px;
    background: rgba(139, 92, 246, 0.2);
    color: var(--accent-purple-light);
    border-radius: var(--radius-sm);
    text-transform: capitalize;
  }
  
  .character-description {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
  }
  
  .character-tags {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .tag-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .tag-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tag {
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 500;
  }
  
  .tag.personality {
    background: rgba(236, 72, 153, 0.15);
    color: var(--accent-pink);
  }
  
  .tag.genre {
    background: rgba(59, 130, 246, 0.15);
    color: var(--accent-blue-light);
  }
  
  .tag.appearance {
    background: rgba(139, 92, 246, 0.15);
    color: var(--accent-purple-light);
  }
  
  @media (max-width: 768px) {
    .character-layout {
      grid-template-columns: 1fr;
    }
  }

  .loading, .error {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    font-size: 18px;
    color: var(--text-secondary);
  }

  .error {
    color: #ef4444;
  }

  .metrics-section {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid var(--border-color);
  }

  .metrics-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .metrics-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }

  .metric-card {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .metric-value {
    font-size: 28px;
    font-weight: 800;
    color: var(--accent-purple-light);
  }

  .metric-label {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .chart-section {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 24px;
    margin-bottom: 32px;
  }

  .chart-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--text-primary);
  }

  .bar-chart {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 120px;
    gap: 12px;
  }

  .bar-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
  }

  .bar {
    width: 100%;
    background: linear-gradient(to top, var(--accent-purple), var(--accent-purple-light));
    border-radius: 4px 4px 0 0;
    position: absolute;
    bottom: 24px;
    min-height: 4px;
    transition: height 0.3s ease;
  }

  .bar-label {
    position: absolute;
    bottom: 8px;
    font-size: 11px;
    color: var(--text-muted);
  }

  .bar-value {
    position: absolute;
    top: 0;
    font-size: 10px;
    color: var(--text-secondary);
  }

  .related-section {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 24px;
  }

  .related-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .related-subtitle {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 20px;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  }

  .related-card {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
  }

  .related-card:hover {
    border-color: var(--accent-purple-light);
    transform: translateY(-2px);
  }

  .related-image {
    width: 50px;
    height: 70px;
    object-fit: cover;
    border-radius: var(--radius-sm);
  }

  .related-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .related-name {
    font-size: 11px;
    font-weight: 600;
    text-align: center;
    line-height: 1.2;
    color: var(--text-primary);
  }

  .related-tags {
    font-size: 10px;
    color: var(--accent-cyan);
  }

  @media (max-width: 768px) {
    .metrics-stats {
      grid-template-columns: 1fr;
    }
    .related-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
