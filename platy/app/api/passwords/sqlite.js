import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let dbPromise;
let db;

export async function getDb() {
  if (!db) {
    // pick your path
    const file = process.env.SQLITE_PATH || './platy/passwords.db';

    // ensure the directory exists
    await fs.promises.mkdir(path.dirname(file), { recursive: true });

    // now open (and let sqlite create the .db file)
    db = await open({
      filename: file,
      driver: sqlite3.Database,
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS passwords (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        name  TEXT NOT NULL,
        value TEXT NOT NULL
      )
    `);
  }
  return db;
}
