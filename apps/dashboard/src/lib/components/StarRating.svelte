<script lang="ts">
  interface Props {
    initialRating: number;
    readOnly?: boolean;
    characterId?: string | number;
    userId?: string;
    onRate?: (rating: number) => void;
  }
  
  let { initialRating, readOnly = false, characterId, userId = 'mock-user-123', onRate }: Props = $props();
  
  let rating = $state(initialRating);
  let hover = $state(0);
  let isSubmitting = $state(false);
  
  async function handleRate(value: number) {
    if (readOnly || isSubmitting) return;
    
    rating = value;
    isSubmitting = true;
    
    try {
      if (characterId) {
        // Submit directly to API
        const res = await fetch('/api/v1/ratings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, characterId, rating: value }),
        });
        
        if (res.ok) {
          if (onRate) onRate(value);
        } else {
          rating = initialRating;
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
        if (onRate) onRate(value);
      }
    } catch {
      rating = initialRating;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="star-rating">
  <div class="stars">
    {#each [1, 2, 3, 4, 5] as star}
      <button
        type="button"
        disabled={isSubmitting}
        aria-label="Rate {star} star{star > 1 ? 's' : ''}"
        onmouseenter={() => !readOnly && !isSubmitting && (hover = star)}
        onmouseleave={() => !readOnly && !isSubmitting && (hover = 0)}
        onclick={() => handleRate(star)}
        class="star-btn"
        class:disabled={isSubmitting}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={(hover || rating) >= star ? "currentColor" : "none"}
          stroke="currentColor"
          stroke-width="2"
          class={(hover || rating) >= star ? "star-filled" : "star-empty"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>
    {/each}
  </div>
  
  {#if !readOnly && rating > 0}
    <span class="rating-text">
      {isSubmitting ? 'SAVING...' : `${rating}.0`}
    </span>
  {/if}
</div>

<style>
  .star-rating {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .stars {
    display: flex;
    gap: 2px;
  }
  
  .star-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.1s ease;
  }
  
  .star-btn:not(.disabled):hover {
    transform: scale(1.2);
  }
  
  .star-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .star-filled {
    color: var(--accent-yellow);
  }
  
  .star-empty {
    color: #4a4a5a;
  }
  
  .rating-text {
    font-size: 10px;
    font-weight: 900;
    color: var(--accent-yellow);
    animation: pulse 1s ease infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
</style>
