"use client";

import { Fragment, useEffect, useRef, useState } from "react";
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
  return `linear-gradient(100deg, rgba(3,22,29,.93) 0%, rgba(${rgb},.58) 40%, rgba(${rgb},.1) 72%)`;
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
  // Whether the last card has reached the point where it starts covering
  // the card before it — i.e. we've reached the last card and kept
  // scrolling. Drives releasing the filters bar; see the effect below for
  // why this couldn't stay a pure-CSS trick.
  const [pastStack, setPastStack] = useState(false);
  // A 1px marker sitting exactly at the last card's top edge (rendered
  // right before it, flush — the flex column has no gap). Watching a
  // hairline like this instead of the whole (tall) card is what makes the
  // crossing reliably observable: IntersectionObserver only fires when an
  // element's visibility ratio crosses a threshold, and a full-height
  // card's ratio barely budges as its top clips off-screen, so a
  // threshold:0 observer on the card itself would rarely fire again once
  // it's already partly visible. A hairline's ratio jumps cleanly between
  // ~0 and ~1 at the exact instant it crosses the line we care about.
  const sentinelRef = useRef<HTMLDivElement>(null);
  const lastIndex = items.length - 1;
  // Where the card just before the last one is pinned (0 if there's only
  // one card total, i.e. nothing stacks). The last card visually "arrives"
  // once its top reaches that line and starts painting over it — waiting
  // for it to reach the TOP of the viewport instead would mean waiting for
  // it to have scrolled almost all the way past, which on a page with
  // several events barely leaves any scroll room left before the bottom.
  const precedingTopRem =
    lastIndex > 0 ? STACK_BASE_REM + (lastIndex - 1) * STACK_SPINE_REM : 0;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    // rem -> px assuming the default 16px root, same assumption baked into
    // every other STACK_BASE_REM/STACK_SPINE_REM offset in this file.
    const lineOffsetPx = precedingTopRem * 16;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Not intersecting AND above the line means the marker left through
        // the top of the region we're watching — i.e. we scrolled past
        // where the last card starts covering the one before it, not that
        // it just hasn't arrived yet from below.
        setPastStack(!entry.isIntersecting && entry.boundingClientRect.top < lineOffsetPx);
      },
      { threshold: 0, rootMargin: `-${lineOffsetPx}px 0px 0px 0px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [precedingTopRem]);

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

          `filters` ALSO wants to release once you're past the stack, but
          bounding it to this div the same way doesn't actually work: that
          only lets it release once you've scrolled far enough for this
          div's bottom to clear the pin line, which needs MORE scrollable
          page below than there usually is (the CTA + footer aren't tall
          enough, especially on a tall monitor) — the browser has nowhere
          left to scroll to, so filters just stays pinned no matter how far
          down you go. Padding a spacer in to guarantee that room reads as
          a dead, empty gap before the footer. So this one piece isn't pure
          CSS: the sentinel + IntersectionObserver above watch for the
          exact scroll position instead, and filters' sticky class comes
          off right then — precise, and doesn't need extra page height to
          work. */}
      <div>
        {ticker}
        <div
          className={
            pastStack
              ? "bg-arena/95 backdrop-blur-sm"
              : "sticky top-[5.5rem] z-30 bg-arena/95 backdrop-blur-sm"
          }
        >
          {filters}
        </div>
        <div className="relative flex flex-col px-6 sm:px-10 max-w-5xl mx-auto mt-10">
          {/* Hairline the dates hang from. Only drawn where the page margin is
              wide enough to hold them; see DateRail. */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-[calc(2.5rem-12px)] top-0 hidden w-px bg-medianoche/25 min-[1200px]:block"
          />
          {items.map((event, i) =>
            i === lastIndex ? (
              <Fragment key={event.id}>
                <div ref={sentinelRef} aria-hidden className="h-px" />
                {/* Not sticky, but still needs to be a positioned box so its
                    date can hang off its own top edge. */}
                <div className="relative">
                  <DateRail event={event} />
                  <EventCardFace
                    event={event}
                    index={i}
                    total={items.length}
                    onSelect={() => setSelected(event)}
                  />
                </div>
              </Fragment>
            ) : (
              <div
                key={event.id}
                className="sticky"
                style={{ top: `${STACK_BASE_REM + i * STACK_SPINE_REM}rem` }}
              >
                <DateRail event={event} />
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

/**
 * The date, hung in the page margin to the left of its card so the list reads
 * as a calendar. It lives inside the card's own (sticky) wrapper, so it pins
 * with the card: when later cards slide over this one and leave only its top
 * edge showing, the date stays visible beside it, and the pinned dates read
 * down the margin like an agenda.
 *
 * Needs ~130px of margin, which a centred max-w-5xl column only has from
 * 1200px up. Below that the date stays inside the card (see the
 * `min-[1200px]:hidden` on the in-card one), so nothing is ever shown twice.
 */
function DateRail({ event }: { event: EventCard }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-full top-[6px] mr-[18px] hidden items-baseline gap-2 font-serif leading-none text-medianoche after:absolute after:left-full after:top-1/2 after:h-px after:w-[18px] after:bg-medianoche/35 min-[1200px]:flex"
    >
      <b className="text-[40px] font-medium tracking-[-0.02em]">{event.day}</b>
      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em]">
        {event.month}
      </span>
    </div>
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

      <div className="absolute left-[26px] top-[14px] flex items-baseline gap-2 font-serif leading-none text-arena min-[1200px]:hidden">
        <b className="text-[30px] font-medium">{event.day}</b>
        <span className="-translate-y-px font-sans text-[11px] font-bold tracking-[0.1em] uppercase">
          {event.month}
        </span>
      </div>
      <span className="absolute right-[26px] top-[18px] text-[11px] tracking-[0.08em] text-arena/55">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <div className="absolute left-[26px] right-[26px] bottom-[22px] max-w-[32rem]">
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-arena"
            style={{ background: accent.hex }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-arena/85" />
            {event.typeLabel}
          </span>
          <span className="text-xs text-arena/75">{event.timeLabel}</span>
        </div>
        <h3 className="mb-2.5 font-serif text-[clamp(22px,3vw,32px)] leading-[1.08] text-arena">
          {event.title}
        </h3>
        <p className="text-[13px] text-arena/80">
          {event.placeLabel ? `${event.placeLabel} · ` : ""}
          {event.priceLabel}
        </p>
        {event.description && (
          <p className="mt-2.5 hidden max-w-[28rem] text-[13.5px] leading-relaxed text-arena/75 lg:block">
            {event.description}
          </p>
        )}
      </div>

      <span className="absolute bottom-6 right-[26px] hidden items-center gap-1.5 text-[12.5px] font-semibold text-arena opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,22,29,0.72)] p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="grid max-h-[88vh] w-full max-w-3xl overflow-auto rounded-lg bg-arena shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] sm:grid-cols-2">
        <div className="relative min-h-[220px] sm:min-h-0">
          <Image src={event.coverUrl} alt="" fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="relative flex flex-col p-8 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-arena/90 text-xl text-medianoche shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-arena"
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
            className="mb-4 font-serif text-3xl leading-tight text-medianoche sm:text-4xl"
          >
            {event.title}
          </h2>
          <p className="mb-1 font-serif italic text-medianoche">{event.dateLabel}</p>
          <p className="mb-5 text-sm text-gris">
            {event.timeLabel}
            {event.placeLabel ? ` · ${event.placeLabel}` : ""}
            {` · ${event.modeLabel}`}
          </p>
          {event.description && (
            <p className="mb-6 leading-relaxed text-medianoche/80">{event.description}</p>
          )}
          <div className="mb-6 flex gap-7 border-y border-cielo py-5">
            <div>
              <p className="font-serif text-xl text-medianoche">{event.priceLabel}</p>
              <p className="mt-1 text-[10.5px] uppercase tracking-[0.12em] text-gris">Costo</p>
            </div>
            {event.capacityLabel && (
              <div>
                <p className="font-serif text-xl text-medianoche">{event.capacityLabel}</p>
                <p className="mt-1 text-[10.5px] uppercase tracking-[0.12em] text-gris">Cupo</p>
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-medianoche px-6 py-3 text-sm font-semibold text-arena hover:bg-medianoche"
            >
              Registrarme
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-medianoche/30 px-6 py-3 text-sm text-medianoche hover:bg-cielo/40"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
