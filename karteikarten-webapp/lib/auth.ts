import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export interface AuthUser {
  username: string;
  authenticated: boolean;
}

export async function verifyAuth(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await verifyAuth();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}
