"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import type { MouseEvent } from "react";
import { formatUgx, type InternetPackage } from "@/lib/packages";
import { savePackageSelection } from "@/lib/package-selection";
import { track } from "@/lib/analytics";

const MAX_SPEED = 250;

export function PackageCard({ plan, featured = false, index = 0 }: { plan: InternetPackage; featured?: boolean; index?: number }) {
  const select = () => { savePackageSelection(plan.id); track("package_selected", { package: plan.id }); };
  // Cursor-following spotlight: position is written to CSS variables, no re-render.
  const spotlight = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };
  const speedShare = Math.max(.08, plan.speedMbps / MAX_SPEED);

  return <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    transition={{ duration: .7, delay: index * .1 }}
    whileHover={{ y: -8 }}
    onMouseMove={spotlight}
    onViewportEnter={() => track("plan_viewed", { package: plan.id })}
    className={`card spotlight-card group relative flex min-h-[480px] flex-col overflow-hidden p-7 ${featured ? "featured-card" : ""}`}
  >
    {featured ? <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#ffb200] px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-black"><span className="size-1.5 animate-pulse rounded-full bg-black" />Most popular</span> : <span aria-hidden="true" className="invisible mb-5 hidden px-3 py-1 text-[10px] lg:block">&nbsp;</span>}
    <span className={`text-xs font-bold uppercase tracking-[.18em] ${plan.accent === "lime" ? "text-[#ffe3a1]" : "text-[#ffb200]"}`}>{plan.audience}</span>
    <h3 className="mt-5 text-3xl font-semibold tracking-[-.04em]">{plan.name}</h3>
    <div className="mt-5 flex items-end gap-2"><strong className="text-6xl font-semibold tracking-[-.06em]">{plan.speedMbps}</strong><span className="mb-2 text-sm text-white/45">Mbps</span></div>
    <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
      <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-[#f7941e] to-[#ffb200]" style={{ width: `${speedShare * 100}%` }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: .3 + index * .1 }} />
    </div>
    <p className="mt-5 text-sm leading-6 text-white/55">{plan.description}</p>
    <ul className="mt-6 grid gap-3 text-sm text-white/75">{plan.benefits.map((benefit) => <li key={benefit} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#ffb200]" />{benefit}</li>)}</ul>
    <div className="mt-auto border-t border-white/10 pt-6">
      <div className="flex items-baseline gap-1.5"><span className="text-2xl font-semibold tracking-[-.03em]">{formatUgx(plan.priceUgx)}</span><span className="text-xs text-white/40">/ month</span></div>
      <Link href={`/coverage?package=${plan.id}`} onClick={select} className={`mt-5 flex min-h-12 items-center justify-between rounded-full px-5 text-sm font-bold transition-colors ${featured ? "bg-[#ffb200] text-black hover:bg-[#ffc233]" : "bg-white/[.06] ring-1 ring-white/10 hover:bg-white/[.12]"}`}>Check availability <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
    </div>
  </motion.article>;
}
