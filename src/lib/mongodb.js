// A singleton Mongo client so hot-reload doesn’t open multiple connections.
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("❌  Missing MONGODB_URI in env");

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function getDb() {
  const connection = await clientPromise;
  return connection.db(process.env.DB_NAME || "pfv");
}
