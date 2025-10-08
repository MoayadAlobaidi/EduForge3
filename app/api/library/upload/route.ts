import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

export async function POST(req: Request) {
  const fd = await req.formData();
  const file = fd.get("file") as File | null;
  const title = (fd.get("title") as string) || (file?.name ?? "Untitled");
  if (!file) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });

  // minimal: single org demo
  const orgId = (await prisma.organization.findFirst())?.id ?? null;
  const book = await prisma.library_books.create({ data: { title, org_id: orgId, status: "UPLOADED" } });

  const path = `books/${orgId ?? "demo"}/${book.id}/${file.name}`;
  const array = Buffer.from(await file.arrayBuffer());
  await supabase.storage.from("books").upload(path, array, { upsert: true, contentType: file.type || "application/octet-stream" });

  await prisma.library_books.update({ where: { id: book.id }, data: { source_path: path, mime: file.type || "application/octet-stream" } });
  return NextResponse.json({ id: book.id, status: "UPLOADED" });
}
