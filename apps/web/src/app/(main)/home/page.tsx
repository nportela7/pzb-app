import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getMemberByClerkUserId } from "@/lib/members";

const PERSONA_LINKS = [
  { href: "/eventos", title: "Eventos", subtitle: "Talleres y retiros" },
  { href: "/coaching", title: "Coaching", subtitle: "The Alignment Partnership" },
  { href: "/add-ons", title: "Add-Ons", subtitle: "Experiencias complementarias" },
  { href: "/zere-studio", title: "Zere Studio", subtitle: "Ver experiencias" },
];

const EMPRESA_LINKS = [
  { href: "/zere-studio", title: "Zere Studio", subtitle: "Cotizar servicio" },
  { href: "/eventos", title: "Eventos", subtitle: "Patrocinar evento" },
  { href: "/directorio", title: "Ofrecer servicio", subtitle: "A la comunidad" },
];

export default async function HomePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const member = await getMemberByClerkUserId(userId);
  if (!member) redirect("/onboarding");

  const links = member.accountType === "empresa" ? EMPRESA_LINKS : PERSONA_LINKS;

  return (
    <div className="flex flex-1 flex-col gap-10 px-6 sm:px-10 py-12 max-w-3xl mx-auto w-full bg-cream">
      <div>
        <h1 className="text-3xl text-earth-brown">
          Hola, {member.name.split(" ")[0]}
        </h1>
        <p className="text-sm text-charcoal/70 mt-2">
          {member.accountType === "empresa"
            ? "Esto es lo que se comparte hoy en la comunidad de Pilar."
            : "Esto es lo que se comparte hoy en Life Notes."}
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-wide text-slate">
            Directorio
          </h2>
          <Link
            href="/directorio"
            className="text-sm text-earth-brown hover:text-charcoal transition-colors"
          >
            Buscar socias →
          </Link>
        </div>
        <div className="rounded-lg border border-beige-sand bg-beige-sand/30 p-5 text-sm text-charcoal/70 leading-relaxed">
          Encuentra a otras socias por nombre, profesión o palabra clave, por
          ejemplo &ldquo;psicóloga&rdquo;.
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-wide text-slate">
          Explora
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-beige-sand p-5 hover:border-earth-brown transition-colors"
            >
              <span className="block font-medium text-charcoal">
                {link.title}
              </span>
              <span className="block text-sm text-slate mt-1">
                {link.subtitle}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
