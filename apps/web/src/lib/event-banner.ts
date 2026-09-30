import { EVENT_TYPE_LABELS, type EventDoc, type EventType } from "@/models/event";

/**
 * Cover art for events the admin didn't upload a photo for. Same shape as
 * EVENT_TYPE_LABELS on purpose: adding a category to EventType turns into a
 * compile error here, so a new type can never ship with an empty banner.
 */
export const EVENT_TYPE_COVERS: Record<EventType, string> = {
  taller: "/images/close-up-green-jade-texture.jpg",
  cena: "/images/horse-field-portrait.jpg",
  retiro: "/images/eventos-retiro-zere.jpg",
  sesion_abierta: "/images/pilar-portrait.jpg",
  zere_studio: "/images/zere-water-ripple.jpg",
};

/**
 * One accent color per event type, used to tint the card's photo veil, its
 * type pill and its hover accent — not just its label text. "sesion_abierta"
 * gets its own color (redline) instead of reusing taller's earth-brown: the
 * two used to be visually identical in the events list.
 */
export const EVENT_TYPE_ACCENT: Record<EventType, { hex: string; rgb: string }> = {
  taller: { hex: "#594434", rgb: "89,68,52" },
  cena: { hex: "#515544", rgb: "81,85,68" },
  retiro: { hex: "#64747d", rgb: "100,116,125" },
  sesion_abierta: { hex: "#9b3a26", rgb: "155,58,38" },
  zere_studio: { hex: "#154c61", rgb: "21,76,97" },
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
const badgeDay = new Intl.DateTimeFormat("es-MX", { day: "2-digit", timeZone: TIME_ZONE });
const badgeMonth = new Intl.DateTimeFormat("es-MX", { month: "short", timeZone: TIME_ZONE });
const hourFormatter = new Intl.DateTimeFormat("es-MX", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

const currencyFormatters: Record<string, Intl.NumberFormat> = {};
export function formatEventPrice(cents: number, currency: string) {
  if (cents === 0) return "Sin costo";
  const key = currency.toUpperCase();
  currencyFormatters[key] ??= new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: key,
    maximumFractionDigits: 0,
  });
  return currencyFormatters[key].format(cents / 100);
}

/** Day + month for the big serif badge on a card, e.g. {day:"04", month:"OCT"}. */
export function formatEventBadge(startsAt: Date) {
  return {
    day: badgeDay.format(startsAt),
    month: badgeMonth.format(startsAt).toUpperCase().replace(".", ""),
  };
}

/** "5:00 – 7:00 pm" for a same-day event, just the start time with no end,
 *  or "Varios días" once the event spans more than one calendar day — a
 *  hour range would be meaningless for something like a weekend retreat. */
export function formatEventTimeLabel(startsAt: Date, endsAt?: Date) {
  const start = hourFormatter.format(startsAt);
  if (!endsAt) return start;
  if (dayKey.format(startsAt) === dayKey.format(endsAt)) {
    return `${start} – ${hourFormatter.format(endsAt)}`;
  }
  return "Varios días";
}

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

/** Everything the stacked event cards on /eventos render, banner fields plus
 *  the bits a card/detail view needs that a banner never did. */
export type EventCard = EventBanner & {
  type: EventType;
  day: string;
  month: string;
  timeLabel: string;
  priceLabel: string;
  capacityLabel: string | null;
};

export function toEventCard(event: EventDoc): EventCard {
  const badge = formatEventBadge(event.startsAt);
  return {
    ...toEventBanner(event),
    type: event.type,
    day: badge.day,
    month: badge.month,
    timeLabel: formatEventTimeLabel(event.startsAt, event.endsAt),
    priceLabel: formatEventPrice(event.priceCents, event.currency),
    capacityLabel: event.capacity ? `${event.capacity} personas` : null,
  };
}
