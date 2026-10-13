// Koreografi tiap adegan di dalam layar HP. Waktu dalam detik sejak adegan dimulai.
import React from "react";
import { interpolate } from "remotion";
import { FRIEND_QUERY, ME, SceneId } from "./config";
import { Finger, Rects, SiteView, Spot, caretOn, center, clamp, ease, pressStyle, typed, window01 } from "./components/kit";
import { ConfirmSheet, Dashboard, DashState, Home, Login, Prodi, Toast } from "./screens/site";

const OFF = { x: 330, y: 900 }; // jari mulai dari luar layar bagian bawah
type P = { t: number; fps: number; g: number }; // g = detik sejak adegan dashboard pertama (untuk hitung mundur)

const press = (t: number, taps: Record<string, number>) => (k: string) => (k in taps ? pressStyle(t, taps[k]) : {});
const offIn = (r: Rects, s: number) => ({ x: OFF.x, y: OFF.y + s }); // titik awal dalam koordinat konten

const HomeScene: React.FC<P> = ({ t, fps }) => (
  <SiteView overlay={(r) => (
    <>
      <Spot r={r.wis} a={window01(t, 0.3, 3.35)} radius={10} />
      <Finger t={t} fps={fps} start={OFF} moves={[{ at: 1.7, to: center(r.wis), dur: 0.9 }]} taps={[2.3]} show={[0.7, 3.3]} />
    </>
  )}>
    <Home press={press(t, { wis: 2.3 })} />
  </SiteView>
);

const ProdiScene: React.FC<P> = ({ t, fps }) => (
  <SiteView overlay={(r) => (
    <>
      <Spot r={r["prodi-grid"]} a={window01(t, 0.4, 3.35)} radius={12} />
      <Finger t={t} fps={fps} start={OFF} moves={[{ at: 1.7, to: center(r["prodi-190"]), dur: 0.9 }]} taps={[2.3]} show={[0.7, 3.3]} />
    </>
  )}>
    <Prodi press={press(t, { "prodi-190": 2.3 })} />
  </SiteView>
);

const LoginScene: React.FC<P> = ({ t, fps }) => {
  const step = t < 3.0 ? "nim" : t < 4.15 ? "google" : "wait";
  const nim = typed(ME.nim, t, 1.25, 0.1);
  const taps = { nim: 1.0, lanjut: 2.75, google: 3.95 };
  return (
    <SiteView
      ghost={<Login step={step === "nim" ? "google" : "nim"} nim="" caret={null} />}
      overlay={(r) => (
        <>
          <Spot r={r["login-card"]} a={window01(t, 0.3, 5.35)} radius={18} />
          <Finger t={t} fps={fps} start={OFF}
            moves={[{ at: 0.9, to: center(r.nim), dur: 0.6 }, { at: 2.6, to: center(r.lanjut), dur: 0.45 }, { at: 3.8, to: center(r.google), dur: 0.5 }]}
            taps={[taps.nim, taps.lanjut, taps.google]} show={[0.3, 4.4]} />
        </>
      )}
    >
      <Login step={step} nim={nim} caret={t >= 1.0 && step === "nim" ? caretOn(t) || t < 2.2 : null} press={press(t, taps)} />
    </SiteView>
  );
};

const dash = (over: Partial<DashState>, g: number): DashState => ({ q: "", caret: null, picked: false, countdown: g, ...over });
const listScroll = (r: Rects) => (r.list ? r.list.y - 10 : 0);

const DashScene: React.FC<P> = ({ t, g }) => (
  <SiteView
    overlay={(r) => <Spot r={r.rules} a={window01(t, 0.7, 3.85)} radius={16} />}
    screenOverlay={<Toast text="Berhasil masuk." a={window01(t, 0.15, 1.9, 0.25)} />}
  >
    <Dashboard st={dash({}, g)} />
  </SiteView>
);

const SearchScene: React.FC<P> = ({ t, fps, g }) => {
  const q = typed(FRIEND_QUERY, t, 1.75, 0.13);
  const sc = (r: Rects) => interpolate(t, [0.15, 0.95], [0, listScroll(r)], { ...clamp, easing: ease });
  return (
    <SiteView
      scroll={sc}
      overlay={(r, s) => (
        <>
          <Spot r={r.search} a={window01(t, 1.0, 2.75, 0.25)} radius={12} pad={4} />
          <Spot r={r["lo-Dimas Aditya"]} a={window01(t, 2.75, 4.85, 0.3)} radius={16} />
          <Finger t={t} fps={fps} start={offIn(r, s)} moves={[{ at: 1.45, to: center(r.search), dur: 0.5 }]} taps={[1.55]} show={[0.9, 2.2]} />
        </>
      )}
    >
      <Dashboard st={dash({ q, caret: t >= 1.55 ? caretOn(t) || t < 2.6 : null }, g)} press={press(t, { search: 1.55 })} />
    </SiteView>
  );
};

