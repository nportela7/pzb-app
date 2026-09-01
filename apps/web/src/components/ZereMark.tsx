// A hand-drawn approximation of Zere Studio's calligraphic "Z"
// isotipo from the brand deck — not the real vector file, which
// would need to be supplied to get this pixel-exact.
export function ZereMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 8 C8 6 7 15 19 13 C31 11 44 9 52 13 C42 21 22 33 14 42 C24 39 41 38 50 41 C57 43 57 50 48 49"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
