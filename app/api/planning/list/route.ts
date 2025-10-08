import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const nodes = await prisma.curriculum_nodes?.findMany?.({ orderBy: { created_at: "desc" }, take: 200 }) ?? [];
  return NextResponse.json({ nodes });
}
