import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gauge, ShieldCheck, Users, Wifi } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how CheetahNet delivers low-latency, truly uncapped fibre internet across Uganda.",
  alternates: { canonical: "/about" },
};

const stats = [
  { label: "Core latency", value: "0.8 ms", icon: Gauge },
  { label: "Network uptime", value: "99.9%", icon: ShieldCheck },
  { label: "Metropolitan areas", value: "42+", icon: Wifi },
  { label: "Engineer support", value: "24/7", icon: Users },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28">
      <section className="py-20">
        <div className="container">
          <span className="eyebrow">About CheetahNet</span>
          <h1 className="section-title mt-7 max-w-4xl">Engineered for precision. Built for Uganda.</h1>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
            <p className="text-lg leading-8 text-white/70">
              We don’t just provide internet — we provide the digital backbone for modern homes, creators and businesses across Uganda. Every CheetahNet plan delivers symmetric upload and download speeds with zero data caps.
            </p>
            <p className="leading-8 text-white/55">
              From white-glove installation in under 60 minutes to next-generation Cheetah-Core Wi-Fi routers included on every package and 24/7 access to real network engineers, our network is built so your connection never gets in the way of what you do next.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="card p-7">
                <Icon className="size-6 text-[#ffb200]" />
                <div className="mt-6 text-4xl font-semibold tracking-[-.05em]">{value}</div>
                <div className="mt-2 text-xs uppercase tracking-[.18em] text-white/45">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/coverage" className="button-primary">Check coverage <ArrowRight className="size-4" /></Link>
            <Link href="/packages" className="button-secondary">Explore packages</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
