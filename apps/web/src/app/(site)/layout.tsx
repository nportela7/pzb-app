import { auth } from "@clerk/nextjs/server";
import { getMemberByClerkUserId } from "@/lib/members";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PUBLIC_NAV, memberNav } from "@/lib/nav";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

/**
 * Public marketing surfaces — reachable signed-out or signed-in, since
 * /eventos, /coaching and /zere-studio also live in the signed-in nav.
 * A signed-in, onboarded visitor gets that same Home/Comunidad/Admin
 * chrome here too, so the header doesn't drop it just because they
 * clicked through from /home instead of the landing page.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const member = userId ? await getMemberByClerkUserId(userId) : null;

  return (
    <div className="flex flex-1 flex-col bg-cream">
      {member ? (
        <SiteHeader items={memberNav(member)} />
      ) : (
        <SiteHeader
          items={PUBLIC_NAV}
          cta={{
            label: "Agenda tu sesión",
            href: whatsappHref(WHATSAPP_MESSAGES.diagnostico),
            external: true,
          }}
        />
      )}
      <main className="flex flex-1 flex-col pt-20 sm:pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
