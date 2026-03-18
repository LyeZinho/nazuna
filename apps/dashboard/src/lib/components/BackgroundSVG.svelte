<script lang="ts">
  let { } = $props();
</script>

<svg class="bg-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.05" />
    </linearGradient>
    <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
    </radialGradient>
    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(99,102,241,0.05)" stroke-width="0.5"/>
    </pattern>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.05"/>
      </feComponentTransfer>
    </filter>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#grad1)" />
  <circle cx="20" cy="20" r="30" fill="url(#grad2)" class="floating-circle" />
  <circle cx="80" cy="70" r="25" fill="url(#grad2)" class="floating-circle" style="animation-delay: -1s" />
  <circle cx="60" cy="30" r="15" fill="url(#grad2)" class="floating-circle" style="animation-delay: -2s" />
  <rect width="100%" height="100%" fill="url(#grid)" />
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.3" />
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
  
  .floating-circle {
    animation: float-circle 8s ease-in-out infinite;
  }
  
  @keyframes float-circle {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(2%, -2%); }
    50% { transform: translate(0, -4%); }
    75% { transform: translate(-2%, -2%); }
  }
</style>
