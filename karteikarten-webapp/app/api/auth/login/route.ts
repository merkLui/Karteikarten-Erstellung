import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Create JWT token
      const token = jwt.sign(
        { username, authenticated: true },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      // Create response with token in httpOnly cookie
      const response = NextResponse.json(
        { message: 'Login successful' },
        { status: 200 }
      );

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: false, // Allow HTTP in development
        sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
