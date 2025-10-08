'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function QAReportPage() {
  const { lessonId } = useParams() as { lessonId: string };
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const r = await fetch(`/api/lessons/${lessonId}/qa`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ framework: "uae-moe" }) });
    const j = await r.json();
    setReport(j); setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">QA Report</h1>
      {loading ? "Running QA..." : (
        <div className="space-y-2">
          <div className="text-sm">Status: <b>{report?.status}</b></div>
          <div className="space-y-2">
            {(report?.rules || []).map((r:any, i:number) => (
              <div key={i} className="border rounded p-2">
                <div className="font-medium">{r.name} — {r.status}</div>
                {r.reason && <div className="text-sm opacity-80">Reason: {r.reason}</div>}
                {r.fix && <div className="text-sm opacity-80">Fix: {r.fix}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
