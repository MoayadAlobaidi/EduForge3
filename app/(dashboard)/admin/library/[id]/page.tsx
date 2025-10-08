'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Chunk = { id: string; seq: number; page_from: number|null; page_to: number|null; text: string };

export default function AdminLibraryShow() {
  const params = useParams() as { id: string };
  const [meta, setMeta] = useState<any>(null);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await fetch(`/api/library/${params.id}/show`);
      const j = await r.json();
      setMeta(j.book); setChunks(j.chunks || []); setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <main className="p-6">Loading...</main>;

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{meta?.title ?? "Book"}</h1>
      <div className="text-sm opacity-70">Status: {meta?.status}</div>
      <button
        className="border rounded px-3 py-1"
        onClick={async () => { await fetch(`/api/library/${params.id}/ingest`, { method: "POST" }); location.reload(); }}
      >
        Re-ingest
      </button>

      <div className="border rounded p-3">
        <h2 className="font-medium mb-2">Chunks ({chunks.length})</h2>
        <div className="space-y-2 max-h-[60vh] overflow-auto">
          {chunks.map(c => (
            <div key={c.id} className="border rounded p-2">
              <div className="text-xs opacity-70">#{c.seq} • p.{c.page_from}-{c.page_to}</div>
              <div className="mt-1 text-sm whitespace-pre-wrap">{c.text.slice(0, 600)}</div>
            </div>
          ))}
          {chunks.length === 0 && <div className="text-sm opacity-70">No chunks yet.</div>}
        </div>
      </div>
    </main>
  );
}
