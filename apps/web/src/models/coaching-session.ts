import { z } from "zod";
import type { ObjectId } from "mongodb";

export const CoachingSessionSchema = z.object({
  memberClerkUserId: z.string(),
  scheduledAt: z.date().optional(),
  durationMinutes: z.number().int().positive().default(60),
  calendlyEventUri: z.string().url().optional(),
  calendlyInviteeUri: z.string().url().optional(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().default("usd"),
  status: z
    .enum(["pending_payment", "scheduled", "completed", "cancelled", "refunded"])
    .default("pending_payment"),
  stripeCheckoutSessionId: z.string().optional(),
  stripePaymentIntentId: z.string().optional(),
  notes: z.string().max(2000).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CoachingSessionInput = z.infer<typeof CoachingSessionSchema>;

export interface CoachingSession extends CoachingSessionInput {
  _id: ObjectId;
}

export const COACHING_SESSIONS_COLLECTION = "coaching_sessions";
