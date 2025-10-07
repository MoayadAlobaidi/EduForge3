import { NextRequest, NextResponse } from 'next/server';
import { runQAPipeline } from '@/lib/qa-pipeline';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await runQAPipeline(params.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error running QA pipeline:', error);
    return NextResponse.json(
      { error: 'Failed to run QA pipeline' },
      { status: 500 }
    );
  }
}