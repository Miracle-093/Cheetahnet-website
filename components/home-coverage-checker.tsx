"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { packages } from "@/lib/packages";
import { coverageJourneyQuery, loadCoverageJourney, saveCoverageJourney, type CoverageJourney } from "@/lib/coverage-journey";
import { loadPackageSelection } from "@/lib/package-selection";
import { track } from "@/lib/analytics";

const empty: CoverageJourney = { area:"", street:"", packageId:"" };

export function HomeCoverageChecker() {
  const [value, setValue] = useState(empty); const [status, setStatus] = useState<"idle"|"checking"|"manual">("idle");
  useEffect(() => { const frame=window.requestAnimationFrame(()=>{const saved=loadCoverageJourney();const selected=loadPackageSelection();setValue(saved||{...empty,packageId:selected||""});});return()=>window.cancelAnimationFrame(frame); }, []);
  const query = useMemo(() => coverageJourneyQuery(value), [value]);
  const submit = (event:FormEvent) => { event.preventDefault(); saveCoverageJourney(value); setStatus("checking"); track("coverage_check_started",{source:"homepage"}); window.setTimeout(()=>{setStatus("manual");track("coverage_check_completed",{source:"homepage",result:"manual_verification"});},450); };
  const input = "min-h-14 rounded-xl border border-black/15 bg-white px-4 text-[#11130f] placeholder:text-black/35 focus:border-[#ff6b18] focus:outline-none";
  return <div className="overflow-hidden rounded-[30px] border border-black/10 bg-[#f5f0e4] text-[#11130f] shadow-[0_30px_90px_rgba(0,0,0,.18)]">
    <div className="grid lg:grid-cols-[1fr_.72fr]">
      <form onSubmit={submit} className="p-7 md:p-10 lg:p-12"><div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Neighbourhood<input required value={value.area} onChange={e=>setValue({...value,area:e.target.value})} className={input} placeholder="Your neighbourhood or area"/></label>
        <label className="grid gap-2 text-sm font-semibold">Street or nearby landmark<input required value={value.street} onChange={e=>setValue({...value,street:e.target.value})} className={input} placeholder="Street, road or landmark"/></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">Package of interest<select value={value.packageId} onChange={e=>setValue({...value,packageId:e.target.value})} className={input}><option value="">Help me choose</option>{packages.map(plan=><option key={plan.id} value={plan.id}>{plan.name} — {plan.speedMbps} Mbps</option>)}</select></label>
        <button disabled={status==="checking"} className="button-primary !min-h-14 md:col-span-2">{status==="checking"?"Preparing your check…":"Check my location"}<ArrowRight className="size-4"/></button>
      </div></form>
      <aside className="border-t border-black/10 bg-[#ff6b18] p-7 lg:border-l lg:border-t-0 lg:p-12"><MapPin className="size-8"/><p className="mt-9 text-xs font-bold uppercase tracking-[.18em]">Coverage result</p>{status==="manual" ? <div className="mt-5" aria-live="polite"><CheckCircle2 className="size-7"/><h3 className="mt-4 text-3xl font-semibold tracking-[-.05em]">Manual confirmation required</h3><p className="mt-4 text-sm leading-6 text-black/70">Your details are saved for this session. Continue to the full check or installation request without re-entering them.</p><div className="mt-7 flex flex-col gap-3"><Link href={`/coverage?${query}`} className="rounded-full bg-black px-5 py-3 text-center text-sm font-bold text-white">Continue coverage check</Link><Link href={`/installation?${query}`} className="text-center text-sm font-bold">Request installation <ArrowRight className="inline size-4"/></Link></div></div> : <><h3 className="mt-5 text-3xl font-semibold tracking-[-.05em]">Start with your exact location.</h3><p className="mt-4 text-sm leading-6 text-black/70">Until CheetahNet supplies approved coverage data, every staging result is routed to manual confirmation.</p></>}</aside>
    </div>
  </div>;
}
