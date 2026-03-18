import { Injectable } from '@nestjs/common';
import { db, characters, characterCategories, categoryValues, categoryTypes, characterRatings, works, userCollections, userFavorites, ledgerLogs, eq, desc, sql, and, inArray, count, users } from '@anime-bot/db';

export interface CharacterFilter {
  gender?: string;
  role?: string;
  personality?: string[];
  hairColor?: string;
  eyeColor?: string;
  bodyType?: string;
  archetype?: string[];
  genre?: string[];
  format?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class CharactersService {
  async findAll(filters: CharacterFilter) {
    const { page = 1, limit = 50, search, gender, role, personality, hairColor, eyeColor, bodyType, archetype, genre, format } = filters;
    const offset = (page - 1) * limit;

    let conditions = [];
    let categoryConditions = [];

    if (search) {
      conditions.push(sql`${characters.name} ILIKE ${`%${search}%`}`);
    }
    if (gender) {
      conditions.push(eq(characters.gender, gender as any));
    }
    if (role) {
      conditions.push(eq(characters.role, role as any));
    }

    const baseQuery = db.select({
      anilistId: characters.anilistId,
      slug: characters.slug,
      name: characters.name,
      altNames: characters.altNames,
      description: characters.description,
      gender: characters.gender,
      role: characters.role,
      imageUrl: characters.imageUrl,
      popularity: characters.popularity,
      score: characters.score,
      workId: characters.workId,
    }).from(characters);

    if (categoryConditions.length > 0) {
      
    }

    const result = await baseQuery
      .orderBy(desc(characters.popularity))
      .limit(limit)
      .offset(offset);

    const total = await db.select({ count: sql<number>`count(*)` }).from(characters);

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

  async findOne(anilistId: number) {
    const character = await db.query.characters.findFirst({
      where: eq(characters.anilistId, anilistId),
      with: {
        work: true,
      },
    });

    if (!character) return null;

    const categories = await db.select({
      type: categoryTypes.type,
      value: categoryValues.value,
    })
    .from(characterCategories)
    .leftJoin(categoryValues, eq(characterCategories.categoryValueId, categoryValues.id))
    .leftJoin(categoryTypes, eq(categoryValues.typeId, categoryTypes.id))
    .where(eq(characterCategories.characterId, anilistId));

    const rating = await db.query.characterRatings.findFirst({
      where: eq(characterRatings.characterId, anilistId),
    });

    return {
      ...character,
      categories: categories.reduce((acc, cat) => {
        if (!acc[cat.type]) acc[cat.type] = [];
        acc[cat.type].push(cat.value);
        return acc;
      }, {}),
      rating: rating || { totalVotes: 0, averageRating: 0 },
    };
  }

  async random(filters: Omit<CharacterFilter, 'page' | 'limit'>) {
    const all = await this.findAll({ ...filters, page: 1, limit: 1000 });
    if (all.data.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * all.data.length);
    return this.findOne(all.data[randomIndex].anilistId);
  }

  async getMetrics(anilistId: number) {
    const character = await db.query.characters.findFirst({
      where: eq(characters.anilistId, anilistId),
    });

    if (!character) return null;

    const [totalClaims] = await db.select({ count: sql<number>`count(*)` })
      .from(userCollections)
      .where(eq(userCollections.characterId, anilistId));

    const [totalFavorites] = await db.select({ count: sql<number>`count(*)` })
      .from(userFavorites)
      .where(eq(userFavorites.characterId, anilistId));

    const [globalRank] = await db.select({ rank: sql<number>`rank()` })
      .from(characters)
      .orderBy(desc(characters.popularity))
      .where(sql`${characters.popularity} >= ${character.popularity}`)
      .limit(1);

    return {
      globalRank: globalRank?.rank || 0,
      totalClaims: totalClaims?.count || 0,
      totalFavorites: totalFavorites?.count || 0,
    };
  }

  async getRelated(anilistId: number, limit: number = 5) {
    const characterCats = await db.select({
      categoryValueId: characterCategories.categoryValueId,
    })
    .from(characterCategories)
    .where(eq(characterCategories.characterId, anilistId));

    if (characterCats.length === 0) return [];

    const categoryIds = characterCats.map(c => c.categoryValueId);

    const relatedCounts = await db.select({
      characterId: characterCategories.characterId,
      sharedTags: sql<number>`count(*)`,
    })
    .from(characterCategories)
    .where(and(
      inArray(characterCategories.categoryValueId, categoryIds),
      sql`${characterCategories.characterId} != ${anilistId}`
    ))
    .groupBy(characterCategories.characterId)
    .orderBy(desc(sql<number>`count(*)`))
    .limit(limit);

    const relatedIds = relatedCounts.map(r => r.characterId);

    const relatedChars = await db.select({
      anilistId: characters.anilistId,
      name: characters.name,
      imageUrl: characters.imageUrl,
      slug: characters.slug,
    })
    .from(characters)
    .where(inArray(characters.anilistId, relatedIds));

    return relatedChars.map(char => ({
      ...char,
      sharedTags: relatedCounts.find(r => r.characterId === char.anilistId)?.sharedTags || 0,
    })).sort((a, b) => b.sharedTags - a.sharedTags);
  }

  async getVolume(anilistId: number, months: number = 6) {
    const now = new Date();
    const volumes = [];

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const [countResult] = await db.select({ count: sql<number>`count(*)` })
        .from(userCollections)
        .where(and(
          eq(userCollections.characterId, anilistId),
          sql`${userCollections.obtainedAt} >= ${monthStart}`,
          sql`${userCollections.obtainedAt} <= ${monthEnd}`
        ));

      volumes.push({
        month: monthStart.toLocaleString('en-US', { month: 'short' }),
        year: monthStart.getFullYear(),
        count: countResult?.count || 0,
      });
    }

    return volumes;
  }
}
