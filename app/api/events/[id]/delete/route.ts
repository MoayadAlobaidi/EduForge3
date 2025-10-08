// delete
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(_: Request, { params }: { params: { id: string } }) {
  await prisma.event.delete({ where: { id: params.id }});
  return NextResponse.json({ ok: true });
}
