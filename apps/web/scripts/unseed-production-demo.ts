import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Removes everything inserted by scripts/seed-production-demo.ts.

function loadEnvFile(path: string) {
  let contents: string;
  try {
    contents = readFileSync(path, "utf8");
  } catch {
    return;
  }
  for (const line of contents.split("\n")) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(join(process.cwd(), ".env.production.local"));

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
    .deleteMany({ clerkUserId: { $regex: /^demo_member_/ } });
  const events = await db
    .collection("events")
    .deleteMany({ createdByClerkUserId: "demo_admin" });

  console.log(`✓ ${members.deletedCount} socias de demo borradas.`);
  console.log(`✓ ${events.deletedCount} eventos de demo borrados.`);

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
