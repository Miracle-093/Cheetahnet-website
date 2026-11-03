import { packages, type InternetPackage } from "@/lib/packages";

export type Usage = "everyday" | "work" | "creator" | "gaming" | "business";
export type RecommendationInput = {
  usage: Usage;
  devices: number;
  customerType: "home" | "business";
  needs: Array<"gaming" | "calls" | "uploads" | "streaming">;
};

export type Recommendation = {
  primary: InternetPackage;
  alternative: InternetPackage;
  reason: string;
};

export function recommendPlan(input: RecommendationInput): Recommendation {
  let score = input.devices <= 3 ? 0 : input.devices <= 8 ? 1 : input.devices <= 15 ? 2 : 3;
  if (["creator", "gaming"].includes(input.usage)) score = Math.max(score, 2);
  if (input.usage === "business" || input.customerType === "business") score = Math.max(score, 2);
  if (input.needs.filter((need) => ["uploads", "streaming", "gaming"].includes(need)).length >= 2) {
    score = Math.min(3, score + 1);
  }

  const primary = packages[score];
  const alternative = packages[Math.max(0, score - 1)] === primary
    ? packages[Math.min(3, score + 1)]
    : packages[Math.max(0, score - 1)];

  const reasons = [
    `${input.devices} regularly connected ${input.devices === 1 ? "device" : "devices"}`,
    input.customerType === "business" ? "a business connection" : "a home connection",
    input.needs.length ? `priority support for ${input.needs.join(", ")}` : `${input.usage} use`,
  ];

  return { primary, alternative, reason: `A practical starting point for ${reasons.join(" and ")}.` };
}
