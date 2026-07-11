"use client";

import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

type Review = { quote: string; author: string };

const REVIEWS: Review[] = [
  { quote: "מקום ממש חוויתי ומפנק, נהנו מכל רגע. מומלץ מאוד לכל אחד שרוצה באמת להנות. תודה רבה לבעלי המקום על השירות והיחס הטוב.", author: "זאב ברויער" },
  { quote: 'מקום מושלם!!! מפנק מאוד! נקי ממש! רואים את המחשבה עד הפרט הכי קטן. נהנינו מאוד מאוד ונבוא שוב בעז"ה!', author: "שרי עמרני" },
  { quote: "מקום מהמם, נקי, חשיבה על הפרטים הקטנים. המקום פרטי ומוצנע ומבודד מרעשים! זאת הפעם השנייה שלנו שם — היינו בשני המתחמים והיה מדהים בשניהם! ממליצה בחום.", author: "Hen Yaakov" },
  { quote: "מעל לכל הציפיות. מקום נקי ומהנה, אני ואישתי ממליצים בחום!!", author: "ליאור ברוך" },
  { quote: "מקום פרטי לחלוטין, רומנטי ברמה גבוהה!", author: "אלחנן הלוי" },
  { quote: "מקום מדהים, מקום שווה, כדאי לכל זוג שרוצים להנות מאווירה נעימה ורומנטית, יותר מושלם מזה לא ציפיתי.", author: "אביב מועלם" },
  { quote: "number one וחבל להוסיף כי כל מילה רק תגרע מהמקום המטורף הזה, לא האמנתי שיכול להיות בעיר חרדית מקום כזה מצוין ונקי.", author: "אבי ברונר" },
  { quote: "לא ידעתי מה לצפות אבל המקום מהמם. אני ואשתי לקחנו שעתיים ומרוב שהיה לנו כיף הוספנו עוד שעה!! בוודאי נחזור. ממליצים בחום! תודה לבעלים על היחס החם והגמישות.", author: "אהרן בן דויד" },
  { quote: "אין על המקום כזה רומנטי כזה כיף. הייתי בהרבה מקומות אבל בריכה ברמה זה המקום הכי הכי. איזה שירות עם כל הלב — רואים את הלב, זה העיקר. אני מאוד מאוד ממליץ.", author: "ישראל דוד פישמן" },
  { quote: "כבר הייתי בבריכה ברמה כמה פעמים, וכל פעם נהניתי הרבה יותר. הבריכה מפנקת ונעימה, ההרגשה חלומית, ג'קוזי מ-ט-ו-ר-ף.", author: "זהבה אוחנה" },
  { quote: "המקום היה מזמין ומפנק ונקי. היה כיף 😍", author: "יחיאל כהן" },
  { quote: "מקום מושלם ממש כיף.", author: "יצחק כהן" },
  { quote: "חוויה מדהימה! פרטיות והנאה מובטחת! נהנינו מכל רגע! שירות וניקיון שאין בכל מקום. מתאים לכל חגיגה.", author: "עדי עמר" },
  { quote: "מקום מטופח וניקיון ברמה הכי גבוה. אכפת לבעלים באמת מהמקום. מאוד נהנינו, היה ממש כיף.", author: "משה אריה פויגל" },
  { quote: "מקום מדהים מדהים! מושקע בטירוף ובטעם טוב עד לפרטים הכי קטנים.", author: "ברכי ברגר" },
  { quote: "חוויה מיוחדת, הייתי פעמיים. ניקיון בבריכה, בשירותים ובמתחם. התרשמות חיובית מאוד.", author: "סיגל גלמידי" },
  { quote: "בריכה פרטית ברמה גבוהה, מחוממת באמת! המקום נקי מאוד ומצוחצח. אנשים טובים, היה כיף ממש. ממליץ לחברים.", author: "Shoham G" },
  { quote: "היינו בבריכה ברמה וזאת באמת בריכה ברמה גבוהה. החל מהמקום היפה, הנקי, המפנק, ועד היחס החם והאדיב של בעל המקום.", author: "תומר דבורה שמעיה" },
  { quote: "כניסה צדדית שאף אחד לא רואה. המקום מושקע בטרוף, נקי ומאובזר ברמה הכי גבוהה.", author: "דוד מזוז" },
  { quote: "כזוג היינו בבריכה שבוע שעבר, נהנינו מאד. מקום יפהפה, חדש, נקי ומשחרר. בעלי הבית מפנקים ומתייחסים מדהים!!!", author: "מיכאל לוי" },
  { quote: "מקום יפה, מטופח, נקי ומאובזר. בריכה מחוממת ונעימה.", author: "מיכל בר-כוכבא" },
  { quote: "מקום מהמם ומרגיע, אווירה מיוחדת — אפשר לומר רומנטית.", author: "מירי אמויאל-הוכברג" },
  { quote: 'מקום מדהים ונחמד ומפנק במיוחד. נהנינו מהיחס של בעה"ב והמחיר הנוח. שווה בהחלט.', author: "Ag ag" },
];

