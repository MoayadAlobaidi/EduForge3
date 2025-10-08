import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const node = await prisma.curriculum_nodes.findUnique({ where: { id: params.id }});
  // simple: store attached book ids in tags jsonb => { bookIds: [] }
  const attachedBooks = Array.isArray(node?.tags?.bookIds) ? node?.tags.bookIds : [];
  return NextResponse.json({ node, attachedBooks });
}
