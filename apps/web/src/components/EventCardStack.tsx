"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { EVENT_TYPE_ACCENT, type EventCard } from "@/lib/event-banner";

// 5.5rem clears the floating header (same offset the landing's own card
// stack uses); the filters bar right above this component is ALSO sticky
// at that same 5.5rem and has its own height on top of that (padding +
// one line of text + its border), so the first card has to start lower
// still or it renders half-hidden behind the filters bar.
const STACK_BASE_REM = 10.5;
const STACK_SPINE_REM = 3.25;

function veilFor(rgb: string) {
  return `linear-gradient(100deg, rgba(20,16,12,.93) 0%, rgba(${rgb},.58) 40%, rgba(${rgb},.1) 72%)`;
}
function sheenFor(rgb: string) {
  return `linear-gradient(135deg, rgba(${rgb},.9) 0%, rgba(${rgb},0) 55%)`;
}

export function EventCardStack({
  items,
  whatsappHref,
  filters,
  ticker,
}: {
  items: EventCard[];
  whatsappHref: string;
  /** Sticky, shares its stuck lifetime with the stack below — see the
   *  comment further down for why it has to live in here. */
  filters: React.ReactNode;
  /** Non-sticky, just rendered between the filters bar and the stack. */
  ticker?: React.ReactNode;
}) {
  const [selected, setSelected] = useState<EventCard | null>(null);
  const lastIndex = items.length - 1;

  return (
    <>
      {/* Sticky stack: each card sticks a little lower than the last, so the
          next one scrolls up and covers it, leaving a spine (badge + pill)
          showing — same mechanism as "¿En qué momento estás hoy?" on the
          landing. No entrance transform on the sticky element itself: a
          live transform fights position:sticky.

          The LAST card is deliberately NOT sticky. Nothing arrives after it
          to reveal, so it doesn't need to hold its position. It still has
          to stay INSIDE this same div, though (not split out as a sibling):
          the second-to-last card needs a real trailing sibling with real
          height to have room to fully stick against, and this div's own
          bottom is what bounds it — a sticky element is capped by its own
          containing block, so if the last card lived outside, the
          second-to-last one would be the last child in here instead and
          hit that exact same "never sticks" problem one card earlier.

          `filters` lives INSIDE this div too, sticky at the top of it, for
          the same reason: bounding it to filters + ticker + the whole
          stack means it releases and scrolls away once you've scrolled
          past the stack, instead of staying pinned all the way through the
          CTA/footer below. It releases slightly after the last card is
          fully visible rather than at the exact instant — this is a CSS
          containment trick, not a scroll listener, so it can't watch for
          that moment precisely — but that's a few hundred px at most, not
          the unbounded stick this replaced. */}
      <div>
        <div className="sticky top-[5.5rem] z-30 bg-cream/95 backdrop-blur-sm">
          {filters}
        </div>
        {ticker}
        <div className="flex flex-col px-6 sm:px-10 max-w-5xl mx-auto mt-10">
          {items.map((event, i) =>
            i === lastIndex ? (
              <EventCardFace
                key={event.id}
                event={event}
                index={i}
                total={items.length}
                onSelect={() => setSelected(event)}
              />
            ) : (
              <div
                key={event.id}
                className="sticky"
                style={{ top: `${STACK_BASE_REM + i * STACK_SPINE_REM}rem` }}
              >
                <EventCardFace
                  event={event}
                  index={i}
                  total={items.length}
                  onSelect={() => setSelected(event)}
                />
              </div>
            ),
          )}
        </div>
      </div>

      {selected && (
        <EventDetailModal
          event={selected}
          whatsappHref={whatsappHref}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

function EventCardFace({
  event,
  index,
  total,
  onSelect,
}: {
  event: EventCard;
  index: number;
  total: number;
  onSelect: () => void;
}) {
  const accent = EVENT_TYPE_ACCENT[event.type];
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[10px] text-left shadow-[0_-6px_30px_-18px_rgba(0,0,0,0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.55)] sm:aspect-[16/9] lg:aspect-[21/8]"
    >
      <Image
        src={event.coverUrl}
        alt=""
        fill
        sizes="(min-width: 1024px) 1000px, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div aria-hidden className="absolute inset-0" style={{ background: veilFor(accent.rgb) }} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 mix-blend-overlay group-hover:opacity-100"
        style={{ background: sheenFor(accent.rgb) }}
      />
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[5px] origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
        style={{ background: accent.hex }}
      />

      <div className="absolute left-[26px] top-[14px] flex items-baseline gap-2 font-serif leading-none text-cream">
        <b className="text-[30px] font-medium">{event.day}</b>
        <span className="-translate-y-px font-sans text-[11px] font-bold tracking-[0.1em] uppercase">
          {event.month}
        </span>
      </div>
      <span className="absolute right-[26px] top-[18px] text-[11px] tracking-[0.08em] text-cream/55">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <div className="absolute left-[26px] right-[26px] bottom-[22px] max-w-[32rem]">
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-cream"
            style={{ background: accent.hex }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cream/85" />
            {event.typeLabel}
          </span>
          <span className="text-xs text-cream/75">{event.timeLabel}</span>
        </div>
        <h3 className="mb-2.5 font-serif text-[clamp(22px,3vw,32px)] leading-[1.08] text-cream">
          {event.title}
        </h3>
        <p className="text-[13px] text-cream/80">
          {event.placeLabel ? `${event.placeLabel} · ` : ""}
          {event.priceLabel}
        </p>
        {event.description && (
          <p className="mt-2.5 hidden max-w-[28rem] text-[13.5px] leading-relaxed text-cream/75 lg:block">
            {event.description}
          </p>
        )}
      </div>

      <span className="absolute bottom-6 right-[26px] hidden items-center gap-1.5 text-[12.5px] font-semibold text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
        Ver detalle
        <span aria-hidden>→</span>
      </span>
    </button>
  );
}

function EventDetailModal({
  event,
  whatsappHref,
  onClose,
}: {
  event: EventCard;
  whatsappHref: string;
  onClose: () => void;
}) {
  const accent = EVENT_TYPE_ACCENT[event.type];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,16,12,0.72)] p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="grid max-h-[88vh] w-full max-w-3xl overflow-auto rounded-lg bg-cream shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] sm:grid-cols-2">
        <div className="relative min-h-[220px] sm:min-h-0">
          <Image src={event.coverUrl} alt="" fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="relative flex flex-col p-8 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-xl text-earth-brown shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-cream"
          >
            &times;
          </button>
          <p
            className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: accent.hex }}
          >
            {event.typeLabel}
          </p>
          <h2
            id="event-detail-title"
            className="mb-4 font-serif text-3xl leading-tight text-earth-brown sm:text-4xl"
          >
            {event.title}
          </h2>
          <p className="mb-1 font-serif italic text-charcoal">{event.dateLabel}</p>
          <p className="mb-5 text-sm text-slate">
            {event.timeLabel}
            {event.placeLabel ? ` · ${event.placeLabel}` : ""}
            {` · ${event.modeLabel}`}
          </p>
          {event.description && (
            <p className="mb-6 leading-relaxed text-charcoal/80">{event.description}</p>
          )}
          <div className="mb-6 flex gap-7 border-y border-beige-sand py-5">
            <div>
              <p className="font-serif text-xl text-earth-brown">{event.priceLabel}</p>
              <p className="mt-1 text-[10.5px] uppercase tracking-[0.12em] text-slate">Costo</p>
            </div>
            {event.capacityLabel && (
              <div>
                <p className="font-serif text-xl text-earth-brown">{event.capacityLabel}</p>
                <p className="mt-1 text-[10.5px] uppercase tracking-[0.12em] text-slate">Cupo</p>
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-earth-brown px-6 py-3 text-sm font-semibold text-cream hover:bg-charcoal"
            >
              Registrarme
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-earth-brown/30 px-6 py-3 text-sm text-earth-brown hover:bg-beige-sand/40"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
