import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const book = await prisma.library_books.findUnique({ where: { id: params.id }});
  const chunks = await prisma.book_chunks.findMany({ where: { book_id: params.id }, orderBy: { seq: "asc" }, take: 500 });
  return NextResponse.json({ book, chunks });
}
