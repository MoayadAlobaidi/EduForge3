import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Check if data already exists
    const { data: existingOrg, error: checkError } = await supabase
      .from('organizations')
      .select('id')
      .eq('name', 'Demo School District')
      .single();
    
    if (existingOrg && !checkError) {
      return NextResponse.json({ message: 'Demo data already exists' });
    }

    // Create organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert([{
        name: 'Demo School District',
        locale: 'en',
      }])
      .select()
      .single();

    if (orgError) throw orgError;

    // Create demo users
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

    const { error: usersError } = await supabase
      .from('users')
      .insert(users);

    if (usersError) throw usersError;

    return NextResponse.json({ message: 'Demo data seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed demo data' },
      { status: 500 }
    );
  }
}