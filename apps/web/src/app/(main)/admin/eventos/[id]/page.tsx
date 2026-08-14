import { notFound } from "next/navigation";
import { getEventById } from "@/lib/events";
import { EventForm } from "../event-form";
import { updateEventAction, deleteEventAction } from "../actions";

export default async function EditarEventoPage(
  props: PageProps<"/admin/eventos/[id]">
) {
  const { id } = await props.params;
  const event = await getEventById(id);
  if (!event) notFound();

  return (
    <div className="px-6 sm:px-10 pb-20 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl text-earth-brown">Editar evento</h1>
        <form action={deleteEventAction.bind(null, id)}>
          <button
            type="submit"
            className="text-sm text-slate hover:text-red-700 transition-colors"
          >
            Eliminar
          </button>
        </form>
      </div>
      <EventForm
        event={event}
        action={updateEventAction.bind(null, id)}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}
