import Image from "next/image";

/**
 * Pilar's hero portrait, framed as an oval standing mirror instead of a
 * cropped rectangle: a metallic bevel ring, a diagonal glass glare and an
 * inner vignette are what sell "mirror" rather than "photo in an oval mask."
 */
export function MirrorPortrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[3/4.6] ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-3.5 rounded-full"
        style={{
          background:
            "linear-gradient(155deg, #efe6d3 0%, #cdbd9b 28%, #8d7a57 50%, #cdbd9b 72%, #efe6d3 100%)",
          boxShadow:
            "0 30px 55px -20px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.25)",
        }}
      />

      <div className="absolute inset-0 rounded-full overflow-hidden shadow-[inset_0_0_0_2px_rgba(0,0,0,0.25)]">
        <Image
          src="/images/pilar-mirror.jpg"
          alt="Pilar Zambrano B."
          fill
          priority
          sizes="(min-width: 1024px) 28vw, 70vw"
          className="object-cover"
          style={{
            objectPosition: "50% 2%",
            transform: "scale(2.1)",
            transformOrigin: "50% 6%",
          }}
        />

        {/* Vignette — curves the edges like glass rather than a flat cutout */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 42%, transparent 55%, rgba(20,20,18,.42) 100%)",
          }}
        />

        {/* Diagonal glare sweeping the glass */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-screen opacity-55"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.12) 8%, transparent 20%, transparent 78%, rgba(255,255,255,.08) 90%, rgba(255,255,255,.35) 100%)",
          }}
        />

        {/* Specular highlight blob, upper-left — where a real curved mirror catches the light */}
        <div
          aria-hidden
          className="absolute top-[4%] left-[12%] w-[30%] h-[46%] rounded-full opacity-50 -rotate-[18deg] blur-[2px]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,.65), transparent 70%)",
          }}
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 40px 18px rgba(20,16,10,.35)" }}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: "inset 0 2px 1px rgba(255,255,255,.5), inset 0 -3px 6px rgba(0,0,0,.3)",
        }}
      />
    </div>
  );
}
