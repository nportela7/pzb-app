"use client";

import Image from "next/image";
import { Grain } from "@/components/Grain";
import { useSnapCarousel } from "@/lib/use-snap-carousel";

export type PortraitSlide = {
  src: string;
  /** The caption that sits bottom-left. Two or three words: "En taller". */
  label: string;
  /** Empty string when the photo is purely atmospheric. */
  alt: string;
};

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
      className={`h-4 w-4 ${direction === "prev" ? "-scale-x-100" : ""}`}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

/**
 * The portrait block, as a gallery rather than one photograph.
 *
 * One image says "here is what she looks like". A set of them says "here is
 * where she actually works" — on stage, in a session, at a table — which is
 * the claim the section is trying to make. The brand treatment stays exactly
 * as the single portrait had it: brown ground, multiply wash, inset cream
 * rule, grain. Only the number of photographs changes.
 *
 * Built on the same scroll-snap track as EventBannerCarousel: the browser
 * does the snapping, `active` is only read back out of scrollLeft for the
 * dots. Drag, trackpad, arrow keys and the buttons all work for free.
 */
export function PortraitGallery({
  items,
  className = "",
}: {
  items: PortraitSlide[];
  className?: string;
}) {
  const { trackRef, active, readScroll, goTo } = useSnapCarousel(items.length);

  if (items.length === 0) return null;
  const many = items.length > 1;

  return (
    // Two height regimes, and the difference matters.
    //
    // On a phone the frame owns its height through an aspect ratio: it is the
    // only thing in the column, so it may as well choose.
    //
    // From lg it does NOT. The caller drops it out of flow with
    // `lg:absolute lg:inset-0`, which hands it a definite box taken from the
    // grid row -- and that row is sized by the text beside it. The photograph
    // fits the argument instead of stretching the section to fit a ratio.
    //
    // A definite box is also what makes `h-full` below resolve at all. An
    // earlier version chained `h-full` through a parent whose own height was
    // `auto`; the percentage had nothing to resolve against, every slide
    // collapsed to zero, and all you saw was the brown ground behind them.
    <div
      className={`relative overflow-hidden rounded-3xl bg-earth-brown ${className}`}
    >
      <ul
        ref={trackRef}
        onScroll={readScroll}
        tabIndex={many ? 0 : -1}
        aria-label="Pilar, en su trabajo"
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto"
      >
        {items.map((slide) => (
          <li
            key={slide.src}
            className="relative aspect-[4/5] w-full shrink-0 snap-start lg:aspect-auto lg:h-full"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-earth-brown opacity-[0.12] mix-blend-multiply"
            />
            {/* The caption sits on the photograph, so it needs its own floor
                to stand on — a bright frame would otherwise swallow it. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-transparent"
            />
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-2xl border border-cream/40"
      />

      <p className="pointer-events-none absolute bottom-8 left-9 text-[0.62rem] uppercase tracking-[0.22em] text-cream">
        {items[active]?.label}
      </p>

      {many && (
        <>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Foto anterior"
            className="absolute left-7 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-earth-brown shadow-[0_10px_24px_-12px_rgba(54,54,54,0.7)] backdrop-blur-sm transition-colors hover:bg-cream"
          >
            <Chevron direction="prev" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Foto siguiente"
            className="absolute right-7 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-earth-brown shadow-[0_10px_24px_-12px_rgba(54,54,54,0.7)] backdrop-blur-sm transition-colors hover:bg-cream"
          >
            <Chevron direction="next" />
          </button>

          <div className="absolute bottom-8 right-9 flex items-center gap-2">
            {items.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver ${slide.label}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-cream" : "w-1.5 bg-cream/45 hover:bg-cream/75"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <Grain opacity={0.07} />
    </div>
  );
}
