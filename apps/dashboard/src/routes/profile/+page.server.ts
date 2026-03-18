import type { PageServerLoad } from './$types';
import { getMockCharacters } from '$lib/mockData';

export const load: PageServerLoad = async ({ params, fetch }) => {
  // For now, profile requires authentication
  // This would normally fetch from /api/v1/users/me?userId=...
  
  // Mock user data
  const collection = getMockCharacters().slice(0, 3);
  const favorites = getMockCharacters().slice(3, 6);
  
  return {
    user: {
      id: 'mock-user-123',
      name: 'Pedro Kaleb',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nazuna',
      memberSince: 'March 2026',
    },
    collection,
    favorites,
    stats: {
      collectionCount: 124,
      favoritesCount: 42,
    },
    activities: [
      { text: 'Collected Nazuna Nanakusa', time: '2h ago' },
      { text: 'Rated Makima 5 stars', time: '5h ago' },
      { text: 'Added Power to favorites', time: '1d ago' },
      { text: 'Reached Rank #124', time: '2d ago' },
    ],
    source: 'mock' as const,
  };
};
