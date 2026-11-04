import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ConnectedLife } from "@/components/connected-life";
import { PackageCard } from "@/components/package-card";
import { PlanFinder } from "@/components/plan-finder";
import { HomeCoverageChecker } from "@/components/home-coverage-checker";
import { FAQ } from "@/components/faq";
import { faqs } from "@/lib/faqs";
import { packages } from "@/lib/packages";

export default function HomePage() {
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(item=>({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}}))};
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <Hero/>

    <section className="benefit-ribbon bg-[#f4f0e5] text-[#11130f]"><div className="container grid divide-y divide-black/10 py-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="py-4 sm:px-6"><strong className="block text-2xl tracking-[-.04em]">From UGX 75,000</strong><span className="mt-1 block text-xs uppercase tracking-[.16em] text-black/50">per month</span></div>
      <div className="py-4 sm:px-8"><strong className="block text-2xl tracking-[-.04em]">15–250 Mbps</strong><span className="mt-1 block text-xs uppercase tracking-[.16em] text-black/50">published package range</span></div>
      <div className="py-4 sm:px-8"><strong className="block text-2xl tracking-[-.04em]">Homes & businesses</strong><span className="mt-1 block text-xs uppercase tracking-[.16em] text-black/50">fibre packages</span></div>
    </div></section>
    <div className="bg-[#f4f0e5] pb-7 text-center text-[#11130f]"><p className="container text-xs text-black/45">Interactive website concept for CheetahNet — package and company information pending final approval.</p></div>

    <ConnectedLife/>

    <section id="packages" className="border-y border-white/10 bg-[#0b0c09] py-24 md:py-32"><div className="container"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><span className="eyebrow">Internet packages</span><h2 className="section-title mt-7">Choose your pace.</h2></div><Link href="/packages" className="button-secondary">Compare all packages<ArrowRight className="size-4"/></Link></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{packages.map(plan=><PackageCard key={plan.id} plan={plan} featured={plan.id==="elite-pro"}/>)}</div></div></section>

    <section className="bg-[#ff6b18] py-24 text-black md:py-32"><div className="container"><span className="text-xs font-bold uppercase tracking-[.18em]">Guided recommendation</span><div className="mt-7 grid gap-8 lg:grid-cols-[1fr_.7fr]"><h2 className="section-title">Your needs first.<br/>Then the speed.</h2><p className="max-w-xl self-end text-lg leading-8 text-black/65">Answer four quick questions for a configurable recommendation you can compare before checking coverage.</p></div><div className="mt-12 [&_.card]:border-black/15 [&_.card]:bg-[#0b0c09] [&_.card]:text-white"><PlanFinder/></div></div></section>

    <section id="coverage-check" className="bg-[#efe8d9] py-24 text-[#11130f] md:py-32"><div className="container"><div className="grid gap-8 lg:grid-cols-[1fr_.7fr]"><div><span className="eyebrow !text-[#c64b08]">Coverage checker</span><h2 className="section-title mt-7">Put your location on the map.</h2></div><p className="max-w-xl self-end text-lg leading-8 text-black/60">Share the area and nearest point of reference now. Your details stay with you as you continue the journey.</p></div><div className="mt-12"><HomeCoverageChecker/></div></div></section>

    <section className="bg-[#11130f] py-24 md:py-32"><div className="container grid gap-14 lg:grid-cols-[.72fr_1.28fr]"><div><span className="eyebrow">From interest to installation</span><h2 className="section-title mt-7">Three steps.<br/>One clear route.</h2></div><ol className="border-t border-white/15">{[["01","Check your location","Share your neighbourhood and a nearby landmark for a manual coverage check."],["02","Choose your package","Compare speed, monthly price and the kind of use each package supports."],["03","Request installation","Leave your details and preferred contact method for the CheetahNet team."]].map(([number,title,text])=><li key={number} className="grid grid-cols-[56px_1fr_auto] items-start gap-4 border-b border-white/15 py-8"><span className="font-mono text-sm text-[#ff6b18]">{number}</span><div><h3 className="text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-white/50">{text}</p></div><ArrowRight className="mt-1 hidden size-5 text-white/25 sm:block"/></li>)}</ol></div></section>

    <section className="bg-[#0b0c09] py-24 md:py-32"><div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><span className="eyebrow">Questions, answered</span><h2 className="section-title mt-7">Before you connect.</h2></div><FAQ/></div></section>

    <section className="bg-[#ff6b18] py-20 text-black md:py-28"><div className="container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><span className="text-xs font-bold uppercase tracking-[.18em]">Ready to start?</span><h2 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.065em] md:text-7xl">Check your location. Choose your speed.</h2></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link href="#coverage-check" className="final-coverage-button">Check coverage <span aria-hidden="true">→</span></Link><a href="https://portal.cheetahnet.co.ug/" target="_blank" rel="noreferrer" className="final-renewal-button">Renew package</a></div></div></section>
  </main>;
}
