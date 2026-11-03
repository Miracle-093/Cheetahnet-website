import { beforeEach,describe,expect,it } from "vitest"; import { loadPackageSelection,savePackageSelection } from "@/lib/package-selection";
describe("package selection",()=>{beforeEach(()=>sessionStorage.clear());it("persists selection for the journey",()=>{savePackageSelection("viva-ultra");expect(loadPackageSelection()).toBe("viva-ultra")})});
