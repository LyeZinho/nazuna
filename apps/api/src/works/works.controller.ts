import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WorksService } from './works.service';

@ApiTags('works')
@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  @ApiOperation({ summary: 'List all works' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.worksService.findAll(Number(page) || 1, Math.min(Number(limit) || 50, 100));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get work by ID' })
  findOne(@Param('id') id: string) {
    return this.worksService.findOne(id);
  }
}
