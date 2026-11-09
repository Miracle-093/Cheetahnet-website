"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, Infinity as InfinityIcon, MapPin, Sparkles } from "lucide-react";
import { HeroVisual } from "@/components/hero-visual";
import { track } from "@/lib/analytics";

// Entrance choreography runs on CSS keyframes (see .hero-rise in globals.css) so the
// headline paints immediately on first load, before React hydrates.
const rise = (step: number) => ({ "--d": `${step * 90}ms` }) as React.CSSProperties;

export function Hero() {
  return <section className="hero-stage relative overflow-hidden border-b border-white/10 pt-[80px]">
    <div className="absolute inset-0 grid-noise opacity-55" />
    <div className="hero-shade absolute inset-0" />
    <div className="speed-streaks pointer-events-none absolute inset-0" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <span key={index} />)}</div>
    <Image src="/brand/cheetah-mark.png" alt="" aria-hidden="true" width={171} height={109} className="hero-cheetah pointer-events-none absolute -left-10 bottom-10 w-[520px] max-w-none opacity-[.045] lg:bottom-16" />
    <div className="container relative grid min-h-[780px] items-center gap-4 py-14 lg:grid-cols-[1.04fr_.96fr] lg:gap-8 lg:py-12">
      <div className="relative z-20 max-w-[720px]">
        <div className="campaign-pill hero-rise" style={rise(0)}><Sparkles className="size-3.5" /> Move at the speed of now</div>
        <h1 className="hero-title mt-7">
          <span className="hero-line"><span className="hero-rise" style={rise(1)}>Unlimited fibre.</span></span>
          <span className="hero-line"><span className="hero-rise gold-shimmer" style={rise(2)}>Built for everything</span></span>
          <span className="hero-line"><span className="hero-rise" style={rise(3)}>you do next.</span></span>
        </h1>
        <p className="hero-rise mt-7 max-w-[620px] text-lg font-medium leading-8 text-[#e8e2d4] md:text-xl" style={rise(5)}>Fast, uncapped fibre internet for homes, creators and businesses—from <strong className="text-[#ffb200]">UGX 75,000/month.</strong></p>
        <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row" style={rise(6)}>
          <Link href="#coverage-check" className="button-primary !min-h-14 !px-7" onClick={() => track("hero_cta_clicked", { action: "coverage" })}>Check coverage <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
          <Link href="#packages" className="button-secondary !min-h-14 !border-white/25 !bg-white/[.06] !px-7" onClick={() => track("hero_cta_clicked", { action: "packages" })}>View packages</Link>
        </div>
        <div className="hero-rise mt-10 grid max-w-[650px] grid-cols-3 border-y border-white/15 py-4 text-sm" style={rise(7)}>
          <span className="flex items-center gap-2 text-white/75"><InfinityIcon className="size-4 text-[#ffb200]" /> Uncapped</span>
          <span className="flex items-center justify-center gap-2 border-x border-white/15 text-white/75"><Gauge className="size-4 text-[#ffb200]" /> 15–250 Mbps</span>
          <span className="flex items-center justify-end gap-2 text-white/75"><MapPin className="size-4 text-[#ffb200]" /> Check location</span>
        </div>
      </div>
      <div className="hero-network hero-fade relative z-10 h-[360px] min-h-0 sm:h-[430px] lg:h-[670px]"><div className="hero-network-canvas absolute inset-y-0 -left-[30%] right-0"><HeroVisual /></div><div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/55 backdrop-blur-md">Interactive fibre network</div></div>
    </div>
  </section>;
}
