import Image from "next/image";
import { Grain } from "@/components/Grain";

const PHASES = [
  {
    number: "01",
    title: "Descubrir y Explorar",
    sessions: "Sesiones 1–3",
    body: "Ver con claridad dónde estás hoy, qué está funcionando y qué ya no termina de reflejarte. Se trabajan roles sostenidos por costumbre y narrativas que ya no encajan.",
    result: "Mapa claro de qué conservar y qué soltar.",
  },
  {
    number: "02",
    title: "Editar y Reescribir",
    sessions: "Sesiones 4–5",
    body: "Editar lo que ya no encaja y reescribir la narrativa con la que apareces frente al mundo. Se ajusta el lenguaje interno, el discurso profesional y la manera de presentarse.",
    result: "Las decisiones pasan de venir de la exigencia a venir de la elección.",
  },
  {
    number: "03",
    title: "Integrar y Sostener",
    sessions: "Sesiones 6–8",
    body: "Integrar todo en una manera de estar y aparecer que se sostiene sola. Se cierra con las decisiones y siguientes pasos desde el nuevo lugar.",
    result: "La imagen no es una sesión aparte, es una capa que corre en paralelo durante todo el proceso.",
  },
];

const INVESTMENT = [
  { modalidad: "Programa base (precio regular)", monto: "$48,000 MXN", detalle: "+ IVA" },
  { modalidad: "Re-Launch Member (15% dto.)", monto: "$40,800 MXN", detalle: "+ IVA" },
  { modalidad: "Contado (5% adicional)", monto: "$38,760 MXN", detalle: "+ IVA" },
  { modalidad: "2 pagos (inicio + mes 3)", monto: "$19,890 MXN c/u", detalle: "+ IVA · 2.5% adicional" },
  { modalidad: "4 mensualidades", monto: "$10,200 MXN c/u", detalle: "+ IVA" },
];

const TESTIMONIALS = [
  {
    quote:
      "El coaching de Pilar fue más allá de la vestimenta, me ayudó a sentirme segura conmigo misma y a tener las herramientas para hablar en público.",
  },
  {
    quote:
      "Trabajar con Pili fue una experiencia súper valiosa. Tiene ese balance entre estructura y cercanía que hace el proceso muy humano.",
  },
  {
    quote:
      "Mis sesiones han sido vitales para encontrar respuestas que me ayudaron a tomar importantes decisiones en mi vida.",
  },
  {
    quote:
      "Llevo tres años consecutivos haciendo la sesión de Vision Board con Pilar Zambrano y, honestamente, se ha convertido en uno de mis momentos más estratégicos del año.",
    author: "Jeanette Jossbell",
  },
];

const WHATSAPP_HREF =
  "https://wa.me/525574141480?text=" +
  encodeURIComponent(
    "Hola Pilar, quiero agendar mi sesión diagnóstico de The Alignment Partnership."
  );

