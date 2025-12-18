/**
 * DATABASE INTEGRATION LAYER (JDBC equivalent)
 * Handles all database connections and queries
 * Following JDBC pattern: Connection → Statement → Execute → Result
 */

// Type definitions (equivalent to Java model classes)
export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  age: number;
  adoptionFee: number;
  description: string;
  imageUrl: string;
  healthStatus: 'healthy' | 'vaccinated' | 'medical-care';
  availableForAdoption: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface AdoptionApplication {
  id: string;
  userId: string;
  petId: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: Date;
  reason: string;
  homeType: string;
  otherPets: boolean;
}

export interface Admin {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'super_admin';
  createdAt: Date;
}

/**
 * Database Connection Pool (simulating JDBC Connection Pool)
 * In production, this would use a real database driver
 */
class DatabaseConnectionPool {
  private static instance: DatabaseConnectionPool;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): DatabaseConnectionPool {
    if (!DatabaseConnectionPool.instance) {
      DatabaseConnectionPool.instance = new DatabaseConnectionPool();
    }
    return DatabaseConnectionPool.instance;
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      console.log('[DB] Establishing database connection...');
      this.isConnected = true;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      console.log('[DB] Closing database connection...');
      this.isConnected = false;
    }
  }

  isReady(): boolean {
    return this.isConnected;
  }
}

/**
 * Pet DAO (Data Access Object) - simulates JDBC PreparedStatement
 * Handles all Pet-related database operations
 */
export class PetDAO {
  private db = DatabaseConnectionPool.getInstance();

  async getAllPets(): Promise<Pet[]> {
    // Simulating: SELECT * FROM pets;
    await this.db.connect();
    return this.mockPets();
  }

  async getPetById(id: string): Promise<Pet | null> {
    // Simulating: SELECT * FROM pets WHERE id = ?;
    await this.db.connect();
    const pets = this.mockPets();
    return pets.find(p => p.id === id) || null;
  }

  async getPetsByType(type: 'dog' | 'cat'): Promise<Pet[]> {
    // Simulating: SELECT * FROM pets WHERE type = ?;
    await this.db.connect();
    return this.mockPets().filter(p => p.type === type);
  }

  async createPet(pet: Omit<Pet, 'id' | 'createdAt'>): Promise<Pet> {
    // Simulating: INSERT INTO pets VALUES (...);
    await this.db.connect();
    const newPet: Pet = {
      ...pet,
      id: `pet_${Date.now()}`,
      createdAt: new Date(),
    };
    return newPet;
  }

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet | null> {
    // Simulating: UPDATE pets SET ... WHERE id = ?;
    await this.db.connect();
    const pet = await this.getPetById(id);
    if (!pet) return null;
    return { ...pet, ...updates, id, createdAt: pet.createdAt };
  }

  async deletePet(id: string): Promise<boolean> {
    // Simulating: DELETE FROM pets WHERE id = ?;
    await this.db.connect();
    return true;
  }

  private mockPets(): Pet[] {
    return [
      {
        id: 'pet_1',
        name: 'Max',
        type: 'dog',
        breed: 'Golden Retriever',
        age: 3,
        adoptionFee: 250,
        description: 'Friendly and energetic dog',
        imageUrl: '/golden-retriever.png',
        healthStatus: 'vaccinated',
        availableForAdoption: true,
        createdAt: new Date('2025-01-01'),
      },
      {
        id: 'pet_2',
        name: 'Whiskers',
        type: 'cat',
        breed: 'Siamese',
        age: 2,
        adoptionFee: 100,
        description: 'Cute and playful',
        imageUrl: '/siamese-cat.png',
        healthStatus: 'healthy',
        availableForAdoption: true,
        createdAt: new Date('2025-01-05'),
      },
    ];
  }
}

/**
 * User DAO - User data access operations
 */
export class UserDAO {
  private db = DatabaseConnectionPool.getInstance();

  async getUserByEmail(email: string): Promise<User | null> {
    // Simulating: SELECT * FROM users WHERE email = ?;
    await this.db.connect();
    return null; // Mock implementation
  }

  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    // Simulating: INSERT INTO users VALUES (...);
    await this.db.connect();
    return {
      ...user,
      id: `user_${Date.now()}`,
      createdAt: new Date(),
    };
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    // Simulating: UPDATE users SET ... WHERE id = ?;
    await this.db.connect();
    return null;
  }
}

/**
 * Adoption DAO - Adoption application operations
 */
export class AdoptionDAO {
  private db = DatabaseConnectionPool.getInstance();

  async createApplication(app: Omit<AdoptionApplication, 'id'>): Promise<AdoptionApplication> {
    // Simulating: INSERT INTO adoption_applications VALUES (...);
    await this.db.connect();
    return {
      ...app,
      id: `app_${Date.now()}`,
    };
  }

  async getApplicationsByUserId(userId: string): Promise<AdoptionApplication[]> {
    // Simulating: SELECT * FROM adoption_applications WHERE user_id = ?;
    await this.db.connect();
    return [];
  }

  async updateApplicationStatus(
    id: string,
    status: AdoptionApplication['status']
  ): Promise<AdoptionApplication | null> {
    // Simulating: UPDATE adoption_applications SET status = ? WHERE id = ?;
    await this.db.connect();
    return null;
  }

  async getAllApplications(): Promise<AdoptionApplication[]> {
    // Simulating: SELECT * FROM adoption_applications;
    await this.db.connect();
    return [];
  }
}
