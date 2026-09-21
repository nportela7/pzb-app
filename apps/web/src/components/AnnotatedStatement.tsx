"use client";

import { motion, useReducedMotion } from "motion/react";
import { Grain } from "@/components/Grain";
import {
  MarkArrow,
  MarkBox,
  MarkCaret,
  MarkCircle,
  MarkUnderline,
} from "@/components/EditorialMarks";

/**
 * A statement set at manuscript scale, with the margin notes that argue
 * with it. Pilar is a Strategic Life Editor and the programme is an
 * "expediente", so the page corrects itself the way a manuscript does.
 *
 * Two rules make this work, and breaking either one makes it unreadable:
 *
 * 1. ONE LOUD LAYER. The display type is a watermark — beige-sand on cream
 *    is about 1.35:1, deliberately almost-not-there. The notes on top are
 *    charcoal and redline at full strength. Two high-contrast layers in the
 *    same space cancel each other out; a quiet one and a loud one read as
 *    depth. Charcoal still clears 7:1 over the watermark, so a note is just
 *    as legible where it crosses a letter as where it doesn't.
 *
 * 2. THE NOTES LIVE ON A GRID. They are not floated over the letterforms at
 *    hand-tuned percentages — that only holds at the one width it was tuned
 *    for and collapses everywhere else. Twelve columns, explicit starts, and
 *    the composition survives every viewport.
 *
 * The watermark is aria-hidden and the heading is restated for screen
 * readers: at 1.35:1 it is atmosphere, and calling atmosphere a heading
 * would be a lie to anyone who cannot see it.
 */

const TONES = {
  paper: {
    ground: "bg-cream",
    grain: 0.05,
    watermark: "text-beige-sand",
    mark: "text-redline",
    note: "text-charcoal",
    noteMuted: "text-charcoal",
    script: "text-charcoal",
  },
  ink: {
    ground: "bg-earth-brown",
    grain: 0.07,
    watermark: "text-cream/[0.09]",
    mark: "text-beige-sand",
    note: "text-cream",
    noteMuted: "text-cream",
    script: "text-cream",
  },
} as const;

export type AnnotatedStatementProps = {
  /** One line each, at watermark scale. Two lines reads best. */
  lines: [string, string];
  /** Ringed in the margin — three or four words, no more. */
  circled: string;
  /** The boxed aside, top right. The counter-argument. */
  boxed: string;
  /** Arrowed and underlined. The qualifier that turns a slogan into a method. */
  arrowed: string;
  /** The closing line, in her own hand. */
  script?: string;
  tone?: keyof typeof TONES;
  className?: string;
};

export function AnnotatedStatement({
  lines,
  circled,
  boxed,
  arrowed,
  script,
  tone = "paper",
  className = "",
}: AnnotatedStatementProps) {
  const t = TONES[tone];
  const reduce = useReducedMotion();

  const note = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const inView = {
    variants: note,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.5 },
  };

  return (
    <section
      className={`relative isolate overflow-hidden py-20 sm:py-28 ${t.ground} ${className}`}
    >
      <Grain opacity={t.grain} />

      {/* The manuscript underneath. Centred on the section rather than placed
          in the flow, so the notes above it never have to leave room for it. */}
      {/* Below lg the manuscript stays IN THE FLOW, with the notes stacked
          underneath it. Pulling it out to `absolute` at every width put a
          72px watermark directly behind a 352px column of margin notes on a
          phone, and neither layer survived. Depth needs room; a phone has
          none, so the layers become a sequence instead. */}
      <div
        aria-hidden
        className="pointer-events-none relative mb-10 lg:absolute lg:inset-0 lg:-z-10 lg:mb-0 lg:flex lg:items-center"
      >
        <p
          className={`shell w-full font-serif font-bold uppercase leading-[0.8] tracking-[-0.04em] ${t.watermark}`}
          style={{ fontSize: "clamp(3rem, 14.5vw, 15rem)" }}
        >
          {lines.map((text) => (
            <span key={text} className="block whitespace-nowrap">
              {text}
            </span>
          ))}
        </p>
      </div>

      <div className="shell relative">
        <h2 className="sr-only">{lines.join(" ")}</h2>

        {/* content-between drops the second row to the floor of the block.
            With both rows packed at the top, a third of the section sat empty
            underneath the type and the whole thing read top-heavy. */}
        <div className="grid gap-y-12 lg:min-h-[26rem] lg:grid-cols-12 lg:content-between lg:items-start lg:gap-x-8">
          {/* Ringed, far left — the role, circled like a word you'll come back to. */}
          <motion.div
            {...inView}
            className="relative w-fit lg:col-span-3 lg:col-start-1"
          >
            <MarkCircle
              order={0}
              className={`absolute -inset-x-10 -inset-y-5 h-[calc(100%+2.5rem)] w-[calc(100%+5rem)] ${t.mark}`}
            />
            <p
              className={`relative font-script font-semibold text-2xl leading-tight sm:text-[1.6rem] ${t.note}`}
            >
              {circled}
            </p>
          </motion.div>

          {/* Boxed, far right. Sans at note size: the handwriting is reserved
              for short marks, because Cedarville past a few words stops being
              charming and starts being work to read. */}
          <motion.div
            {...inView}
            className="relative w-full max-w-[22rem] lg:col-span-3 lg:col-start-10 lg:max-w-none"
          >
            <MarkBox
              order={1}
              className={`absolute -inset-x-6 -inset-y-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] ${t.mark}`}
            />
            <p
              className={`relative text-[1.15rem] font-extrabold uppercase leading-[1.6] tracking-[0.08em] ${t.noteMuted}`}
            >
              {boxed}
            </p>
          </motion.div>

          {/* Second row, indented — the qualifier, arrowed and underlined. */}
          <motion.div
            {...inView}
            className="relative w-full max-w-[26rem] lg:col-span-6 lg:col-start-6 lg:w-fit lg:max-w-none"
          >
            <MarkArrow
              order={2}
              className={`absolute -left-24 top-0 hidden h-10 w-20 lg:block ${t.mark}`}
            />
            <p
              className={`relative font-serif text-lg font-medium italic leading-snug sm:text-xl ${t.note}`}
            >
              {arrowed}
            </p>
            <MarkUnderline order={3} className={`mt-2.5 h-3 w-full ${t.mark}`} />

            {script && (
              <div className="mt-7 flex items-end gap-3">
                <MarkCaret order={4} className={`h-6 w-6 shrink-0 ${t.mark}`} />
                <p
                  className={`font-script text-xl leading-tight sm:text-2xl ${t.script}`}
                >
                  {script}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
