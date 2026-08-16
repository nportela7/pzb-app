export function ZereWordmark({
  className = "",
  tone = "deep",
}: {
  className?: string;
  tone?: "deep" | "cream";
}) {
  const color = tone === "deep" ? "text-zere-deep" : "text-cream";
  return (
    <span className={`inline-flex items-baseline gap-2 ${color} ${className}`}>
      <span className="font-serif italic">zere</span>
      <span className="font-sans font-medium uppercase tracking-[0.2em] text-[0.62em]">
        Studio
      </span>
    </span>
  );
}
