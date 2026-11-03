import Link from "next/link";
import { ArrowRight, Gamepad2, Home, RadioTower, Upload, Video, Wifi } from "lucide-react";
import { Hero } from "@/components/hero";
import { PackageCard } from "@/components/package-card";
import { PlanFinder } from "@/components/plan-finder";
import { FAQ } from "@/components/faq";
import { faqs } from "@/lib/faqs";
import { packages } from "@/lib/packages";

const uses = [
  { icon: Home, title: "Homes", text: "Keep everyday life, entertainment and shared devices moving." },
  { icon: Video, title: "Work", text: "Build a more dependable routine for calls and cloud-based work." },
  { icon: Upload, title: "Creators", text: "Choose more room for publishing, uploads and large project files." },
  { icon: Gamepad2, title: "Gaming", text: "Find a tier suited to busy gaming and streaming households." },
  { icon: RadioTower, title: "Business", text: "Start the conversation around your team and workflow needs." },
];

export default function HomePage() {
  const faqSchema = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity: faqs.map((item) => ({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}})) };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <Hero />
    <section className="py-24 md:py-32">
      <div className="container"><span className="eyebrow">Built around your internet</span><div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_.9fr]"><h2 className="section-title">One network.<br/>Different ways to move.</h2><p className="max-w-xl self-end text-lg leading-8 text-white/55">Whether the day means calls, uploads, gameplay or a house full of streams, start with the package shaped around how you actually connect.</p></div>
      <div className="mt-14 grid border-y border-white/10 md:grid-cols-5">{uses.map(({icon:Icon,title,text},index) => <article key={title} className={`py-7 md:px-5 ${index ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}><Icon className="size-5 text-[#ff6b18]"/><h3 className="mt-10 font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{text}</p></article>)}</div></div>
    </section>
    <section id="packages" className="border-y border-white/10 bg-[#0b0c09] py-24 md:py-32">
      <div className="container"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><span className="eyebrow">Provisional packages</span><h2 className="section-title mt-7">Choose your pace.</h2></div><Link href="/packages" className="button-secondary">Compare all packages <ArrowRight className="size-4" /></Link></div>
      <p className="mt-5 max-w-xl text-sm leading-6 text-white/45">Pricing and package information is sourced from the current public website and remains subject to CheetahNet approval.</p>
      <div className="mt-12 grid gap-5 lg:grid-cols-4 md:grid-cols-2">{packages.map((plan) => <PackageCard key={plan.id} plan={plan} featured={plan.id === "elite-pro"} />)}</div></div>
    </section>
    <section className="py-24 md:py-32"><div className="container"><span className="eyebrow">Guided recommendation</span><h2 className="section-title mt-7 max-w-3xl">A clearer place to start.</h2><div className="mt-12"><PlanFinder /></div></div></section>
    <section className="border-y border-white/10 bg-[#c8ff45] py-24 text-black"><div className="container grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div><span className="text-xs font-bold uppercase tracking-[.18em]">From interest to installation</span><h2 className="section-title mt-7">Three clean steps.</h2></div><ol className="grid gap-0 border-t border-black/20">{[["01","Check your location","Share your area, street and nearby landmark for manual confirmation."],["02","Choose a package","Compare the provisional speeds and select a practical starting point."],["03","Request installation","Leave your details so the team can follow up on next steps."]].map(([number,title,text]) => <li key={number} className="grid grid-cols-[50px_1fr] gap-4 border-b border-black/20 py-7"><span className="text-sm font-bold">{number}</span><div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-black/60">{text}</p></div></li>)}</ol></div></section>
    <section className="py-24 md:py-32"><div className="container grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><span className="eyebrow">Why consider CheetahNet</span><h2 className="section-title mt-7">A faster route to the right fit.</h2></div><div className="grid gap-5 sm:grid-cols-2">{[[Wifi,"Fibre-first offer","The experience keeps the fibre product clear from the first screen."],[RadioTower,"Coverage before claims","Every address is routed to verification rather than an unsupported promise."],[Gamepad2,"Use-led choices","Packages are framed around real activities, not technical numbers alone."],[Upload,"Room to compare","See speed, cost and intended use together before making a request."]].map(([Icon,title,text]) => { const C = Icon as typeof Wifi; return <article key={String(title)} className="card p-7"><C className="size-5 text-[#c8ff45]"/><h3 className="mt-8 text-xl font-semibold">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-white/45">{String(text)}</p></article>})}</div></div></section>
    <section className="border-y border-white/10 bg-[#0b0c09] py-24"><div className="container grid gap-12 md:grid-cols-[1fr_.8fr] md:items-center"><div><span className="eyebrow">Coverage first</span><h2 className="section-title mt-7">Let’s locate your connection.</h2><p className="mt-6 max-w-xl leading-7 text-white/55">Tell us your neighbourhood, street and nearest landmark. Availability will be manually verified before installation is confirmed.</p></div><div className="md:text-right"><Link href="/coverage" className="button-primary">Check coverage <ArrowRight className="size-4" /></Link></div></div></section>
    <section className="py-24 md:py-32"><div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><span className="eyebrow">Questions, answered</span><h2 className="section-title mt-7">Before you connect.</h2></div><FAQ /></div></section>
    <section className="pb-24 md:pb-32"><div className="container"><div className="card relative overflow-hidden p-8 md:p-16"><div className="absolute right-0 top-0 size-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#ff6b18]/15 blur-3xl"/><span className="eyebrow">Already connected?</span><h2 className="mt-7 max-w-3xl text-4xl font-semibold tracking-[-.06em] md:text-6xl">Renew your CheetahNet package through the customer portal.</h2><a href="https://portal.cheetahnet.co.ug/" target="_blank" rel="noreferrer" className="button-primary mt-9">Open renewal portal <ArrowRight className="size-4" /></a></div></div></section>
  </main>;
}
