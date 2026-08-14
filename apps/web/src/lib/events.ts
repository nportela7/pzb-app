import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import {
  EVENTS_COLLECTION,
  type EventDoc,
  type EventInput,
  type EventType,
} from "@/models/event";

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

export async function adminListEvents() {
  const db = await getDb();
  return db
    .collection<EventDoc>(EVENTS_COLLECTION)
    .find({})
    .sort({ startsAt: -1 })
    .limit(200)
    .toArray();
}

export async function getEventById(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  return db
    .collection<EventDoc>(EVENTS_COLLECTION)
    .findOne({ _id: new ObjectId(id) });
}

export async function createEvent(input: EventInput) {
  const db = await getDb();
  const result = await db
    .collection<EventInput>(EVENTS_COLLECTION)
    .insertOne(input);
  return result.insertedId;
}

export async function updateEvent(
  id: string,
  input: Partial<Omit<EventInput, "createdByClerkUserId" | "createdAt">>
) {
  const db = await getDb();
  await db
    .collection<EventDoc>(EVENTS_COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: input });
}

export async function deleteEvent(id: string) {
  const db = await getDb();
  await db
    .collection<EventDoc>(EVENTS_COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
}
