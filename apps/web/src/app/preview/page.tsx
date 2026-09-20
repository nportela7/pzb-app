import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pilar Zambrano B. — Preview",
  robots: { index: false, follow: false },
};

const WHATSAPP_HREF =
  "https://wa.me/525574141480?text=" +
  encodeURIComponent("Hola Pilar, quiero agendar una llamada.");

const CREDENTIALS = [
  "Premio Mujeres en las Artes 2024",
  "Fundadora de UMA",
  "iPEC Certified Coach",
  "Boston University · IE Business School",
];

const PHASES = [
  { number: "01", title: "Descubrir", body: "Claridad de dónde estás hoy." },
  { number: "02", title: "Editar", body: "Reescribes tu narrativa." },
  { number: "03", title: "Integrar", body: "Se sostiene sola, sin esfuerzo." },
];

export default function PreviewLandingPage() {
  const ticker = Array(6).fill(CREDENTIALS).flat();

  return (
    <div className="flex-1 bg-cream">
      {/* NAV */}
      <header className="flex items-center justify-between px-6 sm:px-10 pt-9 pb-6">
        <span className="font-script text-3xl text-earth-brown">PZB.</span>
        <nav className="hidden sm:flex items-center gap-9 text-sm text-charcoal/65">
          <span>Coaching</span>
          <span>Zere Studio</span>
          <span>Eventos</span>
          <span>Sobre Pilar</span>
        </nav>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-6 py-2.5 bg-earth-brown text-cream text-sm font-medium hover:bg-charcoal transition-colors"
        >
          Agenda tu llamada
        </a>
      </header>

      {/* HERO — full bleed photo, minimal copy, big */}
      <section className="relative min-h-[94vh] flex flex-col text-cream overflow-hidden">
        <Image
          src="/images/horses-beach-sunset.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/35 via-charcoal/35 to-charcoal/85" />

        <div className="relative flex-1 flex flex-col justify-center px-6 sm:px-10 pt-16 pb-12 max-w-3xl">
          <p className="text-xs tracking-[0.28em] uppercase text-beige-sand mb-8">
            11 años acompañando decisiones
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[0.98] font-light text-balance">
            Deja de vivir
            <br />
            <span className="italic font-normal text-beige-sand">
              una vida editada
            </span>
            <br />
            por otros.
          </h1>
          <div className="flex gap-4 flex-wrap mt-12">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 bg-cream text-earth-brown text-sm font-semibold hover:bg-beige-sand hover:-translate-y-0.5 transition-all"
            >
              Empieza tu proceso <span aria-hidden>→</span>
            </a>
            <a
              href="#metodo"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 border border-cream/40 text-cream text-sm font-semibold hover:bg-cream/10 transition-colors"
            >
              Ver el método
            </a>
          </div>
        </div>

        <div className="relative border-t border-cream/20">
          <div className="grid grid-cols-3 px-6 sm:px-10 py-9 max-w-4xl">
            <div>
              <p className="font-serif text-4xl">11</p>
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-cream/60 mt-1.5">
                Años de trayectoria
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl">275+</p>
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-cream/60 mt-1.5">
                Mujeres en la red
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl">3</p>
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-cream/60 mt-1.5">
                Fases, un método
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* proof ticker */}
      <div className="bg-earth-brown overflow-hidden whitespace-nowrap py-4">
        <div className="inline-flex marquee-track" style={{ animationDuration: "40s" }}>
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className="text-[0.7rem] tracking-[0.16em] uppercase text-cream/75 px-9"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* SOBRE PILAR — about hero with floating credibility card */}
      <section className="px-6 sm:px-10 pt-20 sm:pt-28 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-slate mb-6">
              Sobre Pilar
            </p>
            <h2 className="text-4xl sm:text-5xl leading-tight text-earth-brown font-light mb-8 text-balance">
              La editora estratégica
              <br />
              <span className="italic font-normal">detrás del método.</span>
            </h2>
            <p className="text-lg text-charcoal/75 leading-relaxed max-w-md">
              Emprendedora, inversionista y consejera. Ayuda a sus clientas a
              editar su vida desde adentro hacia afuera, integrando
              identidad, imagen y decisiones.
            </p>
            <a
              href="/sobre-pilar"
              className="inline-block mt-8 text-sm font-medium text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
            >
              Conocer su historia →
            </a>
          </div>

          <div className="relative aspect-[4/5] rounded-md overflow-hidden shadow-[0_30px_60px_-24px_rgba(89,68,52,0.4)]">
            <Image
              src="/images/pilar-portrait.jpg"
              alt="Pilar Zambrano B."
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute left-5 right-5 bottom-5 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-[15rem] bg-cream/95 rounded-md p-5 shadow-[0_20px_40px_-16px_rgba(36,31,26,0.5)]">
              <p className="text-[0.62rem] tracking-[0.2em] uppercase text-slate mb-2">
                Premio Mujeres en las Artes
              </p>
              <p className="font-serif italic text-lg text-earth-brown leading-snug">
                &ldquo;Impulsando el bienestar y la conexión entre mujeres en
                México.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES — several photos, Brendon-Burchard-about-page style breakdown */}
      <section className="px-6 sm:px-10 pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto flex flex-col gap-16 sm:gap-24">
          <RoleRow
            index="01"
            role="Fundadora"
            title="Construyó una comunidad antes de construir un método."
            body="Fundó UMA, una comunidad de mujeres líderes que dirigió casi cuatro años. Hoy esa comunidad vive a través de Life Notes, una red de 275 mujeres."
            image="/images/pilar-portrait.jpg"
            imageAlt="Pilar Zambrano B."
            reverse={false}
          />
          <RoleRow
            index="02"
            role="Coach"
            title="Once años acompañando decisiones, no dictándolas."
            body="Certificada por iPEC, acompaña a sus clientas con un método propio: descubrir, editar e integrar, sin perder nunca su voz en el proceso."
            image="/images/pilar-event.jpg"
            imageAlt="Pilar Zambrano B. en un evento en vivo"
            reverse={true}
          />
        </div>
      </section>

      {/* THE METHOD — bigger, more air */}
      <section id="metodo" className="px-6 sm:px-10 py-20 sm:py-28 bg-beige-sand/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.28em] uppercase text-slate mb-5">
            El método
          </p>
          <h2 className="text-5xl sm:text-6xl text-earth-brown font-light mb-16 max-w-xl text-balance">
            The Alignment <span className="italic font-normal">Partnership.</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {PHASES.map((phase) => (
              <div key={phase.number}>
                <span
                  className="font-serif italic text-5xl text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(89,68,52,.55)" }}
                >
                  {phase.number}
                </span>
                <h3 className="text-2xl text-earth-brown font-normal mt-5 mb-3">
                  {phase.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed max-w-[22ch]">
                  {phase.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTOS — Tony Robbins style, big photo cards */}
      <section className="px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-14">
            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-slate mb-5">
                Vive la comunidad en persona
              </p>
              <h2 className="text-4xl sm:text-5xl text-earth-brown font-light">
                Próximos eventos
              </h2>
            </div>
            <a
              href="/eventos"
              className="text-sm font-medium text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors whitespace-nowrap"
            >
              Ver calendario completo →
            </a>
          </div>

          <div className="grid sm:grid-cols-[1.4fr_1fr] gap-5 mb-5">
            <EventCard
              image="/images/pilar-event.jpg"
              aspect="aspect-[16/10]"
              day="14"
              month="Nov"
              eyebrow="Cena corporativa"
              title="Una mesa bien elegida lo cambia todo"
              meta="Ciudad de México · Cupo limitado a 20 personas"
              titleSize="text-3xl"
            />
            <EventCard
              image="/images/horse-field-portrait.jpg"
              aspect="aspect-[4/5]"
              day="02"
              month="Dic"
              eyebrow="Retiro"
              title="Pausar, ordenar, reconectar"
              meta="Valle de Bravo · Fin de semana"
              titleSize="text-2xl"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <EventCard
              image="/images/horses-dust-sunset.jpg"
              aspect="aspect-video"
              day="21"
              month="Ene"
              eyebrow="Taller"
              title="Destrabar para activar"
              meta="Equipos y liderazgo · Zere Studio"
              titleSize="text-2xl"
            />
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-md overflow-hidden bg-earth-brown text-cream flex flex-col justify-center items-start p-10 aspect-video"
            >
              <p className="text-xs tracking-[0.28em] uppercase text-beige-sand mb-3">
                Sesiones abiertas
              </p>
              <h3 className="text-2xl font-normal mb-3 max-w-[16ch]">
                Un espacio mensual, sin costo
              </h3>
              <span className="text-sm font-medium border-b border-cream pb-0.5">
                Reservar lugar →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* BIG TESTIMONIAL */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-20 sm:py-28 bg-dark-pine text-cream">
        <span
          aria-hidden
          className="absolute -top-8 left-8 font-serif italic text-[14rem] leading-none text-cream/[0.06] select-none"
        >
          &ldquo;
        </span>
        <div className="relative max-w-4xl mx-auto">
          <p className="font-serif italic text-3xl sm:text-4xl leading-snug">
            Pasé de sentir que la vida me pasaba, a sentir que yo decido cada
            cosa que hago.
          </p>
          <div className="flex items-center gap-4 mt-11">
            <span className="w-0.5 h-9 bg-beige-sand" />
            <div>
              <p className="font-medium text-sm">Miembro de la comunidad</p>
              <p className="text-sm text-cream/55">Ciudad de México</p>
            </div>
          </div>
        </div>
      </section>

      {/* ZERE STUDIO — bigger, visual */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 bg-zere-sky">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-zere-deep/70 mb-6">
              Para empresas y equipos
            </p>
            <h2 className="flex items-baseline gap-2 text-5xl text-zere-deep font-light mb-6">
              zere
              <span className="font-sans not-italic font-semibold text-[0.32em] tracking-[0.18em] uppercase">
                Studio
              </span>
            </h2>
            <p className="text-lg text-zere-ink/85 leading-relaxed max-w-md mb-8">
              Talleres, cenas, retiros y experiencias con intención — para
              equipos que buscan crear momentos memorables con propósito.
            </p>
            <a
              href="/zere-studio"
              className="text-sm font-medium text-zere-deep border-b border-zere-deep/50 hover:border-zere-deep transition-colors"
            >
              Descubrir Zere Studio →
            </a>
          </div>
          <div className="relative aspect-[4/5] rounded-md overflow-hidden">
            <Image
              src="/images/horse-field-portrait.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA — full bleed photo */}
      <section className="relative py-24 sm:py-36 text-center text-cream overflow-hidden">
        <Image
          src="/images/horses-dust-sunset.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2 className="text-5xl sm:text-6xl leading-tight font-light text-balance">
            Tu vida no se va a{" "}
            <span className="italic font-normal text-beige-sand">
              editar sola.
            </span>
          </h2>
          <p className="text-lg text-cream/80 mt-7 mb-11">
            Agenda una llamada de 20 minutos con el equipo de Pilar.
          </p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-9 py-4 bg-cream text-charcoal text-base font-semibold hover:bg-beige-sand transition-colors"
          >
            Agenda tu llamada →
          </a>
        </div>
      </section>

      <footer className="px-6 sm:px-10 py-10 text-center text-xs text-cream/50 bg-charcoal">
        © {new Date().getFullYear()} Pilar Zambrano B. — Propuesta comercial /preview
      </footer>
    </div>
  );
}

function RoleRow({
  index,
  role,
  title,
  body,
  image,
  imageAlt,
  reverse,
}: {
  index: string;
  role: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
}) {
  return (
    <div
      className={`grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-center ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative aspect-[4/3] rounded-md overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 35vw, 90vw"
          className="object-cover"
        />
      </div>
      <div>
        <span
          className="font-serif italic text-3xl text-transparent"
          style={{ WebkitTextStroke: "1px rgba(89,68,52,.5)" }}
        >
          {index}
        </span>
        <p className="text-xs tracking-[0.24em] uppercase text-slate mt-3 mb-3">
          {role}
        </p>
        <h3 className="text-2xl sm:text-3xl text-earth-brown font-normal leading-snug mb-4 text-balance">
          {title}
        </h3>
        <p className="text-charcoal/70 leading-relaxed max-w-md">{body}</p>
      </div>
    </div>
  );
}

function EventCard({
  image,
  aspect,
  day,
  month,
  eyebrow,
  title,
  meta,
  titleSize,
}: {
  image: string;
  aspect: string;
  day: string;
  month: string;
  eyebrow: string;
  title: string;
  meta: string;
  titleSize: string;
}) {
  return (
    <a
      href="#"
      className={`group relative rounded-md overflow-hidden flex flex-col justify-end text-cream ${aspect}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/5 via-charcoal/40 to-charcoal/90" />
      <div className="relative p-7 sm:p-8">
        <span className="inline-flex flex-col items-center justify-center bg-cream text-earth-brown rounded px-3.5 py-2 leading-none mb-5">
          <span className="text-lg font-bold">{day}</span>
          <span className="text-[0.6rem] uppercase tracking-[0.1em]">{month}</span>
        </span>
        <p className="text-xs tracking-[0.24em] uppercase text-beige-sand mb-2">
          {eyebrow}
        </p>
        <h3 className={`${titleSize} font-normal leading-snug`}>{title}</h3>
        <p className="text-sm text-cream/75 mt-2.5">{meta}</p>
      </div>
    </a>
  );
}
