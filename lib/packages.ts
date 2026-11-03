export type PackageId = "essentials" | "elite-pro" | "viva-ultra" | "viva-executive";

export type InternetPackage = {
  id: PackageId;
  name: string;
  speedMbps: number;
  priceUgx: number;
  audience: string;
  description: string;
  benefits: string[];
  accent: "orange" | "lime";
};

export const packages: InternetPackage[] = [
  {
    id: "essentials",
    name: "Essentials",
    speedMbps: 15,
    priceUgx: 75_000,
    audience: "Everyday homes",
    description: "A considered starting point for browsing, streaming and staying connected.",
    benefits: ["Everyday browsing", "Social and messaging", "Light streaming"],
    accent: "orange",
  },
  {
    id: "elite-pro",
    name: "Elite Pro",
    speedMbps: 50,
    priceUgx: 104_999,
    audience: "Connected households",
    description: "More room for shared streaming, remote work and active households.",
    benefits: ["Multiple connected devices", "Video calls", "HD streaming"],
    accent: "lime",
  },
  {
    id: "viva-ultra",
    name: "Viva Ultra",
    speedMbps: 120,
    priceUgx: 248_999,
    audience: "Creators & gamers",
    description: "Built for heavier streaming, uploads and demanding connected routines.",
    benefits: ["Heavy streaming", "Large uploads", "Gaming households"],
    accent: "orange",
  },
  {
    id: "viva-executive",
    name: "Viva Executive",
    speedMbps: 250,
    priceUgx: 399_000,
    audience: "Businesses & power users",
    description: "The highest provisional tier for teams and bandwidth-intensive use.",
    benefits: ["Busy teams", "Many devices", "High-demand workflows"],
    accent: "lime",
  },
];

export const packageById = (id: string | null | undefined) =>
  packages.find((item) => item.id === id);

export const formatUgx = (value: number) => `UGX ${new Intl.NumberFormat("en-UG").format(value)}`;
