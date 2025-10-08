import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_: Request, { params }: { params: { id: string }}) {
  // stub: create 2 child nodes
  const parent = await prisma.curriculum_nodes.findUnique({ where: { id: params.id }});
  if (!parent) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const a = await prisma.curriculum_nodes.create({ data: { title: parent.title + " – Part A", level: "WEEK", parent_id: parent.id }});
  const b = await prisma.curriculum_nodes.create({ data: { title: parent.title + " – Part B", level: "WEEK", parent_id: parent.id }});
  return NextResponse.json({ created: [a.id, b.id] });
}
