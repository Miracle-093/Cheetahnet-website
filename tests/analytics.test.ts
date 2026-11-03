import { describe,expect,it,vi } from "vitest"; import { setAnalyticsProvider,track } from "@/lib/analytics";
describe("analytics adapter",()=>{it("forwards typed events to an installed provider",()=>{const provider=vi.fn();setAnalyticsProvider(provider);track("plan_compared",{count:2});expect(provider).toHaveBeenCalledWith("plan_compared",{count:2});setAnalyticsProvider(null)})});
