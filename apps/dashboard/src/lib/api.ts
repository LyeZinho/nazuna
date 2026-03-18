// API Client for Nazuna Bot Backend
const API_BASE = '/api/v1';

interface FetchOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${await response.text()}`);
  }

  return response.json();
}

// Types matching the API responses
export interface Character {
  anilistId: number;
  slug: string;
  name: string;
  altNames?: string[];
  description?: string;
  gender?: string;
  role?: string;
  imageUrl?: string;
  popularity?: number;
  score?: number;
  workId?: number;
  work?: {
    id: number;
    title: string;
    slug: string;
  };
  categories?: Record<string, string[]>;
  rating?: {
    totalVotes: number;
    averageRating: number;
  };
  // UI helpers (computed or from mock)
  id?: number;
  series?: string;
  rank?: number;
  rarity?: string;
  hairColor?: string;
  views?: number;
}

export interface CharacterMetrics {
  globalRank: number;
  totalClaims: number;
  totalFavorites: number;
}

export interface RankingCharacter extends Character {
  globalRank?: number;
  totalClaims?: number;
  totalFavorites?: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
}

// Map API character to UI format
function mapCharacter(char: any): Character {
  return {
    ...char,
    id: char.anilistId,
    series: char.work?.title || 'Unknown Series',
    rank: char.popularity || char.rank || 0,
    rarity: getRarityFromPopularity(char.popularity || 0),
  };
}

function getRarityFromPopularity(popularity: number): string {
  if (popularity > 800) return 'Legendary';
  if (popularity > 500) return 'Epic';
  if (popularity > 200) return 'Rare';
  return 'Common';
}

// API Client
export const api = {
  characters: {
    list: async (params: {
      page?: number;
      limit?: number;
      search?: string;
      gender?: string;
      role?: string;
      personality?: string;
      hairColor?: string;
    } = {}) => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', String(params.page));
      if (params.limit) searchParams.set('limit', String(params.limit));
      if (params.search) searchParams.set('search', params.search);
      if (params.gender) searchParams.set('gender', params.gender);
      if (params.role) searchParams.set('role', params.role);
      if (params.personality) searchParams.set('personality', params.personality);
      if (params.hairColor) searchParams.set('hairColor', params.hairColor);
      
      const query = searchParams.toString();
      const response = await fetchApi<ApiResponse<Character[]>>(`/characters${query ? `?${query}` : ''}`);
      return {
        ...response,
        data: response.data.map(mapCharacter),
      };
    },
    
    get: async (id: number) => {
      const response = await fetchApi<Character>(`/characters/${id}`);
      return mapCharacter(response);
    },
    
    getMetrics: async (id: number) => {
      return fetchApi<CharacterMetrics>(`/characters/${id}/metrics`);
    },
    
    getRelated: async (id: number, limit: number = 5) => {
      const response = await fetchApi<Character[]>(`/characters/${id}/related?limit=${limit}`);
      return response.map(mapCharacter);
    },
    
    getVolume: async (id: number, months: number = 6) => {
      return fetchApi<{ month: string; year: number; count: number }[]>(`/characters/${id}/volume?months=${months}`);
    },
    
    random: async (filters: Record<string, string> = {}) => {
      const searchParams = new URLSearchParams(filters);
      const query = searchParams.toString();
      const response = await fetchApi<Character>(`/characters/random${query ? `?${query}` : ''}`);
      return mapCharacter(response);
    },
  },

  rankings: {
    popularity: async (page: number = 1, limit: number = 50) => {
      const response = await fetchApi<ApiResponse<RankingCharacter[]>>(`/rankings/popularity?page=${page}&limit=${limit}`);
      return {
        ...response,
        data: response.data.map((char, idx) => mapCharacter({
          ...char,
          rank: (page - 1) * limit + idx + 1,
        })),
      };
    },
    
    ratings: async (page: number = 1, limit: number = 50) => {
      const response = await fetchApi<ApiResponse<RankingCharacter[]>>(`/rankings/ratings?page=${page}&limit=${limit}`);
      return {
        ...response,
        data: response.data.map((char, idx) => mapCharacter({
          ...char,
          rank: (page - 1) * limit + idx + 1,
        })),
      };
    },
    
    combined: async (page: number = 1, limit: number = 50) => {
      const response = await fetchApi<ApiResponse<RankingCharacter[]>>(`/rankings/combined?page=${page}&limit=${limit}`);
      return {
        ...response,
        data: response.data.map((char, idx) => mapCharacter({
          ...char,
          rank: (page - 1) * limit + idx + 1,
        })),
      };
    },
  },

  ratings: {
    get: async (characterId: number) => {
      return fetchApi<{ totalVotes: number; averageRating: number }>(`/ratings/character/${characterId}`);
    },
    
    submit: async (userId: string, characterId: number, rating: number) => {
      return fetchApi<{ success: boolean }>('/ratings', {
        method: 'POST',
        body: { userId, characterId, rating },
      });
    },
  },

  favorites: {
    list: async (userId: string) => {
      const response = await fetchApi<Character[]>(`/favorites/${userId}`);
      return response.map(mapCharacter);
    },
    
    add: async (userId: string, characterId: number) => {
      return fetchApi<{ success: boolean }>('/favorites', {
        method: 'POST',
        body: { userId, characterId },
      });
    },
    
    remove: async (userId: string, characterId: number) => {
      return fetchApi<{ success: boolean }>(`/favorites/${characterId}`, {
        method: 'DELETE',
        body: { userId },
      });
    },
  },

  users: {
    get: async (userId: string) => {
      return fetchApi<any>(`/users/${userId}`);
    },
    
    getMe: async (userId: string) => {
      return fetchApi<any>(`/users/me?userId=${userId}`);
    },
    
    getFavorites: async (userId: string) => {
      const response = await fetchApi<Character[]>(`/users/me/favorites?userId=${userId}`);
      return response.map(mapCharacter);
    },
    
    getCollections: async (userId: string, serverId?: string) => {
      const query = serverId ? `?userId=${userId}&serverId=${serverId}` : `?userId=${userId}`;
      const response = await fetchApi<Character[]>(`/users/me/collections${query}`);
      return response.map(mapCharacter);
    },
  },
};

// Generate mock data for UI development when API is unavailable
export function generateMockCharacter(id: number, index: number): Character {
  const mockChars = [
    { name: "Nazuna Nanakusa", series: "Yofukashi no Uta", image: "https://images.alphacoders.com/124/1246533.jpg", gender: "Female", hairColor: "Pink", popularity: 950, score: 9.2 },
    { name: "Makima", series: "Chainsaw Man", image: "https://images.alphacoders.com/112/1127042.jpg", gender: "Female", hairColor: "Red", popularity: 920, score: 9.1 },
    { name: "Power", series: "Chainsaw Man", image: "https://images.alphacoders.com/114/1148671.jpg", gender: "Female", hairColor: "Blonde", popularity: 880, score: 8.9 },
    { name: "Yor Forger", series: "Spy x Family", image: "https://images.alphacoders.com/123/1231683.jpg", gender: "Female", hairColor: "Black", popularity: 850, score: 8.8 },
    { name: "Marin Kitagawa", series: "My Dress-Up Darling", image: "https://images.alphacoders.com/121/1215160.jpg", gender: "Female", hairColor: "Blonde", popularity: 780, score: 8.7 },
    { name: "Chisato Nishikigi", series: "Lycoris Recoil", image: "https://images.alphacoders.com/124/1245645.jpg", gender: "Female", hairColor: "Blonde", popularity: 720, score: 8.6 },
    { name: "Anya Forger", series: "Spy x Family", image: "https://images.alphacoders.com/123/1231684.jpg", gender: "Female", hairColor: "Pink", popularity: 950, score: 9.3 },
    { name: "Hitori Gotoh", series: "Bocchi the Rock!", image: "https://images.alphacoders.com/128/1286532.jpg", gender: "Female", hairColor: "Pink", popularity: 650, score: 8.4 },
    { name: "Loid Forger", series: "Spy x Family", image: "https://images.alphacoders.com/123/1231682.jpg", gender: "Male", hairColor: "Blonde", popularity: 700, score: 8.5 },
    { name: "Denji", series: "Chainsaw Man", image: "https://images.alphacoders.com/112/1127041.jpg", gender: "Male", hairColor: "Blonde", popularity: 600, score: 8.2 },
  ];
  
  const base = mockChars[index % mockChars.length];
  return {
    anilistId: id,
    id: id,
    slug: base.name.toLowerCase().replace(/\s+/g, '-'),
    name: base.name,
    series: base.series,
    imageUrl: base.image,
    gender: base.gender,
    hairColor: base.hairColor,
    popularity: base.popularity,
    score: base.score,
    rank: index + 1,
    rarity: getRarityFromPopularity(base.popularity),
    views: Math.floor(Math.random() * 100000) + 10000,
  };
}

export function generateMockCharacters(count: number = 20): Character[] {
  return Array.from({ length: count }, (_, i) => generateMockCharacter(i + 1, i));
}
