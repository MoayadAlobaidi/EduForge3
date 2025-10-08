'use client';

import { useEffect, useState } from "react";

type Log = { id: string; action: string; level: string; actor: string|null; entity: string|null; details: any; created_at: string };

export default function AdminLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/logs");
        const data = await res.json();
        setLogs(data.logs || []);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Audit Logs</h1>
      {loading ? "Loading..." : (
        <div className="space-y-2">
          {logs.map(l => (
            <div key={l.id} className="border rounded p-3 text-sm">
              <div className="font-medium">{l.action} <span className="ml-2 text-xs opacity-70">[{l.level}]</span></div>
              <div className="text-xs opacity-70">{new Date(l.created_at).toLocaleString()} • {l.actor ?? "system"} • {l.entity ?? "-"}</div>
              <pre className="mt-2 bg-gray-50 p-2 rounded overflow-auto">{JSON.stringify(l.details, null, 2)}</pre>
            </div>
          ))}
          {logs.length === 0 && <div className="text-sm opacity-70">No logs yet.</div>}
        </div>
      )}
    </main>
  );
}
