"use client";

import Image from "next/image";
import Link from "next/link";
import { useSnapCarousel } from "@/lib/use-snap-carousel";
import { eventoWhatsappHref } from "@/lib/cta";
import type { EventBanner } from "@/lib/event-banner";

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`w-4 h-4 ${direction === "prev" ? "-scale-x-100" : ""}`}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/60">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-cream text-balance">{value}</dd>
    </div>
  );
}

export function EventBannerCarousel({
  items,
  heading,
  moreHref,
  moreLabel,
}: {
  items: EventBanner[];
  heading: string;
  moreHref: string;
  moreLabel: string;
}) {
  const { trackRef, active, readScroll, goTo } = useSnapCarousel(items.length);

  if (items.length === 0) return null;

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center gap-x-8 gap-y-4">
        <h2 className="font-serif text-2xl text-earth-brown sm:text-3xl">
          {heading}
        </h2>
        <Link
          href={moreHref}
          className="group inline-flex items-center gap-2 text-sm text-charcoal/70 transition-colors hover:text-earth-brown"
        >
          {moreLabel}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>

        {items.length > 1 && (
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Evento anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-earth-brown/30 text-earth-brown transition-colors hover:border-earth-brown hover:bg-earth-brown hover:text-cream"
            >
              <Chevron direction="prev" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Evento siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-earth-brown/30 text-earth-brown transition-colors hover:border-earth-brown hover:bg-earth-brown hover:text-cream"
            >
              <Chevron direction="next" />
            </button>
          </div>
        )}
      </div>

      <ul
        ref={trackRef}
        onScroll={readScroll}
        tabIndex={0}
        aria-label="Próximos eventos"
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-3xl"
      >
        {items.map((event) => (
          <li key={event.id} className="w-full shrink-0 snap-start">
            <article className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:aspect-[21/9]">
              <Image
                src={event.coverUrl}
                alt=""
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover"
              />
              {/* Two layers, because the admin picks the photo and a bright one
                  would otherwise swallow the copy: a floor of tint over the
                  whole frame, plus a heavy wash rising from the bottom-left
                  where the text actually sits. Never reaches transparent. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-charcoal/30"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-charcoal/90 via-charcoal/55 to-charcoal/10"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10 lg:p-14">
                <p className="flex items-center gap-2.5 text-[0.62rem] uppercase tracking-[0.2em] text-cream/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                  {event.typeLabel} · {event.modeLabel}
                </p>

                <h3 className="mt-4 max-w-2xl font-serif text-3xl leading-[1.05] text-cream text-balance sm:text-5xl lg:text-6xl">
                  {event.title}
                </h3>

                {event.description && (
                  <p className="mt-4 hidden max-w-md text-sm leading-relaxed text-cream/80 sm:block">
                    {event.description}
                  </p>
                )}

                <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                  <a
                    href={eventoWhatsappHref(event.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center self-start rounded-full bg-cream px-8 py-3.5 text-sm font-semibold tracking-wide text-charcoal transition-colors hover:bg-beige-sand"
                  >
                    Más información
                  </a>

                  <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:gap-10">
                    <Meta label="Fecha" value={event.dateLabel} />
                    {event.placeLabel && (
                      <Meta label="Lugar" value={event.placeLabel} />
                    )}
                  </dl>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {items.length > 1 && (
        <div className="mt-6 flex justify-center gap-2.5">
          {items.map((event, i) => (
            <button
              key={event.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a ${event.title}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all ${
                i === active
                  ? "w-6 bg-earth-brown"
                  : "w-2 bg-earth-brown/25 hover:bg-earth-brown/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
