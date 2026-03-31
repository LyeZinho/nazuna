import { Injectable, NotFoundException } from '@nestjs/common';
import { db, users, userFavorites, userCollections, userRatings, characters, works, eq, desc, sql, and } from '@anime-bot/db';

@Injectable()
export class UsersService {
  async findOne(id: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getFavorites(userId: string) {
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

  async getCollections(userId: string, serverId?: string) {
    const whereCondition = serverId
      ? and(eq(userCollections.userId, userId), eq(userCollections.serverId, serverId))
      : eq(userCollections.userId, userId);

    return db.select({
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      workTitle: works.title,
      obtainedAt: userCollections.obtainedAt,
      source: userCollections.source,
      serverId: userCollections.serverId,
    })
    .from(userCollections)
    .leftJoin(characters, eq(userCollections.characterId, characters.anilistId))
    .leftJoin(works, eq(characters.workId, works.id))
    .where(whereCondition)
    .orderBy(desc(userCollections.obtainedAt));
  }

  async getRatings(userId: string) {
    return db.select({
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      rating: userRatings.rating,
      ratedAt: userRatings.createdAt,
    })
    .from(userRatings)
    .leftJoin(characters, eq(userRatings.characterId, characters.anilistId))
    .where(eq(userRatings.userId, userId))
    .orderBy(desc(userRatings.createdAt));
  }
}
