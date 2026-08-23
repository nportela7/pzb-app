import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildDemoMembers, buildDemoEvents } from "../src/lib/demo-content";

async function main() {
  const mongod = await MongoMemoryServer.create({
    instance: { dbName: "pzb_dev" },
  });
  const uri = mongod.getUri();

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("pzb_dev");
  const now = new Date();

  await db.collection("members").insertMany(buildDemoMembers(now));

  await db.collection("members").createIndex(
    { name: "text", profession: "text", keywords: "text", bio: "text" },
    { name: "member_search", weights: { name: 5, profession: 4, keywords: 3, bio: 1 } }
  );

  await db.collection("events").insertMany(buildDemoEvents(now));

  await client.close();

  const envPath = join(process.cwd(), ".env.local");
  writeFileSync(
    envPath,
    `MONGODB_URI=${uri}\nMONGODB_DB_NAME=pzb_dev\n`
  );

  console.log("Dev MongoDB running at", uri);
  console.log("Wrote .env.local — keep this process running while you use `next dev`.");

  process.on("SIGINT", async () => {
    await mongod.stop();
    process.exit(0);
  });

  // Keep process alive
  await new Promise(() => {});
}

main();
