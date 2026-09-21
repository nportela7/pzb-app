import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A paged scroll-snap track: one slide fills the track, so "which slide are
 * we on" is simply how many track-widths in we have scrolled. The browser
 * does the snapping; this only reads the position back out and drives the
 * buttons and dots.
 *
 * Shared by EventBannerCarousel and PortraitGallery, which had byte-identical
 * copies of it. TestimonialCarousel deliberately does NOT use this: that track
 * shows several cards at once and steps by card width, so it has no notion of
 * an active slide at all. Same shape, different knowledge -- and it is the
 * knowledge that gets shared, not the shape.
 */
export function useSnapCarousel(count: number) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  function readScroll() {
    const el = trackRef.current;
    // A hidden or unmeasured track reports 0, and dividing by it yields NaN.
    if (!el || el.clientWidth === 0) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  /**
   * Wraps instead of stopping: past the last slide you land on the first, and
   * before the first you land on the last. The remainder is written the long
   * way because JS keeps the sign of the dividend -- `-1 % 3` is `-1`, not
   * `2`, which would scroll to a negative offset and silently clamp to 0.
   */
  function goTo(index: number) {
    const el = trackRef.current;
    if (!el || count === 0) return;
    const wrapped = ((index % count) + count) % count;
    el.scrollTo({
      left: wrapped * el.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return { trackRef, active, readScroll, goTo };
}
