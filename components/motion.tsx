"use client";

import { animate, motion, MotionConfig, useInView, useReducedMotion, useScroll, useSpring, type Variants } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Respects the visitor's OS "reduce motion" preference for every motion component. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ ease }}>{children}</MotionConfig>;
}

/** Thin brand-gold bar that tracks page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#f7941e] via-[#ffb200] to-[#ffe3a1]" />;
}

/** Fades and lifts content into place the first time it enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -12% 0px" }} transition={{ duration: 0.75, delay, ease }}>{children}</motion.div>;
}

const groupVariants: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

/** Parent for staggered reveals; pair with StaggerItem children. */
export function Stagger({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ol" | "ul" }) {
  const Component = as === "ol" ? motion.ol : as === "ul" ? motion.ul : motion.div;
  return <Component className={className} variants={groupVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>{children}</Component>;
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Component = as === "li" ? motion.li : motion.div;
  return <Component className={className} variants={itemVariants}>{children}</Component>;
}

/** Counts up to a number once visible. Server-renders the final value so it is never blank. */
export function CountUp({ to, from = 0, duration = 1.6, format = (value: number) => Math.round(value).toLocaleString("en-UG") }: { to: number; from?: number; duration?: number; format?: (value: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (reduce || !ref.current) return;
    const { top } = ref.current.getBoundingClientRect();
    if (top > window.innerHeight) { const frame = requestAnimationFrame(() => setValue(from)); return () => cancelAnimationFrame(frame); }
  }, [reduce, from]);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(from, to, { duration, ease, onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration]);
  return <span ref={ref} className="tabular-nums">{format(value)}</span>;
}
