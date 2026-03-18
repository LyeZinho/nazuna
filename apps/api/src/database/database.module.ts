import { Module, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { count } from 'drizzle-orm';
import { categoryTypes } from '@anime-bot/db/schema';
import { db } from '@anime-bot/db';

const execAsync = promisify(exec);

@Injectable()
export class DatabaseMigrationService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseMigrationService.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.seedIfEmpty();
  }

  private async seedIfEmpty() {
    try {
      const [result] = await db.select({ count: count() }).from(categoryTypes).limit(1);
      if (result && result.count > 0) {
        this.logger.log('Database already seeded, skipping...');
        return;
      }
      this.logger.log('Database is empty — running seeds...');
      await this.seedDatabase();
    } catch (err) {
      this.logger.warn('Could not check seed status, skipping auto-seed:', (err as Error).message);
    }
  }

  async runMigrations() {
    this.logger.log('Running database migrations...');
    const migrateScript = join(__dirname, '../../../../packages/db/dist/migrate.js');
    try {
      const { stdout, stderr } = await execAsync(`node ${migrateScript}`, {
        env: { ...process.env },
        timeout: 60_000,
      });
      if (stdout) this.logger.log(stdout.trim());
      if (stderr) this.logger.warn(stderr.trim());
      this.logger.log('Schema migration completed');
    } catch (error: unknown) {
      const execError = error as { stdout?: string; stderr?: string; message?: string };
      this.logger.error('Schema migration failed:', execError.stderr || execError.message);
      throw error;
    }
  }

  async seedDatabase() {
    this.logger.log('Running database seeds...');
    const seedScript = join(__dirname, '../../../../packages/db/dist/seed.js');
    try {
      const { stdout, stderr } = await execAsync(`node ${seedScript}`, {
        env: { ...process.env },
        timeout: 300_000,
      });
      if (stdout) this.logger.log(stdout.trim());
      if (stderr) this.logger.warn(stderr.trim());
      this.logger.log('Seeds completed');
    } catch (error: unknown) {
      const execError = error as { stdout?: string; stderr?: string; message?: string };
      this.logger.error('Seeds failed:', execError.stderr || execError.message);
    }
  }
}

@Module({
  providers: [DatabaseMigrationService],
  exports: [DatabaseMigrationService],
})
export class DatabaseModule {}
