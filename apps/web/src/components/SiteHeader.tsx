"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ZereWordmark } from "@/components/ZereWordmark";

const ZERE_HREF = "/zere-studio";

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
 *  - "lifted" (default, and the only state on light pages): a blurred arena
 *    pill, so copy scrolling underneath stays readable through it.
 *  - "flush": transparent with medianoche type, used while the header sits
 *    over a full-bleed Cielo hero — the pill would only cut a hole in it.
 */
export function SiteHeader({
  items,
  cta,
  /** "dark" starts flush over a full-bleed hero; "light" starts as the pill. */
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
  const [glide, setGlide] = useState({ left: 0, width: 0, visible: false });
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

  // Zere Studio is its own space, so it always closes the menu and gets its
  // own treatment; the other links keep their order. Inside /zere-studio the
  // whole bar turns Zere's blue so the visitor knows where they are.
  const zereItem = items.find((i) => i.href === ZERE_HREF);
  const mainItems = items.filter((i) => i.href !== ZERE_HREF);
  const onZere = pathname.startsWith(ZERE_HREF);

  const shell = lifted
    ? onZere
      ? "bg-[#f0f7fb]/80 backdrop-blur-xl backdrop-saturate-150 border-zere-deep/18 shadow-[0_10px_30px_-16px_rgba(21,76,97,0.5)]"
      : "bg-arena/72 backdrop-blur-xl backdrop-saturate-150 border-medianoche/12 shadow-[0_10px_30px_-16px_rgba(14,98,127,0.45)]"
    : "bg-transparent border-transparent";
  const wordmark = "text-medianoche";
  const navLink = lifted
    ? "text-medianoche/80 hover:text-medianoche"
    : "text-medianoche/80 hover:text-medianoche";
  const quietLink = lifted
    ? "text-medianoche/75 hover:text-medianoche"
    : "text-medianoche/75 hover:text-medianoche";
  const ctaButton = onZere
    ? "bg-zere-deep text-arena hover:bg-zere-deep/90"
    : lifted
      ? "bg-medianoche text-arena hover:bg-medianoche"
      : "bg-medianoche text-arena hover:bg-medianoche/90";
  const bar = "bg-medianoche";

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
        {onZere ? (
          <Link href={ZERE_HREF} aria-label="Zere Studio" className="text-xl sm:text-2xl leading-none">
            <ZereWordmark />
          </Link>
        ) : (
          <Link
            href="/"
            className={`font-script text-2xl sm:text-[1.7rem] leading-none transition-colors ${wordmark}`}
          >
            PZB.
          </Link>
        )}

        {/* One pill glides between links instead of restyling the hovered
            word. The old hover swapped to italic, which is narrower than the
            roman face, so the label shrank and its neighbours shifted. The
            text never changes shape here, so nothing around it moves. */}
        <nav
          className="relative hidden lg:flex items-center gap-1 font-serif text-[0.98rem]"
          onMouseLeave={() => setGlide((g) => ({ ...g, visible: false }))}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-cielo/55 transition-[transform,width,opacity] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              width: glide.width,
              transform: `translateX(${glide.left}px)`,
              opacity: glide.visible ? 1 : 0,
            }}
          />
          {mainItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                setGlide({
                  left: el.offsetLeft,
                  width: el.offsetWidth,
                  visible: true,
                });
              }}
              onFocus={(e) => {
                const el = e.currentTarget;
                setGlide({
                  left: el.offsetLeft,
                  width: el.offsetWidth,
                  visible: true,
                });
              }}
              onBlur={() => setGlide((g) => ({ ...g, visible: false }))}
              className={`relative z-10 rounded-full px-3.5 py-1.5 transition-colors ${navLink}`}
            >
              {item.label}
            </Link>
          ))}
          {zereItem && (
            <>
              <span aria-hidden className="mx-2 h-5 w-px bg-medianoche/25" />
              {/* A rippling ring, echoing the water in Zere's brand and the
                  rings in the manifesto. It stops for reduced-motion users. */}
              <Link
                href={zereItem.href}
                aria-current={onZere ? "page" : undefined}
                className="group inline-flex items-center gap-2.5 rounded-full border border-zere-deep/25 bg-gradient-to-br from-zere-sky/80 to-zere-sky/35 py-1.5 pl-3 pr-4 text-zere-deep transition-shadow hover:shadow-[0_0_0_3px_rgba(169,205,227,0.55)]"
              >
                <span
                  aria-hidden
                  className="relative h-3 w-3 shrink-0 rounded-full border-[1.5px] border-zere-deep after:absolute after:-inset-[5px] after:rounded-full after:border after:border-zere-deep/45 after:animate-[zere-ripple_2.4s_ease-out_infinite] motion-reduce:after:animate-none"
                />
                <ZereWordmark className="text-[1.05rem] leading-none" />
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {onZere && (
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zere-deep/25 px-3 py-1 text-sm text-zere-deep transition-colors hover:bg-zere-sky/55"
            >
              <span aria-hidden>←</span> PZB
            </Link>
          )}
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
          className="lg:hidden mx-auto mt-2 max-w-6xl rounded-3xl border border-medianoche/12 bg-arena/88 backdrop-blur-xl backdrop-saturate-150 shadow-[0_18px_40px_-22px_rgba(14,98,127,0.5)] p-3"
        >
          {mainItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 font-serif text-lg text-medianoche/80 hover:bg-cielo/50 hover:text-medianoche transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {zereItem && (
            <Link
              href={zereItem.href}
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-zere-sky/70 to-zere-sky/35 px-4 py-3 text-lg text-zere-deep transition-colors hover:from-zere-sky"
            >
              <span aria-hidden className="h-3 w-3 shrink-0 rounded-full border-[1.5px] border-zere-deep" />
              <ZereWordmark />
            </Link>
          )}
          {showAuthActions && (
            <Show when="signed-out">
              <div className="mt-2 flex flex-col gap-2 border-t border-medianoche/12 pt-3">
                <SignInButton forceRedirectUrl="/home">
                  <button className="rounded-2xl px-4 py-3 text-left text-sm text-medianoche/70 hover:bg-cielo/50 transition-colors">
                    Iniciar sesión
                  </button>
                </SignInButton>
                <SignUpButton forceRedirectUrl="/home">
                  <button className="rounded-2xl bg-cielo/60 px-4 py-3 text-left text-sm font-medium text-medianoche hover:bg-cielo transition-colors">
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
