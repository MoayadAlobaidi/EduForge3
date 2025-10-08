'use client';
import { useEffect, useState } from "react";

type Event = { id:string; title:string; startsAt:string; endsAt:string; location?:string|null; audience:string };

export default function AdminCalendar(){
  const [events,setEvents]=useState<Event[]>([]);
  const [form,setForm]=useState<any>({ title:"", startsAt:"", endsAt:"", location:"", audience:"ALL" });
  const load=async()=>{ const r=await fetch("/api/events/list"); const j=await r.json(); setEvents(j.events||[]); };
  useEffect(()=>{ load(); },[]);
  const create=async()=>{ await fetch("/api/events/create",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); setForm({ title:"", startsAt:"", endsAt:"", location:"", audience:"ALL" }); load(); };
  const del=async(id:string)=>{ await fetch(`/api/events/${id}/delete`,{method:"POST"}); load(); };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">School Calendar (Admin)</h1>

      <div className="border rounded p-4 grid md:grid-cols-5 gap-2">
        <input className="border px-2 py-1 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <input className="border px-2 py-1 rounded" type="datetime-local" value={form.startsAt} onChange={e=>setForm({...form,startsAt:e.target.value})}/>
        <input className="border px-2 py-1 rounded" type="datetime-local" value={form.endsAt} onChange={e=>setForm({...form,endsAt:e.target.value})}/>
        <input className="border px-2 py-1 rounded" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <select className="border px-2 py-1 rounded" value={form.audience} onChange={e=>setForm({...form,audience:e.target.value})}>
          {["ALL","TEACHERS","STUDENTS","PARENTS"].map(x=><option key={x}>{x}</option>)}
        </select>
        <button className="border rounded px-3 py-1 md:col-span-5" onClick={create}>Add Event</button>
      </div>

      <div className="space-y-2">
        {events.map(ev=>(
          <div key={ev.id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{ev.title}</div>
              <div className="text-xs opacity-70">
                {new Date(ev.startsAt).toLocaleString()} → {new Date(ev.endsAt).toLocaleString()} • {ev.location||"-"} • {ev.audience}
              </div>
            </div>
            <button className="border rounded px-3 py-1" onClick={()=>del(ev.id)}>Delete</button>
          </div>
        ))}
        {events.length===0 && <div className="text-sm opacity-70">No events yet.</div>}
      </div>
    </main>
  );
}
