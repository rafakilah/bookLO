// Semua teks, durasi, dan data fiktif video ada di file ini.
// Setelah mengubah, render ulang dengan: npm run render  (9:16)  atau  npm run render:169  (16:9)

export const FPS = 30;

// Link penutup. Kosongkan ("") untuk menampilkan ruang kosong yang bisa ditempel link/QR saat editing.
// Isi dengan URL lengkap (misalnya "https://lo-wisuda-sbm.vercel.app") untuk otomatis menampilkan QR code dan link.
export const OUTRO_LINK = "";
// Teks link yang ditampilkan di bawah QR. Kosongkan untuk memakai OUTRO_LINK tanpa "https://".
export const OUTRO_LINK_LABEL = "";

// Teks di bilah alamat browser dalam bingkai HP.
export const BROWSER_BAR = "Pemesanan LO Wisuda SBM";

export type SceneId =
  | "intro" | "home" | "prodi" | "login" | "dash" | "search"
  | "pick" | "full" | "request" | "info" | "outro";

export type Scene = {
  id: SceneId;
  dur: number; // detik
  eyebrow?: string; // label kecil di atas keterangan
  caption?: string; // keterangan utama (minimal 64px)
  sub?: string; // keterangan tambahan (48px)
};

// Durasi tiap adegan dalam detik. Total harus 35 sampai 45 detik.
// Gerakan jari di tiap adegan diatur dalam detik sejak adegan dimulai,
// jadi kalau durasi dipersingkat jauh, cek lagi hasilnya.
export const SCENES: Scene[] = [
  { id: "intro", dur: 3 },
  { id: "home", dur: 3.5, eyebrow: "Langkah 1", caption: "Buka link, pilih Wisudawan" },
  { id: "prodi", dur: 3.5, eyebrow: "Langkah 2", caption: "Pilih prodimu" },
  { id: "login", dur: 5.5, eyebrow: "Langkah 3", caption: "Masuk pakai NIM", sub: "lalu lanjut dengan akun Google yang terdaftar" },
  { id: "dash", dur: 4, eyebrow: "Batas waktu", caption: "Pilih sebelum Jumat, 16 Oktober 2026, 23.59 WIB" },
  { id: "search", dur: 5, eyebrow: "Langkah 4", caption: "Mau satu LO dengan teman? Cari nama temanmu" },
  { id: "pick", dur: 5, eyebrow: "Langkah 5", caption: "Satu LO maksimal 3 wisudawan. Siapa cepat dia dapat" },
  { id: "full", dur: 3.5, eyebrow: "Perhatikan", caption: "LO penuh tidak bisa dipilih lagi" },
  { id: "request", dur: 4, eyebrow: "Kebutuhan khusus", caption: "Grup lebih dari 3 orang atau mau LO tertentu? Isi request khusus" },
  { id: "info", dur: 4 },
  { id: "outro", dur: 3 },
];

export const INTRO = {
  title: "Cara Pilih LO Wisuda",
  sub: "Wisuda Oktober 2026 · SBM ITB",
};
export const INFO = {
  eyebrow: "Penting",
  title: "Tidak memilih sampai batas waktu?",
  body: "Panitia akan memilihkan LO untukmu",
  note: "Batas: Jumat, 16 Oktober 2026, 23.59 WIB",
};
export const OUTRO = {
  title: "Link ada di broadcast panitia",
  sub: "Pilih LO-mu sekarang, sebelum slotnya penuh",
};

// ===== Data fiktif (bukan data wisudawan atau LO asli) =====
export const ME = { nama: "Nadia Putri", nim: "19023999", prodi: "Manajemen", him: "KMM" };
export const FRIEND_QUERY = "Kirana"; // diketik di kolom pencarian
export const TARGET_LO = "Dimas Aditya"; // LO yang dipilih teman, lalu dipilih Nadia
export const FULL_LO = "Salsa Maharani"; // contoh LO penuh
export const QUOTA = 3;
export const LO_COUNT_LABEL = "103 LO";
export const FREE_LO_COUNT = 96;

export type FakeLO = { nama: string; who: string[] };
export const LOS: FakeLO[] = [
  { nama: "Alya Rahmawati", who: [] },
  { nama: "Bayu Saputra", who: ["Intan Permata"] },
  { nama: "Dimas Aditya", who: ["Kirana Ayu"] },
  { nama: "Salsa Maharani", who: ["Bagas Prakoso", "Citra Lestari", "Rizky Hidayat"] },
  { nama: "Galih Ramadhan", who: [] },
  { nama: "Nabila Zahra", who: ["Dewi Anggraini", "Yoga Pratama"] },
  { nama: "Raka Pratama", who: ["Putri Anjani", "Fajar Nugroho", "Laras Wening"] },
  { nama: "Tiara Kusuma", who: ["Hana Safira"] },
];

// Hitung mundur yang tampil di dashboard (dimulai dari nilai ini lalu berjalan per detik).
export const COUNTDOWN_START = { d: 3, h: 1, m: 45, s: 27 };
