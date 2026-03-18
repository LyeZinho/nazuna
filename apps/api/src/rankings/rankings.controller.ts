import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RankingsService } from './rankings.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('rankings')
@Controller('rankings')
@UseGuards(ThrottlerGuard)
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @Get('popularity')
  @ApiOperation({ summary: 'Get ranking by popularity' })
  byPopularity(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.rankingsService.byPopularity(Number(page) || 1, Math.min(Number(limit) || 50, 100));
  }

  @Get('ratings')
  @ApiOperation({ summary: 'Get ranking by website rating' })
  byRatings(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.rankingsService.byRating(Number(page) || 1, Math.min(Number(limit) || 50, 100));
  }

  @Get('combined')
  @ApiOperation({ summary: 'Get combined ranking' })
  combined(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.rankingsService.combined(Number(page) || 1, Math.min(Number(limit) || 50, 100));
  }
}
