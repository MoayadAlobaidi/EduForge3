import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
// import { presentationAI } from "@/lib/ai"; // later

export async function POST(req: Request) {
  const body = await req.json();
  const { provider, prompt, groupId, subjectId } = body;

  // stub: create a lesson with minimal plan/outline/assessment
  const lesson = await prisma.lesson.create({
    data: {
      title: prompt?.slice(0, 120) || "AI Deck",
      standards: "TBD",
      duration_min: 45,
      language: "en",
      status: "DRAFT",
      qa_status: "NOT_RUN",
      groupId, subjectId,
      createdBy: "system",
      plan: { create: { steps: [{ time: 5, type: "intro", content: "Welcome" }] as any } },
      outline: { create: { slides: [{ title: "Slide 1", bullets: ["Point A","Point B"], notes: "" }] as any } },
      assessment: { create: { items: [{ type: "poll", q: "Check-in?" }], answerKey: {}, rubric: {} } },
    } as any,
    include: { plan: true, outline: true, assessment: true }
  });

  await audit("AI_PRESENTATION_CREATED", { provider, promptLen: (prompt||"").length }, "INFO", "system", `lesson:${lesson.id}`);
  return NextResponse.json({ lessonId: lesson.id });
}
