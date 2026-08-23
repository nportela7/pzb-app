import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

// Demo content for showing the platform with a living community
// instead of empty states — real-feeling socias and upcoming events
// across every Eventos category.

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
      clerkUserId: "demo_member_valentina",
      accountType: "persona",
      name: "Valentina Reyes",
      email: "valentina.reyes.demo@pzb.mx",
      bio: "Psicóloga clínica enfocada en procesos de transición de vida. Llegué a Life Notes buscando una comunidad que entendiera que reinventarse no es una crisis, es una decisión.",
      profession: "Psicóloga clínica",
      keywords: ["psicología", "transiciones", "terapia individual"],
      interests: ["bienestar emocional", "lectura", "senderismo"],
      location: "Ciudad de México",
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      clerkUserId: "demo_member_camila",
      accountType: "persona",
      name: "Camila Duarte",
      email: "camila.duarte.demo@pzb.mx",
      bio: "Fotógrafa de retrato editorial. Después de mi sesión en Zere Studio entendí que mi propia imagen también merecía ese cuidado.",
      profession: "Fotógrafa",
      keywords: ["fotografía", "retrato", "dirección de arte"],
      interests: ["cine", "café de especialidad"],
      location: "Guadalajara",
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      clerkUserId: "demo_member_renata",
      accountType: "persona",
      name: "Renata Solís",
      email: "renata.solis.demo@pzb.mx",
      bio: "Fundadora de una consultora de branding. El coaching con Pilar me ayudó a que mi imagen pública por fin coincidiera con quién soy puertas adentro.",
      profession: "Consultora de marca",
      keywords: ["branding", "marca personal", "comunicación"],
      interests: ["diseño", "viajes de trabajo"],
      location: "Monterrey",
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      clerkUserId: "demo_member_ines",
      accountType: "persona",
      name: "Inés Barragán",
      email: "ines.barragan.demo@pzb.mx",
      bio: "Nutrióloga funcional. Los retiros de Zere Studio son mi reset trimestral favorito.",
      profession: "Nutrióloga",
      keywords: ["nutrición", "hábitos", "bienestar integral"],
      interests: ["cocina", "yoga"],
      location: "Querétaro",
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      clerkUserId: "demo_member_paola",
      accountType: "persona",
      name: "Paola Iturbide",
      email: "paola.iturbide.demo@pzb.mx",
      bio: "Diseñadora de interiores. Busco socias para colaborar en proyectos que mezclen espacio y bienestar.",
      profession: "Diseñadora de interiores",
      keywords: ["diseño de interiores", "espacios", "colaboraciones"],
      interests: ["arquitectura", "arte contemporáneo"],
      location: "Ciudad de México",
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      clerkUserId: "demo_member_daniela",
      accountType: "persona",
      name: "Daniela Chávez",
      email: "daniela.chavez.demo@pzb.mx",
      bio: "Abogada corporativa en transición hacia consultoría independiente. The Alignment Partnership me está ayudando a hacer ese salto con claridad.",
      profession: "Abogada",
      keywords: ["derecho corporativo", "consultoría", "reinvención profesional"],
      interests: ["running", "podcasts"],
      location: "Monterrey",
      contactVisibility: "members",
      contactMethods: {},
      isAdmin: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      clerkUserId: "demo_member_cardamomo",
      accountType: "empresa",
      name: "Estudio Cardamomo",
      email: "hola.cardamomo.demo@pzb.mx",
      bio: "Estudio de eventos boutique. Nos encanta patrocinar y co-crear experiencias con la comunidad de Pilar.",
      profession: "Producción de eventos",
      keywords: ["eventos", "producción", "experiencias"],
      interests: ["colaboraciones de marca"],
      location: "Ciudad de México",
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

  const inDays = (n: number, hour = 18) => {
    const d = new Date(now.getTime() + n * 24 * 60 * 60 * 1000);
    d.setHours(hour, 0, 0, 0);
    return d;
  };

  await db.collection("events").insertMany([
    {
      title: "Círculo Abierto: Preguntas y Café",
      type: "sesion_abierta",
      description:
        "Una tarde sin agenda fija para socias nuevas y de siempre: café, preguntas abiertas sobre coaching y comunidad, y espacio para conocerse. Entrada libre, cupo limitado.",
      location: "Casa Pilar, Ciudad de México",
      isOnline: false,
      startsAt: inDays(6, 17),
      endsAt: inDays(6, 19),
      capacity: 20,
      priceCents: 0,
      currency: "mxn",
      status: "published",
      createdByClerkUserId: "demo_admin",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Taller: Encuentra tu Paleta de Color Personal",
      type: "taller",
      description:
        "Un taller práctico de 3 horas para identificar los colores que realmente te favorecen y simplificar tu clóset. Incluye análisis individual y guía impresa para llevar a casa.",
      location: "Estudio PZB, Ciudad de México",
      isOnline: false,
      startsAt: inDays(13, 10),
      endsAt: inDays(13, 13),
      capacity: 12,
      priceCents: 185000,
      currency: "mxn",
      status: "published",
      createdByClerkUserId: "demo_admin",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Zere Studio: Sesión de Retrato Editorial",
      type: "zere_studio",
      description:
        "Sesión de fotografía editorial en el agua, guiada por el equipo de Zere Studio. Dirección de arte, vestuario y una experiencia pensada para que te veas como te sientes.",
      location: "Zere Studio, Tulum",
      isOnline: false,
      startsAt: inDays(21, 9),
      endsAt: inDays(21, 14),
      capacity: 6,
      priceCents: 420000,
      currency: "mxn",
      status: "published",
      createdByClerkUserId: "demo_admin",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Cena Intención: Cierre de Trimestre",
      type: "cena",
      description:
        "Cena de sobremesa larga para cerrar el trimestre en comunidad: qué soltamos, qué seguimos y qué viene. Menú de temporada, mesa compartida de 14 socias.",
      location: "Restaurante Merotoro, Ciudad de México",
      isOnline: false,
      startsAt: inDays(27, 20),
      endsAt: inDays(27, 23),
      capacity: 14,
      priceCents: 145000,
      currency: "mxn",
      status: "published",
      createdByClerkUserId: "demo_admin",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Retiro Zere: Aguas Claras",
      type: "retiro",
      description:
        "Retiro de fin de semana en Valle de Bravo: coaching grupal por las mañanas, tiempo libre junto al agua, y una sesión de cierre uno a uno con Pilar. Incluye hospedaje y todas las comidas.",
      location: "Valle de Bravo, Estado de México",
      isOnline: false,
      startsAt: inDays(42, 12),
      endsAt: inDays(44, 12),
      capacity: 16,
      priceCents: 980000,
      currency: "mxn",
      status: "published",
      createdByClerkUserId: "demo_admin",
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
