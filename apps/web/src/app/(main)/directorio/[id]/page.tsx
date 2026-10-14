import { notFound } from "next/navigation";
import Image from "next/image";
import { getMemberById, listMembersInLocation } from "@/lib/members";
import { MonogramCard } from "@/components/MonogramCard";
import { splitName } from "@/lib/name";

const yearFormatter = new Intl.DateTimeFormat("es-MX", { year: "numeric" });

export default async function MemberProfilePage(
  props: PageProps<"/directorio/[id]">
) {
  const { id } = await props.params;
  const member = await getMemberById(id);
  if (!member) notFound();

  const related = member.location
    ? await listMembersInLocation(member.location, member.clerkUserId, 4)
    : [];

  const { first } = splitName(member.name);
  const initial = member.name.trim()[0]?.toUpperCase() ?? "";
  const role = member.businessName || member.profession;
  const whatsappHref = member.contactMethods.whatsapp
    ? `https://wa.me/${member.contactMethods.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hola ${first}, te contacto por el directorio de la comunidad.`
      )}`
    : undefined;
  const instagramHref = member.contactMethods.instagram
    ? `https://instagram.com/${member.contactMethods.instagram.replace(/^@/, "")}`
    : undefined;

  return (
    <div className="flex-1 bg-arena">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="relative overflow-hidden bg-capuccino px-6 sm:px-12 py-10 flex items-center gap-6 flex-wrap">
          <span
            aria-hidden
            className="absolute -right-2 top-1/2 -translate-y-1/2 font-serif italic font-light text-[13rem] leading-none text-transparent select-none pointer-events-none"
            style={{ WebkitTextStroke: "1.5px rgba(247,240,229,0.1)" }}
          >
            {initial}
          </span>

          <div
            className="relative w-[7.75rem] aspect-[3/4] rounded-2xl shrink-0 bg-cielo overflow-hidden"
            style={{ boxShadow: "-6px 8px 16px -2px rgba(0,0,0,0.35)" }}
          >
            {member.photoUrl ? (
              <Image
                src={member.photoUrl}
                alt=""
                fill
                sizes="124px"
                className="object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="absolute -top-2 left-1 font-serif italic text-8xl leading-none text-transparent select-none"
                style={{ WebkitTextStroke: "1.2px rgba(14,98,127,0.42)" }}
              >
                {initial}
              </span>
            )}
          </div>

          <div className="relative flex-1 min-w-[14rem]">
            {member.location && (
              <p className="flex items-center gap-3 text-xs tracking-[0.26em] uppercase text-arena/60 mb-3.5">
                <span className="w-6 h-px bg-arena/40" />
                {member.location}
              </p>
            )}
            <h1 className="font-serif italic font-normal text-4xl sm:text-5xl text-arena leading-none mb-2">
              {member.name}
            </h1>
            {role && <p className="text-sm text-arena/75">{role}</p>}

            <div className="flex flex-wrap gap-2.5 mt-4">
              {instagramHref && (
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-arena border border-arena/35 rounded-full px-4 py-1.5 transition-all hover:bg-arena hover:text-capuccino hover:border-arena hover:-translate-y-0.5"
                >
                  Instagram
                </a>
              )}
              {member.contactMethods.linkedin && (
                <a
                  href={member.contactMethods.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-arena border border-arena/35 rounded-full px-4 py-1.5 transition-all hover:bg-arena hover:text-capuccino hover:border-arena hover:-translate-y-0.5"
                >
                  LinkedIn
                </a>
              )}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-arena border border-arena/35 rounded-full px-4 py-1.5 transition-all hover:bg-arena hover:text-capuccino hover:border-arena hover:-translate-y-0.5"
                >
                  WhatsApp
                </a>
              )}
              {member.contactMethods.website && (
                <a
                  href={member.contactMethods.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-arena border border-arena/35 rounded-full px-4 py-1.5 transition-all hover:bg-arena hover:text-capuccino hover:border-arena hover:-translate-y-0.5"
                >
                  Sitio web
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Servicios / bio */}
        {member.bio && (
          <div className="px-6 sm:px-12 pt-10 pb-1">
            <p className="flex items-center gap-3 text-xs tracking-[0.26em] uppercase text-gris mb-4">
              <span className="w-6 h-px bg-gris" />
              {role ? "Servicios que ofrece" : `Sobre ${first}`}
            </p>
            <p className="font-serif italic font-light text-xl sm:text-2xl leading-snug text-medianoche max-w-xl">
              {member.bio}
            </p>
          </div>
        )}

        {/* Keywords */}
        {member.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 px-6 sm:px-12 pt-5">
            {member.keywords.map((kw) => (
              <span
                key={kw}
                className="text-xs text-medianoche border border-medianoche/30 rounded-full px-3 py-1"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Facts */}
        <div className="flex flex-wrap gap-x-10 gap-y-3 mx-6 sm:mx-12 my-8 py-6 border-y border-medianoche/15">
          {member.businessName && (
            <div>
              <p className="text-[0.62rem] tracking-[0.14em] uppercase text-gris mb-1">
                Negocio
              </p>
              <p className="font-serif text-lg text-medianoche">
                {member.businessName}
              </p>
            </div>
          )}
          {member.location && (
            <div>
              <p className="text-[0.62rem] tracking-[0.14em] uppercase text-gris mb-1">
                Ciudad
              </p>
              <p className="font-serif text-lg text-medianoche">
                {member.location}
              </p>
            </div>
          )}
          <div>
            <p className="text-[0.62rem] tracking-[0.14em] uppercase text-gris mb-1">
              Socia desde
            </p>
            <p className="font-serif text-lg text-medianoche">
              {yearFormatter.format(member.createdAt)}
            </p>
          </div>
        </div>

        {/* Perk */}
        {member.memberPerk && (
          <div className="relative mx-6 sm:mx-12 mb-8 rounded-2xl border-[1.5px] border-dashed border-medianoche bg-cielo/35 px-6 py-5">
            <span
              aria-hidden
              className="absolute top-1/2 -left-2.5 w-5 h-5 -translate-y-1/2 rounded-full bg-arena"
            />
            <span
              aria-hidden
              className="absolute top-1/2 -right-2.5 w-5 h-5 -translate-y-1/2 rounded-full bg-arena"
            />
            <p className="text-xs tracking-[0.16em] uppercase text-medianoche mb-1.5">
              Beneficio para socias
            </p>
            <p className="font-serif text-lg text-medianoche">
              {member.memberPerk}
            </p>
          </div>
        )}

        {whatsappHref && (
          <div className="px-6 sm:px-12 pb-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-medianoche text-arena text-sm font-medium px-6 py-3 hover:bg-medianoche transition-colors"
            >
              Escribirle por WhatsApp →
            </a>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="px-6 sm:px-12 pt-6 pb-16 border-t border-medianoche/15 mt-4">
            <p className="flex items-center gap-3 text-xs tracking-[0.26em] uppercase text-gris mb-5">
              <span className="w-6 h-px bg-gris" />
              Otras socias en {member.location}
            </p>
            <div className="grid grid-cols-4 gap-3">
              {related.map((m) => (
                <MonogramCard
                  key={m._id.toString()}
                  name={m.name}
                  profession={m.profession}
                  photoUrl={m.photoUrl}
                  href={`/directorio/${m._id.toString()}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
