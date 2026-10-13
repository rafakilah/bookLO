// Tiruan layar website, markup dan teks sama dengan design/pratinjau.html (lebar HP 400px).
import React from "react";
import { COUNTDOWN_START, FREE_LO_COUNT, FakeLO, LOS, LO_COUNT_LABEL, ME, QUOTA } from "../config";

const IcBack = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>;
const IcSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
const IcG = () => (
  <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z" /><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" /></svg>
);
const Back: React.FC<{ label?: string }> = ({ label = "Kembali" }) => <button className="back"><IcBack />{label}</button>;
const Caret: React.FC<{ on: boolean }> = ({ on }) => <span className="caret-bar" style={{ opacity: on ? 1 : 0 }} />;

export const Port = () => (
  <svg className="port" viewBox="0 0 120 120" aria-hidden>
    <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style={{ stopColor: "var(--band-3)" }} /><stop offset=".55" style={{ stopColor: "var(--sun-2)" }} /><stop offset="1" style={{ stopColor: "var(--sun-1)" }} /></linearGradient></defs>
    <rect width="120" height="74" fill="url(#sk)" /><circle cx="60" cy="72" r="14" style={{ fill: "var(--sun-1)" }} />
    <rect y="72" width="120" height="48" style={{ fill: "var(--sea)" }} />
    <path d="M14 80h30M70 88h36M30 98h24" style={{ stroke: "var(--sun-1)", strokeWidth: 2, opacity: 0.7 }} />
    <path d="M84 70l0-22 12 20z M82 70l0-16-8 14z" style={{ fill: "var(--ink)" }} /><path d="M72 72h28l-4 4H76z" style={{ fill: "var(--ink)" }} />
  </svg>
);

type PS = { press?: (k: string) => React.CSSProperties };
const noPress = () => ({});

/* Beranda */
export const Home: React.FC<PS> = ({ press = noPress }) => (
  <div className="wrap">
    <section className="home">
      <div className="eyebrow">Perayaan Wisuda SBM ITB · Oktober 2026</div>
      <h1>Kamu siapa?</h1>
      <p className="lead">Pilih Liaison Officer yang akan mendampingimu di hari wisuda. Janjian dengan teman supaya kalian didampingi LO yang sama.</p>
      <button className="big-ticket tk-shadow" data-k="wis" style={press("wis")}>
        <div className="ticket" style={{ padding: "14px 20px" }}>
          <div className="stars" style={{ textAlign: "center" }}>★ ★ ★ ★ ★</div>
          <div className="band" style={{ fontSize: 60 }}>Wisudawan</div>
          <div className="rule"><span>✦</span></div>
          <div className="meta3" style={{ fontSize: 11.5 }}><div>SBM ITB</div><div>Pilih LO<br />pendampingmu</div><div>2026</div></div>
          <div className="rule"><span>✦</span></div>
          <div className="cta"><span className="stars">★ ★ ★</span><span>Masuk sebagai wisudawan →</span></div>
        </div>
      </button>
      <button className="stub-btn tk-shadow"><div className="ticket"><span className="stars">★</span><b>Saya LO</b><span className="muted" style={{ fontSize: 13 }}>Lihat wisudawanmu</span></div></button>
      <div className="home-foot" style={{ flexWrap: "wrap", justifyContent: "center" }}><span>Batas pemilihan Jumat, 16 Oktober 2026, 23.59 WIB</span><span>·</span><button className="linkbtn">Panitia</button></div>
    </section>
  </div>
);

