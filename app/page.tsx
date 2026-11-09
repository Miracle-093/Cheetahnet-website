import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Headphones, MessageCircle, Router, Smartphone } from "lucide-react";
import { Hero } from "@/components/hero";
import { ConnectedLife } from "@/components/connected-life";
import { PackageCard } from "@/components/package-card";
import { PlanFinder } from "@/components/plan-finder";
import { HomeCoverageChecker } from "@/components/home-coverage-checker";
import { FAQ } from "@/components/faq";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { faqs } from "@/lib/faqs";
import { packages } from "@/lib/packages";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";

const ticker = ["Truly uncapped fibre", "Same-day installation", "Cheetah-Core router included", "Mobile Money accepted", "99.9% network uptime", "24/7 real engineer support"];
const pillars = [
  { icon: Clock, title: "Same-day connection", detail: "White-glove setup in under 60 minutes" },
  { icon: Router, title: "Router included", detail: "Next-gen Cheetah-Core Wi-Fi on every plan" },
  { icon: Smartphone, title: "Mobile Money ready", detail: "Instant payment & self-service renewal" },
  { icon: Headphones, title: "24/7 real engineers", detail: "Direct human support — no bots or scripts" },
] as const;
const steps = [
  ["01","Check your location","Enter your neighbourhood and a nearby landmark — or ping us on WhatsApp — so our engineers can verify pole-to-home fibre distance."],
  ["02","Choose your speed","Pick from 15 to 250 Mbps of symmetric, uncapped fibre with a Cheetah-Core Wi-Fi router included on every plan."],
  ["03","Get connected same day","Our field team completes white-glove installation in under 60 minutes and gets every device online before leaving."],
];

