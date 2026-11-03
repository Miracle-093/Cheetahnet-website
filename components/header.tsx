"use client";

import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { track } from "@/lib/analytics";

const links = [
  ["Packages", "/packages"], ["Coverage", "/coverage"], ["About", "/about"], ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070806]/80 backdrop-blur-xl">
      <div className="container flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="CheetahNet home">
          <span className="grid size-9 place-items-center rounded-full bg-[#ff6b18] text-sm font-black text-black">CN</span>
          <span className="font-bold tracking-[-.04em]">CHEETAHNET</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} className="text-sm text-white/70 transition hover:text-white" href={href}>{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="https://portal.cheetahnet.co.ug/" target="_blank" rel="noreferrer" onClick={() => track("renewal_portal_clicked")} className="text-sm font-semibold">Renew <ArrowUpRight className="ml-1 inline size-4" /></a>
          <Link href="/coverage" className="button-primary !min-h-10 !px-4 text-sm">Check coverage</Link>
        </div>
        <button className="grid size-10 place-items-center md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container flex flex-col gap-5 border-t border-white/10 py-6 md:hidden" aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} className="text-xl" href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/coverage" className="button-primary mt-2" onClick={() => setOpen(false)}>Check coverage</Link>
      </nav>}
    </header>
  );
}
