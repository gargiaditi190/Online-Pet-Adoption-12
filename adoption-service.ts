/**
 * ADOPTION SERVICE LAYER
 * Business logic for adoption applications
 */

import { AdoptionApplication, AdoptionDAO } from '../database';

export class AdoptionService {
  private adoptionDAO: AdoptionDAO;

  constructor() {
    this.adoptionDAO = new AdoptionDAO();
  }

  /**
   * Submit adoption application
   * Validates business rules before creation
   */
  async submitApplication(
    userId: string,
    petId: string,
    details: {
      reason: string;
      homeType: string;
      otherPets: boolean;
    }
  ): Promise<AdoptionApplication> {
    // Validation
    if (!userId || !petId) {
      throw new Error('User ID and Pet ID are required');
    }

    if (!details.reason || details.reason.trim().length < 10) {
      throw new Error('Please provide a reason for adoption (minimum 10 characters)');
    }

    // Create application
    const application = await this.adoptionDAO.createApplication({
      userId,
      petId,
      status: 'pending',
      applicationDate: new Date(),
      reason: details.reason,
      homeType: details.homeType,
      otherPets: details.otherPets,
    });

    return application;
  }

  /**
   * Get user's adoption applications
   */
  async getUserApplications(userId: string): Promise<AdoptionApplication[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return this.adoptionDAO.getApplicationsByUserId(userId);
  }

  /**
   * Review and approve/reject application
   */
  async reviewApplication(
    applicationId: string,
    status: 'approved' | 'rejected'
  ): Promise<AdoptionApplication | null> {
    if (!['approved', 'rejected'].includes(status)) {
      throw new Error('Invalid status. Must be approved or rejected');
    }

    return this.adoptionDAO.updateApplicationStatus(applicationId, status);
  }

  /**
   * Get all pending applications (admin only)
   */
  async getPendingApplications(): Promise<AdoptionApplication[]> {
    const allApps = await this.adoptionDAO.getAllApplications();
    return allApps.filter(app => app.status === 'pending');
  }
}
