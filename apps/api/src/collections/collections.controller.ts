import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('collections')
@Controller('collections')
@UseGuards(ThrottlerGuard)
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get(':serverId')
  @ApiOperation({ summary: 'Get server collection' })
  getServerCollection(@Param('serverId') serverId: string) {
    return this.collectionsService.getServerCollection(serverId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add character to collection' })
  addCharacter(
    @Body() body: { userId: string; serverId: string; characterId: number; source?: string },
  ) {
    return this.collectionsService.addCharacter(
      body.userId,
      body.serverId,
      body.characterId,
      body.source,
    );
  }
}
