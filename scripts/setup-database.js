const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.log('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Create enum types
    console.log('Creating enum types...');
    await supabase.rpc('exec', {
      sql: `
        DO $$ BEGIN
          CREATE TYPE user_role AS ENUM ('ADMIN', 'TEACHER', 'STUDENT', 'PARENT');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
        
        DO $$ BEGIN
          CREATE TYPE qa_status AS ENUM ('NOT_RUN', 'RUNNING', 'PASS', 'FLAG', 'FAIL');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
        
        DO $$ BEGIN
          CREATE TYPE pub_status AS ENUM ('DRAFT', 'READY_FOR_REVIEW', 'PUBLISHED', 'ARCHIVED');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `
    });
    
    // Create organizations table
    console.log('Creating organizations table...');
    const { error: orgError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS organizations (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name text NOT NULL,
          locale text DEFAULT 'en',
          created_at timestamptz DEFAULT now()
        );
        
        ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all operations on organizations" ON organizations;
        CREATE POLICY "Allow all operations on organizations" ON organizations FOR ALL USING (true);
      `
    });
    
    if (orgError) console.error('Organizations table error:', orgError);
    
    // Create users table
    console.log('Creating users table...');
    const { error: userError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          email text UNIQUE NOT NULL,
          name text NOT NULL,
          role user_role DEFAULT 'TEACHER',
          org_id uuid REFERENCES organizations(id),
          created_at timestamptz DEFAULT now()
        );
        
        ALTER TABLE users ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all operations on users" ON users;
        CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
      `
    });
    
    if (userError) console.error('Users table error:', userError);
    
    // Insert demo organization
    console.log('Creating demo organization...');
    const { data: org, error: insertOrgError } = await supabase
      .from('organizations')
      .upsert([{
        name: 'Demo School District',
        locale: 'en',
      }], { onConflict: 'name' })
      .select()
      .single();
    
    if (insertOrgError) {
      console.error('Error creating organization:', insertOrgError);
      return;
    }
    
    console.log('Organization created:', org.id);
    
    // Insert demo users
    console.log('Creating demo users...');
    const users = [
      {
        email: 'admin@school.edu',
        name: 'Sarah Admin',
        role: 'ADMIN',
        org_id: org.id,
      },
      {
        email: 'teacher@school.edu',
        name: 'John Teacher',
        role: 'TEACHER',
        org_id: org.id,
      },
      {
        email: 'student@school.edu',
        name: 'Emma Student',
        role: 'STUDENT',
        org_id: org.id,
      },
      {
        email: 'parent@school.edu',
        name: 'Mike Parent',
        role: 'PARENT',
        org_id: org.id,
      },
    ];
    
    for (const user of users) {
      const { error: userInsertError } = await supabase
        .from('users')
        .upsert([user], { onConflict: 'email' });
      
      if (userInsertError) {
        console.error(`Error creating user ${user.email}:`, userInsertError);
      } else {
        console.log(`Created user: ${user.email}`);
      }
    }
    
    console.log('Database setup completed successfully!');
    console.log('You can now login with:');
    console.log('- admin@school.edu (Admin)');
    console.log('- teacher@school.edu (Teacher)');
    console.log('- student@school.edu (Student)');
    console.log('- parent@school.edu (Parent)');
    
  } catch (error) {
    console.error('Setup error:', error);
  }
}

setupDatabase();