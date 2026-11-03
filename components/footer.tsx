import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return <footer className="border-t border-white/10 bg-[#0b0c09] py-12">
    <div className="container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
      <div><div className="text-xl font-bold tracking-[-.04em]">CHEETAHNET</div><p className="mt-3 max-w-sm text-sm leading-6 text-white/55">Fibre internet packages for homes and businesses in Uganda. Coverage and package details require confirmation.</p></div>
      <div className="grid content-start gap-3 text-sm text-white/70"><span className="text-xs uppercase tracking-[.2em] text-white/35">Explore</span><Link href="/packages">Packages</Link><Link href="/coverage">Coverage</Link><Link href="/installation">Request installation</Link></div>
      <div className="grid content-start gap-3 text-sm text-white/70"><span className="text-xs uppercase tracking-[.2em] text-white/35">Company</span><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="https://portal.cheetahnet.co.ug/" target="_blank" rel="noreferrer">Renew package <ArrowUpRight className="inline size-4" /></a></div>
    </div>
    <div className="container mt-12 border-t border-white/10 pt-6 text-xs text-white/35">© {new Date().getFullYear()} CheetahNet. Staging concept — company review required.</div>
  </footer>;
}
