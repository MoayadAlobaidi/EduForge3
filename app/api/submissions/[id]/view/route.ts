import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: submission, error } = await supabase
      .from('submissions')
      .select(`
        *,
        assignments(
          type,
          due_at,
          lessons(title, subjects(name))
        ),
        users!submissions_student_id_fkey(name, email)
      `)
      .eq('id', params.id)
      .single();

    if (error || !submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}