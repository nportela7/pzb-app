import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-cream">
      <header className="flex items-center justify-between px-6 sm:px-10 py-6">
        <span className="font-script text-3xl text-earth-brown">PZB.</span>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton>
              <button className="text-sm text-charcoal/70 hover:text-charcoal transition-colors">
                Iniciar sesión
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-sm rounded-full px-5 py-2 bg-earth-brown text-cream hover:bg-charcoal transition-colors">
                Crear cuenta
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/home"
              className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
            >
              Ir a la comunidad
            </Link>
            <UserButton />
          </Show>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-slate">
          Pilar Zambrano B.
        </p>
        <h1 className="text-4xl sm:text-6xl text-earth-brown max-w-3xl text-balance">
          Styling your life.{" "}
          <span className="italic font-normal">Your own way.</span>
        </h1>
        <p className="text-base text-charcoal/70 max-w-md leading-relaxed">
          Coaching de identidad, imagen y decisiones. Experiencias con
          intención para empresas. Y una comunidad que se sostiene entre
          mujeres.
        </p>

        <Show when="signed-out">
          <SignUpButton>
            <button className="mt-4 rounded-full px-8 py-3 bg-earth-brown text-cream text-sm tracking-wide hover:bg-charcoal transition-colors">
              Conocer más
            </button>
          </SignUpButton>
        </Show>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-3 text-sm text-slate">
          <span>Sobre Pilar</span>
          <span>Coaching</span>
          <span>Zere Studio</span>
          <span>Life Notes</span>
        </div>
      </main>
    </div>
  );
}
