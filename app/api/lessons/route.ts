import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const createLessonSchema = z.object({
  groupId: z.string(),
  subjectId: z.string(),
  title: z.string().min(1),
  standards: z.string(),
  durationMin: z.number().min(1),
  language: z.string().default('en'),
  createdBy: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createLessonSchema.parse(body);

    const lesson = await prisma.lesson.create({
      data,
      include: {
        group: true,
        subject: true,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const groupId = searchParams.get('groupId');
    const userRole = searchParams.get('userRole');

    let where: any = {};
    if (groupId) {
      where.groupId = groupId;
    }

    // Apply visibility filter for students/parents
    if (userRole === 'STUDENT' || userRole === 'PARENT') {
      where.status = 'PUBLISHED';
      where.qaStatus = 'PASS';
    }

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        group: true,
        subject: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}