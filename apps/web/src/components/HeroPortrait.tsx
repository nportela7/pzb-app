import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * A painted arch, not a rectangle.
 *
 * The ground behind her is a painting, so a photograph with straight edges
 * reads as something pasted on top of it. The mask is an arch -- the one
 * shape a portrait can take that still feels composed rather than cut out --
 * whose edge has been pushed around by the same kind of stretched noise the
 * backdrop uses, so the rim is ragged like the end of a brushstroke instead
 * of drawn with a compass. The bottom still dissolves into the ground, which
 * is what keeps her from standing on a cut line.
 *
 * It is an SVG in a data URI rather than `clip-path` because clip-path is
 * binary: it can give the outline but not the soft, uneven alpha of paint.
 * The filter region is padded so the displaced edge is not clipped square.
 */
const ARCH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" preserveAspectRatio="none">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="0.72" stop-color="#fff"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="3" seed="7"/>
      <feDisplacementMap in="SourceGraphic" scale="26" xChannelSelector="R" yChannelSelector="G"/>
      <feGaussianBlur stdDeviation="1.6"/>
    </filter>
  </defs>
  <path filter="url(#brush)" fill="url(#fade)" d="M34 500 L34 196 C34 98 108 26 200 26 C292 26 366 98 366 196 L366 500 Z"/>
</svg>`;

const ARCH_URL = `url("data:image/svg+xml,${encodeURIComponent(ARCH_SVG)}")`;

const ARCH_MASK: CSSProperties = {
  maskImage: ARCH_URL,
  WebkitMaskImage: ARCH_URL,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

/**
 * Pilar, standing in the hero.
 *
 * `cutout` is the whole story. The halo in the reference is not a border
 * drawn around a box -- it is stacked drop-shadows tracing the image's ALPHA
 * CHANNEL, which is why it follows a shoulder and a strand of hair. That only
 * works on a background-removed PNG or WebP. Handed a JPEG, the same filter
 * dutifully traces the rectangle, and it looks like a mistake.
 *
 * So until a cut-out file exists the component takes the other honest route:
 * a painted arch mask that dissolves the photograph's edges into the
 * painted ground. It reads as deliberate rather than broken, and the day the
 * transparent file lands, `cutout` flips to true and the halo appears.
 */
export function HeroPortrait({
  src,
  alt,
  cutout = false,
  className = "",
}: {
  src: string;
  alt: string;
  /** True only for a background-removed PNG/WebP. See above. */
  cutout?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 80vw"
          className="object-cover object-[50%_22%]"
          style={
            cutout
              ? {
                  // Three passes: two tight ones build a solid rim, the wide
                  // one throws the glow. One pass alone reads as a stroke.
                  filter:
                    "drop-shadow(0 0 1px var(--pzb-cielo)) drop-shadow(0 0 3px var(--pzb-cielo)) drop-shadow(0 0 26px rgba(155,199,236,0.45))",
                  objectFit: "contain",
                }
              : {
                  ...ARCH_MASK,
                  // A light film grade: a touch of sepia and lifted blacks so
                  // the portrait shares the painting's slightly washed colour.
                  // Kept gentle -- same world as the ground, not a filter.
                  filter:
                    "sepia(0.18) saturate(0.92) contrast(0.94) brightness(1.04)",
                }
          }
        />

        {!cutout && (
          // The photograph was lit for its own room, not for this one. A
          // light leak from the upper right -- the same low sun the painting
          // is lit by -- pulls it into the same afternoon. Screen can only
          // brighten, so it warms the highlights without muddying the skin.
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-screen"
            style={{
              ...ARCH_MASK,
              background:
                "radial-gradient(ellipse at 92% 6%, rgba(252,194,72,0.42) 0%, rgba(246,70,72,0.14) 38%, transparent 70%)",
            }}
          />
        )}
      </div>
    </div>
  );
}
