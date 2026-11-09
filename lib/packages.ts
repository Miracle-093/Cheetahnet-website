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
    description: "Reliable, truly unlimited fibre for everyday browsing, HD streaming and staying connected.",
    benefits: ["Symmetric upload & download", "Cheetah-Core router included", "No data caps — ever"],
    accent: "orange",
  },
  {
    id: "elite-pro",
    name: "Elite Pro",
    speedMbps: 50,
    priceUgx: 104_999,
    audience: "Connected households",
    description: "Fast, low-latency fibre for remote work, 4K streaming and active multi-device homes.",
    benefits: ["Ultra-low latency routing", "1 mesh extender included", "Priority technical support"],
    accent: "lime",
  },
  {
    id: "viva-ultra",
    name: "Viva Ultra",
    speedMbps: 120,
    priceUgx: 248_999,
    audience: "Creators & gamers",
    description: "Built for live streaming, large creative uploads and competitive low-ping gaming.",
    benefits: ["Multi-gig Ethernet port", "Static IP optional", "VIP engineer support"],
    accent: "orange",
  },
  {
    id: "viva-executive",
    name: "Viva Executive",
    speedMbps: 250,
    priceUgx: 399_000,
    audience: "Businesses & power users",
    description: "Our flagship tier for busy teams, offices and heavy cloud workflows.",
    benefits: ["250 Mbps symmetric throughput", "Dedicated VIP care experience", "Mesh & static IP ready"],
    accent: "lime",
  },
];

export const packageById = (id: string | null | undefined) =>
  packages.find((item) => item.id === id);

export const formatUgx = (value: number) => `UGX ${new Intl.NumberFormat("en-UG").format(value)}`;
