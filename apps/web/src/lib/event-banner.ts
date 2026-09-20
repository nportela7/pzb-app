import { EVENT_TYPE_LABELS, type EventDoc, type EventType } from "@/models/event";

/**
 * Cover art for events the admin didn't upload a photo for. Same shape as
 * EVENT_TYPE_LABELS on purpose: adding a category to EventType turns into a
 * compile error here, so a new type can never ship with an empty banner.
 */
export const EVENT_TYPE_COVERS: Record<EventType, string> = {
  taller: "/images/close-up-green-jade-texture.jpg",
  cena: "/images/horse-field-portrait.jpg",
  retiro: "/images/silhouette-sunset.jpg",
  sesion_abierta: "/images/pilar-portrait.jpg",
  zere_studio: "/images/zere-water-ripple.jpg",
};

/** The site sells in MXN from CDMX, so dates are read in that zone. Pinning it
 *  also keeps server and client output identical — an unpinned Intl format
 *  renders with the server's zone on the server and the visitor's in the
 *  browser, which is a hydration mismatch waiting to happen. */
const TIME_ZONE = "America/Mexico_City";

const dayMonthYear = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});
const dayOnly = new Intl.DateTimeFormat("es-MX", { day: "numeric", timeZone: TIME_ZONE });
const dayMonth = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  timeZone: TIME_ZONE,
});
const monthKey = new Intl.DateTimeFormat("es-MX", {
  month: "numeric",
  year: "numeric",
  timeZone: TIME_ZONE,
});
const dayKey = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "short",
  timeZone: TIME_ZONE,
});

/**
 * "9 de diciembre de 2026" for a single day, "Del 4 al 9 de diciembre de 2026"
 * when the range stays inside one month, and the long form across months.
 */
export function formatEventDateRange(startsAt: Date, endsAt?: Date) {
  if (!endsAt || dayKey.format(startsAt) === dayKey.format(endsAt)) {
    return dayMonthYear.format(startsAt);
  }
  if (monthKey.format(startsAt) === monthKey.format(endsAt)) {
    return `Del ${dayOnly.format(startsAt)} al ${dayMonthYear.format(endsAt)}`;
  }
  return `Del ${dayMonth.format(startsAt)} al ${dayMonthYear.format(endsAt)}`;
}

/** Everything a banner slide renders. Dates arrive pre-formatted because the
 *  carousel is a client component and Date doesn't cross that boundary. */
export type EventBanner = {
  id: string;
  title: string;
  typeLabel: string;
  description: string | null;
  coverUrl: string;
  dateLabel: string;
  placeLabel: string | null;
  modeLabel: string;
};

export function toEventBanner(event: EventDoc): EventBanner {
  return {
    id: event._id.toString(),
    title: event.title,
    typeLabel: EVENT_TYPE_LABELS[event.type],
    description: event.description ?? null,
    coverUrl: event.coverImageUrl?.trim() || EVENT_TYPE_COVERS[event.type],
    dateLabel: formatEventDateRange(event.startsAt, event.endsAt),
    placeLabel: event.location ?? null,
    modeLabel: event.isOnline
      ? event.location
        ? "Presencial y en línea"
        : "En línea"
      : "Presencial",
  };
}
