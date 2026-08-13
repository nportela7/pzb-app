import { getDb } from "@/lib/mongodb";
import { MEMBERS_COLLECTION } from "./member";
import { EVENTS_COLLECTION, EVENT_REGISTRATIONS_COLLECTION } from "./event";
import { COACHING_SESSIONS_COLLECTION } from "./coaching-session";

export async function initIndexes() {
  const db = await getDb();

  await db
    .collection(MEMBERS_COLLECTION)
    .createIndex({ clerkUserId: 1 }, { unique: true });
  await db.collection(MEMBERS_COLLECTION).createIndex({ email: 1 }, { unique: true });
  await db.collection(MEMBERS_COLLECTION).createIndex(
    { name: "text", profession: "text", keywords: "text", bio: "text" },
    { name: "member_search", weights: { name: 5, profession: 4, keywords: 3, bio: 1 } }
  );

  await db.collection(EVENTS_COLLECTION).createIndex({ startsAt: 1 });
  await db.collection(EVENTS_COLLECTION).createIndex({ status: 1 });

  await db
    .collection(EVENT_REGISTRATIONS_COLLECTION)
    .createIndex({ eventId: 1, memberClerkUserId: 1 }, { unique: true });

  await db
    .collection(COACHING_SESSIONS_COLLECTION)
    .createIndex({ memberClerkUserId: 1 });
  await db
    .collection(COACHING_SESSIONS_COLLECTION)
    .createIndex({ scheduledAt: 1 });
}