export default function HomePage() {
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(item=>({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}}))};
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <Hero/>

    <div className="marquee bg-[#ffb200] py-4 text-[#090806]" aria-label="CheetahNet highlights">
      <div className="marquee-track" aria-hidden="true">{[0,1].map(copy=><div key={copy} className="flex shrink-0 items-center">{ticker.map(item=><span key={item} className="flex items-center whitespace-nowrap px-6 text-sm font-semibold uppercase tracking-[.14em]">{item}<Image src="/brand/cheetah-mark.png" alt="" width={171} height={109} className="ml-12 h-4 w-auto brightness-0"/></span>)}</div>)}</div>
      <p className="sr-only">{ticker.join(". ")}</p>
    </div>

    <section className="benefit-ribbon bg-[#f6f1e6] text-[#15120c]">
      <Stagger className="container grid divide-y divide-black/10 py-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <StaggerItem className="py-4 sm:px-6"><strong className="block text-3xl font-semibold tracking-[-.04em]">From UGX 75,000</strong><span className="mt-1 block text-xs uppercase tracking-[.16em] text-black/55">per month · truly uncapped</span></StaggerItem>
        <StaggerItem className="py-4 sm:px-8"><strong className="block text-3xl font-semibold tracking-[-.04em]">15–<CountUp from={15} to={250}/> Mbps</strong><span className="mt-1 block text-xs uppercase tracking-[.16em] text-black/55">symmetric upload &amp; download</span></StaggerItem>
        <StaggerItem className="py-4 sm:px-8"><strong className="block text-3xl font-semibold tracking-[-.04em]"><CountUp from={1} to={42}/>+ metro areas</strong><span className="mt-1 block text-xs uppercase tracking-[.16em] text-black/55">99.9% uptime · 0.8 ms core latency</span></StaggerItem>
      </Stagger>
      <div className="border-t border-black/10">
        <Stagger className="container grid gap-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, detail }) => (
            <StaggerItem key={title} className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#15120c] text-[#ffb200]"><Icon className="size-5"/></span>
              <div><strong className="block text-sm font-bold tracking-[-.01em]">{title}</strong><span className="mt-0.5 block text-xs leading-5 text-black/60">{detail}</span></div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <ConnectedLife/>

    <section id="packages" className="relative overflow-hidden border-y border-white/10 bg-[#0e0c08] py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#ffb200]/[.07] blur-[120px]" aria-hidden="true"/>
      <div className="container relative"><Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><span className="eyebrow">Internet packages</span><h2 className="section-title mt-7">Choose your pace.</h2></div><Link href="/packages" className="button-secondary">Compare all packages<ArrowRight className="size-4"/></Link></Reveal><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{packages.map((plan,index)=><PackageCard key={plan.id} plan={plan} index={index} featured={plan.id==="elite-pro"}/>)}</div></div>
    </section>

    <section className="relative overflow-hidden bg-[#ffb200] py-24 text-black md:py-32">
      <div className="speed-lines-dark pointer-events-none absolute inset-0" aria-hidden="true"/>
      <div className="container relative"><Reveal><span className="text-xs font-bold uppercase tracking-[.18em]">Guided recommendation</span><div className="mt-7 grid gap-8 lg:grid-cols-[1fr_.7fr]"><h2 className="section-title">Your needs first.<br/>Then the speed.</h2><p className="max-w-xl self-end text-lg leading-8 text-black/70">Answer four quick questions for a tailored speed recommendation based on your devices and daily routine.</p></div></Reveal><Reveal delay={.1} className="mt-12 [&_.card]:border-black/15! [&_.card]:bg-[#0e0c08]! [&_.card]:text-white [&_.card]:shadow-[0_40px_100px_rgba(60,35,0,.35)]"><PlanFinder/></Reveal></div>
    </section>

    <section id="coverage-check" className="scroll-mt-16 bg-[#efe8d9] py-24 text-[#15120c] md:py-32"><div className="container"><Reveal className="grid gap-8 lg:grid-cols-[1fr_.7fr]"><div><span className="eyebrow !text-[#8a5300]">Coverage checker</span><h2 className="section-title mt-7">Put your location on the map.</h2></div><p className="max-w-xl self-end text-lg leading-8 text-black/60">Share your area and nearest landmark. Our engineers verify fibre proximity and schedule same-day installation.</p></Reveal><Reveal delay={.1} className="mt-12"><HomeCoverageChecker/></Reveal></div></section>

    <section className="bg-[#15120c] py-24 md:py-32"><div className="container grid gap-14 lg:grid-cols-[.72fr_1.28fr]"><Reveal><span className="eyebrow">From interest to installation</span><h2 className="section-title mt-7">Three steps.<br/>One clear route.</h2></Reveal>
      <Stagger as="ol" className="steps-list relative border-t border-white/15">{steps.map(([number,title,text])=><StaggerItem as="li" key={number} className="step-row group grid grid-cols-[56px_1fr_auto] items-start gap-4 border-b border-white/15 py-8"><span className="font-mono text-sm text-[#ffb200]">{number}</span><div><h3 className="text-2xl font-semibold tracking-[-.03em] transition-colors group-hover:text-[#ffb200]">{title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-white/50">{text}</p></div><ArrowRight className="mt-1 hidden size-5 text-white/25 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-[#ffb200] sm:block"/></StaggerItem>)}</Stagger>
    </div></section>

    <section className="bg-[#0e0c08] py-24 md:py-32"><div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><Reveal><span className="eyebrow">Questions, answered</span><h2 className="section-title mt-7">Before you connect.</h2></Reveal><Reveal delay={.1}><FAQ/></Reveal></div></section>

    <section className="relative overflow-hidden bg-[#ffb200] py-20 text-black md:py-28">
      <Image src="/brand/cheetah-mark.png" alt="" aria-hidden="true" width={171} height={109} className="cheetah-run pointer-events-none absolute bottom-6 h-auto w-[300px] max-w-none brightness-0 md:w-[420px]"/>
      <div className="container relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><Reveal><span className="text-xs font-bold uppercase tracking-[.18em]">Ready to start?</span><h2 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">Check your location. Choose your speed.</h2><p className="mt-5 text-base font-medium text-black/75">Need help right now? Chat with an engineer on WhatsApp at <strong>{WHATSAPP_DISPLAY}</strong>.</p></Reveal><Reveal delay={.15} className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link href="#coverage-check" className="final-coverage-button">Check coverage <span aria-hidden="true">→</span></Link><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="final-renewal-button"><MessageCircle className="size-4"/>WhatsApp us</a></Reveal></div>
    </section>
  </main>;
}
