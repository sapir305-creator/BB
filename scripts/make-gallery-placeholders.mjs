import sharp from "sharp";

const svg = (w, h, bg, text) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <text x="50%" y="50%" fill="#ffffff" font-family="sans-serif"
        font-size="${Math.round(Math.min(w, h) / 6)}" font-weight="700"
        text-anchor="middle" dominant-baseline="middle" opacity="0.75">${text}</text>
</svg>`);

const palette = ["#0D2561", "#1A3A8A", "#00AEEF", "#7A8EAA", "#9C845A", "#0A1C49"];

const jobs = [
  { file: "public/zimmer2.jpg", t: "zimmer2", fmt: "jpeg" },
  { file: "public/h1.jpg", t: "h1", fmt: "jpeg" },
  { file: "public/h2.jpg", t: "h2", fmt: "jpeg" },
  { file: "public/h3.jpg", t: "h3", fmt: "jpeg" },
  { file: "public/h4.jpg", t: "h4", fmt: "jpeg" },
  { file: "public/y1.png", t: "y1", fmt: "png" },
  { file: "public/y2.png", t: "y2", fmt: "png" },
  { file: "public/y4.png", t: "y4", fmt: "png" },
  { file: "public/y5.png", t: "y5", fmt: "png" },
  { file: "public/y6.jpg", t: "y6", fmt: "jpeg" },
];

let i = 0;
for (const j of jobs) {
  const bg = palette[i % palette.length];
  i++;
  const img = sharp(svg(1600, 900, bg, j.t));
  await (j.fmt === "jpeg" ? img.jpeg({ quality: 80 }) : img.png()).toFile(j.file);
  console.log("wrote", j.file);
}
