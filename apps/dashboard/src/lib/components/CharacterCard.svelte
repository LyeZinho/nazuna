<script lang="ts">
  interface Props {
    name: string;
    work: string;
    rank: number;
    image: string;
  }
  
  let { name, work, rank, image }: Props = $props();
  
  const rankColors = {
    1: '#FFD700',
    2: '#C0C0C0',
    3: '#CD7F32',
  };
</script>

<a href="/characters/{rank}" class="character-card" style="--rank-color: {rankColors[rank as keyof typeof rankColors] || '#6366f1'}">
  <div class="card-image">
    <img src={image} alt={name} loading="lazy" />
    <span class="rank-badge">#{rank}</span>
  </div>
  <div class="card-content">
    <h3 class="character-name">{name}</h3>
    <p class="character-work">{work}</p>
  </div>
</a>

<style>
  .character-card {
    display: block;
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-brutal);
  }
  
  .character-card:hover {
    transform: translate(-3px, -3px);
    border-color: var(--rank-color);
    box-shadow: 6px 6px 0 #000;
  }
  
  .character-card:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
  }
  
  .card-image {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }
  
  .character-card:hover .card-image img {
    transform: scale(1.05);
  }
  
  .rank-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--rank-color);
    color: #000;
    font-weight: 800;
    font-size: 14px;
    padding: 4px 10px;
    border: 2px solid #000;
    border-radius: var(--radius-sm);
    box-shadow: 2px 2px 0 #000;
  }
  
  .card-content {
    padding: 16px;
    border-top: 3px solid var(--border-thick);
  }
  
  .character-name {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
    color: var(--text-primary);
  }
  
  .character-work {
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 500;
  }
</style>
