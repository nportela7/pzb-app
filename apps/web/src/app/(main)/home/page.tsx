import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getMemberByClerkUserId, searchMembers } from "@/lib/members";
import { listUpcomingEvents } from "@/lib/events";
import { EVENT_TYPE_LABELS } from "@/models/event";
import { MemberAvatar } from "@/components/MemberAvatar";
import { Grain } from "@/components/Grain";
import { Flourish } from "@/components/Flourish";

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
});

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

  const [recentMembers, upcomingEvents] = await Promise.all([
    searchMembers(""),
    listUpcomingEvents(),
  ]);
  const otherMembers = recentMembers
    .filter((m) => m.clerkUserId !== member.clerkUserId)
    .slice(0, 6);
  const nextEvents = upcomingEvents.slice(0, 3);

  return (
    <div className="flex-1 bg-cream">
      <section className="relative overflow-hidden bg-dark-pine py-10">
        <Grain opacity={0.12} />
        <div className="relative max-w-3xl mx-auto w-full flex items-center gap-5 px-6 sm:px-10">
          <MemberAvatar
            name={member.name}
            tone="onDark"
            className="w-14 h-14 text-xl"
          />
          <div>
            <h1 className="text-3xl text-cream">
              Hola, {member.name.split(" ")[0]}
            </h1>
            <p className="text-sm text-cream/70 mt-1">
              {member.accountType === "empresa"
                ? "Esto es lo que se comparte hoy en la comunidad de Pilar."
                : "Esto es lo que se comparte hoy en Life Notes."}
            </p>
          </div>
        </div>
      </section>

      <div className="relative">
        {/* decorative flourishes flanking the content column, wide screens only */}
        <Flourish className="hidden lg:block absolute left-10 top-0 bottom-0 w-16 text-earth-brown/20 pointer-events-none" />
        <Flourish className="hidden lg:block absolute right-10 top-0 bottom-0 w-16 text-earth-brown/20 pointer-events-none -scale-x-100" />

        <div className="relative flex flex-col gap-10 px-6 sm:px-10 py-12 max-w-3xl mx-auto w-full">
          {nextEvents.length > 0 && (
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs tracking-[0.3em] uppercase text-slate">
                  Próximos eventos
                </h2>
                <Link
                  href="/eventos"
                  className="text-sm text-earth-brown hover:text-charcoal transition-colors"
                >
                  Ver calendario →
                </Link>
              </div>
              <ul className="rounded-2xl border border-beige-sand divide-y divide-beige-sand overflow-hidden">
                {nextEvents.map((event) => (
                  <li key={event._id.toString()}>
                    <Link
                      href="/eventos"
                      className="flex items-center gap-4 p-4 hover:bg-beige-sand/30 transition-colors"
                    >
                      <div className="text-center w-12 shrink-0">
                        <p className="font-serif text-xl text-earth-brown leading-none">
                          {dateFormatter.format(event.startsAt).split(" ")[0]}
                        </p>
                        <p className="text-[10px] uppercase tracking-wide text-slate mt-1">
                          {dateFormatter.format(event.startsAt).split(" ")[1]}
                        </p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wide text-slate mb-0.5">
                          {EVENT_TYPE_LABELS[event.type]}
                        </p>
                        <p className="text-charcoal truncate">{event.title}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
            {otherMembers.length > 0 ? (
              <div className="rounded-2xl border border-beige-sand p-5 flex flex-wrap items-center gap-3">
                {otherMembers.map((m) => (
                  <Link
                    key={m._id.toString()}
                    href="/directorio"
                    className="flex items-center gap-2 pr-3 rounded-full hover:bg-beige-sand/30 transition-colors"
                    title={m.profession ?? m.name}
                  >
                    <MemberAvatar name={m.name} className="w-9 h-9 text-sm" />
                    <span className="text-sm text-charcoal/80 max-w-[9rem] truncate">
                      {m.name}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-beige-sand bg-beige-sand/30 p-5 text-sm text-charcoal/70 leading-relaxed">
                Encuentra a otras socias por nombre, profesión o palabra clave, por
                ejemplo &ldquo;psicóloga&rdquo;.
              </div>
            )}
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
    </div>
  );
}
