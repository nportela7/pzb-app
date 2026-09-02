"use client";

import { Show, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ZereMark } from "@/components/ZereMark";
import { Grain } from "@/components/Grain";
import { ScrollProgressRail } from "@/components/ScrollProgressRail";
import { SectionIndex } from "@/components/SectionIndex";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PUBLIC_NAV } from "@/lib/nav";
import { INSTAGRAM_URL, WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
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
const PATHS = [
  {
    key: "coaching",
    kicker: "Para ti",
    title: "Quiero editar mi vida",
    body: "Seis meses de acompañamiento 1:1 sobre identidad, imagen y decisiones. Un solo expediente que se abre, se documenta y se cierra con un plan que se sostiene solo.",
    action: "Ver el proceso",
    href: "/coaching",
  },
  {
    key: "empresas",
    kicker: "Para tu empresa",
    title: "Lidero un equipo",
    body: "Talleres, cenas corporativas, retiros y experiencias diseñadas por Zere Studio. Momentos curados que dejan marca en quien asiste y en la cultura que construye.",
    action: "Conocer Zere Studio",
    href: "/zere-studio",
  },
  {
    key: "comunidad",
    kicker: "Para tu red",
    title: "Quiero rodearme mejor",
    body: "Un directorio de socias para encontrarse, colaborar y recomendarse entre sí, más un calendario de eventos para verse fuera de la pantalla.",
    action: "Ver los próximos eventos",
    href: "/eventos",
  },
];

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

const EVENT_TYPES = [
  { label: "Talleres", dot: "bg-earth-brown" },
  { label: "Cenas", dot: "bg-dark-pine" },
  { label: "Retiros", dot: "bg-slate" },
  { label: "Sesiones abiertas", dot: "bg-earth-brown" },
  {
    label: "Zere Studio",
    dot: "bg-zere-deep",
    ring: "border-zere-deep/25 hover:border-zere-deep/50 hover:bg-zere-sky/25",
  },
];

export type NextEvent = {
  title: string;
  /** ISO string — Dates don't survive the server/client boundary. */
  startsAt: string;
  typeLabel: string;
  location: string | null;
  isOnline: boolean;
};

const eventDateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
});

