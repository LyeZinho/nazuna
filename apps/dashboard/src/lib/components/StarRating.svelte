<script lang="ts">
  interface Props {
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    readonly?: boolean;
  }
  
  let { value = 0, onChange, disabled = false, readonly = false }: Props = $props();
  
  let hoverValue = $state(0);
  let isHovering = $state(false);
  
  function handleClick(star: number) {
    if (disabled || readonly) return;
    onChange?.(star);
  }
  
  function handleMouseEnter(star: number) {
    if (disabled || readonly) return;
    isHovering = true;
    hoverValue = star;
  }
  
  function handleMouseLeave() {
    isHovering = false;
    hoverValue = 0;
  }
</script>

<div class="star-rating" class:readonly class:disabled>
  {#each [1, 2, 3, 4, 5] as star}
    <button
      class="star"
      class:filled={star <= (isHovering ? hoverValue : value)}
      onclick={() => handleClick(star)}
      onmouseenter={() => handleMouseEnter(star)}
      onmouseleave={handleMouseLeave}
      disabled={disabled || readonly}
      type="button"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    </button>
  {/each}
</div>

<style>
  .star-rating {
    display: flex;
    gap: 4px;
  }
  
  .star {
    background: none;
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    padding: 4px;
    cursor: pointer;
    color: var(--border-color);
    transition: all var(--transition-fast);
    transform-origin: center;
  }
  
  .star:hover {
    transform: scale(1.15) translate(-1px, -1px);
  }
  
  .star.filled {
    color: #FFD700;
    border-color: #FFD700;
  }
  
  .star:not(.filled):hover {
    color: #FFD700;
    border-color: #FFD700;
  }
  
  .star:disabled {
    cursor: not-allowed;
    opacity: 1;
  }
  
  .star svg {
    filter: drop-shadow(2px 2px 0 #000);
    transition: all var(--transition-fast);
  }
  
  .star.filled svg {
    filter: drop-shadow(2px 2px 0 #b8860b);
    animation: star-pop 0.3s ease;
  }
  
  @keyframes star-pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
  
  .disabled .star {
    cursor: not-allowed;
  }
  
  .readonly .star {
    cursor: default;
  }
  
  .readonly .star:hover {
    transform: none;
  }
</style>
