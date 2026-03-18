import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { getMockCharacter, getMockRelatedCharacters, getMockMetrics, getMockVolume } from '$lib/mockData';

const MOCK_USER_ID = 'mock-user-123';
const MOCK_SERVER_ID = 'mock-server-456';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    throw error(400, 'Invalid character ID');
  }

  try {
    const [characterRes, metricsRes, relatedRes, volumeRes] = await Promise.all([
      fetch(`/api/v1/characters/${id}`),
      fetch(`/api/v1/characters/${id}/metrics`),
      fetch(`/api/v1/characters/${id}/related?limit=3`),
      fetch(`/api/v1/characters/${id}/volume?months=6`),
    ]);

    if (characterRes.ok) {
      const character = await characterRes.json();
      const metrics = metricsRes.ok ? await metricsRes.json() : null;
      const related = relatedRes.ok ? await relatedRes.json() : [];
      const volume = volumeRes.ok ? await volumeRes.json() : [];
      
      return {
        character: {
          ...character,
          id: character.anilistId,
          series: character.work?.title || 'Unknown',
        },
        metrics,
        related: related.map((c: any) => ({ ...c, id: c.anilistId, series: c.work?.title })),
        volume,
        source: 'api' as const,
      };
    }
  } catch (e) {
    console.warn('API unavailable, using mock data:', e);
  }
  
  // Fallback to mock data
  const character = getMockCharacter(id);
  if (!character) {
    throw error(404, 'Character not found');
  }
  
  return {
    character,
    metrics: getMockMetrics(id),
    related: getMockRelatedCharacters(id),
    volume: getMockVolume(6),
    source: 'mock' as const,
  };
};

export const actions: Actions = {
  addToCollection: async ({ request, fetch, params }) => {
    const characterId = parseInt(params.id);
    const formData = await request.formData();
    const serverId = (formData.get('serverId') as string) || MOCK_SERVER_ID;
    
    try {
      const res = await fetch('/api/v1/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: MOCK_USER_ID, serverId, characterId }),
      });
      
      if (!res.ok) {
        return fail(res.status, { error: 'Failed to add to collection' });
      }
      
      return { success: true, action: 'collection' };
    } catch {
      // API unavailable — simulate success in mock mode
      return { success: true, action: 'collection', mock: true };
    }
  },

  addToFavorites: async ({ params, fetch }) => {
    const characterId = parseInt(params.id);
    
    try {
      const res = await fetch('/api/v1/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: MOCK_USER_ID, characterId }),
      });
      
      if (!res.ok) {
        return fail(res.status, { error: 'Failed to add to favorites' });
      }
      
      return { success: true, action: 'favorites' };
    } catch {
      return { success: true, action: 'favorites', mock: true };
    }
  },

  submitRating: async ({ request, fetch, params }) => {
    const characterId = parseInt(params.id);
    const formData = await request.formData();
    const rating = parseInt(formData.get('rating') as string);
    
    if (!rating || rating < 1 || rating > 5) {
      return fail(400, { error: 'Rating must be between 1 and 5' });
    }
    
    try {
      const res = await fetch('/api/v1/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: MOCK_USER_ID, characterId, rating }),
      });
      
      if (!res.ok) {
        return fail(res.status, { error: 'Failed to submit rating' });
      }
      
      return { success: true, action: 'rating', rating };
    } catch {
      return { success: true, action: 'rating', rating, mock: true };
    }
  },
};
