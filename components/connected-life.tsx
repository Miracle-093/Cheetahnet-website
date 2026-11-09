"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BriefcaseBusiness, House, Upload } from "lucide-react";
import { useState } from "react";

const stories = [
  {
    id: "home",
    label: "Home",
    verb: "Stream",
    title: "Room for everyone to be online.",
    description: "Stream in 4K, study, browse and connect every device in the house simultaneously — with zero data caps and a Wi-Fi router included.",
    image: "/campaign/home.png",
    alt: "Ugandan family enjoying fast fibre internet at home",
    icon: House,
    packageId: "elite-pro",
  },
  {
    id: "creator",
    label: "Creator",
    verb: "Create",
    title: "Give bigger ideas a faster way out.",
    description: "Symmetric upload and download speeds built for publishing 4K video, going live without drops and competitive low-latency gaming.",
    image: "/campaign/creator.png",
    alt: "Ugandan digital creator editing video in a studio",
    icon: Upload,
    packageId: "viva-ultra",
  },
  {
    id: "business",
    label: "Business",
    verb: "Build",
    title: "Keep the workday moving with you.",
    description: "Enterprise-grade reliability with 99.9% uptime, optional static IP and 24/7 direct access to real network engineers.",
    image: "/campaign/business.png",
    alt: "Ugandan entrepreneurs working in a connected office",
    icon: BriefcaseBusiness,
    packageId: "viva-executive",
  },
] as const;

export function ConnectedLife() {
  const [activeId, setActiveId] = useState<(typeof stories)[number]["id"]>("home");
  const active = stories.find((story) => story.id === activeId) ?? stories[0];

  return <section id="connected-life" className="connected-life scroll-mt-16 overflow-hidden bg-[#f4f0e5] py-24 text-[#15120c] md:py-32">
    <div className="container">
      <div className="grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end">
        <div>
          <span className="eyebrow !text-[#8a5300]">One network. Every next move.</span>
          <h2 className="section-title mt-7">See what your connection can carry.</h2>
        </div>
        <p className="max-w-xl text-lg leading-8 text-black/60">Choose the life you are connecting. We will take you from the moment that matters to the right package and same-day installation check.</p>
      </div>

      <div className="connected-life-tabs mt-12 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Connected life stories">
        {stories.map(({id,label,icon:Icon}) => <button key={id} type="button" role="tab" aria-selected={activeId === id} aria-controls="connected-life-panel" onClick={() => setActiveId(id)} className={`connected-life-tab relative ${activeId === id ? "is-active" : ""}`}>
          {activeId === id && <motion.span layoutId="story-tab" className="absolute inset-0 rounded-full bg-[#15120c]" transition={{type:"spring",stiffness:400,damping:34}}/>}
          <span className="relative flex items-center gap-2"><Icon className="size-4"/> {label}</span>
        </button>)}
      </div>

      <div id="connected-life-panel" role="tabpanel" className="relative mt-5 min-h-[650px] overflow-hidden rounded-[32px] bg-[#0e0c08] text-white md:min-h-[720px]">
        {stories.map((story) => <motion.div key={story.id} aria-hidden={active.id !== story.id} initial={false} animate={{opacity:active.id === story.id ? 1 : 0,scale:active.id === story.id ? 1 : 1.015}} transition={{duration:.45,ease:[.22,1,.36,1]}} className="absolute inset-0">
          <Image src={story.image} alt={active.id === story.id ? story.alt : ""} fill priority={story.id === "home"} sizes="(max-width: 768px) 100vw, 1180px" className="ken-burns object-cover object-[68%_center]"/>
        </motion.div>)}
        <div className="connected-life-shade absolute inset-0"/>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffb200] to-transparent opacity-80"/>
        <motion.div key={`${active.id}-copy`} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.45,delay:.08}} className="relative z-10 flex min-h-[650px] max-w-xl flex-col justify-end p-7 md:min-h-[720px] md:p-12 lg:p-16">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-[#ffe3a1]">{active.verb}</span>
          <h3 className="mt-5 text-4xl font-semibold leading-[.96] tracking-[-.055em] md:text-6xl">{active.title}</h3>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/75 md:text-lg md:leading-8">{active.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/coverage?package=${active.packageId}`} className="button-primary">Check availability <ArrowRight className="size-4"/></Link>
            <Link href="#packages" className="button-secondary !border-white/30 !bg-black/30">Compare packages</Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>;
}
