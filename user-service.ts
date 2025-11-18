/**
 * USER SERVICE LAYER
 * Authentication and user management
 */

import { User, UserDAO } from '../database';
import { hashPassword, verifyPassword } from '../auth-utils';

export class UserService {
  private userDAO: UserDAO;

  constructor() {
    this.userDAO = new UserDAO();
  }

  /**
   * Register new user
   * Demonstrates: Validation, password hashing, business logic
   */
  async registerUser(userData: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<User> {
    // Validation
    if (!userData.email || !userData.password || !userData.fullName) {
      throw new Error('Email, password, and full name are required');
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    // Check if user already exists
    const existingUser = await this.userDAO.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(userData.password);

    return this.userDAO.createUser({
      email: userData.email,
      password: hashedPassword,
      fullName: userData.fullName,
      phone: '',
      address: '',
    });
  }

  /**
   * Authenticate user
   */
  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userDAO.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await verifyPassword(password, user.password);
    return isValid ? user : null;
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
