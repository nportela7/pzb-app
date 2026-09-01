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

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
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
    <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-slate">
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
      {/* Hero — horizontal, contained */}
      <div className="relative w-full aspect-[1/2] sm:aspect-[16/9] overflow-hidden">
        <Image
          src="/images/silhouette-sunset.jpg"
          alt="Silueta de una mujer al atardecer, con el cabello al viento"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[48%_89%] sm:object-[48%_92%]"
        />

        {/* inset frame, drawn just inside the image edges, running its full length */}
        <div
          aria-hidden
          className="absolute inset-3 sm:inset-6 rounded-2xl sm:rounded-3xl border border-white/40 pointer-events-none"
        />

        {/* fading into the beige tone of the section below, at the very end of the image */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 sm:h-56 backdrop-blur-md"
          style={{
            maskImage: "linear-gradient(to top, black, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-t from-[#ede8de] to-transparent" />

        <div
          ref={heroTextRef}
          className="absolute inset-x-0 top-0 flex flex-col gap-8 sm:gap-10 px-6 sm:px-10 pt-8 sm:pt-10"
        >
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-start justify-between"
          >
            <span className="font-script text-3xl text-charcoal">PZB.</span>
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-4">
                <Show when="signed-out">
                  <SignInButton>
                    <button className="text-sm text-charcoal/80 hover:text-charcoal transition-colors">
                      Iniciar sesión
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="text-sm rounded-full px-5 py-2 bg-charcoal text-cream hover:bg-earth-brown transition-colors">
                      Crear cuenta
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link
                    href="/home"
                    className="text-sm text-charcoal/80 hover:text-charcoal transition-colors"
                  >
                    Ir a la comunidad
                  </Link>
                  <UserButton />
                </Show>
              </div>
              <p className="text-sm font-serif italic text-charcoal/70">
                Pilar Zambrano B.
              </p>
            </div>
          </motion.header>

          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 max-w-xl"
          >
            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl sm:text-7xl leading-[0.95] text-charcoal text-balance"
            >
              Styling your life.{" "}
              <span className="italic font-normal">Your own way.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-base text-charcoal/80 max-w-md leading-relaxed"
            >
              Coaching de identidad, imagen y decisiones. Experiencias con
              intención para empresas. Y una comunidad que se sostiene entre
              mujeres.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Show when="signed-out">
                <SignUpButton>
                  <button className="rounded-full px-8 py-3 bg-charcoal text-cream text-sm tracking-wide hover:bg-earth-brown transition-colors">
                    Únete a nuestra comunidad
                  </button>
                </SignUpButton>
              </Show>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Quote */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-24 sm:py-32 bg-beige-sand/40">
        <span
          aria-hidden
          className="absolute -top-4 sm:-top-10 left-4 sm:left-8 font-serif italic text-[9rem] sm:text-[13rem] leading-none text-earth-brown/[0.12] select-none"
        >
          &ldquo;
        </span>
        <Reveal className="relative max-w-2xl mx-auto">
          <p className="font-serif italic text-3xl sm:text-4xl text-earth-brown leading-tight text-balance">
            Creo que la vida se vive, no se mide. Y que las mejores decisiones
            nunca vienen de la obediencia, sino de escucharte realmente para
            entender quién eres y lo que tienes que soltar.
          </p>
          <p className="mt-8 font-script text-2xl text-charcoal">
            Pilar Zambrano B.
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-slate mt-1">
            Strategic Life Editor
          </p>
        </Reveal>
      </section>

      {/* Sobre Pilar */}
      <section className="relative px-6 sm:px-10 py-20 sm:py-28">
        <SectionIndex n="01" label="Sobre Pilar" />
        <div className="max-w-3xl mx-auto grid sm:grid-cols-[1.1fr_0.9fr] gap-10 sm:gap-12 sm:items-end">
          <Reveal>
            <Eyebrow>Sobre Pilar</Eyebrow>
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
          </Reveal>
          <Reveal className="flex flex-col">
            {[
              { place: "Monterrey", tag: "Origen" },
              { place: "Boston & Madrid", tag: "Formación" },
              { place: "Ciudad de México", tag: "Hoy · 11 años" },
            ].map((stop, i, arr) => (
              <div key={stop.place} className="relative grid grid-cols-[1.4rem_1fr] gap-4 py-4">
                <span
                  aria-hidden
                  className="mt-2 w-2 h-2 rounded-full bg-earth-brown"
                />
                {i < arr.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[0.42rem] top-8 bottom-0 w-px bg-earth-brown/20"
                  />
                )}
                <div>
                  <p className="font-serif text-xl text-earth-brown leading-none">
                    {stop.place}
                  </p>
                  <p className="text-[0.68rem] tracking-[0.18em] uppercase text-slate mt-1.5">
                    {stop.tag}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Coaching */}
      <section className="relative px-6 sm:px-10 py-20 sm:py-28 bg-charcoal text-cream">
        <SectionIndex n="02" label="Coaching" tone="cream" />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>
              <span className="text-cream/70">Coaching</span>
            </Eyebrow>
            <h2 className="font-serif italic text-3xl sm:text-4xl mt-4 mb-8 text-balance">
              El proceso, en tres fases
            </h2>
          </Reveal>
        </div>
        <div className="-mx-6 sm:-mx-10 mb-10">
          <Ticker
            items={["Descubrir", "Explorar", "Editar", "Reescribir", "Integrar", "Sostener"]}
            tone="cream"
          />
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
                  <p className="text-cream/78 leading-relaxed max-w-lg mb-3">
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
      <section className="relative px-6 sm:px-10 py-20 sm:py-28 bg-zere-deep text-zere-sky">
        <SectionIndex n="03" label="Zere Studio" tone="cream" />
        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4">
              <ZereMark className="w-10 h-7 text-zere-sky" />
              <div>
                <h2 className="flex items-baseline gap-2 font-serif italic font-light text-4xl sm:text-5xl text-cream">
                  zere
                  <span className="font-sans not-italic font-medium text-[0.28em] tracking-[0.22em] uppercase text-zere-sky/90">
                    Studio
                  </span>
                </h2>
                <p className="font-serif italic text-2xl sm:text-3xl text-cream/90 mt-2">
                  zere<span className="text-zere-sky/50 mx-1">&middot;</span>nidad
                </p>
              </div>
            </div>
            <p className="font-serif font-light text-lg sm:text-xl leading-relaxed max-w-lg mt-8 mb-10 text-zere-sky/95">
              Experiencias con intención para empresas: para equipos de
              liderazgo, facilitadoras y marcas que buscan crear momentos
              memorables con propósito.
            </p>
          </Reveal>
        </div>
        <div className="relative -mx-6 sm:-mx-10 mb-10">
          <Ticker items={["Talleres", "Cenas corporativas", "Retiros", "Experiencias"]} tone="zere" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-zere-sky/70 mb-3">
            Formatos
          </p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden bg-zere-sky/20"
          >
            {FORMATOS.map((formato) => (
              <motion.div
                key={formato.title}
                variants={fadeUp}
                className="bg-zere-deep p-7"
              >
                <h3 className="font-serif italic text-lg text-cream mb-2">
                  {formato.title}
                </h3>
                <p className="text-sm text-zere-sky/85 leading-relaxed max-w-sm">
                  {formato.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <Reveal className="mt-14">
            <Link
              href="/zere-studio"
              className="inline-block rounded-full px-8 py-3 bg-cream text-zere-deep text-sm tracking-wide hover:bg-zere-sky transition-colors"
            >
              Descubrir Zere Studio
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Comunidad */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-20 sm:py-28 bg-beige-sand/40">
        <SectionIndex n="04" label="Comunidad" />
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow>Comunidad</Eyebrow>
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
            <SignUpButton>
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
      <section className="relative px-6 sm:px-10 py-20 sm:py-28">
        <SectionIndex n="05" label="Eventos" />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>Eventos</Eyebrow>
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
      <section className="relative px-6 sm:px-10 py-20 sm:py-28 bg-beige-sand/40">
        <SectionIndex n="06" label="Add-Ons" />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>Add-Ons</Eyebrow>
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

      {/* CTA final */}
      <section className="px-6 sm:px-10 py-24 sm:py-32 bg-charcoal">
        <Reveal className="max-w-xl mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="font-serif italic font-light text-4xl sm:text-6xl leading-tight text-cream text-balance">
            ¿Lista para editar tu vida{" "}
            <span className="not-italic font-light">desde adentro?</span>
          </h2>
          <Show when="signed-out">
            <SignUpButton>
              <button className="rounded-full px-8 py-3 bg-cream text-charcoal text-sm tracking-wide hover:bg-beige-sand transition-colors">
                Crear cuenta
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/home"
              className="rounded-full px-8 py-3 bg-cream text-charcoal text-sm tracking-wide hover:bg-beige-sand transition-colors"
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
