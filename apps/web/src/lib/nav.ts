import type { NavItem } from "@/components/SiteHeader";

/** Marketing nav — the order a cold visitor should meet the offer in. */
export const PUBLIC_NAV: NavItem[] = [
  { href: "/coaching", label: "Coaching" },
  { href: "/zere-studio", label: "Zere Studio" },
  { href: "/eventos", label: "Eventos" },
  { href: "/sobre-pilar", label: "Sobre Pilar" },
];

const PERSONA_NAV: NavItem[] = [
  { href: "/home", label: "Home" },
  { href: "/directorio", label: "Comunidad" },
  { href: "/eventos", label: "Eventos" },
  { href: "/coaching", label: "Coaching" },
  { href: "/zere-studio", label: "Zere Studio" },
];

const EMPRESA_NAV: NavItem[] = [
  { href: "/home", label: "Home" },
  { href: "/directorio", label: "Comunidad" },
  { href: "/zere-studio", label: "Zere Studio" },
  { href: "/eventos", label: "Eventos" },
  { href: "/sobre-pilar", label: "Sobre Pilar" },
];

/**
 * The signed-in nav — shared by the (main) area and the (site) marketing
 * pages, so a logged-in visitor sees the same Home/Comunidad/Admin chrome
 * no matter which group actually renders /eventos, /coaching, etc.
 */
export function memberNav(
  member?: { accountType?: string; isAdmin?: boolean } | null,
): NavItem[] {
  const base = member?.accountType === "empresa" ? EMPRESA_NAV : PERSONA_NAV;
  return member?.isAdmin
    ? [...base, { href: "/admin/eventos", label: "Admin" }]
    : base;
}
