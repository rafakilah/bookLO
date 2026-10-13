# Video tutorial pilih LO

Motion graphic 44 detik, tanpa audio, dibuat dengan Remotion. Tampilan layar meniru `design/pratinjau.html`.
Semua nama dan NIM di video fiktif.

Hasil render ada di `hasil/`:
- `tutorial-lo-9x16.mp4` (1080 x 1920, untuk WhatsApp dan Instagram Story)
- `tutorial-lo-16x9.mp4` (1920 x 1080, untuk presentasi)

## Mengubah teks, durasi, atau link
Semua ada di `src/config.ts`:
- `SCENES`: keterangan, label kecil, dan durasi tiap adegan (detik)
- `INTRO`, `INFO`, `OUTRO`: teks pembuka, info penting, dan penutup
- `OUTRO_LINK`: isi URL website untuk menampilkan QR code dan link di penutup. Kalau kosong, penutup menampilkan kotak kosong.
- `ME`, `LOS`, dst.: data fiktif di layar

## Render ulang
```bash
cd video
npm install
npm run render       # 9:16  -> out/tutorial-lo-9x16.mp4
npm run render:169   # 16:9  -> out/tutorial-lo-16x9.mp4
npm run studio       # pratinjau interaktif di browser
npm run stills       # ekspor beberapa frame ke out/stills untuk dicek
```
Di cloud session ini Chromium bawaan dipakai lewat
`REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.
Di komputer sendiri variabel itu tidak perlu, Remotion akan mengunduh browsernya sendiri.
