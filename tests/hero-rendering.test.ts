import { describe, expect, it } from "vitest";
import { selectHeroRenderingMode } from "@/lib/hero-rendering";

describe("hero rendering selection", () => {
  it("uses the static composition when WebGL is unavailable", () => {
    expect(selectHeroRenderingMode({ webglSupported: false, reducedMotion: false })).toBe("static");
  });

  it("uses the static composition for reduced motion and save-data users", () => {
    expect(selectHeroRenderingMode({ webglSupported: true, reducedMotion: true })).toBe("static");
    expect(selectHeroRenderingMode({ webglSupported: true, reducedMotion: false, saveData: true })).toBe("static");
  });

  it("selects a lighter scene for constrained devices", () => {
    expect(selectHeroRenderingMode({ webglSupported: true, reducedMotion: false, hardwareConcurrency: 4 })).toBe("webgl-low");
    expect(selectHeroRenderingMode({ webglSupported: true, reducedMotion: false, narrowViewport: true })).toBe("webgl-low");
  });

  it("selects the full scene on capable devices", () => {
    expect(selectHeroRenderingMode({ webglSupported: true, reducedMotion: false, hardwareConcurrency: 8, deviceMemory: 8 })).toBe("webgl-high");
  });
});
