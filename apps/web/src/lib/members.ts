import { getDb } from "@/lib/mongodb";
import {
  MEMBERS_COLLECTION,
  type AccountType,
  type MemberProfile,
  type MemberProfileInput,
} from "@/models/member";

export async function getMemberByClerkUserId(clerkUserId: string) {
  const db = await getDb();
  return db
    .collection<MemberProfile>(MEMBERS_COLLECTION)
    .findOne({ clerkUserId });
}

export async function createMemberProfile(input: {
  clerkUserId: string;
  email: string;
  name: string;
  accountType: AccountType;
  profession?: string;
}) {
  const db = await getDb();
  const now = new Date();
  await db.collection<MemberProfileInput>(MEMBERS_COLLECTION).insertOne({
    clerkUserId: input.clerkUserId,
    accountType: input.accountType,
    name: input.name,
    email: input.email,
    profession: input.profession,
    keywords: [],
    interests: [],
    contactVisibility: "members",
    contactMethods: {},
    isAdmin: false,
    onboardingCompletedAt: now,
    createdAt: now,
    updatedAt: now,
  });
}

export async function searchMembers(query: string) {
  const db = await getDb();
  const collection = db.collection<MemberProfile>(MEMBERS_COLLECTION);

  if (!query.trim()) {
    return collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(30)
      .toArray();
  }

  return collection
    .find(
      { $text: { $search: query } },
      { projection: { score: { $meta: "textScore" } } }
    )
    .sort({ score: { $meta: "textScore" } })
    .limit(30)
    .toArray();
}

export async function countMembers() {
  const db = await getDb();
  return db.collection(MEMBERS_COLLECTION).countDocuments();
}

export async function listDirectory(filters: {
  q?: string;
  profession?: string;
  location?: string;
  accountType?: AccountType;
}) {
  const db = await getDb();
  const collection = db.collection<MemberProfile>(MEMBERS_COLLECTION);

  const match: Record<string, unknown> = {};
  if (filters.profession) match.profession = filters.profession;
  if (filters.location) match.location = filters.location;
  if (filters.accountType) match.accountType = filters.accountType;

  if (filters.q?.trim()) {
    return collection
      .find(
        { ...match, $text: { $search: filters.q } },
        { projection: { score: { $meta: "textScore" } } }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(200)
      .toArray();
  }

  return collection.find(match).sort({ name: 1 }).limit(200).toArray();
}

// Real filter option values, drawn from whatever the community
// actually contains — never a fixed list that goes stale as socias
// with new professions/cities join.
export async function listDirectoryFacets() {
  const db = await getDb();
  const collection = db.collection<MemberProfile>(MEMBERS_COLLECTION);
  const [professions, locations] = await Promise.all([
    collection.distinct("profession", { profession: { $exists: true, $ne: "" } }),
    collection.distinct("location", { location: { $exists: true, $ne: "" } }),
  ]);
  return {
    professions: (professions as string[]).sort((a, b) => a.localeCompare(b, "es")),
    locations: (locations as string[]).sort((a, b) => a.localeCompare(b, "es")),
  };
}
