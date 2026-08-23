import { MongoClient } from "mongodb";
import { DEMO_MEMBER_PREFIX, DEMO_EVENT_CREATOR } from "../src/lib/demo-content";

// Removes everything inserted by scripts/seed-production-demo.ts (or
// the /seed-demo owner-only route). See that script's header for why
// this generally isn't usable against the real production DB.

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Falta MONGODB_URI en el entorno.");
    process.exit(1);
  }
  const dbName = process.env.MONGODB_DB_NAME || "pzb";
  console.log(`Borrando demo de la base "${dbName}"...`);

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const members = await db
    .collection("members")
    .deleteMany({ clerkUserId: { $regex: `^${DEMO_MEMBER_PREFIX}` } });
  const events = await db
    .collection("events")
    .deleteMany({ createdByClerkUserId: DEMO_EVENT_CREATOR });

  console.log(`✓ ${members.deletedCount} socias de demo borradas.`);
  console.log(`✓ ${events.deletedCount} eventos de demo borrados.`);

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
