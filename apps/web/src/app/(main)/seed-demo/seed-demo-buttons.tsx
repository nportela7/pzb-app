"use client";

import { useState, useTransition } from "react";
import { seedDemoAction, unseedDemoAction, initIndexesAction } from "./actions";

export function SeedDemoButtons() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function runSeed() {
    startTransition(async () => {
      const { memberCount, eventCount } = await seedDemoAction();
      setMessage(`✓ ${memberCount} socias y ${eventCount} eventos de demo listos.`);
    });
  }

  function runUnseed() {
    startTransition(async () => {
      const { memberCount, eventCount } = await unseedDemoAction();
      setMessage(`✓ ${memberCount} socias y ${eventCount} eventos de demo borrados.`);
    });
  }

  function runInitIndexes() {
    startTransition(async () => {
      await initIndexesAction();
      setMessage("✓ Índices de la base creados/actualizados (incluye búsqueda de texto).");
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={runSeed}
          disabled={pending}
          className="rounded-full bg-earth-brown text-cream px-6 py-2.5 text-sm font-medium hover:bg-charcoal transition-colors disabled:opacity-50"
        >
          Sembrar datos de demo
        </button>
        <button
          onClick={runUnseed}
          disabled={pending}
          className="rounded-full border border-earth-brown/30 text-earth-brown px-6 py-2.5 text-sm font-medium hover:border-earth-brown transition-colors disabled:opacity-50"
        >
          Borrar datos de demo
        </button>
        <button
          onClick={runInitIndexes}
          disabled={pending}
          className="rounded-full border border-earth-brown/30 text-earth-brown px-6 py-2.5 text-sm font-medium hover:border-earth-brown transition-colors disabled:opacity-50"
        >
          Crear índices de la base
        </button>
      </div>
      {message && (
        <p className="text-sm text-charcoal/80 rounded-xl bg-beige-sand/40 px-4 py-3">
          {message}
        </p>
      )}
    </div>
  );
}
