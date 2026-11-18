import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';

const app = express();

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 3,
  connectionTimeoutMillis: 3000,
});

app.get('/api/hello', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        message,
        current_database() AS database
      FROM app_messages
      ORDER BY id DESC
      LIMIT 1
    `);

    res.json(result.rows[0] ?? {
      message: '데이터 없음',
      database: 'hello_app',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Database query failed',
    });
  }
});

const PORT = Number(process.env.PORT ?? 3100);

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API: http://127.0.0.1:${PORT}`);
});
