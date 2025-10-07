import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // In production, you would clear the session cookie here
    // For now, we'll just return success since we're using localStorage
    
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    // Clear any auth cookies if they exist
    response.cookies.set('auth-token', '', {
      expires: new Date(0),
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}