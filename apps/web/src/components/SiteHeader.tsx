"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

export type NavItem = { href: string; label: string };

export type HeaderCta = {
  label: string;
  href: string;
  /** Opens in a new tab — used for the WhatsApp deep links. */
  external?: boolean;
};

/**
 * The floating pill header. It rides above the page rather than sitting in
 * the flow, so every surface below it needs its own top padding.
 *
 * Two visual states:
 *  - "lifted" (default, and the only state on light pages): a blurred cream
 *    pill, so copy scrolling underneath stays readable through it.
 *  - "flush": transparent with cream type, used while the header sits over a
 *    dark full-bleed hero — the pill would only cut a hole in it.
 */
export function SiteHeader({
  items,
  cta,
  /** "dark" starts flush over a dark hero; "light" starts as the pill. */
  tone = "light",
  showAuthActions = true,
}: {
  items: NavItem[];
  cta?: HeaderCta;
  tone?: "light" | "dark";
  showAuthActions?: boolean;
}) {
  const [lifted, setLifted] = useState(tone === "light");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (tone === "light") return;
    setLifted(y > 24);
  });

  // The mobile sheet has to close whenever the route changes — including on
  // a browser back/forward, which no click handler sees. Adjusting during
  // render is React's own answer here; an effect would only re-render again
  // after painting the stale open sheet.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const shell = lifted
    ? "bg-cream/72 backdrop-blur-xl backdrop-saturate-150 border-earth-brown/12 shadow-[0_10px_30px_-16px_rgba(89,68,52,0.45)]"
    : "bg-transparent border-transparent";
  const wordmark = lifted ? "text-earth-brown" : "text-cream";
  const navLink = lifted
    ? "text-charcoal/80 hover:text-earth-brown"
    : "text-cream/75 hover:text-cream";
  const quietLink = lifted
    ? "text-charcoal/75 hover:text-earth-brown"
    : "text-cream/70 hover:text-cream";
  const ctaButton = lifted
    ? "bg-earth-brown text-cream hover:bg-charcoal"
    : "bg-cream text-earth-brown hover:bg-beige-sand";
  const bar = lifted ? "bg-earth-brown" : "bg-cream";

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 sm:top-4 z-50 px-3 sm:px-6"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-4 sm:px-6 py-2.5 transition-[background-color,border-color,box-shadow] duration-500 ${shell}`}
      >
        <Link
          href="/"
          className={`font-script text-2xl sm:text-[1.7rem] leading-none transition-colors ${wordmark}`}
        >
          PZB.
        </Link>

        <nav className="hidden lg:flex items-center gap-6 font-serif text-[0.98rem]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:italic ${navLink}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {showAuthActions && (
            <Show when="signed-out">
              <SignInButton forceRedirectUrl="/home">
                <button
                  className={`hidden sm:inline text-sm transition-colors ${quietLink}`}
                >
                  Iniciar sesión
                </button>
              </SignInButton>
            </Show>
          )}
          {showAuthActions && (
            <Show when="signed-in">
              <Link
                href="/home"
                className={`hidden sm:inline text-sm transition-colors ${quietLink}`}
              >
                Comunidad
              </Link>
              <UserButton />
            </Show>
          )}

          {cta &&
            (cta.external ? (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full px-4 sm:px-5 py-2 text-[0.8rem] sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${ctaButton}`}
              >
                {cta.label}
              </a>
            ) : (
              <Link
                href={cta.href}
                className={`rounded-full px-4 sm:px-5 py-2 text-[0.8rem] sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${ctaButton}`}
              >
                {cta.label}
              </Link>
            ))}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 shrink-0"
          >
            <span
              className={`block h-px w-6 transition-transform duration-300 ${bar} ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 transition-transform duration-300 ${bar} ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="site-menu"
          className="lg:hidden mx-auto mt-2 max-w-6xl rounded-3xl border border-earth-brown/12 bg-cream/88 backdrop-blur-xl backdrop-saturate-150 shadow-[0_18px_40px_-22px_rgba(89,68,52,0.5)] p-3"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 font-serif text-lg text-charcoal/80 hover:bg-beige-sand/50 hover:text-earth-brown transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {showAuthActions && (
            <Show when="signed-out">
              <div className="mt-2 flex flex-col gap-2 border-t border-earth-brown/12 pt-3">
                <SignInButton forceRedirectUrl="/home">
                  <button className="rounded-2xl px-4 py-3 text-left text-sm text-charcoal/70 hover:bg-beige-sand/50 transition-colors">
                    Iniciar sesión
                  </button>
                </SignInButton>
                <SignUpButton forceRedirectUrl="/home">
                  <button className="rounded-2xl bg-beige-sand/60 px-4 py-3 text-left text-sm font-medium text-earth-brown hover:bg-beige-sand transition-colors">
                    Sé parte de la comunidad
                  </button>
                </SignUpButton>
              </div>
            </Show>
          )}
        </nav>
      )}
    </motion.header>
  );
}
