"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AccountType } from "@/models/member";
import { createMemberProfile, getMemberByClerkUserId } from "@/lib/members";

export async function completeOnboarding(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const existing = await getMemberByClerkUserId(userId);
  if (existing) {
    redirect("/home");
  }

  const accountType = AccountType.parse(formData.get("accountType"));
  const profession = formData.get("profession");

  const user = await currentUser();
  const name = user?.fullName || user?.username || "Nueva socia";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  await createMemberProfile({
    clerkUserId: userId,
    email,
    name,
    accountType,
    profession:
      typeof profession === "string" && profession.trim()
        ? profession.trim()
        : undefined,
  });

  redirect("/home");
}
