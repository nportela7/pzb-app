"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { Testimonial } from "@/lib/testimonials";

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

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="w-5 h-5 ml-0.5">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

/**
 * The media slot degrades in three steps, strongest first: a recorded
 * testimonial, then a portrait, then the brand's stroked monogram. A quote
 * with no name at all gets the quotation mark — visibly the weakest card,
 * which is the honest signal that it needs an attribution.
 */
function Media({
  testimonial,
  playing,
  onPlay,
}: {
  testimonial: Testimonial;
  playing: boolean;
  onPlay: () => void;
}) {
  const { video, photoUrl, author, quote } = testimonial;

  if (video) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-earth-brown">
        {playing ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Reproducir el testimonio de ${author ?? "una clienta"}`}
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, 85vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-charcoal/25 transition-colors group-hover:bg-charcoal/15" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-earth-brown shadow-[0_12px_28px_-10px_rgba(54,54,54,0.6)] transition-transform duration-300 group-hover:scale-110">
              <PlayMark />
            </span>
          </button>
        )}
      </div>
    );
  }

  if (photoUrl) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-beige-sand">
        <Image
          src={photoUrl}
          alt={author ?? ""}
          fill
          sizes="(min-width: 1024px) 30vw, 85vw"
          className="object-cover"
        />
        <span className="absolute inset-0 bg-earth-brown mix-blend-multiply opacity-[0.1]" />
      </div>
    );
  }

  const initial = author?.trim()[0]?.toUpperCase();

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-beige-sand/70">
      <span
        aria-hidden
        className="select-none font-serif italic font-light leading-none text-transparent"
        style={{
          fontSize: initial ? "11rem" : "14rem",
          WebkitTextStroke: "1.5px rgba(89,68,52,0.4)",
        }}
      >
        {initial ?? "“"}
      </span>
      <span className="sr-only">{quote}</span>
    </div>
  );
}

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  function readScroll() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    // One card plus its gap, read from the DOM so it stays correct at every
    // breakpoint instead of hard-coding the card width three times.
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({
      left: step * direction,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }

  if (items.length === 0) return null;

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={readScroll}
        tabIndex={0}
        aria-label="Testimonios de clientas"
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10"
      >
        {items.map((testimonial) => (
          <li
            key={testimonial.id}
            className="w-[80vw] max-w-sm shrink-0 snap-start sm:w-[22rem]"
          >
            <figure className="flex h-full flex-col">
              <Media
                testimonial={testimonial}
                playing={playingId === testimonial.id}
                onPlay={() => setPlayingId(testimonial.id)}
              />
              <blockquote className="mt-6 flex-1">
                <p className="font-serif italic text-lg leading-snug text-earth-brown text-balance">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-5 border-t border-earth-brown/20 pt-4">
                {testimonial.author ? (
                  <>
                    <p className="font-serif text-lg text-charcoal">
                      {testimonial.author}
                    </p>
                    {testimonial.context && (
                      <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-charcoal/75">
                        {testimonial.context}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-charcoal/75">
                    Clienta de Pilar
                  </p>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Testimonio anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-earth-brown/30 text-earth-brown transition-colors hover:border-earth-brown hover:bg-earth-brown hover:text-cream disabled:pointer-events-none disabled:opacity-30"
          >
            <Chevron direction="prev" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Testimonio siguiente"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-earth-brown/30 text-earth-brown transition-colors hover:border-earth-brown hover:bg-earth-brown hover:text-cream disabled:pointer-events-none disabled:opacity-30"
          >
            <Chevron direction="next" />
          </button>
        </div>

        <div aria-hidden className="relative h-px flex-1 bg-earth-brown/20">
          <span
            className="absolute inset-y-0 left-0 bg-earth-brown transition-[width] duration-200"
            style={{ width: `${Math.max(progress * 100, 4)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
