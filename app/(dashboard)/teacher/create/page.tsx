'use client';

import { useState } from "react";

export default function TeacherCreate() {
  const [provider, setProvider] = useState("openai");
  const [prompt, setPrompt] = useState("Generate a deck about...");
  const [groupId, setGroupId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const r = await fetch("/api/ai/presentation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, prompt, groupId, subjectId }),
    });
    const j = await r.json();
    setLoading(false);
    if (j.lessonId) location.href = `/teacher/lessons/${j.lessonId}`;
    else alert(j.error || "Generation failed");
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create via AI</h1>
      <div className="grid gap-3 max-w-xl">
        <select className="border px-2 py-1 rounded" value={provider} onChange={e=>setProvider(e.target.value)}>
          <option value="openai">OpenAI</option>
          <option value="cohere">Cohere</option>
        </select>
        <textarea className="border rounded p-2" rows={6} value={prompt} onChange={e=>setPrompt(e.target.value)} />
        <input className="border px-2 py-1 rounded" placeholder="Group ID" value={groupId} onChange={e=>setGroupId(e.target.value)} />
        <input className="border px-2 py-1 rounded" placeholder="Subject ID" value={subjectId} onChange={e=>setSubjectId(e.target.value)} />
        <button className="border rounded px-3 py-1" onClick={submit} disabled={loading}>{loading ? "Generating..." : "Generate"}</button>
      </div>
    </main>
  );
}
