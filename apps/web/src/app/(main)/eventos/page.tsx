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

export default async function EventosPage(props: PageProps<"/eventos">) {
  const { type } = await props.searchParams;
  const activeType =
    typeof type === "string" && EventType.safeParse(type).success
      ? (type as EventType)
      : undefined;

  const events = await listUpcomingEvents(activeType);

  return (
    <div className="flex-1 bg-cream">
      <section className="relative overflow-hidden px-6 sm:px-10 pt-20 pb-10">
        <Grain opacity={0.05} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-slate mb-5">
            Calendario unificado
          </p>
          <h1 className="text-4xl sm:text-5xl text-earth-brown mb-6">Eventos</h1>
          <p className="text-lg text-charcoal/80 leading-relaxed max-w-xl">
            Talleres, cenas, retiros, sesiones abiertas y experiencias de Zere
            Studio, todo en un solo calendario.
          </p>
        </div>
      </section>

      <div className="px-6 sm:px-10 max-w-3xl mx-auto flex flex-wrap gap-2 mb-12">
        {FILTERS.map((filter) => {
          const isActive = filter.value === activeType;
          const href = filter.value ? `/eventos?type=${filter.value}` : "/eventos";
          return (
            <Link
              key={filter.label}
              href={href}
              className={`text-sm rounded-full px-4 py-1.5 border transition-colors ${
                isActive
                  ? "bg-earth-brown text-cream border-earth-brown"
                  : "border-beige-sand text-charcoal/70 hover:border-earth-brown"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <section className="px-6 sm:px-10 pb-20 max-w-3xl mx-auto">
        {events.length === 0 ? (
          <div className="rounded-2xl border border-beige-sand p-8 text-center">
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
          <ul className="flex flex-col divide-y divide-beige-sand">
            {events.map((event) => (
              <li
                key={event._id.toString()}
                className="grid grid-cols-[4rem_1fr] gap-5 sm:gap-8 py-6"
              >
                <div className="text-center">
                  <p className="font-serif text-2xl text-earth-brown leading-none">
                    {dateFormatter.format(event.startsAt).split(" ")[0]}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate mt-1">
                    {dateFormatter.format(event.startsAt).split(" ")[1]}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate mb-1">
                    {EVENT_TYPE_LABELS[event.type]}
                  </p>
                  <h2 className="text-xl text-charcoal mb-1">{event.title}</h2>
                  <p className="text-sm text-slate">
                    {timeFormatter.format(event.startsAt)}
                    {event.location ? ` · ${event.location}` : ""}
                    {event.isOnline ? " · En línea" : ""}
                  </p>
                  {event.description && (
                    <p className="text-charcoal/70 text-sm mt-2 max-w-lg leading-relaxed">
                      {event.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-sm font-medium text-charcoal">
                      {formatPrice(event.priceCents, event.currency)}
                    </span>
                    <a
                      href={
                        "https://wa.me/525574141480?text=" +
                        encodeURIComponent(
                          `Hola Pilar, quiero más información sobre "${event.title}".`
                        )
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-earth-brown hover:text-charcoal transition-colors"
                    >
                      Registrarme →
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
