/**
 * An oil-painted, afternoon-light ground for the hero.
 *
 * The brand's photography is late sun on skin, sand and travertine: warm,
 * slow, slightly washed, nothing clinical. A flat fill reads as a template
 * and a smooth mesh gradient reads as something a machine made, so neither is
 * used here. What makes paint look like paint is that the colour varies within
 * one family, the strokes have a direction, and their edges are irregular. All
 * three are built here rather than shipped as a bitmap: an image would cost
 * hundreds of kilobytes, band on wide screens and need a second copy for every
 * crop.
 *
 * Four layers, bottom to top:
 *
 *   1. A diagonal ramp through linen, sand and butter, with one restrained
 *      breath of terracotta, pushed around by stretched noise. The turbulence
 *      frequency is deliberately lopsided -- very low across, much higher down
 *      -- so the noise smears into streaks that read as the travel of a brush
 *      instead of as isotropic cloud.
 *   2. A second pass at a different seed and a gentler displacement, blended
 *      soft-light, which is what keeps the first pass from looking like one
 *      clever filter applied once.
 *   3. A washed band of cielo along the top edge, like sky or sea above a
 *      horizon, torn by the same brush filter so it does not read as a CSS
 *      gradient, and dissolving into the warm body.
 *   4. Light: one low golden sun from the upper right where the portrait
 *      stands, slightly bloomed (it is allowed to overexpose a little, the way
 *      film does), falling away to the calmer, lighter sand on the left where
 *      the headline sits. One source, like a painting.
 *
 * Contrast: the ground is light on purpose, so the copy is medianoche
 * (#0e627f). Behind the headline the lightest stop is #f6e7c8 (5.6:1) and the
 * darkest is #efd9b4 (5.0:1); the cielo band tops out at #b9d6ee (4.5:1) and
 * has faded to #d6e6f2 or lighter (5.3:1) by the time the copy starts. The
 * butter glow is held to the right half, so it never lands under the text.
 * Medianoche is a mid-tone, so it cannot be dimmed on this ground: even
 * medianoche/80 drops below 4:1, hence the paragraph is set at full strength.
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
            <stop offset="0" stopColor="#f6e7c8" />
            <stop offset="0.19" stopColor="#efd9b4" />
            <stop offset="0.38" stopColor="#f3e6cf" />
            <stop offset="0.57" stopColor="#f7f0e5" />
            <stop offset="0.74" stopColor="#f0d9b0" />
            <stop offset="0.88" stopColor="#f6e7c8" />
            <stop offset="1" stopColor="#efd5ab" />
          </linearGradient>

          {/* Warm accents only: butter and a touch of terracotta, at partial
              opacity, so they read as sun on stone rather than as colour. */}
          <linearGradient id="pb-strokes-2" x1="1" y1="0.1" x2="0" y2="0.95">
            <stop offset="0" stopColor="#fcc248" stopOpacity="0.55" />
            <stop offset="0.3" stopColor="#f3e6cf" stopOpacity="0.4" />
            <stop offset="0.55" stopColor="#f0a07f" stopOpacity="0.32" />
            <stop offset="0.8" stopColor="#efd9b4" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fcc248" stopOpacity="0.3" />
          </linearGradient>

          {/* Sky/sea: washed cielo along the top edge, gone by about a third
              of the way down. */}
          <linearGradient
            id="pb-sky"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="300"
          >
            <stop offset="0" stopColor="#b9d6ee" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#cfe2f1" stopOpacity="0.55" />
            <stop offset="1" stopColor="#cfe2f1" stopOpacity="0" />
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

          <radialGradient id="pb-light" cx="0.78" cy="0.3" r="0.55">
            <stop offset="0" stopColor="#fcc248" stopOpacity="0.62" />
            <stop offset="0.45" stopColor="#fcc248" stopOpacity="0.24" />
            <stop offset="1" stopColor="#fcc248" stopOpacity="0" />
          </radialGradient>

          {/* The bloom: a smaller, whiter core inside the glow, screened so it
              can only brighten. This is the "slightly overexposed" part. */}
          <radialGradient id="pb-bloom" cx="0.84" cy="0.2" r="0.3">
            <stop offset="0" stopColor="#fff3d6" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
          </radialGradient>
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

        <rect
          x="-260"
          y="-260"
          width="1720"
          height="560"
          fill="url(#pb-sky)"
          filter="url(#pb-brush-2)"
        />

        <rect width="1200" height="800" fill="url(#pb-light)" />
        <rect
          width="1200"
          height="800"
          fill="url(#pb-bloom)"
          style={{ mixBlendMode: "screen" }}
        />
      </svg>
    </div>
  );
}
