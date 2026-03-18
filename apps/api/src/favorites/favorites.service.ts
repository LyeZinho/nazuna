import { Injectable } from '@nestjs/common';
import { db, userFavorites, characters, eq, and, desc } from '@anime-bot/db';

@Injectable()
export class FavoritesService {
  async getUserFavorites(userId: string) {
    return db.select({
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      addedAt: userFavorites.createdAt,
    })
    .from(userFavorites)
    .leftJoin(characters, eq(userFavorites.characterId, characters.anilistId))
    .where(eq(userFavorites.userId, userId))
    .orderBy(desc(userFavorites.createdAt));
  }

  async addFavorite(userId: string, characterId: number) {
    const existing = await db.query.userFavorites.findFirst({
      where: and(
        eq(userFavorites.userId, userId),
        eq(userFavorites.characterId, characterId)
      ),
    });

    if (existing) return existing;

    const [result] = await db.insert(userFavorites).values({
      userId,
      characterId,
    }).returning();

    return result;
  }

  async removeFavorite(userId: string, characterId: number) {
    await db.delete(userFavorites).where(
      and(
        eq(userFavorites.userId, userId),
        eq(userFavorites.characterId, characterId)
      )
    );
    return { success: true };
  }
}
