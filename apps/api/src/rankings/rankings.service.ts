import { Injectable } from '@nestjs/common';
import { db, characters, characterRatings, works, eq, desc, sql } from '@anime-bot/db';

@Injectable()
export class RankingsService {
  async byPopularity(page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    const result = await db.select({
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      popularity: characters.popularity,
      score: characters.score,
      workTitle: works.title,
    })
    .from(characters)
    .leftJoin(works, eq(characters.workId, works.id))
    .orderBy(desc(characters.popularity))
    .limit(limit)
    .offset(offset);

    const total = await db.select({ count: sql<number>`count(*)` }).from(characters);

    return {
      data: result.map((c, i) => ({ ...c, rank: offset + i + 1 })),
      pagination: {
        page,
        limit,
        total: total[0]?.count || 0,
      },
    };
  }

  async byRating(page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    const result = await db.select({
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      popularity: characters.popularity,
      totalVotes: characterRatings.totalVotes,
      averageRating: characterRatings.averageRating,
      workTitle: works.title,
    })
    .from(characterRatings)
    .leftJoin(characters, eq(characterRatings.characterId, characters.anilistId))
    .leftJoin(works, eq(characters.workId, works.id))
    .where(sql`${characterRatings.totalVotes} > 0`)
    .orderBy(desc(characterRatings.averageRating))
    .limit(limit)
    .offset(offset);

    const total = await db.select({ count: sql<number>`count(*)` })
      .from(characterRatings)
      .where(sql`${characterRatings.totalVotes} > 0`);

    return {
      data: result.map((c, i) => ({ ...c, rank: offset + i + 1 })),
      pagination: {
        page,
        limit,
        total: total[0]?.count || 0,
      },
    };
  }

  async combined(page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    const result = await db.select({
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      popularity: characters.popularity,
      totalVotes: characterRatings.totalVotes,
      averageRating: characterRatings.averageRating,
      workTitle: works.title,
    })
    .from(characterRatings)
    .leftJoin(characters, eq(characterRatings.characterId, characters.anilistId))
    .leftJoin(works, eq(characters.workId, works.id))
    .orderBy(desc(characters.popularity))
    .limit(limit)
    .offset(offset);

    const total = await db.select({ count: sql<number>`count(*)` }).from(characters);

    return {
      data: result.map((c, i) => ({ 
        ...c, 
        rank: offset + i + 1,
        combinedScore: (c.popularity || 0) + ((c.averageRating || 0) * 10000),
      })),
      pagination: {
        page,
        limit,
        total: total[0]?.count || 0,
      },
    };
  }
}
