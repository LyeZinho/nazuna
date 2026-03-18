import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { eq, and, or, not, desc, asc, sql, inArray, isNull, isNotNull, count, sum, avg, min, max } from 'drizzle-orm';
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL not set');

const client = postgres(connectionString, { max: 10 });

export const db = drizzle(client, { schema });

export { eq, and, or, not, desc, asc, sql, inArray, isNull, isNotNull, count, sum, avg, min, max };
export * from './schema';
