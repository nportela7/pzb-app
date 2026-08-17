export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 640"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M70 10 C 20 90, 95 170, 45 260 C 5 340, 90 400, 55 480 C 25 545, 85 580, 50 630"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
