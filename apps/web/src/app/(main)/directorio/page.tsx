import { searchMembers } from "@/lib/members";
import { MemberAvatar } from "@/components/MemberAvatar";
import { Grain } from "@/components/Grain";

const ACCOUNT_LABELS: Record<string, string> = {
  persona: "Persona",
  empresa: "Empresa",
};

export default async function DirectorioPage(props: PageProps<"/directorio">) {
  const { q } = await props.searchParams;
  const query = typeof q === "string" ? q : "";
  const results = await searchMembers(query);

  return (
    <div className="flex-1 bg-cream">
      <section className="relative overflow-hidden px-6 sm:px-10 pt-14 pb-10 bg-beige-sand/40">
        <Grain opacity={0.06} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-slate mb-4">
            Comunidad
          </p>
          <h1 className="text-3xl sm:text-4xl text-earth-brown mb-3">
            Directorio de socias
          </h1>
          <p className="text-charcoal/70 max-w-lg leading-relaxed mb-8">
            Encuentra a otras socias por nombre, profesión o palabra clave,
            para conectar, colaborar o recomendarte.
          </p>

          <form method="get" className="flex gap-2 max-w-lg">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Ej. psicóloga, coach, Guadalajara"
              className="flex-1 rounded-full border border-earth-brown/20 bg-cream px-5 py-2.5 text-sm text-charcoal placeholder:text-slate focus:outline-none focus:border-earth-brown transition-colors"
            />
            <button
              type="submit"
              className="rounded-full bg-earth-brown text-cream px-6 py-2.5 text-sm font-medium hover:bg-charcoal transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-12 max-w-3xl mx-auto">
        {results.length === 0 ? (
          <p className="text-charcoal/70 leading-relaxed">
            No encontramos socias que coincidan con &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-beige-sand">
            {results.map((member) => (
              <li
                key={member._id.toString()}
                className="flex items-center gap-4 py-5"
              >
                <MemberAvatar name={member.name} className="w-11 h-11" />
                <div className="min-w-0 flex-1">
                  <p className="text-charcoal font-medium truncate">
                    {member.name}
                  </p>
                  {member.profession && (
                    <p className="text-sm text-slate truncate">
                      {member.profession}
                    </p>
                  )}
                </div>
                <span className="text-xs uppercase tracking-wide text-slate shrink-0">
                  {ACCOUNT_LABELS[member.accountType] ?? member.accountType}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
