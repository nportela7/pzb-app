const PALETTE = [
  "bg-earth-brown/15 text-earth-brown",
  "bg-dark-pine/15 text-dark-pine",
  "bg-slate/15 text-slate",
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
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full font-serif text-lg shrink-0 ${PALETTE[paletteIndex(name)]} ${className}`}
    >
      {initials(name)}
    </div>
  );
}
