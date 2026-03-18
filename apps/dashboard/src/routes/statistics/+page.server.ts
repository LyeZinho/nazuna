import type { PageServerLoad } from './$types';
import { getMockStats, getMockDistribution, getMockLedger } from '$lib/mockData';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Try to fetch stats from multiple endpoints
    const [charactersRes, rankingsRes] = await Promise.all([
      fetch('/api/v1/characters?limit=1'),
      fetch('/api/v1/rankings/combined?limit=1'),
    ]);
    
    if (charactersRes.ok) {
      const characters = await charactersRes.json();
      
      return {
        stats: {
          totalCharacters: characters.pagination?.total || 12450,
          totalUsers: 15420,
          totalServers: 1240,
          totalSpins: 1250430,
          totalObtained: 850200,
          totalWorks: 3200,
        },
        distribution: getMockDistribution(),
        ledger: getMockLedger(),
        source: 'api' as const,
      };
    }
  } catch (e) {
    console.warn('API unavailable, using mock data:', e);
  }
  
  // Fallback to mock data
  return {
    stats: getMockStats(),
    distribution: getMockDistribution(),
    ledger: getMockLedger(),
    source: 'mock' as const,
  };
};
