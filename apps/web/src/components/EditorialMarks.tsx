"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The editor's pen. Pilar is a Strategic Life Editor and the programme is an
 * "expediente", so the page marks itself up the way a manuscript does: a word
 * circled in the margin, an arrow to the note that explains it, a line drawn
 * under the part that matters.
 *
 * Every path is deliberately imperfect — the ellipse overshoots where it
 * closes, the underline wobbles, the box doesn't quite meet its corner. A
 * geometrically perfect circle reads as a UI element; an imperfect one reads
 * as a hand. That difference is the whole effect.
 *
 * The marks draw themselves in when they scroll into view, so the section
 * feels annotated live rather than pre-printed. Visitors who asked for less
 * motion get the finished mark with no drawing.
 */

type MarkProps = {
  className?: string;
  /** Staggers this mark behind the previous one, in mark-index units. */
  order?: number;
};

const DRAW_DURATION = 0.85;

function useDraw(order: number) {
  const reduce = useReducedMotion();
  const delay = order * 0.22;

  if (reduce) {
    return {
      initial: { pathLength: 1, opacity: 1 },
      whileInView: { pathLength: 1, opacity: 1 },
    } as const;
  }

  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: DRAW_DURATION, ease: "easeInOut", delay },
        // The stroke appears the instant it starts travelling, otherwise the
        // first frames fade a full-length path in and give the trick away.
        opacity: { duration: 0.01, delay },
      },
    },
  } as const;
}

/**
 * NO vector-effect="non-scaling-stroke" here, ever.
 *
 * The draw-in works by setting pathLength="1" and animating a dash over it,
 * which normalises the path in USER space. non-scaling-stroke asks the browser
 * to apply that dash in SCREEN space instead. Inside a viewBox stretched by
 * preserveAspectRatio="none" the two spaces disagree, the dash runs out before
 * the path does, and the tail of the stroke is simply never painted -- which is
 * why the box used to render with half its bottom edge missing.
 *
 * The cost is that stroke weight now scales with the frame, so each viewBox is
 * proportioned to the shape it actually wraps. Keep it that way: a viewBox far
 * off its rendered aspect gives you one thick axis and one thin one.
 */
const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Circles a phrase in the margin, the way you ring a word you'll come back to. */
export function MarkCircle({ className = "", order = 0 }: MarkProps) {
  const draw = useDraw(order);
  return (
    <svg
      viewBox="0 0 220 72"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        {...STROKE}
        strokeWidth={2.9}
        viewport={{ once: true, amount: 0.6 }}
        {...draw}
        d="M186 23C170 9 118 3 72 9C26 15 4 33 14 50C24 66 86 71 136 65C178 59 206 44 198 29C195 23 188 19 180 17"
      />
    </svg>
  );
}

/** Points from the big statement to the note that qualifies it. */
export function MarkArrow({ className = "", order = 0 }: MarkProps) {
  const draw = useDraw(order);
  return (
    <svg
      viewBox="0 0 132 56"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        {...STROKE}
        strokeWidth={5.2}
        viewport={{ once: true, amount: 0.6 }}
        {...draw}
        d="M6 42C34 41 62 33 104 20M88 8L110 19L90 32"
      />
    </svg>
  );
}

/** Two passes of the pen, because nobody underlines anything just once. */
export function MarkUnderline({ className = "", order = 0 }: MarkProps) {
  const draw = useDraw(order);
  const second = useDraw(order + 0.4);
  return (
    <svg
      viewBox="0 0 320 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        {...STROKE}
        strokeWidth={3.4}
        viewport={{ once: true, amount: 0.6 }}
        {...draw}
        d="M5 5C78 1 166 7 314 3"
      />
      <motion.path
        {...STROKE}
        strokeWidth={2.4}
        strokeOpacity={0.7}
        viewport={{ once: true, amount: 0.6 }}
        {...second}
        d="M14 9C92 6 178 10 306 7"
      />
    </svg>
  );
}

/** Boxes off a margin note. Left open at the corner, like a real one. */
export function MarkBox({ className = "", order = 0 }: MarkProps) {
  const draw = useDraw(order);
  return (
    <svg
      viewBox="0 0 280 150"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        {...STROKE}
        strokeWidth={2.9}
        viewport={{ once: true, amount: 0.5 }}
        {...draw}
        d="M18 138C11 98 10 52 16 12C96 5 190 7 266 14C271 54 269 102 264 140C188 147 94 145 22 139"
      />
    </svg>
  );
}

/** The proofreader's caret — "something goes here". Small, used sparingly. */
export function MarkCaret({ className = "", order = 0 }: MarkProps) {
  const draw = useDraw(order);
  return (
    <svg
      viewBox="0 0 40 34"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        {...STROKE}
        strokeWidth={5}
        viewport={{ once: true, amount: 0.6 }}
        {...draw}
        d="M4 30C10 18 15 9 20 4C25 10 30 19 36 30"
      />
    </svg>
  );
}
