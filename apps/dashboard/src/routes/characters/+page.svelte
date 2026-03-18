<script lang="ts">
  import CharacterGrid from '$components/CharacterGrid.svelte';
  import FilterPanel from '$components/FilterPanel.svelte';
  
  let searchQuery = $state('');
  let selectedGender = $state('');
  let selectedPersonality = $state('');
  let selectedHairColor = $state('');
</script>

<svelte:head>
  <title>Characters - Nazuna Bot</title>
</svelte:head>

<div class="characters-page">
  <header class="page-header animate-slide-up">
    <h1 class="page-title">
      <span class="gradient-text">Explore</span> Characters
    </h1>
    <p class="page-subtitle">
      Browse through {Number(12044).toLocaleString()} anime characters
    </p>
  </header>
  
  <div class="page-content">
    <aside class="filters-sidebar animate-fade-in" style="opacity: 0; animation-delay: 0.1s">
      <FilterPanel 
        bind:searchQuery
        bind:selectedGender
        bind:selectedPersonality
        bind:selectedHairColor
      />
    </aside>
    
    <main class="characters-main">
      <CharacterGrid 
        search={searchQuery}
        gender={selectedGender}
        personality={selectedPersonality}
        hairColor={selectedHairColor}
      />
    </main>
  </div>
</div>

<style>
  .characters-page {
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
  
  .page-content {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 32px;
    align-items: start;
  }
  
  .filters-sidebar {
    position: sticky;
    top: 100px;
  }
  
  @media (max-width: 1024px) {
    .page-content {
      grid-template-columns: 1fr;
    }
    
    .filters-sidebar {
      position: static;
    }
  }
</style>
