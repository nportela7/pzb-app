const CLIENTES = [
  "Directores de Recursos Humanos que buscan experiencias de bienestar y cohesión para sus equipos",
  "Facilitadoras y coaches que necesitan un espacio o socio para producir sus propios retiros y talleres",
  "Speakers y formadoras que quieren dar sus sesiones en un entorno curado y profesional",
  "Líderes empresariales que buscan retiros de liderazgo y toma de decisiones con intención",
  "Marcas y organizaciones que quieren crear experiencias memorables para sus comunidades internas",
];

const FORMATOS = [
  {
    title: "Talleres",
    body: "Aprendizaje en acción para equipos y organizaciones. Espacios para destrabar, activar y dar herramientas concretas.",
  },
  {
    title: "Cenas corporativas",
    body: "Una mesa bien elegida lo cambia todo. Reunión de personas clave en ambiente íntimo donde las conversaciones que importan finalmente suceden.",
  },
  {
    title: "Retiros",
    body: "Un espacio para pausar, ordenar y reconectar. Diseñado para equipos de liderazgo o comunidades profesionales que necesitan salir del ruido y volver con claridad.",
  },
  {
    title: "Experiencias",
    body: "Momentos curados con propósito para empresas y grupos. Una vivencia que deja marca en quien asiste y en la cultura que se construye.",
  },
];

const PROCESO = [
  { number: "01", title: "Escuchar", body: "Entender qué quieres transmitir, a quién y por qué." },
  { number: "02", title: "Curar", body: "Definir el concepto, el tono y a quién reunimos en la sala." },
  { number: "03", title: "Diseñar", body: "Dar forma a cada detalle: espacio, atmósfera, ritmo y experiencia sensorial." },
  { number: "04", title: "Ejecutar", body: "Todo fluye el día del evento; el cliente solo tiene que estar presente." },
];

const CONTACT_HREF =
  "https://wa.me/525574141480?text=" +
  encodeURIComponent("Hola, quiero explorar una colaboración con Zere Studio.");

export default function ZereStudioPage() {
  return (
    <div className="flex-1 bg-cream">
      <section className="px-6 sm:px-10 pt-20 pb-16 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-slate mb-5">
          Experiencias con intención
        </p>
        <h1 className="text-4xl sm:text-5xl text-earth-brown mb-6">
          Zere <span className="italic font-normal">Studio</span>
        </h1>
        <p className="text-lg text-charcoal/80 leading-relaxed max-w-xl">
          Un espacio donde la calma se convierte en acción. El brazo de Pilar
          para el mundo corporativo y formativo: experiencias diseñadas para
          empresas, equipos de RH, facilitadoras y speakers.
        </p>
      </section>

      <section className="px-6 sm:px-10 py-16 bg-beige-sand/40">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif italic text-2xl text-earth-brown leading-snug max-w-lg">
            &ldquo;Conectar mente, cuerpo y alma. Una experiencia
            transformadora no sucede sola: nace de reunir a las personas
            correctas en un entorno cuidado.&rdquo;
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl text-earth-brown mb-8">Para quién</h2>
        <ul className="flex flex-col divide-y divide-beige-sand">
          {CLIENTES.map((item) => (
            <li key={item} className="py-4 text-charcoal/80 leading-relaxed max-w-lg">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 sm:px-10 py-16 bg-beige-sand/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-earth-brown mb-10">Formatos</h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {FORMATOS.map((formato) => (
              <div key={formato.title}>
                <h3 className="text-lg text-charcoal mb-2">{formato.title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {formato.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl text-earth-brown mb-10">Cómo trabajamos</h2>
        <ol className="flex flex-col gap-8">
          {PROCESO.map((paso) => (
            <li key={paso.number} className="grid grid-cols-[3.5rem_1fr] gap-4 sm:gap-8">
              <span className="font-serif text-3xl text-earth-brown/25">
                {paso.number}
              </span>
              <div>
                <h3 className="text-lg text-charcoal mb-1">{paso.title}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed max-w-md">
                  {paso.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-6 sm:px-10 pb-20">
        <div className="max-w-3xl mx-auto rounded-2xl bg-dark-pine text-cream px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl mb-1">¿Tienen un equipo o comunidad?</h3>
            <p className="text-cream/80 text-sm">
              Cuéntanos qué buscan y exploramos si Zere Studio encaja.
            </p>
          </div>
          <a
            href={CONTACT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-cream text-dark-pine px-6 py-3 text-sm font-medium whitespace-nowrap hover:bg-beige-sand transition-colors"
          >
            Cotizar experiencia
          </a>
        </div>
      </section>
    </div>
  );
}
