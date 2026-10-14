"use client";

import { motion } from "motion/react";

const TONES = {
  earth: { color: "text-medianoche/40", line: "bg-medianoche/20" },
  cream: { color: "text-arena/50", line: "bg-arena/25" },
  zere: { color: "text-zere-deep/40", line: "bg-zere-deep/25" },
};

export function SectionIndex({
  n,
  label,
  tone = "earth",
}: {
  n: string;
  label: string;
  tone?: keyof typeof TONES;
}) {
  const { color, line } = TONES[tone];

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: -12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className={`hidden lg:flex flex-col items-center gap-3 absolute left-6 xl:left-12 top-20 sm:top-28 w-8 ${color}`}
    >
      <span className="font-serif text-sm">{n}</span>
      <span className={`w-px h-14 ${line}`} />
      <span
        className="text-[10px] tracking-[0.25em] uppercase whitespace-nowrap"
        style={{ writingMode: "vertical-rl" }}
      >
        {label}
      </span>
    </motion.div>
  );
}