/* Typewriter effect for the active quote */
function TypewriterQuote({ text }: { text: string }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(text);
      return;
    }
    setShown("");
    const delay = Math.min(60, Math.max(18, Math.floor(2500 / text.length)));
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, delay);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span>
      {shown}
      <span
        className="mr-0.5 inline-block w-[2px] animate-pulse bg-[#BFA26F] align-middle"
        style={{ height: "1em" }}
        aria-hidden
      />
    </span>
  );
}

export default function TestimonialsSection() {
  const total = REVIEWS.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % total), 5500);
    return () => clearInterval(id);
  }, [total]);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const sideStack = [1, 2, 3].map((o) => ({
    idx: (active + o) % total,
    review: REVIEWS[(active + o) % total],
  }));

  const current = REVIEWS[active];

  return (
    <section
      id="מה אומרים האורחים שלנו"
      dir="rtl"
      className="relative flex h-[calc(100svh-70px)] scroll-mt-[70px] flex-col justify-center overflow-hidden bg-[#07122E] py-12"
    >
      {/* Giant decorative quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 right-6 select-none font-serif leading-none text-white"
        style={{ fontSize: "clamp(200px, 30vw, 400px)", opacity: 0.03 }}
      >
        ״
      </span>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h2 className="mb-2 text-center text-2xl font-bold text-white md:text-4xl">
          מה אומרים <span className="text-[#00AEEF] italic">האורחים שלנו</span>
        </h2>
        <div className="mx-auto mb-6 h-[3px] w-16 rounded bg-[#BFA26F]" />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left: active review */}
          <div className="flex flex-col">
            <blockquote className="rounded-lg border-r-4 border-[#BFA26F] bg-white p-5 shadow-lg md:p-6">
              <p
                className="min-h-[5rem] text-base leading-relaxed text-[#0D2561] md:text-xl"
                lang="he"
              >
                <TypewriterQuote key={active} text={current.quote} />
              </p>
              <footer className="mt-3 text-base font-semibold text-[#9C845A]">
                — {current.author}
              </footer>
            </blockquote>

            {/* Nav arrows + progress */}
            <div className="mt-5 flex items-center gap-4">
              <button
                type="button"
                aria-label="ביקורת קודמת"
                onClick={prev}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[#BFA26F] hover:text-[#BFA26F]"
              >
                <ChevronRight size={22} />
              </button>
              <button
                type="button"
                aria-label="ביקורת הבאה"
                onClick={next}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[#BFA26F] hover:text-[#BFA26F]"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="flex flex-1 flex-col gap-2">
                <div className="h-px w-full overflow-hidden bg-white/10">
                  <div
                    className="h-full bg-[#BFA26F] transition-all duration-500 ease-out"
                    style={{ width: `${((active + 1) / total) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-white/50">
                  {active + 1} / {total}
                </span>
              </div>
            </div>
          </div>

          {/* Right: next 3 reviews */}
          <div className="hidden flex-col gap-3 lg:flex">
            {sideStack.map(({ idx, review }) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                className="rounded-lg border border-white/10 bg-white/5 p-4 text-right transition-colors hover:border-[#BFA26F]/60 hover:bg-white/10"
              >
                <p className="line-clamp-3 text-sm leading-relaxed text-white/70">
                  {review.quote}
                </p>
                <span className="mt-2 block text-sm font-semibold text-[#BFA26F]">
                  {review.author}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
