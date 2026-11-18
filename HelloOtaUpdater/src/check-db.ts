import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  max: 3,
});

async function main() {
  try {
    const result = await sql`
      SELECT
        current_user AS username,
        current_database() AS database,
        version() AS version
    `;

    console.log('PostgreSQL 연결 성공');
    console.log(result[0]);
  } catch (error) {
    console.error('PostgreSQL 연결 실패:', error);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

main();
