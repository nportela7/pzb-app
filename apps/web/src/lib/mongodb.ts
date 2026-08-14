import { MongoClient } from "mongodb";
import { constants as cryptoConstants } from "node:crypto";
import { createSecureContext } from "node:tls";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function connect(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }
  return new MongoClient(uri, {
    serverSelectionTimeoutMS: 10_000,
    // Node 17+ (OpenSSL 3.0) disables legacy TLS renegotiation by default,
    // which some Atlas M0 clusters still rely on mid-handshake. Without this,
    // connections intermittently fail with "SSL alert number 80" /
    // tlsv1 alert internal error under Node's newer OpenSSL.
    secureContext: createSecureContext({
      secureOptions: cryptoConstants.SSL_OP_LEGACY_SERVER_CONNECT,
    }),
  }).connect();
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
