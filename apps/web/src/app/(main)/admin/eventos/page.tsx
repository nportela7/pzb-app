import Link from "next/link";
import { adminListEvents } from "@/lib/events";
import { EVENT_TYPE_LABELS } from "@/models/event";
import { deleteEventAction, toggleStatusAction } from "./actions";

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const STATUS_LABELS: Record<string, string> = {
  draft: "Borrador",
  published: "Publicado",
  cancelled: "Cancelado",
};

export default async function AdminEventosPage() {
  const events = await adminListEvents();

  return (
    <div className="px-6 sm:px-10 pb-20 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl text-earth-brown">Eventos</h1>
        <Link
          href="/admin/eventos/nuevo"
          className="rounded-full bg-earth-brown text-cream px-5 py-2.5 text-sm font-medium hover:bg-charcoal transition-colors"
        >
          + Nuevo evento
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-charcoal/70">
          Todavía no has creado ningún evento.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-beige-sand">
          {events.map((event) => {
            const id = event._id.toString();
            const nextStatus = event.status === "published" ? "draft" : "published";
            return (
              <li key={id} className="py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        event.status === "published"
                          ? "bg-dark-pine/15 text-dark-pine"
                          : event.status === "cancelled"
                            ? "bg-charcoal/10 text-charcoal/60"
                            : "bg-beige-sand text-charcoal/70"
                      }`}
                    >
                      {STATUS_LABELS[event.status]}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-slate">
                      {EVENT_TYPE_LABELS[event.type]}
                    </span>
                  </div>
                  <p className="text-charcoal font-medium">{event.title}</p>
                  <p className="text-sm text-slate mt-0.5">
                    {dateFormatter.format(event.startsAt)}
                    {event.location ? ` · ${event.location}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href={`/admin/eventos/${id}`}
                    className="text-earth-brown hover:text-charcoal transition-colors"
                  >
                    Editar
                  </Link>
                  <form action={toggleStatusAction.bind(null, id, nextStatus)}>
                    <button type="submit" className="text-slate hover:text-earth-brown transition-colors">
                      {event.status === "published" ? "Pasar a borrador" : "Publicar"}
                    </button>
                  </form>
                  <form action={deleteEventAction.bind(null, id)}>
                    <button type="submit" className="text-slate hover:text-red-700 transition-colors">
                      Eliminar
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
