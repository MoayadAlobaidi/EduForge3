// list
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const where:any = {};
  if (from) where.startsAt = { gte: new Date(from) };
  if (to) where.endsAt = { lte: new Date(to) };
  const events = await prisma.event.findMany({ where, orderBy: { startsAt: "asc" }, take: 500 });
  return NextResponse.json({ events });
}
