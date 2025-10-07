import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const createGroupSchema = z.object({
  orgId: z.string(),
  name: z.string().min(1),
  grade: z.string(),
  teacherId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createGroupSchema.parse(body);

    const group = await prisma.group.create({
      data,
      include: {
        teacher: true,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json(
      { error: 'Failed to create group' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('orgId');

    const groups = await prisma.group.findMany({
      where: orgId ? { orgId } : {},
      include: {
        teacher: true,
        _count: {
          select: {
            memberships: true,
            lessons: true,
          },
        },
      },
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch groups' },
      { status: 500 }
    );
  }
}