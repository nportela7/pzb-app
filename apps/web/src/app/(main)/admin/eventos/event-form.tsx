import type { EventDoc } from "@/models/event";
import { EVENT_TYPE_LABELS } from "@/models/event";

function toLocalInputValue(date?: Date) {
  if (!date) return "";
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function EventForm({
  event,
  action,
  submitLabel,
}: {
  event?: EventDoc;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-6 max-w-xl">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium text-medianoche">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={event?.title}
          className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="text-sm font-medium text-medianoche">
            Tipo
          </label>
          <select
            id="type"
            name="type"
            defaultValue={event?.type ?? "taller"}
            className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
          >
            {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-medium text-medianoche">
            Estatus
          </label>
          <select
            id="status"
            name="status"
            defaultValue={event?.status ?? "draft"}
            className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
          >
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium text-medianoche">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={event?.description}
          className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="coverImageUrl" className="text-sm font-medium text-medianoche">
          Imagen del banner (URL)
        </label>
        <input
          id="coverImageUrl"
          name="coverImageUrl"
          type="url"
          defaultValue={event?.coverImageUrl}
          placeholder="https://..."
          className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
        />
        <p className="text-xs text-medianoche/60">
          Si se deja vacío se usa la imagen por defecto del tipo de evento.
          Horizontal, mínimo 1600px de ancho.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="startsAt" className="text-sm font-medium text-medianoche">
            Empieza
          </label>
          <input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            required
            defaultValue={toLocalInputValue(event?.startsAt)}
            className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="endsAt" className="text-sm font-medium text-medianoche">
            Termina (opcional)
          </label>
          <input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            defaultValue={toLocalInputValue(event?.endsAt)}
            className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="text-sm font-medium text-medianoche">
          Ubicación
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={event?.location}
          placeholder="Ej. Estudio Pilar, CDMX"
          className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-medianoche">
        <input
          type="checkbox"
          name="isOnline"
          defaultChecked={event?.isOnline}
          className="accent-medianoche"
        />
        Es en línea
      </label>

      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="text-sm font-medium text-medianoche">
          Precio (MXN, dejar en 0 si es sin costo)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min={0}
          step={1}
          defaultValue={event ? event.priceCents / 100 : 0}
          className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche"
        />
      </div>

      <button
        type="submit"
        className="self-start rounded-full bg-medianoche text-arena px-6 py-2.5 text-sm font-medium hover:bg-medianoche transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}
