import Link from "next/link";
import {
  countMembers,
  listDirectory,
  listDirectoryFacets,
} from "@/lib/members";
import { AutoSubmitSelect } from "./auto-submit-select";

const ACCOUNT_LABELS: Record<string, string> = {
  persona: "Persona",
  empresa: "Empresa",
};

const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

function str(v: string | string[] | undefined) {
  return typeof v === "string" && v.trim() ? v : undefined;
}

export default async function DirectorioPage(props: PageProps<"/directorio">) {
  const params = await props.searchParams;
  const q = str(params.q);
  const profession = str(params.profession);
  const location = str(params.location);
  const accountType = str(params.accountType) as "persona" | "empresa" | undefined;
  const letter = str(params.letter)?.toUpperCase();

  const [results, facets, totalCount] = await Promise.all([
    listDirectory({ q, profession, location, accountType }),
    listDirectoryFacets(),
    countMembers(),
  ]);

  const availableLetters = new Set(
    results.map((m) => m.name.trim()[0]?.toUpperCase()).filter(Boolean)
  );

  const shown = letter
    ? results.filter((m) => m.name.trim()[0]?.toUpperCase() === letter)
    : results;

  const groups = new Map<string, typeof shown>();
  for (const member of shown) {
    const key = member.name.trim()[0]?.toUpperCase() ?? "#";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(member);
  }
  const sortedGroups = [...groups.entries()].sort((a, b) =>
    a[0].localeCompare(b[0], "es")
  );

  const activeFilterCount = [profession, location, accountType].filter(
    Boolean
  ).length;

  return (
    <div className="flex-1 bg-cream">
      <section className="px-6 sm:px-10 pt-14 sm:pt-16 pb-6 max-w-3xl mx-auto">
        <p className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-slate mb-4">
          <span className="w-8 h-px bg-slate" />
          Comunidad
        </p>
        <h1 className="font-serif italic text-4xl sm:text-5xl text-earth-brown mb-3">
          Directorio
        </h1>
        <p className="text-sm text-slate">
          <span className="text-earth-brown font-medium">{totalCount}</span>{" "}
          {totalCount === 1 ? "socia" : "socias"} en la red — busca por
          nombre, profesión, ciudad o palabra clave.
        </p>
      </section>

      <form className="px-6 sm:px-10 max-w-3xl mx-auto" action="/directorio" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre, profesión, ciudad…"
          className="w-full font-serif italic text-xl sm:text-2xl text-charcoal bg-transparent border-b-2 border-earth-brown pb-2.5 outline-none placeholder:text-charcoal/35"
        />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
          <AutoSubmitSelect
            name="profession"
            label="Profesión"
            value={profession}
            options={facets.professions}
          />
          <AutoSubmitSelect
            name="location"
            label="Ciudad"
            value={location}
            options={facets.locations}
          />
          <AutoSubmitSelect
            name="accountType"
            label="Tipo de cuenta"
            value={accountType}
            options={["persona", "empresa"]}
          />
          {activeFilterCount > 0 && (
            <Link
              href={q ? `/directorio?q=${encodeURIComponent(q)}` : "/directorio"}
              className="text-sm text-slate hover:text-charcoal transition-colors"
            >
              {activeFilterCount} {activeFilterCount === 1 ? "filtro activo" : "filtros activos"} · Limpiar
            </Link>
          )}
        </div>
      </form>

      <nav className="flex flex-wrap gap-x-1 gap-y-1 px-6 sm:px-10 max-w-3xl mx-auto mt-6 pt-3 pb-3 border-y border-earth-brown/15">
        {ALPHABET.map((l) => {
          const active = availableLetters.has(l);
          const isSelected = letter === l;
          const params2 = new URLSearchParams();
          if (q) params2.set("q", q);
          if (profession) params2.set("profession", profession);
          if (location) params2.set("location", location);
          if (accountType) params2.set("accountType", accountType);
          if (!isSelected) params2.set("letter", l);
          const href = `/directorio${params2.toString() ? `?${params2}` : ""}`;
          return active ? (
            <Link
              key={l}
              href={href}
              className={`text-sm px-1.5 py-0.5 rounded transition-colors ${
                isSelected
                  ? "bg-earth-brown text-cream"
                  : "text-slate hover:text-earth-brown"
              }`}
            >
              {l}
            </Link>
          ) : (
            <span key={l} className="text-sm px-1.5 py-0.5 text-earth-brown/20">
              {l}
            </span>
          );
        })}
      </nav>

      <section className="px-6 sm:px-10 max-w-3xl mx-auto pb-20">
        {shown.length === 0 ? (
          <p className="text-charcoal/70 leading-relaxed mt-10">
            No encontramos socias que coincidan con estos criterios.
          </p>
        ) : (
          sortedGroups.map(([letterKey, members]) => (
            <div key={letterKey} className="mt-9 first:mt-8">
              <p className="font-serif italic text-3xl text-earth-brown/25 mb-2 leading-none">
                {letterKey}
              </p>
              <ul className="flex flex-col">
                {members.map((member) => (
                  <li key={member._id.toString()} className="group relative">
                    <span
                      aria-hidden
                      className="absolute -left-3 top-3 bottom-3 w-[3px] origin-center scale-y-0 bg-earth-brown transition-transform duration-200 group-hover:scale-y-100"
                    />
                    <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3 border-b border-earth-brown/10 transition-[padding] duration-200 group-hover:pl-3">
                      <div className="min-w-0">
                        <p className="font-serif text-lg text-charcoal truncate">
                          {member.name}
                        </p>
                        <p className="text-sm text-slate truncate">
                          {[member.profession, member.location]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <span className="text-xs uppercase tracking-wide text-slate shrink-0">
                        {ACCOUNT_LABELS[member.accountType] ?? member.accountType}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
