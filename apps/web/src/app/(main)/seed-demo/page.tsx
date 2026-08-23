import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMemberByClerkUserId } from "@/lib/members";
import { SeedDemoButtons } from "./seed-demo-buttons";

const OWNER_EMAIL = "nacho.pb7@hotmail.com";

export default async function SeedDemoPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const member = await getMemberByClerkUserId(userId);
  if (!member) redirect("/onboarding");
  if (member.email !== OWNER_EMAIL) redirect("/home");

  return (
    <div className="flex-1 bg-cream">
      <section className="px-6 sm:px-10 py-16 max-w-xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-slate mb-4">
          Herramienta temporal
        </p>
        <h1 className="text-3xl text-earth-brown mb-3">
          Comunidad de demo
        </h1>
        <p className="text-charcoal/70 leading-relaxed mb-8">
          Siembra 7 socias y 5 eventos de ejemplo directamente en esta base
          de datos, o quítalos cuando termines. Solo visible para tu cuenta.
        </p>
        <SeedDemoButtons />
      </section>
    </div>
  );
}
