import Image from "next/image";

/**
 * The PILAR / ZAMBRANO B. logo from the brand proposal (Papel Maché), in the
 * two inks the brand allows on its grounds: medianoche on arena, cielo and
 * butter, arena on medianoche and coral. Both are cut out from the proposal's
 * page 1 against a transparent background, so they sit on any ground (the
 * header's glass pill, the footer's patches of light).
 *
 * Raster for now (1148×513, ~2x for the sizes used). If Papel Maché sends the
 * SVG, swap the two files and nothing else changes.
 *
 * Size it with a height class (e.g. `h-9`); the width follows the aspect ratio.
 */
const SRC = {
  medianoche: "/images/logo-pilar-zambrano-medianoche.png",
  arena: "/images/logo-pilar-zambrano-arena.png",
} as const;

export function PilarLogo({
  tone = "medianoche",
  className = "h-9",
  priority = false,
}: {
  tone?: keyof typeof SRC;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[tone]}
      alt="Pilar Zambrano B."
      width={1148}
      height={513}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
