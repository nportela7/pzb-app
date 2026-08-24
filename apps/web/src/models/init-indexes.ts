import { getDb } from "@/lib/mongodb";
import { MEMBERS_COLLECTION } from "./member";
import { EVENTS_COLLECTION, EVENT_REGISTRATIONS_COLLECTION } from "./event";
import { COACHING_SESSIONS_COLLECTION } from "./coaching-session";

export async function initIndexes() {
  const db = await getDb();
  const results: { label: string; ok: boolean; error?: string }[] = [];

  const steps: [string, () => Promise<unknown>][] = [
    [
      "members: member_search (text)",
      () =>
        db.collection(MEMBERS_COLLECTION).createIndex(
          { name: "text", profession: "text", keywords: "text", bio: "text" },
          { name: "member_search", weights: { name: 5, profession: 4, keywords: 3, bio: 1 } }
        ),
    ],
    [
      "members: clerkUserId (unique)",
      () => db.collection(MEMBERS_COLLECTION).createIndex({ clerkUserId: 1 }, { unique: true }),
    ],
    [
      "members: email (unique)",
      () => db.collection(MEMBERS_COLLECTION).createIndex({ email: 1 }, { unique: true }),
    ],
    ["events: startsAt", () => db.collection(EVENTS_COLLECTION).createIndex({ startsAt: 1 })],
    ["events: status", () => db.collection(EVENTS_COLLECTION).createIndex({ status: 1 })],
    [
      "event_registrations: eventId+memberClerkUserId (unique)",
      () =>
        db
          .collection(EVENT_REGISTRATIONS_COLLECTION)
          .createIndex({ eventId: 1, memberClerkUserId: 1 }, { unique: true }),
    ],
    [
      "coaching_sessions: memberClerkUserId",
      () => db.collection(COACHING_SESSIONS_COLLECTION).createIndex({ memberClerkUserId: 1 }),
    ],
    [
      "coaching_sessions: scheduledAt",
      () => db.collection(COACHING_SESSIONS_COLLECTION).createIndex({ scheduledAt: 1 }),
    ],
  ];

  // Run every index independently — a failure on one (e.g. a unique
  // index rejected by pre-existing duplicate data) must not block the
  // others, especially the text index the search feature depends on.
  for (const [label, run] of steps) {
    try {
      await run();
      results.push({ label, ok: true });
    } catch (err) {
      results.push({
        label,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return results;
}
