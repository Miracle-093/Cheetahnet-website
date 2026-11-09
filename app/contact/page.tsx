import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_E164, whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach CheetahNet 24/7 on WhatsApp or phone for fibre coverage checks, installations and support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-28">
      <section className="py-20">
        <div className="container">
          <span className="eyebrow">24/7 Dedicated support</span>
          <h1 className="section-title mt-7">Let’s get you connected.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
            Real network engineers are on the other end of the line 24/7 — no bots, no scripts, just fast answers on coverage, same-day installation and account support.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="card group p-7 transition hover:border-[#ffb200]/50">
              <MessageCircle className="size-7 text-[#25D366]" />
              <h2 className="mt-6 text-2xl font-semibold">WhatsApp</h2>
              <p className="mt-2 text-sm text-white/55">Fastest way to verify your location and schedule installation.</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#ffb200]">{WHATSAPP_DISPLAY} <ArrowUpRight className="size-4" /></span>
            </a>
            <a href={`tel:${WHATSAPP_E164}`} className="card group p-7 transition hover:border-[#ffb200]/50">
              <Phone className="size-7 text-[#ffb200]" />
              <h2 className="mt-6 text-2xl font-semibold">Call an engineer</h2>
              <p className="mt-2 text-sm text-white/55">Speak directly with our network support desk any time, day or night.</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#ffb200]">{WHATSAPP_DISPLAY} <ArrowUpRight className="size-4" /></span>
            </a>
            <div className="card p-7">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-[#ffe3a1]">Online self-service</span>
              <h2 className="mt-5 text-2xl font-semibold">Book or renew</h2>
              <p className="mt-2 text-sm text-white/55">Request a new installation online or renew an existing subscription via Mobile Money.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/installation" className="button-primary !min-h-10 !px-4 text-xs">Request installation</Link>
                <a href="https://portal.cheetahnet.co.ug/" target="_blank" rel="noreferrer" className="button-secondary !min-h-10 !px-4 text-xs">Renew portal <ArrowUpRight className="size-3.5" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
