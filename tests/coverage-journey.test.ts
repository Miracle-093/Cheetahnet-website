import { beforeEach, describe, expect, it } from "vitest";
import { coverageJourneyQuery, loadCoverageJourney, saveCoverageJourney } from "@/lib/coverage-journey";
describe("coverage journey persistence",()=>{beforeEach(()=>sessionStorage.clear());it("preserves homepage coverage details",()=>{const value={area:"Central",street:"Market Road",packageId:"elite-pro"};saveCoverageJourney(value);expect(loadCoverageJourney()).toEqual(value);expect(coverageJourneyQuery(value)).toContain("package=elite-pro")})});
