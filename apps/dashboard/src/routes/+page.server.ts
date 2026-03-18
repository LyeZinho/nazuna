import type { PageServerLoad } from './$types';
import { api, getServerApiUrl } from '$lib/api';
import { getMockCharacters, getMockRankings, getMockStats } from '$lib/mockData';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Try to fetch from API
    const [rankingsRes, charactersRes] = await Promise.all([
      fetch(getServerApiUrl('/rankings/combined?page=1&limit=4')),
      fetch(getServerApiUrl('/characters?page=1&limit=50')),
    ]);

    if (rankingsRes.ok && charactersRes.ok) {
      try {
        const rankings = await rankingsRes.json();
        const characters = await charactersRes.json();
        
        // Validate API responses have required fields
        if (!Array.isArray(rankings?.data) || !characters?.pagination) {
          throw new Error('Invalid API response structure');
        }
        
        // Ensure stats is always defined with safe defaults
        const stats = {
          totalCharacters: Math.max(0, Number(characters.pagination?.total) || 0),
          activeUsers: 85420,
          servers: 1240,
          collections: 1250000,
        };
        
        return {
          topCharacters: rankings.data.slice(0, 4).filter((char: any, idx: number, arr: any[]) => {
            // Ensure unique IDs and filter out items without valid IDs
            const id = char.id || char.anilistId;
            if (!id) return false;
            // Keep first occurrence of each unique ID
            return arr.findIndex((c: any) => (c.id || c.anilistId) === id) === idx;
          }),
          stats,
          source: 'api' as const,
        };
      } catch (parseError) {
        console.warn('Failed to parse API response:', parseError);
        throw parseError;
      }
    } else {
      console.warn(`API request failed: rankings=${rankingsRes.status}, characters=${charactersRes.status}`);
    }
  } catch (e) {
    console.warn('API unavailable, using mock data:', e instanceof Error ? e.message : String(e));
  }
  
  // Fallback to mock data
  return {
    topCharacters: getMockRankings('popularity').slice(0, 4),
    stats: getMockStats(),
    source: 'mock' as const,
  };
};
