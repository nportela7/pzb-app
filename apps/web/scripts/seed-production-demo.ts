import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";
import { join } from "node:path";

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

// One-off seed for a client demo meeting. Inserts the same demo
// community/events used in scripts/dev-db.ts, but into a REAL,
// persistent database via MONGODB_URI (meant to be run with
// --env-file=.env.production.local, never committed).
//
// Every doc is tagged so it can be found and removed later:
//   members            -> clerkUserId starts with "demo_member_"
//   events             -> createdByClerkUserId === "demo_admin"
// See scripts/unseed-production-demo.ts to remove them.

const now = new Date();
function daysFromNow(days: number, hour = 18) {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
}

const DEMO_MEMBERS = [
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
    onboardingCompletedAt: now,
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
    onboardingCompletedAt: now,
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
    onboardingCompletedAt: now,
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
    onboardingCompletedAt: now,
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
    onboardingCompletedAt: now,
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
    onboardingCompletedAt: now,
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
    onboardingCompletedAt: now,
    createdAt: now,
    updatedAt: now,
  },
];

const DEMO_EVENTS = [
  {
    title: "Círculo Abierto: Preguntas y Café",
    type: "sesion_abierta",
    description:
      "Una tarde sin agenda fija para socias nuevas y de siempre: café, preguntas abiertas sobre coaching y comunidad, y espacio para conocerse. Entrada libre, cupo limitado.",
    location: "Casa Pilar, Ciudad de México",
    isOnline: false,
    startsAt: daysFromNow(6, 17),
    endsAt: daysFromNow(6, 19),
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
    startsAt: daysFromNow(13, 10),
    endsAt: daysFromNow(13, 13),
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
    startsAt: daysFromNow(21, 9),
    endsAt: daysFromNow(21, 14),
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
    startsAt: daysFromNow(27, 20),
    endsAt: daysFromNow(27, 23),
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
    startsAt: daysFromNow(42, 12),
    endsAt: daysFromNow(44, 12),
    capacity: 16,
    priceCents: 980000,
    currency: "mxn",
    status: "published",
    createdByClerkUserId: "demo_admin",
    createdAt: now,
    updatedAt: now,
  },
];

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

  const members = db.collection("members");
  let memberUpserts = 0;
  for (const m of DEMO_MEMBERS) {
    await members.updateOne(
      { email: m.email },
      { $set: { ...m, updatedAt: now } },
      { upsert: true }
    );
    memberUpserts++;
  }

  const events = db.collection("events");
  let eventUpserts = 0;
  for (const e of DEMO_EVENTS) {
    await events.updateOne(
      { title: e.title, createdByClerkUserId: "demo_admin" },
      { $set: { ...e, updatedAt: now } },
      { upsert: true }
    );
    eventUpserts++;
  }

  console.log(`✓ ${memberUpserts} socias de demo listas en "members".`);
  console.log(`✓ ${eventUpserts} eventos de demo listos en "events".`);
  console.log(
    'Para borrarlos después de la reunión: npm run unseed-demo'
  );

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
