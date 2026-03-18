import { Logger } from './logger';

export class ApiService {
  private baseUrl: string;
  private apiKey: string;
  private logger: Logger;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey || process.env.API_KEY || '';
    this.logger = new Logger();
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.apiKey ? { 'X-API-Key': this.apiKey } : {}),
      ...(options.headers as Record<string, string>),
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      this.logger.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async getRandomCharacter(filters: Record<string, string> = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request<any>(`/characters/random?${params}`);
  }

  async getCharacter(id: number) {
    return this.request<any>(`/characters/${id}`);
  }

  async searchCharacters(query: string, limit = 10) {
    return this.request<any>(`/characters?search=${encodeURIComponent(query)}&limit=${limit}`);
  }

  async getUserCollections(userId: string, serverId?: string) {
    const params = new URLSearchParams({ userId });
    if (serverId) params.append('serverId', serverId);
    return this.request<any>(`/users/me/collections?${params}`);
  }

  async addToCollection(userId: string, serverId: string, characterId: number, source = 'roulette') {
    return this.request<any>('/collections', {
      method: 'POST',
      body: JSON.stringify({ userId, serverId, characterId, source }),
    });
  }

  async getFavorites(userId: string) {
    return this.request<any>(`/favorites/${userId}`);
  }

  async addFavorite(userId: string, characterId: number) {
    return this.request<any>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ userId, characterId }),
    });
  }

  async removeFavorite(userId: string, characterId: number) {
    return this.request<any>(`/favorites/${characterId}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
    });
  }

  async getUserProfile(userId: string) {
    return this.request<any>(`/users/${userId}`);
  }

  async getServerLeaderboard(serverId: string, page = 1) {
    return this.request<any>(`/collections/${serverId}?page=${page}`);
  }

  async getRankings(type: string = 'popularity', page = 1, limit = 10) {
    return this.request<any>(`/rankings/${type}?page=${page}&limit=${limit}`);
  }

  async logLedger(action: string, userId: string, serverId: string, characterId?: number, metadata?: Record<string, any>) {
    return this.request<any>('/webhooks/discord', {
      method: 'POST',
      body: JSON.stringify({ type: action, userId, serverId, characterId, metadata }),
    });
  }
}
