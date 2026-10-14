/**
 * An oil-painted brown ground for the hero.
 *
 * A flat fill reads as a template and a smooth mesh gradient reads as
 * something a machine made, so neither is used here. What makes paint look
 * like paint is that the colour varies within one family, the strokes have a
 * direction, and their edges are irregular. All three are built here rather
 * than shipped as a bitmap: an image would cost hundreds of kilobytes, band
 * on wide screens and need a second copy for every crop.
 *
 * Three layers, bottom to top:
 *
 *   1. A diagonal ramp through six browns, pushed around by stretched noise.
 *      The turbulence frequency is deliberately lopsided -- very low across,
 *      much higher down -- so the noise smears into streaks that read as the
 *      travel of a brush instead of as isotropic cloud.
 *   2. A second pass at a different seed and a gentler displacement, blended
 *      soft-light, which is what keeps the first pass from looking like one
 *      clever filter applied once.
 *   3. Light: warm from the upper right where the portrait stands, shading
 *      down to the left where the headline sits. One source, like a painting.
 *
 * Every tone stays in the dark half of the palette on purpose. The lightest
 * stop is #1388b1, which holds arena at only about 3.6:1 -- large display
 * copy clears AA there, small copy does not, so keep it off the lit corner.
 */
export function PaintedBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pb-strokes" x1="0.04" y1="0" x2="0.92" y2="1">
            <stop offset="0" stopColor="#1388b1" />
            <stop offset="0.19" stopColor="#0b4c6290" />
            <stop offset="0.38" stopColor="#0f6c8d" />
            <stop offset="0.57" stopColor="#083646" />
            <stop offset="0.74" stopColor="#0e6584" />
            <stop offset="0.88" stopColor="#093c4d" />
            <stop offset="1" stopColor="#107395" />
          </linearGradient>

          <linearGradient id="pb-strokes-2" x1="1" y1="0.1" x2="0" y2="0.95">
            <stop offset="0" stopColor="#1388b0" />
            <stop offset="0.3" stopColor="#083a4b" />
            <stop offset="0.55" stopColor="#117597" />
            <stop offset="0.8" stopColor="#07313f" />
            <stop offset="1" stopColor="#0f6684" />
          </linearGradient>

          {/* scale is high because a small displacement on a smooth ramp just
              looks like a blurry gradient; it needs to travel far enough to
              tear the bands apart into separate strokes. */}
          <filter
            id="pb-brush"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0015 0.019"
              numOctaves="4"
              seed="9"
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale="240"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter
            id="pb-brush-2"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0031 0.012"
              numOctaves="3"
              seed="23"
              result="n2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n2"
              scale="130"
              xChannelSelector="G"
              yChannelSelector="B"
            />
          </filter>

          <radialGradient id="pb-light" cx="0.74" cy="0.34" r="0.62">
            <stop offset="0" stopColor="#18a8da" stopOpacity="0.42" />
            <stop offset="0.6" stopColor="#18a8da" stopOpacity="0.1" />
            <stop offset="1" stopColor="#18a8da" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="pb-shade" x1="0" y1="0.2" x2="1" y2="0.9">
            <stop offset="0" stopColor="#062732" stopOpacity="0.62" />
            <stop offset="0.5" stopColor="#062732" stopOpacity="0.16" />
            <stop offset="1" stopColor="#062732" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The painted rects overhang the canvas: feDisplacementMap samples
            beyond its source, and a rect flush with the viewBox would tear
            transparent gaps along every edge. */}
        <rect
          x="-260"
          y="-260"
          width="1720"
          height="1320"
          fill="url(#pb-strokes)"
          filter="url(#pb-brush)"
        />
        <rect
          x="-260"
          y="-260"
          width="1720"
          height="1320"
          fill="url(#pb-strokes-2)"
          filter="url(#pb-brush-2)"
          style={{ mixBlendMode: "overlay" }}
          opacity="0.7"
        />

        <rect width="1200" height="800" fill="url(#pb-light)" />
        <rect width="1200" height="800" fill="url(#pb-shade)" />
      </svg>
    </div>
  );
}
