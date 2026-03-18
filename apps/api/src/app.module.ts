import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { CharactersModule } from './characters/characters.module';
import { WorksModule } from './works/works.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RatingsModule } from './ratings/ratings.module';
import { RankingsModule } from './rankings/rankings.module';
import { LedgerModule } from './ledger/ledger.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    CharactersModule,
    WorksModule,
    UsersModule,
    CollectionsModule,
    FavoritesModule,
    RatingsModule,
    RankingsModule,
    LedgerModule,
    WebhooksModule,
  ],
})
export class AppModule {}
