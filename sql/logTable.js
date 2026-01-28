import { getDBConnection } from "../db/db.js";

async function logTable() {
  const db = await getDBConnection()

  const tableName = 'sightings'

  try {
    const table = await db.all(`SELECT * FROM ${tableName}`)
    console.table(table)
  } catch (error) {
    console.error('Error fetching table:', error.message)
  } finally {
    await db.close()
  }
}

logTable()