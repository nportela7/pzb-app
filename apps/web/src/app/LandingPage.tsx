"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ZereMark } from "@/components/ZereMark";
import { Grain } from "@/components/Grain";
import { ScrollProgressRail } from "@/components/ScrollProgressRail";
import { SectionIndex } from "@/components/SectionIndex";
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

// Same fade + translateY, tuned to the 400-600ms window for newly
// added blocks (logo strip, testimonial, CTA).
const fadeUpFast = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function Reveal({
  children,
  className,
  variants = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof fadeUp;
}) {
  return (
    <motion.div
      variants={variants}
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
    <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-slate">
      <span className="w-8 h-px bg-slate" />
      {children}
    </p>
  );
}

function Ticker({
  items,
  tone = "dark",
  renderItem,
  durationSeconds = 208,
}: {
  items: string[];
  tone?: "dark" | "cream" | "zere";
  renderItem?: (item: string) => React.ReactNode;
  durationSeconds?: number;
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
      <div
        className="inline-flex marquee-track"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {[...filled, ...filled].map((item, i) =>
          renderItem ? (
            <span key={i} className="px-6 flex items-center">
              {renderItem(item)}
            </span>
          ) : (
            <span
              key={i}
              className={`text-[0.68rem] tracking-[0.24em] uppercase px-6 flex items-center gap-6 after:content-['·'] ${text} ${dot}`}
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

const PHASES = [
  {
    number: "01",
    title: "Descubrir y Explorar",
    body: "Ver con claridad dónde estás hoy, qué está funcionando y qué ya no termina de reflejarte.",
    tag: "Claridad",
  },
  {
    number: "02",
    title: "Editar y Reescribir",
    body: "Editar lo que ya no encaja y reescribir la narrativa con la que apareces frente al mundo.",
    tag: "Narrativa",
  },
  {
    number: "03",
    title: "Integrar y Sostener",
    body: "Integrar todo en una manera de estar y aparecer que se sostiene sola, sin esfuerzo.",
    tag: "Integración",
  },
];

const FORMATOS = [
  {
    title: "Talleres",
    body: "Aprendizaje en acción para equipos. Espacios para destrabar, activar y dar herramientas concretas.",
    icon: "talleres",
  },
  {
    title: "Cenas corporativas",
    body: "Una mesa bien elegida lo cambia todo. Conversaciones que importan, en un ambiente íntimo.",
    icon: "cenas",
  },
  {
    title: "Retiros",
    body: "Un espacio para pausar, ordenar y reconectar, lejos del ruido y con dirección clara.",
    icon: "retiros",
  },
  {
    title: "Experiencias",
    body: "Momentos curados con propósito que dejan marca en quien asiste y en la cultura que construyen.",
    icon: "experiencias",
  },
] as const;

// Minimal line-art icons, same stroke weight/style as Flourish.tsx —
// no icon library needed for four static marks.
function FormatIcon({
  name,
  className,
}: {
  name: (typeof FORMATOS)[number]["icon"];
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (name) {
    case "talleres":
      return (
        <svg {...common}>
          <circle cx="8" cy="8.5" r="4" />
          <circle cx="15.5" cy="14.5" r="4" />
        </svg>
      );
    case "cenas":
      return (
        <svg {...common}>
          <path d="M6 3v8a2 2 0 0 0 2 2v8" />
          <path d="M6 3v5M9 3v5" />
          <path d="M18 3c-1.5 0-2.5 1.5-2.5 4s1 4 2.5 4v10" />
        </svg>
      );
    case "retiros":
      return (
        <svg {...common}>
          <path d="M4 18 9.5 8l3 5.5L15 10l5 8H4Z" />
          <circle cx="17" cy="6.5" r="1.6" />
        </svg>
      );
    case "experiencias":
      return (
        <svg {...common}>
          <path d="M12 3.5c.8 3.2 2.8 5.2 6 6-3.2.8-5.2 2.8-6 6-.8-3.2-2.8-5.2-6-6 3.2-.8 5.2-2.8 6-6Z" />
        </svg>
      );
  }
}

// Placeholder wordmarks — swap for real client logo images (SVG/PNG)
// once Zere Studio shares its B2B roster.
const B2B_LOGOS = [
  "Marca 01",
  "Empresa 02",
  "Estudio 03",
  "Grupo 04",
  "Firma 05",
  "Casa 06",
];

const ADDON_DIMENSIONS = [
  {
    index: "01",
    name: "Identity",
    tagline: "Quién estás siendo",
    detail: "Energía, diseño humano, sesiones profundas.",
  },
  {
    index: "02",
    name: "Image",
    tagline: "Cómo te muestras",
    detail: "Closet, styling, shopping day, fotografía.",
  },
  {
    index: "03",
    name: "Decision",
    tagline: "Qué eliges desde aquí",
    detail: "Visión, red estratégica, claridad para decidir.",
  },
];

const EVENT_TYPES = [
  { label: "Talleres", dot: "bg-earth-brown" },
  { label: "Cenas", dot: "bg-dark-pine" },
  { label: "Retiros", dot: "bg-slate" },
  { label: "Sesiones abiertas", dot: "bg-earth-brown" },
  { label: "Zere Studio", dot: "bg-zere-deep", ring: "border-zere-deep/25 hover:border-zere-deep/50 hover:bg-zere-sky/25" },
];

export function LandingPage({
  members,
}: {
  members: { name: string; profession: string }[];
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
      {/* Hero — solid brown, no photo, bold editorial type */}
      <div className="relative w-full min-h-[100svh] overflow-hidden bg-earth-brown flex flex-col">
        <Grain opacity={0.05} />
        <span
          aria-hidden
          className="pzb-blob top-[-8%] left-[-8%] w-[50vw] h-[50vw] max-w-[560px] max-h-[560px]"
          style={{
            background:
              "radial-gradient(circle, rgba(218,210,193,0.28), transparent 70%)",
          }}
        />
        <span
          aria-hidden
          className="pzb-blob bottom-[-12%] right-[-10%] w-[40vw] h-[40vw] max-w-[440px] max-h-[440px]"
          style={{
            background:
              "radial-gradient(circle, rgba(249,247,242,0.16), transparent 70%)",
            animationDelay: "4s",
          }}
        />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif italic font-light text-[9rem] sm:text-[18rem] leading-none whitespace-nowrap text-transparent select-none pointer-events-none tracking-tight"
          style={{ WebkitTextStroke: "1.5px rgba(249,247,242,0.055)" }}
        >
          PZB
        </span>

        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative flex items-center justify-between px-6 sm:px-10 pt-8 sm:pt-10"
        >
          <span className="font-script text-3xl text-cream">PZB.</span>
          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <SignInButton forceRedirectUrl="/home">
                <button className="text-sm text-cream/75 hover:text-cream transition-colors">
                  Iniciar sesión
                </button>
              </SignInButton>
              <SignUpButton forceRedirectUrl="/home">
                <button className="text-sm rounded-full px-5 py-2 bg-cream text-earth-brown font-medium hover:bg-beige-sand transition-colors">
                  Crear cuenta
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/home"
                className="text-sm text-cream/75 hover:text-cream transition-colors"
              >
                Ir a la comunidad
              </Link>
              <UserButton />
            </Show>
          </div>
        </motion.header>

        <div
          ref={heroTextRef}
          className="relative flex-1 flex flex-col justify-center px-6 sm:px-10 py-12 max-w-3xl"
        >
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2"
          >
            <motion.h1
              variants={fadeUp}
              className="font-serif font-light text-5xl sm:text-7xl leading-[0.95] text-cream text-balance"
            >
              Styling your life.
              <br />
              <span className="italic font-normal text-beige-sand">
                Your own way.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base text-cream/80 max-w-md leading-relaxed mt-9 mb-9"
            >
              Coaching de identidad, imagen y decisiones. Experiencias con
              intención para empresas. Y una comunidad que se sostiene entre
              mujeres.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Show when="signed-out">
                <SignUpButton forceRedirectUrl="/home">
                  <button className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 bg-cream text-earth-brown text-sm font-semibold tracking-wide hover:bg-beige-sand hover:-translate-y-0.5 transition-all">
                    Sé parte de la comunidad
                    <span aria-hidden>→</span>
                  </button>
                </SignUpButton>
              </Show>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative hidden sm:flex items-center gap-3 self-end px-10 pb-8 text-[0.65rem] tracking-[0.2em] uppercase text-cream/45">
          Scroll
          <span className="w-px h-9 bg-cream/35" />
        </div>
      </div>

      {/* Quote */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-12 sm:py-16 bg-beige-sand/40">
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
          <p className="text-xs tracking-[0.3em] uppercase text-slate mt-1">
            Strategic Life Editor
          </p>
        </Reveal>
      </section>

      {/* Sobre Pilar */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-12 sm:py-16">
        <SectionIndex n="01" label="Sobre Pilar" />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
            <Reveal className="relative">
              <span
                aria-hidden
                className="absolute -top-10 -left-8 font-serif italic font-light text-[10rem] leading-none text-earth-brown/[0.07] select-none pointer-events-none"
              >
                P
              </span>
              <span
                aria-hidden
                className="pzb-blob -top-8 -right-8 w-52 h-52 sm:w-64 sm:h-64"
                style={{
                  background:
                    "radial-gradient(circle, rgba(89,68,52,0.22), transparent 70%)",
                }}
              />
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
              <Eyebrow>01 · Sobre Pilar</Eyebrow>
              <h2 className="text-3xl sm:text-4xl text-earth-brown mt-4 mb-6 text-balance">
                Emprendedora, inversionista y consejera.
              </h2>
              <p className="text-charcoal/80 leading-relaxed max-w-xl mb-4">
                <span className="float-left font-serif text-5xl leading-[0.8] pr-2 text-earth-brown">
                  S
                </span>
                e define como Strategic Life Editor: alguien que
                ayuda a sus clientas a editar su vida desde adentro hacia
                afuera, integrando identidad, imagen y decisiones.
              </p>
              <Link
                href="/sobre-pilar"
                className="inline-block mt-2 text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
              >
                Conocer su historia
              </Link>
              <div className="relative mt-14 max-w-sm">
                <span
                  aria-hidden
                  className="absolute left-0 right-0 top-1 h-px bg-earth-brown/20"
                />
                <div className="relative grid grid-cols-3 gap-2">
                  {[
                    { place: "Monterrey", tag: "Origen" },
                    { place: "Boston & Madrid", tag: "Formación" },
                    { place: "Ciudad de México", tag: "Hoy · 11 años" },
                  ].map((stop) => (
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Coaching */}
      <section className="relative px-6 sm:px-10 py-12 sm:py-16 bg-earth-brown text-cream">
        <SectionIndex n="02" label="Coaching" tone="cream" />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>
              <span className="text-cream/70">02 · Coaching</span>
            </Eyebrow>
            <h2 className="font-serif italic text-3xl sm:text-4xl mt-4 mb-8 text-balance">
              El proceso, en tres fases
            </h2>
          </Reveal>
        </div>
        <div className="max-w-3xl mx-auto">
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
                className={`grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 sm:gap-8 py-7 ${
                  i === 0 ? "border-t border-cream/15" : ""
                } border-b border-cream/15`}
              >
                <span className="relative">
                  <span
                    aria-hidden
                    className="absolute left-[0.65rem] top-[0.3em] w-1.5 h-1.5 rounded-full bg-cream"
                  />
                  {i < PHASES.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[0.9rem] top-[1.15em] bottom-[-1.75rem] w-px bg-cream/15"
                    />
                  )}
                  <span
                    className="font-serif italic text-4xl sm:text-5xl leading-none text-transparent"
                    style={{ WebkitTextStroke: "1.2px rgba(249,247,242,0.42)" }}
                  >
                    {phase.number}
                  </span>
                </span>
                <div>
                  <h3 className="text-xl mb-2">{phase.title}</h3>
                  <p className="text-cream/78 leading-relaxed mb-3">
                    {phase.body}
                  </p>
                  <span className="inline-block text-[0.68rem] tracking-[0.18em] uppercase text-cream/55 border border-cream/25 rounded-full px-3 py-1">
                    {phase.tag}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ol>
          <Reveal className="mt-10">
            <Link
              href="/coaching"
              className="inline-block text-sm text-cream border-b border-cream/40 hover:border-cream transition-colors"
            >
              Ver el proceso completo
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Zere Studio — its own sub-brand moment */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-12 sm:py-16 bg-zere-sky">
        <Grain opacity={0.06} />
        <SectionIndex n="03" label="Zere Studio" tone="zere" />

        {/* Social proof — B2B logo marquee, same marquee-track pattern as
            the directorio de socias reel further down the page. */}
        <Reveal
          variants={fadeUpFast}
          className="relative -mx-6 sm:-mx-10 mb-10"
        >
          <p className="text-center text-[0.65rem] tracking-[0.22em] uppercase text-zere-deep/50 mb-3">
            Empresas que ya vivieron una experiencia Zere
          </p>
          <Ticker
            items={B2B_LOGOS}
            tone="zere"
            durationSeconds={60}
            renderItem={(item) => (
              <span className="font-serif italic text-lg sm:text-xl text-zere-deep/70">
                {item}
              </span>
            )}
          />
        </Reveal>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center mb-10">
            <Reveal>
              <Eyebrow>03 · Zere Studio</Eyebrow>
              <div className="flex items-center gap-4 mt-4">
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
              <Link
                href="/zere-studio"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3 bg-zere-deep text-cream text-sm font-medium tracking-wide hover:bg-charcoal transition-colors"
              >
                Descubrir Zere Studio
                <span aria-hidden>→</span>
              </Link>
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
        <div className="relative -mx-6 sm:-mx-10 mb-10">
          <Ticker items={["Talleres", "Cenas corporativas", "Retiros", "Experiencias"]} tone="zere" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-zere-deep/60 mb-3">
            Formatos
          </p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {FORMATOS.map((formato) => (
              <motion.div
                key={formato.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="rounded-2xl bg-cream/70 p-6 hover:bg-cream transition-colors"
              >
                <FormatIcon
                  name={formato.icon}
                  className="w-7 h-7 text-zere-deep mb-4"
                />
                <h3 className="text-lg text-zere-deep mb-2">
                  {formato.title}
                </h3>
                <p className="text-sm text-zere-ink/70 leading-relaxed max-w-sm">
                  {formato.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonio destacado — mismo peso visual que la cita de Pilar
              en el hero. Copy placeholder, a reemplazar por el equipo. */}
          <div className="relative mt-16 max-w-2xl mx-auto">
            <span
              aria-hidden
              className="absolute -top-6 sm:-top-10 left-0 font-serif italic text-[7rem] sm:text-[10rem] leading-none text-zere-deep/[0.12] select-none pointer-events-none"
            >
              &ldquo;
            </span>
            <Reveal variants={fadeUpFast} className="relative">
              <p className="font-serif italic text-xl sm:text-2xl text-zere-deep leading-snug text-balance">
                {/* PLACEHOLDER — reemplazar con testimonio real de una
                    clienta o empresa que vivió un retiro/taller Zere. */}
                Un espacio que nos dio permiso de pausar y volver a elegir
                cómo queríamos liderar. El equipo salió con más claridad de
                la que llegó.
              </p>
              <p className="mt-6 font-script text-xl text-zere-deep">
                Nombre Apellido
              </p>
              <p className="text-xs tracking-[0.3em] uppercase text-zere-deep/60 mt-1">
                Cargo · Empresa (placeholder)
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Comunidad */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-12 sm:py-16 bg-beige-sand/40">
        <SectionIndex n="04" label="Comunidad" />
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow>04 · Comunidad</Eyebrow>
            <h2 className="text-3xl sm:text-4xl text-earth-brown mt-4 mb-6 text-balance">
              Una red que se sostiene entre mujeres
            </h2>
            <p className="text-charcoal/70 max-w-xl mx-auto leading-relaxed">
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
                    <span className="text-xs font-sans tracking-wide text-slate">
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
                      <span className="text-xs font-sans tracking-wide text-slate">
                        {m.profession}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Reveal className="mt-12 text-center">
          <Show when="signed-out">
            <SignUpButton forceRedirectUrl="/home">
              <button className="rounded-full px-8 py-3 bg-earth-brown text-cream text-sm tracking-wide hover:bg-charcoal transition-colors">
                Únete a la comunidad
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/directorio"
              className="inline-block text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
            >
              Ver el directorio
            </Link>
          </Show>
        </Reveal>
      </section>

      {/* Eventos */}
      <section className="relative px-6 sm:px-10 py-12 sm:py-16">
        <SectionIndex n="05" label="Eventos" />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>05 · Eventos</Eyebrow>
            <h2 className="text-3xl sm:text-4xl text-earth-brown mt-4 mb-6 text-balance">
              Un calendario para encontrarse en persona
            </h2>
            <p className="text-charcoal/70 max-w-lg leading-relaxed mb-8">
              Talleres, cenas, retiros y sesiones abiertas — momentos para
              vivir la comunidad fuera de la pantalla.
            </p>
          </Reveal>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap gap-3 mb-10"
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
              className="inline-block text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
            >
              Ver calendario
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="relative px-6 sm:px-10 py-12 sm:py-16 bg-beige-sand/40">
        <SectionIndex n="06" label="Add-Ons" />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>06 · Add-Ons</Eyebrow>
            <h2 className="text-3xl sm:text-4xl text-earth-brown mt-4 mb-14 text-balance">
              Servicios a la carta, cuando los necesitas
            </h2>
          </Reveal>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-3 border-t border-l border-earth-brown/20"
          >
            {ADDON_DIMENSIONS.map((dimension) => (
              <motion.div
                key={dimension.name}
                variants={fadeUp}
                className="p-6 sm:p-7 border-b border-r border-earth-brown/20 hover:bg-cream transition-colors"
              >
                <p className="text-xs tracking-[0.16em] text-slate mb-2">
                  {dimension.index}
                </p>
                <h3 className="font-serif italic text-3xl text-earth-brown mb-2">
                  {dimension.name}
                </h3>
                <p className="text-sm text-charcoal mb-3">
                  {dimension.tagline}
                </p>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {dimension.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <Reveal className="mt-14">
            <Link
              href="/add-ons"
              className="inline-block text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
            >
              Explorar Add-Ons
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA final — full-bleed with background image, reserves its
          height up front (min-h) so the image never causes layout shift. */}
      <section className="relative overflow-hidden min-h-[75vh] sm:min-h-[640px] flex items-center justify-center px-6 sm:px-10 py-20">
        <Image
          src="/images/silhouette-sunset.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/65 to-charcoal/50" />
        <Reveal
          variants={fadeUpFast}
          className="relative max-w-xl mx-auto text-center flex flex-col items-center gap-10"
        >
          <h2 className="font-serif italic font-light text-4xl sm:text-6xl leading-tight text-cream text-balance">
            ¿Lista para editar tu vida{" "}
            <span className="not-italic font-light">desde adentro?</span>
          </h2>
          <Show when="signed-out">
            <SignUpButton forceRedirectUrl="/home">
              <button className="rounded-full px-12 py-5 bg-cream text-charcoal text-base font-semibold tracking-wide hover:bg-beige-sand hover:-translate-y-0.5 transition-all">
                Crear cuenta
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/home"
              className="rounded-full px-12 py-5 bg-cream text-charcoal text-base font-semibold tracking-wide hover:bg-beige-sand hover:-translate-y-0.5 transition-all"
            >
              Ir a la comunidad
            </Link>
          </Show>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-charcoal text-cream/60">
        <span className="font-script text-2xl text-cream">PZB.</span>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          <Link href="/sobre-pilar" className="hover:text-cream transition-colors">
            Sobre Pilar
          </Link>
          <Link href="/coaching" className="hover:text-cream transition-colors">
            Coaching
          </Link>
          <Link href="/zere-studio" className="hover:text-cream transition-colors">
            Zere Studio
          </Link>
          <Link href="/eventos" className="hover:text-cream transition-colors">
            Eventos
          </Link>
          <Link href="/add-ons" className="hover:text-cream transition-colors">
            Add-Ons
          </Link>
        </nav>
        <span className="text-xs">© {new Date().getFullYear()} Pilar Zambrano B.</span>
      </footer>
    </div>
  );
}
