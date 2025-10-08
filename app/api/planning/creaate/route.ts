import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const node = await prisma.curriculum_nodes.create({ data: { title: body.title, level: body.level, parent_id: body.parentId ?? null }});
  return NextResponse.json({ node });
}
