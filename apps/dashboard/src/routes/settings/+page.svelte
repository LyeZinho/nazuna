<script lang="ts">
  import { goto } from '$app/navigation';
  
  let username = $state('Pedro Kaleb');
  let bio = $state('Avid collector of rare vampires and devil hunters.');
  let notifications = $state(true);
  let isPublic = $state(true);
  let activeTab = $state('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'privacy', label: 'Privacy & Security', icon: 'shield' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
    { id: 'language', label: 'Language', icon: 'globe' },
  ];
  
  function toggleNotifications() {
    notifications = !notifications;
  }
  
  function togglePublic() {
    isPublic = !isPublic;
  }
</script>

<svelte:head>
  <title>Settings - Nazuna Bot</title>
</svelte:head>

<main class="settings-page">
  <header class="page-header">
    <div class="header-top">
      <a href="/profile" class="back-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        BACK TO PROFILE
      </a>
      <button class="save-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        SAVE CHANGES
      </button>
    </div>
    <h1>Settings</h1>
  </header>
  
  <div class="settings-grid">
    <!-- Sidebar Tabs -->
    <aside class="settings-tabs">
      {#each tabs as tab}
        <button 
          class="tab-btn"
          class:active={activeTab === tab.id}
          onclick={() => activeTab = tab.id}
        >
          {#if tab.icon === 'user'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          {:else if tab.icon === 'bell'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          {:else if tab.icon === 'shield'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          {:else if tab.icon === 'palette'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="13.5" cy="6.5" r=".5"/>
              <circle cx="17.5" cy="10.5" r=".5"/>
              <circle cx="8.5" cy="7.5" r=".5"/>
              <circle cx="6.5" cy="12.5" r=".5"/>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
            </svg>
          {:else if tab.icon === 'globe'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          {/if}
          {tab.label}
        </button>
      {/each}
    </aside>
    
    <!-- Settings Content -->
    <div class="settings-content">
      <!-- Profile Section -->
      <section class="settings-section neobrutal-card">
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nazuna" 
              alt="User Avatar"
            />
            <button class="camera-btn" aria-label="Change profile picture">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </button>
          </div>
          <div class="avatar-info">
            <h3>Profile Picture</h3>
            <p>JPG, PNG or SVG. Max 2MB.</p>
          </div>
        </div>
        
        <div class="form-fields">
          <div class="form-group">
            <label for="display-name">Display Name</label>
            <input id="display-name" type="text" bind:value={username} />
          </div>
          
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea id="bio" rows="4" bind:value={bio}></textarea>
          </div>
        </div>
      </section>
      
      <!-- Preferences Section -->
      <section class="settings-section neobrutal-card">
        <h3>Preferences</h3>
        
        <div class="toggle-list">
          <div class="toggle-item">
            <div class="toggle-info">
              <p class="toggle-label">Email Notifications</p>
              <p class="toggle-desc">Receive updates about new characters and events.</p>
            </div>
            <button 
              class="toggle-btn"
              class:active={notifications}
              onclick={toggleNotifications}
              aria-label="Toggle email notifications"
              aria-pressed={notifications}
            >
              <div class="toggle-slider"></div>
            </button>
          </div>
          
          <div class="toggle-item">
            <div class="toggle-info">
              <p class="toggle-label">Public Profile</p>
              <p class="toggle-desc">Allow others to view your collection and rankings.</p>
            </div>
            <button 
              class="toggle-btn"
              class:active={isPublic}
              onclick={togglePublic}
              aria-label="Toggle public profile"
              aria-pressed={isPublic}
            >
              <div class="toggle-slider"></div>
            </button>
          </div>
        </div>
      </section>
      
      <!-- Danger Zone -->
      <section class="danger-section neobrutal-card">
        <h3>Danger Zone</h3>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        <button class="delete-btn">DELETE ACCOUNT</button>
      </section>
    </div>
  </div>
</main>

<style>
  .settings-page {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
  
  .page-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .header-top {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  @media (min-width: 768px) {
    .header-top {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    color: var(--accent-purple);
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.1em;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .save-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: var(--accent-green);
    color: #000;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: var(--border-brutal);
    box-shadow: var(--shadow-brutal);
  }
  
  .save-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-brutal-lg);
  }
  
  .page-header h1 {
    font-size: 48px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }
  
  .settings-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .settings-grid {
      grid-template-columns: 1fr 2fr;
    }
  }
  
  .settings-tabs {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .tab-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    border: 2px solid #000;
    background: transparent;
    color: white;
    text-align: left;
    transition: all var(--transition-fast);
  }
  
  .tab-btn:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .tab-btn.active {
    background: var(--accent-purple);
    color: #000;
    box-shadow: 4px 4px 0 #000;
  }
  
  .settings-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .settings-section {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .settings-section h3 {
    font-size: 20px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }
  
  .avatar-section {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .avatar-wrapper {
    position: relative;
    width: 96px;
    height: 96px;
    border: var(--border-brutal);
    box-shadow: var(--shadow-brutal);
    overflow: hidden;
    background: white;
  }
  
  .avatar-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .camera-btn {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  .avatar-wrapper:hover .camera-btn {
    opacity: 1;
  }
  
  .camera-btn svg {
    color: white;
  }
  
  .avatar-info h3 {
    font-size: 16px;
  }
  
  .avatar-info p {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
  }
  
  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-group label {
    font-size: 9px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: var(--text-secondary);
  }
  
  .form-group input,
  .form-group textarea {
    padding: 12px;
    font-size: 14px;
    font-weight: 700;
  }
  
  .form-group textarea {
    resize: none;
  }
  
  .toggle-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .toggle-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  
  .toggle-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .toggle-label {
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }
  
  .toggle-desc {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
  }
  
  .toggle-btn {
    width: 48px;
    height: 24px;
    border: 2px solid #000;
    background: var(--bg-secondary);
    position: relative;
    transition: background var(--transition-fast);
    flex-shrink: 0;
  }
  
  .toggle-btn.active {
    background: var(--accent-purple);
  }
  
  .toggle-slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #000;
    transition: transform var(--transition-fast);
  }
  
  .toggle-btn.active .toggle-slider {
    transform: translateX(24px);
  }
  
  .danger-section {
    padding: 32px;
    background: rgba(244, 63, 122, 0.1);
    border-color: rgba(244, 63, 122, 0.5);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .danger-section h3 {
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: var(--accent-pink);
  }
  
  .danger-section p {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
  }
  
  .delete-btn {
    padding: 8px 24px;
    background: var(--accent-pink);
    color: #000;
    font-weight: 900;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 #000;
    transition: all var(--transition-fast);
    width: fit-content;
  }
  
  .delete-btn:hover {
    box-shadow: none;
    transform: translate(2px, 2px);
  }
</style>
