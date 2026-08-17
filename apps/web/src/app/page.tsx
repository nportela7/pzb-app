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
import { ZereWordmark } from "@/components/ZereWordmark";
import { ZereMark } from "@/components/ZereMark";
import { Grain } from "@/components/Grain";
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
    <p className="text-xs tracking-[0.3em] uppercase text-slate">
      {children}
    </p>
  );
}

const PHASES = [
  {
    number: "01",
    title: "Descubrir y Explorar",
    body: "Ver con claridad dónde estás hoy, qué está funcionando y qué ya no termina de reflejarte.",
  },
  {
    number: "02",
    title: "Editar y Reescribir",
    body: "Editar lo que ya no encaja y reescribir la narrativa con la que apareces frente al mundo.",
  },
  {
    number: "03",
    title: "Integrar y Sostener",
    body: "Integrar todo en una manera de estar y aparecer que se sostiene sola, sin esfuerzo.",
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
    name: "Identity",
    tagline: "Quién estás siendo",
    detail: "Energía, diseño humano, sesiones profundas.",
  },
  {
    name: "Image",
    tagline: "Cómo te muestras",
    detail: "Closet, styling, shopping day, fotografía.",
  },
  {
    name: "Decision",
    tagline: "Qué eliges desde aquí",
    detail: "Visión, red estratégica, claridad para decidir.",
  },
];

const EVENT_TYPES = [
  "Talleres",
  "Cenas",
  "Retiros",
  "Sesiones abiertas",
  "Zere Studio",
];

export default function Home() {
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

  return (
    <div className="flex flex-1 flex-col bg-cream">
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
              className="text-4xl sm:text-6xl text-charcoal text-balance"
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
                    Conocer más
                  </button>
                </SignUpButton>
              </Show>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Quote */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 bg-beige-sand/40">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="font-serif italic text-2xl sm:text-3xl text-earth-brown leading-snug text-balance">
            &ldquo;Creo que la vida se vive, no se mide. Y que las mejores
            decisiones nunca vienen de la obediencia, sino de escucharte
            realmente para entender quién eres y lo que tienes que
            soltar.&rdquo;
          </p>
          <p className="mt-6 text-xs tracking-[0.3em] uppercase text-slate">
            Pilar Zambrano B. — Strategic Life Editor
          </p>
        </Reveal>
      </section>

      {/* Sobre Pilar */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8 sm:gap-4 items-center">
          <Reveal>
            <Eyebrow>Sobre Pilar</Eyebrow>
            <h2 className="text-3xl sm:text-4xl text-earth-brown mt-4 mb-6 text-balance">
              Emprendedora, inversionista y consejera.
            </h2>
            <p className="text-charcoal/80 leading-relaxed max-w-xl mb-4">
              Se define a sí misma como Strategic Life Editor: alguien que
              ayuda a sus clientas a editar su vida desde adentro hacia
              afuera, integrando identidad, imagen y decisiones. Creció en
              Monterrey, estudió en Boston y Madrid, y lleva 11 años en Ciudad
              de México.
            </p>
            <Link
              href="/sobre-pilar"
              className="inline-block mt-2 text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
            >
              Conocer su historia
            </Link>
          </Reveal>
          <motion.p
            aria-hidden
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="hidden sm:block font-serif italic text-6xl lg:text-7xl text-earth-brown/10 leading-none whitespace-nowrap select-none"
            style={{ writingMode: "vertical-rl" }}
          >
            Strategic Life Editor
          </motion.p>
        </div>
      </section>

      {/* Coaching */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 bg-beige-sand/40">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>Coaching</Eyebrow>
            <h2 className="text-3xl sm:text-4xl text-earth-brown mt-4 mb-14 text-balance">
              El proceso, en tres fases
            </h2>
          </Reveal>
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-12"
          >
            {PHASES.map((phase) => (
              <motion.li
                key={phase.number}
                variants={fadeUp}
                className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 sm:gap-8"
              >
                <span className="font-serif text-4xl sm:text-5xl text-earth-brown/25">
                  {phase.number}
                </span>
                <div>
                  <h3 className="text-xl text-charcoal mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-charcoal/80 leading-relaxed max-w-lg">
                    {phase.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
          <Reveal className="mt-14">
            <Link
              href="/coaching"
              className="inline-block text-sm text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
            >
              Ver el proceso completo
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Zere Studio — its own sub-brand moment */}
      <section className="relative overflow-hidden px-6 sm:px-10 py-20 sm:py-28 bg-zere-sky">
        <Image
          src="/images/zere-water-ripple.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-zere-sky/80" />
        <Grain opacity={0.08} />
        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4">
              <ZereWordmark className="text-2xl sm:text-3xl" />
              <ZereMark className="w-9 h-6 text-zere-deep/60" />
            </div>
            <p className="font-serif italic text-4xl sm:text-5xl text-zere-deep/25 mt-8 mb-6">
              serenidad
            </p>
            <h2 className="text-3xl sm:text-4xl text-zere-deep mb-4 text-balance">
              Experiencias con intención para empresas
            </h2>
            <p className="text-zere-ink/70 max-w-lg leading-relaxed mb-14">
              Para equipos de liderazgo, facilitadoras y marcas que buscan
              crear momentos memorables con propósito.
            </p>
          </Reveal>
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
                <h3 className="text-lg text-zere-deep mb-2">
                  {formato.title}
                </h3>
                <p className="text-sm text-zere-ink/70 leading-relaxed max-w-sm">
                  {formato.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <Reveal className="mt-14">
            <Link
              href="/zere-studio"
              className="inline-block text-sm text-zere-deep border-b border-zere-deep/40 hover:border-zere-deep transition-colors"
            >
              Descubrir Zere Studio
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Comunidad */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 bg-beige-sand/40">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow>Comunidad</Eyebrow>
            <h2 className="text-3xl sm:text-4xl text-earth-brown mt-4 mb-6 text-balance">
              Una red que se sostiene entre mujeres
            </h2>
            <p className="text-charcoal/70 max-w-xl mx-auto leading-relaxed mb-8">
              Un directorio de socias para encontrarse, colaborar y
              recomendarse entre sí, por nombre, profesión o palabra clave.
            </p>
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
        </div>
      </section>

      {/* Eventos */}
      <section className="px-6 sm:px-10 py-20 sm:py-28">
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
                key={type}
                variants={fadeUp}
                className="rounded-full border border-earth-brown/25 px-5 py-2 text-sm text-earth-brown"
              >
                {type}
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
      <section className="px-6 sm:px-10 py-20 sm:py-28 bg-beige-sand/40">
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
            className="grid sm:grid-cols-3 gap-5"
          >
            {ADDON_DIMENSIONS.map((dimension) => (
              <motion.div
                key={dimension.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="rounded-2xl border border-earth-brown/15 bg-cream p-6 hover:border-earth-brown/35 transition-colors"
              >
                <h3 className="font-serif text-2xl text-earth-brown mb-1">
                  {dimension.name}
                </h3>
                <p className="text-sm text-charcoal/70 mb-3">
                  {dimension.tagline}
                </p>
                <p className="text-xs text-charcoal/50 leading-relaxed">
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
          <h2 className="text-3xl sm:text-5xl text-cream text-balance">
            ¿Lista para editar tu vida{" "}
            <span className="italic font-normal">desde adentro?</span>
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
