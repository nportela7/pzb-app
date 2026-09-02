export type Testimonial = {
  id: string;
  /** Verbatim. Never edit a client's words to make them sell harder. */
  quote: string;
  /** Only with the client's permission to be named publicly. */
  author?: string;
  /** What she did — grounds the quote in a real service. */
  context?: string;
  /** Portrait, once permission and the file exist. Put it in /public/images. */
  photoUrl?: string;
  /**
   * A recorded testimonial. When this is set the card leads with the video
   * and the quote becomes its caption — the strongest form of proof there is.
   * `poster` is required so the card never renders as a black rectangle.
   */
  video?: { src: string; poster: string };
};

/**
 * ── CÓMO SUBIR DE NIVEL ESTA SECCIÓN ──────────────────────────────────
 * El carrusel ya soporta los tres niveles de prueba. Cada uno es un cambio
 * de datos acá, no un rediseño:
 *
 *   1. Anónimo      → solo `quote`. Es lo más débil: se lee como copy.
 *   2. Con nombre   → agregar `author` (+ `context` y `photoUrl` si hay).
 *   3. Con video    → agregar `video: { src, poster }`. Máximo impacto.
 *
 * Las citas de abajo son textuales, tal como estaban en /coaching. Solo la
 * primera llegó con permiso para usar el nombre.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "jeanette",
    quote:
      "Llevo tres años consecutivos haciendo la sesión de Vision Board con Pilar Zambrano y, honestamente, se ha convertido en uno de mis momentos más estratégicos del año.",
    author: "Jeanette Jossbell",
    // Both facts come from her own words above, not from us.
    context: "Vision Board Session · 3 años consecutivos",
  },
  {
    id: "voz-publica",
    quote:
      "El coaching de Pilar fue más allá de la vestimenta, me ayudó a sentirme segura conmigo misma y a tener las herramientas para hablar en público.",
  },
  {
    id: "estructura-cercania",
    quote:
      "Trabajar con Pili fue una experiencia súper valiosa. Tiene ese balance entre estructura y cercanía que hace el proceso muy humano.",
  },
  {
    id: "decisiones",
    quote:
      "Mis sesiones han sido vitales para encontrar respuestas que me ayudaron a tomar importantes decisiones en mi vida.",
  },
];
