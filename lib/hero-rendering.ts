export type HeroRenderingMode = "static" | "webgl-low" | "webgl-high";

export type HeroRenderingSignals = {
  webglSupported: boolean;
  reducedMotion: boolean;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  narrowViewport?: boolean;
  saveData?: boolean;
};

export function selectHeroRenderingMode(signals: HeroRenderingSignals): HeroRenderingMode {
  if (!signals.webglSupported || signals.reducedMotion || signals.saveData) return "static";

  const constrained =
    signals.narrowViewport ||
    (signals.hardwareConcurrency !== undefined && signals.hardwareConcurrency <= 4) ||
    (signals.deviceMemory !== undefined && signals.deviceMemory <= 4);

  return constrained ? "webgl-low" : "webgl-high";
}

export function browserSupportsWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}
