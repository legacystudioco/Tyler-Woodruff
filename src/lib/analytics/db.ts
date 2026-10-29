import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type Sql = NeonQueryFunction<false, false>;

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

let client: Sql | null = null;
let migrated: Promise<void> | null = null;

export function isStorageConfigured() {
  return Boolean(connectionString);
}

// Returns null when no database is connected so tracking quietly no-ops.
export async function getSql(): Promise<Sql | null> {
  if (!connectionString) return null;
  client ??= neon(connectionString);
  migrated ??= migrate(client).catch((error) => {
    migrated = null;
    throw error;
  });
  await migrated;
  return client;
}

async function migrate(sql: Sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS visits (
      id text PRIMARY KEY,
      visitor_id text NOT NULL,
      path text NOT NULL,
      referrer text,
      device text,
      city text,
      region text,
      country text,
      started_at timestamptz NOT NULL DEFAULT now(),
      last_seen timestamptz NOT NULL DEFAULT now(),
      max_scroll smallint NOT NULL DEFAULT 0,
      active_ms integer NOT NULL DEFAULT 0
    )`;
  await sql`CREATE INDEX IF NOT EXISTS visits_started_at_idx ON visits (started_at)`;
  await sql`
    CREATE TABLE IF NOT EXISTS section_views (
      visit_id text NOT NULL REFERENCES visits (id) ON DELETE CASCADE,
      section text NOT NULL,
      ms integer NOT NULL DEFAULT 0,
      stops integer NOT NULL DEFAULT 0,
      first_ms integer NOT NULL DEFAULT 0,
      PRIMARY KEY (visit_id, section)
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id bigserial PRIMARY KEY,
      key text NOT NULL,
      at timestamptz NOT NULL DEFAULT now()
    )`;
  await sql`CREATE INDEX IF NOT EXISTS login_attempts_at_idx ON login_attempts (at)`;
}
