import Image from "next/image";
import { Grain } from "@/components/Grain";
import { getInstagramFeed } from "@/lib/instagram";
import { InstagramTicker } from "@/components/InstagramTicker";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

const WHATSAPP_HREF = whatsappHref(WHATSAPP_MESSAGES.general);

/**
 * ── PARA EDITAR ───────────────────────────────────────────────────────
 * Reconocimientos: se renderizan en orden. Agregá o sacá entradas acá.
 */
const CREDENTIALS = [
  { label: "Fundó", value: "UMA" },
  { label: "Hoy", value: "PZB." },
  { label: "2024", value: "Premio Mujeres en las Artes" },
];

/**
 * Testimonio en video. Mientras sea null el bloque NO se renderiza y los
 * reconocimientos ocupan el ancho completo — misma regla que PROOF_POINTS
 * en src/lib/proof.ts: un hueco vacío resta más de lo que suma.
 *
 * Para activarlo: poné el archivo en public/, y acá
 *   { src: "/videos/testimonio.mp4", poster: "/images/...jpg",
 *     name: "Nombre Apellido", role: "Clienta, 2025" }
 */
const ABOUT_VIDEO: {
  src: string;
  poster: string;
  name: string;
  role: string;
} | null = null;

const TIMELINE = [
  { place: "Monterrey", tag: "Origen" },
  { place: "Boston & Madrid", tag: "Formación" },
  { place: "Ciudad de México", tag: "Hoy · 11 años" },
];

export default async function SobrePilarPage() {
  const posts = await getInstagramFeed();

  return (
    <div className="flex-1 bg-cream">
      {/* Presentación — retrato grande sobre bloque de marca, texto al lado,
          y debajo la prueba social. El bloque de video sólo aparece cuando
          ABOUT_VIDEO deja de ser null. */}
      <section className="px-6 sm:px-10 pt-8 pb-6 max-w-6xl mx-auto">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          {/* Retrato sobre earth-brown, con grano: el equivalente nuestro al
              bloque de color plano, sin salirnos del lenguaje editorial. */}
          <div className="relative overflow-hidden rounded-3xl bg-earth-brown">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[5/4]">
              <Image
                src="/images/pilar-portrait.jpg"
                alt="Pilar Zambrano B."
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-earth-brown mix-blend-multiply opacity-[0.18]"
              />
            </div>
            <Grain opacity={0.07} />
          </div>

          <div className="flex flex-col justify-center rounded-3xl bg-beige-sand/45 p-8 sm:p-10">
            <h1 className="font-serif text-4xl leading-[1.02] text-earth-brown sm:text-5xl">
              Pilar
              <br />
              Zambrano B.
            </h1>
            <p className="mt-2 font-script text-2xl text-charcoal/55">
              Strategic Life Editor
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-charcoal/80">
              Emprendedora, inversionista y consejera. Ayuda a sus clientas a
              editar su vida desde adentro hacia afuera, integrando identidad,
              imagen y decisiones.
            </p>
            <p className="mt-6 border-l-2 border-earth-brown pl-4 font-serif text-sm font-light italic leading-relaxed text-earth-brown/85">
              &ldquo;La vida se vive, no se mide.&rdquo;
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-earth-brown px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-charcoal"
            >
              Escribir por WhatsApp
              <span aria-hidden>&rarr;</span>
            </a>
          </div>

          {/* Fila de abajo: reconocimientos y, cuando exista, el video. */}
          <div className="flex flex-col justify-center rounded-3xl border border-earth-brown/20 p-8 sm:p-10">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-charcoal/70">
              Reconocimientos
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-6">
              {CREDENTIALS.map((item) => (
                <div key={item.label}>
                  <dt className="mb-1 text-[0.65rem] uppercase tracking-[0.14em] text-slate">
                    {item.label}
                  </dt>
                  <dd className="font-serif text-lg text-earth-brown text-balance">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {ABOUT_VIDEO && (
            <div className="relative overflow-hidden rounded-3xl bg-charcoal">
              <video
                src={ABOUT_VIDEO.src}
                poster={ABOUT_VIDEO.poster}
                controls
                playsInline
                preload="none"
                className="aspect-video h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute bottom-5 left-6">
                <p className="font-serif text-lg text-cream">
                  {ABOUT_VIDEO.name}
                </p>
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/70">
                  {ABOUT_VIDEO.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 sm:px-10 py-16 max-w-2xl mx-auto">
        <p className="text-charcoal/80 leading-relaxed mb-5">
          Creció en Monterrey, estudió en Boston y Madrid, y lleva 11 años en
          Ciudad de México. Fundó UMA, una comunidad de mujeres líderes que
          dirigió casi cuatro años. En 2024 recibió el Premio Mujeres en las
          Artes por impulsar el bienestar y la conexión entre mujeres en
          México. Hoy esa comunidad vive a través de Life Notes, una red de
          275 mujeres.
        </p>
        <p className="text-charcoal/80 leading-relaxed mb-10">
          Ha invertido como ángel en marcas de wellness y participa en
          diversos consejos directivos. Su ancla personal son los caballos;
          su creencia de trabajo: verse bien y sentirse bien van de la mano.
        </p>

        <div className="relative max-w-sm mx-auto">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-1 h-px bg-earth-brown/20"
          />
          <div className="relative grid grid-cols-3 gap-2">
            {TIMELINE.map((stop) => (
              <div key={stop.place} className="flex flex-col items-center text-center">
                <span
                  aria-hidden
                  className="w-2 h-2 rounded-full bg-earth-brown mb-3"
                />
                <p className="font-serif text-base sm:text-lg text-earth-brown leading-none">
                  {stop.place}
                </p>
                <p className="text-[0.62rem] tracking-[0.16em] uppercase text-slate mt-1.5">
                  {stop.tag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl text-earth-brown mb-8">
          Formación y credenciales
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-sm max-w-xl">
          <div>
            <dt className="text-slate mb-1">Coaching</dt>
            <dd className="text-charcoal">iPEC · Escuela Domingo Delgado</dd>
          </div>
          <div>
            <dt className="text-slate mb-1">Académica</dt>
            <dd className="text-charcoal">Boston University · IE Business School</dd>
          </div>
          <div>
            <dt className="text-slate mb-1">Certificaciones</dt>
            <dd className="text-charcoal">Hogan · Kellogg · Constelaciones Familiares</dd>
          </div>
          <div>
            <dt className="text-slate mb-1">Reconocimiento</dt>
            <dd className="text-charcoal">Premio Mujeres en las Artes, 2024</dd>
          </div>
        </dl>
      </section>

      {posts.length > 0 && (
        <section className="pb-16">
          <p className="text-center text-[0.65rem] tracking-[0.2em] uppercase text-slate mb-5">
            Últimas publicaciones · @by.pilarzambranob
          </p>
          <InstagramTicker posts={posts} />
        </section>
      )}

      <section className="px-6 sm:px-10 pb-20">
        <div className="max-w-3xl mx-auto rounded-2xl bg-dark-pine text-cream px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl mb-1">¿Quieres conocerla mejor?</h3>
            <p className="text-cream/80 text-sm">
              Síguela en Instagram o escríbele directo.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/by.pilarzambranob/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream/90 hover:text-cream transition-colors whitespace-nowrap"
            >
              @by.pilarzambranob
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cream text-dark-pine px-6 py-3 text-sm font-medium whitespace-nowrap hover:bg-beige-sand transition-colors"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
