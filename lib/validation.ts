import { z } from "zod";
import { packages } from "@/lib/packages";
export const installationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{9,18}$/, "Enter a valid phone number"),
  email: z.union([z.literal(""), z.email("Enter a valid email")]),
  customerType: z.enum(["home","business"]),
  location: z.string().trim().min(4, "Enter your exact location").max(200),
  landmark: z.string().trim().min(2, "Enter a nearby landmark").max(200),
  packageId: z.enum(packages.map((item) => item.id) as [string, ...string[]]),
  contactMethod: z.enum(["phone","email","whatsapp"]),
  notes: z.string().max(1000).optional().default(""),
  consent: z.literal("on", { error: "Consent is required" }),
  website: z.string().max(0).optional(),
});
export type InstallationInput = z.infer<typeof installationSchema>;
