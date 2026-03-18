import type { PageServerLoad } from './$types';
import { getMockRankings, getMockStats, getMockDistribution, getMockLedger } from '$lib/mockData';

export const load: PageServerLoad = async ({ url }) => {
  const type = (url.searchParams.get('type') || 'popularity') as 'popularity' | 'ratings' | 'combined';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 50;

  try {
    const response = await fetch(`/api/v1/rankings/${type}?page=${page}&limit=${limit}`);
    
    if (response.ok) {
      const data = await response.json();
      return {
        rankings: (data.data || []).map((c: any) => ({ ...c, id: c.anilistId })),
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
