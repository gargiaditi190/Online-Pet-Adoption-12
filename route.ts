/**
 * USER REGISTRATION API ROUTE (Servlet equivalent)
 * Handles user signup with validation
 */

import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user-service';

const userService = new UserService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password, fullName } = body;

    const user = await userService.registerUser({
      email,
      password,
      fullName,
    });

    return NextResponse.json(
      { success: true, data: { id: user.id, email: user.email, fullName: user.fullName } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API] Registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
