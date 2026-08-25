import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { countMembers, getMemberByClerkUserId, searchMembers } from "@/lib/members";
import { listUpcomingEvents } from "@/lib/events";
import { EVENT_TYPE_LABELS } from "@/models/event";
import { MemberAvatar } from "@/components/MemberAvatar";
import { Grain } from "@/components/Grain";
import { Flourish } from "@/components/Flourish";

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
});

const todayFormatter = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

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

  const [recentMembers, upcomingEvents, memberCount] = await Promise.all([
    searchMembers(""),
    listUpcomingEvents(),
    countMembers(),
  ]);
  const nextEvents = upcomingEvents.slice(0, 3);
  const topProfessions = Array.from(
    new Set(
      recentMembers
        .filter((m) => m.clerkUserId !== member.clerkUserId)
        .map((m) => m.profession)
        .filter((p): p is string => !!p)
    )
  ).slice(0, 4);

  return (
    <div className="flex-1 bg-cream">
      <section className="relative overflow-hidden bg-dark-pine py-10 sm:py-12">
        <Grain opacity={0.12} />
        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-serif italic font-light text-[7rem] sm:text-[10rem] leading-none text-transparent select-none pointer-events-none"
          style={{ WebkitTextStroke: "1.5px rgba(249,247,242,0.14)" }}
        >
          {member.name.trim()[0]?.toUpperCase()}
        </span>
        <div className="relative max-w-3xl mx-auto w-full flex items-center gap-5 px-6 sm:px-10">
          <MemberAvatar
            name={member.name}
            tone="onDark"
            className="w-[4.6rem] h-[4.6rem] text-2xl shrink-0"
          />
          <div>
            <p className="flex items-center gap-3 text-xs tracking-[0.26em] uppercase text-cream/60 mb-1.5">
              <span className="w-6 h-px bg-cream/45" />
              {capitalize(todayFormatter.format(new Date()))}
            </p>
            <h1 className="font-serif italic font-light text-3xl sm:text-4xl text-cream leading-tight">
              Hola, {member.name.split(" ")[0]}.
            </h1>
            <p className="text-sm text-cream/70 mt-1">
              {member.accountType === "empresa"
                ? "Esto es lo que se mueve hoy en la comunidad de Pilar."
                : "Esto es lo que se mueve hoy en tu comunidad."}
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
            <h2 className="text-xs tracking-[0.3em] uppercase text-slate">
              Comunidad
            </h2>
            <div className="rounded-2xl border border-earth-brown/20 p-6 sm:p-8">
              <h3 className="font-serif italic text-2xl sm:text-3xl text-earth-brown mb-5">
                Encuentra a tu socia.
              </h3>
              <form action="/directorio" method="get">
                <input
                  type="text"
                  name="q"
                  placeholder="Psicóloga, Guadalajara, diseño…"
                  className="w-full font-serif italic text-lg text-charcoal bg-transparent border-b-2 border-earth-brown pb-2.5 outline-none placeholder:text-charcoal/35"
                />
              </form>
              {topProfessions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {topProfessions.map((profession) => (
                    <Link
                      key={profession}
                      href={`/directorio?q=${encodeURIComponent(profession)}`}
                      className="text-sm text-earth-brown border border-earth-brown/25 rounded-full px-3.5 py-1.5 hover:border-earth-brown/50 transition-colors"
                    >
                      {profession}
                    </Link>
                  ))}
                </div>
              )}
              <div className="flex items-baseline justify-between mt-6 text-sm">
                <span className="text-slate">
                  {memberCount} {memberCount === 1 ? "socia" : "socias"} en la red
                </span>
                <Link
                  href="/directorio"
                  className="text-earth-brown border-b border-earth-brown/40 hover:border-earth-brown transition-colors"
                >
                  Ver directorio completo →
                </Link>
              </div>
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
    </div>
  );
}