/* Pilih prodi */
export const Prodi: React.FC<PS> = ({ press = noPress }) => (
  <div className="wrap narrow stack" style={{ gap: 20 }}>
    <Back />
    <div>
      <div className="eyebrow">Langkah 1 dari 2</div>
      <h1 style={{ fontSize: 36, fontStretch: "82%", fontWeight: 800, marginTop: 6 }}>Program studimu?</h1>
      <p className="muted" style={{ margin: "6px 0 0" }}>Kamu hanya bisa memilih LO dari himpunan prodimu.</p>
    </div>
    <div className="prodi-grid" data-k="prodi-grid">
      {[
        ["190", "Manajemen", 199, "KMM"],
        ["192", "Kewirausahaan", 49, "IMK"],
      ].map(([code, nama, n, him]) => (
        <button key={code as string} className="prodi tk-shadow" data-k={`prodi-${code}`} style={press(`prodi-${code}`)}>
          <div className="ticket">
            <span className="code">PRODI {code}</span><h3>{nama}</h3>
            <span className="muted" style={{ fontSize: 13.5 }}>{n} wisudawan · didampingi LO {him}</span>
            <span className="stars">★ ★ ★</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

/* Login */
export const Login: React.FC<PS & { nim: string; caret: boolean | null; step: "nim" | "google" | "wait" }> = ({ press = noPress, nim, caret, step }) => (
  <div className="wrap narrow stack" style={{ gap: 20 }}>
    <Back label="Ganti prodi" />
    <div className="row" style={{ gap: 18, flexWrap: "nowrap" }}>
      <Port />
      <div>
        <div className="eyebrow">Langkah 2 dari 2 · {ME.prodi}</div>
        <h1 style={{ fontSize: 34, fontStretch: "82%", fontWeight: 800, marginTop: 6 }}>Masuk dengan NIM</h1>
      </div>
    </div>
    <div className="card" data-k="login-card">
      {step === "nim" && (
        <div className="stack">
          <label className="f">NIM
            <div className="inp mono" data-k="nim" style={{ borderColor: caret !== null ? "var(--blue)" : undefined, minHeight: 47 }}>
              {nim ? nim : caret === null ? <span className="faint">Contoh: 19023000</span> : null}{caret !== null ? <Caret on={caret} /> : null}
            </div>
          </label>
          <button className="btn block" data-k="lanjut" style={press("lanjut")}>Lanjut</button>
        </div>
      )}
      {step === "google" && (
        <div className="stack">
          <div className="note info"><b>{ME.nama}</b><br /><span className="mono">{ME.nim}</span> · {ME.prodi}</div>
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>Untuk memastikan ini benar kamu, masuk dengan akun Google yang emailnya terdaftar di data wisudawan.</p>
          <button className="gbtn" data-k="google" style={press("google")}><IcG />Lanjut dengan Google</button>
          <div className="note warn" style={{ fontSize: 12.5 }}>Membuka dari Instagram, LINE, atau aplikasi chat? Login Google tidak bisa di sana. Buka link ini di Chrome atau Safari. <button className="linkbtn">Salin link</button></div>
          <div className="row" style={{ justifyContent: "space-between", fontSize: 13 }}><button className="linkbtn">Bukan kamu? Ganti NIM</button><button className="linkbtn">Pakai kode dari panitia</button></div>
        </div>
      )}
      {step === "wait" && (
        <div className="row" style={{ justifyContent: "center", padding: 24 }}><span className="spin" /><span className="muted">Mencocokkan akun Google...</span></div>
      )}
    </div>
  </div>
);

/* Dashboard */
const Seats: React.FC<{ n: number; c: number }> = ({ n, c }) => (
  <span className="seats">{Array.from({ length: Math.max(c, n) }, (_, i) => <i key={i} className={i < n ? (i >= c ? "over" : "on") : ""} />)}</span>
);
const hl = (text: string, q: string) => {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
};
const short = (n: string) => n.split(" ").slice(0, 2).join(" ");

export type DashState = { q: string; caret: boolean | null; picked: boolean; seatFill?: number; fullShake?: number; countdown: number };

const LORow: React.FC<{ lo: FakeLO; st: DashState; press: PS["press"] }> = ({ lo, st, press }) => {
  const mine = st.picked && lo.nama === "Dimas Aditya";
  const who = mine ? [...lo.who, ME.nama] : lo.who;
  const n = who.length;
  const full = n >= QUOTA;
  const q = st.q.trim();
  let btn: React.ReactNode;
  if (mine) btn = <span className="pill neu" data-k={`mine-${lo.nama}`}>LO kamu</span>;
  else if (full) btn = <span className="pill full" data-k={`full-${lo.nama}`} style={{ transform: `translateX(${st.fullShake && lo.nama !== "" ? st.fullShake : 0}px)` }}>Penuh</span>;
  else btn = <button className={`btn sm${st.picked ? " ghost" : ""}`} data-k={`btn-${lo.nama}`} style={press(`btn-${lo.nama}`)}>{st.picked ? "Pindah ke sini" : "Pilih"}</button>;
  return (
    <div className={`lo${mine ? " mine" : ""}${full && !mine ? " isfull" : ""}`} data-k={`lo-${lo.nama}`}>
      <div className="lo-name">{hl(lo.nama, q)}</div>
      <div>{btn}</div>
      <div className="lo-sub">
        <span data-k={`seats-${lo.nama}`} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          <Seats n={n} c={QUOTA} /><span className="mono">{n}/{QUOTA}</span>
        </span>
        {n ? (
          <span className="who">{who.map((x) => <span key={x} className={q && x.toLowerCase().includes(q.toLowerCase()) ? "hit" : ""}>{short(x)}</span>)}</span>
        ) : (
          <span className="faint">Belum ada yang memilih</span>
        )}
      </div>
    </div>
  );
};

const cdParts = (sec: number) => {
  const base = COUNTDOWN_START.d * 86400 + COUNTDOWN_START.h * 3600 + COUNTDOWN_START.m * 60 + COUNTDOWN_START.s - Math.floor(sec);
  return [Math.floor(base / 86400), Math.floor(base / 3600) % 24, Math.floor(base / 60) % 60, base % 60];
};

export const Dashboard: React.FC<PS & { st: DashState }> = ({ press = noPress, st }) => {
  const q = st.q.trim().toLowerCase();
  let list = LOS.filter((l) => !q || l.nama.toLowerCase().includes(q) || l.who.some((w) => w.toLowerCase().includes(q)));
  if (st.picked) list = [...list].sort((a, b) => Number(b.nama === "Dimas Aditya") - Number(a.nama === "Dimas Aditya"));
  const [d, h, m, s] = cdParts(st.countdown);
  return (
    <div className="wrap">
      <div className="dash-head">
        <div>
          <div className="eyebrow">{ME.prodi} · LO {ME.him}</div>
          <h1>Halo, {ME.nama.split(" ")[0]}</h1>
          <div className="muted" style={{ fontSize: 13.5 }}><span className="mono">{ME.nim}</span> · {ME.nama}</div>
        </div>
        <button className="btn ghost sm">Keluar</button>
      </div>
      <div className="grid2">
        <div className="stack" style={{ gap: 18 }}>
          <div className={`status tk-shadow ${st.picked ? "" : "empty"}`} data-k="status">
            <div className="ticket">
              <div className="row" style={{ justifyContent: "space-between" }}><span className="eyebrow">Status</span><span className="stars">★ ★ ★</span></div>
              {st.picked ? (
                <>
                  <div className="band">Dimas Aditya</div>
                  <div style={{ fontSize: 13.5 }}><span className="muted">Didampingi bersama:</span> Kirana Ayu</div>
                  <div className="perf row" style={{ justifyContent: "space-between" }}><span className="pill neu">Pilihan sendiri</span><button className="btn danger sm">Batalkan pilihan</button></div>
                </>
              ) : (
                <>
                  <div className="band">Belum memilih LO</div>
                  <div className="muted" style={{ fontSize: 13.5 }}>{FREE_LO_COUNT} LO {ME.him} masih punya slot. Pilih dari daftar LO di bawah ini.</div>
                </>
              )}
            </div>
          </div>
          <div className="card stack" data-k="rules">
            <div className="eyebrow">Ketentuan</div>
            <ol className="rules">
              <li><span>Kamu bebas memilih LO masing-masing. Silakan janjian dengan teman supaya didampingi LO yang sama.</span></li>
              <li><span>Kalau sampai batas waktu kamu belum memilih, panitia wisuda yang akan memilihkan LO untukmu.</span></li>
              <li><span>Batas waktu pemilihan <b>Jumat, 16 Oktober 2026, 23.59 WIB</b>.</span></li>
            </ol>
            <div className="cd">
              <div><b>{d}</b><span>hari</span></div><div><b>{String(h).padStart(2, "0")}</b><span>jam</span></div>
              <div><b>{String(m).padStart(2, "0")}</b><span>menit</span></div><div><b>{String(s).padStart(2, "0")}</b><span>detik</span></div>
            </div>
          </div>
        </div>
        <div data-k="list">
          <div className="list-head"><h2>LO {ME.him}</h2><span className="faint mono" style={{ fontSize: 12.5 }}>{LO_COUNT_LABEL} · kuota {QUOTA} per LO</span></div>
          <div className="list-head">
            <div className="search" data-k="search">
              <IcSearch />
              <div className="inp" style={{ paddingLeft: 36, minHeight: 47, borderColor: st.caret !== null ? "var(--blue)" : undefined }}>
                {st.q ? st.q : st.caret === null ? <span className="faint">Cari nama LO atau nama temanmu</span> : null}
                {st.caret !== null ? <Caret on={st.caret} /> : null}
                {!st.q && st.caret !== null ? <span className="faint" style={{ marginLeft: 2 }}>Cari nama LO atau nama temanmu</span> : null}
              </div>
            </div>
            <div className="chips"><button className="chip" aria-pressed="true">Semua</button><button className="chip">Masih ada slot</button><button className="chip">Masih kosong</button></div>
          </div>
          <div className="lo-list">{list.map((lo) => <LORow key={lo.nama} lo={lo} st={st} press={press} />)}</div>
        </div>
      </div>
      <section className="sec grid2" data-k="req">
        <div>
          <h2>Request khusus</h2>
          <p className="muted" style={{ margin: "0 0 12px", fontSize: 14 }}>Untuk kasus di luar ketentuan, misalnya 5 orang ingin satu LO, atau 6 wisudawan ingin 3 LO yang bersahabat. Panitia akan meninjau dan mengabarkan hasilnya di sini.</p>
          <div className="empty-list" style={{ padding: 18, fontSize: 14 }}>Belum ada request yang melibatkan kamu.</div>
        </div>
        <div className="card stack" data-k="reqform">
          <label className="f">Jenis permintaan<div className="inp" style={{ display: "flex", justifyContent: "space-between" }}><span>Pilih jenis permintaan</span><span className="faint">▾</span></div></label>
          <label className="f">LO yang diminta <span className="faint" style={{ fontWeight: 400 }}>(bisa lebih dari satu)</span><div className="inp"><span className="faint">Ketik nama LO {ME.him}</span></div></label>
          <label className="f">NIM teman yang ikut<div className="row" style={{ flexWrap: "nowrap" }}><div className="inp mono" style={{ flex: 1 }}><span className="faint">8 digit NIM</span></div><button className="btn ghost">Tambah</button></div></label>
          <label className="f">Keterangan<div className="inp" style={{ minHeight: 84 }}><span className="faint">Ceritakan alasanmu dan siapa saja yang terlibat</span></div></label>
          <button className="btn block">Kirim request</button>
        </div>
      </section>
    </div>
  );
};

/* Lembar konfirmasi (layar) */
export const ConfirmSheet: React.FC<PS & { a: number }> = ({ a, press = noPress }) => (
  <div className="scrim" style={{ opacity: a, zIndex: 25, pointerEvents: "none" }}>
    <div className="sheet" style={{ transform: `translateY(${(1 - a) * 60}px)` }} data-kv="sheet">
      <span className="eyebrow">Konfirmasi pilihan</span>
      <h3>Pilih Dimas Aditya?</h3>
      <p className="muted" style={{ margin: 0, fontSize: 14 }}>Kamu masih bisa membatalkan atau pindah sebelum batas waktu.<br />Sudah memilih: Kirana Ayu.</p>
      <div className="row" style={{ justifyContent: "flex-end" }}><button className="btn ghost">Batal</button><button className="btn" data-kv="yes" style={press("yes")}>Ya, pilih</button></div>
    </div>
  </div>
);

export const Toast: React.FC<{ text: string; a: number }> = ({ text, a }) =>
  a > 0.001 ? <div className="toast" style={{ opacity: a, transform: `translateX(-50%) translateY(${(1 - a) * 16}px)`, whiteSpace: "nowrap" }}>{text}</div> : null;
