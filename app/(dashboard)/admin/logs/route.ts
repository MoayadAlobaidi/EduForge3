import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const logs = await prisma.audit_logs.findMany({
    orderBy: { created_at: "desc" },
    take: 200
  });
  return NextResponse.json({ logs });
}
