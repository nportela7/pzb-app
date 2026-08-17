export function ZereMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="8" r="2" fill="currentColor" />
      <path
        d="M4 26c4 0 4-10 10-10s6 10 12 10 6-10 12-10 8 8 12 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="54" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}
