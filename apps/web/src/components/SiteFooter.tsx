import Link from "next/link";
import { INSTAGRAM_URL, WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

const EXPLORAR = [
  { href: "/coaching", label: "Coaching 1:1" },
  { href: "/zere-studio", label: "Zere Studio" },
];

const COMUNIDAD = [
  { href: "/eventos", label: "Eventos" },
  { href: "/sobre-pilar", label: "Sobre Pilar" },
  { href: "/home", label: "Entrar a la comunidad" },
];

/**
 * `tone="arena"` is for the landing: a light footer with soft patches of
 * light (cielo and a trace of butter), set apart from the cielo CTA above it
 * by its own ground. Every other page keeps the plain medianoche footer.
 */
export function SiteFooter({ tone = "medianoche" }: { tone?: "medianoche" | "arena" }) {
  const cielo = tone === "arena";
  const ink = cielo ? "text-medianoche" : "text-arena";
  const inkSoft = cielo ? "text-medianoche/80" : "text-arena/70";
  const label = cielo ? "text-medianoche/70" : "text-arena/60";
  const hover = cielo ? "hover:text-medianoche" : "hover:text-arena";
  return (
    <footer
      className={
        cielo
          ? "relative isolate bg-arena text-medianoche/80"
          : "bg-medianoche text-arena/65"
      }
    >
      {cielo && <span aria-hidden className="tx tx-blobs" />}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <span className={`font-script text-3xl ${ink}`}>PZB.</span>
          <p className={`mt-4 max-w-xs leading-relaxed ${inkSoft}`}>
            Coaching de identidad, imagen y decisiones. Y experiencias con
            intención para empresas.
          </p>
          <a
            href={whatsappHref(WHATSAPP_MESSAGES.diagnostico)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-butter px-6 py-3 text-sm font-semibold text-medianoche transition-colors hover:bg-arena"
          >
            Agenda tu sesión diagnóstico
            <span aria-hidden>→</span>
          </a>
        </div>

        <div>
          <p className={`text-[0.68rem] uppercase tracking-[0.22em] ${label}`}>
            Explorar
          </p>
          <nav className="mt-5 flex flex-col gap-3 text-sm">
            {EXPLORAR.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${hover}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className={`text-[0.68rem] uppercase tracking-[0.22em] ${label}`}>
            Comunidad
          </p>
          <nav className="mt-5 flex flex-col gap-3 text-sm">
            {COMUNIDAD.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${hover}`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${hover}`}
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>

      <div
        className={`mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 sm:px-10 py-6 text-xs sm:flex-row ${
          cielo
            ? "border-t border-medianoche/15 text-medianoche/75"
            : "border-t border-arena/12"
        }`}
      >
        <span>© {new Date().getFullYear()} Pilar Zambrano B.</span>
        <span className={cielo ? "text-medianoche/65" : "text-arena/60"}>
          Ciudad de México · Strategic Life Editor
        </span>
      </div>
    </footer>
  );
}
