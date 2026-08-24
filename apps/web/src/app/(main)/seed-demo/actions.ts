"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMemberByClerkUserId } from "@/lib/members";
import { getDb } from "@/lib/mongodb";
import { MEMBERS_COLLECTION } from "@/models/member";
import { EVENTS_COLLECTION } from "@/models/event";
import { initIndexes } from "@/models/init-indexes";
import {
  buildDemoMembers,
  buildDemoEvents,
  DEMO_MEMBER_PREFIX,
  DEMO_EVENT_CREATOR,
} from "@/lib/demo-content";

// Temporary, owner-only tool for seeding/removing the demo community
// ahead of a client meeting. Gated by email instead of member.isAdmin
// so it works even before any admin has been set up. Remove this
// route once it's no longer needed.
const OWNER_EMAIL = "nacho.pb7@hotmail.com";

async function requireOwner() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const member = await getMemberByClerkUserId(userId);
  if (!member) redirect("/onboarding");
  if (member.email !== OWNER_EMAIL) redirect("/home");
  return member;
}

export async function seedDemoAction() {
  await requireOwner();
  const db = await getDb();
  const now = new Date();

  const members = db.collection(MEMBERS_COLLECTION);
  let memberCount = 0;
  for (const m of buildDemoMembers(now)) {
    await members.updateOne(
      { email: m.email },
      { $set: m },
      { upsert: true }
    );
    memberCount++;
  }

  const events = db.collection(EVENTS_COLLECTION);
  let eventCount = 0;
  for (const e of buildDemoEvents(now)) {
    await events.updateOne(
      { title: e.title, createdByClerkUserId: DEMO_EVENT_CREATOR },
      { $set: e },
      { upsert: true }
    );
    eventCount++;
  }

  return { memberCount, eventCount };
}

export async function initIndexesAction() {
  await requireOwner();
  return initIndexes();
}

export async function unseedDemoAction() {
  await requireOwner();
  const db = await getDb();

  const members = await db
    .collection(MEMBERS_COLLECTION)
    .deleteMany({ clerkUserId: { $regex: `^${DEMO_MEMBER_PREFIX}` } });
  const events = await db
    .collection(EVENTS_COLLECTION)
    .deleteMany({ createdByClerkUserId: DEMO_EVENT_CREATOR });

  return { memberCount: members.deletedCount, eventCount: events.deletedCount };
}
