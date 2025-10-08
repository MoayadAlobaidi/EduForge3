'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PlanningNode() {
  const { id } = useParams() as { id: string };
  const [node, setNode] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [attached, setAttached] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    (async () => {
      const r1 = await fetch(`/api/planning/${id}/show`);
      const j1 = await r1.json();
      setNode(j1.node); setAttached(j1.attachedBooks || []);
      const r2 = await fetch("/api/library/list");
      const j2 = await r2.json(); setBooks(j2.books || []);
    })();
  }, [id]);

  const toggleBook = (bid: string) => {
    setAttached(prev => prev.includes(bid) ? prev.filter(x=>x!==bid) : [...prev, bid]);
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{node?.title ?? "Node"}</h1>
      <div className="text-sm opacity-70">{node?.level}</div>

      <div className="border rounded p-3">
        <h2 className="font-medium mb-2">Attach Books</h2>
        <div className="space-y-1">
          {books.map((b:any) => (
            <label key={b.id} className="flex items-center gap-2">
              <input type="checkbox" checked={attached.includes(b.id)} onChange={()=>toggleBook(b.id)} />
              <span>{b.title}</span>
            </label>
          ))}
        </div>
        <button
          className="mt-3 border rounded px-3 py-1"
          onClick={async () => {
            await fetch(`/api/planning/${id}/attach-books`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bookIds: attached }) });
            alert("Saved");
          }}
        >Save</button>
      </div>

      <button
        className="border rounded px-3 py-1"
        onClick={async () => { setGenerating(true); await fetch(`/api/planning/${id}/generate`, { method: "POST" }); setGenerating(false); alert("Generated children (stub)."); }}
        disabled={generating}
      >
        {generating ? "Generating..." : "Generate Children (stub)"}
      </button>
    </main>
  );
}
