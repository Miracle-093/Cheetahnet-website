import { NextResponse } from "next/server";
import { installationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return NextResponse.json({ ok:false, message:"Unsupported request format." }, { status:415 });
  const body = await request.json().catch(() => null);
  const result = installationSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ ok:false, message:"Please review the highlighted details.", issues:result.error.flatten().fieldErrors }, { status:400 });
  return NextResponse.json({ ok:true, reference:`CN-${crypto.randomUUID().slice(0,8).toUpperCase()}`, message:"Our engineering team has your details and will reach out shortly to confirm fibre proximity and schedule installation." });
}
