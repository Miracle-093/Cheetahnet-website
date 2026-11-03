import type { PackageId } from "@/lib/packages";

const KEY = "cheetahnet:selected-package";
export function savePackageSelection(id: PackageId) {
  if (typeof window !== "undefined") window.sessionStorage.setItem(KEY, id);
}
export function loadPackageSelection(): PackageId | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(KEY) as PackageId | null;
}
