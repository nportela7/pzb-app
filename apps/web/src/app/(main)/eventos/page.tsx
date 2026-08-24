import Link from "next/link";
import { listUpcomingEvents } from "@/lib/events";
import { EVENT_TYPE_LABELS, EventType } from "@/models/event";
import { Grain } from "@/components/Grain";

const FILTERS: { value?: EventType; label: string }[] = [
  { value: undefined, label: "Todos" },
  { value: "taller", label: "Talleres" },
  { value: "cena", label: "Cenas" },
  { value: "retiro", label: "Retiros" },
  { value: "sesion_abierta", label: "Sesiones abiertas" },
  { value: "zere_studio", label: "Zere Studio" },
];

const ACCENT_TEXT: Record<EventType, string> = {
  taller: "text-earth-brown",
  cena: "text-dark-pine",
  retiro: "text-slate",
  sesion_abierta: "text-earth-brown",
  zere_studio: "text-zere-deep",
};

const ACCENT_BG: Record<EventType, string> = {
  taller: "bg-earth-brown",
  cena: "bg-dark-pine",
  retiro: "bg-slate",
  sesion_abierta: "bg-earth-brown",
  zere_studio: "bg-zere-deep",
};

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
});

const timeFormatter = new Intl.DateTimeFormat("es-MX", {
  hour: "numeric",
  minute: "2-digit",
});

const currencyFormatters: Record<string, Intl.NumberFormat> = {};
function formatPrice(cents: number, currency: string) {
  if (cents === 0) return "Sin costo";
  const key = currency.toUpperCase();
  currencyFormatters[key] ??= new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: key,
    maximumFractionDigits: 0,
  });
  return currencyFormatters[key].format(cents / 100);
}

const WHATSAPP_HREF =
  "https://wa.me/525574141480?text=" +
  encodeURIComponent("Hola Pilar, quiero saber más sobre los próximos eventos.");

const TICKER_ITEMS = ["Registro por WhatsApp", "Cupo limitado", "Precios en MXN"];
// Repeated well past what any real screen width needs, so the
// "-50%" loop point never lands on a visible gap between words.
const TICKER_ITEMS_FILLED = Array(8).fill(TICKER_ITEMS).flat();

