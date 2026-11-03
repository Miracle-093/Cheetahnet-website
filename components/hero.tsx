"use client";

import Link from "next/link";
import { ArrowRight, Gauge, Infinity as InfinityIcon, MapPin, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { HeroVisual } from "@/components/hero-visual";
import { track } from "@/lib/analytics";

export function Hero() {
  const reduced = useReducedMotion();
  return <section className="hero-stage relative overflow-hidden border-b border-white/10 pt-[72px]">
    <div className="absolute inset-0 grid-noise opacity-55" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_47%,rgba(255,107,24,.16),transparent_28%),linear-gradient(90deg,#070806_0%,rgba(7,8,6,.97)_41%,rgba(7,8,6,.25)_73%,#070806_100%)]" />
    <div className="container relative grid min-h-[780px] items-center gap-8 py-16 lg:grid-cols-[1.04fr_.96fr] lg:py-12">
      <motion.div initial={reduced ? false : { opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:.65 }} className="relative z-20 max-w-[720px]">
        <div className="campaign-pill"><Sparkles className="size-3.5"/> Move at the speed of now</div>
        <h1 className="hero-title mt-7">Unlimited fibre.<br/><span>Built for everything</span><br/>you do next.</h1>
        <p className="mt-7 max-w-[620px] text-lg font-medium leading-8 text-[#e2dfd6] md:text-xl">Fast, uncapped fibre internet for homes, creators and businesses—from <strong className="text-white">UGX 75,000/month.</strong></p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="#coverage-check" className="button-primary !min-h-14 !px-6" onClick={() => track("hero_cta_clicked", { action:"coverage" })}>Check coverage <ArrowRight className="size-4"/></Link>
          <Link href="#packages" className="button-secondary !min-h-14 !border-white/30 !bg-white/[.08] !px-6" onClick={() => track("hero_cta_clicked", { action:"packages" })}>View packages</Link>
        </div>
        <div className="mt-10 grid max-w-[650px] grid-cols-3 border-y border-white/15 py-4 text-sm">
          <span className="flex items-center gap-2 text-white/75"><InfinityIcon className="size-4 text-[#ff6b18]"/> Uncapped</span>
          <span className="flex items-center justify-center gap-2 border-x border-white/15 text-white/75"><Gauge className="size-4 text-[#ff6b18]"/> 15–250 Mbps</span>
          <span className="flex items-center justify-end gap-2 text-white/75"><MapPin className="size-4 text-[#ff6b18]"/> Check location</span>
        </div>
      </motion.div>
      <div className="hero-network relative z-10 h-[430px] min-h-0 lg:h-[670px]"><div className="absolute inset-y-0 -left-[30%] right-0"><HeroVisual/></div><div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/55 backdrop-blur-md">Live network visual</div></div>
    </div>
  </section>;
}
