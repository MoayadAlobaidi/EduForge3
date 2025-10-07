/*
  # Seed Demo Data

  1. Demo Organization
    - Demo School District

  2. Demo Users
    - Admin: admin@school.edu
    - Teacher: teacher@school.edu  
    - Student: student@school.edu
    - Parent: parent@school.edu

  3. Demo Subjects and Groups
    - Mathematics, Science, History, English
    - Grade 8 Mathematics, Grade 9 Science groups

  4. Demo Lessons and Content
    - Sample lessons with QA status
*/

-- Insert demo organization
INSERT INTO organizations (id, name, locale) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Demo School District', 'en')
ON CONFLICT (id) DO NOTHING;

-- Insert demo users
INSERT INTO users (id, email, name, role, org_id) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'admin@school.edu', 'Sarah Admin', 'ADMIN', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440002', 'teacher@school.edu', 'John Teacher', 'TEACHER', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440003', 'student@school.edu', 'Emma Student', 'STUDENT', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440004', 'parent@school.edu', 'Mike Parent', 'PARENT', '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT (email) DO NOTHING;

-- Insert demo subjects
INSERT INTO subjects (id, org_id, name) VALUES 
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'Mathematics'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 'Science'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 'History'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440000', 'English')
ON CONFLICT (id) DO NOTHING;

-- Insert demo groups
INSERT INTO groups (id, org_id, name, grade, teacher_id) VALUES 
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', 'Grade 8 Mathematics', '8', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'Grade 9 Science', '9', '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (id) DO NOTHING;

-- Insert demo memberships (student in groups)
INSERT INTO memberships (id, group_id, user_id) VALUES 
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440003')
ON CONFLICT (group_id, user_id) DO NOTHING;

-- Insert demo lessons
INSERT INTO lessons (id, group_id, subject_id, title, standards, duration_min, status, qa_status, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'Introduction to Algebra', 'CCSS.MATH.CONTENT.8.EE.A.1', 45, 'PUBLISHED', 'PASS', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440011', 'Cell Division', 'NGSS.HS-LS1-4', 50, 'DRAFT', 'FLAG', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'Linear Equations', 'CCSS.MATH.CONTENT.8.EE.B.5', 40, 'READY_FOR_REVIEW', 'NOT_RUN', '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (id) DO NOTHING;

-- Insert demo lesson plans
INSERT INTO lesson_plans (id, lesson_id, steps) VALUES 
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440040', '[
  {"time": 5, "type": "warmup", "content": "Review previous lesson on variables"},
  {"time": 15, "type": "instruction", "content": "Introduce algebraic expressions and equations"},
  {"time": 20, "type": "practice", "content": "Guided practice with simple equations"},
  {"time": 5, "type": "closure", "content": "Exit ticket and homework assignment"}
]'),
('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440041', '[
  {"time": 10, "type": "warmup", "content": "Review cell structure"},
  {"time": 25, "type": "instruction", "content": "Explain mitosis and meiosis processes"},
  {"time": 10, "type": "activity", "content": "Microscope observation of cell division"},
  {"time": 5, "type": "closure", "content": "Summary and questions"}
]')
ON CONFLICT (lesson_id) DO NOTHING;

-- Insert demo assessments
INSERT INTO assessments (id, lesson_id, items, answer_key, rubric) VALUES 
('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440040', '[
  {"type": "multiple_choice", "question": "What is 2x + 3 = 7?", "options": ["x=1", "x=2", "x=3", "x=4"]},
  {"type": "short_answer", "question": "Solve for y: 3y - 6 = 12"}
]', '[
  {"answer": "x=2", "points": 5},
  {"answer": "y=6", "points": 5}
]', '{"total_points": 10, "grading_scale": {"A": 9, "B": 8, "C": 7, "D": 6}}')
ON CONFLICT (lesson_id) DO NOTHING;

-- Insert demo assignments
INSERT INTO assignments (id, lesson_id, group_id, type, due_at) VALUES 
('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440020', 'QUIZ', '2024-03-20 23:59:00+00'),
('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440021', 'WORKSHEET', '2024-03-25 23:59:00+00')
ON CONFLICT (id) DO NOTHING;

-- Insert demo submissions
INSERT INTO submissions (id, assignment_id, student_id, answers, score, status, graded_at) VALUES 
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440003', '{"q1": "x=2", "q2": "y=6"}', 9.2, 'GRADED', '2024-03-15 10:30:00+00')
ON CONFLICT (id) DO NOTHING;

-- Insert demo QA reports
INSERT INTO qa_reports (id, lesson_id, status, rules) VALUES 
('550e8400-e29b-41d4-a716-446655440090', '550e8400-e29b-41d4-a716-446655440040', 'PASS', '[
  {"name": "Standards Alignment", "status": "PASS"},
  {"name": "Content Safety", "status": "PASS"},
  {"name": "Readability", "status": "PASS"},
  {"name": "Originality", "status": "PASS"}
]'),
('550e8400-e29b-41d4-a716-446655440091', '550e8400-e29b-41d4-a716-446655440041', 'FLAG', '[
  {"name": "Standards Alignment", "status": "PASS"},
  {"name": "Content Safety", "status": "PASS"},
  {"name": "Readability", "status": "FLAG", "reason": "Complex terminology needs simplification"},
  {"name": "Originality", "status": "PASS"}
]')
ON CONFLICT (id) DO NOTHING;