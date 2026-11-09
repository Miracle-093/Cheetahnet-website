"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { recommendPlan, type RecommendationInput, type Usage } from "@/lib/recommendation";
import { formatUgx } from "@/lib/packages";
import { track } from "@/lib/analytics";

const usageOptions: { value: Usage; label: string }[] = [{value:"everyday",label:"Everyday internet"},{value:"work",label:"Remote work"},{value:"creator",label:"Creating & uploading"},{value:"gaming",label:"Gaming"},{value:"business",label:"Running a business"}];

const option = (selected: boolean) => `rounded-2xl border p-4 text-left text-sm transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 active:scale-[.98] ${selected ? "border-[#ffb200] bg-[#ffb200]/10 text-white" : "border-white/10 bg-white/[.03] text-white/75 hover:border-white/25"}`;

export function PlanFinder() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [input, setInput] = useState<RecommendationInput>({ usage: "everyday", devices: 4, customerType: "home", needs: [] });
  const result = useMemo(() => recommendPlan(input), [input]);
  const go = (value: number) => { setDirection(value > step ? 1 : -1); setStep(value); };
  const next = () => { const value = Math.min(3, step + 1); go(value); if (value === 3) track("plan_recommended", { package: result.primary.id }); };
  const toggleNeed = (need: RecommendationInput["needs"][number]) => setInput((current) => ({...current, needs: current.needs.includes(need) ? current.needs.filter((item) => item !== need) : [...current.needs, need]}));

  return <div className="card overflow-hidden">
    <div className="grid md:grid-cols-[.7fr_1.3fr]">
      <aside className="relative overflow-hidden bg-[#120e07] p-7 text-white md:p-10">
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-[#ffb200]/25 blur-3xl" aria-hidden="true" />
        <Sparkles className="relative size-7 text-[#ffb200]" />
        <p className="relative mt-16 text-xs font-bold uppercase tracking-[.18em] text-[#ffb200]">Plan finder</p>
        <h3 className="relative mt-4 text-4xl font-semibold tracking-[-.05em]">Find your starting speed.</h3>
        <p className="relative mt-5 text-sm leading-6 text-white/60">Four quick inputs. One practical recommendation you can still compare.</p>
        <div className="relative mt-10 flex gap-2">{[0,1,2,3].map((item) => <span key={item} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"><motion.span className="block h-full rounded-full bg-[#ffb200]" initial={false} animate={{ width: item <= step ? "100%" : "0%" }} transition={{ duration: .45 }} /></span>)}</div>
        <p className="relative mt-3 font-mono text-xs text-white/45">Step {step + 1} of 4</p>
      </aside>
      <div className="flex min-h-[470px] flex-col p-7 md:p-12">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div key={step} custom={direction} initial={{ opacity: 0, x: direction * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -40 }} transition={{ duration: .3 }}>
            {step === 0 && <fieldset><legend className="text-2xl font-semibold">What matters most online?</legend><div className="mt-7 grid gap-3 sm:grid-cols-2">{usageOptions.map((item) => <button key={item.value} type="button" onClick={() => setInput({...input, usage: item.value})} className={option(input.usage === item.value)}>{item.label}</button>)}</div></fieldset>}
            {step === 1 && <fieldset><legend className="text-2xl font-semibold">How many devices connect regularly?</legend><div className="mt-12"><input aria-label="Number of devices" type="range" min="1" max="25" value={input.devices} onChange={(event) => setInput({...input, devices: Number(event.target.value)})} className="w-full accent-[#ffb200]"/><div className="mt-7 text-6xl font-semibold tracking-[-.06em] tabular-nums">{input.devices}<span className="ml-2 text-base text-white/40">devices</span></div></div><div className="mt-10 flex gap-3">{(["home","business"] as const).map((type) => <button key={type} type="button" onClick={() => setInput({...input,customerType:type})} className={`flex-1 capitalize ${option(input.customerType === type)}`}>{type}</button>)}</div></fieldset>}
            {step === 2 && <fieldset><legend className="text-2xl font-semibold">Any high-demand needs?</legend><p className="mt-2 text-sm text-white/45">Choose all that apply.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{(["gaming","calls","uploads","streaming"] as const).map((need) => <button key={need} type="button" onClick={() => toggleNeed(need)} className={`capitalize ${option(input.needs.includes(need))}`}>{need === "calls" ? "Video calls" : need}</button>)}</div></fieldset>}
            {step === 3 && <div aria-live="polite"><span className="eyebrow">Your match</span><motion.h3 initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5, delay: .1 }} className="mt-5 text-5xl font-semibold tracking-[-.06em]">{result.primary.name}</motion.h3><p className="mt-2 text-[#ffb200]">{result.primary.speedMbps} Mbps · {formatUgx(result.primary.priceUgx)}/month</p><p className="mt-6 max-w-xl leading-7 text-white/60">{result.reason}</p><p className="mt-5 text-sm text-white/45">Alternative: <strong className="text-white/80">{result.alternative.name}</strong> ({result.alternative.speedMbps} Mbps)</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={`/coverage?package=${result.primary.id}`} className="button-primary">Check coverage</Link><Link href={`/installation?package=${result.primary.id}`} className="button-secondary">Request installation</Link></div></div>}
          </motion.div>
        </AnimatePresence>
        <div className="mt-auto flex justify-between pt-12">{step > 0 && <button type="button" onClick={() => go(step - 1)} className="flex items-center gap-2 text-sm text-white/55 transition hover:text-white"><ArrowLeft className="size-4" /> Back</button>} {step < 3 && <button type="button" onClick={next} className="button-primary ml-auto !min-h-11">Continue <ArrowRight className="size-4" /></button>}</div>
      </div>
    </div>
  </div>;
}
