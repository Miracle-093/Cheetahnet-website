import { NextResponse } from "next/server";
import { installationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return NextResponse.json({ ok:false, message:"Unsupported request format." }, { status:415 });
  const body = await request.json().catch(() => null);
  const result = installationSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ ok:false, message:"Please review the highlighted details.", issues:result.error.flatten().fieldErrors }, { status:400 });
  // Demo adapter boundary: replace with an approved CRM/database implementation.
  return NextResponse.json({ ok:true, reference:`DEMO-${crypto.randomUUID().slice(0,8).toUpperCase()}`, message:"Request captured in safe demo mode. No production record was created." });
}
