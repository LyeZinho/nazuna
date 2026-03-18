import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('users')
@Controller('users')
@UseGuards(ThrottlerGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  getMe(@Query('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Get('me/favorites')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user favorites' })
  getFavorites(@Query('userId') userId: string) {
    return this.usersService.getFavorites(userId);
  }

  @Get('me/collections')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user collections' })
  getCollections(
    @Query('userId') userId: string,
    @Query('serverId') serverId?: string,
  ) {
    return this.usersService.getCollections(userId, serverId);
  }

  @Get('me/ratings')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user ratings' })
  getRatings(@Query('userId') userId: string) {
    return this.usersService.getRatings(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (public)' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
