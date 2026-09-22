"use client";

import { Show, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ZereMark } from "@/components/ZereMark";
import { Grain } from "@/components/Grain";
import { PaintedBackdrop } from "@/components/PaintedBackdrop";
import { HeroPortrait } from "@/components/HeroPortrait";
import { ScrollProgressRail } from "@/components/ScrollProgressRail";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PUBLIC_NAV } from "@/lib/nav";
import { INSTAGRAM_URL, WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { EventBannerCarousel } from "@/components/EventBannerCarousel";
import { AnnotatedStatement } from "@/components/AnnotatedStatement";
import { PortraitGallery, type PortraitSlide } from "@/components/PortraitGallery";
import type { EventBanner } from "@/lib/event-banner";
import { TESTIMONIALS } from "@/lib/testimonials";
import { VISIBLE_PROOF_POINTS } from "@/lib/proof";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/**
 * The hero's authored moment: each line lifts out from behind its own
 * baseline while the blur resolves, so the headline settles instead of
 * simply appearing. Used once, on the first thing a visitor reads.
 */
const lineReveal = {
  hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
  show: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE },
  },
};

/** Same beat, no travel and no blur, for visitors who asked for less motion. */
const lineRevealReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-charcoal/75">
      <span className="w-8 h-px bg-slate" />
      {children}
    </p>
  );
}

