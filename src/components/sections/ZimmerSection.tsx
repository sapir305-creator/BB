"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useInView, type TargetAndTransition } from "framer-motion";
import {
  Waves,
  Armchair,
  UtensilsCrossed,
  BedDouble,
  DoorOpen,
  Zap,
  Flame,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Types & data
   ──────────────────────────────────────────────────────────── */

type Complex = {
  id: string;
  number: string;
  title: string;
  tag: string;
  imageUrl: string;
  description: string;
  features: string[];
  price: string;
  priceSubLines: string[];
  gallery: string[];
  galleryLabel: string;
};

const COMPLEXES: Complex[] = [
  {
    id: "zimmer1",
    number: "01",
    title: "מתחם חוויה",
    tag: "בריכה פרטית · ג'קוזי",
    imageUrl: "/zimmer1.jpg",
    gallery: ["/h_1.jpg", "/h_2.jpg", "/h_3.jpg", "/h_4.jpg", "/h_5.jpg", "/h_6.jpg", "/h_7.jpg", "/h_8.jpg"],
    galleryLabel: "מתחם חוויה",
    description:
      "מתחם חוויה מציע בריכה מחוממת 33 מעלות בגודל 6.4×2.7 עומק 1.3, ג׳קוזי מקצועי מפנק וגדול מותאם ל-4 אנשים, פינת ישיבה, מטבחון, מיניבר, מקרר, מקלחת שירותים, מיטת שיזוף כלומר מיטת יחיד מתכווננת, כורסת עיסוי ועוד פינוקים בהזמנת 2 אנשים. הכל בפרטיות מוחלטת, בכניסה פרטית ומתחם סגור.",
    features: [
      "בריכה מחוממת 33°",
      "ג'קוזי ל-4 אנשים",
      "כורסת עיסוי",
      "מטבחון ומיניבר",
      "מיטת יחיד",
      "כניסה פרטית",
    ],
    price: 'מחיר לזוג 450 ש"ח לשעתיים',
    priceSubLines: [
      'כל אדם נוסף 50 ש"ח לשעתיים',
      "שעה שלישית במבצע ב-100 לזוג, ב-200 לקבוצה",
      'שעה רביעית והלאה 250 ש"ח',
      "הכניסה מגיל 18 בלבד, לקבוצות עד 6 אנשים",
    ],
  },
  {
    id: "zimmer2",
    number: "02",
    title: "מתחם יוקרה",
    tag: "ספא שחייה · סאונה",
    imageUrl: "/zimmer2.jpg",
    gallery: ["/y1.png", "/y2.png", "/y3.png", "/y4.png", "/y5.png", "/y6.png"],
    galleryLabel: "מתחם יוקרה",
    description:
      "מתחם יוקרה הוא מתחם VIP מעוצב באווירה יוקרתית המציע בריכת זרמים ברמה גבוהה משולבת כסאות ג׳קוזי, בגודל כ-6מ׳ על 2.2מ׳ עומק 1.3מ׳, סאונה אבנים יבשה, כורסת עיסוי מקצועית, קונכייה זוגית כמו מיטה זוגית עגולה, פינת ישיבה, מקלחת שירותים, ומטבחון.",
    features: [
      "בריכת זרמים VIP",
      "כסאות ג'קוזי",
      "סאונה אבנים יבשה",
      "כורסת עיסוי",
      "קונכייה זוגית",
      "מטבחון",
    ],
    price: 'מחיר לזוג 550 ש"ח לשעתיים',
    priceSubLines: [
      'כל אדם נוסף 50 ש"ח לשעתיים',
      "שעה שלישית במבצע ב-100 לזוג, ב-200 לקבוצה",
      'שעה רביעית והלאה 250 ש"ח',
      "הכניסה מגיל 18 בלבד, לקבוצות עד 4 אנשים",
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Feature icons
   ──────────────────────────────────────────────────────────── */

function FeatureIcon({ label }: { label: string }) {
  const iconProps = { size: 34, strokeWidth: 1.2, color: "#BFA26F" } as const;
  const emoji = (e: string) => (
    <span style={{ fontSize: 26, lineHeight: 1 }} aria-hidden>
      {e}
    </span>
  );

  switch (label) {
    case "בריכה מחוממת 33°":
      return <Waves {...iconProps} />;
    case "ג'קוזי ל-4 אנשים":
    case "כסאות ג'קוזי":
      return emoji("🛁");
    case "כורסת עיסוי":
      return <Armchair {...iconProps} />;
    case "מטבחון ומיניבר":
    case "מטבחון":
      return <UtensilsCrossed {...iconProps} />;
    case "מיטת יחיד":
    case "קונכייה זוגית":
      return <BedDouble {...iconProps} />;
    case "כניסה פרטית":
      return <DoorOpen {...iconProps} />;
    case "בריכת זרמים VIP":
      return <Zap {...iconProps} />;
    case "סאונה אבנים יבשה":
      return <Flame {...iconProps} />;
    default:
      return <Waves {...iconProps} />;
  }
}

/* ────────────────────────────────────────────────────────────
   FadeIn helper
   ──────────────────────────────────────────────────────────── */

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const hidden =
    direction === "up"
      ? { opacity: 0, y: 40 }
      : direction === "left"
        ? { opacity: 0, x: -50 }
        : { opacity: 0, x: 50 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : hidden}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   Lightbox
   ──────────────────────────────────────────────────────────── */

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // RTL: left arrow → next, right arrow → previous
      else if (e.key === "ArrowLeft") onNext();
      else if (e.key === "ArrowRight") onPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      dir="rtl"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      {/* Close */}
      <button
        type="button"
        aria-label="סגור"
        onClick={onClose}
        className="absolute top-5 left-5 z-20 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25"
      >
        <X size={28} />
      </button>

      {/* Prev (right side in RTL) */}
      <button
        type="button"
        aria-label="הקודם"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute right-4 z-20 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 md:right-8"
      >
        <ChevronRight size={36} />
      </button>

      {/* Next (left side in RTL) */}
      <button
        type="button"
        aria-label="הבא"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute left-4 z-20 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 md:left-8"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative"
        style={{ width: "90vw", height: "80vh" }}
      >
        <Image
          src={images[index]}
          alt={`תמונה ${index + 1}`}
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-lg tracking-widest text-white/90">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Gallery
   ──────────────────────────────────────────────────────────── */

function Gallery({
  id,
  images,
  label,
}: {
  id: string;
  images: string[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const show = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section
      id={id}
      dir="rtl"
      className="scroll-mt-[70px] bg-[#EEF3FA] py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <h3 className="text-center text-3xl font-semibold md:text-4xl">
            <span className="text-[#BFA26F]">גלריה</span>
            <span className="text-[#0D2561]"> · {label}</span>
          </h3>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((src, i) => (
            <FadeIn key={src} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => show(i)}
                className="group relative block w-full overflow-hidden rounded-lg shadow-md"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={src}
                  alt={`${label} — תמונה ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale-[0.15] transition-all duration-500 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                />
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {open && (
        <Lightbox
          images={images}
          index={index}
          onClose={() => setOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   ComplexBlock
   ──────────────────────────────────────────────────────────── */

function ComplexBlock({ data }: { data: Complex }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const featuresBaseDelay = 0.7;
  const featuresStep = 0.08;
  const priceDelay =
    featuresBaseDelay + data.features.length * featuresStep + 0.1;

  const show = (props: TargetAndTransition): TargetAndTransition | undefined =>
    inView ? props : undefined;

  return (
    <>
      <section
        id={data.id}
        ref={ref}
        className="relative h-[calc(100svh-70px)] w-full overflow-hidden scroll-mt-[70px]"
      >
        {/* Background image */}
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Light gradient — keeps the photo visible, text stays legible via text-shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        {/* Content — fits exactly one screen below the header (no inner scroll) */}
        <div
          dir="rtl"
          className="relative z-10 flex h-full flex-col justify-center gap-2 px-6 py-5 text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.7)] md:px-16"
        >
          {/* Top bar: tag + number */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span className="text-2xl font-bold text-[#BFA26F] md:text-3xl">
              {data.number}
            </span>
            <span className="text-xs tracking-[0.25em] text-white/85 md:text-sm">
              {data.tag}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, x: 60 }}
            animate={show({ opacity: 1, x: 0 })}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-bold leading-[0.95]"
            style={{ fontSize: "clamp(26px, 5vw, 64px)" }}
          >
            {data.title}
          </motion.h2>

          {/* Gold bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={show({ scaleX: 1 })}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            className="origin-right bg-[#BFA26F]"
            style={{ width: 16, height: 3 }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="w-full leading-snug text-white/95 md:w-1/2"
            style={{ fontSize: "clamp(13px, 1.5vw, 19px)" }}
          >
            {data.description}
          </motion.p>

          {/* Features */}
          <div className="flex flex-wrap gap-2.5">
            {data.features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={show({ opacity: 1, scale: 1 })}
                transition={{
                  duration: 0.5,
                  delay: featuresBaseDelay + i * featuresStep,
                  ease: "easeOut",
                }}
                className="flex w-[calc(33.333%-0.7rem)] flex-col items-center gap-1 rounded-md p-2 text-center sm:w-24"
                style={{
                  maxWidth: 112,
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.35)",
                }}
              >
                <FeatureIcon label={f} />
                <span className="text-[clamp(10px,1vw,13px)] leading-tight">
                  {f}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Price + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: 0.7, delay: priceDelay, ease: "easeOut" }}
            className="mr-auto text-left"
          >
            <div
              className="font-bold text-[#BFA26F]"
              style={{ fontSize: "clamp(20px, 3vw, 38px)" }}
            >
              {data.price}
            </div>
            <div className="mt-1 flex flex-col gap-0.5">
              {data.priceSubLines.map((line) => (
                <span
                  key={line}
                  className="text-white/90"
                  style={{ fontSize: "clamp(11px, 1.1vw, 15px)" }}
                >
                  {line}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="mt-3 inline-block rounded-md bg-[#BFA26F] font-semibold text-[#0D2561] transition-colors duration-300 hover:bg-white"
              style={{
                padding: "8px 30px",
                fontSize: "clamp(15px, 1.9vw, 22px)",
              }}
            >
              הזמן עכשיו
            </a>
          </motion.div>
        </div>
      </section>

      <Gallery
        id={`gallery-${data.id}`}
        images={data.gallery}
        label={data.galleryLabel}
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   Section
   ──────────────────────────────────────────────────────────── */

export default function ZimmerSection() {
  return (
    <>
      <section
        id="suites"
        dir="rtl"
        className="flex h-[calc(100svh-70px)] scroll-mt-[70px] items-center justify-center bg-[#EEF3FA] py-16"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn delay={0}>
            <h2 className="text-4xl font-bold text-[#0D2561] md:text-6xl">
              המתחמים{" "}
              <span className="text-[#00AEEF] italic">שלנו</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mx-auto mt-6 h-[3px] w-16 rounded bg-[#BFA26F]" />
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#1A3A8A] md:text-xl">
              שני מתחמים פרטיים בלעדיים — כל אחד עולם של מים, חמימות ובידוד מוחלט.
              מתוכננים לזוגות המחפשים הנאה בלתי נשכחת.
            </p>
          </FadeIn>
        </div>
      </section>

      {COMPLEXES.map((c) => (
        <ComplexBlock key={c.id} data={c} />
      ))}
    </>
  );
}
