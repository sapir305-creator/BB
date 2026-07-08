"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SLIDES = ["/zimmer1.jpg", "/y3.png"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background slideshow */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.22) 78%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-4 text-center">
        {/* Glass square with brand logo */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="flex aspect-square items-center justify-center rounded-sm"
          style={{
            width: "clamp(260px, 36vw, 480px)",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            border: "1px solid rgba(255,255,255,0.55)",
          }}
        >
          <div className="relative" style={{ width: "80%", height: "80%" }}>
            <Image
              src="/logo-brand.png"
              alt="בריכה ברמה"
              fill
              sizes="480px"
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          dir="rtl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="flex flex-row gap-4"
        >
          <a
            href="#contact"
            className="rounded-md border border-white px-6 py-3 text-[26px] leading-none font-medium text-white transition-colors duration-300 hover:bg-white hover:text-[#0D2561]"
          >
            הזמן את השהות שלך
          </a>
          <a
            href="#suites"
            className="rounded-md border border-[#BFA26F] px-6 py-3 text-[26px] leading-none font-medium text-[#BFA26F] transition-colors duration-300 hover:bg-[#BFA26F] hover:text-[#0D2561]"
          >
            המתחמים שלנו
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)",
          }}
        />
        <span className="text-xs tracking-[0.3em] text-white/80">גלול</span>
      </div>
    </section>
  );
}
