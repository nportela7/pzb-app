import Image from "next/image";
import Link from "next/link";
import { splitName } from "@/lib/name";

export function MonogramCard({
  name,
  profession,
  photoUrl,
  href,
  tone = "onCream",
}: {
  name: string;
  profession?: string;
  photoUrl?: string;
  href: string;
  tone?: "onCream" | "onDark";
}) {
  const initial = name.trim()[0]?.toUpperCase() ?? "";
  const { first, last } = splitName(name);

  return (
    <Link href={href} className="min-w-0">
      <div
        className="relative aspect-[3/4] rounded-xl sm:rounded-2xl bg-beige-sand overflow-hidden flex items-end p-1.5 sm:p-3"
        style={{ boxShadow: "-6px 8px 14px -4px rgba(89, 68, 52, 0.38)" }}
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt=""
            fill
            sizes="(min-width: 640px) 152px, 20vw"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="absolute -top-1 sm:-top-2 left-0.5 sm:left-1 font-serif italic text-5xl sm:text-8xl leading-none text-transparent select-none"
            style={{ WebkitTextStroke: "1.3px rgba(89,68,52,0.4)" }}
          >
            {initial}
          </span>
        )}
      </div>
      <p
        className={`font-serif text-sm sm:text-base mt-1.5 sm:mt-2 leading-tight truncate ${tone === "onDark" ? "text-cream" : "text-charcoal"}`}
      >
        {first}
      </p>
      {last && (
        <p
          className={`font-serif text-sm sm:text-base leading-tight truncate ${tone === "onDark" ? "text-cream" : "text-charcoal"}`}
        >
          {last}
        </p>
      )}
      {profession && (
        <p
          className={`text-[0.65rem] sm:text-xs mt-0.5 truncate ${tone === "onDark" ? "text-cream/60" : "text-slate"}`}
        >
          {profession}
        </p>
      )}
    </Link>
  );
}