export function LandingPage({
  members,
  nextEvent,
}: {
  members: { name: string; profession: string }[];
  nextEvent: NextEvent | null;
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

      {/* Hero — solid brown, no photo, bold editorial type */}
      <div className="relative w-full min-h-[100svh] overflow-hidden bg-earth-brown flex flex-col">
        <Grain opacity={0.05} />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif italic font-light text-[9rem] sm:text-[18rem] leading-none whitespace-nowrap text-transparent select-none pointer-events-none tracking-tight"
          style={{ WebkitTextStroke: "1.5px rgba(249,247,242,0.055)" }}
        >
          PZB
        </span>

        <div
          ref={heroTextRef}
          className="relative flex-1 flex flex-col justify-center px-6 sm:px-10 pt-28 pb-16 max-w-3xl"
        >
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.14 } } }}
            className="flex flex-col"
          >
            <h1 className="font-serif font-light text-5xl sm:text-7xl leading-[0.95] text-cream text-balance">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={heroLine} className="block">
                  Styling your life.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={heroLine}
                  className="block italic font-normal text-beige-sand"
                >
                  Your own way.
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-cream/80 max-w-md leading-relaxed mt-8"
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

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[0.78rem] text-cream/70 leading-relaxed"
            >
              Te responde Pilar directo por WhatsApp · Lunes a viernes, 10–19h
              (CDMX)
            </motion.p>
          </motion.div>
        </div>

        <div className="relative hidden sm:flex items-center gap-3 self-end px-10 pb-8 text-[0.65rem] tracking-[0.2em] uppercase text-cream/65">
          Scroll
          <span className="w-px h-9 bg-cream/35" />
        </div>
      </div>

      {/* Formación y reconocimiento — authority, immediately after the promise */}
      <Ticker items={CREDENCIALES} tone="dark" />

      {/* Cifras — hard proof, before any poetry */}
      {VISIBLE_PROOF_POINTS.length > 0 && (
        <section className="px-6 sm:px-10 py-12 sm:py-16 border-b border-earth-brown/12">
          <motion.dl
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-16 gap-y-8 sm:justify-between"
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
      )}

      {/* Quote */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-14 sm:py-20 bg-beige-sand/40">
        <span
          aria-hidden
          className="absolute -top-4 sm:-top-10 left-4 sm:left-8 font-serif italic text-[9rem] sm:text-[13rem] leading-none text-earth-brown/[0.12] select-none"
        >
          &ldquo;
        </span>
        <Reveal className="relative max-w-3xl mx-auto">
          <p className="font-serif italic text-2xl sm:text-3xl text-earth-brown leading-tight text-balance">
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
      </section>

      {/* Los tres caminos — the segmentation grid */}
      <section className="relative px-6 sm:px-10 py-16 sm:py-24">
        <SectionIndex n="01" label="Por dónde empezar" />
        <div className="max-w-5xl mx-auto">
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

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid sm:grid-cols-3 border-t border-l border-earth-brown/20"
          >
            {PATHS.map((path) => (
              <motion.div key={path.key} variants={fadeUp}>
                <Link
                  href={path.href}
                  className="group relative flex h-full flex-col p-7 sm:p-8 border-b border-r border-earth-brown/20 transition-colors hover:bg-beige-sand/35"
                >
                  <p className="text-[0.68rem] tracking-[0.22em] uppercase text-charcoal/75">
                    {path.kicker}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-[1.7rem] leading-tight text-earth-brown mt-3 mb-4 text-balance">
                    {path.title}
                  </h3>
                  <p className="text-sm text-charcoal/75 leading-relaxed">
                    {path.body}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-earth-brown">
                    {path.action}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Qué cambia — the destination, stated plainly */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-24 bg-dark-pine text-cream">
        <Grain opacity={0.08} />
        <SectionIndex n="02" label="Qué cambia" tone="cream" />
        <div className="relative max-w-5xl mx-auto">
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
      <section className="relative px-6 sm:px-10 py-16 sm:py-24 bg-earth-brown text-cream">
        <Grain opacity={0.07} />
        <SectionIndex n="03" label="Coaching 1:1" tone="cream" />
        <div className="relative max-w-5xl mx-auto">
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
                  className={`grid grid-cols-[3.25rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 sm:gap-6 py-6 ${
                    i === 0 ? "border-t border-cream/15" : ""
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
      <section className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-24 bg-beige-sand/45">
        <Grain opacity={0.05} />
        <SectionIndex n="04" label="Testimonios" />
        <div className="relative max-w-5xl mx-auto">
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

      {/* Add-Ons — the à-la-carte offer */}
      <section className="relative px-6 sm:px-10 py-16 sm:py-24">
        <SectionIndex n="05" label="Add-Ons" />
        <div className="max-w-5xl mx-auto">
          <Reveal className="max-w-2xl">
            <Eyebrow>Add-Ons</Eyebrow>
            <h2 className="text-3xl sm:text-4xl text-earth-brown mt-5 mb-4 text-balance">
              Servicios a la carta, cuando los necesitas
            </h2>
            <p className="text-charcoal/75 leading-relaxed max-w-lg">
              Se agregan al programa cuando aparece la necesidad. Pilar propone
              el correcto en el momento correcto, ajustado a lo que buscas.
            </p>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid sm:grid-cols-3 border-t border-l border-earth-brown/20"
          >
            {ADDON_DIMENSIONS.map((dimension) => (
              <motion.div
                key={dimension.name}
                variants={fadeUp}
                className="p-7 border-b border-r border-earth-brown/20 transition-colors hover:bg-beige-sand/35"
              >
                <p className="text-xs tracking-[0.16em] text-charcoal/75 mb-2">
                  {dimension.index}
                </p>
                <h3 className="font-serif italic text-3xl text-earth-brown mb-2">
                  {dimension.name}
                </h3>
                <p className="text-sm text-charcoal mb-3">
                  {dimension.tagline}
                </p>
                <p className="text-sm text-charcoal/75 leading-relaxed">
                  {dimension.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <Reveal className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={ADDONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-earth-brown text-cream text-sm font-semibold tracking-wide hover:bg-charcoal transition-colors"
            >
              Pedir una cotización
              <span aria-hidden>→</span>
            </a>
            <Link
              href="/add-ons"
              className="text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors self-start sm:self-auto"
            >
              Ver todos los Add-Ons
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Zere Studio — its own sub-brand moment */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-24 bg-zere-sky">
        <Grain opacity={0.06} />
        <SectionIndex n="06" label="Zere Studio" tone="zere" />
        <div className="relative max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center mb-12">
            <Reveal>
              <div className="flex items-center gap-4">
                <ZereMark className="w-9 h-8 text-zere-deep" />
                <div>
                  <h2 className="flex items-baseline gap-2 font-serif italic font-light text-4xl sm:text-5xl text-zere-deep">
                    zere
                    <span className="font-sans not-italic font-medium text-[0.28em] tracking-[0.22em] uppercase text-zere-deep/80">
                      Studio
                    </span>
                  </h2>
                  <p className="font-serif italic text-2xl sm:text-3xl text-zere-deep/70 mt-2">
                    zere<span className="text-zere-deep/40 mx-1">&middot;</span>nidad
                  </p>
                </div>
              </div>
              <p className="font-serif font-light text-lg sm:text-xl leading-relaxed max-w-lg mt-8 mb-8 text-zere-ink/85">
                Experiencias con intención para empresas: para equipos de
                liderazgo, facilitadoras y marcas que buscan crear momentos
                memorables con propósito.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <a
                  href={EMPRESAS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-zere-deep text-cream text-sm font-semibold tracking-wide hover:bg-zere-ink transition-colors"
                >
                  Cotizar una experiencia
                  <span aria-hidden>→</span>
                </a>
                <Link
                  href="/zere-studio"
                  className="inline-flex items-center justify-center rounded-full px-7 py-3.5 border border-zere-deep/35 text-zere-deep text-sm font-medium hover:bg-cream/50 hover:border-zere-deep/60 transition-colors"
                >
                  Descubrir Zere Studio
                </Link>
              </div>
            </Reveal>
            <Reveal className="group relative flex items-center justify-center aspect-square max-w-[16rem] mx-auto lg:max-w-none cursor-default">
              {/* ripple rings — hidden until hover, then expand + fade like water, looping */}
              <span
                aria-hidden
                className="zere-ripple-ring absolute inset-0 rounded-full border border-zere-deep/50 opacity-0 group-hover:opacity-100 group-hover:[animation:zere-ripple_3.6s_ease-in-out_infinite]"
              />
              <span
                aria-hidden
                className="zere-ripple-ring absolute inset-0 rounded-full border border-zere-deep/50 opacity-0 group-hover:opacity-100 group-hover:[animation:zere-ripple_3.6s_ease-in-out_infinite] group-hover:[animation-delay:1.2s]"
              />
              <span
                aria-hidden
                className="zere-ripple-ring absolute inset-0 rounded-full border border-zere-deep/50 opacity-0 group-hover:opacity-100 group-hover:[animation:zere-ripple_3.6s_ease-in-out_infinite] group-hover:[animation-delay:2.4s]"
              />
              {/* static rings, ease outward slightly on hover */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-zere-deep/20 transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-[14%] rounded-full border border-zere-deep/20 transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <div className="relative w-[52%] aspect-square rounded-full bg-cream flex items-center justify-center shadow-[0_20px_40px_-16px_rgba(21,76,97,0.35)] transition-transform duration-700 ease-in-out group-hover:scale-[0.92]">
                <ZereMark className="w-[42%] h-[42%] text-zere-deep transition-transform duration-700 ease-in-out group-hover:scale-110" />
              </div>
            </Reveal>
          </div>
        </div>
        <div className="relative -mx-6 sm:-mx-10 mb-12">
          <Ticker
            items={["Talleres", "Cenas corporativas", "Retiros", "Experiencias"]}
            tone="zere"
          />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {FORMATOS.map((formato) => (
              <motion.div
                key={formato.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="rounded-2xl bg-cream/70 p-6 hover:bg-cream transition-colors"
              >
                <h3 className="text-lg text-zere-deep mb-2">{formato.title}</h3>
                <p className="text-sm text-zere-ink/70 leading-relaxed max-w-sm">
                  {formato.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sobre Pilar — authority */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-24">
        <SectionIndex n="07" label="Sobre Pilar" />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
            <Reveal className="relative">
              <span
                aria-hidden
                className="absolute -top-10 -left-8 font-serif italic font-light text-[10rem] leading-none text-earth-brown/[0.07] select-none pointer-events-none"
              >
                P
              </span>
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-[0_24px_48px_-20px_rgba(89,68,52,0.35)]">
                <Image
                  src="/images/pilar-portrait.jpg"
                  alt="Pilar Zambrano B."
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-earth-brown mix-blend-multiply opacity-[0.12]" />
                <div className="absolute inset-3 rounded-2xl border border-cream/50 pointer-events-none" />
              </div>
            </Reveal>
            <Reveal>
              <Eyebrow>Sobre Pilar</Eyebrow>
              <h2 className="text-3xl sm:text-4xl text-earth-brown mt-5 mb-6 text-balance">
                Emprendedora, inversionista y consejera.
              </h2>
              <p className="text-charcoal/80 leading-relaxed max-w-xl mb-6">
                <span className="float-left font-serif text-5xl leading-[0.8] pr-2 text-earth-brown">
                  S
                </span>
                e define como Strategic Life Editor: alguien que ayuda a sus
                clientas a editar su vida desde adentro hacia afuera,
                integrando identidad, imagen y decisiones. Fundó UMA, y en 2024
                recibió el Premio Mujeres en las Artes.
              </p>

              <dl className="grid sm:grid-cols-3 gap-x-8 gap-y-5 max-w-xl mb-8 border-t border-earth-brown/20 pt-6">
                <div>
                  <dt className="text-[0.65rem] tracking-[0.16em] uppercase text-charcoal/75 mb-1.5">
                    Coaching
                  </dt>
                  <dd className="text-sm text-charcoal">
                    iPEC · Escuela Domingo Delgado
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] tracking-[0.16em] uppercase text-charcoal/75 mb-1.5">
                    Académica
                  </dt>
                  <dd className="text-sm text-charcoal">
                    Boston University · IE Business School
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] tracking-[0.16em] uppercase text-charcoal/75 mb-1.5">
                    Certificaciones
                  </dt>
                  <dd className="text-sm text-charcoal">
                    Hogan · Kellogg · Constelaciones Familiares
                  </dd>
                </div>
              </dl>

              <Link
                href="/sobre-pilar"
                className="inline-block text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
              >
                Conocer su historia
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Comunidad */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-16 sm:py-24 bg-beige-sand/40">
        <SectionIndex n="08" label="Comunidad" />
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
          <div className="mt-12 -mx-6 sm:-mx-10 flex flex-col gap-2">
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

      {/* Eventos */}
      <section className="relative px-6 sm:px-10 py-16 sm:py-24">
        <SectionIndex n="09" label="Eventos" />
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 items-center">
          <div>
            <Reveal>
              <Eyebrow>Eventos</Eyebrow>
              <h2 className="text-3xl sm:text-4xl text-earth-brown mt-5 mb-6 text-balance">
                Un calendario para encontrarse en persona
              </h2>
              <p className="text-charcoal/75 max-w-lg leading-relaxed mb-8">
                Talleres, cenas, retiros y sesiones abiertas — momentos para
                vivir la comunidad fuera de la pantalla.
              </p>
            </Reveal>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-wrap gap-3 mb-9"
            >
              {EVENT_TYPES.map((type) => (
                <motion.span
                  key={type.label}
                  variants={fadeUp}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-sm text-earth-brown bg-cream transition-colors ${
                    type.ring ??
                    "border-earth-brown/25 hover:border-earth-brown/50 hover:bg-beige-sand/40"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${type.dot}`} />
                  {type.label}
                </motion.span>
              ))}
            </motion.div>
            <Reveal>
              <Link
                href="/eventos"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 bg-earth-brown text-cream text-sm font-semibold tracking-wide hover:bg-charcoal transition-colors"
              >
                Ver el calendario
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_24px_48px_-20px_rgba(89,68,52,0.35)]">
            <Image
              src="/images/silhouette-sunset.jpg"
              alt="Encuentro de la comunidad al atardecer"
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-earth-brown mix-blend-multiply opacity-[0.15]" />
          </Reveal>
        </div>
      </section>

      {/* Próxima fecha — the only honest urgency on this page */}
      {nextEvent && (
        <section className="px-6 sm:px-10 pb-4">
          <Reveal className="mx-auto flex max-w-5xl flex-col gap-5 rounded-3xl bg-beige-sand px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div className="min-w-0">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-charcoal/80">
                Próximo encuentro ·{" "}
                {eventDateFormatter.format(new Date(nextEvent.startsAt))}
              </p>
              <p className="mt-2 font-serif text-2xl sm:text-3xl text-earth-brown text-balance">
                {nextEvent.title}
              </p>
              <p className="mt-1.5 text-sm text-charcoal/80">
                {nextEvent.typeLabel}
                {nextEvent.location ? ` · ${nextEvent.location}` : ""}
                {nextEvent.isOnline ? " · En línea" : ""}
              </p>
            </div>
            <Link
              href="/eventos"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-earth-brown px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-charcoal sm:self-auto"
            >
              Reservar mi lugar
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </section>
      )}

      {/* CTA final */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-20 sm:py-28 bg-charcoal">
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
