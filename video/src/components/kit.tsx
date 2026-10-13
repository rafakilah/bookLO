import React, { useLayoutEffect, useRef, useState } from "react";
import { continueRender, delayRender, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type Rect = { x: number; y: number; w: number; h: number };
export type Rects = Record<string, Rect>;
export type Pt = { x: number; y: number };

export const ease = Easing.bezier(0.45, 0, 0.2, 1);
export const easeOut = Easing.bezier(0.2, 0.8, 0.2, 1);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0..1 naik di [a, a+d] lalu turun di [b-d, b] (detik). */
export const window01 = (t: number, a: number, b: number, d = 0.3) =>
  Math.min(interpolate(t, [a, a + d], [0, 1], { ...clamp, easing: ease }), interpolate(t, [b - d, b], [1, 0], { ...clamp, easing: ease }));

export const center = (r?: Rect): Pt => (r ? { x: r.x + r.w / 2, y: r.y + r.h / 2 } : { x: 200, y: 400 });

export const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { f, t: f / fps, fps };
};

/**
 * Tampilan website di dalam layar HP (lebar CSS 400px).
 * Mengukur semua elemen [data-k] (koordinat konten) dan [data-kv] (koordinat layar),
 * supaya sorotan dan jari bisa menunjuk elemen yang tepat.
 */
export const SiteView: React.FC<{
  scroll?: number | ((r: Rects) => number);
  children: React.ReactNode;
  overlay?: (r: Rects, scroll: number) => React.ReactNode;
  screenOverlay?: React.ReactNode;
  ghost?: React.ReactNode; // salinan tak terlihat untuk mengukur elemen dari langkah lain
}> = ({ scroll = 0, children, overlay, screenOverlay, ghost }) => {
  const vp = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [rects, setRects] = useState<Rects>({});
  const [handle] = useState(() => delayRender("Mengukur layout"));
  const released = useRef(false);

  useLayoutEffect(() => {
    const c = content.current, v = vp.current;
    if (!c || !v) return;
    const vr = v.getBoundingClientRect();
    const sc = vr.width / v.offsetWidth || 1;
    const cr = c.getBoundingClientRect();
    const out: Rects = {};
    const rd = (n: number) => Math.round(n * 10) / 10;
    const ghosts = Array.from(c.querySelectorAll<HTMLElement>("[data-ghost] [data-k]"));
    const real = Array.from(c.querySelectorAll<HTMLElement>("[data-k]")).filter((el) => !el.closest("[data-ghost]"));
    [...ghosts, ...real].forEach((el) => {
      const r = el.getBoundingClientRect();
      out[el.dataset.k!] = { x: rd((r.left - cr.left) / sc), y: rd((r.top - cr.top) / sc), w: rd(r.width / sc), h: rd(r.height / sc) };
    });
    v.querySelectorAll<HTMLElement>("[data-kv]").forEach((el) => {
      const r = el.getBoundingClientRect();
      out["v:" + el.dataset.kv!] = { x: rd((r.left - vr.left) / sc), y: rd((r.top - vr.top) / sc), w: rd(r.width / sc), h: rd(r.height / sc) };
    });
    if (JSON.stringify(out) !== JSON.stringify(rects)) setRects(out);
    if (!released.current) {
      released.current = true;
      requestAnimationFrame(() => continueRender(handle));
    }
  });

  const s = typeof scroll === "function" ? scroll(rects) : scroll;
  return (
    <div ref={vp} className="site" style={{ position: "absolute", inset: 0, overflow: "hidden", width: 400, background: "radial-gradient(1100px 380px at 50% -120px,var(--sky),transparent 75%),var(--paper)" }}>
      <div ref={content} style={{ position: "relative", transform: `translateY(${-s}px)`, paddingBottom: 420 }}>
        {ghost ? <div data-ghost style={{ position: "absolute", left: 0, top: 0, width: 400, visibility: "hidden" }}>{ghost}</div> : null}
        {children}
        {overlay?.(rects, s)}
      </div>
      {screenOverlay}
    </div>
  );
};

/** Sorotan: area target terang, sisanya diredupkan. */
export const Spot: React.FC<{ r?: Rect; a: number; pad?: number; radius?: number }> = ({ r, a, pad = 6, radius = 16 }) => {
  if (!r || a <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute", left: r.x - pad, top: r.y - pad, width: r.w + pad * 2, height: r.h + pad * 2,
        borderRadius: radius, pointerEvents: "none", zIndex: 20,
        boxShadow: `0 0 0 3px rgba(224,68,125,${0.9 * a}), 0 0 0 4000px rgba(14,22,60,${0.42 * a})`,
      }}
    />
  );
};

export type Move = { at: number; to: Pt; dur?: number };
/**
 * Jari/ketukan. moves: titik yang dicapai pada detik `at` (bergerak selama `dur`).
 * taps: detik saat mengetuk. show: [muncul, hilang].
 */
export const Finger: React.FC<{ t: number; fps: number; start: Pt; moves: Move[]; taps: number[]; show: [number, number] }> = ({ t, fps, start, moves, taps, show }) => {
  let p = start;
  for (const m of moves) {
    const d = m.dur ?? 0.6;
    const k = interpolate(t, [m.at - d, m.at], [0, 1], { ...clamp, easing: ease });
    p = { x: p.x + (m.to.x - p.x) * k, y: p.y + (m.to.y - p.y) * k };
  }
  const vis = window01(t, show[0], show[1], 0.25);
  if (vis <= 0.001) return null;
  let press = 0;
  const ripples: React.ReactNode[] = [];
  taps.forEach((tp, i) => {
    const dt = t - tp;
    if (dt > -0.12 && dt < 0.2) press = Math.max(press, 1 - Math.abs(dt + 0.02) / 0.18);
    if (dt >= 0 && dt < 0.5) {
      const k = dt / 0.5;
      ripples.push(
        <div key={i} style={{ position: "absolute", left: p.x - 14 - 26 * k, top: p.y - 14 - 26 * k, width: 28 + 52 * k, height: 28 + 52 * k, borderRadius: "50%", border: `3px solid rgba(36,67,176,${0.7 * (1 - k)})`, background: `rgba(36,67,176,${0.18 * (1 - k)})`, zIndex: 29 }} />,
      );
    }
  });
  const sc = 1 - 0.18 * Math.max(0, press);
  return (
    <>
      {ripples}
      <div
        style={{
          position: "absolute", left: p.x - 19, top: p.y - 19, width: 38, height: 38, borderRadius: "50%", zIndex: 30, opacity: vis,
          background: "rgba(255,253,247,.78)", border: "3px solid var(--ink)", boxShadow: "0 6px 14px rgba(20,33,90,.35)",
          transform: `scale(${sc})`,
        }}
      />
    </>
  );
};

/** Style untuk elemen yang sedang ditekan. */
export const pressStyle = (t: number, tap: number): React.CSSProperties => {
  const dt = t - tap;
  const k = dt > -0.08 && dt < 0.22 ? 1 - Math.abs(dt - 0.04) / 0.18 : 0;
  return { transform: `scale(${1 - 0.04 * Math.max(0, k)})`, transition: "none" };
};

export const typed = (text: string, t: number, start: number, perChar = 0.12) =>
  text.slice(0, Math.max(0, Math.min(text.length, Math.floor((t - start) / perChar) + 1)));
export const caretOn = (t: number) => Math.floor(t * 2.2) % 2 === 0;
