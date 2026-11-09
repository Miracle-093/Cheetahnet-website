import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/header";
import { WHATSAPP_DISPLAY, WHATSAPP_E164, whatsappUrl } from "@/lib/contact";

export function Footer() {
  return <footer className="relative overflow-hidden border-t border-white/10 bg-[#0e0c08] py-14">
    <div className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[800px] -translate-x-1/2 rounded-full bg-[#ffb200]/[.06] blur-[100px]" aria-hidden="true" />
    <div className="container relative grid gap-10 md:grid-cols-[1.35fr_1fr_1fr_1.15fr]">
      <div><Logo className="h-11 w-auto" /><p className="mt-5 max-w-sm text-sm leading-6 text-white/55">Reliable precision fibre connectivity for homes, creators and businesses across 42+ metropolitan areas in Uganda.</p></div>
      <div className="grid content-start gap-3 text-sm text-white/70"><span className="text-xs uppercase tracking-[.2em] text-white/35">Explore</span><Link className="footer-link" href="/packages">Packages</Link><Link className="footer-link" href="/coverage">Coverage</Link><Link className="footer-link" href="/installation">Request installation</Link><a className="footer-link" href="https://portal.cheetahnet.co.ug/" target="_blank" rel="noreferrer">Renew package <ArrowUpRight className="inline size-4" /></a></div>
      <div className="grid content-start gap-3 text-sm text-white/70"><span className="text-xs uppercase tracking-[.2em] text-white/35">Company</span><Link className="footer-link" href="/about">About</Link><Link className="footer-link" href="/contact">Contact</Link><Link className="footer-link" href="/privacy">Privacy</Link><Link className="footer-link" href="/terms">Terms</Link></div>
      <div className="grid content-start gap-3 text-sm text-white/70"><span className="text-xs uppercase tracking-[.2em] text-white/35">24/7 Engineer Support</span><a className="footer-link inline-flex items-center gap-2 font-semibold text-[#ffb200]" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />WhatsApp {WHATSAPP_DISPLAY}</a><a className="footer-link inline-flex items-center gap-2" href={`tel:${WHATSAPP_E164}`}><Phone className="size-4 text-[#ffb200]" />Call {WHATSAPP_DISPLAY}</a><span className="text-xs text-white/40">Mobile Money &amp; online renewals accepted</span></div>
    </div>
    <div className="container relative mt-12 border-t border-white/10 pt-6 text-xs text-white/35">© {new Date().getFullYear()} CheetahNet Fiber. Reliable Precision Connectivity.</div>
  </footer>;
}
