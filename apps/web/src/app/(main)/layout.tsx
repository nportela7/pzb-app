import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMemberByClerkUserId } from "@/lib/members";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const PERSONA_NAV: NavItem[] = [
  { href: "/home", label: "Home" },
  { href: "/directorio", label: "Comunidad" },
  { href: "/eventos", label: "Eventos" },
  { href: "/coaching", label: "Coaching" },
  { href: "/add-ons", label: "Add-Ons" },
  { href: "/zere-studio", label: "Zere Studio" },
];

const EMPRESA_NAV: NavItem[] = [
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
      <SiteHeader items={nav} />
      <main className="flex flex-1 flex-col pt-20 sm:pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
