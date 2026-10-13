import React from "react";
import QRCode from "qrcode";
import { BROWSER_BAR } from "../config";

/** Bingkai HP. Isi layar digambar pada lebar CSS 400px lalu diskalakan. */
export const Phone: React.FC<{ w: number; h: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, children, style }) => {
  const bezel = Math.round(w * 0.026);
  const sw = w - bezel * 2;
  const s = sw / 400;
  const innerH = (h - bezel * 2) / s;
  return (
    <div style={{ position: "absolute", width: w, height: h, borderRadius: w * 0.13, background: "#0E1636", padding: bezel, boxShadow: "0 40px 80px rgba(20,33,90,.28), 0 0 0 2px #2A3566 inset", ...style }}>
      <div style={{ width: sw, height: h - bezel * 2, borderRadius: w * 0.105, overflow: "hidden", position: "relative", background: "var(--paper)" }}>
        <div style={{ width: 400, height: innerH, transform: `scale(${s})`, transformOrigin: "0 0", position: "absolute", left: 0, top: 0 }}>
          <div style={{ height: 34, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px 0 30px", font: "600 13px var(--f-body)", color: "var(--ink)", background: "var(--plaster)" }}>
            <span>09.41</span>
            <span style={{ width: 92, height: 24, borderRadius: 14, background: "#0E1636", position: "absolute", left: 154, top: 6 }} />
            <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="16" height="11" viewBox="0 0 16 11"><path d="M1 10h2V7H1zM5 10h2V5H5zM9 10h2V3H9zM13 10h2V1h-2z" fill="currentColor" /></svg>
              <span style={{ width: 22, height: 11, border: "1.5px solid currentColor", borderRadius: 3, padding: 1 }}><span style={{ display: "block", width: "75%", height: "100%", background: "currentColor", borderRadius: 1 }} /></span>
            </span>
          </div>
          <div style={{ height: 40, background: "var(--plaster)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 14px 6px" }}>
            <div style={{ flex: 1, height: 30, borderRadius: 10, background: "var(--plaster-2)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, font: "500 12.5px var(--f-body)", color: "var(--ink-2)" }}>
              <svg width="11" height="12" viewBox="0 0 11 12"><rect x="1" y="5" width="9" height="6.5" rx="1.5" fill="currentColor" /><path d="M3 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1.4" fill="none" /></svg>
              {BROWSER_BAR}
            </div>
          </div>
          <div style={{ position: "absolute", top: 74, left: 0, width: 400, bottom: 0 }}>{children}</div>
        </div>
      </div>
    </div>
  );
};

const Bract: React.FC<{ x: number; y: number; s: number; r: number }> = ({ x, y, s, r }) => {
  const d = "M0 0 C-9 -6 -12 -18 -4 -24 C0 -27 4 -26 6 -22 C10 -14 6 -6 0 0Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${r})`}>
      <path d={d} className="pt1" />
      <path d={d} className="pt2" transform="rotate(120)" />
      <path d={d} className="pt1" transform="rotate(240)" />
      <circle r="2.4" className="pc" />
    </g>
  );
};
const Leaf: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <path d="M0 0 C6 -8 18 -10 26 -4 C18 4 6 6 0 0Z" className="lf" transform={`translate(${x} ${y}) rotate(${r})`} />
);

/** Bougainvillea, sama dengan yang ada di beranda prototipe. */
export const Flora: React.FC<{ style?: React.CSSProperties; variant?: 1 | 2 }> = ({ style, variant = 1 }) => (
  <svg viewBox="0 0 240 200" style={{ position: "absolute", ...style }} aria-hidden>
    {variant === 1 ? (
      <>
        <Leaf x={40} y={60} r={20} /><Leaf x={120} y={40} r={-30} /><Leaf x={90} y={120} r={60} />
        <Bract x={60} y={50} s={1.5} r={0} /><Bract x={110} y={70} s={1.2} r={40} /><Bract x={150} y={30} s={1.1} r={-20} />
        <Bract x={30} y={110} s={1.25} r={70} /><Bract x={95} y={125} s={0.95} r={15} /><Bract x={190} y={55} s={0.8} r={90} />
      </>
    ) : (
      <>
        <Leaf x={50} y={70} r={10} /><Leaf x={130} y={50} r={-40} />
        <Bract x={70} y={55} s={1.4} r={0} /><Bract x={125} y={80} s={1.1} r={30} />
        <Bract x={35} y={115} s={1.15} r={60} /><Bract x={170} y={40} s={0.9} r={-10} />
      </>
    )}
  </svg>
);

/** Strip ubin Santorini. */
export const Tiles: React.FC<{ y: number; h: number; w: number }> = ({ y, h, w }) => (
  <svg style={{ position: "absolute", left: 0, top: y }} width={w} height={h} aria-hidden>
    <defs>
      <pattern id="az" width={h} height={h} patternUnits="userSpaceOnUse" patternTransform={`scale(${h / 34})`}>
        <rect width="34" height="34" className="az-bg" />
        <path d="M0 0h8a8 8 0 0 1-8 8zM34 0v8a8 8 0 0 1-8-8zM0 34v-8a8 8 0 0 1 8 8zM34 34h-8a8 8 0 0 1 8-8z" className="az-c" />
        <circle cx="17" cy="10.5" r="6" className="az-a" /><circle cx="23.5" cy="17" r="6" className="az-a" />
        <circle cx="17" cy="23.5" r="6" className="az-a" /><circle cx="10.5" cy="17" r="6" className="az-a" />
        <circle cx="17" cy="17" r="2.6" className="az-b" />
        <rect x=".5" y=".5" width="33" height="33" className="az-a" style={{ strokeWidth: 0.8 }} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#az)" />
  </svg>
);

export const QR: React.FC<{ text: string; size: number }> = ({ text, size }) => {
  const q = QRCode.create(text, { errorCorrectionLevel: "M" });
  const n = q.modules.size;
  const m = 3;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.modules.get(r, c)) cells.push(<rect key={r * n + c} x={c + m} y={r + m} width={1.02} height={1.02} />);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n + m * 2} ${n + m * 2}`} shapeRendering="crispEdges">
      <rect width="100%" height="100%" fill="#FFFDF7" />
      <g fill="#14215A">{cells}</g>
    </svg>
  );
};
