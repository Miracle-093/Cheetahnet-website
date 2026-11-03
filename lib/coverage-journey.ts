export type CoverageJourney = { area: string; street: string; packageId: string };
const KEY = "cheetahnet:coverage-journey";

export function saveCoverageJourney(value: CoverageJourney) {
  if (typeof window !== "undefined") window.sessionStorage.setItem(KEY, JSON.stringify(value));
}

export function loadCoverageJourney(): CoverageJourney | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(window.sessionStorage.getItem(KEY) || "null") as CoverageJourney | null; }
  catch { return null; }
}

export function coverageJourneyQuery(value: CoverageJourney) {
  const query = new URLSearchParams();
  if (value.area) query.set("area", value.area);
  if (value.street) query.set("street", value.street);
  if (value.packageId) query.set("package", value.packageId);
  return query.toString();
}