export default function CoachingPage() {
  return (
    <div className="flex-1 bg-cream">
      <section className="relative overflow-hidden px-6 sm:px-10 pt-20 pb-20">
        <Grain opacity={0.1} />
        <div className="relative max-w-3xl mx-auto grid sm:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-slate mb-5">
              Identity · Quién estás siendo
            </p>
            <h1 className="text-4xl sm:text-5xl text-earth-brown mb-6">
              The Alignment <span className="italic font-normal">Partnership</span>
            </h1>
            <p className="text-lg text-charcoal/80 leading-relaxed max-w-xl">
              El programa principal de coaching 1:1 de Pilar. Seis meses
              trabajando identidad, imagen y decisiones como una sola
              conversación.
            </p>

            <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 text-sm">
              <div>
                <dt className="text-slate mb-1">Duración</dt>
                <dd className="text-charcoal">6 meses</dd>
              </div>
              <div>
                <dt className="text-slate mb-1">Formato</dt>
                <dd className="text-charcoal">8 sesiones · 90 min</dd>
              </div>
              <div>
                <dt className="text-slate mb-1">Canal</dt>
                <dd className="text-charcoal">WhatsApp, L–V 10–19h</dd>
              </div>
              <div>
                <dt className="text-slate mb-1">Confidencialidad</dt>
                <dd className="text-charcoal">Total</dd>
              </div>
            </dl>
          </div>
          <div className="hidden sm:block w-40 aspect-[3/4] rounded-2xl overflow-hidden shrink-0">
            <Image
              src="/images/silhouette-sunset.jpg"
              alt=""
              width={2016}
              height={2016}
              className="w-full h-full object-cover"
              sizes="160px"
            />
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-20 bg-beige-sand/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-earth-brown mb-14">
            El proceso, en tres fases
          </h2>
          <ol className="flex flex-col gap-14">
            {PHASES.map((phase) => (
              <li key={phase.number} className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 sm:gap-8">
                <span className="font-serif text-4xl sm:text-5xl text-earth-brown/25">
                  {phase.number}
                </span>
                <div>
                  <h3 className="text-xl text-charcoal mb-1">{phase.title}</h3>
                  <p className="text-xs uppercase tracking-wide text-slate mb-3">
                    {phase.sessions}
                  </p>
                  <p className="text-charcoal/80 leading-relaxed max-w-lg">
                    {phase.body}
                  </p>
                  <p className="text-sm text-earth-brown italic mt-3 max-w-lg">
                    {phase.result}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-earth-brown mb-3">Inversión</h2>
          <p className="text-charcoal/70 mb-10 max-w-lg leading-relaxed">
            Incluye 8 sesiones 1:1, sesión diagnóstico inicial, lectura
            completa de Human Design (valor $3,500), herramientas iPEC y
            Coaching de Imagen, acompañamiento en marca personal, y 15% de
            descuento en add-ons mientras seas clienta activa.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-beige-sand text-xs uppercase tracking-wide text-slate">
                  <th className="py-3 pr-4 font-normal">Modalidad</th>
                  <th className="py-3 pr-4 font-normal">Inversión</th>
                  <th className="py-3 font-normal">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-sand">
                {INVESTMENT.map((row) => (
                  <tr key={row.modalidad}>
                    <td className="py-4 pr-4 text-charcoal">{row.modalidad}</td>
                    <td className="py-4 pr-4 text-charcoal font-medium whitespace-nowrap">
                      {row.monto}
                    </td>
                    <td className="py-4 text-slate text-sm">{row.detalle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 sm:px-10 py-20 bg-earth-brown text-cream">
        <Grain opacity={0.12} />
        <div className="relative max-w-3xl mx-auto">
          <p className="font-script text-4xl mb-14">Client love</p>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={i}
                className="border-t border-cream/20 pt-6 text-cream/90 leading-relaxed"
              >
                <p className="font-serif italic text-lg">&ldquo;{t.quote}&rdquo;</p>
                {t.author && (
                  <cite className="block not-italic text-sm text-cream/60 mt-3">
                    — {t.author}
                  </cite>
                )}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-earth-brown mb-4">Quién te acompaña</h2>
          <p className="text-charcoal/80 leading-relaxed max-w-xl mb-6">
            Pilar Zambrano B. es emprendedora, inversionista y consejera. Se
            define a sí misma como Strategic Life Editor: alguien que ayuda a
            sus clientas a editar su vida desde adentro hacia afuera,
            integrando identidad, imagen y decisiones.
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5 text-sm max-w-xl">
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
          </dl>
        </div>

        <div className="max-w-3xl mx-auto mt-16 rounded-2xl bg-dark-pine text-cream px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl mb-1">¿Lista para empezar?</h3>
            <p className="text-cream/80 text-sm">
              Agenda tu sesión diagnóstico y conversemos de tu proceso.
            </p>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-cream text-dark-pine px-6 py-3 text-sm font-medium whitespace-nowrap hover:bg-beige-sand transition-colors"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
