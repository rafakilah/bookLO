import React from "react";
import { Composition } from "remotion";
import { FPS } from "./config";
import { loadFonts } from "./fonts";
import { Tutorial, totalFrames } from "./Tutorial";

loadFonts();

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Tutorial916" component={Tutorial} durationInFrames={totalFrames(FPS)} fps={FPS} width={1080} height={1920} />
    <Composition id="Tutorial169" component={Tutorial} durationInFrames={totalFrames(FPS)} fps={FPS} width={1920} height={1080} />
  </>
);
