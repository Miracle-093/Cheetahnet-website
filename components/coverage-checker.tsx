"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { packageById, packages } from "@/lib/packages";
import { whatsappUrl } from "@/lib/contact";

export function CoverageChecker({ initialPackage="",initialArea="",initialStreet="" }:{initialPackage?:string;initialArea?:string;initialStreet?:string}) {
  const [area, setArea] = useState(initialArea);
  const [street, setStreet] = useState(initialStreet);
  const [landmark, setLandmark] = useState("");
  const [pkg, setPkg] = useState(initialPackage);
  const [status,setStatus]=useState<"idle"|"checking"|"manual">("idle");
  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();track("coverage_check_started");setStatus("checking");window.setTimeout(()=>{setStatus("manual");track("coverage_check_completed",{result:"manual_verification"});},650)};
  const plan = packageById(pkg);
  const waHref = whatsappUrl(`Hello CheetahNet, please verify fibre coverage at ${area}, ${street} (near ${landmark})${plan ? ` for ${plan.name} (${plan.speedMbps} Mbps)` : ""}.`);
  const field="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 focus:border-[#ffb200] focus:outline-none";
  return <div className="card grid overflow-hidden md:grid-cols-[1.2fr_.8fr]"><form onSubmit={submit} className="p-7 md:p-10"><div className="grid gap-5"><label className="grid gap-2 text-sm">Neighbourhood or area<input required name="area" value={area} onChange={e=>setArea(e.target.value)} className={field} placeholder="e.g. Kololo, Ntinda, Bugolobi"/></label><label className="grid gap-2 text-sm">Street or road<input required name="street" value={street} onChange={e=>setStreet(e.target.value)} className={field} placeholder="Street or road name"/></label><label className="grid gap-2 text-sm">Nearest landmark<input required name="landmark" value={landmark} onChange={e=>setLandmark(e.target.value)} className={field} placeholder="A nearby landmark"/></label><label className="grid gap-2 text-sm">Package of interest<select name="package" value={pkg} onChange={e=>setPkg(e.target.value)} className={`${field} bg-[#15120c]`}><option value="">Help me choose</option>{packages.map(item=><option key={item.id} value={item.id}>{item.name} — {item.speedMbps} Mbps</option>)}</select></label><button disabled={status==="checking"} className="button-primary mt-2">{status==="checking"?"Checking fibre proximity…":"Check my location"}<ArrowRight className="size-4"/></button></div></form><aside className="border-t border-white/10 bg-white/[.025] p-7 md:border-l md:border-t-0 md:p-10"><MapPin className="size-7 text-[#ffb200]"/><h2 className="mt-8 text-2xl font-semibold">Fast engineer verification.</h2>{status==="manual"?<div className="mt-7 rounded-2xl border border-[#ffb200]/40 bg-[#ffb200]/10 p-5" aria-live="polite"><div className="flex items-center gap-2 text-[#ffb200]"><CheckCircle2 className="size-5"/><strong>Ready for engineer dispatch check</strong></div><p className="mt-2 text-sm leading-6 text-white/70">Book your installation below or send these coordinates directly to our engineering desk on WhatsApp for instant confirmation.</p><div className="mt-5 flex flex-col gap-3"><Link href={`/installation?package=${pkg}&area=${encodeURIComponent(area)}&street=${encodeURIComponent(street)}`} className="button-primary !min-h-11 text-sm">Book installation<ArrowRight className="size-4"/></Link><a href={waHref} target="_blank" rel="noreferrer" onClick={()=>track("whatsapp_clicked",{source:"coverage_page"})} className="button-secondary !min-h-11 text-sm"><MessageCircle className="size-4"/>Confirm on WhatsApp</a></div></div>:<p className="mt-5 text-sm leading-6 text-white/55">Serving 42+ metropolitan areas with same-day connection where fibre is on your street. Share your landmark so our engineers can confirm exact signal distance.</p>}</aside></div>;
}
