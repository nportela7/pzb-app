"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { EventSchema, EventType } from "@/models/event";
import {
  createEvent,
  deleteEvent,
  getEventById,
  updateEvent,
} from "@/lib/events";
import { getMemberByClerkUserId } from "@/lib/members";

async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const member = await getMemberByClerkUserId(userId);
  if (!member || !member.isAdmin) redirect("/home");
  return { userId, member };
}

function parseEventForm(formData: FormData) {
  const priceInput = formData.get("price");
  const priceMXN = typeof priceInput === "string" && priceInput.trim() ? Number(priceInput) : 0;

  const startsAtRaw = formData.get("startsAt");
  const endsAtRaw = formData.get("endsAt");

  return {
    title: String(formData.get("title") || "").trim(),
    type: EventType.parse(formData.get("type")),
    description:
      typeof formData.get("description") === "string" &&
      String(formData.get("description")).trim()
        ? String(formData.get("description")).trim()
        : undefined,
    location:
      typeof formData.get("location") === "string" &&
      String(formData.get("location")).trim()
        ? String(formData.get("location")).trim()
        : undefined,
    isOnline: formData.get("isOnline") === "on",
    startsAt: new Date(String(startsAtRaw)),
    endsAt: endsAtRaw ? new Date(String(endsAtRaw)) : undefined,
    priceCents: Math.round(priceMXN * 100),
    currency: "mxn",
    status: String(formData.get("status") || "draft") as
      | "draft"
      | "published"
      | "cancelled",
  };
}

export async function createEventAction(formData: FormData) {
  const { userId } = await requireAdmin();
  const now = new Date();
  const parsed = parseEventForm(formData);

  const input = EventSchema.parse({
    ...parsed,
    createdByClerkUserId: userId,
    createdAt: now,
    updatedAt: now,
  });

  await createEvent(input);
  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  redirect("/admin/eventos");
}

export async function updateEventAction(id: string, formData: FormData) {
  await requireAdmin();
  const existing = await getEventById(id);
  if (!existing) redirect("/admin/eventos");

  const parsed = parseEventForm(formData);
  await updateEvent(id, { ...parsed, updatedAt: new Date() });

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  redirect("/admin/eventos");
}

export async function deleteEventAction(id: string) {
  await requireAdmin();
  await deleteEvent(id);
  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
}

export async function toggleStatusAction(id: string, nextStatus: "published" | "draft") {
  await requireAdmin();
  await updateEvent(id, { status: nextStatus, updatedAt: new Date() });
  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
}
