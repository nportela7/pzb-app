import Link from "next/link";
import {
  listDirectory,
  listDirectoryFacets,
  listMostActiveMembers,
  listNewMembers,
} from "@/lib/members";
import { AutoSubmitSelect } from "./auto-submit-select";
import { MonogramCard } from "@/components/MonogramCard";
import { PortraitCard } from "@/components/PortraitCard";

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

  const isBrowsing = !q && !profession && !location && !accountType && !letter;

  const [results, facets, mostActive, newest] = await Promise.all([
    listDirectory({ q, profession, location, accountType }),
    listDirectoryFacets(),
    isBrowsing ? listMostActiveMembers(5) : Promise.resolve([]),
    isBrowsing ? listNewMembers(5) : Promise.resolve([]),
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
        <h1 className="font-serif italic font-medium text-5xl sm:text-6xl text-earth-brown">
          Directorio
        </h1>
      </section>

      {isBrowsing && mostActive.length > 0 && (
        <div className="bg-earth-brown mb-10">
          <div className="px-6 sm:px-10 py-8 max-w-3xl mx-auto">
            <p className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-cream/65 mb-4">
              <span className="w-8 h-px bg-cream/45" />
              Socias más activas
            </p>
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {mostActive.map((member) => (
                <MonogramCard
                  key={member._id.toString()}
                  name={member.name}
                  profession={member.profession}
                  photoUrl={member.photoUrl}
                  href={`/directorio/${member._id.toString()}`}
                  tone="onDark"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {isBrowsing && newest.length > 0 && (
        <div className="px-6 sm:px-10 max-w-3xl mx-auto mb-10">
          <p className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-slate mb-4">
            <span className="w-8 h-px bg-slate" />
            Nuevas socias
          </p>
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {newest.map((member) => (
              <PortraitCard
                key={member._id.toString()}
                name={member.name}
                profession={member.profession}
                photoUrl={member.photoUrl}
                href={`/directorio/${member._id.toString()}`}
              />
            ))}
          </div>
        </div>
      )}

      <form className="px-6 sm:px-10 max-w-3xl mx-auto" action="/directorio" method="get">
        <div className="flex items-center gap-3 bg-cream border-[1.5px] border-earth-brown rounded-full px-5 py-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-earth-brown/60 shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre, profesión, ciudad…"
            className="flex-1 font-serif italic text-lg text-charcoal bg-transparent outline-none placeholder:text-charcoal/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
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
              className="text-sm text-slate hover:text-charcoal transition-colors ml-1"
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
                    <Link
                      href={`/directorio/${member._id.toString()}`}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3 border-b border-earth-brown/10 transition-[padding] duration-200 group-hover:pl-3"
                    >
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
                    </Link>
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
