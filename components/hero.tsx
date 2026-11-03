"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";

const FibreScene = dynamic(() => import("@/components/fibre-scene").then((mod) => mod.FibreScene), { ssr: false, loading: () => null });

export function Hero() {
  const reduced = useReducedMotion();
  return <section className="relative min-h-[820px] overflow-hidden border-b border-white/10 pt-24 grid-noise">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,107,24,.13),transparent_32%),radial-gradient(circle_at_60%_70%,rgba(200,255,69,.06),transparent_25%)]" />
    {!reduced && <div className="absolute inset-y-0 right-0 w-full lg:w-[60%]"><FibreScene /></div>}
    <div className="container relative z-10 flex min-h-[720px] items-center py-20">
      <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-[760px]">
        <span className="eyebrow"><Zap className="size-3.5 fill-current" /> Fibre internet in Uganda</span>
        <h1 className="display mt-7">Move at the<br/><span className="text-[#ff6b18]">speed of now.</span></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">Fibre packages for homes, creators, gamers and businesses—starting from <strong className="text-white">UGX 75,000/month.</strong></p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/coverage" className="button-primary" onClick={() => track("hero_cta_clicked", { action: "coverage" })}>Check coverage <ArrowRight className="size-4" /></Link>
          <Link href="/packages" className="button-secondary" onClick={() => track("hero_cta_clicked", { action: "packages" })}>Compare packages</Link>
        </div>
        <p className="mt-5 text-xs text-white/40">Availability and package details require CheetahNet confirmation.</p>
      </motion.div>
    </div>
    <a href="#packages" className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[.17em] text-white/40">Explore <ArrowDown className="size-4" /></a>
  </section>;
}
