export type CoverageState = "available" | "unavailable" | "manual_verification";
export type CoverageRecord = { state: CoverageState; packageIds?: string[] };
export interface CoverageProvider { check(input: { area:string; street:string; landmark:string }): Promise<CoverageRecord>; }

// Safe default until an approved coverage data source is connected.
export const demoCoverageProvider: CoverageProvider = {
  async check() { return { state: "manual_verification" }; },
};
