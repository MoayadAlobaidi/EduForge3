import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select(`
        *,
        groups(name, grade),
        subjects(name),
        lesson_plans(steps),
        assessments(items, answer_key, rubric)
      `)
      .eq('id', params.id)
      .single();

    if (error || !lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
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