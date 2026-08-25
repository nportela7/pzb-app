import Image from "next/image";
import Link from "next/link";

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

  return (
    <Link href={href} className="flex-none w-[9.5rem]">
      <div
        className="relative aspect-[3/4] rounded-2xl bg-beige-sand overflow-hidden flex items-end p-3"
        style={{ boxShadow: "-8px 10px 18px -4px rgba(89, 68, 52, 0.38)" }}
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt=""
            fill
            sizes="152px"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="absolute -top-2 left-1 font-serif italic text-8xl leading-none text-transparent select-none"
            style={{ WebkitTextStroke: "1.3px rgba(89,68,52,0.4)" }}
          >
            {initial}
          </span>
        )}
      </div>
      <p
        className={`font-serif text-base mt-2 leading-tight ${tone === "onDark" ? "text-cream" : "text-charcoal"}`}
      >
        {name}
      </p>
      {profession && (
        <p
          className={`text-xs mt-0.5 ${tone === "onDark" ? "text-cream/60" : "text-slate"}`}
        >
          {profession}
        </p>
      )}
    </Link>
  );
}
