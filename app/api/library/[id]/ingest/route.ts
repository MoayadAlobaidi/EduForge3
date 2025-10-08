import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

// stub: we won't actually parse PDF here, we’ll fake a few chunks so UI works
export async function POST(_: Request, { params }: { params: { id: string }}) {
  const book = await prisma.library_books.findUnique({ where: { id: params.id }});
  if (!book) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  // clear old chunks
  try { await prisma.book_chunks.deleteMany({ where: { book_id: book.id } }); } catch {}

  const fake = [
    { seq: 1, text: "Intro…", page_from: 1, page_to: 2 },
    { seq: 2, text: "Main content…", page_from: 3, page_to: 8 },
    { seq: 3, text: "Summary…", page_from: 9, page_to: 10 },
  ];
  for (const f of fake) {
    await prisma.book_chunks.create({ data: { book_id: book.id, seq: f.seq, text: f.text, tokens: f.text.length, page_from: f.page_from, page_to: f.page_to } });
  }
  await prisma.library_books.update({ where: { id: book.id }, data: { status: "INGESTED", pages: 10 }});
  return NextResponse.json({ created: fake.length });
}
