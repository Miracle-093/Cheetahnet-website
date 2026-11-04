"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useState } from "react";
import { FibreFallback } from "@/components/fibre-fallback";
import { browserSupportsWebGL, selectHeroRenderingMode, type HeroRenderingMode } from "@/lib/hero-rendering";

const FibreScene = dynamic(() => import("@/components/fibre-scene").then((mod) => mod.FibreScene), { ssr: false });

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

type NavigatorWithHints = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

export function HeroVisual() {
  const [mode, setMode] = useState<HeroRenderingMode>("static");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const navigatorHints = navigator as NavigatorWithHints;
      const forceStatic = new URLSearchParams(window.location.search).get("hero") === "static";
      const nextMode = selectHeroRenderingMode({
        webglSupported: forceStatic ? false : browserSupportsWebGL(),
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigatorHints.deviceMemory,
        narrowViewport: window.matchMedia("(max-width: 820px)").matches,
        saveData: navigatorHints.connection?.saveData,
      });
      setMode(nextMode); setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const fallback = <FibreFallback animated={ready && windowMatchReducedMotion()} />;
  if (!ready || mode === "static" || failed) return fallback;

  return <>
    {!sceneReady && fallback}
    <SceneBoundary fallback={fallback} onFailure={() => setFailed(true)}>
      <div className={`absolute inset-0 transition-opacity duration-500 ${sceneReady ? "opacity-100" : "opacity-0"}`}>
        <FibreScene quality={mode === "webgl-low" ? "low" : "high"} onReady={() => setSceneReady(true)} />
      </div>
    </SceneBoundary>
  </>;
}

function windowMatchReducedMotion() {
  return typeof window === "undefined" ? false : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
