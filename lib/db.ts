import { Pool } from 'pg';
import { Signer } from '@aws-sdk/rds-signer';

let pool: Pool | null = null;
let poolCreatedAt = 0;
const TOKEN_TTL_MS = 14 * 60 * 1000;

async function buildPool(): Promise<Pool> {
  if (process.env.DATABASE_URL) {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  const host   = process.env.DB_HOST!;
  const port   = parseInt(process.env.DB_PORT ?? '5432', 10);
  const user   = process.env.DB_USER!;
  const region = process.env.AWS_REGION ?? 'us-east-2';

  const token = await new Signer({ hostname: host, port, username: user, region }).getAuthToken();

  return new Pool({
    host,
    port,
    database: process.env.DB_NAME,
    user,
    password: token,
    ssl: { rejectUnauthorized: false },
    max: 3,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

export async function getPool(): Promise<Pool> {
  const now = Date.now();
  if (pool && (now - poolCreatedAt) < TOKEN_TTL_MS) return pool;
  if (pool) { try { await pool.end(); } catch (_) {} pool = null; }
  pool = await buildPool();
  poolCreatedAt = now;
  return pool;
}
