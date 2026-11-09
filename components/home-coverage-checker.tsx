"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { packageById, packages } from "@/lib/packages";
import { coverageJourneyQuery, loadCoverageJourney, saveCoverageJourney, type CoverageJourney } from "@/lib/coverage-journey";
import { loadPackageSelection } from "@/lib/package-selection";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/contact";

const empty: CoverageJourney = { area:"", street:"", packageId:"" };

export function HomeCoverageChecker() {
  const [value, setValue] = useState(empty); const [status, setStatus] = useState<"idle"|"checking"|"manual">("idle");
  useEffect(() => { const frame=window.requestAnimationFrame(()=>{const saved=loadCoverageJourney();const selected=loadPackageSelection();setValue(saved||{...empty,packageId:selected||""});});return()=>window.cancelAnimationFrame(frame); }, []);
  const query = useMemo(() => coverageJourneyQuery(value), [value]);
  const selectedPlan = packageById(value.packageId);
  const waHref = whatsappUrl(`Hello CheetahNet, please check fibre coverage for ${value.area || "my area"} (${value.street || "nearby landmark"})${selectedPlan ? ` — interested in ${selectedPlan.name} (${selectedPlan.speedMbps} Mbps)` : ""}.`);
  const submit = (event:FormEvent) => { event.preventDefault(); saveCoverageJourney(value); setStatus("checking"); track("coverage_check_started",{source:"homepage"}); window.setTimeout(()=>{setStatus("manual");track("coverage_check_completed",{source:"homepage",result:"manual_verification"});},450); };
  const input = "min-h-14 rounded-xl border border-black/15 bg-white px-4 text-[#15120c] placeholder:text-black/35 transition-[border-color,box-shadow] focus:border-[#ffb200] focus:shadow-[0_0_0_4px_rgba(255,178,0,.22)] focus:outline-none";
  return <div className="overflow-hidden rounded-[30px] border border-black/10 bg-[#f5f0e4] text-[#15120c] shadow-[0_30px_90px_rgba(0,0,0,.18)]">
    <div className="grid lg:grid-cols-[1fr_.72fr]">
      <form onSubmit={submit} className="p-7 md:p-10 lg:p-12"><div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Neighbourhood<input required value={value.area} onChange={e=>setValue({...value,area:e.target.value})} className={input} placeholder="e.g. Kololo, Ntinda, Bugolobi"/></label>
        <label className="grid gap-2 text-sm font-semibold">Street or nearby landmark<input required value={value.street} onChange={e=>setValue({...value,street:e.target.value})} className={input} placeholder="Street, road or landmark"/></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">Package of interest<select value={value.packageId} onChange={e=>setValue({...value,packageId:e.target.value})} className={input}><option value="">Help me choose</option>{packages.map(plan=><option key={plan.id} value={plan.id}>{plan.name} — {plan.speedMbps} Mbps</option>)}</select></label>
        <button disabled={status==="checking"} className="button-primary !min-h-14 md:col-span-2">{status==="checking"?"Checking fibre proximity…":"Check my location"}<ArrowRight className="size-4"/></button>
      </div></form>
      <aside className="border-t border-black/10 bg-[#ffb200] p-7 lg:border-l lg:border-t-0 lg:p-12"><span className="relative inline-grid size-12 place-items-center"><span className={`absolute inset-0 rounded-full bg-black/15 ${status==="checking"?"animate-ping":"map-pulse"}`}/><MapPin className="relative size-8"/></span><p className="mt-9 text-xs font-bold uppercase tracking-[.18em]">Fast coverage check</p>{status==="manual" ? <motion.div key="result" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="mt-5" aria-live="polite"><motion.span className="block w-fit" initial={{scale:0,rotate:-30}} animate={{scale:1,rotate:0}} transition={{type:"spring",stiffness:320,damping:16,delay:.1}}><CheckCircle2 className="size-7"/></motion.span><h3 className="mt-4 text-3xl font-semibold tracking-[-.05em]">Location logged for engineer check</h3><p className="mt-4 text-sm leading-6 text-black/75">Our network team verifies exact pole-to-home distance and schedules same-day setup where fibre is live. Book installation now or confirm instantly on WhatsApp.</p><div className="mt-7 flex flex-col gap-3"><Link href={`/installation?${query}`} className="rounded-full bg-black px-5 py-3 text-center text-sm font-bold text-white">Book installation <ArrowRight className="ml-1 inline size-4"/></Link><a href={waHref} target="_blank" rel="noreferrer" onClick={()=>track("whatsapp_clicked",{source:"home_coverage"})} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-black/40 px-5 py-2.5 text-center text-sm font-bold hover:border-black"><MessageCircle className="size-4"/>Confirm on WhatsApp</a></div></motion.div> : <><h3 className="mt-5 text-3xl font-semibold tracking-[-.05em]">Same-day hookup across 42+ areas.</h3><p className="mt-4 text-sm leading-6 text-black/75">Enter your neighbourhood and landmark to check fibre proximity and book white-glove installation in under 60 minutes.</p></>}</aside>
    </div>
  </div>;
}
