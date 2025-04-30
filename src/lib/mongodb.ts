import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb+srv://valuebound:E2gfdCBGyPrGy9C@cluster0.d3y7p.mongodb.net/';
const dbName = 'naukri_job_db';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    // Optional: Add connection options if needed
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}