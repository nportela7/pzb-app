import Image from "next/image";
import { TESTIMONIALS } from "@/lib/testimonials";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

const WHATSAPP_HREF = whatsappHref(WHATSAPP_MESSAGES.coaching);

const FACTS = [
  { value: "6", label: "meses" },
  { value: "8", label: "sesiones de 90 min" },
];

/**
 * The three phases laid out over the six months they take. `sessions` are the
 * session numbers each phase covers, so the timeline and the copy can't drift
 * apart. `bar` is the phase colour; coral stays out of it on purpose, it is a
 * detail colour and only appears on the result dots below.
 */
const PHASES = [
  {
    title: "Descubrir y Explorar",
    sessions: [1, 2, 3],
    bar: "bg-cielo text-[#0b3d4f]",
    chip: "bg-white/55",
    body: "Ver con claridad dónde estás hoy, qué está funcionando y qué ya no termina de reflejarte. Se trabajan roles sostenidos por costumbre y narrativas que ya no encajan.",
    result: "Un mapa claro de qué conservar y qué soltar.",
  },
  {
    title: "Editar y Reescribir",
    sessions: [4, 5],
    bar: "bg-butter text-[#4a3205]",
    chip: "bg-white/55",
    body: "Editar lo que ya no encaja y reescribir la narrativa con la que apareces frente al mundo. Se ajusta el lenguaje interno, el discurso profesional y la manera de presentarse.",
    result: "Las decisiones pasan de venir de la exigencia a venir de la elección.",
  },
  {
    title: "Integrar y Sostener",
    sessions: [6, 7, 8],
    bar: "bg-medianoche text-arena",
    chip: "bg-white/20",
    body: "Integrar todo en una manera de estar y aparecer que se sostiene sola. Se cierra con las decisiones y siguientes pasos desde el nuevo lugar.",
    result: "La imagen corre en paralelo a quién estás siendo.",
  },
];

const CREDENCIALES = [
  { label: "Coaching", value: "iPEC · Escuela Domingo Delgado" },
  { label: "Académica", value: "Boston University · IE Business School" },
  { label: "Certificaciones", value: "Hogan · Kellogg · Constelaciones Familiares" },
];

const byId = (id: string) => TESTIMONIALS.find((t) => t.id === id);
const FEATURED = byId("andrea");
const SECONDARY = [byId("erika"), byId("antonia")];

/** Section label: the coral dot is the page's one recurring detail. */
function Eyebrow({
  children,
  className = "text-medianoche/85",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
      {children}
    </p>
  );
}

