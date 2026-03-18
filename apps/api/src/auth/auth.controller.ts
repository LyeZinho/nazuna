import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('discord')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login with Discord OAuth' })
  async discordLogin(@Body() body: { user: any }) {
    return this.authService.loginWithDiscord(body.user);
  }

  @Post('api-key')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate API Key' })
  async generateApiKey(
    @Body() body: { name: string },
    @Headers('authorization') auth: string,
  ) {
    return this.authService.generateApiKey('user-id', body.name);
  }
}
