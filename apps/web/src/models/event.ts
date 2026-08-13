import { z } from "zod";
import type { ObjectId } from "mongodb";

export const EventSchema = z.object({
  title: z.string().min(1),
  description: z.string().max(5000).optional(),
  coverImageUrl: z.string().url().optional(),
  location: z.string().max(300).optional(),
  isOnline: z.boolean().default(false),
  startsAt: z.date(),
  endsAt: z.date().optional(),
  capacity: z.number().int().positive().optional(),
  priceCents: z.number().int().nonnegative().default(0),
  currency: z.string().default("usd"),
  stripePriceId: z.string().optional(),
  status: z.enum(["draft", "published", "cancelled"]).default("draft"),
  createdByClerkUserId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EventInput = z.infer<typeof EventSchema>;

export interface EventDoc extends EventInput {
  _id: ObjectId;
}

export const EVENTS_COLLECTION = "events";

export const EventRegistrationSchema = z.object({
  eventId: z.string(),
  memberClerkUserId: z.string(),
  status: z.enum(["pending_payment", "confirmed", "cancelled", "refunded"]).default(
    "pending_payment"
  ),
  stripeCheckoutSessionId: z.string().optional(),
  stripePaymentIntentId: z.string().optional(),
  amountPaidCents: z.number().int().nonnegative().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type EventRegistrationInput = z.infer<typeof EventRegistrationSchema>;

export interface EventRegistration extends EventRegistrationInput {
  _id: ObjectId;
}

export const EVENT_REGISTRATIONS_COLLECTION = "event_registrations";
