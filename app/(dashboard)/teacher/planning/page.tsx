'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type Node = { id: string; title: string; level: string; parent_id: string|null };

export default function Planning() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("YEAR");
  const [parentId, setParentId] = useState<string>("");

  const load = async () => {
    const r = await fetch("/api/planning/list");
    const j = await r.json();
    setNodes(j.nodes || []);
  };
  useEffect(() => { load(); }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Planning</h1>

      <div className="border rounded p-3 flex gap-2">
        <input className="border px-2 py-1 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <select className="border px-2 py-1 rounded" value={level} onChange={e=>setLevel(e.target.value)}>
          {["YEAR","SEMESTER","MONTH","WEEK","DAY"].map(l=> <option key={l}>{l}</option>)}
        </select>
        <input className="border px-2 py-1 rounded" placeholder="Parent ID (optional)" value={parentId} onChange={e=>setParentId(e.target.value)} />
        <button
          className="border rounded px-3 py-1"
          onClick={async () => {
            await fetch("/api/planning/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, level, parentId: parentId || null }) });
            setTitle(""); setParentId(""); await load();
          }}
        >Add</button>
      </div>

      <div className="space-y-2">
        {nodes.map(n => (
          <div key={n.id} className="border rounded p-3 flex items-center justify-between">
            <div><div className="font-medium">{n.title}</div><div className="text-xs opacity-70">{n.level}</div></div>
            <Link className="border rounded px-3 py-1" href={`/teacher/planning/${n.id}`}>Open</Link>
          </div>
        ))}
        {nodes.length===0 && <div className="text-sm opacity-70">No nodes yet.</div>}
      </div>
    </main>
  );
}
