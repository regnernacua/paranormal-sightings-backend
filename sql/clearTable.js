import { getDBConnection } from "../db/db.js";

async function clearTable() {
  const db = await getDBConnection();
  try {
    await db.run('DELETE FROM sightings');
    console.log('All sightings cleared!');
  } catch (err) {
    console.error(err);
  } finally {
    await db.close();
  }
}

clearTable();
