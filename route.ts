/**
 * ADOPTION API ROUTES (Servlet equivalent)
 * Handles adoption application operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { AdoptionService } from '@/lib/services/adoption-service';

const adoptionService = new AdoptionService();

/**
 * POST /api/adoptions
 * Submit adoption application
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { userId, petId, reason, homeType, otherPets } = body;

    const application = await adoptionService.submitApplication(userId, petId, {
      reason,
      homeType,
      otherPets,
    });

    return NextResponse.json(
      { success: true, data: application },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API] Error submitting application:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

/**
 * GET /api/adoptions
 * Get all pending applications (admin)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const applications = await adoptionService.getPendingApplications();
    return NextResponse.json({ success: true, data: applications });
  } catch (error: any) {
    console.error('[API] Error fetching applications:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
