import { prisma } from './prisma';
import { QAStatus } from '@prisma/client';

interface QARule {
  name: string;
  status: 'PASS' | 'FLAG' | 'FAIL';
  reason?: string;
  fix?: string;
}

interface LessonSnapshot {
  id: string;
  title: string;
  standards: string;
  durationMin: number;
  plan?: any;
  outline?: any;
  assessment?: { items: any; answerKey: any };
}

async function buildLessonSnapshot(lessonId: string): Promise<LessonSnapshot> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      plan: true,
      outline: true,
      assessment: true,
    },
  });

  if (!lesson) throw new Error('Lesson not found');

  return {
    id: lesson.id,
    title: lesson.title,
    standards: lesson.standards,
    durationMin: lesson.durationMin,
    plan: lesson.plan ? lesson.plan.steps : undefined,
    outline: lesson.outline ? lesson.outline.slides : undefined,
    assessment: lesson.assessment ? {
      items: lesson.assessment.items,
      answerKey: lesson.assessment.answerKey,
    } : undefined,
  };
}

async function checkAlignment(snap: LessonSnapshot): Promise<QARule> {
  // Check if lesson content aligns with standards
  if (!snap.standards || snap.standards.trim().length === 0) {
    return {
      name: 'Standards Alignment',
      status: 'FAIL',
      reason: 'No standards specified',
      fix: 'Add relevant educational standards',
    };
  }
  
  if (!snap.plan || snap.plan.steps.length === 0) {
    return {
      name: 'Standards Alignment',
      status: 'FLAG',
      reason: 'No lesson plan to verify alignment',
      fix: 'Create a detailed lesson plan',
    };
  }

  return {
    name: 'Standards Alignment',
    status: 'PASS',
  };
}

async function checkSafety(snap: LessonSnapshot): Promise<QARule> {
  // Check for inappropriate content
  const content = [
    snap.title,
    snap.standards,
    ...(snap.plan?.steps?.map(s => s.content) || []),
    ...(snap.outline?.slides?.map(s => s.title + ' ' + s.bullets?.join(' ')) || []),
  ].join(' ').toLowerCase();

  const flaggedWords = ['inappropriate', 'unsafe', 'violent'];
  const hasFlaggedContent = flaggedWords.some(word => content.includes(word));

  if (hasFlaggedContent) {
    return {
      name: 'Content Safety',
      status: 'FAIL',
      reason: 'Content contains potentially inappropriate material',
      fix: 'Review and remove flagged content',
    };
  }

  return {
    name: 'Content Safety',
    status: 'PASS',
  };
}

async function checkReadability(snap: LessonSnapshot): Promise<QARule> {
  // Basic readability check
  if (snap.title.length < 5) {
    return {
      name: 'Readability',
      status: 'FLAG',
      reason: 'Title is too short',
      fix: 'Provide a more descriptive title',
    };
  }

  if (snap.durationMin < 10 || snap.durationMin > 180) {
    return {
      name: 'Readability',
      status: 'FLAG',
      reason: 'Duration seems unusual',
      fix: 'Verify lesson duration is appropriate',
    };
  }

  return {
    name: 'Readability',
    status: 'PASS',
  };
}

async function checkOriginality(snap: LessonSnapshot): Promise<QARule> {
  // Simple originality check - in production would check against database/external sources
  if (snap.title.toLowerCase().includes('test lesson')) {
    return {
      name: 'Originality',
      status: 'FLAG',
      reason: 'Title appears to be a placeholder',
      fix: 'Provide an original, descriptive title',
    };
  }

  return {
    name: 'Originality',
    status: 'PASS',
  };
}

export async function runQAPipeline(lessonId: string) {
  // Update status to running
  await prisma.lesson.update({
    where: { id: lessonId },
    data: { qaStatus: 'RUNNING' },
  });

  const snap = await buildLessonSnapshot(lessonId);
  const rules = [
    await checkAlignment(snap),
    await checkSafety(snap),
    await checkReadability(snap),
    await checkOriginality(snap),
  ];

  const status: QAStatus = rules.every(r => r.status === 'PASS') ? 'PASS'
    : rules.some(r => r.status === 'FAIL') ? 'FAIL' : 'FLAG';

  // Save QA report
  await prisma.qAReport.create({
    data: {
      lessonId,
      status,
      rules: rules,
    },
  });

  // Update lesson QA status
  await prisma.lesson.update({
    where: { id: lessonId },
    data: { qaStatus: status },
  });

  return { status, rules };
}