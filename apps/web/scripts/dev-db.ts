import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

async function main() {
  const mongod = await MongoMemoryServer.create({
    instance: { dbName: "pzb_dev" },
  });
  const uri = mongod.getUri();

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("pzb_dev");

  const now = new Date();
  await db.collection("members").insertMany([
    {
      clerkUserId: "dev_user_1",
      accountType: "persona",
      name: "Ana Torres",
      email: "ana@example.com",
      profession: "Psicóloga clínica",
      keywords: ["psicologa", "terapia"],
      interests: [],
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      clerkUserId: "dev_user_2",
      accountType: "persona",
      name: "Marcela Ruiz",
      email: "marcela@example.com",
      profession: "Coach de nutrición",
      keywords: ["nutricion", "coach"],
      interests: [],
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      clerkUserId: "dev_user_3",
      accountType: "empresa",
      name: "Estudio Lumen (RH)",
      email: "contacto@lumen.com",
      profession: "Consultora de Recursos Humanos",
      keywords: ["rh", "consultoria"],
      interests: [],
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  await db.collection("members").createIndex(
    { name: "text", profession: "text", keywords: "text", bio: "text" },
    { name: "member_search", weights: { name: 5, profession: 4, keywords: 3, bio: 1 } }
  );

  const inDays = (n: number) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);
  await db.collection("events").insertMany([
    {
      title: "Vision Board Session — grupal",
      type: "taller",
      description: "Sesión grupal para plasmar lo que quieres para el resto del año.",
      location: "Estudio Pilar, CDMX",
      isOnline: false,
      startsAt: inDays(5),
      priceCents: 350000,
      currency: "mxn",
      status: "published",
      createdByClerkUserId: "dev_user_1",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Cena Life Notes de agosto",
      type: "cena",
      description: "Cena mensual de la comunidad, espacio para conectar sin agenda.",
      location: "Por confirmar",
      isOnline: false,
      startsAt: inDays(12),
      priceCents: 0,
      currency: "mxn",
      status: "published",
      createdByClerkUserId: "dev_user_1",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Retiro de liderazgo — Zere Studio",
      type: "zere_studio",
      description: "Retiro corporativo de un día para equipos de liderazgo.",
      location: "Valle de Bravo",
      isOnline: false,
      startsAt: inDays(30),
      priceCents: 0,
      currency: "mxn",
      status: "published",
      createdByClerkUserId: "dev_user_1",
      createdAt: now,
      updatedAt: now,
    },
  ]);

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
