"use client";

import { useState } from "react";
import Link from "next/link";

export function MainNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="hidden sm:flex items-center gap-7 font-serif text-[1.05rem] text-charcoal/70">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-earth-brown hover:italic transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="sm:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
      >
        <span
          className={`block h-px w-6 bg-earth-brown transition-transform ${
            open ? "translate-y-[3.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-px w-6 bg-earth-brown transition-transform ${
            open ? "-translate-y-[3.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <nav className="sm:hidden absolute right-0 top-12 z-10 w-56 rounded-lg border border-beige-sand bg-cream shadow-sm py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 font-serif text-base text-charcoal/80 hover:bg-beige-sand/40 hover:text-earth-brown transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
