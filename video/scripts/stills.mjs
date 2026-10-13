// Ekspor beberapa frame sebagai PNG untuk dicek: node scripts/stills.mjs [Tutorial916|Tutorial169] [detik,...]
import { execSync } from "node:child_process";
const comp = process.argv[2] || "Tutorial916";
const secs = (process.argv[3] || "1.5,5,8.5,12,16,20,24,28,31,35,38,41.5,43.5").split(",").map(Number);
for (const s of secs) {
  const f = Math.round(s * 30);
  execSync(`npx remotion still ${comp} out/stills/${comp}-${String(s).replace(".", "_")}s.png --frame=${f}`, { stdio: "inherit" });
}
