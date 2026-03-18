import { Injectable } from '@nestjs/common';
import { LedgerService } from '../ledger/ledger.service';

@Injectable()
export class WebhooksService {
  constructor(private ledgerService: LedgerService) {}

  async handleDiscordEvent(event: {
    type: string;
    userId?: string;
    serverId?: string;
    characterId?: number;
    metadata?: Record<string, any>;
  }) {
    const actionMap: Record<string, string> = {
      'roulette_spin': 'roulette_spin',
      'character_obtained': 'character_obtained',
      'character_gifted': 'character_gifted',
      'server_joined': 'server_joined',
      'server_left': 'server_left',
    };

    const action = actionMap[event.type];
    if (!action) return { success: false, error: 'Unknown event type' };

    await this.ledgerService.log(
      action,
      event.userId,
      event.serverId,
      event.characterId,
      event.metadata,
    );

    return { success: true };
  }
}
