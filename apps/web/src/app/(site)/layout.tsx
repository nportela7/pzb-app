import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PUBLIC_NAV } from "@/lib/nav";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/cta";

/**
 * Public marketing surfaces. Unlike (main), nothing here is behind auth —
 * a cold visitor has to be able to read the whole offer before deciding to
 * create an account or write to Pilar.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-cream">
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
