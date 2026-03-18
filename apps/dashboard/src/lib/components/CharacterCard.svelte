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
    <div class="card-overlay"></div>
    <span class="rank-badge">#{rank}</span>
  </div>
  <div class="card-content">
    <h3 class="character-name">{name}</h3>
    <p class="character-work">{work}</p>
  </div>
  <div class="card-shine"></div>
</a>

<style>
  .character-card {
    display: block;
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all var(--transition-normal);
    position: relative;
  }
  
  .character-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: var(--rank-color);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(99, 102, 241, 0.2);
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
    transition: transform var(--transition-slow);
  }
  
  .character-card:hover .card-image img {
    transform: scale(1.1);
  }
  
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
  }
  
  .rank-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: var(--rank-color);
    color: #000;
    font-weight: 700;
    font-size: 14px;
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .card-content {
    padding: 16px;
  }
  
  .character-name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text-primary);
  }
  
  .character-work {
    font-size: 13px;
    color: var(--text-secondary);
  }
  
  .card-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left var(--transition-slow);
  }
  
  .character-card:hover .card-shine {
    left: 100%;
  }
</style>
