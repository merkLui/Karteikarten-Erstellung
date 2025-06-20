import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const user = await verifyAuth();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Authenticated', user: { username: user.username } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication verification failed' },
      { status: 401 }
    );
  }
}
