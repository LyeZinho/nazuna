import { Logger } from './logger';

export interface SafebooruPost {
  id: string;
  tags: string;
  owner: string;
  created_at: string;
  score: string;
  source: string;
  md5: string;
  file_url: string;
  width: string;
  height: string;
  file_size: string;
  rating: string;
}

export class SafebooruService {
  private baseUrl = 'https://safebooru.org/index.php';
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  async searchImages(tags: string[], limit = 10, page = 1): Promise<SafebooruPost[]> {
    const params = new URLSearchParams({
      page: 'dapi',
      s: 'post',
      q: 'index',
      json: '1',
      tags: tags.join(' '),
      limit: String(limit),
      pid: String(page - 1),
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Safebooru API error: ${response.status}`);
      }

      const data = await response.json() as { posts?: SafebooruPost[] };
      return data.posts || [];
    } catch (error) {
      this.logger.error('Safebooru search failed', error);
      return [];
    }
  }

  async searchByCharacterName(characterName: string, limit = 10): Promise<SafebooruPost[]> {
    const tags = [
      characterName.toLowerCase().replace(/\s+/g, '_'),
      'solo',
      '-explicit',
      '-loli',
      '-shota',
    ];
    
    return this.searchImages(tags, limit);
  }

  formatPostForDiscord(post: SafebooruPost): {
    url: string;
    thumbnail: string;
    score: string;
    tags: string[];
  } {
    const imageUrl = post.file_url.startsWith('http') 
      ? post.file_url 
      : `https://safebooru.org${post.file_url}`;
    
    const thumbnailUrl = imageUrl.replace(/(\.[a-z]+)$/, '_thumb$1');

    return {
      url: imageUrl,
      thumbnail: thumbnailUrl,
      score: post.score,
      tags: post.tags.split(' ').slice(0, 10),
    };
  }
}
