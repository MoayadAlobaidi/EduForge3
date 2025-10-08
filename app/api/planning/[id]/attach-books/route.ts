import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const body = await req.json();
  const bookIds = body.bookIds ?? [];
  const node = await prisma.curriculum_nodes.update({
    where: { id: params.id },
    data: { tags: { bookIds } as any }
  });
  return NextResponse.json({ node });
}
