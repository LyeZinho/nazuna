<script lang="ts">
  import '../app.css';
  import Navigation from '$components/Navigation.svelte';
  import BackgroundSVG from '$components/BackgroundSVG.svelte';
  
  let { children } = $props();
</script>

<BackgroundSVG />

<div class="app-container">
  <Navigation />
  
  <main>
    {@render children()}
  </main>
</div>

<style>
  .app-container {
    position: relative;
    min-height: 100vh;
    z-index: var(--z-base);
  }
  
  main {
    padding: 100px 24px 48px;
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
