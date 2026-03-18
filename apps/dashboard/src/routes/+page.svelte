<script lang="ts">
  import StatCard from '$components/StatCard.svelte';
  import CharacterCard from '$components/CharacterCard.svelte';
  
  let { data } = $props();
  
  const stats = [
    { label: 'Total Characters', value: '12,044', icon: 'users', color: 'blue' },
    { label: 'Active Users', value: '2,847', icon: 'user-check', color: 'purple' },
    { label: 'Servers', value: '156', icon: 'server', color: 'cyan' },
    { label: 'Collections', value: '45,231', icon: 'box', color: 'pink' },
  ];
</script>

<svelte:head>
  <title>Waifu Roulette - Home</title>
</svelte:head>

<div class="home">
  <header class="hero animate-slide-up">
    <div class="hero-content">
      <h1 class="hero-title">
        Collect Your <span class="gradient-text">Waifus</span>
      </h1>
      <p class="hero-subtitle">
        Spin the roulette, collect anime characters, and build your collection!
      </p>
      <div class="hero-actions">
        <a href="/characters" class="btn-primary">
          <span>Explore Characters</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
        <a href="/rankings" class="btn-secondary">
          View Rankings
        </a>
      </div>
    </div>
    
    <div class="hero-visual">
      <div class="floating-cards">
        <div class="floating-card card-1 animate-float">
          <div class="card-glow"></div>
        </div>
        <div class="floating-card card-2 animate-float" style="animation-delay: -1s"></div>
        <div class="floating-card card-3 animate-float" style="animation-delay: -2s"></div>
      </div>
    </div>
  </header>
  
  <section class="stats-section">
    <div class="stats-grid">
      {#each stats as stat, i}
        <div class="animate-fade-in stagger-{i + 1}" style="opacity: 0">
          <StatCard {...stat} />
        </div>
      {/each}
    </div>
  </section>
  
  <section class="featured-section">
    <div class="section-header">
      <h2 class="section-title">
        <span class="section-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </span>
        Top Characters
      </h2>
      <a href="/rankings" class="see-all">
        See All
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>
    
    <div class="characters-grid">
      <CharacterCard 
        name="Eren Yeager" 
        work="Attack on Titan" 
        rank={1}
        image="https://s4.anilist.co/file/anilistcdn/character/large/b40882-dsj7IP943WFF.jpg"
      />
      <CharacterCard 
        name="Mikasa Ackerman" 
        work="Attack on Titan" 
        rank={2}
        image="https://s4.anilist.co/file/anilistcdn/character/large/b40881-F3gr1PkreDvj.png"
      />
      <CharacterCard 
        name="Tanjirou Kamado" 
        work="Demon Slayer" 
        rank={3}
        image="https://s4.anilist.co/file/anilistcdn/character/large/b126071-BTNEc1nRIv68.png"
      />
      <CharacterCard 
        name="Nezuko Kamado" 
        work="Demon Slayer" 
        rank={4}
        image="https://s4.anilist.co/file/anilistcdn/character/large/b127518-NRlq1CQ1v1ro.png"
      />
    </div>
  </section>
</div>

<style>
  .home {
    display: flex;
    flex-direction: column;
    gap: 64px;
  }
  
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    min-height: 400px;
    padding: 48px 0;
  }
  
  .hero-title {
    font-size: 56px;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -2px;
  }
  
  .hero-subtitle {
    font-size: 18px;
    color: var(--text-secondary);
    margin-bottom: 32px;
    max-width: 480px;
    line-height: 1.6;
    font-weight: 500;
  }
  
  .hero-actions {
    display: flex;
    gap: 16px;
  }
  
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent-blue);
    color: white;
    padding: 14px 28px;
    border: 3px solid #000;
    border-radius: var(--radius-md);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: var(--shadow-brutal);
    transition: all var(--transition-fast);
  }
  
  .btn-primary:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-brutal-lg);
  }
  
  .btn-primary:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
  }
  
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 14px 28px;
    background: var(--bg-card);
    color: var(--text-primary);
    border: 3px solid var(--border-thick);
    border-radius: var(--radius-md);
    font-weight: 700;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-brutal);
  }
  
  .btn-secondary:hover {
    border-color: var(--accent-purple);
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-brutal-lg);
  }
  
  .btn-secondary:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
  }
  
  .hero-visual {
    position: relative;
    height: 300px;
  }
  
  .floating-cards {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .floating-card {
    position: absolute;
    width: 180px;
    height: 240px;
    border-radius: var(--radius-lg);
    background: var(--bg-card);
    border: 3px solid var(--border-thick);
    overflow: hidden;
  }
  
  .card-1 {
    top: 0;
    left: 20%;
    z-index: 3;
    border-color: var(--accent-purple);
    box-shadow: var(--shadow-brutal-accent);
  }
  
  .card-2 {
    top: 20px;
    left: 40%;
    z-index: 2;
    transform: scale(0.9);
    box-shadow: var(--shadow-brutal);
  }
  
  .card-3 {
    top: 40px;
    left: 60%;
    z-index: 1;
    transform: scale(0.8);
    box-shadow: var(--shadow-brutal);
  }
  
  .card-glow {
    position: absolute;
    inset: 0;
    background: var(--accent-purple);
    opacity: 0.15;
  }
  
  .stats-section {
    margin-top: 32px;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 24px;
    font-weight: 800;
  }
  
  .section-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--accent-purple);
    border: 2px solid #000;
    border-radius: var(--radius-md);
    box-shadow: 2px 2px 0 #000;
  }
  
  .see-all {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--accent-blue);
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 2px solid var(--accent-blue);
    padding: 6px 14px;
    border-radius: var(--radius-md);
    box-shadow: 2px 2px 0 #000;
    transition: all var(--transition-fast);
  }
  
  .see-all:hover {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 #000;
  }
  
  .characters-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  
  @media (max-width: 1024px) {
    .hero {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .hero-subtitle {
      margin: 0 auto 32px;
    }
    
    .hero-actions {
      justify-content: center;
    }
    
    .hero-visual {
      display: none;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .characters-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
