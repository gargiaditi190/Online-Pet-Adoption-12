/**
 * Authentication utilities
 * Core Java concepts: Utility classes with static methods
 */

/**
 * Hash password (simulated - use bcrypt in production)
 */
export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt or argon2
  return Buffer.from(password).toString('base64');
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // In production, use bcrypt or argon2
  const hashedInput = Buffer.from(password).toString('base64');
  return hashedInput === hash;
}

/**
 * Generate JWT token
 */
export function generateToken(userId: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString('base64');
  const signature = Buffer.from(`${header}.${payload}`).toString('base64');
  return `${header}.${payload}.${signature}`;
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): { userId: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    return { userId: payload.userId };
  } catch {
    return null;
  }
}
