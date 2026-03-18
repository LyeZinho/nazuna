export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Character {
  id: string | number;
  name: string;
  series: string;
  image: string;
  rank?: number;
  rating: number;
  rarity: Rarity;
  description?: string;
  gender?: string;
  personality?: string;
  hairColor?: string;
  views?: number;
  trend?: { date: string; value: number }[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  collection: Character[];
  favorites: Character[];
}

export interface Stats {
  totalUsers: number;
  totalServers: number;
  totalCharacters: number;
  totalWorks: number;
  totalSpins: number;
  totalObtained: number;
}

export interface LedgerItem {
  id: string;
  userId: string;
  username: string;
  action: 'roulette_spin' | 'character_obtained' | 'favorite_added' | 'rating_submitted' | 'character_traded';
  character: string;
  time: string;
}

export interface Distribution {
  name: string;
  value: number;
}
