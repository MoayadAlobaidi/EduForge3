import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const books = await prisma.library_books?.findMany?.({ orderBy: { created_at: "desc" }, take: 100 }) ?? [];
  return NextResponse.json({ books });
}
