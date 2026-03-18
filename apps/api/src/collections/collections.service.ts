import { Injectable } from '@nestjs/common';
import { db, userCollections, characters, works, eq, and, sql, desc } from '@anime-bot/db';

@Injectable()
export class CollectionsService {
  async getServerCollection(serverId: string) {
    return db.select({
      userId: userCollections.userId,
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      workTitle: works.title,
      obtainedAt: userCollections.obtainedAt,
    })
    .from(userCollections)
    .leftJoin(characters, eq(userCollections.characterId, characters.anilistId))
    .leftJoin(works, eq(characters.workId, works.id))
    .where(eq(userCollections.serverId, serverId))
    .orderBy(desc(userCollections.obtainedAt));
  }

  async addCharacter(userId: string, serverId: string, characterId: number, source: string = 'roulette') {
    const existing = await db.query.userCollections.findFirst({
      where: and(
        eq(userCollections.userId, userId),
        eq(userCollections.serverId, serverId),
        eq(userCollections.characterId, characterId)
      ),
    });

    if (existing) return existing;

    const [result] = await db.insert(userCollections).values({
      userId,
      serverId,
      characterId,
      source: source as any,
    }).returning();

    return result;
  }
}
