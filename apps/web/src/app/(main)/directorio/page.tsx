import { searchMembers } from "@/lib/members";

export default async function DirectorioPage(props: PageProps<"/directorio">) {
  const { q } = await props.searchParams;
  const query = typeof q === "string" ? q : "";
  const results = await searchMembers(query);

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8 max-w-3xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold">Directorio</h1>
        <p className="text-sm text-black/60 dark:text-white/60 mt-1">
          Busca por nombre, profesión o palabra clave.
        </p>
      </div>

      <form method="get" className="flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Ej. psicóloga, coach, Guadalajara"
          className="flex-1 rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium"
        >
          Buscar
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {results.length === 0 && (
          <li className="text-sm text-black/60 dark:text-white/60">
            No encontramos socias que coincidan con &ldquo;{query}&rdquo;.
          </li>
        )}
        {results.map((member) => (
          <li
            key={member._id.toString()}
            className="rounded-lg border border-black/10 dark:border-white/15 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{member.name}</span>
              <span className="text-xs uppercase tracking-wide text-black/40 dark:text-white/40">
                {member.accountType}
              </span>
            </div>
            {member.profession && (
              <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                {member.profession}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
