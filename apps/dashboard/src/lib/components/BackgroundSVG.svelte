<script lang="ts">
  let { } = $props();
</script>

<svg class="bg-svg" viewBox="0 0 200 200" preserveAspectRatio="none">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a28" stroke-width="1"/>
    </pattern>
    <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="#2a2a3a"/>
    </pattern>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#grid)" />
  <rect width="100%" height="100%" fill="url(#dots)" />
</svg>

<style>
  .bg-svg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: var(--z-bg);
  }
</style>
