/**
 * PET SERVICE LAYER
 * Core business logic for pet operations
 * Follows OOP principles: encapsulation, single responsibility
 */

import { Pet, PetDAO } from '../database';

export class PetService {
  private petDAO: PetDAO;

  constructor() {
    this.petDAO = new PetDAO();
  }

  /**
   * Get all available pets for adoption
   * Business logic: Filter only available pets
   */
  async getAvailablePets(): Promise<Pet[]> {
    const allPets = await this.petDAO.getAllPets();
    return allPets.filter(pet => pet.availableForAdoption);
  }

  /**
   * Search pets with filters
   * Demonstrates: Business logic validation, filtering
   */
  async searchPets(filters: {
    type?: 'dog' | 'cat';
    minAge?: number;
    maxAge?: number;
    maxPrice?: number;
  }): Promise<Pet[]> {
    let pets = await this.getAvailablePets();

    if (filters.type) {
      pets = pets.filter(p => p.type === filters.type);
    }

    if (filters.minAge !== undefined) {
      pets = pets.filter(p => p.age >= filters.minAge!);
    }

    if (filters.maxAge !== undefined) {
      pets = pets.filter(p => p.age <= filters.maxAge!);
    }

    if (filters.maxPrice !== undefined) {
      pets = pets.filter(p => p.adoptionFee <= filters.maxPrice!);
    }

    return pets;
  }

  /**
   * Get pet details by ID
   * Demonstrates: Error handling, validation
   */
  async getPetDetails(petId: string): Promise<Pet> {
    if (!petId || typeof petId !== 'string') {
      throw new Error('Invalid pet ID');
    }

    const pet = await this.petDAO.getPetById(petId);
    if (!pet) {
      throw new Error(`Pet with ID ${petId} not found`);
    }

    return pet;
  }

  /**
   * Create new pet listing (admin only)
   * Demonstrates: Validation, business rules
   */
  async createPetListing(petData: Omit<Pet, 'id' | 'createdAt'>): Promise<Pet> {
    // Validate required fields
    if (!petData.name || !petData.breed) {
      throw new Error('Pet name and breed are required');
    }

    if (petData.adoptionFee < 0) {
      throw new Error('Adoption fee cannot be negative');
    }

    if (petData.age < 0) {
      throw new Error('Age cannot be negative');
    }

    return this.petDAO.createPet(petData);
  }

  /**
   * Update pet information
   */
  async updatePetInfo(petId: string, updates: Partial<Pet>): Promise<Pet> {
    const existingPet = await this.getPetDetails(petId);
    const updated = await this.petDAO.updatePet(petId, updates);

    if (!updated) {
      throw new Error('Failed to update pet');
    }

    return updated;
  }

  /**
   * Mark pet as adopted
   */
  async markPetAsAdopted(petId: string): Promise<Pet> {
    return this.updatePetInfo(petId, {
      availableForAdoption: false,
    });
  }
}
