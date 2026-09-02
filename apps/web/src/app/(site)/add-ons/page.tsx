import { Grain } from "@/components/Grain";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

const DIMENSIONS = [
  {
    name: "Identity",
    tagline: "Quién estás siendo",
    accent: "bg-earth-brown",
    items: [
      { title: "Deep Dive Session", detail: "2 horas · Sesión para ir al fondo de algo específico" },
      { title: "Energy Assessment", detail: "iPEC · 7 niveles · Perfil energético" },
      { title: "Human Design", detail: "Lectura + interpretación · Cómo decides mejor" },
    ],
  },
  {
    name: "Image",
    tagline: "Cómo te muestras",
    accent: "bg-dark-pine",
    items: [
      { title: "Closet Detox", detail: "3–4 horas · Editamos qué ya no te representa" },
      { title: "Closet Styling", detail: "2–3 horas · 8–12 looks nuevos con lo que ya tienes" },
      { title: "Shopping Day", detail: "Día completo · comisión sobre lo comprado" },
      { title: "Photoshoot", detail: "Branding personal con partners de confianza" },
    ],
  },
  {
    name: "Decision",
    tagline: "Qué eliges desde aquí",
    accent: "bg-slate",
    items: [
      { title: "Vision Board Session", detail: "2–3 horas · Plasmar lo que quieres para decidir con claridad" },
      { title: "Strategic Network Intro", detail: "Por conexión · Conexión intencional con la red de Pilar" },
      { title: "Decision Intensive", detail: "3 horas + seguimiento · Llegas con el dilema, sales con dirección" },
    ],
  },
];

const COMBOS = [
  {
    title: "The Visual Edit",
    detail: "Closet Detox + Closet Styling + Photoshoot consult",
  },
  {
    title: "The Strategic Edit",
    detail: "Vision Board Session + Decision Intensive",
  },
  {
    title: "The Full Transformation",
    detail: "Las 3 dimensiones juntas, diseñado a la medida",
  },
];

const WHATSAPP_HREF = whatsappHref(WHATSAPP_MESSAGES.addOns);

export default function AddOnsPage() {
  return (
    <div className="flex-1 bg-cream">
      <section className="relative overflow-hidden px-6 sm:px-10 pt-10 pb-16">
        <Grain opacity={0.12} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-slate mb-5">
            Add-Ons &amp; Coaching de Imagen · Cómo te muestras
          </p>
          <h1 className="text-4xl sm:text-5xl text-earth-brown mb-6">
            Experiencias <span className="italic font-normal">complementarias</span>
          </h1>
          <p className="text-lg text-charcoal/80 leading-relaxed max-w-xl">
            Se agregan al programa principal cuando aparece la necesidad. No
            se contratan todos de entrada: Pilar propone el correcto en el
            momento correcto. Todos son sobre cotización, ajustados a lo que
            necesitas.
          </p>
        </div>
      </section>

      {DIMENSIONS.map((dimension, i) => (
        <section
          key={dimension.name}
          className={
            "px-6 sm:px-10 py-16 " + (i % 2 === 0 ? "bg-beige-sand/40" : "")
          }
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className={`w-2.5 h-2.5 rounded-full ${dimension.accent}`} />
              <h2 className="text-2xl text-earth-brown">{dimension.name}</h2>
              <span className="text-sm text-slate italic">
                {dimension.tagline}
              </span>
            </div>
            <ul className="divide-y divide-earth-brown/10">
              {dimension.items.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-4"
                >
                  <div>
                    <p className="text-charcoal font-medium">{item.title}</p>
                    <p className="text-sm text-slate mt-0.5 max-w-md">
                      {item.detail}
                    </p>
                  </div>
                  <p className="text-sm text-earth-brown italic whitespace-nowrap">
                    Sobre cotización
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="px-6 sm:px-10 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl text-earth-brown mb-10">Combos curados</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {COMBOS.map((combo) => (
              <div
                key={combo.title}
                className="rounded-2xl border border-beige-sand p-6 flex flex-col gap-3"
              >
                <h3 className="text-lg text-charcoal">{combo.title}</h3>
                <p className="text-sm text-slate leading-relaxed flex-1">
                  {combo.detail}
                </p>
                <p className="text-sm text-earth-brown italic">Sobre cotización</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-charcoal/70 mt-10 max-w-lg leading-relaxed">
            <span className="text-earth-brown font-medium">
              Beneficio Partnership:
            </span>{" "}
            mientras seas clienta activa de The Alignment Partnership, todos
            los add-ons, individuales y combos, tienen 15% de descuento
            automático.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-16 rounded-2xl bg-dark-pine text-cream px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl mb-1">¿No sabes cuál elegir?</h3>
            <p className="text-cream/80 text-sm">
              Cuéntale a Pilar qué necesitas y te propone el correcto.
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
