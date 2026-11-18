import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './hot-updater-schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  strict: true,

  dbCredentials: {
    host: process.env.PGHOST!,
    port: Number(process.env.PGPORT ?? 5432),
    database: process.env.PGDATABASE!,
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    ssl: false,
  },
});
