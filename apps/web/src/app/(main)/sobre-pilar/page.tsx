import Image from "next/image";

const WHATSAPP_HREF =
  "https://wa.me/525574141480?text=" +
  encodeURIComponent("Hola Pilar, me encantaría conocer más de tu trabajo.");

const TIMELINE = [
  { place: "Monterrey", tag: "Origen" },
  { place: "Boston & Madrid", tag: "Formación" },
  { place: "Ciudad de México", tag: "Hoy · 11 años" },
];

export default function SobrePilarPage() {
  return (
    <div className="flex-1 bg-cream">
      <section className="px-6 sm:px-10 pt-16 pb-6 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-md overflow-hidden shadow-[0_24px_48px_-20px_rgba(89,68,52,0.35)]">
              <Image
                src="/images/pilar-portrait.jpg"
                alt="Pilar Zambrano B."
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="border-l-2 border-earth-brown pl-4 mt-4 max-w-sm mx-auto lg:max-w-none">
              <p className="font-serif italic font-light text-sm text-earth-brown/85 leading-relaxed">
                &ldquo;La vida se vive, no se mide.&rdquo;
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-serif text-5xl sm:text-6xl leading-[1.02] text-earth-brown mb-1">
              Pilar
              <br />
              Zambrano B.
            </h1>
            <p className="font-script text-2xl text-charcoal/55 mb-6">
              Strategic Life Editor
            </p>
            <p className="text-charcoal/80 leading-relaxed max-w-md mb-8">
              Emprendedora, inversionista y consejera. Ayuda a sus clientas a
              editar su vida desde adentro hacia afuera, integrando
              identidad, imagen y decisiones.
            </p>
            <div className="flex gap-9 pt-6 border-t border-earth-brown/20">
              <div>
                <p className="text-[0.65rem] tracking-[0.14em] uppercase text-slate mb-1">
                  Fundó
                </p>
                <p className="font-serif text-lg text-earth-brown">UMA</p>
              </div>
              <div>
                <p className="text-[0.65rem] tracking-[0.14em] uppercase text-slate mb-1">
                  Hoy
                </p>
                <p className="font-serif text-lg text-earth-brown">PZB.</p>
              </div>
              <div>
                <p className="text-[0.65rem] tracking-[0.14em] uppercase text-slate mb-1">
                  2024
                </p>
                <p className="font-serif text-lg text-earth-brown">
                  Premio Mujeres en las Artes
                </p>
              </div>
            </div>
          </div>
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
              href="https://instagram.com/pilarzambranob"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream/90 hover:text-cream transition-colors whitespace-nowrap"
            >
              @pilarzambranob
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
