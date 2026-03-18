<script lang="ts">
  // Background SVG with animated patterns
</script>

<div class="background">
  <svg class="bg-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(168, 85, 247, 0.03)" stroke-width="0.5"/>
      </pattern>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(168, 85, 247, 0.15)"/>
        <stop offset="100%" stop-color="rgba(0, 0, 0, 0)"/>
      </radialGradient>
    </defs>
    
    <!-- Grid pattern -->
    <rect width="100" height="100" fill="url(#grid)"/>
    
    <!-- Ambient glows -->
    <circle cx="20" cy="30" r="25" fill="url(#glow)"/>
    <circle cx="80" cy="70" r="30" fill="url(#glow)"/>
    <circle cx="60" cy="20" r="20" fill="rgba(244, 63, 122, 0.05)"/>
    <circle cx="30" cy="80" r="15" fill="rgba(77, 142, 255, 0.05)"/>
    
    <!-- Noise texture overlay -->
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.02"/>
      </feComponentTransfer>
    </filter>
    <rect width="100" height="100" filter="url(#noise)" opacity="0.3"/>
  </svg>
</div>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: var(--z-bg);
    pointer-events: none;
    overflow: hidden;
  }
  
  .bg-svg {
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }
</style>
