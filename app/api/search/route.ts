import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  if (!q) return NextResponse.json({ results: [] });

  // fallback: naive LIKE over chunks so it compiles (replace with tsvector later)
  const results = await prisma.bookChunks.findMany({
    where: { text: { contains: q, mode: "insensitive" } },
    orderBy: { seq: "asc" },
    take: 20,
    select: { id: true, book_id: true, seq: true, text: true, page_from: true, page_to: true }
  });

  const mapped = results.map((r: { book_id: any; page_from: any; page_to: any; text: string | any[]; }) => ({
    bookId: r.book_id,
    pageFrom: r.page_from,
    pageTo: r.page_to,
    textSnippet: r.text.slice(0, 240),
    score: 1
  }));
  return NextResponse.json({ results: mapped });
}
