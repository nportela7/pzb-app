import { MongoClient } from "mongodb";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildDemoMembers,
  buildDemoEvents,
  DEMO_MEMBER_PREFIX,
  DEMO_EVENT_CREATOR,
} from "../src/lib/demo-content";

// Siembra la base de desarrollo en el mongod local (Homebrew) en lugar de
// levantar un mongodb-memory-server efímero.
//
// El memory-server elegía un puerto ALEATORIO en cada arranque, lo escribía
// a .env.local y exigía mantener este proceso vivo indefinidamente. Si el
// proceso moría (Ctrl+C, terminal cerrada), .env.local quedaba apuntando a
// un puerto fantasma y `next dev` reventaba con ECONNREFUSED.
//
// Con el mongod local el puerto es fijo, los datos sobreviven al reinicio y
// este script termina apenas siembra.

const DEV_URI = process.env.DEV_MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DEV_MONGODB_DB_NAME || "pzb_dev";

/**
 * Escribe/actualiza claves en .env.local preservando el resto del archivo.
 * La versión anterior lo sobrescribía entero, borrando cualquier otra clave
 * (Clerk, R2, Stripe...) que el dev tuviera ahí.
 */
function upsertEnvLocal(vars: Record<string, string>) {
  const path = join(process.cwd(), ".env.local");
  const lines = existsSync(path) ? readFileSync(path, "utf8").split("\n") : [];

  for (const [key, value] of Object.entries(vars)) {
    const index = lines.findIndex((line) => line.trimStart().startsWith(`${key}=`));
    if (index >= 0) lines[index] = `${key}=${value}`;
    else lines.push(`${key}=${value}`);
  }

  writeFileSync(path, `${lines.join("\n").trimEnd()}\n`);
  return path;
}

async function main() {
  // getDb() lee estas variables: hay que fijarlas ANTES del import dinámico
  // de init-indexes, que arrastra a src/lib/mongodb.
  process.env.MONGODB_URI = DEV_URI;
  process.env.MONGODB_DB_NAME = DB_NAME;

  const client = new MongoClient(DEV_URI, { serverSelectionTimeoutMS: 3_000 });
  try {
    await client.connect();
  } catch {
    console.error(`✗ No hay un MongoDB escuchando en ${DEV_URI}.`);
    console.error("  Levantalo con:  brew services start mongodb-community");
    process.exit(1);
  }

  // Índices primero: los unique tienen que existir antes de insertar.
  // Reusamos la definición canónica en vez de recrear el text index a mano
  // (antes acá se creaba 1 solo de los 8 índices que usa la app).
  const { initIndexes } = await import("../src/models/init-indexes");
  for (const result of await initIndexes()) {
    if (!result.ok) console.warn(`  ! índice "${result.label}": ${result.error}`);
  }

  // Idempotente: la base ahora persiste, así que re-sembrar no debe duplicar.
  const db = client.db(DB_NAME);
  const now = new Date();

  await db
    .collection("members")
    .deleteMany({ clerkUserId: { $regex: `^${DEMO_MEMBER_PREFIX}` } });
  await db.collection("events").deleteMany({ createdByClerkUserId: DEMO_EVENT_CREATOR });

  const members = await db.collection("members").insertMany(buildDemoMembers(now));
  const events = await db.collection("events").insertMany(buildDemoEvents(now));

  await client.close();

  const envPath = upsertEnvLocal({ MONGODB_URI: DEV_URI, MONGODB_DB_NAME: DB_NAME });

  console.log(`✓ ${members.insertedCount} socias y ${events.insertedCount} eventos de demo en "${DB_NAME}".`);
  console.log(`✓ ${envPath} apunta a ${DEV_URI}`);
  console.log("  El puerto es fijo: no hace falta dejar este proceso vivo.");

  // initIndexes() dejó abierto su propio cliente vía getDb().
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
