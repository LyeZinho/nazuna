import { Module, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class DatabaseMigrationService {
  constructor(private configService: ConfigService) {}

  async runMigrations() {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    if (!isProduction) {
      console.log('🔄 Skipping migrations in non-production mode');
      return;
    }

    console.log('🔄 Running database migrations...');
    
    try {
      await execAsync('pnpm --filter @anime-bot/db db:push');
      console.log('✅ Schema pushed successfully');
    } catch (error) {
      console.error('❌ Schema push failed:', error);
    }
  }

  async seedDatabase() {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    if (!isProduction) {
      console.log('🌱 Skipping seeds in non-production mode');
      return;
    }

    console.log('🌱 Running database seeds...');
    
    try {
      await execAsync('pnpm --filter @anime-bot/db db:seed');
      console.log('✅ Seeds completed successfully');
    } catch (error) {
      console.error('❌ Seeds failed:', error);
    }
  }
}

@Module({
  providers: [DatabaseMigrationService],
  exports: [DatabaseMigrationService],
})
export class DatabaseModule {}
