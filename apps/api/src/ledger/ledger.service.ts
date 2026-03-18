import { Injectable } from '@nestjs/common';
import { db, ledgerLogs, users, servers, characters, eq, desc, sql } from '@anime-bot/db';

@Injectable()
export class LedgerService {
  async log(action: string, userId?: string, serverId?: string, characterId?: number, metadata?: Record<string, any>) {
    const [result] = await db.insert(ledgerLogs).values({
      userId,
      serverId,
      actionType: action as any,
      characterId,
      metadata,
    }).returning();
    return result;
  }

  async getUserLogs(userId: string, page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    return db.select({
      id: ledgerLogs.id,
      actionType: ledgerLogs.actionType,
      characterId: ledgerLogs.characterId,
      metadata: ledgerLogs.metadata,
      createdAt: ledgerLogs.createdAt,
    })
    .from(ledgerLogs)
    .where(eq(ledgerLogs.userId, userId))
    .orderBy(desc(ledgerLogs.createdAt))
    .limit(limit)
    .offset(offset);
  }

  async getServerLogs(serverId: string, page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    return db.select({
      id: ledgerLogs.id,
      userId: ledgerLogs.userId,
      actionType: ledgerLogs.actionType,
      characterId: ledgerLogs.characterId,
      metadata: ledgerLogs.metadata,
      createdAt: ledgerLogs.createdAt,
    })
    .from(ledgerLogs)
    .where(eq(ledgerLogs.serverId, serverId))
    .orderBy(desc(ledgerLogs.createdAt))
    .limit(limit)
    .offset(offset);
  }
}
