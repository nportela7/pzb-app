import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function connect(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }
  return new MongoClient(uri, { serverSelectionTimeoutMS: 10_000 }).connect();
}

let clientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  // In dev, stash the promise on `global` so it survives Next.js HMR reloads.
  const cache = process.env.NODE_ENV === "development" ? global : undefined;
  const cached = cache ? cache._mongoClientPromise : clientPromise;
  if (cached) return cached;

  const promise = connect().catch((err) => {
    // Don't cache a failed connection attempt — let the next request retry.
    if (cache) cache._mongoClientPromise = undefined;
    else clientPromise = undefined;
    throw err;
  });

  if (cache) cache._mongoClientPromise = promise;
  else clientPromise = promise;
  return promise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB_NAME || "pzb");
}
