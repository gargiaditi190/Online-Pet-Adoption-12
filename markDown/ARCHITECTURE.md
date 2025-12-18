# Online Pet Adoption Platform - Architecture Documentation

## Problem Understanding & Solution Design

### Problem Statement
The project needs a comprehensive web-based platform for pet adoption that allows:
- Users to browse available pets
- Users to apply for pet adoption
- Administrators to manage pet listings and review applications
- Secure user authentication and data management

### Solution Design
The platform follows a **layered architecture** pattern:
1. **Presentation Layer** (React Components) - User interface
2. **API Layer** (Route Handlers) - HTTP request handling
3. **Service Layer** - Business logic and validation
4. **Data Access Layer** (DAO) - Database operations
5. **Database Layer** - Data persistence

## Core Java Concepts Implemented

### 1. Object-Oriented Programming (OOP)
- **Encapsulation**: Services encapsulate business logic; DAOs encapsulate database access
- **Inheritance**: Base service patterns with specialized implementations
- **Polymorphism**: Different DAO implementations following common interface patterns
- **Single Responsibility**: Each class has one reason to change

### 2. Design Patterns
- **DAO Pattern**: `PetDAO`, `UserDAO`, `AdoptionDAO` encapsulate database operations
- **Service Layer Pattern**: `PetService`, `UserService`, `AdoptionService` contain business logic
- **Singleton Pattern**: `DatabaseConnectionPool` ensures single instance
- **Factory Pattern**: Service creation and instantiation

### 3. Exception Handling
- Input validation with meaningful error messages
- Try-catch blocks in API routes
- Graceful error responses to clients

## Database Integration (JDBC equivalent)

### Database Layer Structure
\`\`\`
Database Connection → PreparedStatement → ResultSet
        ↓                    ↓                  ↓
DatabaseConnectionPool → DAO Methods → TypeScript Objects
\`\`\`

### Tables Schema
\`\`\`sql
-- Users table
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP
);

-- Pets table
CREATE TABLE pets (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  adoption_fee DECIMAL(10, 2),
  description TEXT,
  image_url VARCHAR(255),
  health_status VARCHAR(100),
  available_for_adoption BOOLEAN,
  created_at TIMESTAMP
);

-- Adoption Applications
CREATE TABLE adoption_applications (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  pet_id VARCHAR(255),
  status VARCHAR(50),
  application_date TIMESTAMP,
  reason TEXT,
  home_type VARCHAR(100),
  other_pets BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);

-- Admins table
CREATE TABLE admins (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50),
  created_at TIMESTAMP
);
\`\`\`

### DAO Operations (JDBC-style)
- **Connection Management**: `DatabaseConnectionPool` manages connections
- **Prepared Statements**: DAO methods use parameterized queries
- **Result Mapping**: Database results mapped to TypeScript objects
- **Transaction Management**: Implicit with service layer validation

## Servlets & Web Integration

### API Routes (Servlet equivalent)
Each API route acts as a servlet:
- **GET /api/pets** - Retrieve pet listings
- **POST /api/pets** - Create new pet
- **GET /api/pets/[id]** - Get pet details
- **PUT /api/pets/[id]** - Update pet
- **POST /api/adoptions** - Submit application
- **GET /api/adoptions** - Get applications
- **POST /api/auth/register** - User registration

### Request-Response Cycle
\`\`\`
HTTP Request → Route Handler → Service → DAO → Database
     ↓              ↓            ↓        ↓        ↓
Browser      Validates &    Business   Query   SQL
             processes     logic
\`\`\`

### Error Handling
- Input validation at each layer
- Meaningful error messages
- Proper HTTP status codes (200, 201, 400, 404, 500)

## Layers Explained

### Data Access Layer (DAO)
\`\`\`typescript
// Simulates JDBC PreparedStatement operations
PetDAO.getPetById(id) 
  → SELECT * FROM pets WHERE id = ?
  → Return Pet object
\`\`\`

### Service Layer
\`\`\`typescript
// Contains business rules and validation
PetService.searchPets(filters)
  → Validate filters
  → Query database
  → Apply business logic
  → Return filtered results
\`\`\`

### API Layer (Servlets)
\`\`\`typescript
// Handles HTTP requests
GET /api/pets?type=dog&maxPrice=300
  → Extract parameters
  → Call PetService
  → Return JSON response
\`\`\`

## Data Flow Example: Search Pets

\`\`\`
1. Browser: GET /api/pets?type=dog&maxPrice=300
2. Route Handler: Extract parameters, call service
3. PetService: Validate filters, query database
4. PetDAO: Execute: SELECT * FROM pets WHERE type='dog' AND price <= 300
5. Database: Return matching records
6. DAO: Convert ResultSet to Pet[] objects
7. Service: Apply additional filters
8. Route Handler: Return JSON response
9. Browser: Display results
\`\`\`

## Security Considerations

1. **Password Hashing**: Passwords hashed before storage
2. **Input Validation**: All inputs validated before processing
3. **Error Messages**: Generic error messages to prevent information leakage
4. **Role-Based Access**: Admin operations protected
5. **Data Validation**: Type safety through TypeScript interfaces

## Testing Strategy

Each layer can be tested independently:
- **Unit Tests**: Service methods with mock DAOs
- **Integration Tests**: API routes with mock database
- **E2E Tests**: Full user workflows

## Performance Optimizations

1. **Connection Pooling**: Reuse database connections
2. **Caching**: Cache frequently accessed data
3. **Indexing**: Database indexes on frequently queried columns
4. **Pagination**: Limit results returned
5. **Lazy Loading**: Load data only when needed
