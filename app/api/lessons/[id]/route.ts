import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ensurePublicVisibility } from '@/lib/auth';

const updateLessonSchema = z.object({
  title: z.string().optional(),
  standards: z.string().optional(),
  durationMin: z.number().optional(),
  language: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userRole = searchParams.get('userRole');

    const lesson = await prisma.lesson.findUnique({
      where: { id: params.id },
      include: {
        group: true,
        subject: true,
        plan: true,
        outline: true,
        assessment: true,
        qaReports: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Apply visibility check
    try {
      ensurePublicVisibility(lesson, userRole || '');
    } catch (error) {
      return NextResponse.json(
        { error: 'Content not available' },
        { status: 403 }
      );
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data = updateLessonSchema.parse(body);

    const lesson = await prisma.lesson.update({
      where: { id: params.id },
      data: {
        ...data,
        updatedAt: new Date(),
        // Reset QA status when lesson is modified
        qaStatus: 'NOT_RUN',
      },
      include: {
        group: true,
        subject: true,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error updating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500 }
    );
  }
}