<script lang="ts">
  import { slide } from 'svelte/transition';
  
  interface Props {
    searchQuery: string;
    selectedGender: string;
    selectedPersonality: string;
    selectedHairColor: string;
  }
  
  let { searchQuery = $bindable(), selectedGender = $bindable(), selectedPersonality = $bindable(), selectedHairColor = $bindable() }: Props = $props();
  
  const genders = [
    { value: '', label: 'All Genders' },
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
  ];
  
  const personalities = [
    { value: '', label: 'All Personalities' },
    { value: 'tsundere', label: 'Tsundere' },
    { value: 'yandere', label: 'Yandere' },
    { value: 'kuudere', label: 'Kuudere' },
    { value: 'dandere', label: 'Dandere' },
    { value: 'genki', label: 'Genki' },
    { value: 'imouto', label: 'Imouto' },
    { value: 'onee-san', label: 'Onee-san' },
  ];
  
  const hairColors = [
    { value: '', label: 'All Hair Colors' },
    { value: 'blonde', label: 'Blonde' },
    { value: 'black', label: 'Black' },
    { value: 'pink', label: 'Pink' },
    { value: 'blue', label: 'Blue' },
    { value: 'red', label: 'Red' },
    { value: 'brown', label: 'Brown' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
  ];
  
  let expandedSections = $state({
    search: true,
    gender: true,
    personality: true,
    hairColor: true,
  });
</script>

<div class="filter-panel neobrutal-card">
  <div class="filter-header">
    <h3 class="filter-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
      Filters
    </h3>
    <button class="clear-btn" onclick={() => { searchQuery = ''; selectedGender = ''; selectedPersonality = ''; selectedHairColor = ''; }}>
      Clear All
    </button>
  </div>
  
  <div class="filter-sections">
    <div class="filter-section">
      <button 
        class="section-toggle" 
        onclick={() => expandedSections.search = !expandedSections.search}
      >
        <span>Search</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class:rotated={expandedSections.search}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {#if expandedSections.search}
        <div class="section-content" transition:slide={{ duration: 200 }}>
          <input 
            type="text" 
            placeholder="Search characters..."
            bind:value={searchQuery}
            class="search-input"
          />
        </div>
      {/if}
    </div>
    
    <div class="filter-section">
      <button 
        class="section-toggle"
        onclick={() => expandedSections.gender = !expandedSections.gender}
      >
        <span>Gender</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class:rotated={expandedSections.gender}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {#if expandedSections.gender}
        <div class="section-content" transition:slide={{ duration: 200 }}>
          <div class="filter-options">
            {#each genders as option}
              <label class="filter-option">
                <input 
                  type="radio" 
                  name="gender" 
                  value={option.value}
                  bind:group={selectedGender}
                />
                <span class="option-label">{option.label}</span>
              </label>
            {/each}
          </div>
        </div>
      {/if}
    </div>
    
    <div class="filter-section">
      <button 
        class="section-toggle"
        onclick={() => expandedSections.personality = !expandedSections.personality}
      >
        <span>Personality</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class:rotated={expandedSections.personality}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {#if expandedSections.personality}
        <div class="section-content" transition:slide={{ duration: 200 }}>
          <div class="filter-options scrollable">
            {#each personalities as option}
              <label class="filter-option">
                <input 
                  type="radio" 
                  name="personality" 
                  value={option.value}
                  bind:group={selectedPersonality}
                />
                <span class="option-label">{option.label}</span>
              </label>
            {/each}
          </div>
        </div>
      {/if}
    </div>
    
    <div class="filter-section">
      <button 
        class="section-toggle"
        onclick={() => expandedSections.hairColor = !expandedSections.hairColor}
      >
        <span>Hair Color</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class:rotated={expandedSections.hairColor}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {#if expandedSections.hairColor}
        <div class="section-content" transition:slide={{ duration: 200 }}>
          <div class="filter-options scrollable">
            {#each hairColors as option}
              <label class="filter-option">
                <input 
                  type="radio" 
                  name="hairColor" 
                  value={option.value}
                  bind:group={selectedHairColor}
                />
                <span class="option-label">{option.label}</span>
              </label>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .filter-panel {
    padding: 0;
    overflow: hidden;
  }
  
  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .filter-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
  }
  
  .clear-btn {
    font-size: 12px;
    color: var(--text-muted);
    background: none;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
  }
  
  .clear-btn:hover {
    color: var(--accent-pink);
    background: rgba(236, 72, 153, 0.1);
  }
  
  .filter-sections {
    display: flex;
    flex-direction: column;
  }
  
  .filter-section {
    border-bottom: 1px solid var(--border-color);
  }
  
  .filter-section:last-child {
    border-bottom: none;
  }
  
  .section-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 20px;
    background: none;
    color: var(--text-primary);
    font-weight: 500;
    font-size: 14px;
    text-align: left;
    transition: background var(--transition-fast);
  }
  
  .section-toggle:hover {
    background: var(--bg-hover);
  }
  
  .section-toggle svg {
    transition: transform var(--transition-fast);
  }
  
  .section-toggle svg.rotated {
    transform: rotate(180deg);
  }
  
  .section-content {
    padding: 0 20px 16px;
  }
  
  .search-input {
    width: 100%;
  }
  
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-options.scrollable {
    max-height: 150px;
    overflow-y: auto;
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: var(--radius-sm);
    transition: background var(--transition-fast);
  }
  
  .filter-option:hover {
    background: var(--bg-hover);
  }
  
  .filter-option input[type="radio"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid var(--border-color);
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
  }
  
  .filter-option input[type="radio"]:checked {
    border-color: var(--accent-blue);
    background: var(--accent-blue);
  }
  
  .filter-option input[type="radio"]:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
  }
  
  .option-label {
    font-size: 13px;
    color: var(--text-secondary);
  }
  
  .filter-option:hover .option-label {
    color: var(--text-primary);
  }
</style>