export default async function EventosPage(props: PageProps<"/eventos">) {
  const { type } = await props.searchParams;
  const activeType =
    typeof type === "string" && EventType.safeParse(type).success
      ? (type as EventType)
      : undefined;

  const events = await listUpcomingEvents(activeType);

  return (
    <div className="flex-1 bg-cream">
      <section className="relative overflow-hidden px-6 sm:px-10 pt-16 sm:pt-24 pb-8 sm:pb-14">
        <Grain opacity={0.1} />
        <div className="relative max-w-3xl mx-auto">
          <p className="flex items-center gap-3 text-xs tracking-[0.32em] uppercase text-slate mb-6">
            <span className="w-8 h-px bg-slate" />
            Calendario en vivo
          </p>
          <h1 className="font-serif italic text-5xl sm:text-7xl leading-[0.92] text-earth-brown text-balance">
            Eventos
            <br />
            <span className="not-italic font-light text-charcoal">
              de la comunidad.
            </span>
          </h1>
          <p className="mt-6 font-serif font-light text-lg sm:text-xl leading-relaxed text-charcoal max-w-lg">
            Talleres, cenas, retiros y sesiones de Zere Studio — cinco maneras
            de encontrarse fuera de la pantalla, en un solo lugar.
          </p>
        </div>
      </section>

      <nav className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-6 sm:px-10 pb-6 sm:pb-8 max-w-3xl mx-auto border-b border-earth-brown/15 font-serif">
        {FILTERS.map((filter, i) => {
          const isActive = filter.value === activeType;
          const href = filter.value ? `/eventos?type=${filter.value}` : "/eventos";
          return (
            <span key={filter.label} className="flex items-baseline gap-3">
              {i > 0 && <span className="italic text-charcoal/20">·</span>}
              <Link
                href={href}
                className={
                  isActive
                    ? "text-lg sm:text-xl text-earth-brown font-medium underline underline-offset-4"
                    : "text-lg sm:text-xl italic text-charcoal/40 hover:text-charcoal transition-colors"
                }
              >
                {filter.label}
              </Link>
            </span>
          );
        })}
      </nav>

      <div className="overflow-hidden bg-dark-pine py-2.5 whitespace-nowrap">
        <div className="inline-flex marquee-track" style={{ animationDuration: "208s" }}>
          {[...TICKER_ITEMS_FILLED, ...TICKER_ITEMS_FILLED].map((item, i) => (
            <span
              key={i}
              className="text-[0.68rem] tracking-[0.24em] uppercase text-cream/85 px-6 flex items-center gap-6 after:content-['·'] after:text-cream/35"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="px-6 sm:px-10 max-w-3xl mx-auto">
        {events.length === 0 ? (
          <div className="rounded-2xl border border-beige-sand p-8 mt-10 text-center">
            <p className="text-charcoal/80 mb-4">
              Todavía no hay eventos publicados
              {activeType ? ` en "${EVENT_TYPE_LABELS[activeType]}"` : ""}.
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-earth-brown text-cream px-6 py-2.5 text-sm font-medium hover:bg-charcoal transition-colors"
            >
              Preguntarle a Pilar
            </a>
          </div>
        ) : (
          <ul className="flex flex-col">
            {events.map((event) => {
              const [day, month] = dateFormatter.format(event.startsAt).split(" ");
              const accentText = ACCENT_TEXT[event.type];
              const accentBg = ACCENT_BG[event.type];
              return (
                <li key={event._id.toString()} className="group relative">
                  <span
                    aria-hidden
                    className={`absolute -left-4 top-6 bottom-6 w-1 origin-center scale-y-0 transition-transform duration-300 group-hover:scale-y-100 ${accentBg}`}
                  />
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[7rem_1fr_auto] items-center gap-4 sm:gap-8 py-6 sm:py-8 border-b border-earth-brown/10 transition-[padding] duration-300 group-hover:pl-3"
                  >
                    <span
                      className={`font-serif text-4xl sm:text-6xl leading-[0.85] tracking-tight ${accentText}`}
                    >
                      {day}
                      <sup className="ml-1 align-super text-[0.62rem] font-sans font-semibold uppercase tracking-wider text-slate">
                        {month}
                      </sup>
                    </span>

                    <div className="min-w-0">
                      <p
                        className={`text-[0.68rem] tracking-[0.22em] uppercase mb-1.5 ${accentText}`}
                      >
                        {EVENT_TYPE_LABELS[event.type]}
                      </p>
                      <h2 className="font-serif text-xl sm:text-2xl text-charcoal leading-tight mb-1">
                        {event.title}
                      </h2>
                      <p className="text-sm text-slate">
                        {timeFormatter.format(event.startsAt)}
                        {event.location ? ` · ${event.location}` : ""}
                        {event.isOnline ? " · En línea" : ""}
                      </p>
                    </div>

                    <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-2 sm:mt-0">
                      <span className="font-serif text-charcoal">
                        {formatPrice(event.priceCents, event.currency)}
                      </span>
                      <span
                        className={`text-sm font-medium inline-flex items-center gap-1 ${accentText}`}
                      >
                        Registrarme
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {events.length > 0 && (
        <section className="px-6 sm:px-10 py-16 sm:py-20 max-w-3xl mx-auto flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-serif italic text-lg text-slate">
            ¿No encuentras fecha que te acomode?
          </p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-earth-brown text-cream px-6 py-2.5 text-sm font-medium hover:bg-charcoal transition-colors"
          >
            Preguntarle a Pilar
          </a>
        </section>
      )}
    </div>
  );
}
