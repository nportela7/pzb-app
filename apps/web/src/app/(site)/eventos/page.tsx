import Link from "next/link";
import { listUpcomingEvents } from "@/lib/events";
import { EVENT_TYPE_LABELS, EventType } from "@/models/event";
import { Grain } from "@/components/Grain";
import { EventCardStack } from "@/components/EventCardStack";
import { toEventCard } from "@/lib/event-banner";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

const FILTERS: { value?: EventType; label: string }[] = [
  { value: undefined, label: "Todos" },
  { value: "taller", label: "Talleres" },
  { value: "cena", label: "Cenas" },
  { value: "retiro", label: "Retiros" },
  { value: "sesion_abierta", label: "Sesiones abiertas" },
  { value: "zere_studio", label: "Zere Studio" },
];

const WHATSAPP_HREF = whatsappHref(WHATSAPP_MESSAGES.eventos);

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

  const filtersNav = (
    <nav className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-6 sm:px-10 py-5 max-w-3xl mx-auto border-b border-medianoche/15 font-serif">
      {FILTERS.map((filter, i) => {
        const isActive = filter.value === activeType;
        const href = filter.value ? `/eventos?type=${filter.value}` : "/eventos";
        return (
          <span key={filter.label} className="flex items-baseline gap-3">
            {i > 0 && <span className="italic text-medianoche/20">·</span>}
            <Link
              href={href}
              className={
                isActive
                  ? "text-lg sm:text-xl text-medianoche font-medium underline underline-offset-4"
                  : "text-lg sm:text-xl italic text-medianoche/40 hover:text-medianoche transition-colors"
              }
            >
              {filter.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );

  const ticker = (
    <div className="overflow-hidden bg-capuccino py-2.5 whitespace-nowrap">
      <div className="inline-flex marquee-track" style={{ animationDuration: "208s" }}>
        {[...TICKER_ITEMS_FILLED, ...TICKER_ITEMS_FILLED].map((item, i) => (
          <span
            key={i}
            className="text-[0.68rem] tracking-[0.24em] uppercase text-arena/85 px-6 flex items-center gap-6 after:content-['·'] after:text-arena/35"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-arena">
      <section className="relative overflow-hidden px-6 sm:px-10 pt-6 sm:pt-12 pb-5">
        <Grain opacity={0.1} />
        <div className="relative flex items-center gap-4 mb-10">
          <span aria-hidden className="h-px flex-1 bg-gris/30" />
          <p className="shrink-0 text-xs tracking-[0.32em] uppercase text-gris">
            Calendario en vivo
          </p>
          <span aria-hidden className="h-px flex-1 bg-gris/30" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="font-serif italic text-5xl sm:text-7xl leading-[0.92] text-medianoche text-balance">
            Eventos
            <br />
            <span className="not-italic font-light text-medianoche">
              de la comunidad.
            </span>
          </h1>
          <p className="mt-6 font-serif font-light text-lg sm:text-xl leading-relaxed text-medianoche max-w-lg">
            Talleres, cenas, retiros y sesiones de Zere Studio — cinco maneras
            de encontrarse fuera de la pantalla, en un solo lugar.
          </p>
        </div>
      </section>

      {events.length === 0 ? (
        <div>
          {ticker}
          {/* No stack to bound the sticky range against here, so it's just
              a plain sticky bar — same offset EventCardStack's version
              uses when there IS a stack. */}
          <div className="sticky top-[5.5rem] z-30 bg-arena/95 backdrop-blur-sm">{filtersNav}</div>
          <section className="px-6 sm:px-10 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-cielo p-8 mt-10 text-center">
              <p className="text-medianoche/80 mb-4">
                Todavía no hay eventos publicados
                {activeType ? ` en "${EVENT_TYPE_LABELS[activeType]}"` : ""}.
              </p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-medianoche text-arena px-6 py-2.5 text-sm font-medium hover:bg-medianoche transition-colors"
              >
                Preguntarle a Pilar
              </a>
            </div>
          </section>
        </div>
      ) : (
        <EventCardStack
          items={events.map(toEventCard)}
          whatsappHref={WHATSAPP_HREF}
          filters={filtersNav}
          ticker={ticker}
        />
      )}

      {events.length > 0 && (
        <section className="px-6 sm:px-10 py-16 sm:py-20 max-w-3xl mx-auto flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-serif italic text-lg text-gris">
            ¿No encuentras fecha que te acomode?
          </p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-medianoche text-arena px-6 py-2.5 text-sm font-medium hover:bg-medianoche transition-colors"
          >
            Preguntarle a Pilar
          </a>
        </section>
      )}
    </div>
  );
}
