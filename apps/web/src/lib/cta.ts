/** Pilar's business WhatsApp — the primary conversion channel across the site. */
const WHATSAPP_NUMBER = "525574141480";

/**
 * Builds a WhatsApp deep link with the message pre-written, so the visitor
 * only has to hit send. Each surface passes its own opener, which is what
 * tells Pilar where the conversation started.
 */
export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  diagnostico:
    "Hola Pilar, quiero agendar mi sesión diagnóstico para conocer The Alignment Partnership.",
  coaching:
    "Hola Pilar, quiero cotizar mi proceso de The Alignment Partnership.",
  addOns:
    "Hola Pilar, quiero información sobre los Add-Ons / experiencias complementarias.",
  empresas:
    "Hola, escribo de parte de una empresa y quiero conocer las experiencias de Zere Studio.",
  eventos: "Hola Pilar, quiero saber más sobre los próximos eventos.",
  general: "Hola Pilar, me encantaría conocer más de tu trabajo.",
} as const;

export const INSTAGRAM_URL = "https://www.instagram.com/pilarzambranob/";
