import fs from 'fs';
import path from 'path';
import pool from './database';

async function migrate() {
  const schemaPath = path.join(__dirname, '..', '..', '..', 'database', 'schema.sql');

  if (!fs.existsSync(schemaPath)) {
    console.error(`Schema file not found at ${schemaPath}`);
    process.exit(1);
  }

  const schema = fs.readFileSync(schemaPath, 'utf-8');

  try {
    const rows = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);
    for (const row of rows) {
      await pool.query(row);
      console.log(`Executed: ${row.substring(0, 80)}...`);
    }
    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }

  await pool.end();
}

migrate();
