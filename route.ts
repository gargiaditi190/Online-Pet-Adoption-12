/**
 * PET API ROUTES (Servlet equivalent)
 * Handles HTTP requests for pet operations
 * Pattern: Route Handler → Service → DAO → Database
 */

import { NextRequest, NextResponse } from 'next/server';
import { PetService } from '@/lib/services/pet-service';

const petService = new PetService();

/**
 * GET /api/pets
 * Retrieve all available pets with optional filters
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') as 'dog' | 'cat' | null;
    const minAge = searchParams.get('minAge') ? parseInt(searchParams.get('minAge')!) : undefined;
    const maxAge = searchParams.get('maxAge') ? parseInt(searchParams.get('maxAge')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;

    const pets = await petService.searchPets({
      type: type || undefined,
      minAge,
      maxAge,
      maxPrice,
    });

    return NextResponse.json({ success: true, data: pets });
  } catch (error) {
    console.error('[API] Error fetching pets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pets' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pets
 * Create new pet listing (admin only)
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const pet = await petService.createPetListing(body);
    return NextResponse.json({ success: true, data: pet }, { status: 201 });
  } catch (error: any) {
    console.error('[API] Error creating pet:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
