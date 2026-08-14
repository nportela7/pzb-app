import { getDb } from "@/lib/mongodb";
import { EVENTS_COLLECTION, type EventDoc, type EventType } from "@/models/event";

export async function listUpcomingEvents(type?: EventType) {
  const db = await getDb();
  const filter: Record<string, unknown> = {
    status: "published",
    startsAt: { $gte: new Date() },
  };
  if (type) filter.type = type;

  return db
    .collection<EventDoc>(EVENTS_COLLECTION)
    .find(filter)
    .sort({ startsAt: 1 })
    .limit(50)
    .toArray();
}
