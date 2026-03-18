<script lang="ts">
  import { page } from '$app/stores';
  
  const navItems = [
    { href: '/', label: 'Home', icon: 'home' },
    { href: '/characters', label: 'Characters', icon: 'users' },
    { href: '/rankings', label: 'Rankings', icon: 'trophy' },
    { href: '/user/me', label: 'Profile', icon: 'user' },
  ];
</script>

<nav class="navbar">
  <div class="nav-content">
    <a href="/" class="logo">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="url(#logoGrad)" stroke-width="2"/>
        <circle cx="16" cy="16" r="8" fill="url(#logoGrad)" opacity="0.3"/>
        <circle cx="16" cy="16" r="4" fill="url(#logoGrad)"/>
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stop-color="#3b82f6"/>
            <stop offset="100%" stop-color="#8b5cf6"/>
          </linearGradient>
        </defs>
      </svg>
      <span class="logo-text gradient-text">Nazuna<span class="accent">Bot</span></span>
    </a>
    
    <div class="nav-links">
      {#each navItems as item}
        <a 
          href={item.href} 
          class="nav-link" 
          class:active={$page.url.pathname === item.href || ($page.url.pathname.startsWith(item.href) && item.href !== '/')}
        >
          <span class="nav-icon">
            {#if item.icon === 'home'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            {:else if item.icon === 'users'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            {:else if item.icon === 'trophy'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            {:else if item.icon === 'user'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            {/if}
          </span>
          {item.label}
        </a>
      {/each}
    </div>
    
    <div class="nav-auth">
      <a href="/auth/discord/callback" class="btn-login">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          <polyline points="10 17 15 12 10 7"/>
          <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
        Login with Discord
      </a>
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 72px;
    z-index: var(--z-modal);
    background: var(--bg-secondary);
    border-bottom: 3px solid var(--border-thick);
  }
  
  .nav-content {
    max-width: 1400px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }
  
  .logo-text {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  
  .logo-text .accent {
    font-weight: 400;
  }
  
  .nav-links {
    display: flex;
    gap: 8px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 14px;
    transition: all var(--transition-fast);
    border: 2px solid transparent;
  }
  
  .nav-link:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
    border-color: var(--border-color);
  }
  
  .nav-link.active {
    color: var(--accent-blue);
    background: var(--bg-hover);
    border: 2px solid var(--accent-blue);
    box-shadow: var(--shadow-brutal-sm);
  }
  
  .nav-icon {
    display: flex;
    align-items: center;
  }
  
  .btn-login {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #5865F2;
    color: white;
    border: 3px solid #000;
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-brutal);
  }
  
  .btn-login:hover {
    background: #4752C4;
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-brutal-lg);
  }
  
  .btn-login:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
  }
</style>
