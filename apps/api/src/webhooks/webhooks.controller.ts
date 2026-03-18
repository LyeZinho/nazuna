import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('webhooks')
@Controller('webhooks')
@UseGuards(ThrottlerGuard)
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('discord')
  @ApiOperation({ summary: 'Handle Discord bot events' })
  async handleDiscord(@Body() body: {
    type: string;
    userId?: string;
    serverId?: string;
    characterId?: number;
    metadata?: Record<string, any>;
  }) {
    return this.webhooksService.handleDiscordEvent(body);
  }
}
