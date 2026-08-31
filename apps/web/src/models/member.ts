import { z } from "zod";
import type { ObjectId } from "mongodb";

export const AccountType = z.enum(["persona", "empresa"]);
export type AccountType = z.infer<typeof AccountType>;

export const MemberProfileSchema = z.object({
  clerkUserId: z.string(),
  accountType: AccountType,
  name: z.string().min(1),
  email: z.string().email(),
  photoUrl: z.string().url().optional(),
  bio: z.string().max(1000).optional(),
  profession: z.string().max(200).optional(),
  keywords: z.array(z.string().max(50)).max(10).default([]),
  interests: z.array(z.string()).default([]),
  location: z.string().max(200).optional(),
  businessName: z.string().max(200).optional(),
  memberPerk: z.string().max(300).optional(),
  contactVisibility: z.enum(["public", "members", "private"]).default("members"),
  contactMethods: z
    .object({
      email: z.string().email().optional(),
      whatsapp: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
    })
    .default({}),
  isAdmin: z.boolean().default(false),
  onboardingCompletedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type MemberProfileInput = z.infer<typeof MemberProfileSchema>;

export interface MemberProfile extends MemberProfileInput {
  _id: ObjectId;
}

export const MEMBERS_COLLECTION = "members";
