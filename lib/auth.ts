import { supabase } from './supabase';

export function ensurePublicVisibility(
  item: { status: string; qaStatus: string },
  role: string
) {
  if (role === 'TEACHER' || role === 'ADMIN') return;
  if (!(item.status === 'PUBLISHED' && item.qaStatus === 'PASS')) {
    throw new Error('NOT_AVAILABLE');
  }
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      org:organizations(*)
    `)
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function createUser(data: {
  email: string;
  name: string;
  role: string;
  orgId: string;
}) {
  const { data: user, error } = await supabase
    .from('users')
    .insert([data])
    .select(`
      *,
      org:organizations(*)
    `)
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return user;
}