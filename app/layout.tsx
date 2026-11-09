import type { Metadata, Viewport } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

// Outfit is the typeface already used on cheetahnet.co.ug, so the redesign stays on-brand.
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cheetahnet-staging.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "CheetahNet | Unlimited Fibre Internet in Uganda", template: "%s | CheetahNet" },
  description: "Experience symmetric, uncapped fibre internet for homes, creators, gamers and businesses in Uganda — from UGX 75,000/month with same-day installation.",
  alternates: { canonical: "/" },
  openGraph: { title: "CheetahNet Fibre Internet", description: "Uncapped symmetric fibre internet starting from UGX 75,000 per month.", type: "website", url: "/" },
};

export const viewport: Viewport = { themeColor: "#090806" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${mono.variable}`}>
      <body><MotionProvider><ScrollProgress /><Header />{children}<Footer /><WhatsAppButton /></MotionProvider></body>
    </html>
  );
}
