"use client";

import { useState } from "react";

type Phase = {
  number: string;
  title: string;
  sessions: string;
  body: string;
  result: string;
};

export function CoachingPhaseTabs({
  phases,
  whatsappHref,
}: {
  phases: Phase[];
  whatsappHref: string;
}) {
  const [active, setActive] = useState(0);
  const lastIndex = phases.length; // cotización panel index

  return (
    <div>
      <div className="flex gap-1 pl-2">
        {phases.map((phase, i) => (
          <button
            key={phase.number}
            onClick={() => setActive(i)}
            className={`text-sm font-medium px-5 py-3.5 rounded-t-lg mt-1.5 transition-all cursor-pointer ${
              active === i
                ? "bg-arena opacity-100 !mt-0 !pt-4 font-semibold text-medianoche shadow-[0_-2px_6px_rgba(14,98,127,.06)]"
                : "bg-cielo/70 opacity-60 hover:opacity-85 text-medianoche"
            }`}
          >
            Fase {phase.number}
          </button>
        ))}
        <button
          onClick={() => setActive(lastIndex)}
          className={`text-sm font-medium px-5 py-3.5 rounded-t-lg mt-1.5 transition-all cursor-pointer ${
            active === lastIndex
              ? "bg-arena opacity-100 !mt-0 !pt-4 font-semibold text-medianoche shadow-[0_-2px_6px_rgba(14,98,127,.06)]"
              : "bg-cielo/70 opacity-60 hover:opacity-85 text-medianoche"
          }`}
        >
          Cotización
        </button>
      </div>

      <div className="bg-arena px-8 sm:px-11 pt-9 pb-7 shadow-[0_8px_20px_rgba(14,98,127,.06)]">
        {phases.map(
          (phase, i) =>
            active === i && (
              <div key={phase.number}>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-capuccino mb-3">
                  Fase {phase.number} &middot; {phase.sessions}
                </p>
                <h3 className="text-2xl sm:text-3xl text-medianoche mb-4">
                  {phase.title}
                </h3>
                <p className="text-medianoche/80 leading-relaxed max-w-lg mb-3">
                  {phase.body}
                </p>
                <span className="inline-block text-xs uppercase tracking-wide text-capuccino border-b border-capuccino/40 pb-0.5 mb-8">
                  Resultado: {phase.result}
                </span>

                <div className="flex justify-between items-center border-t border-medianoche/10 pt-5 mt-1">
                  <button
                    onClick={() => setActive(Math.max(0, i - 1))}
                    className={`text-sm font-medium text-medianoche hover:text-coral transition-colors ${
                      i === 0 ? "invisible" : ""
                    }`}
                  >
                    &larr; Fase anterior
                  </button>
                  <div className="flex gap-1.5">
                    {[...phases, null].map((_, dotI) => (
                      <span
                        key={dotI}
                        className={`w-1.5 h-1.5 rounded-full ${
                          dotI === active ? "bg-medianoche" : "bg-medianoche/20"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActive(i + 1)}
                    className="text-sm font-medium text-medianoche hover:text-coral transition-colors"
                  >
                    {i === phases.length - 1
                      ? "Ver cotización →"
                      : "Siguiente fase →"}
                  </button>
                </div>
              </div>
            )
        )}

        {active === lastIndex && (
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-capuccino mb-3">
              Cotización &middot; a la medida
            </p>
            <h3 className="text-2xl sm:text-3xl text-medianoche mb-4">
              Cada expediente se cotiza distinto
            </h3>
            <p className="font-serif italic text-xl leading-relaxed text-medianoche max-w-lg mb-7">
              No hay dos procesos iguales — la inversión se define según lo
              que tu expediente necesita resolver.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-medianoche text-arena px-7 py-3 text-sm hover:bg-medianoche transition-colors"
            >
              Cotizar mi proceso
            </a>

            <div className="flex justify-between items-center border-t border-medianoche/10 pt-5 mt-9">
              <button
                onClick={() => setActive(lastIndex - 1)}
                className="text-sm font-medium text-medianoche hover:text-coral transition-colors"
              >
                &larr; Volver al proceso
              </button>
              <div className="flex gap-1.5">
                {[...phases, null].map((_, dotI) => (
                  <span
                    key={dotI}
                    className={`w-1.5 h-1.5 rounded-full ${
                      dotI === active ? "bg-medianoche" : "bg-medianoche/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm invisible">Siguiente fase &rarr;</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
