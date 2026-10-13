import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import "./site.css";
import "./video.css";
import { INFO, INTRO, OUTRO, OUTRO_LINK, OUTRO_LINK_LABEL, SCENES, SceneId } from "./config";
import { clamp, ease, easeOut, window01 } from "./components/kit";
import { Flora, Phone, QR, Tiles } from "./components/frame";
import { PHONE_SCENES } from "./scenes";

const TRANS = 0.4; // detik, transisi antar layar

const timeline = (fps: number) => {
  let acc = 0;
  return SCENES.map((s) => {
    const start = acc;
    acc += Math.round(s.dur * fps);
    return { ...s, start, end: acc };
  });
};

export const totalFrames = (fps: number) => timeline(fps).at(-1)!.end;

export const Tutorial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const land = width > height;
  const tl = timeline(fps);
  const idx = Math.max(0, tl.findIndex((s) => frame >= s.start && frame < s.end));
  const cur = tl[idx];
  const sec = (id: SceneId) => tl.find((s) => s.id === id)!;
  const local = (frame - cur.start) / fps;

  // Tata letak
  const L = land
    ? { phoneW: 470, phoneH: 960, phoneX: 1320, phoneY: 34, capX: 150, capW: 960, capY: 300, capH: 480 }
    : { phoneW: 560, phoneH: 1140, phoneX: 260, phoneY: 560, capX: 72, capW: 936, capY: 236, capH: 300 };

  // Bingkai HP muncul setelah pembuka dan hilang sebelum info
  const phoneIn = interpolate(frame, [sec("home").start - 12, sec("home").start + 6], [0, 1], { ...clamp, easing: easeOut });
  const phoneOut = interpolate(frame, [sec("info").start - 4, sec("info").start + 10], [1, 0], { ...clamp, easing: ease });
  const phoneA = Math.min(phoneIn, phoneOut);

  // Layar di dalam HP (dengan geser antar layar)
  const screens: React.ReactNode[] = [];
  const ph = PHONE_SCENES[cur.id];
  const g = (frame - sec("dash").start) / fps;
  if (ph) {
    const prev = tl[idx - 1];
    const pph = prev && PHONE_SCENES[prev.id];
    const k = interpolate(local, [0, TRANS], [0, 1], { ...clamp, easing: ease });
    const sliding = pph && pph.screen !== ph.screen && k < 1;
    if (sliding) {
      const P = pph.C;
      screens.push(
        <div key="prev" style={{ position: "absolute", inset: 0, transform: `translateX(${-k * 32}%)`, opacity: 1 - k * 0.6 }}>
          <P t={(prev.end - prev.start - 1) / fps} fps={fps} g={g} />
        </div>,
      );
    }
    const C = ph.C;
    screens.push(
      <div key="cur" style={{ position: "absolute", inset: 0, transform: sliding ? `translateX(${(1 - k) * 100}%)` : undefined, boxShadow: sliding ? "-12px 0 30px rgba(20,33,90,.18)" : undefined }}>
        <C t={local} fps={fps} g={g} />
      </div>,
    );
  } else if (cur.id === "info" && phoneA > 0) {
    const r = sec("request");
    const C = PHONE_SCENES.request!.C;
    screens.push(<C key="last" t={(r.end - r.start - 1) / fps} fps={fps} g={g} />);
  }

  // Keterangan
  const caps = tl.filter((s) => s.caption).map((s) => {
    const t = (frame - s.start) / fps;
    const dur = (s.end - s.start) / fps;
    const a = Math.min(interpolate(t, [0, 0.22], [0, 1], { ...clamp, easing: easeOut }), interpolate(t, [dur - 0.2, dur], [1, 0], { ...clamp, easing: ease }));
    if (a <= 0.001) return null;
    return (
      <div key={s.id} style={{ position: "absolute", left: L.capX, top: L.capY, width: L.capW, height: L.capH, display: "flex", flexDirection: "column", justifyContent: land ? "center" : "flex-end", alignItems: land ? "flex-start" : "center", textAlign: land ? "left" : "center", gap: 14, opacity: a, transform: `translateY(${(1 - a) * 24}px)` }}>
        {s.eyebrow ? <div className="v-eyebrow">{s.eyebrow}</div> : null}
        <div className="v-cap" style={land ? { fontSize: 84 } : undefined}>{s.caption}</div>
        {s.sub ? <div className="v-sub" style={land ? { fontSize: 52 } : undefined}>{s.sub}</div> : null}
      </div>
    );
  });

  return (
    <AbsoluteFill className="v-root">
      <Flora style={{ left: -60, top: -30, width: land ? 380 : 330, opacity: 0.95 }} variant={1} />
      <Flora style={{ right: -60, bottom: land ? 40 : 70, width: land ? 360 : 320, transform: "rotate(180deg)", opacity: 0.95 }} variant={2} />
      <Tiles y={height - (land ? 44 : 64)} h={land ? 44 : 64} w={width} />
      {caps}
      {phoneA > 0.001 ? (
        <div style={{ position: "absolute", left: L.phoneX, top: L.phoneY, opacity: phoneA, transform: `translateY(${(1 - phoneA) * 80}px) scale(${0.94 + 0.06 * phoneA})`, transformOrigin: "50% 100%" }}>
          <Phone w={L.phoneW} h={L.phoneH}>{screens}</Phone>
        </div>
      ) : null}
      <Intro t={(frame - sec("intro").start) / fps} dur={sec("intro").dur} land={land} />
      <Info t={(frame - sec("info").start) / fps} dur={sec("info").dur} land={land} />
      <Outro t={(frame - sec("outro").start) / fps} dur={sec("outro").dur} land={land} />
    </AbsoluteFill>
  );
};

