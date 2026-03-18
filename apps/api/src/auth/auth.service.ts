import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { db, users, userServers, servers, eq, and, sql } from '@anime-bot/db';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateDiscordUser(discordUser: any) {
    let user = await db.query.users.findFirst({
      where: eq(users.id, discordUser.id),
    });

    if (!user) {
      await db.insert(users).values({
        id: discordUser.id,
        username: discordUser.username,
        globalName: discordUser.global_name,
        avatar: discordUser.avatar,
      });
      user = await db.query.users.findFirst({
        where: eq(users.id, discordUser.id),
      });
    } else {
      await db.update(users)
        .set({
          username: discordUser.username,
          globalName: discordUser.global_name,
          avatar: discordUser.avatar,
        })
        .where(eq(users.id, discordUser.id));
    }

    return user;
  }

  async loginWithDiscord(discordUser: any) {
    const user = await this.validateDiscordUser(discordUser);
    
    const payload = { sub: user.id, username: user.username };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        globalName: user.globalName,
        avatar: user.avatar,
      },
    };
  }

  async validateApiKey(apiKey: string) {
    return true;
  }

  async generateApiKey(userId: string, name: string) {
    const key = `ak_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    return { key, name, userId };
  }
}
