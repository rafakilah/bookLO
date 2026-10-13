import { continueRender, delayRender, staticFile } from "remotion";

const FACES: [string, string, FontFaceDescriptors][] = [
  ["Bricolage Grotesque", "fonts/bricolage.woff2", { weight: "200 800", stretch: "75% 100%" }],
  ["IBM Plex Sans", "fonts/plex-sans-400.woff2", { weight: "400" }],
  ["IBM Plex Sans", "fonts/plex-sans-500.woff2", { weight: "500" }],
  ["IBM Plex Sans", "fonts/plex-sans-600.woff2", { weight: "600" }],
  ["IBM Plex Sans", "fonts/plex-sans-700.woff2", { weight: "700" }],
  ["IBM Plex Mono", "fonts/plex-mono-400.woff2", { weight: "400" }],
  ["IBM Plex Mono", "fonts/plex-mono-500.woff2", { weight: "500" }],
  ["IBM Plex Mono", "fonts/plex-mono-600.woff2", { weight: "600" }],
];

let started = false;
export const loadFonts = () => {
  if (started || typeof document === "undefined") return;
  started = true;
  const handle = delayRender("Memuat font");
  Promise.all(
    FACES.map(([family, file, desc]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, desc);
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
};
