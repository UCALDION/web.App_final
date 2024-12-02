import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../../items.db');

export const db = new Database(dbPath);

export function initializeDatabase() {
  const createTable = `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.exec(createTable);
}