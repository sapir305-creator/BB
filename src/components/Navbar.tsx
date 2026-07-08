"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "מתחם חוויה", href: "#zimmer1" },
  { label: "מתחם יוקרה", href: "#zimmer2" },
  { label: "תמונות חוויה", href: "#gallery-zimmer1" },
  { label: "תמונות יוקרה", href: "#gallery-zimmer2" },
  { label: "תגובות", href: "#מה אומרים האורחים שלנו" },
  { label: "צור קשר", href: "#contact" },
] as const;

function ScribbleUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      fill="none"
      className="pointer-events-none absolute -bottom-1.5 right-0 left-0 h-2 w-full origin-right scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
    >
      <path
        d="M1 4.5 Q 12 0.5 24 4 T 48 4 T 72 4 T 99 4.5"
        stroke="#F5A623"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[70px] bg-[#0D2561] transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo (right in RTL) */}
        <a href="#main-content" className="flex shrink-0 items-center">
          <Image
            src="/logo.jpg"
            alt="בריכה ברמה"
            width={100}
            height={60}
            priority
            className="h-[60px] w-auto object-contain"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative py-1 text-[0.82rem] font-medium tracking-wide text-[#EEF2F8] transition-colors hover:text-white"
              >
                {link.label}
                <ScribbleUnderline />
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group relative hidden overflow-hidden rounded-md bg-[#BFA26F] px-5 py-2 text-[0.85rem] font-semibold text-[#0D2561] md:inline-flex"
          >
            <span className="absolute inset-0 origin-right translate-x-full bg-[#0D2561] transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              הזמן עכשיו
            </span>
          </a>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            aria-label="תפריט"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-0.5 w-6 rounded bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-[#0A1C49] transition-[max-height] duration-500 ease-in-out lg:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-white/10 py-3 text-[0.95rem] text-[#EEF2F8] transition-colors hover:text-[#BFA26F]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="py-3">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex rounded-md bg-[#BFA26F] px-5 py-2 font-semibold text-[#0D2561]"
            >
              הזמן עכשיו
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
