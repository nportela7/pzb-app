import { MongoClient } from "mongodb";
import {
  buildDemoMembers,
  buildDemoEvents,
  DEMO_EVENT_CREATOR,
} from "../src/lib/demo-content";

// One-off seed for a client demo meeting, meant to run wherever
// MONGODB_URI is directly available (not via `vercel env pull`, which
// masks Sensitive-flagged variables). For production, prefer the
// owner-only /seed-demo page in the app itself instead — it uses the
// runtime connection directly. Kept here for any environment where a
// real MONGODB_URI is exported locally (e.g. a staging DB).

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Falta MONGODB_URI en el entorno.");
    process.exit(1);
  }
  const dbName = process.env.MONGODB_DB_NAME || "pzb";
  console.log(`Sembrando demo en la base "${dbName}"...`);

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const now = new Date();

  const members = db.collection("members");
  let memberUpserts = 0;
  for (const m of buildDemoMembers(now)) {
    await members.updateOne({ email: m.email }, { $set: m }, { upsert: true });
    memberUpserts++;
  }

  const events = db.collection("events");
  let eventUpserts = 0;
  for (const e of buildDemoEvents(now)) {
    await events.updateOne(
      { title: e.title, createdByClerkUserId: DEMO_EVENT_CREATOR },
      { $set: e },
      { upsert: true }
    );
    eventUpserts++;
  }

  console.log(`✓ ${memberUpserts} socias de demo listas en "members".`);
  console.log(`✓ ${eventUpserts} eventos de demo listos en "events".`);

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
