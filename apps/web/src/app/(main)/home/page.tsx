import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getMemberByClerkUserId } from "@/lib/members";
import { MemberAvatar } from "@/components/MemberAvatar";
import { Grain } from "@/components/Grain";

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
    <div className="flex-1 bg-cream">
      <section className="relative overflow-hidden px-6 sm:px-10 pt-12 pb-10 bg-beige-sand/40">
        <Grain opacity={0.06} />
        <div className="relative max-w-3xl mx-auto w-full flex items-center gap-5">
          <MemberAvatar name={member.name} className="w-14 h-14 text-xl" />
          <div>
            <h1 className="text-3xl text-earth-brown">
              Hola, {member.name.split(" ")[0]}
            </h1>
            <p className="text-sm text-charcoal/70 mt-1">
              {member.accountType === "empresa"
                ? "Esto es lo que se comparte hoy en la comunidad de Pilar."
                : "Esto es lo que se comparte hoy en Life Notes."}
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-10 px-6 sm:px-10 py-12 max-w-3xl mx-auto w-full">
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs tracking-[0.3em] uppercase text-slate">
              Directorio
            </h2>
            <Link
              href="/directorio"
              className="text-sm text-earth-brown hover:text-charcoal transition-colors"
            >
              Buscar socias →
            </Link>
          </div>
          <div className="rounded-2xl border border-beige-sand bg-beige-sand/30 p-5 text-sm text-charcoal/70 leading-relaxed">
            Encuentra a otras socias por nombre, profesión o palabra clave, por
            ejemplo &ldquo;psicóloga&rdquo;.
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xs tracking-[0.3em] uppercase text-slate">
            Explora
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-beige-sand p-5 hover:border-earth-brown transition-colors"
              >
                <span className="flex items-center justify-between">
                  <span className="font-serif text-lg text-charcoal">
                    {link.title}
                  </span>
                  <span className="text-earth-brown/40 group-hover:text-earth-brown group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </span>
                <span className="block text-sm text-slate mt-1">
                  {link.subtitle}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
