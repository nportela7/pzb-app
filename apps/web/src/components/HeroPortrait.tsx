import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Feathered edges, as two linear masks intersected rather than one radial.
 *
 * A radial mask was the obvious first choice and it was wrong. Its radii are
 * percentages of the BOX, so an ellipse wide enough to leave the middle of
 * the photograph alone reaches its transparent stop well outside the frame:
 * on a 480x600 box the 74% radius lands at 355px while the near edge is only
 * 230px away, so the fade was still at 55% opacity when the image simply
 * stopped. A hard rectangle, from a mask that was working exactly as asked.
 *
 * Two linear gradients composited with `intersect` feather each edge by a
 * distance you state directly and leave the centre untouched. The bottom
 * fades sooner than the sides so she dissolves down into the painted ground
 * instead of standing on a cut line.
 */
const FEATHER: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 11%, #000 68%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 11%, #000 68%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
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
 * a feathered radial mask that dissolves the photograph's edges into the
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
          className="object-cover object-top"
          style={
            cutout
              ? {
                  // Three passes: two tight ones build a solid rim, the wide
                  // one throws the glow. One pass alone reads as a stroke.
                  filter:
                    "drop-shadow(0 0 1px var(--pzb-beige-sand)) drop-shadow(0 0 3px var(--pzb-beige-sand)) drop-shadow(0 0 26px rgba(218,210,193,0.45))",
                  objectFit: "contain",
                }
              : {
                  ...FEATHER,
                }
          }
        />

        {!cutout && (
          // The photograph was lit for its own room, not for this one. A wash
          // of the brand brown pulls it into the same light as the paint
          // behind it, so the two do not read as separate pictures.
          <div
            aria-hidden
            className="absolute inset-0 bg-earth-brown/35 mix-blend-multiply"
            style={FEATHER}
          />
        )}
      </div>
    </div>
  );
}
