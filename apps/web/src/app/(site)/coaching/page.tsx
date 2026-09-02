import { Grain } from "@/components/Grain";
import { CoachingPhaseTabs } from "@/components/CoachingPhaseTabs";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

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

const WHATSAPP_HREF = whatsappHref(WHATSAPP_MESSAGES.coaching);

export default function CoachingPage() {
  return (
    <div className="flex-1 bg-cream">
      <section
        className="relative overflow-hidden px-6 sm:px-10 pt-10 pb-16 bg-beige-sand"
        style={{
          backgroundImage:
            "radial-gradient(rgba(54,54,54,.14) 1px, transparent 1px)",
          backgroundSize: "15px 15px",
        }}
      >
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 border-2 border-dark-pine text-dark-pine font-semibold text-xs tracking-[0.18em] uppercase px-4 py-1.5 -rotate-3 rounded-sm opacity-85 mb-7">
            Expediente activo
          </span>
          <h1 className="text-4xl sm:text-5xl text-charcoal mb-6 max-w-lg">
            The Alignment Partnership
          </h1>
          <p className="text-lg text-charcoal/75 leading-relaxed max-w-xl mb-12">
            Seis meses trabajando identidad, imagen y decisiones como un
            solo expediente: se abre, se documenta cada sesión, y se cierra
            con un plan que se sostiene solo.
          </p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 text-sm max-w-xl">
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
      </section>

      <section className="px-6 sm:px-10 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-slate mb-3">
            El proceso
          </p>
          <h2 className="text-2xl text-earth-brown mb-10">
            Tres fases, un solo expediente
          </h2>
          <CoachingPhaseTabs phases={PHASES} whatsappHref={WHATSAPP_HREF} />
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
