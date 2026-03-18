import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('characters')
@Controller('characters')
@UseGuards(ThrottlerGuard)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiOperation({ summary: 'List all characters with filters' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('gender') gender?: string,
    @Query('role') role?: string,
    @Query('personality') personality?: string,
    @Query('hairColor') hairColor?: string,
    @Query('eyeColor') eyeColor?: string,
    @Query('bodyType') bodyType?: string,
    @Query('archetype') archetype?: string,
    @Query('genre') genre?: string,
    @Query('format') format?: string,
  ) {
    return this.charactersService.findAll({
      page: Number(page) || 1,
      limit: Math.min(Number(limit) || 50, 100),
      search,
      gender,
      role,
      personality: personality?.split(','),
      hairColor,
      eyeColor,
      bodyType,
      archetype: archetype?.split(','),
      genre: genre?.split(','),
      format: format?.split(','),
    });
  }

  @Get('random')
  @ApiOperation({ summary: 'Get random character (roulette)' })
  async random(
    @Query('gender') gender?: string,
    @Query('role') role?: string,
    @Query('personality') personality?: string,
    @Query('hairColor') hairColor?: string,
    @Query('eyeColor') eyeColor?: string,
    @Query('bodyType') bodyType?: string,
    @Query('archetype') archetype?: string,
    @Query('genre') genre?: string,
    @Query('format') format?: string,
  ) {
    return this.charactersService.random({
      gender,
      role,
      personality: personality?.split(','),
      hairColor,
      eyeColor,
      bodyType,
      archetype: archetype?.split(','),
      genre: genre?.split(','),
      format: format?.split(','),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get character by ID' })
  async findOne(@Param('id') id: string) {
    const anilistId = parseInt(id);
    return this.charactersService.findOne(anilistId);
  }

  @Get(':id/metrics')
  @ApiOperation({ summary: 'Get character metrics (rank, claims, favorites)' })
  async getMetrics(@Param('id') id: string) {
    const anilistId = parseInt(id);
    return this.charactersService.getMetrics(anilistId);
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related characters by shared tags' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getRelated(@Param('id') id: string, @Query('limit') limit?: number) {
    const anilistId = parseInt(id);
    return this.charactersService.getRelated(anilistId, Number(limit) || 5);
  }

  @Get(':id/volume')
  @ApiOperation({ summary: 'Get claim volume over time' })
  @ApiQuery({ name: 'months', required: false, type: Number })
  async getVolume(@Param('id') id: string, @Query('months') months?: number) {
    const anilistId = parseInt(id);
    return this.charactersService.getVolume(anilistId, Number(months) || 6);
  }
}
