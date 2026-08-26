import Image from "next/image";
import Link from "next/link";

// A small hand-drawn pine sprig — dark-pine is a brand color by name,
// so this is the literal thing. Rotation is hashed from the name so
// it's deterministic (same card always looks the same) but varies
// across a row instead of repeating identically five times.
const SPRIG_ROTATIONS = [8, -12, 16, -6, 22, -18, 10];

function rotationFor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return SPRIG_ROTATIONS[sum % SPRIG_ROTATIONS.length];
}

function initials(name: string) {
  return name.trim()[0]?.toUpperCase() ?? "";
}

export function PortraitCard({
  name,
  profession,
  photoUrl,
  href,
}: {
  name: string;
  profession?: string;
  photoUrl?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="relative overflow-hidden min-w-0 flex flex-col items-start rounded-xl sm:rounded-2xl border border-earth-brown/20 bg-cream p-2.5 sm:p-4 transition-all hover:border-earth-brown/55 hover:-translate-y-1"
    >
      <span
        aria-hidden
        className="absolute -bottom-2 -right-3 w-20 h-20 sm:w-24 sm:h-24 text-dark-pine opacity-[0.16] pointer-events-none"
        style={{ transform: `rotate(${rotationFor(name)}deg)` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M50 96 C 50 72 50 48 50 6" />
            <path d="M50 22 L30 11" />
            <path d="M50 22 L71 8" />
            <path d="M50 40 L27 31" />
            <path d="M50 40 L75 33" />
            <path d="M50 58 L29 51" />
            <path d="M50 58 L73 53" />
            <path d="M50 76 L32 71" />
            <path d="M50 76 L70 73" />
          </g>
        </svg>
      </span>

      {photoUrl ? (
        <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden mb-2 sm:mb-2.5 shrink-0">
          <Image src={photoUrl} alt="" fill sizes="44px" className="object-cover" />
        </div>
      ) : (
        <span className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-serif italic text-sm sm:text-base text-cream bg-earth-brown mb-2 sm:mb-2.5 shrink-0">
          {initials(name)}
        </span>
      )}

      <p className="relative font-serif text-sm sm:text-base text-charcoal leading-tight truncate w-full">
        {name}
      </p>
      {profession && (
        <p className="relative text-[0.62rem] sm:text-xs text-slate mt-0.5 truncate w-full">
          {profession}
        </p>
      )}
    </Link>
  );
}
