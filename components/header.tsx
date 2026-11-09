"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { track } from "@/lib/analytics";

const links = [
  ["Packages", "/packages"], ["Coverage", "/coverage"], ["About", "/about"], ["Contact", "/contact"],
];

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <Image src="/brand/cheetahnet-logo.png" alt="CheetahNet" width={375} height={141} priority className={className} />;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${scrolled || open ? "border-white/10 bg-[#090806]/85 shadow-[0_12px_40px_rgba(0,0,0,.35)] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <div className={`container flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-[64px]" : "h-[80px]"}`}>
        <Link href="/" className="logo-link group relative flex items-center" aria-label="CheetahNet home">
          <Logo className={`w-auto transition-[height] duration-500 ${scrolled ? "h-8" : "h-10"}`} />
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => {
            const active = pathname === href;
            return <Link key={href} href={href} className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active ? "text-white" : "text-white/65 hover:text-white"}`}>
              {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[.08] ring-1 ring-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="nav-underline relative">{label}</span>
            </Link>;
          })}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a href="https://portal.cheetahnet.co.ug/" target="_blank" rel="noreferrer" onClick={() => track("renewal_portal_clicked")} className="group text-sm font-semibold text-white/85 transition hover:text-[#ffb200]">Renew <ArrowUpRight className="ml-0.5 inline size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          <Link href="/coverage" className="button-primary !min-h-10 !px-5 text-sm">Check coverage</Link>
        </div>
        <button className="grid size-10 place-items-center rounded-full md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? "x" : "menu"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .2 }}>{open ? <X /> : <Menu />}</motion.span>
          </AnimatePresence>
        </button>
      </div>
      <AnimatePresence>
        {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .35 }} className="overflow-hidden border-t border-white/10 md:hidden" aria-label="Mobile navigation">
          <motion.div className="container flex flex-col gap-5 py-6" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .06, delayChildren: .08 } } }}>
            {links.map(([label, href]) => <motion.div key={href} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}><Link className="text-2xl font-semibold tracking-[-.03em]" href={href} onClick={() => setOpen(false)}>{label}</Link></motion.div>)}
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="mt-2 grid gap-3">
              <Link href="/coverage" className="button-primary" onClick={() => setOpen(false)}>Check coverage</Link>
              <a href="https://portal.cheetahnet.co.ug/" target="_blank" rel="noreferrer" className="button-secondary">Renew package <ArrowUpRight className="size-4" /></a>
            </motion.div>
          </motion.div>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}
