import { Injectable } from '@nestjs/common';
import { db, works, characters, eq, desc, sql } from '@anime-bot/db';

@Injectable()
export class WorksService {
  async findAll(page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    const result = await db.select().from(works)
      .orderBy(desc(works.popularity))
      .limit(limit)
      .offset(offset);

    const total = await db.select({ count: sql<number>`count(*)` }).from(works);

    return {
      data: result,
      pagination: {
        page,
        limit,
        total: total[0]?.count || 0,
        totalPages: Math.ceil((total[0]?.count || 0) / limit),
      },
    };
  }

  async findOne(id: string) {
    const work = await db.query.works.findFirst({
      where: eq(works.id, id),
    });

    if (!work) return null;

    const chars = await db.select({
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      popularity: characters.popularity,
    }).from(characters)
      .where(eq(characters.workId, id))
      .orderBy(desc(characters.popularity))
      .limit(20);

    return {
      ...work,
      topCharacters: chars,
    };
  }
}
