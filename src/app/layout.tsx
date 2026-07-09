import type { Metadata } from "next";
import {
  Assistant,
  Cormorant_Garamond,
  Dancing_Script,
  Rubik_Scribble,
  Amatic_SC,
} from "next/font/google";
import "./globals.css";
import RevealObserver from "@/components/reveal-observer";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

const scribble = Rubik_Scribble({
  subsets: ["hebrew", "latin"],
  weight: "400",
  variable: "--font-scribble",
  display: "swap",
});

const amatic = Amatic_SC({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  variable: "--font-amatic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "בריכה ברמה | ספא ברמה אחרת",
  description: "נופש מושלם ואירוח מפנק עם בריכה פרטית",
  keywords: [
    "בריכה ברמה",
    "בריכה בבית שמש",
    "בריכה פרטית",
    "בריכה לזוגות",
    "בריכה להשכרה",
    "צימר",
    "בריכה",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${cormorant.variable} ${dancing.variable} ${scribble.variable} ${amatic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#EEF2F8] text-[#0D2561]">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
