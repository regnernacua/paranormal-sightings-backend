import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import fs from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function seedTable() {
  const dbPath = path.join(__dirname, '..', 'db', 'database.db')

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  const dataPath = path.join(__dirname, '..', 'data', 'data.json')
  const file = await fs.readFile(dataPath, 'utf8')
  const sightings = JSON.parse(file)
  
  try {
    await db.exec('BEGIN TRANSACTION')
    for (const { uuid, location, timeStamp, title, text } of sightings) {
      await db.run(
        `INSERT INTO sightings (uuid, location, timeStamp, title, text) 
        VALUES (?, ?, ?, ?, ?)`,
        [uuid, location, timeStamp, title, text]
      )
    }
    await db.exec('COMMIT')
    console.log('All records inserted successfully.')
  } catch (error) {
    await db.exec('ROLLBACK')
    console.log('Error inserting data:', error.message)
  } finally {
    await db.close()
    console.log('Database connection closed.')
  }
}

seedTable()
