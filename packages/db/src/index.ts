import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { eq, and, or, not, desc, asc, sql, inArray, isNull, isNotNull, count, sum, avg, min, max } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/anime_bot';

const client = postgres(connectionString, { max: 10 });

export const db = drizzle(client, { schema });

export { eq, and, or, not, desc, asc, sql, inArray, isNull, isNotNull, count, sum, avg, min, max };
export * from './schema';
