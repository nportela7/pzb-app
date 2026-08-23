// Shared demo content for showing the platform with a living
// community instead of empty states. Used by scripts/dev-db.ts (local
// ephemeral DB), scripts/seed-production-demo.ts / unseed-production-demo.ts
// (manual one-off), and the temporary owner-only /seed-demo admin route
// (seeds the real prod DB from within the deployed app, since the
// MONGODB_URI env var is marked Sensitive in Vercel and can't be pulled
// to a local machine).
//
// Every member is tagged with a clerkUserId starting with
// "demo_member_", and every event with createdByClerkUserId
// "demo_admin", so they can be found and removed afterward.

export const DEMO_MEMBER_PREFIX = "demo_member_";
export const DEMO_EVENT_CREATOR = "demo_admin";

const DEMO_MEMBERS_BASE = [
  {
    clerkUserId: "demo_member_valentina",
    accountType: "persona" as const,
    name: "Valentina Reyes",
    email: "valentina.reyes.demo@pzb.mx",
    bio: "Psicóloga clínica enfocada en procesos de transición de vida. Llegué a Life Notes buscando una comunidad que entendiera que reinventarse no es una crisis, es una decisión.",
    profession: "Psicóloga clínica",
    keywords: ["psicología", "transiciones", "terapia individual"],
    interests: ["bienestar emocional", "lectura", "senderismo"],
    location: "Ciudad de México",
  },
  {
    clerkUserId: "demo_member_camila",
    accountType: "persona" as const,
    name: "Camila Duarte",
    email: "camila.duarte.demo@pzb.mx",
    bio: "Fotógrafa de retrato editorial. Después de mi sesión en Zere Studio entendí que mi propia imagen también merecía ese cuidado.",
    profession: "Fotógrafa",
    keywords: ["fotografía", "retrato", "dirección de arte"],
    interests: ["cine", "café de especialidad"],
    location: "Guadalajara",
  },
  {
    clerkUserId: "demo_member_renata",
    accountType: "persona" as const,
    name: "Renata Solís",
    email: "renata.solis.demo@pzb.mx",
    bio: "Fundadora de una consultora de branding. El coaching con Pilar me ayudó a que mi imagen pública por fin coincidiera con quién soy puertas adentro.",
    profession: "Consultora de marca",
    keywords: ["branding", "marca personal", "comunicación"],
    interests: ["diseño", "viajes de trabajo"],
    location: "Monterrey",
  },
  {
    clerkUserId: "demo_member_ines",
    accountType: "persona" as const,
    name: "Inés Barragán",
    email: "ines.barragan.demo@pzb.mx",
    bio: "Nutrióloga funcional. Los retiros de Zere Studio son mi reset trimestral favorito.",
    profession: "Nutrióloga",
    keywords: ["nutrición", "hábitos", "bienestar integral"],
    interests: ["cocina", "yoga"],
    location: "Querétaro",
  },
  {
    clerkUserId: "demo_member_paola",
    accountType: "persona" as const,
    name: "Paola Iturbide",
    email: "paola.iturbide.demo@pzb.mx",
    bio: "Diseñadora de interiores. Busco socias para colaborar en proyectos que mezclen espacio y bienestar.",
    profession: "Diseñadora de interiores",
    keywords: ["diseño de interiores", "espacios", "colaboraciones"],
    interests: ["arquitectura", "arte contemporáneo"],
    location: "Ciudad de México",
  },
  {
    clerkUserId: "demo_member_daniela",
    accountType: "persona" as const,
    name: "Daniela Chávez",
    email: "daniela.chavez.demo@pzb.mx",
    bio: "Abogada corporativa en transición hacia consultoría independiente. The Alignment Partnership me está ayudando a hacer ese salto con claridad.",
    profession: "Abogada",
    keywords: ["derecho corporativo", "consultoría", "reinvención profesional"],
    interests: ["running", "podcasts"],
    location: "Monterrey",
  },
  {
    clerkUserId: "demo_member_cardamomo",
    accountType: "empresa" as const,
    name: "Estudio Cardamomo",
    email: "hola.cardamomo.demo@pzb.mx",
    bio: "Estudio de eventos boutique. Nos encanta patrocinar y co-crear experiencias con la comunidad de Pilar.",
    profession: "Producción de eventos",
    keywords: ["eventos", "producción", "experiencias"],
    interests: ["colaboraciones de marca"],
    location: "Ciudad de México",
  },
];

