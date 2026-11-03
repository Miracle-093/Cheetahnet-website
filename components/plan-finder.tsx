"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { recommendPlan, type RecommendationInput, type Usage } from "@/lib/recommendation";
import { formatUgx } from "@/lib/packages";
import { track } from "@/lib/analytics";

const usageOptions: { value: Usage; label: string }[] = [{value:"everyday",label:"Everyday internet"},{value:"work",label:"Remote work"},{value:"creator",label:"Creating & uploading"},{value:"gaming",label:"Gaming"},{value:"business",label:"Running a business"}];

export function PlanFinder() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<RecommendationInput>({ usage: "everyday", devices: 4, customerType: "home", needs: [] });
  const result = useMemo(() => recommendPlan(input), [input]);
  const next = () => { const value = Math.min(3, step + 1); setStep(value); if (value === 3) track("plan_recommended", { package: result.primary.id }); };
  const toggleNeed = (need: RecommendationInput["needs"][number]) => setInput((current) => ({...current, needs: current.needs.includes(need) ? current.needs.filter((item) => item !== need) : [...current.needs, need]}));

  return <div className="card overflow-hidden">
    <div className="grid md:grid-cols-[.7fr_1.3fr]">
      <aside className="bg-[#ff6b18] p-7 text-black md:p-10"><Sparkles className="size-7" /><p className="mt-20 text-xs font-bold uppercase tracking-[.18em]">Plan finder</p><h3 className="mt-4 text-4xl font-semibold tracking-[-.06em]">Find your starting speed.</h3><p className="mt-5 text-sm leading-6 text-black/65">Four quick inputs. One practical recommendation you can still compare.</p><div className="mt-10 flex gap-2">{[0,1,2,3].map((item) => <span key={item} className={`h-1.5 flex-1 rounded-full ${item <= step ? "bg-black" : "bg-black/20"}`} />)}</div></aside>
      <div className="min-h-[470px] p-7 md:p-12">
        {step === 0 && <fieldset><legend className="text-2xl font-semibold">What matters most online?</legend><div className="mt-7 grid gap-3 sm:grid-cols-2">{usageOptions.map((option) => <button key={option.value} type="button" onClick={() => setInput({...input, usage: option.value})} className={`rounded-2xl border p-4 text-left text-sm ${input.usage === option.value ? "border-[#c8ff45] bg-[#c8ff45]/10" : "border-white/10 bg-white/[.03]"}`}>{option.label}</button>)}</div></fieldset>}
        {step === 1 && <fieldset><legend className="text-2xl font-semibold">How many devices connect regularly?</legend><div className="mt-12"><input aria-label="Number of devices" type="range" min="1" max="25" value={input.devices} onChange={(event) => setInput({...input, devices: Number(event.target.value)})} className="w-full accent-[#ff6b18]"/><div className="mt-7 text-6xl font-semibold tracking-[-.07em]">{input.devices}<span className="ml-2 text-base text-white/40">devices</span></div></div><div className="mt-10 flex gap-3">{(["home","business"] as const).map((type) => <button key={type} onClick={() => setInput({...input,customerType:type})} className={`flex-1 rounded-2xl border p-4 capitalize ${input.customerType === type ? "border-[#c8ff45]" : "border-white/10"}`}>{type}</button>)}</div></fieldset>}
        {step === 2 && <fieldset><legend className="text-2xl font-semibold">Any high-demand needs?</legend><p className="mt-2 text-sm text-white/45">Choose all that apply.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{(["gaming","calls","uploads","streaming"] as const).map((need) => <button key={need} onClick={() => toggleNeed(need)} className={`rounded-2xl border p-4 text-left capitalize ${input.needs.includes(need) ? "border-[#ff6b18] bg-[#ff6b18]/10" : "border-white/10"}`}>{need === "calls" ? "Video calls" : need}</button>)}</div></fieldset>}
        {step === 3 && <div aria-live="polite"><span className="eyebrow">Your match</span><h3 className="mt-5 text-5xl font-semibold tracking-[-.07em]">{result.primary.name}</h3><p className="mt-2 text-[#c8ff45]">{result.primary.speedMbps} Mbps · {formatUgx(result.primary.priceUgx)}/month</p><p className="mt-6 max-w-xl leading-7 text-white/60">{result.reason}</p><p className="mt-5 text-sm text-white/45">Alternative: <strong className="text-white/80">{result.alternative.name}</strong> ({result.alternative.speedMbps} Mbps)</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={`/coverage?package=${result.primary.id}`} className="button-primary">Check coverage</Link><Link href={`/installation?package=${result.primary.id}`} className="button-secondary">Request installation</Link></div></div>}
        <div className="mt-12 flex justify-between">{step > 0 && <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm text-white/55"><ArrowLeft className="size-4" /> Back</button>} {step < 3 && <button onClick={next} className="button-primary ml-auto !min-h-11">Continue <ArrowRight className="size-4" /></button>}</div>
      </div>
    </div>
  </div>;
}
