import type { PageServerLoad } from './$types';
import { api, getServerApiUrl } from '$lib/api';
import { getMockCharacters, filterCharacters } from '$lib/mockData';

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('search') || '';
  const gender = url.searchParams.get('gender') || 'All';
  const hairColor = url.searchParams.get('hairColor') || 'All';
  const rarity = url.searchParams.get('rarity') || 'All';
  const sortBy = url.searchParams.get('sortBy') || 'rank';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 12;

  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (gender !== 'All') params.set('gender', gender);
    if (hairColor !== 'All') params.set('hairColor', hairColor);
    params.set('page', String(page));
    params.set('limit', String(limit));
    
    const response = await fetch(getServerApiUrl(`/characters?${params.toString}`));

    
    if (response.ok) {
      const data = await response.json();
      return {
        characters: data.data || [],
        pagination: data.pagination || { page, limit, total: 0, totalPages: 0 },
        filters: { search, gender, hairColor, rarity, sortBy },
        source: 'api' as const,
      };
    }
  } catch (e) {
    console.warn('API unavailable, using mock data:', e);
  }
  
  // Fallback to mock data
  const allCharacters = getMockCharacters();
  const filtered = filterCharacters(allCharacters, { search, gender, hairColor, rarity, sortBy });
  const start = (page - 1) * limit;
  const characters = filtered.slice(start, start + limit);
  
  return {
    characters,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
    filters: { search, gender, hairColor, rarity, sortBy },
    source: 'mock' as const,
  };
};
