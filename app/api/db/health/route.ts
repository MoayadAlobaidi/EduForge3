import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const r = await prisma.$queryRaw<any>`select now() as now`;
    return NextResponse.json({ ok: true, now: r?.[0]?.now });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}
