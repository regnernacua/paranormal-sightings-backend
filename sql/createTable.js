import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function createTable() {

  const dbPath = path.join(__dirname, '..', 'db', 'database.db')

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sightings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE,
      location TEXT,
      timeStamp TEXT,
      title TEXT NOT NULL, 
      text TEXT
    );
  `)

  await db.close()
  console.log('table created')
}

createTable()