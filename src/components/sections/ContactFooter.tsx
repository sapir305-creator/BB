"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const SERVICE_ID = "service_hlylyfh";
const TEMPLATE_ID = "template_8k64sls";
const PUBLIC_KEY = "9M6XTeBoNGFYU60Nz";

const FIELDS = [
  { name: "firstName", label: "שם פרטי", type: "text", delay: 0.55, required: true },
  { name: "lastName", label: "שם משפחה", type: "text", delay: 0.65, required: true },
  { name: "phone", label: "טלפון", type: "tel", delay: 0.75, required: true },
  { name: "email", label: "אימייל", type: "email", delay: 0.85, required: true },
  { name: "message", label: "פרטים נוספים", type: "textarea", delay: 0.97, required: false },
] as const;

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "כתובת",
    lines: ["רבינא 10, בית שמש, ישראל"],
    delay: 0.4,
  },
  {
    icon: Phone,
    title: "טלפון ומייל",
    lines: ["0556752827", "vv2aba@gmail.com"],
    delay: 0.55,
  },
  {
    icon: Clock,
    title: "שעות פעילות",
    lines: [
      "כל שעות היום ללא שבת וחגים.",
      "מענה טלפוני: א-ה 14:00-16:00 ו-20:30-22:30,",
      'ו׳ 8:00-12:00, מוצ"ש עד 00:00',
    ],
    delay: 0.7,
  },
];

export default function ContactFooter() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const update = (name: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    setError(false);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: `${form.firstName} ${form.lastName}`.trim(),
          from_email: form.email,
          phone: form.phone,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setSent(true);
      setForm(EMPTY);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const year = new Date().getFullYear();

  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        dir="rtl"
        className="min-h-screen bg-white py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
          {/* Info column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <h2
                id="contact-heading"
                className="text-4xl font-bold text-[#0D2561] md:text-5xl"
              >
                בואו <span className="text-[#00AEEF] italic">נדבר</span>
              </h2>
              <div className="mt-5 h-[3px] w-16 rounded bg-[#BFA26F]" />
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#1A3A8A]">
                מוזמנים להשאיר פרטים ונחזור אליכם בהקדם לתיאום שהות פרטית
                ובלתי נשכחת.
              </p>
            </motion.div>

            <div className="mt-10 flex flex-col gap-7">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: item.delay, ease: "easeOut" }}
                    className="flex items-start gap-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF2F8] text-[#0D2561]">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#0D2561]">
                        {item.title}
                      </h3>
                      {item.lines.map((line) => (
                        <p key={line} className="text-[#5B6B78]">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl bg-[#EEF2F8] p-7 shadow-sm md:p-10"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {FIELDS.map((field) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: field.delay, ease: "easeOut" }}
                >
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-sm font-medium text-[#0D2561]"
                  >
                    {field.label}
                    {field.required && <span className="text-[#00AEEF]"> *</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      value={form[field.name as keyof FormState]}
                      onChange={(e) =>
                        update(field.name as keyof FormState, e.target.value)
                      }
                      className="w-full resize-none rounded-lg border border-[#D8E2F0] bg-white px-4 py-3 text-[#0D2561] outline-none transition-colors focus:border-[#00AEEF]"
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      value={form[field.name as keyof FormState]}
                      onChange={(e) =>
                        update(field.name as keyof FormState, e.target.value)
                      }
                      className="w-full rounded-lg border border-[#D8E2F0] bg-white px-4 py-3 text-[#0D2561] outline-none transition-colors focus:border-[#00AEEF]"
                    />
                  )}
                </motion.div>
              ))}

              <button
                type="submit"
                disabled={sending}
                className="btn-glow mt-2 rounded-lg bg-[#0D2561] py-3.5 text-lg font-semibold text-white transition-colors hover:bg-[#1A3A8A] disabled:opacity-50"
              >
                {sending ? "שולח..." : "שליחת פנייה"}
              </button>

              {sent && (
                <p
                  role="status"
                  className="rounded-lg bg-green-50 px-4 py-3 text-center font-medium text-green-700"
                >
                  הפנייה נשלחה בהצלחה! נחזור אליך בהקדם.
                </p>
              )}
              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-center font-medium text-red-700"
                >
                  שגיאה בשליחה, אנא נסה שוב.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" dir="rtl" className="bg-[#07122E] py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-right">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Image
              src="/logo.jpg"
              alt="בריכה ברמה"
              width={90}
              height={54}
              className="h-12 w-auto rounded object-contain"
            />
            <p className="text-sm text-white/70">רבינא 10, בית שמש, ישראל</p>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-white/60 md:items-end">
            <p>© {year} בריכה ברמה · כל הזכויות שמורות</p>
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-[#BFA26F]">
                מדיניות פרטיות
              </a>
              <span aria-hidden>·</span>
              <a href="#" className="transition-colors hover:text-[#BFA26F]">
                תנאי שימוש
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