function Ticker({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "cream" | "zere";
}) {
  const bg =
    tone === "dark"
      ? "bg-dark-pine"
      : tone === "zere"
        ? "bg-cream/90"
        : "bg-cream/10";
  const text =
    tone === "dark"
      ? "text-cream/85"
      : tone === "zere"
        ? "text-zere-deep"
        : "text-cream/70";
  const dot =
    tone === "dark"
      ? "after:text-cream/35"
      : tone === "zere"
        ? "after:text-zere-deep/40"
        : "after:text-cream/25";
  // Repeated well past what any real screen width needs, so the
  // "-50%" loop point never lands on a visible gap between words.
  const filled = Array(8).fill(items).flat();
  return (
    <div className={`overflow-hidden py-2.5 whitespace-nowrap ${bg}`}>
      <div className="inline-flex marquee-track" style={{ animationDuration: "208s" }}>
        {[...filled, ...filled].map((item, i) => (
          <span
            key={i}
            className={`text-[0.68rem] tracking-[0.24em] uppercase px-6 flex items-center gap-6 after:content-['·'] ${text} ${dot}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const DIAGNOSTICO_HREF = whatsappHref(WHATSAPP_MESSAGES.diagnostico);
const EMPRESAS_HREF = whatsappHref(WHATSAPP_MESSAGES.empresas);
const ADDONS_HREF = whatsappHref(WHATSAPP_MESSAGES.addOns);

/** Real formation and recognition — the authority strip under the hero. */
const CREDENCIALES = [
  "Coaching iPEC",
  "Boston University",
  "IE Business School",
  "Hogan Assessments",
  "Kellogg",
  "Escuela Domingo Delgado",
  "Constelaciones Familiares",
  "Premio Mujeres en las Artes 2024",
];

/**
 * The three ways in. A visitor should recognise herself in one of them
 * within a few seconds and take that door, instead of scrolling the whole
 * catalogue looking for the part that applies to her.
 */

/**
 * El bloque de retrato de "Sobre Pilar".
 *
 * OJO: hoy esto reusa las tres imágenes que ya vivían en /public/images
 * porque son las únicas que hay. Para que la galería diga algo, tienen que
 * ser fotos REALES de Pilar trabajando -- en taller, en sesión, en escenario.
 * Tres fotos del mismo retrato con distinto recorte no son una galería.
 * El label es lo que se lee abajo a la izquierda: dos o tres palabras.
 */
const PILAR_GALLERY: PortraitSlide[] = [
  {
    src: "/images/pilar-portrait.jpg",
    label: "Pilar Zambrano B.",
    alt: "Retrato de Pilar Zambrano B.",
  },
  {
    src: "/images/horse-field-portrait.jpg",
    label: "Fuera de la pantalla",
    alt: "Pilar en el campo, a caballo",
  },
  {
    src: "/images/silhouette-sunset.jpg",
    label: "El proceso",
    alt: "Silueta a contraluz al atardecer",
  },
];

/** Formación de Pilar, renderizada en orden. Editar acá, no en el JSX. */
const CREDENTIALS = [
  { label: "Coaching", value: "iPEC · Escuela Domingo Delgado" },
  { label: "Académica", value: "Boston University · IE Business School" },
  { label: "Certificaciones", value: "Hogan · Kellogg · Constelaciones Familiares" },
];

const PATHS = [
  {
    key: "coaching",
    kicker: "Para ti",
    title: "Quiero editar mi vida",
    body: "Seis meses de acompañamiento 1:1 sobre identidad, imagen y decisiones. Un solo expediente que se abre, se documenta y se cierra con un plan que se sostiene solo.",
    tags: ["6 meses · 1:1", "3 fases", "11 años de método"],
    action: "Ver el proceso",
    href: "/coaching",
    image: "/images/pilar-reading.jpg",
    imagePosition: "50% 28%",
  },
  {
    key: "empresas",
    kicker: "Para tu empresa",
    title: "Lidero un equipo",
    body: "Talleres, cenas corporativas, retiros y experiencias diseñadas por Zere Studio. Momentos curados que dejan marca en quien asiste y en la cultura que construye.",
    tags: ["4 formatos", "A medida"],
    action: "Conocer Zere Studio",
    href: "/zere-studio",
    image: "/images/pilar-speaking.jpg",
    imagePosition: "62% 30%",
  },
  {
    key: "comunidad",
    kicker: "Para tu red",
    title: "Quiero rodearme mejor",
    body: "Un directorio de socias para encontrarse, colaborar y recomendarse entre sí, más un calendario de eventos para verse fuera de la pantalla.",
    tags: ["275+ socias", "Eventos cada mes"],
    action: "Ver los próximos eventos",
    href: "/eventos",
    image: "/images/community-beach-night.jpg",
    imagePosition: "50% 50%",
  },
];

/**
 * Each path already owns a colour further down the page (03 is earth-brown,
 * 06 is zere-sky), so the stack reuses them instead of inventing a palette.
 * Backgrounds must be opaque: a stacked card covers the one behind it.
 */
const PATH_TONES: Record<
  string,
  {
    card: string;
    kicker: string;
    title: string;
    body: string;
    cta: string;
    tag: string;
    watermark: string;
    imageVeil: string;
  }
> = {
  coaching: {
    card: "bg-earth-brown",
    kicker: "text-cream/65",
    title: "text-cream",
    body: "text-cream/75",
    cta: "bg-cream text-earth-brown hover:bg-beige-sand",
    tag: "border-cream/30 text-cream/85",
    watermark: "text-cream/[0.08]",
    imageVeil: "from-earth-brown/35",
  },
  empresas: {
    card: "bg-zere-sky",
    kicker: "text-zere-ink/60",
    title: "text-zere-ink",
    body: "text-zere-ink/75",
    cta: "bg-zere-deep text-cream hover:bg-zere-ink",
    tag: "border-zere-deep/30 text-zere-deep",
    watermark: "text-zere-deep/[0.09]",
    imageVeil: "from-zere-deep/30",
  },
  comunidad: {
    card: "bg-beige-sand",
    kicker: "text-charcoal/70",
    title: "text-earth-brown",
    body: "text-charcoal/80",
    cta: "bg-earth-brown text-cream hover:bg-charcoal",
    tag: "border-earth-brown/30 text-earth-brown",
    watermark: "text-earth-brown/10",
    imageVeil: "from-earth-brown/30",
  },
};

/**
 * The concrete results each phase produces, lifted verbatim from the
 * coaching page. This is the answer to "what changes?", which the landing
 * never used to give — poetry alone doesn't sell a six-month commitment.
 */
const OUTCOMES = [
  {
    id: "mapa",
    statement: "Tienes un mapa claro de qué conservar y qué soltar.",
    phase: "Fase 1 · Descubrir y Explorar",
  },
  {
    id: "decisiones",
    statement:
      "Tus decisiones dejan de venir de la exigencia y pasan a venir de la elección.",
    phase: "Fase 2 · Editar y Reescribir",
  },
  {
    id: "imagen",
    statement:
      "Tu imagen deja de ser una sesión aparte y corre en paralelo a quién estás siendo.",
    phase: "Fase 3 · Integrar y Sostener",
  },
];

const PROGRAM_FACTS = [
  { label: "Duración", value: "6 meses" },
  { label: "Formato", value: "8 sesiones · 90 min" },
  { label: "Canal", value: "WhatsApp, L–V 10–19h" },
  { label: "Confidencialidad", value: "Total" },
];

const PHASES = [
  {
    number: "01",
    title: "Descubrir y Explorar",
    body: "Ver con claridad dónde estás hoy, qué está funcionando y qué ya no termina de reflejarte.",
    result: "Mapa claro de qué conservar y qué soltar.",
  },
  {
    number: "02",
    title: "Editar y Reescribir",
    body: "Editar lo que ya no encaja y reescribir la narrativa con la que apareces frente al mundo.",
    result: "Las decisiones dejan de venir de la exigencia y pasan a venir de la elección.",
  },
  {
    number: "03",
    title: "Integrar y Sostener",
    body: "Integrar todo en una manera de estar y aparecer que se sostiene sola, sin esfuerzo.",
    result: "La imagen deja de ser una sesión aparte y corre en paralelo.",
  },
];

const ADDON_DIMENSIONS = [
  {
    index: "01",
    name: "Identity",
    tagline: "Quién estás siendo",
    detail: "Deep Dive Session, Energy Assessment iPEC, lectura de Diseño Humano.",
  },
  {
    index: "02",
    name: "Image",
    tagline: "Cómo te muestras",
    detail: "Closet Detox, Closet Styling, Shopping Day, Photoshoot de marca personal.",
  },
  {
    index: "03",
    name: "Decision",
    tagline: "Qué eliges desde aquí",
    detail: "Vision Board Session, Strategic Network Intro, Decision Intensive.",
  },
];

const FORMATOS = [
  {
    title: "Talleres",
    body: "Aprendizaje en acción para equipos. Espacios para destrabar, activar y dar herramientas concretas.",
  },
  {
    title: "Cenas corporativas",
    body: "Una mesa bien elegida lo cambia todo. Conversaciones que importan, en un ambiente íntimo.",
  },
  {
    title: "Retiros",
    body: "Un espacio para pausar, ordenar y reconectar, lejos del ruido y con dirección clara.",
  },
  {
    title: "Experiencias",
    body: "Momentos curados con propósito que dejan marca en quien asiste y en la cultura que construyen.",
  },
];

export function LandingPage({
  members,
  eventBanners,
}: {
  members: { name: string; profession: string }[];
  eventBanners: EventBanner[];
}) {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroTextRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -50],
  );
  const heroLine = shouldReduceMotion ? lineRevealReduced : lineReveal;

  // Repeated well past what any real screen width needs, so the
  // "-50%" loop point never lands on a visible gap between names.
  const reelFirstHalf = Array(8)
    .fill(members.slice(0, Math.ceil(members.length / 2)))
    .flat();
  const reelSecondHalf = Array(8)
    .fill(members.slice(Math.ceil(members.length / 2)))
    .flat();

  return (
    <div className="flex flex-1 flex-col bg-cream">
      <ScrollProgressRail />
      <SiteHeader
        items={PUBLIC_NAV}
        tone="dark"
        cta={{
          label: "Agenda tu sesión",
          href: DIAGNOSTICO_HREF,
          external: true,
        }}
      />

      {/* Hero — painted brown ground, copy left, Pilar right.
          The outlined PZB monogram that used to sit behind this is gone: the
          paint is the texture now, and two background treatments competing
          for the same space just muddied each other. Restoring it is one
          <span>, if the mark is missed. */}
      <div className="relative w-full min-h-[100svh] overflow-hidden bg-earth-brown flex flex-col">
        <PaintedBackdrop />
        <Grain opacity={0.05} />

        <div className="shell relative flex flex-1 items-center pt-28 pb-16">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div ref={heroTextRef} className="flex flex-col">
              <motion.div
                style={{ opacity: heroOpacity, y: heroY }}
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.14 } } }}
                className="flex w-full flex-col"
              >
                <h1 className="font-serif font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-cream text-balance">
                  <span className="block overflow-hidden pb-[0.08em]">
                    <motion.span variants={heroLine} className="block text-4xl sm:text-5xl lg:text-6xl">
                      Deja de vivir una vida
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                      variants={heroLine}
                      className="block italic font-normal text-beige-sand"
                    >
                      editada por otros.
                    </motion.span>
                  </span>
                </h1>

                <motion.p
                  variants={fadeUp}
                  className="text-base sm:text-lg text-cream/80 max-w-3xl text-pretty leading-relaxed mt-8"
                >
                  Coaching de identidad, imagen y decisiones con Pilar Zambrano B.
                  Empieza por una conversación: 30 minutos para entender dónde
                  estás y qué te está costando avanzar.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                >
                  <a
                    href={DIAGNOSTICO_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-cream text-earth-brown text-sm font-semibold tracking-wide hover:bg-beige-sand hover:-translate-y-0.5 transition-all"
                  >
                    Agenda tu sesión diagnóstico
                    <span aria-hidden>→</span>
                  </a>
                  <Show when="signed-out">
                    <SignUpButton forceRedirectUrl="/home">
                      <button className="inline-flex items-center justify-center rounded-full px-8 py-4 border border-cream/35 text-cream text-sm font-medium tracking-wide hover:bg-cream/10 hover:border-cream/60 transition-colors">
                        Sé parte de la comunidad
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <Link
                      href="/home"
                      className="inline-flex items-center justify-center rounded-full px-8 py-4 border border-cream/35 text-cream text-sm font-medium tracking-wide hover:bg-cream/10 hover:border-cream/60 transition-colors"
                    >
                      Ir a la comunidad
                    </Link>
                  </Show>
                </motion.div>
              </motion.div>
            </div>

            {/* Below lg the portrait is hidden rather than stacked. A hero is
                a promise plus a way to act on it, and pushing the buttons
                below a phone's fold to make room for a photograph trades the
                second for the first. Her portrait still opens Sobre Pilar. */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="hidden lg:block"
            >
              <HeroPortrait
                src="/images/pilar-portrait.jpg"
                alt="Pilar Zambrano B."
                // Flip to true the day /public/images holds a
                // background-removed PNG of her. See HeroPortrait.
                cutout={false}
                className="mx-auto w-full max-w-[30rem]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Formación y reconocimiento — authority, immediately after the promise */}
      <Ticker items={CREDENCIALES} tone="dark" />

      {/* Manifiesto — the page marks itself up. Sits between two dark bands
          on purpose: 02 and 03 were running back to back, and a light,
          un-numbered interstitial gives the eye somewhere to land before the
          offer. Un-numbered because it is a breath, not a chapter. */}
      <AnnotatedStatement
        tone="paper"
        lines={["Reescribir", "tu vida"]}
        circled="Strategic Life Editor"
        boxed="Las mejores decisiones nunca vienen de la obediencia."
        arrowed="Identidad, imagen y decisiones: un solo expediente."
        script="se abre, se documenta y se cierra"
      />

      {/* Cifras — hard proof, before any poetry */}
      {/* {VISIBLE_PROOF_POINTS.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-earth-brown/12">
          <motion.dl
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="shell flex flex-wrap justify-center gap-x-16 gap-y-8 sm:justify-between"
          >
            {VISIBLE_PROOF_POINTS.map((point) => (
              <motion.div key={point.label} variants={fadeUp} className="text-center">
                <dt className="font-serif text-4xl sm:text-5xl leading-none text-earth-brown">
                  {point.value}
                </dt>
                <dd className="mt-2.5 text-[0.7rem] uppercase tracking-[0.2em] text-charcoal/75">
                  {point.label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </section>
      )} */}

      {/* Quote */}
      {/* <section className="relative overflow-hidden py-14 sm:py-20 bg-beige-sand/40">
        <span
          aria-hidden
          className="absolute -top-4 sm:-top-10 left-4 sm:left-8 font-serif italic text-[9rem] sm:text-[13rem] leading-none text-earth-brown/[0.12] select-none"
        >
          &ldquo;
        </span>
        <Reveal className="shell relative">
          <p className="measure font-serif italic text-2xl sm:text-3xl text-earth-brown leading-tight text-balance">
            <span className="font-semibold not-italic">
              La vida se vive, no se mide.
            </span>{" "}
            Las mejores decisiones nunca vienen de la obediencia, sino de
            escucharte realmente para entender quién eres y lo que tienes que
            soltar.
          </p>
          <p className="mt-6 font-script text-2xl text-charcoal">
            Pilar Zambrano B.
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/75 mt-1">
            Strategic Life Editor
          </p>
        </Reveal>
      </section> */}

      {/* Los tres caminos — the segmentation grid */}
      <section className="relative py-16 sm:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl text-earth-brown text-balance">
              ¿En qué momento{" "}
              <span className="italic font-normal">estás hoy?</span>
            </h2>
            <p className="text-charcoal/75 leading-relaxed mt-5 max-w-lg">
              Tres maneras de trabajar con Pilar. Elige la que te describe y
              empieza por ahí.
            </p>
          </Reveal>

          {/* Stacked cards: each one sticks a little lower than the last, so
              the card below scrolls up and covers it, leaving a spine with the
              kicker still readable. Pure CSS — the scroll IS the animation, so
              no fadeUp here: a live transform would fight position:sticky.
              Note this only works while no ancestor sets overflow:hidden. */}
          <div className="mt-14">
            {PATHS.map((path, i) => {
              const tone = PATH_TONES[path.key];
              return (
                <div
                  key={path.key}
                  className="sticky"
                  // 5.5rem clears the fixed header; each card then sits 2.75rem
                  // lower, which is exactly the spine the kicker needs.
                  style={{ top: `${5.5 + i * 2.75}rem` }}
                >
                  <article
                    className={`relative grid overflow-hidden rounded-3xl shadow-[0_-8px_40px_-24px_rgba(54,54,54,0.45)] sm:min-h-[62vh] sm:grid-cols-[1fr_0.8fr] ${tone.card}`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute left-6 top-2 font-serif text-[7rem] italic leading-none sm:left-10 ${tone.watermark}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex flex-col justify-center p-8 sm:p-12 sm:py-14">
                      <p
                        className={`text-[0.68rem] uppercase tracking-[0.22em] ${tone.kicker}`}
                      >
                        {path.kicker}
                      </p>
                      <h3
                        className={`mt-5 font-serif text-3xl leading-tight text-balance sm:text-4xl ${tone.title}`}
                      >
                        {path.title}
                      </h3>
                      <p className={`mt-5 max-w-md leading-relaxed ${tone.body}`}>
                        {path.body}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {path.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${tone.tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={path.href}
                        className={`group mt-9 inline-flex items-center gap-2 self-start rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors ${tone.cta}`}
                      >
                        {path.action}
                        <span
                          aria-hidden
                          className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </div>

                    <div className="relative order-first min-h-[12rem] sm:order-none sm:min-h-0">
                      <Image
                        src={path.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 40vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: path.imagePosition }}
                      />
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${tone.imageVeil} to-transparent sm:w-2/5`}
                      />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Qué cambia — the destination, stated plainly */}
      <section
        className="relative overflow-hidden py-16 sm:py-24 bg-cover bg-center text-cream"
        style={{ backgroundImage: "url('/images/close-up-green-jade-texture.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
        <Grain opacity={1} />
        <div className="shell relative z-10">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-5xl leading-[1.05] text-balance">
              A los seis meses,{" "}
              <span className="italic font-normal text-beige-sand">
                qué es distinto
              </span>
            </h2>
          </Reveal>
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 flex flex-col"
          >
            {OUTCOMES.map((outcome, i) => (
              <motion.li
                key={outcome.id}
                variants={fadeUp}
                className={`py-8 ${i === 0 ? "border-t border-cream/15" : ""} border-b border-cream/15`}
              >
                <p className="font-serif text-2xl sm:text-[2.1rem] leading-snug text-cream text-balance max-w-3xl">
                  {outcome.statement}
                </p>
                <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-cream/75">
                  {outcome.phase}
                </p>
              </motion.li>
            ))}
          </motion.ul>
          <Reveal className="mt-12">
            <a
              href={DIAGNOSTICO_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-cream text-dark-pine text-sm font-semibold tracking-wide transition-colors hover:bg-beige-sand"
            >
              Quiero llegar ahí
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* The Alignment Partnership — the flagship offer */}
      <section className="relative py-16 sm:py-24 bg-earth-brown text-cream">
        <Grain opacity={0.07} />
        <div className="shell relative">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
            <Reveal>
              <Eyebrow>
                <span className="text-cream/70">Programa principal</span>
              </Eyebrow>
              <h2 className="font-serif text-4xl sm:text-5xl leading-[1.03] mt-5 mb-6 text-balance">
                The Alignment{" "}
                <span className="italic font-normal text-beige-sand">
                  Partnership
                </span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed max-w-lg mb-9">
                Seis meses trabajando identidad, imagen y decisiones como un
                solo expediente: se abre, se documenta cada sesión, y se cierra
                con un plan que se sostiene solo.
              </p>

              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-md mb-10">
                {PROGRAM_FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[0.68rem] tracking-[0.18em] uppercase text-cream/65 mb-1.5">
                      {fact.label}
                    </dt>
                    <dd className="font-serif text-lg text-cream">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <a
                  href={DIAGNOSTICO_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-cream text-earth-brown text-sm font-semibold tracking-wide hover:bg-beige-sand transition-colors"
                >
                  Agenda tu sesión diagnóstico
                  <span aria-hidden>→</span>
                </a>
                <Link
                  href="/coaching"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 border border-cream/35 text-cream text-sm font-medium hover:bg-cream/10 hover:border-cream/60 transition-colors"
                >
                  Ver el proceso completo
                </Link>
              </div>
            </Reveal>

            <motion.ol
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col"
            >
              {PHASES.map((phase, i) => (
                <motion.li
                  key={phase.number}
                  variants={fadeUp}
                  className={`grid grid-cols-[3.25rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 sm:gap-6 py-6 ${i === 0 ? "border-t border-cream/15" : ""
                    } border-b border-cream/15`}
                >
                  <span className="relative">
                    <span
                      aria-hidden
                      className="absolute left-[0.6rem] top-[0.3em] w-1.5 h-1.5 rounded-full bg-cream"
                    />
                    {i < PHASES.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[0.85rem] top-[1.15em] bottom-[-1.5rem] w-px bg-cream/15"
                      />
                    )}
                    <span
                      className="font-serif italic text-4xl leading-none text-transparent"
                      style={{ WebkitTextStroke: "1.2px rgba(249,247,242,0.42)" }}
                    >
                      {phase.number}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-lg mb-2">{phase.title}</h3>
                    <p className="text-sm text-cream/75 leading-relaxed mb-3">
                      {phase.body}
                    </p>
                    <p className="text-sm font-serif italic text-beige-sand leading-relaxed">
                      {phase.result}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* Testimonios — the proof wall */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-beige-sand/45">
        <Grain opacity={0.05} />
        <div className="shell relative">
          <Reveal className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-script text-4xl sm:text-5xl text-earth-brown mb-4">
                Client love
              </p>
              <h2 className="text-3xl sm:text-4xl text-charcoal text-balance">
                Lo que dicen las mujeres que ya hicieron el proceso
              </h2>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-earth-brown/40 px-6 py-3 text-sm font-medium text-earth-brown transition-colors hover:bg-earth-brown hover:text-cream lg:self-auto"
            >
              Ver más en Instagram
              <span aria-hidden>→</span>
            </a>
          </Reveal>

          <TestimonialCarousel items={TESTIMONIALS} />

          <Reveal className="mt-14 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={DIAGNOSTICO_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-earth-brown text-cream text-sm font-semibold tracking-wide hover:bg-charcoal transition-colors"
            >
              Quiero empezar mi proceso
              <span aria-hidden>→</span>
            </a>
            <p className="text-sm text-charcoal/75">
              Una conversación de 30 minutos, sin guion.
            </p>
          </Reveal>
        </div>
      </section>


      {/* Sobre Pilar — authority */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="shell">
          {/* La galería es vertical, así que se lleva la columna angosta y el
              texto la ancha — al revés de como estaba. Dos celdas, no tres:
              Formación se mudó adentro de la tarjeta. */}
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            {/* La galeria sale del flujo desde lg, asi que la fila la mide la
                tarjeta de texto y la foto se acomoda a ese alto. El min-h es
                un piso, no un objetivo: evita que en un viewport donde el
                texto quede corto la foto termine siendo una franja. */}
            <Reveal className="relative lg:min-h-[26rem]">
              <PortraitGallery
                items={PILAR_GALLERY}
                className="lg:absolute lg:inset-0"
              />
            </Reveal>

            <Reveal className="relative flex flex-col justify-center rounded-3xl bg-beige-sand/45 p-8 sm:p-10">
              <span
                aria-hidden
                className="absolute -top-8 right-4 font-serif italic font-light text-[9rem] leading-none text-earth-brown/[0.07] select-none pointer-events-none"
              >
                P
              </span>
              <div className="relative">
                <Eyebrow>Sobre Pilar</Eyebrow>
                <h2 className="text-3xl sm:text-4xl text-earth-brown mt-5 mb-6 text-balance">
                  Emprendedora, inversionista y consejera.
                </h2>
                <p className="text-charcoal/80 leading-relaxed">
                  <span className="float-left font-serif text-5xl leading-[0.8] pr-2 text-earth-brown">
                    S
                  </span>
                  e define como Strategic Life Editor: alguien que ayuda a sus
                  clientas a editar su vida desde adentro hacia afuera,
                  integrando identidad, imagen y decisiones. Fundó UMA, y en
                  2024 recibió el Premio Mujeres en las Artes.
                </p>
                <Link
                  href="/sobre-pilar"
                  className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-earth-brown px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-charcoal"
                >
                  Conocer su historia
                  <span aria-hidden>&rarr;</span>
                </Link>

                {/* Formación: es la prueba dura de la sección, así que vive
                    dentro de la misma tarjeta que la biografía en vez de
                    colgar como pie de página. Una regla la separa, no una caja. */}
                <div className="mt-10 border-t border-earth-brown/20 pt-8">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-charcoal/70">
                    Formación
                  </p>
                  <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-3">
                    {CREDENTIALS.map((item) => (
                      <div key={item.label}>
                        <dt className="mb-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-charcoal/75">
                          {item.label}
                        </dt>
                        <dd className="text-sm text-charcoal text-balance">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Comunidad */}
      <section className="relative overflow-hidden px-[var(--shell-gutter)] py-16 sm:py-24 bg-beige-sand/40">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow>Comunidad</Eyebrow>
            <h2 className="text-3xl sm:text-4xl text-earth-brown mt-5 mb-6 text-balance">
              Una red que se sostiene entre mujeres
            </h2>
            <p className="text-charcoal/75 max-w-xl mx-auto leading-relaxed">
              Un directorio de socias para encontrarse, colaborar y
              recomendarse entre sí — estas son algunas de las que ya forman
              parte.
            </p>
          </Reveal>
        </div>

        {reelFirstHalf.length > 0 && (
          <div className="mt-12 -mx-[var(--shell-gutter)] flex flex-col gap-2">
            <div className="overflow-hidden whitespace-nowrap">
              <div className="inline-flex marquee-track" style={{ animationDuration: "208s" }}>
                {[...reelFirstHalf, ...reelFirstHalf].map((m, i) => (
                  <span
                    key={i}
                    className="font-serif text-2xl sm:text-3xl text-earth-brown/30 px-6 flex items-baseline gap-2 after:content-['—'] after:ml-4 after:text-earth-brown/20"
                  >
                    <span className="italic font-normal text-earth-brown">
                      {m.name}
                    </span>
                    <span className="text-xs font-sans tracking-wide text-charcoal/75">
                      {m.profession}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            {reelSecondHalf.length > 0 && (
              <div className="overflow-hidden whitespace-nowrap">
                <div
                  className="inline-flex marquee-track"
                  style={{ animationDirection: "reverse", animationDuration: "208s" }}
                >
                  {[...reelSecondHalf, ...reelSecondHalf].map((m, i) => (
                    <span
                      key={i}
                      className="font-serif text-2xl sm:text-3xl text-earth-brown/30 px-6 flex items-baseline gap-2 after:content-['—'] after:ml-4 after:text-earth-brown/20"
                    >
                      <span className="italic font-normal text-earth-brown">
                        {m.name}
                      </span>
                      <span className="text-xs font-sans tracking-wide text-charcoal/75">
                        {m.profession}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Reveal className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Show when="signed-out">
            <SignUpButton forceRedirectUrl="/home">
              <button className="rounded-full px-8 py-3.5 bg-earth-brown text-cream text-sm font-semibold tracking-wide hover:bg-charcoal transition-colors">
                Únete a la comunidad
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/directorio"
              className="rounded-full px-8 py-3.5 bg-earth-brown text-cream text-sm font-semibold tracking-wide hover:bg-charcoal transition-colors"
            >
              Ver el directorio
            </Link>
          </Show>
          <Link
            href="/eventos"
            className="text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
          >
            Ver el calendario de eventos
          </Link>
        </Reveal>
      </section>

      {/* Eventos — the banner carousel is the whole section now */}
      <section className="relative py-16 sm:py-24">
        <Reveal className="shell">
          <EventBannerCarousel
            items={eventBanners}
            heading="Próximos eventos"
            moreHref="/eventos"
            moreLabel="Explora todos los eventos"
          />
        </Reveal>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden px-[var(--shell-gutter)] py-20 sm:py-28 bg-charcoal">
        <Grain opacity={0.06} />
        <Reveal className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="font-serif italic font-light text-4xl sm:text-6xl leading-[1.05] text-cream text-balance">
            ¿Lista para editar tu vida{" "}
            <span className="not-italic font-light">desde adentro?</span>
          </h2>
          <p className="text-cream/70 leading-relaxed max-w-md">
            Empieza con una conversación de 30 minutos. Sin guion, sin
            presentación: solo dónde estás hoy y qué te gustaría que fuera
            distinto.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <a
              href={DIAGNOSTICO_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 bg-cream text-charcoal text-sm font-semibold tracking-wide hover:bg-beige-sand transition-colors"
            >
              Agenda tu sesión diagnóstico
              <span aria-hidden>→</span>
            </a>
            <Show when="signed-out">
              <SignUpButton forceRedirectUrl="/home">
                <button className="inline-flex items-center justify-center rounded-full px-8 py-4 border border-cream/30 text-cream text-sm font-medium hover:bg-cream/10 hover:border-cream/55 transition-colors">
                  Sé parte de la comunidad
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/home"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 border border-cream/30 text-cream text-sm font-medium hover:bg-cream/10 hover:border-cream/55 transition-colors"
              >
                Ir a la comunidad
              </Link>
            </Show>
          </div>
          <p className="text-[0.78rem] text-cream/60">
            Te responde Pilar directo por WhatsApp · L–V 10–19h (CDMX)
          </p>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
