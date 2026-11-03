"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "@/lib/faqs";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="divide-y divide-white/10 border-y border-white/10">{faqs.map((item,index) => <div key={item.q}>
    <button className="flex w-full items-center justify-between gap-5 py-6 text-left text-lg font-semibold" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>{item.q}<Plus className={`size-5 shrink-0 transition ${open === index ? "rotate-45 text-[#ff6b18]" : ""}`} /></button>
    <AnimatePresence initial={false}>{open === index && <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><p className="max-w-3xl pb-7 leading-7 text-white/55">{item.a}</p></motion.div>}</AnimatePresence>
  </div>)}</div>;
}
