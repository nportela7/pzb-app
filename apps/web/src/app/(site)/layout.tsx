import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PUBLIC_NAV } from "@/lib/nav";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

/**
 * Public marketing surfaces — reachable signed-out or signed-in.
 *
 * The header is the same one the landing shows, for everyone. It used to swap
 * to the member menu (Home, Comunidad, Admin…) for signed-in visitors, which
 * made the whole bar change as soon as they clicked a link from the landing.
 * Signed-in visitors still get their "Comunidad" link and avatar, since
 * SiteHeader adds those on its own; the member menu itself now only lives in
 * the signed-in area, (main).
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-arena">
      <SiteHeader
        items={PUBLIC_NAV}
        cta={{
          label: "Agenda tu sesión",
          href: whatsappHref(WHATSAPP_MESSAGES.diagnostico),
          external: true,
        }}
      />
      <main className="flex flex-1 flex-col pt-20 sm:pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
