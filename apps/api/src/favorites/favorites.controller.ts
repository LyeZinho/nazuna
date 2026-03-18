import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(ThrottlerGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get user favorites' })
  getFavorites(@Param('userId') userId: string) {
    return this.favoritesService.getUserFavorites(userId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add to favorites' })
  add(@Body() body: { userId: string; characterId: number }) {
    return this.favoritesService.addFavorite(body.userId, body.characterId);
  }

  @Delete(':characterId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove from favorites' })
  remove(
    @Param('characterId') characterId: string,
    @Body() body: { userId: string },
  ) {
    return this.favoritesService.removeFavorite(body.userId, parseInt(characterId));
  }
}
