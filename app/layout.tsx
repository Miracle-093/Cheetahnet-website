import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cheetahnet-staging.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "CheetahNet | Fibre internet that moves", template: "%s | CheetahNet" },
  description: "Explore CheetahNet fibre internet packages for homes, creators, gamers and businesses in Uganda.",
  alternates: { canonical: "/" },
  openGraph: { title: "CheetahNet Fibre Internet", description: "Fibre internet packages starting from UGX 75,000 per month.", type: "website", url: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><Header />{children}<Footer /></body>
    </html>
  );
}
