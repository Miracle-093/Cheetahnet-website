"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { formatUgx, type InternetPackage } from "@/lib/packages";
import { savePackageSelection } from "@/lib/package-selection";
import { track } from "@/lib/analytics";

export function PackageCard({ plan, featured = false }: { plan: InternetPackage; featured?: boolean }) {
  const select = () => { savePackageSelection(plan.id); track("package_selected", { package: plan.id }); };
  return <motion.article whileHover={{ y: -8, rotateX: 1.2 }} transition={{ duration: .25 }} className={`card relative flex min-h-[460px] flex-col overflow-hidden p-7 ${featured ? "border-[#ff6b18]/55 glow" : ""}`} onViewportEnter={() => track("plan_viewed", { package: plan.id })}>
    {featured && <span className="absolute right-5 top-5 rounded-full bg-[#ff6b18] px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-black">Popular starting point</span>}
    <span className={`text-xs font-bold uppercase tracking-[.18em] ${plan.accent === "lime" ? "text-[#c8ff45]" : "text-[#ff6b18]"}`}>{plan.audience}</span>
    <h3 className="mt-6 text-3xl font-semibold tracking-[-.05em]">{plan.name}</h3>
    <div className="mt-5 flex items-end gap-2"><strong className="text-5xl tracking-[-.07em]">{plan.speedMbps}</strong><span className="mb-1 text-sm text-white/45">Mbps</span></div>
    <p className="mt-4 text-sm leading-6 text-white/55">{plan.description}</p>
    <ul className="mt-6 grid gap-3 text-sm text-white/75">{plan.benefits.map((benefit) => <li key={benefit} className="flex gap-2"><Check className="mt-0.5 size-4 text-[#c8ff45]" />{benefit}</li>)}</ul>
    <div className="mt-auto border-t border-white/10 pt-6"><div className="font-semibold">{formatUgx(plan.priceUgx)} <span className="text-xs font-normal text-white/40">/ month</span></div><Link href={`/coverage?package=${plan.id}`} onClick={select} className="mt-4 flex items-center justify-between text-sm font-bold">Check availability <ArrowRight className="size-4" /></Link></div>
  </motion.article>;
}
