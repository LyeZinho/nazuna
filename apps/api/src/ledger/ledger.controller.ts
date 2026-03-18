import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LedgerService } from './ledger.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('ledger')
@Controller('ledger')
@UseGuards(ThrottlerGuard)
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get('user/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user ledger logs' })
  getUserLogs(
    @Param('userId') userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.ledgerService.getUserLogs(userId, Number(page) || 1, Math.min(Number(limit) || 50, 100));
  }

  @Get('server/:serverId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get server ledger logs' })
  getServerLogs(
    @Param('serverId') serverId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.ledgerService.getServerLogs(serverId, Number(page) || 1, Math.min(Number(limit) || 50, 100));
  }
}
