"use client";

import { useEffect } from "react";

/** Sections participating in PageDown/PageUp snap scrolling, in document order. */
const SNAP_SECTIONS = [
  "main-content",
  "suites",
  "zimmer1",
  "zimmer2",
  "contact",
  "footer",
] as const;

export default function RevealObserver() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── Reveal-on-scroll ──────────────────────────────
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );

    let observer: IntersectionObserver | null = null;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("visible"));
    } else {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => observer!.observe(el));
    }

    // ── Section snap on PageDown / PageUp ─────────────
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "PageDown" && e.key !== "PageUp") return;

      const sections = SNAP_SECTIONS.map((id) =>
        document.getElementById(id)
      ).filter((el): el is HTMLElement => el !== null);
      if (sections.length === 0) return;

      e.preventDefault();

      // Current section = the last one whose top is at/above the viewport middle.
      const marker = window.innerHeight * 0.4;
      let currentIndex = 0;
      sections.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= marker) currentIndex = i;
      });

      const nextIndex =
        e.key === "PageDown"
          ? Math.min(currentIndex + 1, sections.length - 1)
          : Math.max(currentIndex - 1, 0);

      sections[nextIndex].scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      observer?.disconnect();
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return null;
}