export default function CoachingPage() {
  return (
    <div className="flex-1 bg-arena">
      {/* Hero — Pilar on the right, dissolved into the deep blue so the copy on
          the left stays on a clean ground. The portrait is vertical, so it
          takes the right half instead of running edge to edge. It starts under
          the floating header (negative margin) rather than below it. */}
      <section className="relative -mt-20 overflow-hidden bg-[#0b4f66] text-arena sm:-mt-24">
        <div className="shell relative z-10 pb-10 pt-28 sm:pt-32 lg:pb-14 lg:pt-32">
          <div className="max-w-[31rem]">
            <Eyebrow className="text-arena/85">Coaching 1:1</Eyebrow>
            <h1 className="mb-5 mt-4 text-[2.9rem] font-medium leading-[0.96] text-balance sm:text-6xl lg:text-[4.6rem]">
              The Alignment <em className="font-normal">Partnership</em>
            </h1>
            <p className="max-w-[42ch] text-lg leading-relaxed text-arena/90">
              Seis meses trabajando identidad, imagen y decisiones como un solo
              proceso: se explora, se edita y se cierra con un plan que se
              sostiene solo.
            </p>

            <ul className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-arena/85">
              {FACTS.map((f) => (
                <li key={f.label}>
                  <b className="mr-1 font-serif text-2xl font-semibold text-arena">
                    {f.value}
                  </b>
                  {f.label}
                </li>
              ))}
              <li>WhatsApp L–V 10–19 h</li>
              <li>Confidencial</li>
            </ul>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center rounded-full bg-butter px-7 py-3.5 text-sm font-semibold tracking-wide text-[#17323c] transition-colors hover:bg-arena"
            >
              Agenda tu sesión diagnóstico
            </a>
          </div>
        </div>

        <div className="relative -mt-8 h-[26rem] sm:h-[30rem] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[56%]">
          <Image
            src="/images/pilar-coaching-hero.jpg"
            alt="Pilar Zambrano B. con su cuaderno y libros"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover object-[50%_0%] [mask-image:linear-gradient(180deg,transparent_0,#000_30%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0,#000_30%)] lg:[mask-image:linear-gradient(90deg,transparent_0,#000_42%)] lg:[-webkit-mask-image:linear-gradient(90deg,transparent_0,#000_42%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b4f66]/35 via-transparent via-[22%] to-[#0b4f66]/50 to-100%"
          />
        </div>
      </section>

      {/* El proceso — three phases laid over the six months they span. */}
      <section className="shell pb-16 pt-12 sm:pb-24 sm:pt-14">
        <Eyebrow>El proceso</Eyebrow>
        <h2 className="mt-3 text-4xl leading-[1.05] text-medianoche text-balance sm:text-5xl">
          Seis meses, tres fases, un resultado en cada una
        </h2>
        <p className="mt-4 leading-relaxed text-[#27495a]">
          La imagen no es una sesión aparte: corre en paralelo durante todo el
          trabajo.
        </p>

        <div className="mt-12">
          <div
            aria-hidden
            className="hidden grid-cols-6 text-[0.68rem] uppercase tracking-[0.16em] text-gris lg:grid"
          >
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <span key={m} className="border-l border-medianoche/25 pb-2.5 pl-2">
                Mes {m}
              </span>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-1.5">
            {PHASES.map((phase, i) => (
              <article key={phase.title}>
                <div
                  className={`flex h-[46px] items-center justify-between rounded-[10px] px-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${phase.bar}`}
                >
                  <span>Fase {i + 1}</span>
                  <span className="flex gap-1.5" aria-label={`Sesiones ${phase.sessions.join(", ")}`}>
                    {phase.sessions.map((n) => (
                      <i
                        key={n}
                        aria-hidden
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.66rem] not-italic tracking-normal ${phase.chip}`}
                      >
                        {n}
                      </i>
                    ))}
                  </span>
                </div>

                <div className="relative px-4 pt-6 lg:before:absolute lg:before:left-0 lg:before:top-0 lg:before:h-[22px] lg:before:w-px lg:before:bg-medianoche/35">
                  <h3 className="mb-2.5 text-3xl leading-[1.1] text-medianoche">
                    {phase.title}
                  </h3>
                  <p className="text-[0.97rem] leading-relaxed text-[#27495a]">
                    {phase.body}
                  </p>
                  <p className="mt-4 flex items-baseline gap-2.5 font-serif text-[1.15rem] italic leading-snug text-medianoche">
                    <span
                      aria-hidden
                      className="h-[7px] w-[7px] shrink-0 -translate-y-0.5 rounded-full bg-coral"
                    />
                    {phase.result}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[18px] bg-medianoche px-7 py-6 text-arena sm:flex-row sm:items-center">
          <div>
            <h3 className="text-2xl text-arena">Cada proceso se cotiza distinto</h3>
            <p className="mt-1 text-[0.95rem] text-arena/80">
              La inversión se define según lo que necesitas resolver.
            </p>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-arena px-7 py-3.5 text-sm font-semibold tracking-wide text-medianoche transition-colors hover:bg-cielo"
          >
            Cotizar mi proceso
          </a>
        </div>
      </section>

      {/* Client love */}
      <section className="bg-[#0b4f66] py-16 text-arena sm:py-24">
        <div className="shell">
          <p className="font-script text-5xl leading-none text-coral sm:text-6xl">
            Client love
          </p>
          <h2 className="mb-9 mt-3.5 max-w-[22ch] text-3xl text-arena text-balance sm:text-4xl">
            Lo que dicen las mujeres que ya hicieron el proceso
          </h2>

          <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
            {FEATURED && (
              <figure className="m-0 grid gap-6 rounded-[20px] border border-arena/15 bg-arena/[0.06] p-5 sm:grid-cols-[200px_1fr] sm:p-[22px] lg:row-span-2">
                {FEATURED.photoUrl && (
                  <div className="relative aspect-[16/11] overflow-hidden rounded-xl sm:aspect-[4/5]">
                    <Image
                      src={FEATURED.photoUrl}
                      alt={FEATURED.author ?? ""}
                      fill
                      sizes="(min-width: 640px) 200px, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <blockquote className="m-0 flex flex-col justify-between gap-5">
                  <p className="font-serif text-2xl italic leading-snug sm:text-[1.7rem]">
                    <span className="text-coral">&ldquo;</span>
                    {FEATURED.quote}
                    <span className="text-coral">&rdquo;</span>
                  </p>
                  <figcaption>
                    <b className="block font-serif text-lg font-semibold">
                      {FEATURED.author}
                    </b>
                    <span className="text-[0.7rem] uppercase tracking-[0.16em] text-arena/65">
                      {FEATURED.context}
                    </span>
                  </figcaption>
                </blockquote>
              </figure>
            )}

            {SECONDARY.map(
              (t) =>
                t && (
                  <figure
                    key={t.id}
                    className="m-0 grid grid-cols-[96px_1fr] items-start gap-4 rounded-[20px] border border-arena/15 bg-arena/[0.06] p-[18px]"
                  >
                    {t.photoUrl && (
                      <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                        <Image
                          src={t.photoUrl}
                          alt={t.author ?? ""}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <blockquote className="m-0 flex flex-col gap-3">
                      <p className="font-serif text-[1.1rem] italic leading-snug">
                        <span className="text-coral">&ldquo;</span>
                        {t.quote}
                        <span className="text-coral">&rdquo;</span>
                      </p>
                      <figcaption>
                        <b className="block font-serif text-lg font-semibold">
                          {t.author}
                        </b>
                        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-arena/65">
                          {t.context}
                        </span>
                      </figcaption>
                    </blockquote>
                  </figure>
                ),
            )}
          </div>
        </div>
      </section>

      {/* Quién te acompaña */}
      <section className="shell grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="relative aspect-[4/4.6] w-full max-w-[400px] overflow-hidden rounded-[999px_999px_14px_14px]">
          <Image
            src="/images/pilar-portrait-2.jpg"
            alt="Pilar Zambrano B."
            fill
            sizes="(min-width: 1024px) 400px, 80vw"
            className="object-cover"
          />
        </div>
        <div>
          <Eyebrow>Quién te acompaña</Eyebrow>
          <h2 className="my-4 text-4xl leading-[1.04] text-medianoche sm:text-5xl">
            Pilar Zambrano B.
          </h2>
          <p className="max-w-[54ch] leading-[1.7] text-[#27495a]">
            Emprendedora, inversionista y consejera. Se define como Strategic
            Life Editor: alguien que ayuda a sus clientas a editar su vida desde
            adentro hacia afuera, integrando identidad, imagen y decisiones.
          </p>
          <dl className="mt-7 grid border-t border-medianoche/20 sm:grid-cols-3">
            {CREDENCIALES.map((c) => (
              <div key={c.label} className="pb-1 pr-4 pt-4">
                <dt className="mb-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-gris">
                  {c.label}
                </dt>
                <dd className="font-serif text-lg font-medium leading-snug text-medianoche">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-butter py-14 text-[#17323c] sm:py-20">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-[13ch] text-5xl leading-none text-balance sm:text-6xl">
            ¿Lista para empezar?
          </h2>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#17323c] px-8 py-4 text-sm font-semibold tracking-wide text-butter transition-colors hover:bg-medianoche"
          >
            Escribir por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  );
}
