import { sql } from 'drizzle-orm';
import { db, pgClient } from './drizzle';

async function main() {
  try {
    const result = await db.execute(sql`
      SELECT
        current_database() AS database,
        current_user AS username
    `);

    console.log('Drizzle 연결 성공');
    console.log(result[0]);
  } finally {
    await pgClient.end();
  }
}

main().catch(console.error);
