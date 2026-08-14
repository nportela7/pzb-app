import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getMemberByClerkUserId } from "@/lib/members";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const member = await getMemberByClerkUserId(userId);
  if (!member) redirect("/onboarding");
  if (!member.isAdmin) redirect("/home");

  return (
    <div className="flex-1 bg-cream">
      <div className="px-6 sm:px-10 pt-8 max-w-4xl mx-auto w-full">
        <nav className="flex items-center gap-5 text-sm text-slate mb-8">
          <Link href="/admin/eventos" className="hover:text-earth-brown transition-colors">
            Eventos
          </Link>
          <span className="text-beige-sand">·</span>
          <Link href="/home" className="hover:text-earth-brown transition-colors">
            Salir del panel
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
