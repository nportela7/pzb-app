const PALETTE = [
  "bg-medianoche/15 text-medianoche",
  "bg-capuccino/15 text-capuccino",
  "bg-gris/15 text-gris",
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function paletteIndex(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return sum % PALETTE.length;
}

export function MemberAvatar({
  name,
  className = "",
  tone = "auto",
}: {
  name: string;
  className?: string;
  tone?: "auto" | "onDark";
}) {
  const colors =
    tone === "onDark" ? "bg-arena text-capuccino" : PALETTE[paletteIndex(name)];
  return (
    <div
      className={`flex items-center justify-center rounded-full font-serif text-lg shrink-0 ${colors} ${className}`}
    >
      {initials(name)}
    </div>
  );
}