/* Kartu tiket besar untuk pembuka, info, penutup */
const BigTicket: React.FC<{ w: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w, children, style }) => (
  <div className="tk-shadow" style={{ width: w, ...style }}>
    <div className="ticket" style={{ ["--r" as string]: "14px", ["--step" as string]: "44px", padding: "40px 64px", display: "grid", gap: 26 } as React.CSSProperties}>{children}</div>
  </div>
);
const Rule = () => <div className="rule" style={{ fontSize: 30 }}><span>✦</span></div>;

const Intro: React.FC<{ t: number; dur: number; land: boolean }> = ({ t, dur, land }) => {
  if (t < 0 || t > dur + 0.5) return null;
  // Frame pertama sudah terisi penuh, karena dipakai sebagai thumbnail di WhatsApp
  const rise = interpolate(t, [0, 0.8], [0, 1], { ...clamp, easing: easeOut });
  const a = interpolate(t, [dur - 0.35, dur + 0.05], [1, 0], { ...clamp, easing: ease });
  const stars = interpolate(t, [0, 0.9], [0.35, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 48, opacity: a }}>
      <BigTicket w={land ? 1100 : 900} style={{ transform: `translateY(${(1 - rise) * 24 + (1 - a) * 40}px) rotate(${(1 - rise) * -1.2}deg)` }}>
        <div className="stars" style={{ textAlign: "center", fontSize: 40, opacity: stars }}>★ ★ ★ ★ ★</div>
        <div className="band v-band" style={{ fontSize: land ? 150 : 132, textAlign: "center", padding: "30px 20px 40px" }}>{INTRO.title.split(" ").slice(0, 2).join(" ")}<br />{INTRO.title.split(" ").slice(2).join(" ")}</div>
        <Rule />
        <div className="meta3" style={{ fontSize: 40 }}><div style={{ padding: 18 }}>SBM ITB</div><div style={{ padding: 18 }}>Liaison Officer</div><div style={{ padding: 18 }}>2026</div></div>
        <Rule />
      </BigTicket>
      <div className="v-sub" style={{ color: "var(--ink)", fontWeight: 600, fontSize: 56, transform: `translateY(${(1 - a) * 30}px)` }}>{INTRO.sub}</div>
    </AbsoluteFill>
  );
};

const Info: React.FC<{ t: number; dur: number; land: boolean }> = ({ t, dur, land }) => {
  if (t < -0.2 || t > dur + 0.3) return null;
  const a = Math.min(interpolate(t, [0.1, 0.55], [0, 1], { ...clamp, easing: easeOut }), interpolate(t, [dur - 0.35, dur], [1, 0], { ...clamp, easing: ease }));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: a }}>
      <BigTicket w={land ? 1420 : 920} style={{ transform: `translateY(${(1 - a) * 50}px)` }}>
        <div className="row" style={{ justifyContent: "space-between" }}><span className="v-eyebrow">{INFO.eyebrow}</span><span className="stars" style={{ fontSize: 34 }}>★ ★ ★</span></div>
        <div className="v-cap" style={{ fontSize: land ? 96 : 88 }}>{INFO.title}</div>
        <div className="band v-band" style={{ fontSize: land ? 92 : 84, padding: "26px 28px 34px", lineHeight: 1.02 }}>{INFO.body}</div>
        <div className="perf" style={{ margin: "6px -64px 0", padding: "26px 64px 0", borderTopWidth: 4 }}>
          <div className="mono" style={{ fontSize: 48, fontWeight: 600, color: "var(--blue)", lineHeight: 1.25 }}>{INFO.note}</div>
        </div>
      </BigTicket>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ t: number; dur: number; land: boolean }> = ({ t, dur, land }) => {
  if (t < -0.2 || t > dur + 1) return null;
  const a = interpolate(t, [0.1, 0.6], [0, 1], { ...clamp, easing: easeOut });
  const label = OUTRO_LINK_LABEL || OUTRO_LINK.replace(/^https?:\/\//, "");
  const box = land ? 440 : 560;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: land ? "row" : "column", gap: land ? 110 : 56, opacity: a, padding: "0 80px" }}>
      <div style={{ display: "grid", gap: 22, textAlign: land ? "left" : "center", maxWidth: land ? 900 : 936, transform: `translateY(${(1 - a) * 40}px)` }}>
        <div className="stars" style={{ fontSize: 40 }}>★ ★ ★ ★ ★</div>
        <div className="v-cap" style={{ fontSize: land ? 110 : 96 }}>{OUTRO.title}</div>
        <div className="v-sub">{OUTRO.sub}</div>
      </div>
      {/* Ruang untuk link/QR. Isi OUTRO_LINK di src/config.ts untuk menampilkan QR otomatis. */}
      <div className="tk-shadow" style={{ transform: `translateY(${(1 - a) * 60}px)` }}>
        <div className="ticket" style={{ ["--r" as string]: "12px", ["--step" as string]: "40px", width: box + 120, padding: "48px 60px", display: "grid", gap: 24, justifyItems: "center" } as React.CSSProperties}>
          {OUTRO_LINK ? (
            <>
              <QR text={OUTRO_LINK} size={box} />
              <div className="mono" style={{ fontSize: 48, fontWeight: 600, color: "var(--blue)", textAlign: "center", wordBreak: "break-all" }}>{label}</div>
            </>
          ) : (
            <div style={{ width: box, height: box + 80, border: "4px dashed var(--line-2)", borderRadius: 24 }} />
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
