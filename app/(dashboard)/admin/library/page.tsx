'use client';

import { useEffect, useState } from "react";

type Book = { id: string; title: string|null; author: string|null; status: string; created_at: string };

export default function AdminLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const [file, setFile] = useState<File|null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const r = await fetch("/api/library/list");
    const j = await r.json(); setBooks(j.books || []);
  };
  useEffect(() => { load(); }, []);

  const upload = async () => {
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", file.name);
    const r = await fetch("/api/library/upload", { method: "POST", body: fd });
    await r.json();
    setLoading(false);
    await load();
  };

  const ingest = async (id: string) => {
    setLoading(true);
    await fetch(`/api/library/${id}/ingest`, { method: "POST" });
    setLoading(false);
    await load();
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Library</h1>

      <div className="border rounded p-4 flex items-center gap-3">
        <input type="file" accept=".pdf,.epub" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button className="border rounded px-3 py-1" onClick={upload} disabled={!file || loading}>{loading ? "Working..." : "Upload"}</button>
      </div>

      <div className="space-y-2">
        {books.map(b => (
          <div key={b.id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{b.title ?? "Untitled"}</div>
              <div className="text-xs opacity-70">{b.status} • {new Date(b.created_at).toLocaleString()}</div>
            </div>
            <div className="flex gap-2">
              <a className="border rounded px-3 py-1" href={`/admin/library/${b.id}`}>View</a>
              <button className="border rounded px-3 py-1" onClick={() => ingest(b.id)}>Ingest</button>
            </div>
          </div>
        ))}
        {books.length === 0 && <div className="text-sm opacity-70">No books yet.</div>}
      </div>
    </main>
  );
}
