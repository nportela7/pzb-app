import { MongoClient } from "mongodb";

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Uso: npm run make-admin -- correo@ejemplo.com");
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Falta MONGODB_URI en el entorno.");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB_NAME || "pzb");

  const result = await db
    .collection("members")
    .updateOne({ email }, { $set: { isAdmin: true, updatedAt: new Date() } });

  if (result.matchedCount === 0) {
    console.error(
      `No se encontró ninguna socia con el correo "${email}". Primero debe completar el onboarding en la app.`
    );
  } else {
    console.log(`"${email}" ahora es admin.`);
  }

  await client.close();
}

main();
