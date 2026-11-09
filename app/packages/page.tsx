import type { Metadata } from "next";
import { PackageCard } from "@/components/package-card";
import { PlanFinder } from "@/components/plan-finder";
import { packages } from "@/lib/packages";

export const metadata: Metadata = { title: "Fibre packages", description: "Compare CheetahNet uncapped symmetric fibre packages from 15 Mbps to 250 Mbps.", alternates: { canonical: "/packages" } };

export default function PackagesPage() { return <main className="pt-28"><section className="py-16"><div className="container"><span className="eyebrow">Fibre packages</span><h1 className="section-title mt-7 max-w-4xl">Simple pricing. Massive performance.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">Every plan includes symmetric upload and download speeds, zero data caps, a Cheetah-Core Wi-Fi router and 24/7 engineer support.</p></div></section><section className="pb-24"><div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-4">{packages.map((plan, index) => <PackageCard key={plan.id} plan={plan} index={index} featured={plan.id === "elite-pro"} />)}</div></section><section className="border-t border-white/10 py-24"><div className="container"><h2 className="section-title max-w-3xl">Not sure where to start?</h2><div className="mt-12"><PlanFinder /></div></div></section></main> }
