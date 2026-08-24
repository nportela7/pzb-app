import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { getMemberByClerkUserId } from "@/lib/members";
import { MainNav } from "./main-nav";

const PERSONA_NAV = [
  { href: "/home", label: "Home" },
  { href: "/directorio", label: "Comunidad" },
  { href: "/eventos", label: "Eventos" },
  { href: "/coaching", label: "Coaching" },
  { href: "/add-ons", label: "Add-Ons" },
  { href: "/zere-studio", label: "Zere Studio" },
  { href: "/sobre-pilar", label: "Sobre Pilar" },
];

const EMPRESA_NAV = [
  { href: "/home", label: "Home" },
  { href: "/directorio", label: "Comunidad" },
  { href: "/zere-studio", label: "Zere Studio" },
  { href: "/eventos", label: "Eventos" },
  { href: "/sobre-pilar", label: "Sobre Pilar" },
];

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

  const baseNav = member.accountType === "empresa" ? EMPRESA_NAV : PERSONA_NAV;
  const nav = member.isAdmin
    ? [...baseNav, { href: "/admin/eventos", label: "Admin" }]
    : baseNav;

  return (
    <div className="flex flex-1 flex-col bg-cream">
      <header className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-beige-sand">
        <Link href="/home" className="font-script text-2xl text-earth-brown">
          PZB.
        </Link>
        <div className="flex items-center gap-4">
          <MainNav items={nav} />
          <UserButton />
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
