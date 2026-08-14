import { EventForm } from "../event-form";
import { createEventAction } from "../actions";

export default function NuevoEventoPage() {
  return (
    <div className="px-6 sm:px-10 pb-20 max-w-4xl mx-auto w-full">
      <h1 className="text-3xl text-earth-brown mb-8">Nuevo evento</h1>
      <EventForm action={createEventAction} submitLabel="Crear evento" />
    </div>
  );
}
