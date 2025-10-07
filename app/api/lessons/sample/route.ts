import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Get demo organization and users
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .eq('name', 'Demo School District')
      .single();

    if (orgError || !org) {
      return NextResponse.json({ error: 'Demo organization not found' }, { status: 400 });
    }

    const { data: teacher } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'teacher@school.edu')
      .single();

    if (!teacher) {
      return NextResponse.json({ error: 'Demo teacher not found' }, { status: 400 });
    }

    const { data: groups } = await supabase
      .from('groups')
      .select('id, name')
      .eq('org_id', org.id);

    const { data: subjects } = await supabase
      .from('subjects')
      .select('id, name')
      .eq('org_id', org.id);

    if (!groups?.length || !subjects?.length) {
      return NextResponse.json({ error: 'Missing groups or subjects' }, { status: 400 });
    }

    // Create sample lessons with full content
    const sampleLessons = [
      {
        group_id: groups.find(g => g.name.includes('Mathematics'))?.id,
        subject_id: subjects.find(s => s.name === 'Mathematics')?.id,
        title: 'Introduction to Quadratic Equations',
        standards: 'CCSS.MATH.CONTENT.HSA.REI.B.4',
        duration_min: 50,
        status: 'PUBLISHED',
        qa_status: 'PASS',
        created_by: teacher.id,
      },
      {
        group_id: groups.find(g => g.name.includes('Science'))?.id,
        subject_id: subjects.find(s => s.name === 'Science')?.id,
        title: 'Photosynthesis and Cellular Respiration',
        standards: 'NGSS.HS-LS1-5',
        duration_min: 45,
        status: 'PUBLISHED',
        qa_status: 'PASS',
        created_by: teacher.id,
      },
      {
        group_id: groups.find(g => g.name.includes('Mathematics'))?.id,
        subject_id: subjects.find(s => s.name === 'Mathematics')?.id,
        title: 'Solving Linear Systems',
        standards: 'CCSS.MATH.CONTENT.HSA.REI.C.6',
        duration_min: 40,
        status: 'DRAFT',
        qa_status: 'NOT_RUN',
        created_by: teacher.id,
      }
    ];

    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .insert(sampleLessons)
      .select();

    if (lessonsError) throw lessonsError;

    // Create lesson plans
    const lessonPlans = [
      {
        lesson_id: lessons[0].id,
        steps: [
          { time: 5, type: 'warmup', content: 'Review linear equations and graphing' },
          { time: 15, type: 'instruction', content: 'Introduce quadratic equations and their standard form ax² + bx + c = 0' },
          { time: 20, type: 'practice', content: 'Guided practice solving quadratic equations using factoring method' },
          { time: 8, type: 'activity', content: 'Students work in pairs to solve practice problems' },
          { time: 2, type: 'closure', content: 'Exit ticket: Solve one quadratic equation independently' }
        ]
      },
      {
        lesson_id: lessons[1].id,
        steps: [
          { time: 8, type: 'warmup', content: 'Quick review of plant cell structure' },
          { time: 18, type: 'instruction', content: 'Explain photosynthesis process and chemical equation' },
          { time: 15, type: 'activity', content: 'Lab activity: Observe leaf cells under microscope' },
          { time: 4, type: 'closure', content: 'Discuss observations and connection to cellular respiration' }
        ]
      }
    ];

    await supabase.from('lesson_plans').insert(lessonPlans);

    // Create assessments
    const assessments = [
      {
        lesson_id: lessons[0].id,
        items: [
          {
            type: 'multiple_choice',
            question: 'Which of the following is a quadratic equation?',
            options: ['2x + 5 = 0', 'x² + 3x - 4 = 0', '3x³ + 2x = 1', 'x + y = 5'],
            correct: 1
          },
          {
            type: 'short_answer',
            question: 'Solve the quadratic equation: x² - 5x + 6 = 0',
            answer: 'x = 2 or x = 3'
          }
        ],
        answer_key: [
          { question: 1, answer: 'x² + 3x - 4 = 0', points: 5 },
          { question: 2, answer: 'x = 2 or x = 3', points: 10 }
        ],
        rubric: {
          total_points: 15,
          grading_scale: { A: 14, B: 12, C: 10, D: 8 }
        }
      }
    ];

    await supabase.from('assessments').insert(assessments);

    // Create assignments
    const assignments = [
      {
        lesson_id: lessons[0].id,
        group_id: groups.find(g => g.name.includes('Mathematics'))?.id,
        type: 'QUIZ',
        due_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      },
      {
        lesson_id: lessons[1].id,
        group_id: groups.find(g => g.name.includes('Science'))?.id,
        type: 'WORKSHEET',
        due_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
      }
    ];

    const { data: createdAssignments } = await supabase
      .from('assignments')
      .insert(assignments)
      .select();

    if (!createdAssignments || createdAssignments.length === 0) {
      return NextResponse.json({ error: 'Failed to create assignments' }, { status: 500 });
    }

    // Create sample submissions
    const { data: student } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'student@school.edu')
      .single();

    if (!student) {
      return NextResponse.json({ error: 'Demo student not found' }, { status: 400 });
    }

    const submissions = [
      {
        assignment_id: createdAssignments[0].id,
        student_id: student.id,
        answers: JSON.stringify({
          q1: 'x² + 3x - 4 = 0',
          q2: 'x = 2 or x = 3'
        }),
        score: 14,
        feedback: 'Excellent work! You correctly identified the quadratic equation and solved it perfectly.',
        status: 'GRADED',
        graded_at: new Date().toISOString(),
        grader_id: teacher.id
      }
    ];

    await supabase.from('submissions').insert(submissions);

    return NextResponse.json({ 
      message: 'Sample lessons created successfully',
      lessons: lessons.length,
      assignments: createdAssignments.length
    });

  } catch (error) {
    console.error('Error creating sample lessons:', error);
    return NextResponse.json(
      { error: 'Failed to create sample lessons' },
      { status: 500 }
    );
  }
}