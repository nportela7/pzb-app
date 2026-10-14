import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMemberByClerkUserId } from "@/lib/members";
import { completeOnboarding } from "./actions";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const existing = await getMemberByClerkUserId(userId);
  if (existing) {
    redirect("/home");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 bg-arena">
      <div className="w-full max-w-md">
        <p className="font-script text-3xl text-medianoche mb-6">PZB.</p>
        <h1 className="text-2xl text-medianoche mb-2">Bienvenida</h1>
        <p className="text-sm text-medianoche/70 mb-8">
          Antes de entrar, cuéntanos cómo te unes a la comunidad.
        </p>

        <form action={completeOnboarding} className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-medium text-medianoche mb-1">
              ¿Te unes como persona o como empresa?
            </legend>

            <label className="flex items-start gap-3 rounded-lg border border-cielo p-4 cursor-pointer has-[:checked]:border-medianoche has-[:checked]:bg-cielo/30">
              <input
                type="radio"
                name="accountType"
                value="persona"
                defaultChecked
                className="mt-1 accent-medianoche"
              />
              <span>
                <span className="block font-medium text-medianoche">Persona</span>
                <span className="block text-sm text-gris">
                  Quiero explorar la comunidad, eventos y servicios de Pilar.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-lg border border-cielo p-4 cursor-pointer has-[:checked]:border-medianoche has-[:checked]:bg-cielo/30">
              <input
                type="radio"
                name="accountType"
                value="empresa"
                className="mt-1 accent-medianoche"
              />
              <span>
                <span className="block font-medium text-medianoche">Empresa</span>
                <span className="block text-sm text-gris">
                  Represento una organización interesada en Zere Studio o en
                  patrocinar/colaborar con la comunidad.
                </span>
              </span>
            </label>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor="profession" className="text-sm font-medium text-medianoche">
              Área profesional o proyecto
            </label>
            <input
              id="profession"
              name="profession"
              type="text"
              placeholder="Ej. Psicóloga, Marca de joyería, Consultora RH"
              className="rounded-lg border border-cielo bg-transparent px-3 py-2 text-sm text-medianoche placeholder:text-gris/70"
            />
            <p className="text-xs text-gris">
              Así otras socias pueden encontrarte en el directorio.
            </p>
          </div>

          <button
            type="submit"
            className="rounded-full bg-medianoche text-arena py-2.5 text-sm font-medium hover:bg-medianoche transition-colors"
          >
            Entrar a la comunidad
          </button>
        </form>
      </div>
    </div>
  );
}
