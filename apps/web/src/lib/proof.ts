export type ProofPoint = {
  /** Left null until someone confirms the real figure. Nulls don't render. */
  value: string | null;
  label: string;
  /** Where the number comes from, so nobody has to re-litigate it later. */
  source: string;
};

/**
 * ── NÚMEROS PENDIENTES ────────────────────────────────────────────────
 * Una página comercial necesita cifras, pero una cifra inventada es peor
 * que ninguna: es la primera cosa que un cliente verifica.
 *
 * Regla: `value: null` NO se renderiza. Completá con datos confirmados
 * por Pilar y aparecen solos. No hace falta tocar nada más.
 */
export const PROOF_POINTS: ProofPoint[] = [
  {
    // Del doc de kickoff: el grupo de WhatsApp "Life Notes" tenía ~250-270
    // personas. CONFIRMAR con Pilar antes de publicar.
    value: "+250",
    label: "Mujeres en la comunidad",
    source: "kickoff-app-life-notes.md — confirmar cifra actual",
  },
  {
    // Ya publicado en la propia página (sección Sobre Pilar).
    value: "11 años",
    label: "En Ciudad de México",
    source: "Timeline de Sobre Pilar",
  },
  {
    value: null,
    label: "Años acompañando procesos",
    source: "PENDIENTE — preguntar a Pilar",
  },
  {
    value: null,
    label: "Clientas acompañadas",
    source: "PENDIENTE — preguntar a Pilar",
  },
  {
    value: null,
    label: "Encuentros realizados",
    source: "PENDIENTE — preguntar a Pilar",
  },
];

export const VISIBLE_PROOF_POINTS = PROOF_POINTS.filter(
  (p): p is ProofPoint & { value: string } => p.value !== null,
);
