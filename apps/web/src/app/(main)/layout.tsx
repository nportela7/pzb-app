import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMemberByClerkUserId } from "@/lib/members";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { memberNav } from "@/lib/nav";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const member = await getMemberByClerkUserId(userId);
  if (!member) {
    redirect("/onboarding");
  }

  const nav = memberNav(member);

  return (
    <div className="flex flex-1 flex-col bg-cream">
      <SiteHeader items={nav} />
      <main className="flex flex-1 flex-col pt-20 sm:pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
