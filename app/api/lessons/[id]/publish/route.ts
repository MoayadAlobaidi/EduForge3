import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: params.id },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    if (lesson.qaStatus !== 'PASS') {
      return NextResponse.json(
        { error: 'QA must pass before publishing' },
        { status: 409 }
      );
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id: params.id },
      data: { status: 'PUBLISHED' },
    });

    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error('Error publishing lesson:', error);
    return NextResponse.json(
      { error: 'Failed to publish lesson' },
      { status: 500 }
    );
  }
}