import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('ratings')
@Controller('ratings')
@UseGuards(ThrottlerGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get('character/:id')
  @ApiOperation({ summary: 'Get character rating' })
  getCharacterRating(@Param('id') id: string) {
    return this.ratingsService.getCharacterRating(parseInt(id));
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit rating (1-5)' })
  submit(@Body() body: { userId: string; characterId: number; rating: number }) {
    return this.ratingsService.submitRating(body.userId, body.characterId, body.rating);
  }
}
