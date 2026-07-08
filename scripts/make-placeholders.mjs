import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("public", { recursive: true });

const svgLabel = (w, h, bg, text, sub = "") => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <text x="50%" y="48%" fill="#ffffff" font-family="sans-serif"
        font-size="${Math.round(Math.min(w, h) / 8)}" font-weight="700"
        text-anchor="middle" dominant-baseline="middle" opacity="0.9">${text}</text>
  <text x="50%" y="62%" fill="#ffffff" font-family="sans-serif"
        font-size="${Math.round(Math.min(w, h) / 22)}"
        text-anchor="middle" dominant-baseline="middle" opacity="0.6">${sub}</text>
</svg>`);

const jobs = [
  { file: "public/zimmer1.jpg", w: 1600, h: 900, bg: "#0D2561", t: "zimmer1", s: "placeholder", fmt: "jpeg" },
  { file: "public/y3.png", w: 1600, h: 900, bg: "#1A3A8A", t: "y3", s: "placeholder", fmt: "png" },
  { file: "public/logo.jpg", w: 200, h: 120, bg: "#0D2561", t: "LOGO", s: "", fmt: "jpeg" },
  { file: "public/logo-brand.png", w: 700, h: 700, bg: "#0A1C49", t: "בריכה ברמה", s: "logo-brand", fmt: "png" },
];

for (const j of jobs) {
  const img = sharp(svgLabel(j.w, j.h, j.bg, j.t, j.s));
  await (j.fmt === "jpeg" ? img.jpeg({ quality: 80 }) : img.png()).toFile(j.file);
  console.log("wrote", j.file);
}
