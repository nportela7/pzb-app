import Image from "next/image";

const WHATSAPP_HREF =
  "https://wa.me/525574141480?text=" +
  encodeURIComponent("Hola Pilar, me encantaría conocer más de tu trabajo.");

export default function SobrePilarPage() {
  return (
    <div className="flex-1 bg-cream">
      <section className="px-6 sm:px-10 pt-20 pb-16 max-w-3xl mx-auto">
        <p className="font-serif italic text-2xl sm:text-3xl text-earth-brown leading-snug max-w-xl">
          &ldquo;Creo que la vida se vive, no se mide. Y que las mejores
          decisiones nunca vienen de la obediencia, sino de escucharte
          realmente para entender quién eres y lo que tienes que soltar.&rdquo;
        </p>
      </section>

      <section className="px-6 sm:px-10 pb-16 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-slate mb-4">
          Sobre Pilar
        </p>
        <h1 className="text-3xl sm:text-4xl text-earth-brown mb-6">
          Pilar Zambrano B.
        </h1>
        <p className="text-charcoal/80 leading-relaxed max-w-xl mb-4">
          Emprendedora, inversionista y consejera. Se define a sí misma como
          Strategic Life Editor: alguien que ayuda a sus clientas a editar su
          vida desde adentro hacia afuera, integrando identidad, imagen y
          decisiones.
        </p>
        <p className="text-charcoal/80 leading-relaxed max-w-xl">
          Creció en Monterrey, estudió en Boston y Madrid, y lleva 11 años en
          Ciudad de México. Fundó UMA, una comunidad de mujeres líderes que
          dirigió casi cuatro años. En 2024 recibió el Premio Mujeres en las
          Artes por impulsar el bienestar y la conexión entre mujeres en
          México. Hoy esa comunidad vive a través de Life Notes, una red de
          275 mujeres.
        </p>
      </section>

      <section className="px-6 sm:px-10 py-16 bg-beige-sand/40">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8 items-center">
          <p className="text-charcoal/80 leading-relaxed max-w-xl">
            Ha invertido como ángel en marcas de wellness y participa en
            diversos consejos directivos. Su ancla personal son los
            caballos; su creencia de trabajo: verse bien y sentirse bien van
            de la mano.
          </p>
          <div className="w-full sm:w-40 aspect-[3/4] rounded-2xl overflow-hidden shrink-0">
            <Image
              src="/images/horse-field-portrait.jpg"
              alt="Un caballo de pie en un campo, el ancla personal de Pilar"
              width={3148}
              height={4737}
              className="w-full h-full object-cover"
              sizes="160px"
            />
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
