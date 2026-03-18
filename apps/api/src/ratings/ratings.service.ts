import { Injectable } from '@nestjs/common';
import { db, userRatings, characterRatings, characters, eq, and, sql } from '@anime-bot/db';

@Injectable()
export class RatingsService {
  async getCharacterRating(characterId: number) {
    const rating = await db.query.characterRatings.findFirst({
      where: eq(characterRatings.characterId, characterId),
    });
    return rating || { totalVotes: 0, averageRating: 0 };
  }

  async submitRating(userId: string, characterId: number, rating: number) {
    const existing = await db.query.userRatings.findFirst({
      where: and(
        eq(userRatings.userId, userId),
        eq(userRatings.characterId, characterId)
      ),
    });

    if (existing) {
      const oldRating = existing.rating;
      await db.update(userRatings)
        .set({ rating, createdAt: new Date() })
        .where(and(
          eq(userRatings.userId, userId),
          eq(userRatings.characterId, characterId)
        ));

      await db.update(characterRatings)
        .set({
          sumRatings: sql`${characterRatings.sumRatings} - ${oldRating} + ${rating}`,
          averageRating: sql`((${characterRatings.sumRatings} - ${oldRating} + ${rating}) / ${characterRatings.totalVotes})`,
        })
        .where(eq(characterRatings.characterId, characterId));
    } else {
      await db.insert(userRatings).values({ userId, characterId, rating });

      await db.insert(characterRatings)
        .values({
          characterId,
          totalVotes: 1,
          sumRatings: rating,
          averageRating: rating,
        })
        .onConflictDoUpdate({
          target: characterRatings.characterId,
          set: {
            totalVotes: sql`${characterRatings.totalVotes} + 1`,
            sumRatings: sql`${characterRatings.sumRatings} + ${rating}`,
            averageRating: sql`((${characterRatings.sumRatings} + ${rating}) / (${characterRatings.totalVotes} + 1))`,
          },
        });
    }

    return this.getCharacterRating(characterId);
  }
}