const PickScene: React.FC<P> = ({ t, fps, g }) => {
  const picked = t >= 2.4;
  const sheetA = Math.min(interpolate(t, [1.3, 1.6], [0, 1], { ...clamp, easing: ease }), interpolate(t, [2.35, 2.6], [1, 0], { ...clamp, easing: ease }));
  const taps = { "btn-Dimas Aditya": 1.15, yes: 2.25 };
  return (
    <SiteView
      scroll={listScroll}
      overlay={(r, s) => (
        <>
          <Spot r={r["lo-Dimas Aditya"]} a={Math.max(window01(t, 0.2, 1.4, 0.25), window01(t, 2.65, 4.85, 0.3))} radius={16} />
          <Finger t={t} fps={fps} start={offIn(r, s)}
            moves={[{ at: 1.0, to: center(r["btn-Dimas Aditya"]), dur: 0.65 }, { at: 2.1, to: r["v:yes"] ? { x: center(r["v:yes"]).x, y: center(r["v:yes"]).y + s } : center(r["btn-Dimas Aditya"]), dur: 0.5 }]}
            taps={[taps["btn-Dimas Aditya"], taps.yes]} show={[0.25, 2.7]} />
        </>
      )}
      screenOverlay={
        <>
          <ConfirmSheet a={sheetA} press={press(t, taps)} />
          <Toast text="Kamu memilih Dimas Aditya." a={window01(t, 2.55, 4.85, 0.3)} />
        </>
      }
    >
      <Dashboard st={dash({ q: FRIEND_QUERY, caret: null, picked }, g)} press={press(t, taps)} />
    </SiteView>
  );
};

const FullScene: React.FC<P> = ({ t, fps, g }) => {
  const n = Math.max(0, FRIEND_QUERY.length - Math.floor(Math.max(0, t - 0.15) / 0.07));
  const q = FRIEND_QUERY.slice(0, n);
  const tap = 1.75;
  const shake = t > tap && t < tap + 0.4 ? Math.sin((t - tap) * 60) * 5 * (1 - (t - tap) / 0.4) : 0;
  return (
    <SiteView
      scroll={listScroll}
      overlay={(r, s) => (
        <>
          <Spot r={r["lo-Salsa Maharani"]} a={window01(t, 0.75, 3.35, 0.3)} radius={16} />
          <Finger t={t} fps={fps} start={offIn(r, s)} moves={[{ at: 1.6, to: center(r["full-Salsa Maharani"]), dur: 0.6 }]} taps={[tap]} show={[0.9, 3.2]} />
        </>
      )}
      screenOverlay={<Toast text="LO ini sudah penuh. Pilih LO lain." a={window01(t, 1.95, 3.35, 0.25)} />}
    >
      <Dashboard st={dash({ q, caret: t < 0.75 ? caretOn(t) || t < 0.6 : null, picked: true, fullShake: shake }, g)} />
    </SiteView>
  );
};

const RequestScene: React.FC<P> = ({ t, fps, g }) => {
  const sc = (r: Rects) => interpolate(t, [0.3, 1.25], [listScroll(r), r.req ? r.req.y - 18 : 0], { ...clamp, easing: ease });
  return (
    <SiteView
      scroll={sc}
      overlay={(r) => <Spot r={r.req} a={window01(t, 1.3, 3.85, 0.3)} radius={16} pad={8} />}
      screenOverlay={<Finger t={t} fps={fps} start={{ x: 300, y: 640 }} moves={[{ at: 1.2, to: { x: 300, y: 250 }, dur: 0.85 }]} taps={[]} show={[0.1, 1.35]} />}
    >
      <Dashboard st={dash({ picked: true }, g)} />
    </SiteView>
  );
};

export const PHONE_SCENES: Partial<Record<SceneId, { screen: string; C: React.FC<P> }>> = {
  home: { screen: "home", C: HomeScene },
  prodi: { screen: "prodi", C: ProdiScene },
  login: { screen: "login", C: LoginScene },
  dash: { screen: "dash", C: DashScene },
  search: { screen: "dash", C: SearchScene },
  pick: { screen: "dash", C: PickScene },
  full: { screen: "dash", C: FullScene },
  request: { screen: "dash", C: RequestScene },
};
