/*
  # Create Complete School Platform Schema

  1. New Tables
    - `organizations` - School districts/organizations
    - `users` - All platform users (admin, teacher, student, parent)
    - `groups` - Classes/groups
    - `subjects` - Academic subjects
    - `lessons` - Lesson content with QA workflow
    - `lesson_plans` - Detailed lesson plans
    - `slide_outlines` - Presentation slides
    - `assessments` - Quizzes and tests
    - `assignments` - Homework assignments
    - `submissions` - Student submissions
    - `qa_reports` - Quality assurance reports
    - `memberships` - Student-group relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('ADMIN', 'TEACHER', 'STUDENT', 'PARENT');
CREATE TYPE qa_status AS ENUM ('NOT_RUN', 'RUNNING', 'PASS', 'FLAG', 'FAIL');
CREATE TYPE pub_status AS ENUM ('DRAFT', 'READY_FOR_REVIEW', 'PUBLISHED', 'ARCHIVED');

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  locale text DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role user_role DEFAULT 'TEACHER',
  org_id uuid REFERENCES organizations(id),
  created_at timestamptz DEFAULT now()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id),
  name text NOT NULL
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id),
  name text NOT NULL,
  grade text NOT NULL,
  teacher_id uuid REFERENCES users(id)
);

-- Memberships table (student-group relationships)
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id),
  user_id uuid REFERENCES users(id),
  UNIQUE(group_id, user_id)
);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id),
  subject_id uuid REFERENCES subjects(id),
  title text NOT NULL,
  standards text NOT NULL,
  duration_min integer NOT NULL,
  language text DEFAULT 'en',
  status pub_status DEFAULT 'DRAFT',
  qa_status qa_status DEFAULT 'NOT_RUN',
  created_by text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Lesson plans table
CREATE TABLE IF NOT EXISTS lesson_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid UNIQUE REFERENCES lessons(id),
  steps jsonb NOT NULL
);

-- Slide outlines table
CREATE TABLE IF NOT EXISTS slide_outlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid UNIQUE REFERENCES lessons(id),
  slides jsonb NOT NULL
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid UNIQUE REFERENCES lessons(id),
  items jsonb NOT NULL,
  answer_key jsonb NOT NULL,
  rubric jsonb NOT NULL,
  exit_ticket jsonb
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id),
  group_id uuid REFERENCES groups(id),
  type text NOT NULL,
  due_at timestamptz NOT NULL
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES assignments(id),
  student_id uuid REFERENCES users(id),
  answers text NOT NULL,
  score real,
  feedback text,
  status text DEFAULT 'SUBMITTED',
  submitted_at timestamptz DEFAULT now(),
  graded_at timestamptz,
  grader_id text
);

-- QA Reports table
CREATE TABLE IF NOT EXISTS qa_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id),
  status qa_status NOT NULL,
  rules jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id),
  title text NOT NULL,
  description text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  location text,
  created_by uuid REFERENCES users(id),
  audience text NOT NULL DEFAULT 'ALL',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_audience CHECK (
    audience IN ('ALL', 'TEACHERS', 'STUDENTS', 'PARENTS') 
    OR audience LIKE 'GROUP:%'
  )
);

-- Add to RLS enables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Add to policies
CREATE POLICY "Allow all operations on events" ON events FOR ALL USING (true);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE slide_outlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
CREATE POLICY "Allow all operations on organizations" ON organizations FOR ALL USING (true);
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on subjects" ON subjects FOR ALL USING (true);
CREATE POLICY "Allow all operations on groups" ON groups FOR ALL USING (true);
CREATE POLICY "Allow all operations on memberships" ON memberships FOR ALL USING (true);
CREATE POLICY "Allow all operations on lessons" ON lessons FOR ALL USING (true);
CREATE POLICY "Allow all operations on lesson_plans" ON lesson_plans FOR ALL USING (true);
CREATE POLICY "Allow all operations on slide_outlines" ON slide_outlines FOR ALL USING (true);
CREATE POLICY "Allow all operations on assessments" ON assessments FOR ALL USING (true);
CREATE POLICY "Allow all operations on assignments" ON assignments FOR ALL USING (true);
CREATE POLICY "Allow all operations on submissions" ON submissions FOR ALL USING (true);
CREATE POLICY "Allow all operations on qa_reports" ON qa_reports FOR ALL USING (true);

-- Update table names to match Prisma models
ALTER TABLE organizations RENAME TO "Organization";
ALTER TABLE users RENAME TO "User";
ALTER TABLE groups RENAME TO "Group";
ALTER TABLE subjects RENAME TO "Subject";
ALTER TABLE memberships RENAME TO "Membership";
ALTER TABLE lessons RENAME TO "Lesson";
ALTER TABLE lesson_plans RENAME TO "LessonPlan";
ALTER TABLE slide_outlines RENAME TO "SlideOutline";
ALTER TABLE assessments RENAME TO "Assessment";
ALTER TABLE assignments RENAME TO "Assignment";
ALTER TABLE submissions RENAME TO "Submission";
ALTER TABLE qa_reports RENAME TO "QAReport";
ALTER TABLE events RENAME TO "Event";