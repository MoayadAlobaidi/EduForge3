// create
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  const b = await req.json();
  const e = await prisma.event.create({
    data: {
      title: b.title,
      description: b.description ?? null,
      startsAt: new Date(b.startsAt),
      endsAt: new Date(b.endsAt),
      location: b.location ?? null,
      audience: b.audience ?? "ALL",
      createdBy: b.createdBy ?? "system"
    }
  });
  return NextResponse.json({ event: e });
}