const DEMO_EVENTS_BASE = [
  {
    title: "Círculo Abierto: Preguntas y Café",
    type: "sesion_abierta" as const,
    description:
      "Una tarde sin agenda fija para socias nuevas y de siempre: café, preguntas abiertas sobre coaching y comunidad, y espacio para conocerse. Entrada libre, cupo limitado.",
    location: "Casa Pilar, Ciudad de México",
    isOnline: false,
    offsetDays: 6,
    startHour: 17,
    durationHours: 2,
    capacity: 20,
    priceCents: 0,
    currency: "mxn",
  },
  {
    title: "Taller: Encuentra tu Paleta de Color Personal",
    type: "taller" as const,
    description:
      "Un taller práctico de 3 horas para identificar los colores que realmente te favorecen y simplificar tu clóset. Incluye análisis individual y guía impresa para llevar a casa.",
    location: "Estudio PZB, Ciudad de México",
    isOnline: false,
    offsetDays: 13,
    startHour: 10,
    durationHours: 3,
    capacity: 12,
    priceCents: 185000,
    currency: "mxn",
  },
  {
    title: "Zere Studio: Sesión de Retrato Editorial",
    type: "zere_studio" as const,
    description:
      "Sesión de fotografía editorial en el agua, guiada por el equipo de Zere Studio. Dirección de arte, vestuario y una experiencia pensada para que te veas como te sientes.",
    location: "Zere Studio, Tulum",
    isOnline: false,
    offsetDays: 21,
    startHour: 9,
    durationHours: 5,
    capacity: 6,
    priceCents: 420000,
    currency: "mxn",
  },
  {
    title: "Cena Intención: Cierre de Trimestre",
    type: "cena" as const,
    description:
      "Cena de sobremesa larga para cerrar el trimestre en comunidad: qué soltamos, qué seguimos y qué viene. Menú de temporada, mesa compartida de 14 socias.",
    location: "Restaurante Merotoro, Ciudad de México",
    isOnline: false,
    offsetDays: 27,
    startHour: 20,
    durationHours: 3,
    capacity: 14,
    priceCents: 145000,
    currency: "mxn",
  },
  {
    title: "Retiro Zere: Aguas Claras",
    type: "retiro" as const,
    description:
      "Retiro de fin de semana en Valle de Bravo: coaching grupal por las mañanas, tiempo libre junto al agua, y una sesión de cierre uno a uno con Pilar. Incluye hospedaje y todas las comidas.",
    location: "Valle de Bravo, Estado de México",
    isOnline: false,
    offsetDays: 42,
    startHour: 12,
    durationHours: 48,
    capacity: 16,
    priceCents: 980000,
    currency: "mxn",
  },
];

export function buildDemoMembers(now: Date) {
  return DEMO_MEMBERS_BASE.map((m) => ({
    ...m,
    keywords: m.keywords,
    interests: m.interests,
    contactVisibility: "members" as const,
    contactMethods: {},
    isAdmin: false,
    onboardingCompletedAt: now,
    createdAt: now,
    updatedAt: now,
  }));
}

export function buildDemoEvents(now: Date) {
  return DEMO_EVENTS_BASE.map(({ offsetDays, startHour, durationHours, ...rest }) => {
    const startsAt = new Date(now);
    startsAt.setDate(startsAt.getDate() + offsetDays);
    startsAt.setHours(startHour, 0, 0, 0);
    const endsAt = new Date(startsAt.getTime() + durationHours * 60 * 60 * 1000);
    return {
      ...rest,
      startsAt,
      endsAt,
      status: "published" as const,
      createdByClerkUserId: DEMO_EVENT_CREATOR,
      createdAt: now,
      updatedAt: now,
    };
  });
}
