import type { PageServerLoad } from './$types';
import { getServerApiUrl } from '$lib/api';
import { getMockRankings, getMockStats, getMockDistribution, getMockLedger } from '$lib/mockData';

export const load: PageServerLoad = async ({ url }) => {
  const type = (url.searchParams.get('type') || 'popularity') as 'popularity' | 'ratings' | 'combined';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 50;

  try {
    const response = await fetch(getServerApiUrl(`/rankings/${type}?page=${page}&limit=${limit}`));
    
    if (response.ok) {
      const data = await response.json();
      const rankings = (data.data || []).map((c: any) => ({ ...c, id: c.anilistId }));
      
      // Deduplicate by ID and filter out items without valid IDs
      const seen = new Set();
      const uniqueRankings = rankings.filter((char: any) => {
        const id = char.id || char.anilistId;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      
      return {
        rankings: uniqueRankings,
        pagination: data.pagination || { page, limit, total: 0, totalPages: 0 },
        currentType: type,
        source: 'api' as const,
      };
    }
  } catch (e) {
    console.warn('API unavailable, using mock data:', e);
  }
  
  // Fallback to mock data
  const rankings = getMockRankings(type);
  const start = (page - 1) * limit;
  const paginatedRankings = rankings.slice(start, start + limit);
  
  return {
    rankings: paginatedRankings,
    pagination: {
      page,
      limit,
      total: rankings.length,
      totalPages: Math.ceil(rankings.length / limit),
    },
    currentType: type,
    source: 'mock' as const,
  };
};
